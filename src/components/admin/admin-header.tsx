import Link from "next/link";
import { AdminFrontendLink } from "@/components/admin/admin-frontend-link";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

type AdminHeaderProps = {
  breadcrumbs?: Array<{ label: string; href?: string }>;
};

export function AdminHeader({ breadcrumbs = [] }: AdminHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 border-b-2.5 border-ink bg-paper/90 px-[var(--shell-padding)] py-4 backdrop-blur">
      <nav aria-label="Breadcrumb" className="flex min-w-0 flex-wrap items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span className="text-muted">/</span> : null}
            {crumb.href ? (
              <Link href={crumb.href} className="font-semibold text-muted hover:text-ink">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-bold text-ink">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
      <div className="flex shrink-0 items-center gap-2 md:hidden">
        <AdminFrontendLink variant="header" />
        <AdminLogoutButton variant="header" />
      </div>
    </header>
  );
}
