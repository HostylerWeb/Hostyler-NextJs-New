import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  tight?: boolean;
  /** Use on standalone pages — main already clears the fixed header */
  pageTop?: boolean;
};

export function Section({
  className,
  as: Component = "section",
  tight = false,
  pageTop = false,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        pageTop
          ? tight
            ? "pt-0 pb-16 md:pb-20"
            : "pt-0 pb-[76px] md:pb-[110px]"
          : tight
            ? "py-16 md:py-20"
            : "py-[76px] md:py-[110px]",
        className,
      )}
      {...props}
    />
  );
}
