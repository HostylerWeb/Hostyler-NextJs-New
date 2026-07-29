"use client";

import { useActionState } from "react";
import {
  createClientAction,
  type ClientActionState,
} from "@/lib/actions/clients";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialState: ClientActionState = {};

export function CreateClientForm() {
  const [state, formAction, pending] = useActionState(
    createClientAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? <Alert variant="success">{state.success}</Alert> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <Input id="name" name="name" required />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" required />
        </Field>
        <Field label="Company" htmlFor="company">
          <Input id="company" name="company" />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <Input id="phone" name="phone" />
        </Field>
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
        <Checkbox name="send_welcome_email" defaultChecked />
        Send welcome email with temporary password
      </label>
      <Button type="submit" disabled={pending}>
        Create client
      </Button>
    </form>
  );
}
