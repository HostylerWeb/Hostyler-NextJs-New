"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type AuthFormState } from "@/lib/actions/auth";
import { AuthFormLayout } from "@/components/auth/auth-form-layout";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
    <AuthFormLayout
      eyebrow="Welcome back"
      title="Log in"
      description="Access invoices, payments, and support tickets for your Hostyler projects."
    >
      {inactive ? (
        <Alert variant="error">
          This account has been deactivated. Contact support@hostyler.com if you need access.
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
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm font-semibold text-violet hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button className="w-full justify-center" type="submit" disabled={pending}>
          {pending ? "Signing in…" : "Log in"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-violet hover:underline">
          Create one
        </Link>
      </p>
    </AuthFormLayout>
  );
}
