import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type AlertVariant = "success" | "error" | "info";

const variants: Record<AlertVariant, string> = {
  success: "border-lime bg-lime-tint text-ink",
  error: "border-coral bg-coral-tint text-ink",
  info: "border-violet bg-violet-tint text-ink",
};

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
  title?: string;
};

export function Alert({
  className,
  variant = "info",
  title,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-[var(--radius-md)] border-2.5 border-ink px-4 py-3 text-sm shadow-brutal-sm",
        variants[variant],
        className,
      )}
      {...props}
    >
      {title ? <p className="mb-1 font-bold">{title}</p> : null}
      {children}
    </div>
  );
}
