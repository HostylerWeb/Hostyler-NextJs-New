"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { portalNavigation } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { PortalHeader } from "@/components/portal/portal-header";
import { SiteLogo } from "@/components/layout/site-logo";

type PortalShellProps = {
  children: ReactNode;
  userName?: string;
};

export function PortalShell({ children, userName = "Client" }: PortalShellProps) {
  const pathname = usePathname();

  return (
    <div className="app-shell min-h-screen bg-paper">
      <div className="flex min-h-screen">
        <aside className="hidden w-60 shrink-0 border-r-2.5 border-ink bg-paper-2 p-5 md:block">
          <SiteLogo linkClassName="mb-8" height={28} />
          <nav className="flex flex-col gap-1" aria-label="Portal navigation">
            {portalNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full border-2 border-transparent px-4 py-2.5 text-sm font-semibold transition hover:border-ink hover:bg-paper",
                  pathname === item.href && "border-ink bg-lime shadow-brutal-sm",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <PortalHeader userName={userName} />
          <main className="flex-1 p-[var(--shell-padding)]">{children}</main>
        </div>
      </div>

      <nav
        className="fixed right-0 bottom-0 left-0 z-50 flex border-t-2.5 border-ink bg-paper p-2 md:hidden"
        aria-label="Mobile portal navigation"
      >
        {portalNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex-1 rounded-full px-2 py-2 text-center text-xs font-bold",
              pathname === item.href && "bg-lime",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
