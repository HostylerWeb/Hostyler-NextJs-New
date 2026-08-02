import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { CreateClientForm } from "@/components/admin/create-client-form";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getClientsForAdmin } from "@/lib/actions/clients";
import { isAdmin } from "@/lib/permissions";
import { formatDate } from "@/lib/format";

export default async function AdminClientsPage() {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const clients = await getClientsForAdmin();

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Clients" },
      ]}
    >
      <div className="grid min-w-0 max-w-full gap-6 xl:grid-cols-[1.2fr_1fr]">
        <Card className="order-first h-fit min-w-0 max-w-full space-y-4 overflow-hidden p-4 sm:p-6 xl:order-2">
          <h2 className="font-display text-xl">Create client</h2>
          <CreateClientForm />
        </Card>

        <div className="order-2 min-w-0 space-y-6 xl:order-1">
          <div>
            <h1 className="font-display text-3xl">Clients</h1>
            <p className="mt-1 text-sm text-muted">
              Manage client accounts and access.
            </p>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeader scope="col">Name</TableHeader>
                <TableHeader scope="col">Email</TableHeader>
                <TableHeader scope="col">Company</TableHeader>
                <TableHeader scope="col">Status</TableHeader>
                <TableHeader scope="col">Joined</TableHeader>
                <TableHeader scope="col">Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="font-semibold text-violet hover:underline"
                    >
                      {client.name}
                    </Link>
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.company ?? "-"}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={client.is_active ? "paid" : "cancelled"}
                      kind="invoice"
                    />
                  </TableCell>
                  <TableCell>{formatDate(client.created_at)}</TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="text-sm font-semibold text-violet hover:underline"
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminShell>
  );
}
