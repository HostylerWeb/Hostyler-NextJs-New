"use client";

import { useActionState } from "react";
import {
  updateTicketAdminAction,
  type SupportActionState,
} from "@/lib/actions/support";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/select";
import { TicketReplyForm } from "@/components/support/ticket-reply-form";

type AdminTicketPanelProps = {
  ticketId: string;
  status: string;
  priority: string;
  assignedToId?: string | null;
  admins: Array<{ id: string; name: string }>;
};

const initialState: SupportActionState = {};

export function AdminTicketPanel({
  ticketId,
  status,
  priority,
  assignedToId,
  admins,
}: AdminTicketPanelProps) {
  const action = updateTicketAdminAction.bind(null, ticketId);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="space-y-6">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? <Alert variant="success">{state.success}</Alert> : null}

      <form action={formAction} className="grid gap-4 md:grid-cols-3">
        <Field label="Status" htmlFor="status">
          <Select id="status" name="status" defaultValue={status}>
            <option value="open">Open</option>
            <option value="waiting_on_client">Waiting on client</option>
            <option value="waiting_on_staff">Waiting on staff</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </Select>
        </Field>
        <Field label="Priority" htmlFor="priority">
          <Select id="priority" name="priority" defaultValue={priority}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </Select>
        </Field>
        <Field label="Assignee" htmlFor="assigned_to_id">
          <Select
            id="assigned_to_id"
            name="assigned_to_id"
            defaultValue={assignedToId ?? ""}
          >
            <option value="">Unassigned</option>
            {admins.map((admin) => (
              <option key={admin.id} value={admin.id}>
                {admin.name}
              </option>
            ))}
          </Select>
        </Field>
        <Button type="submit" size="sm" disabled={pending} className="md:col-span-3">
          Update ticket
        </Button>
      </form>

      <TicketReplyForm ticketId={ticketId} isAdmin />
    </div>
  );
}
