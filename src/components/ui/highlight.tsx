"use client";

import { type HTMLAttributes, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type HighlightProps = HTMLAttributes<HTMLSpanElement>;

export function Highlight({ className, children, ...props }: HighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      el.classList.add("on");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={cn("highlight", className)} {...props}>
      <span>{children}</span>
    </span>
  );
}
