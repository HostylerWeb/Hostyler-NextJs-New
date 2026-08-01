"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";
import {
  forgotPasswordAction,
  resetPasswordAction,
  verifyPasswordResetOtpAction,
  type AuthFormState,
} from "@/lib/actions/auth";
import { AuthFormLayout } from "@/components/auth/auth-form-layout";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { collectClientSecurityContext } from "@/lib/client-security";

const initialState: AuthFormState = {};

type Step = "email" | "otp" | "password";

export function PasswordResetFlow() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [emailRequestNonce, setEmailRequestNonce] = useState(0);
  const [fulfilledEmailNonce, setFulfilledEmailNonce] = useState(-1);
  const securityContext = useMemo(() => collectClientSecurityContext(), []);

  const [emailState, emailAction, emailPending] = useActionState(
    forgotPasswordAction,
    initialState,
  );
  const [otpState, otpAction, otpPending] = useActionState(
    verifyPasswordResetOtpAction,
    initialState,
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  useEffect(() => {
    if (emailState.success && emailRequestNonce > fulfilledEmailNonce) {
      setFulfilledEmailNonce(emailRequestNonce);
      setStep("otp");
    }
  }, [emailState.success, emailRequestNonce, fulfilledEmailNonce]);

  useEffect(() => {
    if (otpState.resetToken) {
      setResetToken(otpState.resetToken);
      setStep("password");
    }
  }, [otpState.resetToken]);

  const stepCopy = {
    email: {
      eyebrow: "Account",
      title: "Reset password",
      description: "Enter your email and we will send a 6-digit verification code.",
    },
    otp: {
      eyebrow: "Verify",
      title: "Enter your code",
      description: `We sent a 6-digit code to ${email || "your email"}. It expires in 15 minutes.`,
    },
    password: {
      eyebrow: "Secure",
      title: "Choose a new password",
      description: "Use at least 8 characters with a letter and a number.",
    },
  }[step];

  return (
    <AuthFormLayout
      eyebrow={stepCopy.eyebrow}
      title={stepCopy.title}
      description={stepCopy.description}
    >
      {step === "email" ? (
        <>
          {emailState.error ? <Alert variant="error">{emailState.error}</Alert> : null}
          {emailState.success ? <Alert variant="success">{emailState.success}</Alert> : null}
          <form
            action={emailAction}
            className="space-y-4"
            onSubmit={(event) => {
              const formData = new FormData(event.currentTarget);
              setEmail(String(formData.get("email") ?? ""));
              setEmailRequestNonce((value) => value + 1);
            }}
          >
            <input
              type="hidden"
              name="device_fingerprint"
              value={securityContext.device_fingerprint}
            />
            <input type="hidden" name="browser_details" value={securityContext.browser_details} />
            <Field label="Email" htmlFor="email">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={email}
                required
              />
            </Field>
            <Button className="w-full justify-center" type="submit" disabled={emailPending}>
              {emailPending ? "Sending code…" : "Send reset code"}
            </Button>
          </form>
        </>
      ) : null}

      {step === "otp" ? (
        <>
          {otpState.error ? <Alert variant="error">{otpState.error}</Alert> : null}
          {otpState.success && !otpState.resetToken ? (
            <Alert variant="success">{otpState.success}</Alert>
          ) : null}
          <form action={otpAction} className="space-y-4">
            <input type="hidden" name="email" value={email} />
            <input
              type="hidden"
              name="device_fingerprint"
              value={securityContext.device_fingerprint}
            />
            <input type="hidden" name="browser_details" value={securityContext.browser_details} />
            <Field label="6-digit code" htmlFor="otp">
              <Input
                id="otp"
                name="otp"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d{6}"
                maxLength={6}
                placeholder="000000"
                className="text-center font-mono text-2xl tracking-[0.35em]"
                required
              />
            </Field>
            <Button className="w-full justify-center" type="submit" disabled={otpPending}>
              {otpPending ? "Verifying…" : "Verify code"}
            </Button>
          </form>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <button
              type="button"
              className="font-semibold text-violet hover:underline"
              onClick={() => setStep("email")}
            >
              Use a different email
            </button>
            <form
              action={emailAction}
              onSubmit={() => setEmailRequestNonce((value) => value + 1)}
            >
              <input type="hidden" name="email" value={email} />
              <input
                type="hidden"
                name="device_fingerprint"
                value={securityContext.device_fingerprint}
              />
              <input type="hidden" name="browser_details" value={securityContext.browser_details} />
              <button
                type="submit"
                className="font-semibold text-muted hover:text-ink"
                disabled={emailPending}
              >
                {emailPending ? "Sending…" : "Resend code"}
              </button>
            </form>
          </div>
        </>
      ) : null}

      {step === "password" ? (
        <>
          {passwordState.error ? <Alert variant="error">{passwordState.error}</Alert> : null}
          {passwordState.success ? <Alert variant="success">{passwordState.success}</Alert> : null}
          <form action={passwordAction} className="space-y-4">
            <input type="hidden" name="resetToken" value={resetToken} />
            <input
              type="hidden"
              name="device_fingerprint"
              value={securityContext.device_fingerprint}
            />
            <input type="hidden" name="browser_details" value={securityContext.browser_details} />
            <Field label="New password" htmlFor="password">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </Field>
            <Field label="Confirm password" htmlFor="confirm_password">
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </Field>
            <Button className="w-full justify-center" type="submit" disabled={passwordPending}>
              {passwordPending ? "Updating…" : "Update password & log in"}
            </Button>
          </form>
        </>
      ) : null}

      <p className="text-center text-sm text-muted">
        <Link href="/login" className="font-semibold text-violet hover:underline">
          Back to login
        </Link>
      </p>
    </AuthFormLayout>
  );
}
