import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";
import { Card } from "@/components/ui/card";
import { NewTicketForm } from "@/components/support/new-ticket-form";

export default async function NewSupportTicketPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <PortalShell userName={session.user.name ?? "Client"}>
      <Card className="mx-auto max-w-2xl space-y-4 p-6">
        <div>
          <h1 className="font-display text-3xl">Open a ticket</h1>
          <p className="mt-1 text-sm text-muted">
            Describe your issue and we&apos;ll get back to you.
          </p>
        </div>
        <NewTicketForm />
      </Card>
    </PortalShell>
  );
}
