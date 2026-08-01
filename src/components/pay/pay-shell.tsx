import Link from "next/link";
import { type ReactNode } from "react";
import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { EyebrowChip } from "@/components/ui/eyebrow-chip";
import { site } from "@/content/site";

export type PayShellState = "checkout" | "paid" | "cancelled" | "unavailable";

const sidebarContent: Record<
  PayShellState,
  {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; description: string; tint: string }[];
  }
> = {
  checkout: {
    eyebrow: "Secure checkout",
    title: `Pay your ${site.name} invoice`,
    description:
      "This is a private payment link. Review the invoice details, then complete checkout with card or PayPal.",
    items: [
      {
        title: "Encrypted checkout",
        description:
          "Payments are processed securely by PayPal. We never see your card details.",
        tint: "bg-violet-tint",
      },
      {
        title: "Card or PayPal",
        description:
          "Pay with debit or credit card as a guest, or use your PayPal account.",
        tint: "bg-lime-tint",
      },
      {
        title: "Need help?",
        description: `Questions about this invoice? Email us at ${site.email}.`,
        tint: "bg-coral-tint",
      },
    ],
  },
  paid: {
    eyebrow: "Payment received",
    title: "This invoice is paid",
    description:
      "Your payment has been recorded. You can review the invoice details on the right or log in to your client portal for a full history.",
    items: [
      {
        title: "Payment confirmed",
        description:
          "No further action is needed on this invoice unless we contact you separately.",
        tint: "bg-lime-tint",
      },
      {
        title: "Receipt in portal",
        description:
          "Log in to view this invoice, download records, and see your payment history.",
        tint: "bg-violet-tint",
      },
      {
        title: "Questions?",
        description: `If anything looks off, email us at ${site.email} and we'll help.`,
        tint: "bg-coral-tint",
      },
    ],
  },
  cancelled: {
    eyebrow: "Invoice cancelled",
    title: "This invoice is no longer payable",
    description:
      "This invoice has been cancelled and cannot be paid through this link. Contact us if you believe this is a mistake.",
    items: [
      {
        title: "Payment not required",
        description: "This link is inactive because the invoice was cancelled.",
        tint: "bg-coral-tint",
      },
      {
        title: "Need a new invoice?",
        description: `Email ${site.email} and we can issue an updated invoice if needed.`,
        tint: "bg-violet-tint",
      },
      {
        title: "Client portal",
        description: "Log in to see your current invoices and account activity.",
        tint: "bg-lime-tint",
      },
    ],
  },
  unavailable: {
    eyebrow: "Link unavailable",
    title: "This payment link has expired",
    description:
      "The link may be invalid or no longer active. Log in to your client portal or contact us for a new one.",
    items: [
      {
        title: "Try logging in",
        description: "Your invoice may still be available in the client portal.",
        tint: "bg-violet-tint",
      },
      {
        title: "Request a new link",
        description: `Email ${site.email} and we'll send a fresh payment link.`,
        tint: "bg-lime-tint",
      },
      {
        title: "We're here to help",
        description: "Our team can confirm your invoice status and next steps.",
        tint: "bg-coral-tint",
      },
    ],
  },
};

type PayShellProps = {
  children: ReactNode;
  state?: PayShellState;
};

export function PayShell({ children, state = "checkout" }: PayShellProps) {
  const sidebar = sidebarContent[state];

  return (
    <div className="min-h-screen bg-paper-2">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 18%, var(--violet-tint) 0%, transparent 42%), radial-gradient(circle at 82% 12%, var(--coral-tint) 0%, transparent 38%), radial-gradient(circle at 72% 88%, var(--lime-tint) 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="px-[clamp(18px,4.5vw,32px)] py-4">
          <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 rounded-full border-2.5 border-ink bg-paper/90 px-4 py-2.5 pl-5 shadow-brutal-sm backdrop-blur-md sm:px-6 sm:pl-6">
            <SiteLogo height={56} className="h-14 w-auto sm:h-16" priority />
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/"
                className="hidden text-sm font-semibold text-muted transition hover:text-ink sm:inline"
              >
                Back to site
              </Link>
              <Button href={`mailto:${site.email}`} variant="ghost" size="sm">
                Get help
              </Button>
            </div>
          </div>
        </header>

        <main className="flex flex-1 items-start px-[clamp(18px,4.5vw,32px)] py-8 sm:items-center sm:py-12">
          <div className="mx-auto w-full max-w-[1120px]">
            <div className="overflow-hidden rounded-[var(--radius-lg)] border-2.5 border-ink bg-paper shadow-brutal lg:grid lg:grid-cols-[0.9fr_1.1fr]">
              <aside
                className={`relative border-b-2.5 border-ink p-8 sm:p-10 lg:border-r lg:border-b-0 ${
                  state === "paid" ? "bg-lime-tint" : state === "cancelled" ? "bg-coral-tint" : "bg-lime-tint"
                }`}
              >
                <div
                  className="pointer-events-none absolute -top-8 -right-6 size-28 rotate-12 rounded-[var(--radius-lg)] border-2.5 border-ink bg-violet opacity-80"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute right-8 -bottom-5 size-16 -rotate-6 rounded-full border-2.5 border-ink bg-coral opacity-90"
                  aria-hidden
                />

                <div className="relative">
                  <EyebrowChip tone="dark">{sidebar.eyebrow}</EyebrowChip>
                  <h2 className="mt-5 max-w-sm font-display text-3xl sm:text-4xl">
                    {sidebar.title}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/75">
                    {sidebar.description}
                  </p>

                  <ul className="mt-8 space-y-3">
                    {sidebar.items.map((item) => (
                      <li
                        key={item.title}
                        className={`rounded-[var(--radius-md)] border-2 border-ink px-4 py-3.5 shadow-brutal-sm ${item.tint}`}
                      >
                        <p className="text-sm font-bold">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-ink/70">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <section className="bg-paper p-8 sm:p-10">{children}</section>
            </div>
          </div>
        </main>

        <footer className="border-t-2.5 border-ink/10 px-[clamp(18px,4.5vw,32px)] py-5">
          <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 text-[13px] font-semibold text-muted">
            <span>{site.copyright}</span>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/" className="transition hover:text-ink sm:hidden">
                Back to site
              </Link>
              <Link href="/privacy" className="transition hover:text-ink">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-ink">
                Terms
              </Link>
              <a href={`mailto:${site.email}`} className="transition hover:text-ink">
                {site.email}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
