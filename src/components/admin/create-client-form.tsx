"use client";

import { useActionState, useState } from "react";
import {
  createClientAction,
  type ClientActionState,
} from "@/lib/actions/clients";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

const initialState: ClientActionState = {};

const selectClassName = cn(
  "w-full border-2 border-ink/25 bg-white px-5 py-3.5 font-body text-[14.5px] font-semibold text-ink",
  "rounded-[var(--radius-md)] focus:border-ink/60 focus:outline-3 focus:outline-lime focus:outline-offset-1",
);

export function CreateClientForm() {
  const [state, formAction, pending] = useActionState(
    createClientAction,
    initialState,
  );
  const [passwordMode, setPasswordMode] = useState<"generate" | "custom">("generate");

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? (
        <Alert variant="success">
          <p>{state.success}</p>
          {state.generatedPassword ? (
            <p className="mt-2">
              Temporary password:{" "}
              <code className="rounded bg-paper px-2 py-0.5 font-mono text-[13px]">
                {state.generatedPassword}
              </code>
            </p>
          ) : null}
        </Alert>
      ) : null}

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

      <Field label="Password setup" htmlFor="password_mode">
        <select
          id="password_mode"
          name="password_mode"
          className={selectClassName}
          value={passwordMode}
          onChange={(event) =>
            setPasswordMode(event.target.value as "generate" | "custom")
          }
        >
          <option value="generate">Generate a temporary password</option>
          <option value="custom">Set password manually</option>
        </select>
      </Field>

      {passwordMode === "custom" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Password" htmlFor="password">
            <Input
              id="password"
              name="password"
              type="password"
              minLength={8}
              autoComplete="new-password"
              required
            />
          </Field>
          <Field label="Confirm password" htmlFor="confirm_password">
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              minLength={8}
              autoComplete="new-password"
              required
            />
          </Field>
        </div>
      ) : null}

      <div className="space-y-2 rounded-[var(--radius-md)] border-2 border-ink/10 bg-paper-2 p-4">
        <label className="flex cursor-pointer items-start gap-2 text-sm font-semibold">
          <Checkbox name="send_welcome_email" defaultChecked className="mt-0.5" />
          <span>
            Send welcome email with login credentials
            <span className="mt-1 block text-xs font-medium text-muted">
              Includes their email and password so they can sign in right away.
            </span>
          </span>
        </label>
        {passwordMode === "generate" ? (
          <p className="text-xs text-muted">
            If you skip the email, the generated password will be shown here once after
            creation.
          </p>
        ) : (
          <p className="text-xs text-muted">
            If you skip the email, share the password you set with the client securely.
          </p>
        )}
      </div>

      <Button type="submit" disabled={pending}>
        Create client
      </Button>
    </form>
  );
}
