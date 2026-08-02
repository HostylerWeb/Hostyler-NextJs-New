import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTicketPanel } from "@/components/admin/admin-ticket-panel";
import { TicketDeleteButton } from "@/components/admin/ticket-delete-button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { isAdmin } from "@/lib/permissions";
import { getTicketWithRelations } from "@/lib/repositories/support";
import { listUsers } from "@/lib/repositories/users";
import { formatDateTime } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export default async function AdminTicketDetailPage({ params }: Props) {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const { id } = await params;
  const ticket = await getTicketWithRelations(id);
  if (!ticket) notFound();

  const admins = await listUsers({ where: { role: "admin", is_active: true } });

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Support", href: "/admin/support" },
        { label: ticket.ticket_number },
      ]}
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold text-violet">
              {ticket.ticket_number}
            </p>
            <h1 className="font-display text-2xl">{ticket.subject}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <StatusBadge status={ticket.status} kind="ticket" />
              <span className="rounded-full border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase">
                {ticket.priority}
              </span>
            </div>
            {ticket.client ? (
              <p className="mt-2 text-sm text-muted">
                Client:{" "}
                <Link
                  href={`/admin/clients/${ticket.client.id}`}
                  className="font-bold text-violet"
                >
                  {ticket.client.name}
                </Link>
              </p>
            ) : null}
          </div>
          <TicketDeleteButton
            ticketId={ticket.id}
            ticketNumber={ticket.ticket_number}
            redirectTo="/admin/support"
            size="default"
          />
        </div>

        <Card className="space-y-4 p-6">
          {ticket.messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-[var(--radius-md)] border-2 p-4 ${
                message.is_internal
                  ? "border-coral bg-coral-tint/40"
                  : message.author.role === "admin"
                    ? "border-violet bg-violet-tint/40"
                    : "border-ink bg-paper-2"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2 text-xs font-bold">
                <span>
                  {message.author.name}
                  {message.is_internal ? " (internal)" : ""}
                </span>
                <span className="text-muted">
                  {formatDateTime(message.created_at)}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm">{message.body}</p>
            </div>
          ))}
        </Card>

        <Card className="p-6">
          <AdminTicketPanel
            ticketId={ticket.id}
            status={ticket.status}
            priority={ticket.priority}
            assignedToId={ticket.assigned_to_id}
            admins={admins}
          />
        </Card>
      </div>
    </AdminShell>
  );
}
