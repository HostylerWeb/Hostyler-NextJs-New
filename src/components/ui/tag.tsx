import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TagProps = HTMLAttributes<HTMLSpanElement>;

export function Tag({ className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 border-ink px-2.5 py-1 font-mono text-[10.5px] font-bold",
        className,
      )}
      {...props}
    />
  );
}
