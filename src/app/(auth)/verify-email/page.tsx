import Link from "next/link";
import { verifyEmailAction } from "@/lib/actions/auth";
import { AuthFormLayout } from "@/components/auth/auth-form-layout";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthFormLayout eyebrow="Account" title="Verify email">
        <Alert variant="error">Missing verification token.</Alert>
      </AuthFormLayout>
    );
  }

  const result = await verifyEmailAction(token);

  return (
    <AuthFormLayout eyebrow="Account" title="Verify email">
      {result.error ? <Alert variant="error">{result.error}</Alert> : null}
      {result.success ? <Alert variant="success">{result.success}</Alert> : null}
      <Button href="/login" className="w-full justify-center">
        Go to login
      </Button>
      <p className="text-center text-sm text-muted">
        Need help?{" "}
        <Link href="mailto:hello@hostyler.dev" className="font-semibold text-violet hover:underline">
          Contact us
        </Link>
      </p>
    </AuthFormLayout>
  );
}
