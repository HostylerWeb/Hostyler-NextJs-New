import Link from "next/link";
import { verifyEmailAction } from "@/lib/actions/auth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <Card className="p-8">
        <Alert variant="error">Missing verification token.</Alert>
      </Card>
    );
  }

  const result = await verifyEmailAction(token);

  return (
    <Card className="space-y-6 p-8 text-center">
      {result.error ? <Alert variant="error">{result.error}</Alert> : null}
      {result.success ? <Alert variant="success">{result.success}</Alert> : null}
      <Button href="/login">Go to login</Button>
      <p className="text-sm text-muted">
        Need help?{" "}
        <Link href="mailto:hello@hostyler.dev" className="font-semibold text-violet">
          Contact us
        </Link>
      </p>
    </Card>
  );
}
