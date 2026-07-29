"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/layout/nav-menu";
import { SiteLogo } from "@/components/layout/site-logo";
import { mainNavigation } from "@/content/navigation";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/cn";

const sectionIds = mainNavigation.map((item) => item.sectionId);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy(pathname === "/" ? sectionIds : []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 940) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className={cn(
          "fixed inset-0 z-[140] bg-ink/35 transition-opacity max-[940px]:block",
          open ? "opacity-100" : "pointer-events-none opacity-0 max-[940px]:hidden",
        )}
        onClick={() => setOpen(false)}
      />
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-[100] py-3 max-[940px]:py-2",
          open && "max-[940px]:z-[150]",
        )}
      >
        <div className="mx-auto max-w-[1200px] px-[clamp(18px,4.5vw,32px)]">
          <div className="flex items-center justify-between gap-5 rounded-full border-2.5 border-ink bg-paper/88 px-3 py-2.5 pl-6 shadow-brutal-sm backdrop-blur-md max-[940px]:gap-3 max-[940px]:py-1.5 max-[940px]:pr-2.5 max-[940px]:pl-3.5">
            <SiteLogo
              height={80}
              className="[&_img]:max-[940px]:!h-11"
              priority
            />

            <nav
              className={cn(
                "flex min-w-0 flex-1 items-center justify-center gap-4 max-[940px]:fixed max-[940px]:top-[88px] max-[940px]:right-5 max-[940px]:left-5 max-[940px]:z-[150] max-[940px]:flex-col max-[940px]:items-stretch max-[940px]:rounded-[var(--radius-lg)] max-[940px]:border-2.5 max-[940px]:border-ink max-[940px]:bg-paper max-[940px]:p-3.5 max-[940px]:shadow-brutal max-[940px]:transition max-[940px]:duration-300",
                open
                  ? "max-[940px]:pointer-events-auto max-[940px]:translate-y-0 max-[940px]:scale-100 max-[940px]:opacity-100"
                  : "max-[940px]:pointer-events-none max-[940px]:translate-y-[-10px] max-[940px]:scale-[0.98] max-[940px]:opacity-0",
              )}
              aria-label="Main navigation"
            >
              <NavMenu activeId={activeId} onNavigate={() => setOpen(false)} />
              <Button
                href="/contact"
                className="hidden max-[940px]:flex max-[940px]:w-full max-[940px]:justify-center"
                size="sm"
              >
                Start a project
              </Button>
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <Button href="/contact" size="sm" className="max-[940px]:hidden">
                Start a project
              </Button>
              <Link
                href="/login"
                className="hidden text-sm font-semibold text-muted transition hover:text-ink min-[941px]:inline"
              >
                Client login
              </Link>
              <button
                type="button"
                className={cn(
                  "hidden size-9 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-ink bg-paper shadow-brutal-sm max-[940px]:flex",
                  open && "[&>span:nth-child(1)]:translate-y-[7px] [&>span:nth-child(1)]:rotate-45 [&>span:nth-child(2)]:opacity-0 [&>span:nth-child(3)]:translate-y-[-7px] [&>span:nth-child(3)]:-rotate-45",
                )}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
              >
                <span className="block h-0.5 w-4 rounded bg-ink transition" />
                <span className="block h-0.5 w-4 rounded bg-ink transition" />
                <span className="block h-0.5 w-4 rounded bg-ink transition" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
