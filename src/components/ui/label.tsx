import { type LabelHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  tone?: "default" | "on-violet";
};

export function Label({ className, tone = "default", ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "pl-1 text-xs font-bold",
        tone === "default" && "text-ink",
        tone === "on-violet" && "text-[#E6E1FE]",
        className,
      )}
      {...props}
    />
  );
}
