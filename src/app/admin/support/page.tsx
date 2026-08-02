import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/format";
import { isAdmin } from "@/lib/permissions";
import { listAllTickets } from "@/lib/repositories/support";
import { prisma } from "@/lib/db";

export default async function AdminSupportPage() {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const tickets = await listAllTickets();
  const clients = await prisma.users.findMany({
    where: { id: { in: tickets.map((ticket) => ticket.user_id) } },
    select: { id: true, name: true },
  });
  const clientMap = new Map(clients.map((client) => [client.id, client.name]));

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Support" },
      ]}
    >
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">Support tickets</h1>
          <p className="mt-1 text-sm text-muted">
            Manage client support requests.
          </p>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Ticket</TableHeader>
              <TableHeader scope="col">Client</TableHeader>
              <TableHeader scope="col">Subject</TableHeader>
              <TableHeader scope="col">Status</TableHeader>
              <TableHeader scope="col">Priority</TableHeader>
              <TableHeader scope="col">Updated</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                className={!ticket.assigned_to_id ? "bg-coral-tint/20" : ""}
              >
                <TableCell>
                  <Link
                    href={`/admin/support/${ticket.id}`}
                    className="font-mono text-xs font-bold text-violet"
                  >
                    {ticket.ticket_number}
                  </Link>
                </TableCell>
                <TableCell>{clientMap.get(ticket.user_id) ?? "-"}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>
                  <StatusBadge status={ticket.status} kind="ticket" />
                </TableCell>
                <TableCell className="capitalize">{ticket.priority}</TableCell>
                <TableCell>{formatDateTime(ticket.last_reply_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminShell>
  );
}
