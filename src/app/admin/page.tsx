import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card } from "@/components/ui/card";
import { isAdmin } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { countAllOpenTickets } from "@/lib/repositories/support";
import { markInvoicesOverdue } from "@/lib/repositories/invoices";
import { formatCurrency } from "@/lib/format";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  await markInvoicesOverdue();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [unpaidAgg, overdueCount, openTickets, newContacts, recentPayments] =
    await Promise.all([
      prisma.invoices.aggregate({
        where: { status: { notIn: ["paid", "cancelled", "draft"] } },
        _sum: { total: true, amount_paid: true },
      }),
      prisma.invoices.count({
        where: { status: "overdue" },
      }),
      countAllOpenTickets(),
      prisma.contact_submissions.count({
        where: {
          created_at: { gte: sevenDaysAgo },
        },
      }),
      prisma.payments.findMany({
        where: { status: "completed" },
        orderBy: { created_at: "desc" },
        take: 5,
        include: {
          invoice: { select: { invoice_number: true } },
        },
      }),
    ]);

  const unpaidTotal =
    Number(unpaidAgg._sum.total ?? 0) - Number(unpaidAgg._sum.amount_paid ?? 0);

  return (
    <AdminShell breadcrumbs={[{ label: "Admin" }]}>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl">Admin dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Overview of invoices, support, and activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card tint="violet" className="p-5">
            <p className="font-mono text-[10px] font-bold uppercase text-muted">
              Unpaid total
            </p>
            <p className="mt-2 font-display text-2xl">
              {formatCurrency(unpaidTotal)}
            </p>
          </Card>
          <Card tint="coral" className="p-5">
            <p className="font-mono text-[10px] font-bold uppercase text-muted">
              Overdue
            </p>
            <p className="mt-2 font-display text-2xl">{overdueCount}</p>
          </Card>
          <Card tint="lime" className="p-5">
            <p className="font-mono text-[10px] font-bold uppercase text-muted">
              Open tickets
            </p>
            <p className="mt-2 font-display text-2xl">{openTickets}</p>
          </Card>
          <Card className="p-5">
            <p className="font-mono text-[10px] font-bold uppercase text-muted">
              New contacts (7d)
            </p>
            <p className="mt-2 font-display text-2xl">{newContacts}</p>
            <Link href="/admin/contacts" className="mt-3 inline-block text-sm font-bold text-violet">
              View submissions →
            </Link>
          </Card>
        </div>

        <Card className="space-y-3 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Recent payments</h2>
            <Link href="/admin/invoices" className="text-sm font-bold text-violet">
              All invoices
            </Link>
          </div>
          {recentPayments.length === 0 ? (
            <p className="text-sm text-muted">No payments yet.</p>
          ) : (
            recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between rounded-[var(--radius-md)] border-2 border-ink/10 px-3 py-2"
              >
                <span className="text-sm font-semibold">
                  {payment.invoice.invoice_number}
                </span>
                <span className="text-sm">
                  {formatCurrency(Number(payment.amount), payment.currency)}
                </span>
              </div>
            ))
          )}
        </Card>
      </div>
    </AdminShell>
  );
}
