import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/format";
import { listInvoicesByUser } from "@/lib/repositories/invoices";
import { markInvoicesOverdue } from "@/lib/repositories/invoices";

export default async function PortalInvoicesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  await markInvoicesOverdue();

  const invoices = await listInvoicesByUser(session.user.id);

  return (
    <PortalShell userName={session.user.name ?? "Client"}>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">Invoices</h1>
          <p className="mt-1 text-sm text-muted">View and pay your invoices.</p>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Invoice</TableHeader>
              <TableHeader scope="col">Date</TableHeader>
              <TableHeader scope="col">Total</TableHeader>
              <TableHeader scope="col">Status</TableHeader>
              <TableHeader scope="col">Due</TableHeader>
              <TableHeader scope="col">Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted">
                  No invoices yet.
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => {
                const isOverdue =
                  !["paid", "cancelled"].includes(invoice.status) &&
                  new Date(invoice.due_date) < new Date();
                const displayStatus = isOverdue ? "overdue" : invoice.status;
                const canPay = ["sent", "viewed", "overdue", "partially_paid"].includes(
                  invoice.status,
                );

                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-semibold">
                      {invoice.invoice_number}
                    </TableCell>
                    <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                    <TableCell>
                      {formatCurrency(Number(invoice.total), invoice.currency)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={displayStatus} kind="invoice" />
                    </TableCell>
                    <TableCell className={isOverdue ? "font-semibold text-coral" : ""}>
                      {formatDate(invoice.due_date)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link
                          href={`/portal/invoices/${invoice.id}`}
                          className="text-sm font-bold text-violet hover:underline"
                        >
                          View
                        </Link>
                        {canPay ? (
                          <Link
                            href={`/portal/invoices/${invoice.id}`}
                            className="text-sm font-bold text-coral hover:underline"
                          >
                            Pay
                          </Link>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </PortalShell>
  );
}
