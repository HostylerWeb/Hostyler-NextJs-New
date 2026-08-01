import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";
import { Card } from "@/components/ui/card";
import { InvoiceView } from "@/components/invoices/invoice-view";
import { PayPalCheckout } from "@/components/invoices/paypal-button";
import { InvoicePaymentOutcome } from "@/components/invoices/invoice-payment-outcome";
import { EyebrowChip } from "@/components/ui/eyebrow-chip";
import { StatusBadge } from "@/components/ui/status-badge";
import { canPayInvoice, canViewInvoice } from "@/lib/permissions";
import {
  getInvoiceById,
  markInvoiceViewed,
} from "@/lib/repositories/invoices";
import { listPaymentsByInvoice } from "@/lib/repositories/payments";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/format";
import { clientEnv, env } from "@/lib/env";
import { getPayPalClientEnvironment } from "@/lib/paypal-client";

type Props = { params: Promise<{ id: string }> };

export default async function PortalInvoiceDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const invoice = await getInvoiceById(id);
  if (!invoice || !canViewInvoice(session.user, invoice)) notFound();

  if (invoice.status === "sent") {
    await markInvoiceViewed(id);
    invoice.status = "viewed";
  }

  const payments = await listPaymentsByInvoice(id);
  const canPay = canPayInvoice(session.user, invoice);
  const isPaid = invoice.status === "paid";
  const isCancelled = invoice.status === "cancelled";
  const amountDue = Number(invoice.total) - Number(invoice.amount_paid);

  return (
    <PortalShell userName={session.user.name ?? "Client"}>
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
          <div className="space-y-3">
            {isPaid ? (
              <EyebrowChip tone="lime">Payment received</EyebrowChip>
            ) : isCancelled ? (
              <EyebrowChip tone="dark">Invoice cancelled</EyebrowChip>
            ) : null}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl">{invoice.invoice_number}</h1>
              <StatusBadge status={invoice.status} kind="invoice" />
            </div>
            {isPaid ? (
              <p className="max-w-xl text-sm text-muted">
                Thank you — this invoice is paid
                {invoice.paid_at ? ` on ${formatDate(invoice.paid_at)}` : ""}.
              </p>
            ) : isCancelled ? (
              <p className="max-w-xl text-sm text-muted">
                This invoice was cancelled and is no longer payable.
              </p>
            ) : amountDue > 0 ? (
              <p className="text-sm text-muted">
                Amount due:{" "}
                <span className="font-semibold text-ink">
                  {formatCurrency(amountDue, invoice.currency)}
                </span>
              </p>
            ) : null}
          </div>
        </div>

        <Card className="p-6">
          <InvoiceView invoice={invoice} />
        </Card>

        {payments.length > 0 ? (
          <Card className="space-y-3 p-6 print:hidden">
            <h2 className="font-display text-lg">Payment history</h2>
            <ul className="space-y-2 text-sm">
              {payments.map((payment) => (
                <li key={payment.id} className="flex justify-between gap-4">
                  <span>
                    <StatusBadge status={payment.status} kind="payment" />{" "}
                    {formatDateTime(payment.created_at)}
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(Number(payment.amount), payment.currency)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}

        {canPay ? (
          <Card className="space-y-4 p-6 print:hidden">
            <div>
              <h2 className="font-display text-lg">Payment method</h2>
              <p className="mt-1 text-sm text-muted">
                Pay with card or PayPal — checkout is processed securely by PayPal.
              </p>
            </div>
            <PayPalCheckout
              invoiceId={invoice.id}
              clientId={clientEnv.NEXT_PUBLIC_PAYPAL_CLIENT_ID}
              environment={getPayPalClientEnvironment(env.PAYPAL_MODE)}
            />
          </Card>
        ) : isPaid || isCancelled ? (
          <Card className="p-6 print:hidden">
            <InvoicePaymentOutcome
              variant={isPaid ? "paid" : "cancelled"}
              context="portal"
              paidAt={invoice.paid_at}
            />
          </Card>
        ) : null}
      </div>
    </PortalShell>
  );
}
