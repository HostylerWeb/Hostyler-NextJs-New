import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Wrap } from "@/components/layout/wrap";
import { Section } from "@/components/layout/section";
import { InvoiceView } from "@/components/invoices/invoice-view";
import { PayPalCheckout } from "@/components/invoices/paypal-button";
import { Button } from "@/components/ui/button";
import { getInvoiceByPayToken } from "@/lib/repositories/invoices";
import { canPayInvoice } from "@/lib/permissions";
import { clientEnv } from "@/lib/env";

type Props = { params: Promise<{ token: string }> };

export default async function PayPage({ params }: Props) {
  const { token } = await params;
  const invoice = await getInvoiceByPayToken(token);

  if (!invoice) {
    return (
      <Section tight className="pt-32">
        <Wrap className="max-w-lg">
          <Card className="space-y-4 p-8 text-center">
            <h1 className="font-display text-3xl">Link expired</h1>
            <p className="text-sm text-muted">
              This payment link is invalid or has expired. Log in to your portal
              or contact us for help.
            </p>
            <Button href="/login">Log in</Button>
          </Card>
        </Wrap>
      </Section>
    );
  }

  const canPay = canPayInvoice(null, invoice, { validPayToken: true });

  return (
    <Section tight className="pt-32">
      <Wrap className="max-w-2xl">
        <Card className="space-y-6 p-8">
          <div>
            <h1 className="font-display text-3xl">Pay invoice</h1>
            <p className="mt-2 text-sm text-muted">
              Secure payment via PayPal. No account required.
            </p>
          </div>

          <InvoiceView invoice={invoice} />

          {canPay ? (
            <PayPalCheckout
              invoiceId={invoice.id}
              payToken={token}
              currency={invoice.currency}
              clientId={clientEnv.NEXT_PUBLIC_PAYPAL_CLIENT_ID}
            />
          ) : (
            <p className="text-sm font-semibold text-muted">
              This invoice has already been paid or cancelled.
            </p>
          )}

          <p className="text-center text-sm text-muted">
            Have an account?{" "}
            <Link href="/login" className="font-bold text-violet">
              Log in
            </Link>{" "}
            to view all invoices.
          </p>
        </Card>
      </Wrap>
    </Section>
  );
}
