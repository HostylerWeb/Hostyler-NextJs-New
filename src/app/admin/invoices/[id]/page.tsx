import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card } from "@/components/ui/card";
import { InvoiceAdminActions } from "@/components/invoices/invoice-admin-actions";
import { InvoiceClientPreview } from "@/components/invoices/invoice-client-preview";
import { InvoiceForm } from "@/components/invoices/invoice-form";
import {
  getAdminClientsForSelect,
  getInvoiceForAdmin,
} from "@/lib/actions/invoices";
import { isAdmin } from "@/lib/permissions";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = { params: Promise<{ id: string }> };

export default async function AdminInvoiceDetailPage({ params }: Props) {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const { id } = await params;
  const invoice = await getInvoiceForAdmin(id);
  if (!invoice) notFound();

  const clients = await getAdminClientsForSelect();
  const canEdit = invoice.status === "draft" || invoice.status === "sent";
  const client = (invoice as {
    client?: { name: string; email: string; company?: string | null };
  }).client;

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Invoices", href: "/admin/invoices" },
        { label: invoice.invoice_number },
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl">{invoice.invoice_number}</h1>
              <StatusBadge status={invoice.status} kind="invoice" />
            </div>
            {client ? (
              <p className="mt-1 text-sm text-muted">
                {client.name} · {client.email}
              </p>
            ) : null}
          </div>
        </div>

        <InvoiceAdminActions invoiceId={invoice.id} status={invoice.status} />

        <InvoiceClientPreview invoice={invoice} client={client} />

        {invoice.notes ? (
          <Card className="rounded-[var(--radius-md)] border-2 border-dashed border-coral bg-coral-tint/30 p-4">
            <p className="font-mono text-[10px] font-bold uppercase text-coral">
              Internal notes (admin only)
            </p>
            <p className="mt-1 text-sm">{invoice.notes}</p>
          </Card>
        ) : null}

        {canEdit ? (
          <Card className="space-y-4 p-6">
            <h2 className="font-display text-xl">Edit invoice</h2>
            <InvoiceForm
              clients={clients}
              mode="edit"
              invoiceId={invoice.id}
              defaultValues={{
                user_id: invoice.user_id,
                currency: invoice.currency as "USD" | "EUR" | "GBP",
                tax_rate: Number(invoice.tax_rate),
                issue_date: new Date(invoice.issue_date).toISOString().slice(0, 10),
                due_date: new Date(invoice.due_date).toISOString().slice(0, 10),
                client_notes: invoice.client_notes,
                notes: invoice.notes,
                line_items: invoice.line_items.map((item) => ({
                  description: item.description,
                  quantity: Number(item.quantity),
                  unit_price: Number(item.unit_price),
                })),
              }}
            />
          </Card>
        ) : null}
      </div>
    </AdminShell>
  );
}
