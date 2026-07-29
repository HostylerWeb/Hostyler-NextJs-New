import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card } from "@/components/ui/card";
import { InvoiceForm } from "@/components/invoices/invoice-form";
import { getAdminClientsForSelect } from "@/lib/actions/invoices";
import { isAdmin } from "@/lib/permissions";

export default async function NewInvoicePage() {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const clients = await getAdminClientsForSelect();

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Invoices", href: "/admin/invoices" },
        { label: "New" },
      ]}
    >
      <Card className="max-w-4xl space-y-6 p-6">
        <div>
          <h1 className="font-display text-3xl">New invoice</h1>
          <p className="mt-1 text-sm text-muted">
            Save as draft, then send to the client when ready.
          </p>
        </div>
        <InvoiceForm clients={clients} mode="create" />
      </Card>
    </AdminShell>
  );
}
