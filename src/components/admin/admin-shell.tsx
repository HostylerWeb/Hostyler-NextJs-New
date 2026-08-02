"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { adminNavigation } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { AdminFrontendLink } from "@/components/admin/admin-frontend-link";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { SiteLogo } from "@/components/layout/site-logo";

type AdminShellProps = {
  children: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
};

export function AdminShell({ children, breadcrumbs }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className="app-shell min-h-screen bg-paper">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r-2.5 border-ink bg-ink p-5 text-paper md:flex">
          <SiteLogo linkClassName="mb-8" height={70} src="/admin-logo.png" />
          <p className="mb-4 font-mono text-[10px] tracking-wider text-paper/60 uppercase">
            Admin
          </p>
          <nav className="flex flex-col gap-1" aria-label="Admin navigation">
            {adminNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full border-2 border-transparent px-4 py-2.5 text-sm font-semibold transition hover:border-paper hover:bg-paper/10",
                  pathname === item.href && "border-lime bg-paper text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-paper/15 pt-4">
            <AdminLogoutButton variant="sidebar" />
            <AdminFrontendLink variant="sidebar" />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader breadcrumbs={breadcrumbs} />
          <main className="min-w-0 flex-1 overflow-x-hidden p-[var(--shell-padding)] pb-24 md:pb-[var(--shell-padding)]">
            {children}
          </main>
        </div>
      </div>

      <nav
        className="fixed right-0 bottom-0 left-0 z-50 flex gap-0.5 border-t-2.5 border-ink bg-ink px-1 py-1.5 text-paper md:hidden"
        aria-label="Mobile admin navigation"
      >
        {adminNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "min-w-0 flex-1 rounded-full px-0.5 py-1.5 text-center text-[8px] font-bold leading-tight tracking-tight sm:text-[9px]",
              pathname === item.href && "bg-lime text-ink",
            )}
          >
            {item.mobileLabel ?? item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
