import Link from "next/link";
import { InvoiceView } from "@/components/invoices/invoice-view";
import { PayPalCheckout } from "@/components/invoices/paypal-button";
import { InvoicePaymentOutcome } from "@/components/invoices/invoice-payment-outcome";
import { PayShell, type PayShellState } from "@/components/pay/pay-shell";
import { Button } from "@/components/ui/button";
import { EyebrowChip } from "@/components/ui/eyebrow-chip";
import { getInvoiceByPayToken } from "@/lib/repositories/invoices";
import { canPayInvoice } from "@/lib/permissions";
import { formatCurrency, formatDate } from "@/lib/format";
import { clientEnv, env } from "@/lib/env";
import { getPayPalClientEnvironment } from "@/lib/paypal-client";

type Props = { params: Promise<{ token: string }> };

function getShellState(
  status: string,
): PayShellState {
  if (status === "paid") return "paid";
  if (status === "cancelled") return "cancelled";
  return "checkout";
}

export default async function PayPage({ params }: Props) {
  const { token } = await params;
  const invoice = await getInvoiceByPayToken(token);

  if (!invoice) {
    return (
      <PayShell state="unavailable">
        <div className="mx-auto max-w-md space-y-5 text-center">
          <EyebrowChip tone="dark">Link unavailable</EyebrowChip>
          <h1 className="font-display text-3xl">This payment link has expired</h1>
          <p className="text-sm leading-relaxed text-muted">
            The link may be invalid or no longer active. Log in to your client portal or
            contact us and we&apos;ll send a fresh one.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button href="/login">Log in to portal</Button>
            <Button href="/contact" variant="ghost">
              Contact support
            </Button>
          </div>
        </div>
      </PayShell>
    );
  }

  const canPay = canPayInvoice(null, invoice, { validPayToken: true });
  const shellState = getShellState(invoice.status);
  const amountDue = Number(invoice.total) - Number(invoice.amount_paid);
  const isPaid = invoice.status === "paid";
  const isCancelled = invoice.status === "cancelled";

  return (
    <PayShell state={shellState}>
      <div className="space-y-8">
        <header className="space-y-3 border-b-2 border-ink/10 pb-6">
          <EyebrowChip tone={isPaid ? "lime" : isCancelled ? "dark" : "lime"}>
            {isPaid
              ? "Payment received"
              : isCancelled
                ? "Invoice cancelled"
                : "Invoice payment"}
          </EyebrowChip>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl">
                {isPaid
 ? "Thank you, this invoice is paid"
                  : isCancelled
                    ? "This invoice is no longer payable"
                    : "Complete your payment"}
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                {isPaid
                  ? `We received your payment${
                      invoice.paid_at
                        ? ` on ${formatDate(invoice.paid_at)}`
                        : ""
                    }. A copy of this invoice is below for your records.`
                  : isCancelled
                    ? "This invoice was cancelled and cannot be paid through this link. Contact us if you need a replacement invoice."
                    : "Review the invoice below, then pay with debit/credit card or PayPal. No PayPal account required for card payments."}
              </p>
            </div>
            <div
              className={`rounded-[var(--radius-md)] border-2 border-ink px-4 py-3 text-right shadow-brutal-sm ${
                isPaid ? "bg-lime-tint" : "bg-paper-2"
              }`}
            >
              <p className="font-mono text-[10px] font-bold uppercase text-muted">
                {isPaid ? "Amount paid" : isCancelled ? "Invoice total" : "Amount due"}
              </p>
              <p className="font-display text-2xl">
                {formatCurrency(
                  isPaid || isCancelled
                    ? Number(invoice.total)
                    : amountDue > 0
                      ? amountDue
                      : Number(invoice.total),
                  invoice.currency,
                )}
              </p>
            </div>
          </div>
        </header>

        <div className="rounded-[var(--radius-md)] border-2 border-ink bg-paper-2 p-5 sm:p-6">
          <InvoiceView invoice={invoice} />
        </div>

        {canPay ? (
          <section className="w-full space-y-4">
            <div>
              <h2 className="font-display text-xl">Payment method</h2>
              <p className="mt-1 text-sm text-muted">
 Pay with card or PayPal, you&apos;ll complete checkout securely with PayPal.
              </p>
            </div>
            <PayPalCheckout
              invoiceId={invoice.id}
              payToken={token}
              clientId={clientEnv.NEXT_PUBLIC_PAYPAL_CLIENT_ID}
              environment={getPayPalClientEnvironment(env.PAYPAL_MODE)}
            />
          </section>
        ) : isPaid ? (
          <InvoicePaymentOutcome variant="paid" context="pay" paidAt={invoice.paid_at} />
        ) : isCancelled ? (
          <InvoicePaymentOutcome variant="cancelled" context="pay" />
        ) : null}

        <p className="border-t-2 border-ink/10 pt-5 text-center text-sm text-muted">
          Have a client account?{" "}
          <Link href="/login" className="font-bold text-violet hover:underline">
            Log in
          </Link>{" "}
          to view all invoices and payment history.
        </p>
      </div>
    </PayShell>
  );
}
