import { type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full resize-y rounded-[var(--radius-md)] border-2 border-ink/25 bg-white px-5 py-3.5 font-body text-[14.5px] font-medium leading-snug text-ink",
        "focus:border-ink/60 focus:outline-3 focus:outline-lime focus:outline-offset-1",
        className,
      )}
      {...props}
    />
  );
}
