import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card } from "@/components/ui/card";
import { CaseStudyForm } from "@/components/admin/case-study-form";
import { isAdmin } from "@/lib/permissions";

export default async function NewCaseStudyPage() {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Case Studies", href: "/admin/case-studies" },
        { label: "New" },
      ]}
    >
      <Card className="max-w-4xl space-y-6 p-6">
        <div>
          <h1 className="font-display text-3xl">New case study</h1>
          <p className="mt-1 text-sm text-muted">
            Create a portfolio entry for the marketing site.
          </p>
        </div>
        <CaseStudyForm mode="create" />
      </Card>
    </AdminShell>
  );
}
