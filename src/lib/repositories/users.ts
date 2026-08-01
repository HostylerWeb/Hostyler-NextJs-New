import { Prisma, user_role, users } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";

export type CreateUserInput = {
  email: string;
  password_hash: string;
  name: string;
  company?: string | null;
  phone?: string | null;
  role?: user_role;
  email_verified_at?: Date | null;
  registration_ip?: string | null;
};

export type UpdateUserProfileInput = {
  name?: string;
  company?: string | null;
  phone?: string | null;
};

export type UpdateClientByAdminInput = {
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  is_active: boolean;
};

export async function findUserByEmail(email: string): Promise<users | null> {
  return prisma.users.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
}

export async function findClientByRegistrationIp(ip: string): Promise<users | null> {
  const normalized = ip.trim();
  if (!normalized || normalized === "unknown") {
    return null;
  }

  return prisma.users.findFirst({
    where: {
      role: "client",
      registration_ip: normalized,
    },
  });
}

export async function findUserById(id: string): Promise<users | null> {
  return prisma.users.findUnique({ where: { id } });
}

export async function createUser(data: CreateUserInput): Promise<users> {
  return prisma.users.create({
    data: {
      ...data,
      email: data.email.toLowerCase().trim(),
    },
  });
}

export async function updateUserProfile(
  id: string,
  data: UpdateUserProfileInput,
): Promise<users> {
  return prisma.users.update({ where: { id }, data });
}

export async function updateClientByAdmin(
  id: string,
  data: UpdateClientByAdminInput,
): Promise<users> {
  return prisma.users.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email.toLowerCase().trim(),
      company: data.company ?? null,
      phone: data.phone ?? null,
      is_active: data.is_active,
    },
  });
}

export async function deleteClientUser(clientId: string): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const user = await tx.users.findUnique({ where: { id: clientId } });
    if (!user || user.role !== "client") {
      throw new Error("Client not found");
    }

    const createdInvoices = await tx.invoices.count({
      where: { created_by_id: clientId },
    });
    if (createdInvoices > 0) {
      throw new Error("Cannot delete this account because it created invoices.");
    }

    const ticketIds = (
      await tx.support_tickets.findMany({
        where: { user_id: clientId },
        select: { id: true },
      })
    ).map((ticket) => ticket.id);

    if (ticketIds.length > 0) {
      await tx.support_messages.deleteMany({
        where: { ticket_id: { in: ticketIds } },
      });
      await tx.support_tickets.deleteMany({ where: { user_id: clientId } });
    }

    await tx.support_messages.deleteMany({ where: { author_id: clientId } });

    const invoiceIds = (
      await tx.invoices.findMany({
        where: { user_id: clientId },
        select: { id: true },
      })
    ).map((invoice) => invoice.id);

    if (invoiceIds.length > 0) {
      await tx.payments.deleteMany({ where: { invoice_id: { in: invoiceIds } } });
      await tx.invoices.deleteMany({ where: { user_id: clientId } });
    }

    await tx.contact_submissions.updateMany({
      where: { user_id: clientId },
      data: { user_id: null },
    });

    await tx.users.delete({ where: { id: clientId } });
  });
}

export async function updateUserPassword(
  id: string,
  password_hash: string,
): Promise<users> {
  return prisma.users.update({
    where: { id },
    data: { password_hash },
  });
}

export async function markEmailVerified(id: string): Promise<users> {
  return prisma.users.update({
    where: { id },
    data: { email_verified_at: new Date() },
  });
}

export async function updateLastLogin(id: string): Promise<users> {
  return prisma.users.update({
    where: { id },
    data: { last_login_at: new Date() },
  });
}

export async function listClients(): Promise<users[]> {
  return prisma.users.findMany({
    where: { role: "client" },
    orderBy: { created_at: "desc" },
  });
}

export async function setUserActive(
  id: string,
  is_active: boolean,
): Promise<users> {
  return prisma.users.update({
    where: { id },
    data: { is_active },
  });
}

export async function upsertUserByEmail(
  email: string,
  data: Omit<CreateUserInput, "email">,
): Promise<users> {
  const normalized = email.toLowerCase().trim();
  return prisma.users.upsert({
    where: { email: normalized },
    create: { email: normalized, ...data },
    update: {
      password_hash: data.password_hash,
      name: data.name,
      company: data.company,
      phone: data.phone,
      role: data.role,
      email_verified_at: data.email_verified_at,
    },
  });
}

export async function listUsers(
  args?: Prisma.usersFindManyArgs,
): Promise<users[]> {
  return prisma.users.findMany({
    orderBy: { created_at: "desc" },
    ...args,
  });
}
