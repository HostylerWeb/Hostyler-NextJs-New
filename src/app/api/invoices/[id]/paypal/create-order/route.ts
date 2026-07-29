import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createPayPalOrder,
  isPayPalConfigured,
} from "@/lib/paypal";
import { canPayInvoice } from "@/lib/permissions";
import { getInvoiceById } from "@/lib/repositories/invoices";
import { createPendingPayment } from "@/lib/repositories/payments";

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
  const payToken = typeof body.pay_token === "string" ? body.pay_token : null;
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

  const amountDue =
    Math.round((Number(invoice.total) - Number(invoice.amount_paid)) * 100) /
    100;

  if (amountDue <= 0) {
    return NextResponse.json({ error: "Nothing to pay" }, { status: 400 });
  }

  try {
    const order = await createPayPalOrder({
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoice_number,
      amount: amountDue,
      currency: invoice.currency,
    });

    await createPendingPayment({
      invoice_id: invoice.id,
      user_id: session?.user?.id ?? null,
      provider_order_id: order.id,
      amount: amountDue,
      currency: invoice.currency,
    });

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error("[paypal:create-order]", error);
    return NextResponse.json(
      { error: "Failed to create PayPal order" },
      { status: 500 },
    );
  }
}
