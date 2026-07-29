import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminInvoicesTable } from "@/components/admin/admin-invoices-table";
import { Button } from "@/components/ui/button";
import { getAdminInvoiceList } from "@/lib/actions/invoices";
import { markInvoicesOverdue } from "@/lib/repositories/invoices";
import { isAdmin } from "@/lib/permissions";

export default async function AdminInvoicesPage() {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  await markInvoicesOverdue();

  const invoices = await getAdminInvoiceList();

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Invoices" },
      ]}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Invoices</h1>
          <p className="mt-1 text-sm text-muted">
            Create, send, and manage client invoices.
          </p>
        </div>
        <Button href="/admin/invoices/new">New invoice</Button>
      </div>
      <AdminInvoicesTable invoices={invoices} />
    </AdminShell>
  );
}
