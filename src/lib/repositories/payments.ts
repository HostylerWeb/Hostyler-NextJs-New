import { payment_status, payments, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { getAmountDue } from "@/lib/paypal-amounts";
import { updateInvoiceStatus } from "@/lib/repositories/invoices";

export type PayPalMode = "sandbox" | "live";

export type CreatePaymentInput = {
  invoice_id: string;
  user_id?: string | null;
  provider_order_id: string;
  amount: number;
  currency: string;
  payer_email?: string | null;
  paypal_mode: PayPalMode;
};

export type PaymentCompletionResult = {
  payment: payments;
  newlyCompleted: boolean;
};

const PENDING_PAYMENT_TTL_MS = 24 * 60 * 60 * 1000;

function getStoredPayPalMode(payment: payments): PayPalMode | null {
  const raw = payment.raw_response;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }

  const mode = (raw as { paypal_mode?: unknown }).paypal_mode;
  return mode === "live" || mode === "sandbox" ? mode : null;
}

export async function createPendingPayment(
  data: CreatePaymentInput,
): Promise<payments> {
  return prisma.payments.create({
    data: {
      invoice_id: data.invoice_id,
      user_id: data.user_id,
      provider_order_id: data.provider_order_id,
      amount: data.amount,
      currency: data.currency,
      payer_email: data.payer_email,
      status: "pending",
      raw_response: { paypal_mode: data.paypal_mode },
    },
  });
}

export async function getPaymentByProviderOrderId(
  providerOrderId: string,
): Promise<payments | null> {
  return prisma.payments.findUnique({
    where: { provider_order_id: providerOrderId },
  });
}

export async function getPaymentById(id: string): Promise<payments | null> {
  return prisma.payments.findUnique({ where: { id } });
}

export async function listPaymentsByInvoice(
  invoiceId: string,
): Promise<payments[]> {
  return prisma.payments.findMany({
    where: { invoice_id: invoiceId },
    orderBy: { created_at: "desc" },
  });
}

export async function findReusablePendingPayment(
  invoiceId: string,
  amount: number,
  currency: string,
  paypalMode: PayPalMode,
): Promise<payments | null> {
  const pendingPayments = await prisma.payments.findMany({
    where: {
      invoice_id: invoiceId,
      status: "pending",
      currency,
      created_at: { gt: new Date(Date.now() - PENDING_PAYMENT_TTL_MS) },
    },
    orderBy: { created_at: "desc" },
  });

  return (
    pendingPayments.find(
      (payment) =>
        Number(payment.amount) === amount &&
        getStoredPayPalMode(payment) === paypalMode,
    ) ?? null
  );
}

export async function failPendingPaymentsWithMismatchedMode(
  invoiceId: string,
  paypalMode: PayPalMode,
): Promise<void> {
  const pendingPayments = await prisma.payments.findMany({
    where: {
      invoice_id: invoiceId,
      status: "pending",
    },
  });

  const stalePayments = pendingPayments.filter(
    (payment) => getStoredPayPalMode(payment) !== paypalMode,
  );

  if (stalePayments.length === 0) {
    return;
  }

  await prisma.payments.updateMany({
    where: {
      id: { in: stalePayments.map((payment) => payment.id) },
    },
    data: {
      status: "failed",
      raw_response: {
        reason: "paypal_mode_changed",
        expected_mode: paypalMode,
      },
    },
  });
}

export async function failSupersededPendingPayments(
  invoiceId: string,
  keepOrderId?: string,
): Promise<void> {
  await prisma.payments.updateMany({
    where: {
      invoice_id: invoiceId,
      status: "pending",
      ...(keepOrderId ? { provider_order_id: { not: keepOrderId } } : {}),
    },
    data: {
      status: "failed",
      raw_response: { reason: "superseded_by_new_order" },
    },
  });
}

export async function markPaymentCompleted(
  providerOrderId: string,
  data: {
    provider_capture_id: string;
    payer_email?: string | null;
    raw_response?: Prisma.InputJsonValue;
    changed_by_id?: string | null;
  },
): Promise<PaymentCompletionResult> {
  return prisma.$transaction(async (tx) => {
    const payment = await tx.payments.findUniqueOrThrow({
      where: { provider_order_id: providerOrderId },
    });

    if (payment.status === "completed") {
      return { payment, newlyCompleted: false };
    }

    await tx.$executeRaw`SELECT id FROM invoices WHERE id = ${payment.invoice_id}::uuid FOR UPDATE`;

    const invoice = await tx.invoices.findUniqueOrThrow({
      where: { id: payment.invoice_id },
    });

    const amountDue = getAmountDue(Number(invoice.total), Number(invoice.amount_paid));

    if (amountDue <= 0) {
      await tx.payments.update({
        where: { id: payment.id },
        data: {
          status: "failed",
          raw_response: {
            reason: "invoice_already_paid",
            attempted_capture: data.provider_capture_id,
          },
        },
      });
      throw new Error("Invoice already fully paid");
    }

    if (Number(payment.amount) > amountDue + 0.01) {
      await tx.payments.update({
        where: { id: payment.id },
        data: {
          status: "failed",
          raw_response: {
            reason: "payment_exceeds_balance",
            attempted_capture: data.provider_capture_id,
          },
        },
      });
      throw new Error("Payment amount exceeds invoice balance");
    }

    const updatedPayment = await tx.payments.update({
      where: { id: payment.id },
      data: {
        status: "completed",
        provider_capture_id: data.provider_capture_id,
        payer_email: data.payer_email,
        raw_response: data.raw_response,
      },
    });

    const amountPaid = Number(invoice.amount_paid) + Number(payment.amount);
    const isFullyPaid = amountPaid >= Number(invoice.total);

    await updateInvoiceStatus(
      invoice.id,
      isFullyPaid ? "paid" : "partially_paid",
      {
        changed_by_id: data.changed_by_id ?? null,
        note: "Payment captured via PayPal",
        paid_at: isFullyPaid ? new Date() : undefined,
        amount_paid: amountPaid,
      },
      tx,
    );

    return { payment: updatedPayment, newlyCompleted: true };
  });
}

export async function markPaymentFailed(
  providerOrderId: string,
  raw_response?: Prisma.InputJsonValue,
): Promise<payments> {
  return prisma.payments.update({
    where: { provider_order_id: providerOrderId },
    data: {
      status: "failed",
      raw_response,
    },
  });
}

export async function updatePaymentStatus(
  id: string,
  status: payment_status,
  data?: Partial<{
    provider_capture_id: string | null;
    payer_email: string | null;
    raw_response: Prisma.InputJsonValue;
  }>,
): Promise<payments> {
  return prisma.payments.update({
    where: { id },
    data: { status, ...data },
  });
}
