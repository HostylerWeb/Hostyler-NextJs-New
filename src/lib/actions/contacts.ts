"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/permissions";
import { deleteContactSubmission } from "@/lib/repositories/contact";

export type ContactActionState = {
  error?: string;
  success?: string;
};

export async function deleteContactSubmissionAction(
  id: string,
): Promise<ContactActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  try {
    await deleteContactSubmission(id);
  } catch {
    return { error: "Submission not found or could not be deleted." };
  }

  revalidatePath("/admin/contacts");
  return { success: "Submission deleted." };
}
