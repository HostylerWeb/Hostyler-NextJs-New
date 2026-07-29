import type { invoice_line_items, invoices } from "@/generated/prisma/client";
import { InvoiceView } from "@/components/invoices/invoice-view";
import { SiteLogoMark } from "@/components/layout/site-logo";

type InvoiceClientPreviewProps = {
  invoice: invoices & { line_items: invoice_line_items[] };
  client?: { name: string; email: string; company?: string | null } | null;
};

export function InvoiceClientPreview({
  invoice,
  client,
}: InvoiceClientPreviewProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-xl">Client preview</h2>
        <p className="mt-1 text-sm text-muted">
          How this invoice appears in the client portal and on the payment link.
        </p>
      </div>

      <div className="mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-lg)] border-2.5 border-ink bg-white shadow-brutal-sm">
        <div className="border-b-2 border-ink/10 bg-paper-2 px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <SiteLogoMark height={28} />
            {client ? (
              <div className="text-right text-sm">
                <p className="font-semibold">{client.name}</p>
                <p className="text-muted">{client.email}</p>
                {client.company ? (
                  <p className="text-muted">{client.company}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="p-6">
          <InvoiceView invoice={invoice} />
        </div>
      </div>
    </section>
  );
}
