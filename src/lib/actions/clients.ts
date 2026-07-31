"use server";

import { revalidatePath } from "next/cache";
import { randomBytes } from "node:crypto";
import { auth } from "@/lib/auth";
import { sendClientWelcomeInvite } from "@/lib/mail";
import { hashPassword } from "@/lib/password-utils";
import { isAdmin } from "@/lib/permissions";
import {
  createUser,
  deleteClientUser,
  findUserByEmail,
  findUserById,
  listClients,
  setUserActive,
  updateClientByAdmin,
  updateUserPassword,
} from "@/lib/repositories/users";
import { listInvoicesByUser } from "@/lib/repositories/invoices";
import { listTicketsByUser } from "@/lib/repositories/support";
import { z } from "zod";

const createClientSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email required"),
    company: z.string().optional(),
    phone: z.string().optional(),
    password_mode: z.enum(["generate", "custom"]),
    password: z.string().optional(),
    confirm_password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password_mode !== "custom") return;

    if (!data.password || data.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be at least 8 characters",
        path: ["password"],
      });
    }

    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

const updateClientSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email required"),
    company: z.string().optional(),
    phone: z.string().optional(),
    is_active: z.boolean(),
    password_mode: z.enum(["unchanged", "generate", "custom"]),
    password: z.string().optional(),
    confirm_password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password_mode === "unchanged") return;

    if (data.password_mode === "custom") {
      if (!data.password || data.password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters",
          path: ["password"],
        });
      }

      if (data.password !== data.confirm_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirm_password"],
        });
      }
    }
  });

function revalidateClientPaths(clientId?: string) {
  revalidatePath("/admin/clients");
  if (clientId) {
    revalidatePath(`/admin/clients/${clientId}`);
  }
}

export type ClientActionState = {
  error?: string;
  success?: string;
  generatedPassword?: string;
};

export async function createClientAction(
  _prev: ClientActionState,
  formData: FormData,
): Promise<ClientActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) return { error: "Unauthorized" };

  const passwordMode = formData.get("password_mode") === "custom" ? "custom" : "generate";

  const parsed = createClientSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    phone: formData.get("phone") || undefined,
    password_mode: passwordMode,
    password: formData.get("password") || undefined,
    confirm_password: formData.get("confirm_password") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const sendWelcomeEmail = formData.get("send_welcome_email") === "on";

  const existing = await findUserByEmail(parsed.data.email);
  if (existing) return { error: "A user with this email already exists" };

  const password =
    parsed.data.password_mode === "custom"
      ? parsed.data.password!
      : randomBytes(8).toString("base64url");

  const isGeneratedPassword = parsed.data.password_mode === "generate";

  await createUser({
    email: parsed.data.email,
    name: parsed.data.name,
    company: parsed.data.company ?? null,
    phone: parsed.data.phone ?? null,
    password_hash: await hashPassword(password),
    role: "client",
    email_verified_at: new Date(),
  });

  if (sendWelcomeEmail) {
    await sendClientWelcomeInvite({
      name: parsed.data.name,
      email: parsed.data.email,
      password,
      isTemporary: isGeneratedPassword,
    });
  }

  revalidateClientPaths();

  if (sendWelcomeEmail) {
    return {
      success: "Client account created and welcome email sent with login credentials.",
    };
  }

  if (isGeneratedPassword) {
    return {
      success: "Client account created. Copy the temporary password below.",
      generatedPassword: password,
    };
  }

  return {
    success: "Client account created with your chosen password.",
  };
}

export async function updateClientAction(
  clientId: string,
  _prev: ClientActionState,
  formData: FormData,
): Promise<ClientActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) return { error: "Unauthorized" };

  const client = await findUserById(clientId);
  if (!client || client.role !== "client") {
    return { error: "Client not found" };
  }

  const passwordModeRaw = formData.get("password_mode");
  const passwordMode =
    passwordModeRaw === "generate" || passwordModeRaw === "custom"
      ? passwordModeRaw
      : "unchanged";

  const parsed = updateClientSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    phone: formData.get("phone") || undefined,
    is_active: formData.get("is_active") === "on",
    password_mode: passwordMode,
    password: formData.get("password") || undefined,
    confirm_password: formData.get("confirm_password") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const emailChanged =
    parsed.data.email.toLowerCase().trim() !== client.email.toLowerCase().trim();
  if (emailChanged) {
    const existing = await findUserByEmail(parsed.data.email);
    if (existing && existing.id !== clientId) {
      return { error: "A user with this email already exists" };
    }
  }

  await updateClientByAdmin(clientId, {
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company ?? null,
    phone: parsed.data.phone ?? null,
    is_active: parsed.data.is_active,
  });

  let generatedPassword: string | undefined;
  let passwordUpdated = false;
  let isGeneratedPassword = false;

  if (parsed.data.password_mode === "generate") {
    generatedPassword = randomBytes(8).toString("base64url");
    await updateUserPassword(clientId, await hashPassword(generatedPassword));
    passwordUpdated = true;
    isGeneratedPassword = true;
  } else if (parsed.data.password_mode === "custom") {
    await updateUserPassword(clientId, await hashPassword(parsed.data.password!));
    passwordUpdated = true;
  }

  const sendCredentialsEmail = formData.get("send_credentials_email") === "on";

  if (passwordUpdated && sendCredentialsEmail) {
    const password =
      parsed.data.password_mode === "custom"
        ? parsed.data.password!
        : generatedPassword!;

    await sendClientWelcomeInvite({
      name: parsed.data.name,
      email: parsed.data.email,
      password,
      isTemporary: isGeneratedPassword,
      subject: "Your Hostyler login credentials have been updated",
      intro: "Your Hostyler client account credentials have been updated.",
    });
  }

  revalidateClientPaths(clientId);

  if (passwordUpdated && sendCredentialsEmail) {
    return { success: "Client updated and credentials email sent." };
  }

  if (isGeneratedPassword && !sendCredentialsEmail) {
    return {
      success: "Client updated. Copy the new temporary password below.",
      generatedPassword,
    };
  }

  if (passwordUpdated) {
    return { success: "Client updated with the new password." };
  }

  return { success: "Client updated." };
}

export async function deleteClientAction(
  clientId: string,
): Promise<ClientActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) return { error: "Unauthorized" };

  if (session?.user?.id === clientId) {
    return { error: "You cannot delete your own account." };
  }

  const client = await findUserById(clientId);
  if (!client || client.role !== "client") {
    return { error: "Client not found" };
  }

  try {
    await deleteClientUser(clientId);
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Could not delete this client.",
    };
  }

  revalidateClientPaths();
  return { success: "Client deleted." };
}

export async function toggleClientActiveAction(
  clientId: string,
  isActive: boolean,
): Promise<ClientActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) return { error: "Unauthorized" };

  await setUserActive(clientId, isActive);
  revalidateClientPaths(clientId);
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

  const client = await findUserById(clientId);
  if (!client || client.role !== "client") return null;

  const [invoices, tickets] = await Promise.all([
    listInvoicesByUser(clientId),
    listTicketsByUser(clientId),
  ]);

  return { client, invoices, tickets };
}
