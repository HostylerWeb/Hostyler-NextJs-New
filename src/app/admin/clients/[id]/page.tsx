import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { ClientActiveToggle } from "@/components/admin/client-active-toggle";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getClientDetailForAdmin } from "@/lib/actions/clients";
import { isAdmin } from "@/lib/permissions";
import { formatCurrency } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export default async function AdminClientDetailPage({ params }: Props) {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const { id } = await params;
  const data = await getClientDetailForAdmin(id);
  if (!data) notFound();

  const { client, invoices, tickets } = data;

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Clients", href: "/admin/clients" },
        { label: client.name },
      ]}
    >
      <div className="space-y-6">
        <Card className="flex flex-wrap items-start justify-between gap-4 p-6">
          <div>
            <h1 className="font-display text-3xl">{client.name}</h1>
            <p className="text-sm text-muted">{client.email}</p>
            {client.company ? (
              <p className="text-sm text-muted">{client.company}</p>
            ) : null}
          </div>
          <ClientActiveToggle clientId={client.id} isActive={client.is_active} />
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-3 p-6">
            <h2 className="font-display text-xl">Invoices</h2>
            {invoices.map((invoice) => (
              <Link
                key={invoice.id}
                href={`/admin/invoices/${invoice.id}`}
                className="flex items-center justify-between rounded-[var(--radius-md)] border-2 border-ink/10 px-3 py-2 hover:bg-paper-2"
              >
                <span className="text-sm font-semibold">{invoice.invoice_number}</span>
                <div className="flex items-center gap-2">
                  <StatusBadge status={invoice.status} kind="invoice" />
                  <span className="text-sm">
                    {formatCurrency(Number(invoice.total), invoice.currency)}
                  </span>
                </div>
              </Link>
            ))}
          </Card>

          <Card className="space-y-3 p-6">
            <h2 className="font-display text-xl">Support tickets</h2>
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/admin/support/${ticket.id}`}
                className="flex items-center justify-between rounded-[var(--radius-md)] border-2 border-ink/10 px-3 py-2 hover:bg-paper-2"
              >
                <span className="text-sm font-semibold">{ticket.subject}</span>
                <StatusBadge status={ticket.status} kind="ticket" />
              </Link>
            ))}
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
