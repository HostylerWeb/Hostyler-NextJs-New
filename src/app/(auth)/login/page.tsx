import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

type Props = {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl, error } = await searchParams;

  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
      <LoginForm
        callbackUrl={callbackUrl ?? "/portal"}
        inactive={error === "account_inactive"}
      />
    </Suspense>
  );
}
