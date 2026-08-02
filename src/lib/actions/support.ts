"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import {
  sendNewTicketNotificationToStaff,
  sendTicketReplyToClient,
  sendTicketReplyToStaff,
} from "@/lib/mail";
import { canReplyTicket, canViewTicket, isAdmin } from "@/lib/permissions";
import {
  addTicketMessage,
  createSupportTicket,
  deleteSupportTicket,
  getTicketWithRelations,
  updateTicket,
} from "@/lib/repositories/support";
import {
  newTicketSchema,
  ticketReplySchema,
} from "@/lib/validators/support";
import type { ticket_status } from "@/generated/prisma/client";

export type SupportActionState = {
  error?: string;
  success?: string;
};

export async function createTicketAction(
  _prev: SupportActionState,
  formData: FormData,
): Promise<SupportActionState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const parsed = newTicketSchema.safeParse({
    subject: formData.get("subject"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const ticket = await createSupportTicket({
    user_id: session.user.id,
    subject: parsed.data.subject,
    body: parsed.data.body,
    category: parsed.data.category,
    priority: parsed.data.priority,
  });

  const ticketUrl = `${env.NEXT_PUBLIC_SITE_URL}/admin/support/${ticket.id}`;

  await sendNewTicketNotificationToStaff({
    ticketNumber: ticket.ticket_number,
    subject: ticket.subject,
    clientName: session.user.name ?? "Client",
    body: parsed.data.body,
    ticketUrl,
  });

  redirect(`/portal/support/${ticket.id}`);
}

export async function replyToTicketAction(
  ticketId: string,
  _prev: SupportActionState,
  formData: FormData,
): Promise<SupportActionState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const ticket = await getTicketWithRelations(ticketId);
  if (!ticket) return { error: "Ticket not found" };

  const parsed = ticketReplySchema.safeParse({
    body: formData.get("body"),
    is_internal: formData.get("is_internal") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid message" };
  }

  if (
    !canReplyTicket(session.user, ticket, parsed.data.is_internal ?? false)
  ) {
    return { error: "Unauthorized" };
  }

  const isStaff = isAdmin(session.user);
  const isInternal = isStaff && (parsed.data.is_internal ?? false);

  await addTicketMessage({
    ticket_id: ticketId,
    author_id: session.user.id,
    body: parsed.data.body,
    is_internal: isInternal,
    reply_by: isStaff ? "staff" : "client",
    new_status: isStaff
      ? isInternal
        ? ticket.status
        : "waiting_on_client"
      : "waiting_on_staff",
  });

  const portalUrl = `${env.NEXT_PUBLIC_SITE_URL}/portal/support/${ticketId}`;
  const adminUrl = `${env.NEXT_PUBLIC_SITE_URL}/admin/support/${ticketId}`;

  if (isStaff && !isInternal && ticket.client) {
    await sendTicketReplyToClient({
      ticketNumber: ticket.ticket_number,
      subject: ticket.subject,
      clientName: ticket.client.name,
      clientEmail: ticket.client.email,
      message: parsed.data.body,
      ticketUrl: portalUrl,
    });
  }

  if (!isStaff) {
    await sendTicketReplyToStaff({
      ticketNumber: ticket.ticket_number,
      subject: ticket.subject,
      clientName: session.user.name ?? "Client",
      message: parsed.data.body,
      ticketUrl: adminUrl,
    });
  }

  revalidatePath(`/portal/support/${ticketId}`);
  revalidatePath(`/admin/support/${ticketId}`);
  revalidatePath("/portal/support");
  revalidatePath("/admin/support");

  return { success: "Reply sent." };
}

export async function closeTicketAction(
  ticketId: string,
): Promise<SupportActionState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const ticket = await getTicketWithRelations(ticketId);
  if (!ticket || !canViewTicket(session.user, ticket)) {
    return { error: "Unauthorized" };
  }

  await updateTicket(ticketId, {
    status: "closed",
    resolved_at: new Date(),
  });

  revalidatePath(`/portal/support/${ticketId}`);
  revalidatePath("/portal/support");
  return { success: "Ticket closed." };
}

export async function closeTicketFormAction(formData: FormData) {
  const ticketId = formData.get("ticket_id");
  if (typeof ticketId !== "string") return;
  await closeTicketAction(ticketId);
}

export async function updateTicketAdminAction(
  ticketId: string,
  _prev: SupportActionState,
  formData: FormData,
): Promise<SupportActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) return { error: "Unauthorized" };

  const status = formData.get("status") as ticket_status;
  const priority = formData.get("priority") as
    | "low"
    | "normal"
    | "high"
    | "urgent";
  const assignedTo = formData.get("assigned_to_id") as string;

  await updateTicket(ticketId, {
    status,
    priority,
    assigned_to: assignedTo
      ? { connect: { id: assignedTo } }
      : { disconnect: true },
    resolved_at:
      status === "resolved" || status === "closed" ? new Date() : null,
  });

  revalidatePath(`/admin/support/${ticketId}`);
  revalidatePath("/admin/support");
  return { success: "Ticket updated." };
}

export async function deleteSupportTicketAction(
  ticketId: string,
): Promise<SupportActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) return { error: "Unauthorized" };

  const ticket = await getTicketWithRelations(ticketId);
  if (!ticket) return { error: "Ticket not found" };

  try {
    await deleteSupportTicket(ticketId);
  } catch {
    return { error: "Ticket could not be deleted." };
  }

  revalidatePath("/admin/support");
  return { success: "Ticket deleted." };
}
