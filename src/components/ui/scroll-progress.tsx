"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ScrollProgress({ className }: { className?: string }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("fixed top-0 left-0 z-[120] h-[3px] bg-gradient-to-r from-violet via-coral to-lime transition-[width] duration-100 linear", className)}
      style={{ width: `${width}%` }}
    />
  );
}
