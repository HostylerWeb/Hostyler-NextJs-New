import Link from "next/link";
import { cn } from "@/lib/cn";

type AdminFrontendLinkProps = {
  variant?: "sidebar" | "header";
  className?: string;
};

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function AdminFrontendLink({
  variant = "sidebar",
  className,
}: AdminFrontendLinkProps) {
  if (variant === "sidebar") {
    return (
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex w-full items-center gap-2 rounded-full border-2 border-transparent px-4 py-2.5 text-sm font-semibold text-paper/80 transition hover:border-paper hover:bg-paper/10",
          className,
        )}
      >
        <HomeIcon className="size-4 shrink-0" />
        Frontend
      </Link>
    );
  }

  return (
    <Link
      href="/"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink transition hover:bg-paper-2",
        className,
      )}
    >
      <HomeIcon className="size-4 shrink-0" />
      Frontend
    </Link>
  );
}
