import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Wrap({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto max-w-[1200px] px-[clamp(18px,4.5vw,32px)]", className)}
      {...props}
    />
  );
}
