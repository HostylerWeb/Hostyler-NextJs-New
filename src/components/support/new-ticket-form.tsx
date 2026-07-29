"use client";

import { useActionState } from "react";
import { createTicketAction, type SupportActionState } from "@/lib/actions/support";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const initialState: SupportActionState = {};

export function NewTicketForm() {
  const [state, formAction, pending] = useActionState(
    createTicketAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      <Field label="Subject" htmlFor="subject">
        <Input id="subject" name="subject" required />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Category" htmlFor="category">
          <Select id="category" name="category" defaultValue="technical">
            <option value="billing">Billing</option>
            <option value="technical">Technical</option>
            <option value="project">Project</option>
            <option value="other">Other</option>
          </Select>
        </Field>
        <Field label="Priority" htmlFor="priority">
          <Select id="priority" name="priority" defaultValue="normal">
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </Select>
        </Field>
      </div>
      <Field label="Message" htmlFor="body">
        <Textarea id="body" name="body" rows={6} required />
      </Field>
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting…" : "Open ticket"}
      </Button>
    </form>
  );
}
