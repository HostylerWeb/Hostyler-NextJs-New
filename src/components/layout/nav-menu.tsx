"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ServicesNavDropdown } from "@/components/layout/services-nav-dropdown";
import { mainNavigation, type NavItem } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { getHashFromHref, scrollToSection } from "@/lib/scroll-to-section";

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

type NavMenuProps = {
  activeId?: string;
  onNavigate?: () => void;
};

export function NavMenu({ activeId, onNavigate }: NavMenuProps) {
  const pathname = usePathname();

  function handleHashNavClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem,
  ) {
    onNavigate?.();

    const sectionId = getHashFromHref(item.href);
    if (!sectionId) return;

    if (pathname === "/") {
      event.preventDefault();
      scrollToSection(sectionId);
    }
  }

  return (
    <div className="flex w-full max-w-[720px] items-center justify-center gap-2 max-[940px]:w-auto max-[940px]:max-w-none max-[940px]:flex-col max-[940px]:items-stretch max-[940px]:gap-2">
      {mainNavigation.map((item, index) => {
        if (item.sectionId === "services") {
          return (
            <ServicesNavDropdown
              key={item.sectionId}
              activeId={activeId}
              navIndex={index}
              onNavigate={onNavigate}
            />
          );
        }

        const isHashLink = item.href.startsWith("/#");
        const isActive =
          activeId === item.sectionId ||
          (!isHashLink && pathname.startsWith(item.href));

        return (
          <Link
            key={item.sectionId}
            href={item.href}
            onClick={(event) => handleHashNavClick(event, item)}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-transparent px-4 py-3 font-mono text-[12.5px] font-bold tracking-[0.06em] text-muted uppercase transition hover:-translate-x-px hover:-translate-y-px hover:border-ink hover:bg-paper hover:text-ink hover:shadow-[2px_2px_0_#121214] max-[940px]:w-full max-[940px]:flex-none max-[940px]:justify-between max-[940px]:rounded-[var(--radius-md)] max-[940px]:border-2.5 max-[940px]:border-ink max-[940px]:bg-paper max-[940px]:px-4 max-[940px]:py-3.5 max-[940px]:font-body max-[940px]:text-[15px] max-[940px]:font-bold max-[940px]:tracking-[-0.01em] max-[940px]:normal-case max-[940px]:text-ink max-[940px]:shadow-brutal-sm",
              isActive &&
                cn(
                  "border-ink text-ink shadow-brutal-sm -translate-x-px -translate-y-px max-[940px]:bg-lime max-[940px]:shadow-brutal",
                  activeTintClasses[index],
                ),
            )}
          >
            <span
              className={cn(
                "hidden size-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper-2 font-mono text-[10px] font-bold max-[940px]:inline-flex",
                mobileIndexTint[index],
              )}
            >
              {item.index}
            </span>
            <span className="max-[940px]:flex-1 max-[940px]:px-3 max-[940px]:text-left">
              {item.label}
            </span>
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
          </Link>
        );
      })}
    </div>
  );
}
