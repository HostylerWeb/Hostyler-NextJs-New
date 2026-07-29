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

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(id);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
