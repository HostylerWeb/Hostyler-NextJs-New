"use client";

import { useEffect, useState } from "react";

import {
  DESKTOP_HEADER_OFFSET_PX,
  getSiteHeaderOffset,
  MOBILE_HEADER_BREAKPOINT_PX,
} from "@/lib/site-header-offset";

function pickActiveSection(ratios: Map<string, number>): string {
  let bestId = "";
  let bestRatio = 0;

  for (const [id, ratio] of ratios) {
    if (ratio >= bestRatio) {
      bestRatio = ratio;
      bestId = id;
    }
  }

  return bestId;
}

export function useScrollSpy(navSectionIds: string[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!navSectionIds.length) return;

    const mobileQuery = window.matchMedia(
      `(max-width: ${MOBILE_HEADER_BREAKPOINT_PX}px)`,
    );

    const elements = navSectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const ratios = new Map<string, number>();
    let observer: IntersectionObserver | null = null;

    const createObserver = () => {
      observer?.disconnect();

      if (mobileQuery.matches) {
        setActiveId("");
        return;
      }

      const headerInsetPx = Math.max(getSiteHeaderOffset(), DESKTOP_HEADER_OFFSET_PX);

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              ratios.set(entry.target.id, entry.intersectionRatio);
            } else {
              ratios.delete(entry.target.id);
            }
          }

          const next = pickActiveSection(ratios);
          setActiveId((previous) => (previous === next ? previous : next));
        },
        {
          rootMargin: `-${headerInsetPx}px 0px -50% 0px`,
          threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
        },
      );

      for (const element of elements) {
        observer.observe(element);
      }
    };

    createObserver();

    const onBreakpointChange = () => {
      ratios.clear();
      createObserver();
    };

    mobileQuery.addEventListener("change", onBreakpointChange);

    return () => {
      observer?.disconnect();
      mobileQuery.removeEventListener("change", onBreakpointChange);
    };
  }, [navSectionIds]);

  return activeId;
}
