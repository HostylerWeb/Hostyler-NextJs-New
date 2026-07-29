import { type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23121214' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full cursor-pointer appearance-none rounded-full border-2 border-ink/25 bg-white px-5 py-3.5 pr-10 font-body text-[14.5px] font-semibold text-ink",
        "focus:border-ink/60 focus:outline-3 focus:outline-lime focus:outline-offset-1",
        className,
      )}
      style={{
        backgroundImage: chevron,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 18px center",
      }}
      {...props}
    >
      {children}
    </select>
  );
}
