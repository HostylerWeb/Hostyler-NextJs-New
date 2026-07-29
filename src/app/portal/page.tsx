import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/format";
import { listInvoicesByUser, markInvoicesOverdue } from "@/lib/repositories/invoices";
import { listTicketsByUser } from "@/lib/repositories/support";

export default async function PortalDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  await markInvoicesOverdue();

  const [invoices, tickets] = await Promise.all([
    listInvoicesByUser(session.user.id),
    listTicketsByUser(session.user.id),
  ]);

  const openInvoices = invoices.filter(
    (invoice) => !["paid", "cancelled"].includes(invoice.status),
  );
  const overdueInvoices = openInvoices.filter(
    (invoice) => new Date(invoice.due_date) < new Date(),
  );
  const totalDue = openInvoices.reduce(
    (sum, invoice) =>
      sum + (Number(invoice.total) - Number(invoice.amount_paid)),
    0,
  );
  const openTickets = tickets.filter(
    (ticket) => !["resolved", "closed"].includes(ticket.status),
  );

  return (
    <PortalShell userName={session.user.name ?? "Client"}>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl">
            Welcome back, {session.user.name?.split(" ")[0] ?? "there"}
          </h1>
          <p className="mt-1 text-sm text-muted">
            Here&apos;s what needs your attention.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card tint="violet" className="p-5">
            <p className="font-mono text-[10px] font-bold uppercase text-muted">
              Open invoices
            </p>
            <p className="mt-2 font-display text-2xl">{openInvoices.length}</p>
            <p className="text-sm text-muted">{formatCurrency(totalDue)} due</p>
          </Card>
          <Card tint="coral" className="p-5">
            <p className="font-mono text-[10px] font-bold uppercase text-muted">
              Overdue
            </p>
            <p className="mt-2 font-display text-2xl">{overdueInvoices.length}</p>
          </Card>
          <Card tint="lime" className="p-5">
            <p className="font-mono text-[10px] font-bold uppercase text-muted">
              Open tickets
            </p>
            <p className="mt-2 font-display text-2xl">{openTickets.length}</p>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button href="/portal/invoices">View invoices</Button>
          <Button href="/portal/support/new" variant="ghost">
            Open ticket
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Recent invoices</h2>
              <Link href="/portal/invoices" className="text-sm font-bold text-violet">
                View all
              </Link>
            </div>
            {invoices.slice(0, 5).map((invoice) => (
              <Link
                key={invoice.id}
                href={`/portal/invoices/${invoice.id}`}
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

          <Card className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Recent tickets</h2>
              <Link href="/portal/support" className="text-sm font-bold text-violet">
                View all
              </Link>
            </div>
            {tickets.slice(0, 5).map((ticket) => (
              <Link
                key={ticket.id}
                href={`/portal/support/${ticket.id}`}
                className="flex items-center justify-between rounded-[var(--radius-md)] border-2 border-ink/10 px-3 py-2 hover:bg-paper-2"
              >
                <span className="text-sm font-semibold">{ticket.subject}</span>
                <StatusBadge status={ticket.status} kind="ticket" />
              </Link>
            ))}
            {tickets.length === 0 ? (
              <p className="text-sm text-muted">No support tickets yet.</p>
            ) : null}
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}
