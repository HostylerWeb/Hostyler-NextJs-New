import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "dark" | "violet" | "coral" | "lime" | "outline";
};

const variants = {
  dark: "bg-ink text-paper",
  violet: "bg-violet-tint text-ink",
  coral: "bg-coral-tint text-ink",
  lime: "bg-lime-tint text-ink",
  outline: "bg-paper text-ink",
};

export function Badge({
  className,
  variant = "outline",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 border-ink px-2.5 py-0.5 font-mono text-[10.5px] font-bold",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
