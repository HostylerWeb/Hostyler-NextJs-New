import { formatCurrency } from "@/lib/format";
import { sendInvoicePaidReceipt } from "@/lib/mail";
import { getInvoiceById } from "@/lib/repositories/invoices";
import type { payments } from "@/generated/prisma/client";
import { findUserById } from "@/lib/repositories/users";

export async function sendPaymentReceipt(payment: payments): Promise<void> {
  const invoice = await getInvoiceById(payment.invoice_id);
  if (!invoice) return;

  const client = await findUserById(invoice.user_id);
  if (!client) return;

  await sendInvoicePaidReceipt({
    invoiceNumber: invoice.invoice_number,
    total: formatCurrency(Number(payment.amount), payment.currency),
    clientName: client.name,
    clientEmail: client.email,
    paymentId: payment.provider_capture_id ?? payment.provider_order_id,
  });
}
