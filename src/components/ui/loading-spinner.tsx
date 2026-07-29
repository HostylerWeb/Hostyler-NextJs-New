import { cn } from "@/lib/cn";

type LoadingSpinnerProps = {
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "size-4 border-2",
  md: "size-6 border-2.5",
  lg: "size-10 border-[3px]",
};

export function LoadingSpinner({
  className,
  label = "Loading",
  size = "md",
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-2", className)}
      role="status"
      aria-label={label}
    >
      <span
        className={cn(
          "inline-block animate-spin rounded-full border-ink border-t-lime",
          sizes[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
