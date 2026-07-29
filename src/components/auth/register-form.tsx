"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction, type AuthFormState } from "@/lib/actions/auth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EyebrowChip } from "@/components/ui/eyebrow-chip";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialState: AuthFormState = {};

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  return (
    <Card className="space-y-6 p-8">
      <div>
        <EyebrowChip>Create account</EyebrowChip>
        <h1 className="mt-4 font-display text-3xl">Register</h1>
        <p className="mt-2 text-sm text-muted">
          Create a client account to view invoices and support.
        </p>
      </div>

      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? <Alert variant="success">{state.success}</Alert> : null}

      <form action={formAction} className="space-y-4">
        <Field label="Name" htmlFor="name">
          <Input id="name" name="name" autoComplete="name" required />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Company (optional)" htmlFor="company">
          <Input id="company" name="company" autoComplete="organization" />
        </Field>
        <Field label="Password" htmlFor="password">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
        </Field>
        <Field label="Confirm password" htmlFor="confirm_password">
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            required
          />
        </Field>
        <Button className="w-full justify-center" type="submit" disabled={pending}>
          {pending ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-violet">
          Log in
        </Link>
      </p>
    </Card>
  );
}
