import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { findUserById } from "@/lib/repositories/users";

export async function getActiveSessionUser() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await findUserById(session.user.id);
  if (!user?.is_active) return null;

  return {
    ...session,
    user: {
      ...session.user,
      role: user.role,
      is_active: user.is_active,
    },
  };
}

export async function requirePortalUser() {
  const session = await getActiveSessionUser();
  if (!session) redirect("/login");
  return session;
}

export async function requireAdminUser() {
  const session = await getActiveSessionUser();
  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }
  return session;
}
