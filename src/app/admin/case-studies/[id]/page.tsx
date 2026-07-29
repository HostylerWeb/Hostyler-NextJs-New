import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card } from "@/components/ui/card";
import { CaseStudyForm } from "@/components/admin/case-study-form";
import { getCaseStudyForAdmin } from "@/lib/actions/case-studies";
import { isAdmin } from "@/lib/permissions";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = { params: Promise<{ id: string }> };

export default async function AdminCaseStudyDetailPage({ params }: Props) {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const { id } = await params;
  const study = await getCaseStudyForAdmin(id);
  if (!study) notFound();

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Case Studies", href: "/admin/case-studies" },
        { label: study.title },
      ]}
    >
      <Card className="max-w-4xl space-y-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl">{study.title}</h1>
              <StatusBadge
                status={study.published ? "sent" : "draft"}
                kind="invoice"
              />
            </div>
            <p className="mt-1 text-sm text-muted">
              {study.client_name} · <code>{study.slug}</code>
            </p>
          </div>
        </div>
        <CaseStudyForm mode="edit" caseStudyId={study.id} defaultValues={study} />
      </Card>
    </AdminShell>
  );
}
