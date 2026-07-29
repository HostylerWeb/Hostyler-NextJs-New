import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EyebrowChip } from "@/components/ui/eyebrow-chip";

type SectionHeadProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function SectionHead({
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionHeadProps) {
  return (
    <div className={cn("mb-14 max-w-[640px]", className)}>
      {eyebrow ? <EyebrowChip>{eyebrow}</EyebrowChip> : null}
      <h2 className="mt-[18px] text-[clamp(30px,4vw,46px)]">{title}</h2>
      {description ? (
        <p className="mt-4 max-w-[520px] text-[16.5px] text-muted">{description}</p>
      ) : null}
      {children}
    </div>
  );
}
