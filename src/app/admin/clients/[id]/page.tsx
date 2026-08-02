import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { EditClientForm } from "@/components/admin/edit-client-form";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { getClientDetailForAdmin } from "@/lib/actions/clients";
import { isAdmin } from "@/lib/permissions";
import { formatCurrency, formatDate } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

function ClientInitials({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className="grid size-16 shrink-0 place-items-center rounded-full border-2.5 border-ink bg-lime font-display text-2xl font-bold text-ink shadow-brutal-sm"
      aria-hidden
    >
      {initials || "?"}
    </div>
  );
}

export default async function AdminClientDetailPage({ params }: Props) {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const { id } = await params;
  const data = await getClientDetailForAdmin(id);
  if (!data) notFound();

  const { client, invoices, tickets } = data;
  const openTickets = tickets.filter((ticket) => ticket.status === "open").length;
  const unpaidInvoices = invoices.filter(
    (invoice) => !["paid", "cancelled", "draft"].includes(invoice.status),
  ).length;
  const invoiceTotal = invoices.reduce((sum, invoice) => sum + Number(invoice.total), 0);
  const primaryCurrency = invoices[0]?.currency ?? "GBP";

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Clients", href: "/admin/clients" },
        { label: client.name },
      ]}
    >
      <div className="space-y-6">
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wide text-muted uppercase transition hover:text-ink"
        >
          ← Back to clients
        </Link>

        <Card tint="coral" className="overflow-hidden p-0">
          <div className="grid gap-6 p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <ClientInitials name={client.name} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl">{client.name}</h1>
                <StatusBadge
                  status={client.is_active ? "paid" : "cancelled"}
                  kind="invoice"
                />
              </div>
              <p className="mt-1 truncate text-sm font-semibold text-ink/80">{client.email}</p>
              {client.company ? (
                <p className="mt-0.5 text-sm text-muted">{client.company}</p>
              ) : null}
              {client.phone ? (
                <p className="mt-0.5 font-mono text-xs text-muted">{client.phone}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Button href={`/admin/invoices/new?client=${client.id}`} size="sm">
                New invoice
              </Button>
              <Button href="/admin/support" variant="ghost" size="sm">
                Support
              </Button>
            </div>
          </div>

          <div className="grid border-t-2.5 border-ink sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Invoices",
                value: String(invoices.length),
                hint: unpaidInvoices > 0 ? `${unpaidInvoices} unpaid` : "All settled",
              },
              {
                label: "Lifetime value",
                value: invoices.length > 0 ? formatCurrency(invoiceTotal, primaryCurrency) : "-",
                hint: invoices.length > 0 ? `Across ${invoices.length} invoice(s)` : "No billing yet",
              },
              {
                label: "Support tickets",
                value: String(tickets.length),
                hint: openTickets > 0 ? `${openTickets} open` : "No open tickets",
              },
              {
                label: "Client since",
                value: formatDate(client.created_at),
                hint: client.last_login_at
                  ? `Last login ${formatDate(client.last_login_at)}`
                  : "Never logged in",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border-ink/15 border-r-2.5 border-b-2.5 bg-paper/40 px-5 py-4 last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r-2.5 xl:last:border-r-0"
              >
                <p className="font-mono text-[10px] font-bold tracking-wide text-muted uppercase">
                  {stat.label}
                </p>
                <p className="mt-1 font-display text-xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted">{stat.hint}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
          <Card tint="violet" padding="lg" className="space-y-0 p-0">
            <div className="border-ink/10 border-b-2.5 px-6 py-5">
              <p className="font-mono text-[10px] font-bold tracking-wide text-violet uppercase">
                Account settings
              </p>
              <h2 className="mt-1 font-display text-2xl">Edit client</h2>
              <p className="mt-1 text-sm text-muted">
                Update profile details, reset credentials, or remove this account.
              </p>
            </div>
            <div className="bg-paper px-6 py-6">
              <EditClientForm client={client} />
            </div>
          </Card>

          <div className="space-y-6">
            <Card tint="lime" className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] font-bold tracking-wide text-muted uppercase">
                    Billing
                  </p>
                  <h2 className="font-display text-xl">Invoices</h2>
                </div>
                <span className="rounded-full border-2 border-ink bg-paper px-3 py-1 font-mono text-[11px] font-bold">
                  {invoices.length}
                </span>
              </div>
              {invoices.length === 0 ? (
                <div className="rounded-[var(--radius-md)] border-2 border-dashed border-ink/20 bg-paper/70 px-4 py-8 text-center">
                  <p className="text-sm font-semibold">No invoices yet</p>
                  <p className="mt-1 text-xs text-muted">
                    Create the first invoice for this client.
                  </p>
                  <Button
                    href={`/admin/invoices/new?client=${client.id}`}
                    size="sm"
                    className="mt-4"
                  >
                    Create invoice
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {invoices.slice(0, 5).map((invoice) => (
                    <Link
                      key={invoice.id}
                      href={`/admin/invoices/${invoice.id}`}
                      className="flex items-center justify-between rounded-[var(--radius-md)] border-2 border-ink bg-paper px-3 py-2.5 transition hover:-translate-x-px hover:-translate-y-px hover:shadow-brutal-sm"
                    >
                      <span className="text-sm font-semibold">{invoice.invoice_number}</span>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={invoice.status} kind="invoice" />
                        <span className="text-sm font-semibold">
                          {formatCurrency(Number(invoice.total), invoice.currency)}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {invoices.length > 5 ? (
                    <p className="pt-1 text-center text-xs text-muted">
                      +{invoices.length - 5} more invoice(s)
                    </p>
                  ) : null}
                </div>
              )}
            </Card>

            <Card className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] font-bold tracking-wide text-muted uppercase">
                    Support
                  </p>
                  <h2 className="font-display text-xl">Tickets</h2>
                </div>
                <span className="rounded-full border-2 border-ink bg-paper-2 px-3 py-1 font-mono text-[11px] font-bold">
                  {tickets.length}
                </span>
              </div>
              {tickets.length === 0 ? (
                <div className="rounded-[var(--radius-md)] border-2 border-dashed border-ink/20 bg-paper-2 px-4 py-8 text-center">
                  <p className="text-sm font-semibold">No support tickets</p>
                  <p className="mt-1 text-xs text-muted">
                    This client hasn&apos;t opened any tickets yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {tickets.slice(0, 5).map((ticket) => (
                    <Link
                      key={ticket.id}
                      href={`/admin/support/${ticket.id}`}
                      className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border-2 border-ink/10 bg-paper-2 px-3 py-2.5 transition hover:border-ink hover:bg-paper"
                    >
                      <span className="line-clamp-1 text-sm font-semibold">{ticket.subject}</span>
                      <StatusBadge status={ticket.status} kind="ticket" />
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
