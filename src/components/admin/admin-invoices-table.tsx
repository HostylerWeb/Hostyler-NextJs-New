"use client";

import Link from "next/link";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/format";

type InvoiceRow = {
  id: string;
  invoice_number: string;
  status: string;
  total: number;
  currency: string;
  due_date: Date | string;
  paid_at?: Date | string | null;
  client?: { name: string } | null;
};

type AdminInvoicesTableProps = {
  invoices: InvoiceRow[];
};

export function AdminInvoicesTable({ invoices }: AdminInvoicesTableProps) {
  const rows = invoices.map((invoice) => {
    const isOverdue =
      !["paid", "cancelled"].includes(invoice.status) &&
      new Date(invoice.due_date) < new Date();

    return {
      ...invoice,
      displayStatus: isOverdue ? "overdue" : invoice.status,
    };
  });

  const columns: DataTableColumn<(typeof rows)[number]>[] = [
    {
      key: "number",
      header: "Invoice",
      cell: (row) => (
        <Link
          href={`/admin/invoices/${row.id}`}
          className="font-semibold text-violet hover:underline"
        >
          {row.invoice_number}
        </Link>
      ),
    },
    {
      key: "client",
      header: "Client",
      cell: (row) => row.client?.name ?? "-",
    },
    {
      key: "total",
      header: "Total",
      cell: (row) => formatCurrency(Number(row.total), row.currency),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.displayStatus} kind="invoice" />,
    },
    {
      key: "due",
      header: "Due",
      cell: (row) => formatDate(row.due_date),
    },
    {
      key: "paid",
      header: "Paid",
      cell: (row) => (row.paid_at ? formatDate(row.paid_at) : "-"),
    },
  ];

  return (
    <DataTable
      data={rows}
      columns={columns}
      searchKeys={["invoice_number"]}
      statusKey="displayStatus"
      statusOptions={[
        "draft",
        "sent",
        "viewed",
        "overdue",
        "partially_paid",
        "paid",
        "cancelled",
      ]}
      emptyMessage="No invoices yet."
    />
  );
}
