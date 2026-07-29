"use client";

import { useActionState } from "react";
import {
  replyToTicketAction,
  type SupportActionState,
} from "@/lib/actions/support";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

type TicketReplyFormProps = {
  ticketId: string;
  isAdmin?: boolean;
};

const initialState: SupportActionState = {};

export function TicketReplyForm({ ticketId, isAdmin }: TicketReplyFormProps) {
  const action = replyToTicketAction.bind(null, ticketId);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? <Alert variant="success">{state.success}</Alert> : null}
      <Field label="Message" htmlFor="body">
        <Textarea id="body" name="body" rows={4} required />
      </Field>
      {isAdmin ? (
        <label className="flex items-center gap-2 text-sm font-semibold">
          <Checkbox name="is_internal" />
          Internal note only (not visible to client)
        </label>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send reply"}
      </Button>
    </form>
  );
}
