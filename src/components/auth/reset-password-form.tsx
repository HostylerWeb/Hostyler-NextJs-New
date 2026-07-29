"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { resetPasswordAction, type AuthFormState } from "@/lib/actions/auth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EyebrowChip } from "@/components/ui/eyebrow-chip";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialState: AuthFormState = {};

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const boundAction = resetPasswordAction.bind(null, token);
  const [state, formAction, pending] = useActionState(boundAction, initialState);

  if (!token) {
    return (
      <Card className="p-8">
        <Alert variant="error">Missing reset token.</Alert>
      </Card>
    );
  }

  return (
    <Card className="space-y-6 p-8">
      <div>
        <EyebrowChip>Account</EyebrowChip>
        <h1 className="mt-4 font-display text-3xl">Choose a new password</h1>
      </div>
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? <Alert variant="success">{state.success}</Alert> : null}
      <form action={formAction} className="space-y-4">
        <Field label="New password" htmlFor="password">
          <Input id="password" name="password" type="password" autoComplete="new-password" required />
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
          Update password
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
