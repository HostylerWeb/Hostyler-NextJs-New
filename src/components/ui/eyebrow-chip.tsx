import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type EyebrowChipProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "dark" | "lime";
};

export function EyebrowChip({
  className,
  tone = "dark",
  children,
  ...props
}: EyebrowChipProps) {
  return (
    <span
      className={cn(
        "inline-flex -rotate-2 items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-bold tracking-[0.05em] uppercase",
        tone === "dark" && "bg-ink text-paper",
        tone === "lime" && "bg-lime text-ink",
        className,
      )}
      {...props}
    >
      <i className="size-[7px] shrink-0 rounded-full bg-lime" aria-hidden="true" />
      {children}
    </span>
  );
}
