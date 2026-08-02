import { AdminShell } from "@/components/admin/admin-shell";
import { ContactDeleteButton } from "@/components/admin/contact-delete-button";
import { formatContactBudget, formatContactProjectType } from "@/content/contact-options";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/format";
import { listContactSubmissions } from "@/lib/repositories/contact";

export default async function AdminContactsPage() {
  const submissions = await listContactSubmissions({ take: 100 });

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Contacts" },
      ]}
    >
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">Contact submissions</h1>
          <p className="mt-1 text-sm text-muted">
            Inbound project inquiries from the website contact form.
          </p>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Received</TableHeader>
              <TableHeader scope="col">Name</TableHeader>
              <TableHeader scope="col">Email</TableHeader>
              <TableHeader scope="col">Project</TableHeader>
              <TableHeader scope="col">Budget</TableHeader>
              <TableHeader scope="col">Email status</TableHeader>
              <TableHeader scope="col">Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-muted">
                  No submissions yet.
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{formatDateTime(submission.created_at)}</TableCell>
                  <TableCell className="font-semibold">{submission.name}</TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${submission.email}`}
                      className="font-medium text-violet hover:underline"
                    >
                      {submission.email}
                    </a>
                  </TableCell>
                  <TableCell>{formatContactProjectType(submission.project_type)}</TableCell>
                  <TableCell>{formatContactBudget(submission.budget)}</TableCell>
                  <TableCell>
                    {submission.email_sent_at ? (
                      <StatusBadge status="sent" kind="invoice" />
                    ) : submission.email_error ? (
                      <span
                        className="text-xs font-semibold text-coral"
                        title={submission.email_error}
                      >
                        Email failed
                      </span>
                    ) : (
                      <span className="text-xs text-muted">Pending</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <ContactDeleteButton
                      id={submission.id}
                      name={submission.name}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {submissions.some((item) => item.message) ? (
          <div className="space-y-4">
            <h2 className="font-display text-xl">Messages</h2>
            {submissions
              .filter((item) => item.message)
              .slice(0, 20)
              .map((submission) => (
                <article
                  key={`message-${submission.id}`}
                  className="rounded-[var(--radius-md)] border-2.5 border-ink bg-paper p-5 shadow-brutal-sm"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">
                      {submission.name}{" "}
                      <span className="font-normal text-muted">
                        &lt;{submission.email}&gt;
                      </span>
                    </p>
                    <span className="font-mono text-xs text-muted">
                      {formatDateTime(submission.created_at)}
                    </span>
                    <ContactDeleteButton
                      id={submission.id}
                      name={submission.name}
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-muted whitespace-pre-wrap">
                    {submission.message}
                  </p>
                </article>
              ))}
          </div>
        ) : null}
      </div>
    </AdminShell>
  );
}
