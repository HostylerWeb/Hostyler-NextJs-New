"use client";

import { useActionState } from "react";
import { loginAction, type AuthFormState } from "@/lib/actions/auth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EyebrowChip } from "@/components/ui/eyebrow-chip";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialState: AuthFormState = {};

type LoginFormProps = {
  callbackUrl: string;
  inactive?: boolean;
};

export function LoginForm({ callbackUrl, inactive = false }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <Card className="space-y-6 p-8">
      <div>
        <EyebrowChip>Client portal</EyebrowChip>
        <h1 className="mt-4 font-display text-3xl">Log in</h1>
        <p className="mt-2 text-sm text-muted">
          Access invoices, payments, and support tickets.
        </p>
      </div>

      {inactive ? (
        <Alert variant="error">
          This account has been deactivated. Contact hello@hostyler.dev if you need access.
        </Alert>
      ) : null}
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? <Alert variant="success">{state.success}</Alert> : null}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Password" htmlFor="password">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </Field>
        <Button className="w-full justify-center" type="submit" disabled={pending}>
          {pending ? "Signing in…" : "Log in"}
        </Button>
      </form>
    </Card>
  );
}
