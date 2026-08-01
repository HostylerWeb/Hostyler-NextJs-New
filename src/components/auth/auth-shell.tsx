import Link from "next/link";
import { type ReactNode } from "react";
import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { EyebrowChip } from "@/components/ui/eyebrow-chip";
import { site } from "@/content/site";

const portalFeatures = [
  {
    title: "Invoices & payments",
    description: "View billing history and pay outstanding invoices securely.",
    tint: "bg-coral-tint",
  },
  {
    title: "Support tickets",
    description: "Open and track requests with the team working on your project.",
    tint: "bg-lime-tint",
  },
  {
    title: "Account security",
    description: "Private access to your project files, updates, and records.",
    tint: "bg-violet-tint",
  },
] as const;

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-paper-2">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--violet-tint) 0%, transparent 42%), radial-gradient(circle at 80% 10%, var(--coral-tint) 0%, transparent 38%), radial-gradient(circle at 70% 85%, var(--lime-tint) 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="px-[clamp(18px,4.5vw,32px)] py-4">
          <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 rounded-full border-2.5 border-ink bg-paper/90 px-3 py-2.5 shadow-brutal-sm backdrop-blur-md sm:gap-4 sm:px-6 sm:pl-6">
            <SiteLogo
              height={48}
              className="h-11 w-auto sm:h-16"
              priority
              linkClassName="min-w-0"
            />
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              <Link
                href="/"
                className="hidden text-sm font-semibold text-muted transition hover:text-ink sm:inline"
              >
                Back to site
              </Link>
              <Button href="/contact" size="sm" className="px-4 text-[13px] sm:px-5 sm:text-sm">
                Start a project
              </Button>
            </div>
          </div>
        </header>

        <main className="flex flex-1 items-start px-[clamp(18px,4.5vw,32px)] py-6 sm:items-center sm:py-12">
          <div className="mx-auto w-full max-w-[1120px]">
            <div className="overflow-hidden rounded-[var(--radius-lg)] border-2.5 border-ink bg-paper shadow-brutal lg:grid lg:grid-cols-[1.05fr_0.95fr]">
              <aside className="relative border-b-2.5 border-ink bg-violet-tint p-6 text-center sm:p-10 sm:text-left lg:border-r lg:border-b-0 lg:p-10">
                <div
                  className="pointer-events-none absolute -top-10 -right-8 size-32 rotate-12 rounded-[var(--radius-lg)] border-2.5 border-ink bg-lime opacity-80"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute right-10 -bottom-6 size-20 -rotate-6 rounded-full border-2.5 border-ink bg-coral opacity-90"
                  aria-hidden
                />

                <div className="relative">
                  <EyebrowChip tone="lime" className="mx-auto sm:mx-0">
                    Client portal
                  </EyebrowChip>
                  <h2 className="mt-5 font-display text-[clamp(1.75rem,7vw,2.25rem)] sm:max-w-sm sm:text-4xl">
                    Everything for your project, in one place
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/75 sm:mx-0">
                    {site.name} clients use this portal to manage billing, communicate with the
                    team, and keep project work moving.
                  </p>

                  <ul className="mt-6 space-y-3 text-left sm:mt-8">
                    {portalFeatures.map((feature) => (
                      <li
                        key={feature.title}
                        className={`rounded-[var(--radius-md)] border-2 border-ink px-4 py-3.5 shadow-brutal-sm ${feature.tint}`}
                      >
                        <p className="text-sm font-bold">{feature.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-ink/70">
                          {feature.description}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 text-sm text-ink/70">
                    Need a new project instead?{" "}
                    <Link href="/contact" className="font-bold text-violet hover:underline">
                      Get in touch
                    </Link>
                  </p>
                </div>
              </aside>

              <section className="bg-paper p-6 sm:p-10">{children}</section>
            </div>
          </div>
        </main>

        <footer className="border-t-2.5 border-ink/10 px-[clamp(18px,4.5vw,32px)] py-6 sm:py-5">
          <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-5 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:text-left">
            <span className="text-[13px] font-semibold text-muted">{site.copyright}</span>
            <nav
              className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              aria-label="Portal footer"
            >
              <Link
                href="/"
                className="text-[13px] font-semibold text-muted transition hover:text-ink sm:hidden"
              >
                Back to site
              </Link>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                <Link
                  href="/privacy"
                  className="text-[13px] font-semibold text-muted transition hover:text-ink"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-[13px] font-semibold text-muted transition hover:text-ink"
                >
                  Terms
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[13px] font-semibold text-muted transition hover:text-ink"
                >
                  {site.email}
                </a>
              </div>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
