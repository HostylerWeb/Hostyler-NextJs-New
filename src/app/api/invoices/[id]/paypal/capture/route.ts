import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { formatCurrency } from "@/lib/format";
import { capturePayPalOrder, isPayPalConfigured } from "@/lib/paypal";
import { canPayInvoice } from "@/lib/permissions";
import { getInvoiceById } from "@/lib/repositories/invoices";
import {
  getPaymentByProviderOrderId,
  markPaymentCompleted,
  markPaymentFailed,
} from "@/lib/repositories/payments";
import { findUserById } from "@/lib/repositories/users";
import { sendInvoicePaidReceipt } from "@/lib/mail";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!isPayPalConfigured()) {
    return NextResponse.json(
      { error: "PayPal is not configured" },
      { status: 503 },
    );
  }

  const invoice = await getInvoiceById(id);
  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const session = await auth();
  const body = await request.json().catch(() => ({}));
  const orderId = body.orderId as string | undefined;
  const payToken = typeof body.pay_token === "string" ? body.pay_token : null;

  if (!orderId) {
    return NextResponse.json({ error: "orderId is required" }, { status: 400 });
  }

  const validPayToken =
    Boolean(payToken) &&
    invoice.pay_token === payToken &&
    Boolean(
      invoice.pay_token_expires_at &&
        invoice.pay_token_expires_at > new Date(),
    );

  if (!canPayInvoice(session?.user, invoice, { validPayToken })) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const existingPayment = await getPaymentByProviderOrderId(orderId);
  if (!existingPayment || existingPayment.invoice_id !== invoice.id) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  if (existingPayment.status === "completed") {
    return NextResponse.json({ success: true, status: "completed" });
  }

  const amountDue =
    Math.round((Number(invoice.total) - Number(invoice.amount_paid)) * 100) / 100;

  if (amountDue <= 0) {
    return NextResponse.json({ error: "Nothing to pay" }, { status: 400 });
  }

  if (Number(existingPayment.amount) > amountDue + 0.01) {
    return NextResponse.json(
      { error: "Payment amount exceeds invoice balance" },
      { status: 400 },
    );
  }

  try {
    const capture = await capturePayPalOrder(orderId);
    const captureRecord = capture.purchase_units[0]?.payments?.captures?.[0];

    if (!captureRecord || captureRecord.status !== "COMPLETED") {
      await markPaymentFailed(orderId, capture as unknown as object);
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const payment = await markPaymentCompleted(orderId, {
      provider_capture_id: captureRecord.id,
      payer_email: capture.payer?.email_address ?? null,
      raw_response: capture as unknown as object,
      changed_by_id: session?.user?.id ?? null,
    });

    const client = await findUserById(invoice.user_id);
    if (client) {
      await sendInvoicePaidReceipt({
        invoiceNumber: invoice.invoice_number,
        total: formatCurrency(Number(payment.amount), payment.currency),
        clientName: client.name,
        clientEmail: client.email,
        paymentId: captureRecord.id,
      });
    }

    if (env.NODE_ENV === "production") {
      console.info("[analytics] invoice_paid", {
        invoice_id: invoice.id,
        payment_id: payment.id,
      });
    }

    return NextResponse.json({ success: true, status: "completed" });
  } catch (error) {
    console.error("[paypal:capture]", error);
    await markPaymentFailed(orderId).catch(() => undefined);
    return NextResponse.json({ error: "Capture failed" }, { status: 500 });
  }
}
