import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import { isAdmin } from "@/lib/permissions";
import { listAllCaseStudies } from "@/lib/repositories/case-studies";

export default async function AdminCaseStudiesPage() {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const caseStudies = await listAllCaseStudies();

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Case Studies" },
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">Case studies</h1>
            <p className="mt-1 text-sm text-muted">
              Portfolio entries shown on the marketing site.
            </p>
          </div>
          <Button href="/admin/case-studies/new">New case study</Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Title</TableHeader>
              <TableHeader scope="col">Client</TableHeader>
              <TableHeader scope="col">Slug</TableHeader>
              <TableHeader scope="col">Published</TableHeader>
              <TableHeader scope="col">Updated</TableHeader>
              <TableHeader scope="col">View</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {caseStudies.map((study) => (
              <TableRow key={study.id}>
                <TableCell className="font-semibold">
                  <Link
                    href={`/admin/case-studies/${study.id}`}
                    className="text-violet hover:underline"
                  >
                    {study.title}
                  </Link>
                </TableCell>
                <TableCell>{study.client_name}</TableCell>
                <TableCell>
                  <code className="text-xs">{study.slug}</code>
                </TableCell>
                <TableCell>{study.published ? "Yes" : "No"}</TableCell>
                <TableCell>{formatDate(study.updated_at)}</TableCell>
                <TableCell>
                  {study.published ? (
                    <Link
                      href={`/work/${study.slug}`}
                      className="text-sm font-bold text-violet"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Public page
                    </Link>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminShell>
  );
}
