"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { subscribeScrollFrame } from "@/lib/raf-scroll";

export function ScrollProgress({ className }: { className?: string }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let docHeight = 0;

    const updateDocHeight = () => {
      docHeight = document.documentElement.scrollHeight - window.innerHeight;
    };

    const updateWidth = () => {
      setWidth(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };

    updateDocHeight();
    updateWidth();

    const unsubscribeScroll = subscribeScrollFrame(updateWidth);
    window.addEventListener("resize", updateDocHeight, { passive: true });
    window.addEventListener("resize", updateWidth, { passive: true });

    return () => {
      unsubscribeScroll();
      window.removeEventListener("resize", updateDocHeight);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("fixed top-0 left-0 z-[120] h-[3px] bg-gradient-to-r from-violet via-coral to-lime transition-[width] duration-100 linear", className)}
      style={{ width: `${width}%` }}
    />
  );
}
