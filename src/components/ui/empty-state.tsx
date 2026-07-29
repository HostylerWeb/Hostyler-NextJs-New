import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: { label: string; href: string };
  icon?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--radius-lg)] border-2.5 border-dashed border-ink/30 bg-paper px-6 py-14 text-center",
        className,
      )}
    >
      {icon ? <div className="mb-4 text-ink">{icon}</div> : null}
      <h3 className="font-display text-lg">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      ) : null}
      {action ? (
        <Button href={action.href} variant="ghost" size="sm" className="mt-6">
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}
