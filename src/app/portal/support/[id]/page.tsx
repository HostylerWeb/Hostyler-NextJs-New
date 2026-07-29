import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { TicketReplyForm } from "@/components/support/ticket-reply-form";
import { closeTicketFormAction } from "@/lib/actions/support";
import { canViewTicket } from "@/lib/permissions";
import { getTicketWithRelations } from "@/lib/repositories/support";
import { formatDateTime } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export default async function PortalTicketDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const ticket = await getTicketWithRelations(id);
  if (!ticket || !canViewTicket(session.user, ticket)) notFound();

  const publicMessages = ticket.messages.filter((message) => !message.is_internal);

  return (
    <PortalShell userName={session.user.name ?? "Client"}>
      <div className="mx-auto max-w-3xl space-y-6">
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
          </div>
          {ticket.status !== "closed" ? (
            <form action={closeTicketFormAction}>
              <input type="hidden" name="ticket_id" value={ticket.id} />
              <Button type="submit" variant="ghost" size="sm">
                Close ticket
              </Button>
            </form>
          ) : null}
        </div>

        <Card className="space-y-4 p-6">
          {publicMessages.map((message) => (
            <div
              key={message.id}
              className={`rounded-[var(--radius-md)] border-2 p-4 ${
                message.author.role === "admin"
                  ? "border-violet bg-violet-tint/40"
                  : "border-ink bg-paper-2"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2 text-xs font-bold">
                <span>{message.author.name}</span>
                <span className="text-muted">
                  {formatDateTime(message.created_at)}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm">{message.body}</p>
            </div>
          ))}
        </Card>

        {ticket.status !== "closed" ? (
          <Card className="p-6">
            <h2 className="mb-4 font-display text-lg">Reply</h2>
            <TicketReplyForm ticketId={ticket.id} />
          </Card>
        ) : null}
      </div>
    </PortalShell>
  );
}
