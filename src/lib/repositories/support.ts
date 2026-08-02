import {
  support_messages,
  support_tickets,
  ticket_reply_by,
  ticket_status,
  Prisma,
} from "@/generated/prisma/client";
import { prisma } from "@/lib/db";

export type CreateTicketInput = {
  user_id: string;
  subject: string;
  body: string;
  category?: support_tickets["category"];
  priority?: support_tickets["priority"];
};

export type TicketWithMessages = support_tickets & {
  messages: support_messages[];
};

export async function generateTicketNumber(
  createdAt: Date = new Date(),
): Promise<string> {
  const year = createdAt.getFullYear();
  const prefix = `SUP-${year}-`;

  return prisma.$transaction(async (tx) => {
    const latest = await tx.support_tickets.findFirst({
      where: { ticket_number: { startsWith: prefix } },
      orderBy: { ticket_number: "desc" },
      select: { ticket_number: true },
    });

    const nextSequence = latest
      ? parseInt(latest.ticket_number.replace(prefix, ""), 10) + 1
      : 1;

    return `${prefix}${String(nextSequence).padStart(4, "0")}`;
  });
}

export async function createSupportTicket(
  input: CreateTicketInput,
): Promise<TicketWithMessages> {
  const ticket_number = await generateTicketNumber();

  return prisma.$transaction(async (tx) => {
    const ticket = await tx.support_tickets.create({
      data: {
        ticket_number,
        user_id: input.user_id,
        subject: input.subject,
        category: input.category ?? "technical",
        priority: input.priority ?? "normal",
        status: "open",
        last_reply_at: new Date(),
        last_reply_by: "client",
        messages: {
          create: {
            author_id: input.user_id,
            body: input.body,
            is_internal: false,
          },
        },
      },
      include: {
        messages: { orderBy: { created_at: "asc" } },
      },
    });

    return ticket;
  });
}

export async function getTicketById(
  id: string,
  options?: { includeInternal?: boolean },
): Promise<TicketWithMessages | null> {
  const ticket = await prisma.support_tickets.findUnique({
    where: { id },
    include: {
      messages: {
        where: options?.includeInternal ? undefined : { is_internal: false },
        orderBy: { created_at: "asc" },
      },
    },
  });

  return ticket;
}

export async function getTicketByNumber(
  ticketNumber: string,
): Promise<TicketWithMessages | null> {
  return prisma.support_tickets.findUnique({
    where: { ticket_number: ticketNumber },
    include: {
      messages: { orderBy: { created_at: "asc" } },
    },
  });
}

export async function listTicketsByUser(
  userId: string,
): Promise<support_tickets[]> {
  return prisma.support_tickets.findMany({
    where: { user_id: userId },
    orderBy: { last_reply_at: "desc" },
  });
}

export async function listAllTickets(
  filters?: {
    status?: ticket_status;
    assigned_to_id?: string | null;
    user_id?: string;
    priority?: support_tickets["priority"];
  },
): Promise<support_tickets[]> {
  return prisma.support_tickets.findMany({
    where: {
      status: filters?.status,
      assigned_to_id: filters?.assigned_to_id,
      user_id: filters?.user_id,
      priority: filters?.priority,
    },
    orderBy: { last_reply_at: "desc" },
  });
}

export async function getTicketWithRelations(id: string) {
  return prisma.support_tickets.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, email: true, company: true } },
      assigned_to: { select: { id: true, name: true, email: true } },
      messages: {
        orderBy: { created_at: "asc" },
        include: {
          author: { select: { id: true, name: true, role: true } },
        },
      },
    },
  });
}

export async function countOpenTicketsByUser(userId: string): Promise<number> {
  return prisma.support_tickets.count({
    where: {
      user_id: userId,
      status: { notIn: ["resolved", "closed"] },
    },
  });
}

export async function countAllOpenTickets(): Promise<number> {
  return prisma.support_tickets.count({
    where: { status: { notIn: ["resolved", "closed"] } },
  });
}

export async function addTicketMessage(input: {
  ticket_id: string;
  author_id: string;
  body: string;
  is_internal?: boolean;
  reply_by: ticket_reply_by;
  new_status?: ticket_status;
  assigned_to_id?: string | null;
}): Promise<support_messages> {
  return prisma.$transaction(async (tx) => {
    const message = await tx.support_messages.create({
      data: {
        ticket_id: input.ticket_id,
        author_id: input.author_id,
        body: input.body,
        is_internal: input.is_internal ?? false,
      },
    });

    await tx.support_tickets.update({
      where: { id: input.ticket_id },
      data: {
        last_reply_at: new Date(),
        last_reply_by: input.reply_by,
        status: input.new_status,
        assigned_to_id: input.assigned_to_id,
        resolved_at:
          input.new_status === "resolved" || input.new_status === "closed"
            ? new Date()
            : undefined,
      },
    });

    return message;
  });
}

export async function updateTicket(
  id: string,
  data: Prisma.support_ticketsUpdateInput,
): Promise<support_tickets> {
  return prisma.support_tickets.update({ where: { id }, data });
}

export async function deleteSupportTicket(id: string): Promise<void> {
  await prisma.support_tickets.delete({ where: { id } });
}
