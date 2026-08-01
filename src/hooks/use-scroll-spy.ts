"use client";

import { useEffect, useState } from "react";

import { getSiteHeaderOffset } from "@/lib/site-header-offset";
import { subscribeScrollFrame } from "@/lib/raf-scroll";

type SectionMetric = {
  id: string;
  top: number;
  bottom: number;
};

function measureSections(navSectionIds: string[]): SectionMetric[] {
  const scrollY = window.scrollY;

  return navSectionIds
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el))
    .map((section) => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + scrollY;
      return {
        id: section.id,
        top,
        bottom: top + rect.height,
      };
    })
    .sort((a, b) => a.top - b.top);
}

function resolveActiveSection(
  sections: SectionMetric[],
  scrollPos: number,
): string {
  if (!sections.length) return "";

  let current = "";

  for (const section of sections) {
    if (scrollPos >= section.top && scrollPos < section.bottom) {
      return section.id;
    }
  }

  for (const section of sections) {
    if (section.top <= scrollPos) {
      current = section.id;
    }
  }

  return current;
}

export function useScrollSpy(navSectionIds: string[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!navSectionIds.length) return;

    let sections: SectionMetric[] = [];

    const remeasure = () => {
      sections = measureSections(navSectionIds);
    };

    const updateActive = () => {
      if (!sections.length) {
        remeasure();
      }

      const scrollPos = window.scrollY + getSiteHeaderOffset();
      const current = resolveActiveSection(sections, scrollPos);
      setActiveId((previous) => (previous === current ? previous : current));
    };

    remeasure();
    updateActive();

    const unsubscribeScroll = subscribeScrollFrame(updateActive);

    const onResize = () => {
      remeasure();
      updateActive();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("load", remeasure, { once: true });

    return () => {
      unsubscribeScroll();
      window.removeEventListener("resize", onResize);
    };
  }, [navSectionIds]);

  return activeId;
}
