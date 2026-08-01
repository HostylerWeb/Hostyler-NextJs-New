import {
  getPasswordStrengthLabel,
  getPasswordStrengthPercent,
  getPasswordStrengthTone,
  passwordRequirements,
} from "@/lib/password-requirements";
import { cn } from "@/lib/cn";

type PasswordStrengthMeterProps = {
  password: string;
};

const toneBarClasses = {
  weak: "bg-coral",
  medium: "bg-lime",
  strong: "bg-violet",
};

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const percent = getPasswordStrengthPercent(password);
  const tone = getPasswordStrengthTone(password);
  const label = getPasswordStrengthLabel(password);

  return (
    <div className="space-y-3 rounded-[var(--radius-md)] border-2 border-ink/10 bg-paper-2 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] font-bold tracking-wide text-muted uppercase">
          Password strength
        </p>
        <p
          className={cn(
            "text-xs font-bold",
            tone === "weak" && "text-coral",
            tone === "medium" && "text-ink",
            tone === "strong" && "text-violet",
          )}
        >
          {label}
        </p>
      </div>

      <div className="h-2 overflow-hidden rounded-full border border-ink/15 bg-paper">
        <div
          className={cn("h-full transition-all duration-300", toneBarClasses[tone])}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Password strength"
        />
      </div>

      <ul className="space-y-1.5">
        {passwordRequirements.map((requirement) => {
          const met = requirement.test(password);
          return (
            <li
              key={requirement.id}
              className={cn(
                "flex items-center gap-2 text-xs font-semibold",
                met ? "text-ink" : "text-muted",
              )}
            >
              <span
                className={cn(
                  "grid size-4 shrink-0 place-items-center rounded-full border-2 text-[10px] leading-none",
                  met ? "border-ink bg-lime text-ink" : "border-ink/20 bg-paper",
                )}
                aria-hidden
              >
                {met ? "✓" : ""}
              </span>
              {requirement.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
