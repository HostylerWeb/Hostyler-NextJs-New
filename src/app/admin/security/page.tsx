import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { ClearSecurityLogsButton } from "@/components/admin/clear-security-logs-button";
import { Card } from "@/components/ui/card";
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
import { isAdmin } from "@/lib/permissions";
import {
  listActiveIpBlocks,
  listSecurityEventsForAdmin,
} from "@/lib/repositories/security";

function formatEventKind(kind: string) {
  return kind.replaceAll("_", " ");
}

export default async function AdminSecurityPage() {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const [events, activeBlocks] = await Promise.all([
    listSecurityEventsForAdmin(250),
    listActiveIpBlocks(),
  ]);

  const activeIncidents = events.filter(
    (event) => event.is_incident && event.blocked_until && event.blocked_until > new Date(),
  );

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Security" },
      ]}
    >
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">Security</h1>
          <p className="mt-1 text-sm text-muted">
            Permanent log of password reset abuse, blocked IPs, and suspicious activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card tint="coral" className="p-5">
            <p className="font-mono text-[10px] font-bold tracking-wide text-muted uppercase">
              Active IP blocks
            </p>
            <p className="mt-2 font-display text-2xl">{activeBlocks.length}</p>
          </Card>
          <Card tint="violet" className="p-5">
            <p className="font-mono text-[10px] font-bold tracking-wide text-muted uppercase">
              Flagged incidents
            </p>
            <p className="mt-2 font-display text-2xl">{activeIncidents.length}</p>
          </Card>
        </div>

        {activeBlocks.length > 0 ? (
          <Card tint="coral" className="space-y-4 p-6">
            <h2 className="font-display text-xl">Currently blocked IPs</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader scope="col">IP address</TableHeader>
                  <TableHeader scope="col">Reason</TableHeader>
                  <TableHeader scope="col">Blocked until</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeBlocks.map((block) => (
                  <TableRow key={block.ip_address}>
                    <TableCell className="font-mono text-sm font-semibold">
                      {block.ip_address}
                    </TableCell>
                    <TableCell>{block.reason}</TableCell>
                    <TableCell>{formatDateTime(block.blocked_until)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : null}

        <Card className="space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl">Security event log</h2>
            <div className="flex flex-wrap items-center gap-3">
              <ClearSecurityLogsButton />
              <Link href="/admin" className="text-sm font-bold text-violet">
                Back to dashboard
              </Link>
            </div>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader scope="col">Time</TableHeader>
                <TableHeader scope="col">Event</TableHeader>
                <TableHeader scope="col">IP</TableHeader>
                <TableHeader scope="col">Email</TableHeader>
                <TableHeader scope="col">Attempted value</TableHeader>
                <TableHeader scope="col">Fingerprint</TableHeader>
                <TableHeader scope="col">Browser</TableHeader>
                <TableHeader scope="col">Flag</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-muted">
                    No security events recorded yet.
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="whitespace-nowrap">
                      {formatDateTime(event.created_at)}
                    </TableCell>
                    <TableCell className="font-semibold capitalize">
                      {formatEventKind(event.kind)}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{event.ip_address}</TableCell>
                    <TableCell>{event.email ?? "-"}</TableCell>
                    <TableCell className="max-w-[140px] truncate font-mono text-xs">
                      {event.attempted_value ?? "-"}
                    </TableCell>
                    <TableCell className="max-w-[120px] truncate font-mono text-xs">
                      {event.device_fingerprint ?? "-"}
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate text-xs" title={event.browser_details ?? undefined}>
                      {event.browser_details ?? event.user_agent ?? "-"}
                    </TableCell>
                    <TableCell>
                      {event.is_incident ? (
                        <StatusBadge status="overdue" kind="invoice" />
                      ) : (
                        <span className="text-xs text-muted">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminShell>
  );
}
