"use client";

import Link from "next/link";
import { useActionState } from "react";
import { forgotPasswordAction, type AuthFormState } from "@/lib/actions/auth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EyebrowChip } from "@/components/ui/eyebrow-chip";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialState: AuthFormState = {};

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, initialState);

  return (
    <Card className="space-y-6 p-8">
      <div>
        <EyebrowChip>Account</EyebrowChip>
        <h1 className="mt-4 font-display text-3xl">Reset password</h1>
        <p className="mt-2 text-sm text-muted">We will email you a reset link.</p>
      </div>
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? <Alert variant="success">{state.success}</Alert> : null}
      <form action={formAction} className="space-y-4">
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Button className="w-full justify-center" type="submit" disabled={pending}>
          Send reset link
        </Button>
      </form>
      <p className="text-center text-sm text-muted">
        <Link href="/login" className="font-semibold text-violet">
          Back to login
        </Link>
      </p>
    </Card>
  );
}
