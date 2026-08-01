"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { registerAction, type AuthFormState } from "@/lib/actions/auth";
import { AuthFormLayout } from "@/components/auth/auth-form-layout";
import { PasswordStrengthMeter } from "@/components/auth/password-strength-meter";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/validators/contact";

const initialState: AuthFormState = {};

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validation = useMemo(
    () =>
      registerSchema.safeParse({
        name,
        email,
        company: company.trim() || undefined,
        password,
        confirm_password: confirmPassword,
      }),
    [name, email, company, password, confirmPassword],
  );

  const canSubmit = validation.success;
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <AuthFormLayout
      eyebrow="Create account"
      title="Register"
      description="Create a client account to view invoices and support."
    >
      {state.error ? (
        <Alert variant="error">
          <p>{state.error}</p>
          {state.error.includes("already linked") ? (
            <p className="mt-2">
              <Link href="/login" className="font-semibold text-violet hover:underline">
                Go to login
              </Link>
            </p>
          ) : null}
        </Alert>
      ) : null}
      {state.success ? <Alert variant="success">{state.success}</Alert> : null}

      <form action={formAction} className="space-y-4">
        <Field label="Name" htmlFor="name">
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field>
        <Field label="Company (optional)" htmlFor="company">
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </Field>
        <Field label="Password" htmlFor="password">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            aria-describedby="password-strength"
          />
        </Field>
        <div id="password-strength">
          <PasswordStrengthMeter password={password} />
        </div>
        <Field
          label="Confirm password"
          htmlFor="confirm_password"
          error={passwordsMismatch ? "Passwords do not match" : undefined}
        >
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            aria-invalid={passwordsMismatch}
          />
        </Field>
        <Button
          className="w-full justify-center"
          type="submit"
          disabled={pending || !canSubmit}
        >
          {pending ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-violet hover:underline">
          Log in
        </Link>
      </p>
    </AuthFormLayout>
  );
}
