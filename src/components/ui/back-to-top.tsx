"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { subscribeScrollFrame } from "@/lib/raf-scroll";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisible = () => {
      const next = window.scrollY > 480;
      setVisible((previous) => (previous === next ? previous : next));
    };

    updateVisible();
    return subscribeScrollFrame(updateVisible);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-6 bottom-6 z-[90] grid size-[46px] place-items-center rounded-full border-2.5 border-ink bg-lime shadow-brutal-sm transition-[opacity,transform] duration-300",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="size-[18px]"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
