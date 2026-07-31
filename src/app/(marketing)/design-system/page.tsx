"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { DataTable } from "@/components/admin/data-table";
import { PortalShell } from "@/components/portal/portal-shell";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { EyebrowChip } from "@/components/ui/eyebrow-chip";
import { Field } from "@/components/ui/field";
import { Highlight } from "@/components/ui/highlight";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Pagination } from "@/components/ui/pagination";
import { Select } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/components/layout/section";
import { SectionHead } from "@/components/layout/section-head";
import { Wrap } from "@/components/layout/wrap";
import { formatCurrency, formatDate } from "@/lib/format";

const sampleRows = [
  { id: "INV-2026-0001", client: "Northstar Finance", status: "sent", total: 18000 },
  { id: "INV-2026-0002", client: "Loop Health", status: "paid", total: 24000 },
];

export default function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Section tight pageTop>
      <Wrap className="space-y-16">
        <SectionHead
          eyebrow="Phase 2"
          title="Design system"
          description="Neo-brutalist tokens and shared UI migrated from hostyler-1.html."
        />

        <section className="space-y-4">
          <h3 className="font-display text-2xl">Typography & chips</h3>
          <div className="flex flex-wrap items-center gap-4">
            <EyebrowChip>Web · App · AI</EyebrowChip>
            <EyebrowChip tone="lime">Production-ready AI</EyebrowChip>
            <h1 className="text-4xl">
              Big ideas, <Highlight>built</Highlight> fast.
            </h1>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-display text-2xl">Buttons & badges</h3>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="ink">Ink</Button>
            <Button variant="lime">Lime</Button>
            <Badge>Outline</Badge>
            <Tag>Next.js</Tag>
            <StatusBadge status="paid" kind="invoice" />
            <StatusBadge status="open" kind="ticket" />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-display text-2xl">Forms</h3>
          <Card className="max-w-xl space-y-4">
            <Field label="Name" htmlFor="ds-name">
              <Input id="ds-name" placeholder="Jordan Reyes" />
            </Field>
            <Field label="Project type" htmlFor="ds-type">
              <Select id="ds-type" defaultValue="web">
                <option value="web">Web platform</option>
                <option value="app">Mobile app</option>
              </Select>
            </Field>
            <Field label="Message" htmlFor="ds-message">
              <Textarea id="ds-message" placeholder="Tell us what you're building…" />
            </Field>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <Checkbox defaultChecked /> Send me updates
            </label>
          </Card>
        </section>

        <section className="space-y-4">
          <h3 className="font-display text-2xl">Feedback</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Alert variant="success" title="Saved">
              Invoice marked as sent.
            </Alert>
            <Alert variant="error" title="Payment failed">
              PayPal capture was declined.
            </Alert>
            <Alert variant="info">Reply sent to client.</Alert>
          </div>
          <div className="flex items-center gap-6">
            <LoadingSpinner />
            <EmptyState
              title="No tickets yet"
              description="Open a support ticket from the portal."
              action={{ label: "New ticket", href: "/portal/support/new" }}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-display text-2xl">Data table</h3>
          <p className="text-sm text-muted">
            Sample total: {formatCurrency(24000)} · Date: {formatDate(new Date())}
          </p>
          <DataTable
            data={sampleRows}
            searchKeys={["id", "client"]}
            statusKey="status"
            statusOptions={["sent", "paid", "draft"]}
            columns={[
              { key: "id", header: "Invoice", cell: (row) => row.id },
              { key: "client", header: "Client", cell: (row) => row.client },
              {
                key: "status",
                header: "Status",
                cell: (row) => <StatusBadge status={row.status} kind="invoice" />,
              },
              {
                key: "total",
                header: "Total",
                cell: (row) => formatCurrency(row.total),
              },
            ]}
          />
          <Pagination page={1} totalPages={3} hrefForPage={(page) => `?page=${page}`} />
          <Button variant="ghost" size="sm" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
          <Dialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Void invoice?"
            description="This cannot be undone. The client will no longer be able to pay this invoice."
            confirmLabel="Void invoice"
            variant="danger"
            onConfirm={() => undefined}
          />
        </section>

        <section className="space-y-4">
          <h3 className="font-display text-2xl">Portal shell preview</h3>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border-2.5 border-ink">
            <PortalShell userName="Demo Client">
              <Card tint="violet" className="max-w-md">
                <p className="text-sm text-muted">Invoices and support tickets will live here.</p>
              </Card>
            </PortalShell>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-display text-2xl">Admin shell preview</h3>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border-2.5 border-ink">
            <AdminShell breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Invoices" }]}>
              <Card tint="lime" className="max-w-md">
                <p className="text-sm text-muted">Staff tools for invoices, clients, and support.</p>
              </Card>
            </AdminShell>
          </div>
        </section>
      </Wrap>
    </Section>
  );
}
