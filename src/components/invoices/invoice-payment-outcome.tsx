import Link from "next/link";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";

type InvoicePaymentOutcomeProps = {
  variant: "paid" | "cancelled";
  context: "pay" | "portal";
  paidAt?: Date | string | null;
};

export function InvoicePaymentOutcome({
  variant,
  context,
  paidAt,
}: InvoicePaymentOutcomeProps) {
  if (variant === "paid") {
    return (
      <div className="rounded-[var(--radius-md)] border-2 border-ink bg-lime-tint px-5 py-4">
        <p className="text-sm font-semibold">
 Payment complete. No further action is required.
        </p>
        <p className="mt-1 text-sm text-muted">
          {paidAt
            ? `We received your payment on ${formatDate(paidAt)}. `
            : "We received your payment. "}
          {context === "pay"
            ? "Log in to your client portal to view payment history anytime."
            : "Your payment history is listed below for your records."}
        </p>
        {context === "pay" ? (
          <p className="mt-3 text-sm">
            <Link href="/login" className="font-bold text-violet hover:underline">
              Log in to portal
            </Link>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-md)] border-2 border-ink bg-coral-tint px-5 py-4">
      <p className="text-sm font-semibold">This invoice has been cancelled.</p>
      <p className="mt-1 text-sm text-muted">
        It can no longer be paid online. If you still owe payment, contact us at{" "}
        <a href={`mailto:${site.email}`} className="font-bold text-violet hover:underline">
          {site.email}
        </a>{" "}
        for an updated invoice.
      </p>
    </div>
  );
}
