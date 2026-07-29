"use server";

import { revalidatePath } from "next/cache";
import { randomBytes } from "node:crypto";
import { auth } from "@/lib/auth";
import { sendClientWelcomeInvite } from "@/lib/mail";
import { hashPassword } from "@/lib/password-utils";
import { isAdmin } from "@/lib/permissions";
import {
  createUser,
  findUserByEmail,
  listClients,
  setUserActive,
} from "@/lib/repositories/users";
import { listInvoicesByUser } from "@/lib/repositories/invoices";
import { listTicketsByUser } from "@/lib/repositories/support";
import { z } from "zod";

const createClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  phone: z.string().optional(),
});

export type ClientActionState = {
  error?: string;
  success?: string;
};

export async function createClientAction(
  _prev: ClientActionState,
  formData: FormData,
): Promise<ClientActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) return { error: "Unauthorized" };

  const parsed = createClientSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    phone: formData.get("phone") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const sendWelcomeEmail = formData.get("send_welcome_email") === "on";

  const existing = await findUserByEmail(parsed.data.email);
  if (existing) return { error: "A user with this email already exists" };

  const tempPassword = randomBytes(8).toString("base64url");

  await createUser({
    email: parsed.data.email,
    name: parsed.data.name,
    company: parsed.data.company ?? null,
    phone: parsed.data.phone ?? null,
    password_hash: await hashPassword(tempPassword),
    role: "client",
    email_verified_at: new Date(),
  });

  if (sendWelcomeEmail) {
    await sendClientWelcomeInvite({
      name: parsed.data.name,
      email: parsed.data.email,
      tempPassword,
    });
  }

  revalidatePath("/admin/clients");
  return {
    success: sendWelcomeEmail
      ? "Client account created and welcome email sent."
      : "Client account created.",
  };
}

export async function toggleClientActiveAction(
  clientId: string,
  isActive: boolean,
): Promise<ClientActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) return { error: "Unauthorized" };

  await setUserActive(clientId, isActive);
  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/admin/clients");
  return { success: isActive ? "Client activated." : "Client deactivated." };
}

export async function getClientsForAdmin() {
  const session = await auth();
  if (!isAdmin(session?.user)) return [];
  return listClients();
}

export async function getClientDetailForAdmin(clientId: string) {
  const session = await auth();
  if (!isAdmin(session?.user)) return null;

  const { findUserById } = await import("@/lib/repositories/users");
  const client = await findUserById(clientId);
  if (!client || client.role !== "client") return null;

  const [invoices, tickets] = await Promise.all([
    listInvoicesByUser(clientId),
    listTicketsByUser(clientId),
  ]);

  return { client, invoices, tickets };
}
