import { type ReactNode } from "react";
import { EyebrowChip } from "@/components/ui/eyebrow-chip";

type AuthFormLayoutProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function AuthFormLayout({
  eyebrow,
  title,
  description,
  children,
}: AuthFormLayoutProps) {
  return (
    <div className="space-y-6">
      <div>
        <EyebrowChip>{eyebrow}</EyebrowChip>
        <h1 className="mt-4 font-display text-3xl">{title}</h1>
        {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
