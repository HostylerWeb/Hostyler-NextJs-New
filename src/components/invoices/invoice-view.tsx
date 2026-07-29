import type { invoice_line_items, invoices } from "@/generated/prisma/client";
import { formatCurrency, formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type InvoiceViewProps = {
  invoice: invoices & { line_items: invoice_line_items[] };
  showInternalNotes?: boolean;
};

export function InvoiceView({ invoice, showInternalNotes }: InvoiceViewProps) {
  const isOverdue =
    invoice.status !== "paid" &&
    invoice.status !== "cancelled" &&
    new Date(invoice.due_date) < new Date();

  return (
    <div className="space-y-6 print:space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold text-violet uppercase">
            {invoice.invoice_number}
          </p>
          <h2 className="mt-1 font-display text-2xl">
            {formatCurrency(Number(invoice.total), invoice.currency)}
          </h2>
        </div>
        <StatusBadge
          status={isOverdue && invoice.status !== "overdue" ? "overdue" : invoice.status}
          kind="invoice"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase text-muted">
            Issue date
          </p>
          <p className="text-sm font-semibold">{formatDate(invoice.issue_date)}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-bold uppercase text-muted">
            Due date
          </p>
          <p
            className={`text-sm font-semibold ${isOverdue ? "text-coral" : ""}`}
          >
            {formatDate(invoice.due_date)}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-bold uppercase text-muted">
            Amount paid
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(Number(invoice.amount_paid), invoice.currency)}
          </p>
        </div>
      </div>

      {invoice.client_notes ? (
        <p className="rounded-[var(--radius-md)] border-2 border-ink bg-paper-2 p-4 text-sm">
          {invoice.client_notes}
        </p>
      ) : null}

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader scope="col">Description</TableHeader>
            <TableHeader scope="col" className="text-right">
              Qty
            </TableHeader>
            <TableHeader scope="col" className="text-right">
              Unit price
            </TableHeader>
            <TableHeader scope="col" className="text-right">
              Amount
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoice.line_items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">{Number(item.quantity)}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(Number(item.unit_price), invoice.currency)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(Number(item.amount), invoice.currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="ml-auto max-w-xs space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-semibold">
            {formatCurrency(Number(invoice.subtotal), invoice.currency)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Tax ({Number(invoice.tax_rate)}%)</span>
          <span className="font-semibold">
            {formatCurrency(Number(invoice.tax_amount), invoice.currency)}
          </span>
        </div>
        <div className="flex justify-between border-t-2 border-ink pt-2 text-base">
          <span className="font-bold">Total</span>
          <span className="font-bold">
            {formatCurrency(Number(invoice.total), invoice.currency)}
          </span>
        </div>
      </div>

      {showInternalNotes && invoice.notes ? (
        <div className="rounded-[var(--radius-md)] border-2 border-dashed border-coral bg-coral-tint/30 p-4">
          <p className="font-mono text-[10px] font-bold uppercase text-coral">
            Internal notes
          </p>
          <p className="mt-1 text-sm">{invoice.notes}</p>
        </div>
      ) : null}
    </div>
  );
}
