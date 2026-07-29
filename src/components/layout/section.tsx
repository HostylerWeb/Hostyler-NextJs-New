import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  tight?: boolean;
};

export function Section({
  className,
  as: Component = "section",
  tight = false,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(tight ? "py-16 md:py-20" : "py-[76px] md:py-[110px]", className)}
      {...props}
    />
  );
}
