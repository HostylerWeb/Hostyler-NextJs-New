import { payment_status, payments, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { updateInvoiceStatus } from "@/lib/repositories/invoices";

export type CreatePaymentInput = {
  invoice_id: string;
  user_id?: string | null;
  provider_order_id: string;
  amount: number;
  currency: string;
  payer_email?: string | null;
};

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

export async function markPaymentCompleted(
  providerOrderId: string,
  data: {
    provider_capture_id: string;
    payer_email?: string | null;
    raw_response?: Prisma.InputJsonValue;
    changed_by_id?: string | null;
  },
): Promise<payments> {
  return prisma.$transaction(async (tx) => {
    const payment = await tx.payments.findUniqueOrThrow({
      where: { provider_order_id: providerOrderId },
    });

    if (payment.status === "completed") {
      return payment;
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

    const invoice = await tx.invoices.findUniqueOrThrow({
      where: { id: payment.invoice_id },
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

    return updatedPayment;
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
