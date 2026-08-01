"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/scroll-to-section";

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;

    let attempts = 0;
    let timeoutId: number | undefined;

    const tryScroll = () => {
      if (scrollToSection(id) || attempts >= 30) return;
      attempts += 1;
      timeoutId = window.setTimeout(tryScroll, 100);
    };

    const frame = window.requestAnimationFrame(tryScroll);

    const onHashChange = () => {
      const nextId = window.location.hash.replace(/^#/, "");
      if (nextId) scrollToSection(nextId);
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.cancelAnimationFrame(frame);
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);

  return null;
}
