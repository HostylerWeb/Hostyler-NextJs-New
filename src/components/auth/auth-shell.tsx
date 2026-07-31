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
          <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 rounded-full border-2.5 border-ink bg-paper/90 px-4 py-2.5 pl-5 shadow-brutal-sm backdrop-blur-md sm:px-6 sm:pl-6">
            <SiteLogo height={56} className="h-14 w-auto sm:h-16" priority />
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/"
                className="hidden text-sm font-semibold text-muted transition hover:text-ink sm:inline"
              >
                Back to site
              </Link>
              <Button href="/contact" size="sm">
                Start a project
              </Button>
            </div>
          </div>
        </header>

        <main className="flex flex-1 items-center px-[clamp(18px,4.5vw,32px)] py-8 sm:py-12">
          <div className="mx-auto w-full max-w-[1120px]">
            <div className="overflow-hidden rounded-[var(--radius-lg)] border-2.5 border-ink bg-paper shadow-brutal lg:grid lg:grid-cols-[1.05fr_0.95fr]">
              <aside className="relative border-b-2.5 border-ink bg-violet-tint p-8 sm:p-10 lg:border-r lg:border-b-0">
                <div
                  className="pointer-events-none absolute -top-10 -right-8 size-32 rotate-12 rounded-[var(--radius-lg)] border-2.5 border-ink bg-lime opacity-80"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute right-10 -bottom-6 size-20 -rotate-6 rounded-full border-2.5 border-ink bg-coral opacity-90"
                  aria-hidden
                />

                <div className="relative">
                  <EyebrowChip tone="lime">Client portal</EyebrowChip>
                  <h2 className="mt-5 max-w-sm font-display text-3xl sm:text-4xl">
                    Everything for your project, in one place
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/75">
                    {site.name} clients use this portal to manage billing, communicate with the
                    team, and keep project work moving.
                  </p>

                  <ul className="mt-8 space-y-3">
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
