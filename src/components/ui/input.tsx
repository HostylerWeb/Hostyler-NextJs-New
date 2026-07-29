import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  rounded?: "pill" | "md";
};

export function Input({
  className,
  rounded = "pill",
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "w-full border-2 border-ink/25 bg-white px-5 py-3.5 font-body text-[14.5px] font-semibold text-ink",
        "focus:border-ink/60 focus:outline-3 focus:outline-lime focus:outline-offset-1",
        rounded === "pill" && "rounded-full",
        rounded === "md" && "rounded-[var(--radius-md)]",
        className,
      )}
      {...props}
    />
  );
}
