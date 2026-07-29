import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type PaginationProps = {
  page: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
  className?: string;
};

export function Pagination({
  page,
  totalPages,
  hrefForPage,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <PaginationLink
        href={hrefForPage(Math.max(1, page - 1))}
        disabled={page <= 1}
        label="Previous"
      >
        ←
      </PaginationLink>
      {pages.map((p) => (
        <PaginationLink
          key={p}
          href={hrefForPage(p)}
          active={p === page}
          label={`Page ${p}`}
        >
          {p}
        </PaginationLink>
      ))}
      <PaginationLink
        href={hrefForPage(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        label="Next"
      >
        →
      </PaginationLink>
    </nav>
  );
}

function PaginationLink({
  href,
  children,
  active,
  disabled,
  label,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  label: string;
}) {
  if (disabled) {
    return (
      <span
        aria-label={label}
        className="grid size-[38px] place-items-center rounded-full border-2 border-ink/20 font-mono text-sm text-muted"
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "grid size-[38px] place-items-center rounded-full border-2.5 border-ink font-mono text-sm font-bold shadow-brutal-sm transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-lime",
        active && "bg-lime",
      )}
    >
      {children}
    </Link>
  );
}
