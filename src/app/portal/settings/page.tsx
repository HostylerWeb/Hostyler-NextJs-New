import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";
import { SettingsForm } from "@/components/portal/settings-form";
import { findUserById } from "@/lib/repositories/users";

export default async function PortalSettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await findUserById(session.user.id);
  if (!user) redirect("/login");

  return (
    <PortalShell userName={session.user.name ?? "Client"}>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">Settings</h1>
          <p className="mt-1 text-sm text-muted">
            Update your profile and password.
          </p>
        </div>
        <SettingsForm
          profile={{
            name: user.name,
            email: user.email,
            company: user.company,
            phone: user.phone,
          }}
        />
      </div>
    </PortalShell>
  );
}
