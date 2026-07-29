"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { hashPassword } from "@/lib/password-utils";
import { verifyPassword } from "@/lib/password-utils";
import {
  findUserById,
  updateUserPassword,
  updateUserProfile,
} from "@/lib/repositories/users";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  company: z.string().max(255).optional(),
  phone: z.string().max(50).optional(),
});

const passwordSchema = z
  .object({
    current_password: z.string().min(1),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type SettingsActionState = {
  error?: string;
  success?: string;
};

export async function updateProfileAction(
  _prev: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company") || undefined,
    phone: formData.get("phone") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  await updateUserProfile(session.user.id, {
    name: parsed.data.name,
    company: parsed.data.company ?? null,
    phone: parsed.data.phone ?? null,
  });

  revalidatePath("/portal/settings");
  return { success: "Profile updated." };
}

export async function changePasswordAction(
  _prev: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const parsed = passwordSchema.safeParse({
    current_password: formData.get("current_password"),
    new_password: formData.get("new_password"),
    confirm_password: formData.get("confirm_password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const user = await findUserById(session.user.id);
  if (!user) return { error: "User not found" };

  const valid = await verifyPassword(
    parsed.data.current_password,
    user.password_hash,
  );
  if (!valid) return { error: "Current password is incorrect" };

  await updateUserPassword(
    session.user.id,
    await hashPassword(parsed.data.new_password),
  );

  return { success: "Password changed." };
}
