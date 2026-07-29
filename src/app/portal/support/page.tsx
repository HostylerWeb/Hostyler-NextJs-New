import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
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
import { listTicketsByUser } from "@/lib/repositories/support";

export default async function PortalSupportPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const tickets = await listTicketsByUser(session.user.id);

  return (
    <PortalShell userName={session.user.name ?? "Client"}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">Support</h1>
            <p className="mt-1 text-sm text-muted">Track your support requests.</p>
          </div>
          <Button href="/portal/support/new">Open a ticket</Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Ticket</TableHeader>
              <TableHeader scope="col">Subject</TableHeader>
              <TableHeader scope="col">Status</TableHeader>
              <TableHeader scope="col">Priority</TableHeader>
              <TableHeader scope="col">Updated</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted">
                  No tickets yet.{" "}
                  <Link href="/portal/support/new" className="font-bold text-violet">
                    Open one
                  </Link>
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <Link
                      href={`/portal/support/${ticket.id}`}
                      className="font-mono text-xs font-bold text-violet"
                    >
                      {ticket.ticket_number}
                    </Link>
                  </TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <StatusBadge status={ticket.status} kind="ticket" />
                  </TableCell>
                  <TableCell className="capitalize">{ticket.priority}</TableCell>
                  <TableCell>{formatDateTime(ticket.last_reply_at)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </PortalShell>
  );
}
