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
};

export type UpdateUserProfileInput = {
  name?: string;
  company?: string | null;
  phone?: string | null;
};

export async function findUserByEmail(email: string): Promise<users | null> {
  return prisma.users.findUnique({
    where: { email: email.toLowerCase().trim() },
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
