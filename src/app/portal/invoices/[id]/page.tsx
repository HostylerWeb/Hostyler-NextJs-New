import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";
import { Card } from "@/components/ui/card";
import { InvoiceView } from "@/components/invoices/invoice-view";
import { PayPalCheckout } from "@/components/invoices/paypal-button";
import { StatusBadge } from "@/components/ui/status-badge";
import { canPayInvoice, canViewInvoice } from "@/lib/permissions";
import {
  getInvoiceById,
  markInvoiceViewed,
} from "@/lib/repositories/invoices";
import { listPaymentsByInvoice } from "@/lib/repositories/payments";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { clientEnv } from "@/lib/env";

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

  return (
    <PortalShell userName={session.user.name ?? "Client"}>
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div>
            <h1 className="font-display text-3xl">{invoice.invoice_number}</h1>
            <StatusBadge status={invoice.status} kind="invoice" />
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
            <h2 className="font-display text-lg">Pay with PayPal</h2>
            <PayPalCheckout
              invoiceId={invoice.id}
              currency={invoice.currency}
              clientId={clientEnv.NEXT_PUBLIC_PAYPAL_CLIENT_ID}
            />
          </Card>
        ) : null}
      </div>
    </PortalShell>
  );
}
