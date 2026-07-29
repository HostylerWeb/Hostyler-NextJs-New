import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn(
        "size-4 shrink-0 rounded border-2 border-ink accent-lime",
        className,
      )}
      {...props}
    />
  );
}
