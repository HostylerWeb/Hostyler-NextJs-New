"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { serviceNavigation } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { scrollToSection } from "@/lib/scroll-to-section";

const tintBadgeClasses = {
  violet: "bg-violet text-paper",
  coral: "bg-coral text-paper",
  lime: "bg-lime text-ink",
} as const;

const tintHoverClasses = {
  violet: "hover:bg-violet-tint",
  coral: "hover:bg-coral-tint",
  lime: "hover:bg-lime-tint",
} as const;

type ServicesNavDropdownProps = {
  activeId?: string;
  navIndex: number;
  onNavigate?: () => void;
};

export function ServicesNavDropdown({ activeId, navIndex, onNavigate }: ServicesNavDropdownProps) {
  const pathname = usePathname();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const isServicePage = pathname.startsWith("/services/");
  const isActive = activeId === "services" || isServicePage;

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const activeTintClasses = [
    "bg-lime",
    "bg-violet-tint",
    "bg-coral-tint",
    "bg-lime-tint",
    "bg-violet-tint",
    "bg-coral-tint",
  ];

  const mobileIndexTint = [
    "bg-violet-tint",
    "bg-coral-tint",
    "bg-lime-tint",
    "bg-violet-tint",
    "bg-coral-tint",
    "bg-lime-tint",
  ];

  const triggerClassName = cn(
    "inline-flex w-full flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-transparent px-4 py-3 font-mono text-[12.5px] font-bold tracking-[0.06em] text-muted uppercase transition hover:-translate-x-px hover:-translate-y-px hover:border-ink hover:bg-paper hover:text-ink hover:shadow-[2px_2px_0_#121214] max-[940px]:flex-none max-[940px]:justify-between max-[940px]:rounded-[var(--radius-md)] max-[940px]:border-2.5 max-[940px]:border-ink max-[940px]:bg-paper max-[940px]:px-4 max-[940px]:py-3.5 max-[940px]:font-body max-[940px]:text-[15px] max-[940px]:font-bold max-[940px]:tracking-[-0.01em] max-[940px]:normal-case max-[940px]:text-ink max-[940px]:shadow-brutal-sm",
    isActive &&
      cn(
        "border-ink text-ink shadow-brutal-sm -translate-x-px -translate-y-px max-[940px]:bg-lime max-[940px]:shadow-brutal",
        activeTintClasses[navIndex],
      ),
    open && "border-ink text-ink shadow-brutal-sm -translate-x-px -translate-y-px bg-paper",
  );

  return (
    <div
      ref={rootRef}
      className="relative flex flex-1 max-[940px]:w-full max-[940px]:flex-col max-[940px]:gap-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className={cn(
            "hidden size-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper-2 font-mono text-[10px] font-bold max-[940px]:inline-flex",
            mobileIndexTint[navIndex],
          )}
        >
          {String(navIndex + 1).padStart(2, "0")}
        </span>
        <span className="max-[940px]:flex-1 max-[940px]:px-3 max-[940px]:text-left">Services</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={cn(
            "size-3.5 shrink-0 transition-transform max-[940px]:hidden",
            open && "rotate-180",
          )}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span
          className={cn(
            "hidden size-[30px] shrink-0 place-items-center rounded-full border-2 border-ink bg-paper transition max-[940px]:grid",
            isActive && "bg-ink text-paper -rotate-45",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="size-3.5"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>

      <div
        className={cn(
          "absolute top-full left-1/2 z-[200] hidden -translate-x-1/2 pt-2 min-[941px]:block",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        onMouseEnter={() => setOpen(true)}
      >
        <div
          id={menuId}
          className={cn(
            "w-[min(320px,calc(100vw-40px))] rounded-[var(--radius-lg)] border-2.5 border-ink bg-paper p-2 shadow-brutal transition duration-200",
            open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
          )}
          role="menu"
        >
        {serviceNavigation.map((service) => {
          const isCurrent = pathname === service.href;

          return (
            <Link
              key={service.href}
              href={service.href}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className={cn(
                "flex items-start gap-3 rounded-[var(--radius-md)] border-2 border-transparent px-3 py-3 transition hover:-translate-x-px hover:-translate-y-px hover:border-ink hover:shadow-[2px_2px_0_#121214]",
                tintHoverClasses[service.tint],
                isCurrent && "border-ink bg-paper shadow-brutal-sm",
              )}
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink font-mono text-[10px] font-bold",
                  tintBadgeClasses[service.tint],
                )}
              >
                {service.index}
              </span>
              <span className="min-w-0 pt-0.5">
                <span className="block text-sm font-bold tracking-[-0.01em] text-ink">
                  {service.label}
                </span>
                <span className="mt-0.5 block text-xs font-medium text-muted">
                  {service.description}
                </span>
              </span>
            </Link>
          );
        })}

        <div className="mt-1 border-t-2 border-ink/10 pt-1">
          <Link
            href="/#services"
            role="menuitem"
            onClick={(event) => {
              setOpen(false);
              onNavigate?.();
              if (pathname === "/") {
                event.preventDefault();
                scrollToSection("services");
              }
            }}
            className="flex items-center justify-between rounded-[var(--radius-md)] px-3 py-2.5 font-mono text-[11px] font-bold tracking-[0.05em] text-muted uppercase transition hover:bg-paper-2 hover:text-ink"
          >
            All services overview
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        </div>
      </div>

      <div className="hidden max-[940px]:flex max-[940px]:flex-col max-[940px]:gap-1.5 max-[940px]:pl-2">
        {serviceNavigation.map((service) => {
          const isCurrent = pathname === service.href;

          return (
            <Link
              key={`mobile-${service.href}`}
              href={service.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-md)] border-2 border-ink bg-paper px-3 py-2.5 shadow-brutal-sm transition hover:-translate-x-px hover:-translate-y-px",
                isCurrent && "bg-lime",
              )}
            >
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full border-2 border-ink font-mono text-[10px] font-bold",
                  tintBadgeClasses[service.tint],
                )}
              >
                {service.index}
              </span>
              <span className="text-sm font-bold text-ink">{service.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
