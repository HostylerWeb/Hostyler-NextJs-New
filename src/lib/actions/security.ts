"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/permissions";
import { clearSecurityEvents } from "@/lib/repositories/security";

export type SecurityActionState = {
  error?: string;
  success?: string;
};

export async function clearSecurityLogsAction(): Promise<SecurityActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  await clearSecurityEvents();

  revalidatePath("/admin/security");
  revalidatePath("/admin");
  return { success: "Security logs cleared." };
}
