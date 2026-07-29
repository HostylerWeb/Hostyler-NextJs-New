"use client";

import { useEffect, useState } from "react";

function getSectionTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

function getHeaderOffset(): number {
  const header = document.querySelector("header");
  return (header?.getBoundingClientRect().height ?? 100) + 16;
}

export function useScrollSpy(navSectionIds: string[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!navSectionIds.length) return;

    const getSections = () =>
      navSectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el))
        .sort((a, b) => getSectionTop(a) - getSectionTop(b));

    const onScroll = () => {
      const sections = getSections();
      if (!sections.length) return;

      const scrollPos = window.scrollY + getHeaderOffset();
      let current = "";

      for (const section of sections) {
        const top = getSectionTop(section);
        const bottom = top + section.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          current = section.id;
          break;
        }
      }

      if (!current) {
        for (const section of sections) {
          const top = getSectionTop(section);
          if (top <= scrollPos) {
            current = section.id;
          }
        }
      }

      setActiveId((previous) => (previous === current ? previous : current));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [navSectionIds]);

  return activeId;
}
