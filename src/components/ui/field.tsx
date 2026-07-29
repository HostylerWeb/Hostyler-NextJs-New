import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Label } from "@/components/ui/label";

type FieldProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  htmlFor?: string;
  labelTone?: "default" | "on-violet";
  error?: string;
};

export function Field({
  className,
  label,
  htmlFor,
  labelTone = "default",
  error,
  children,
  ...props
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 text-left", className)} {...props}>
      {label ? (
        <Label htmlFor={htmlFor} tone={labelTone}>
          {label}
        </Label>
      ) : null}
      {children}
      {error ? (
        <p className="text-xs font-semibold text-coral" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
