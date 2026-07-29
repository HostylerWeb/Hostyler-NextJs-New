import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  tint?: "paper" | "violet" | "coral" | "lime" | "ink";
  padding?: "none" | "sm" | "md" | "lg";
};

const tintClasses = {
  paper: "bg-paper",
  violet: "bg-violet-tint",
  coral: "bg-coral-tint",
  lime: "bg-lime-tint",
  ink: "bg-ink text-paper",
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  className,
  tint = "paper",
  padding = "md",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border-2.5 border-ink shadow-brutal",
        tintClasses[tint],
        paddingClasses[padding],
        className,
      )}
      {...props}
    />
  );
}
