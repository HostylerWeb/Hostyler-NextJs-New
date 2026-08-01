"use client";

import { useEffect } from "react";
import { MOBILE_HEADER_BREAKPOINT_PX } from "@/lib/site-header-offset";

export function HeaderOffsetSync() {
  useEffect(() => {
    const mobileQuery = window.matchMedia(
      `(max-width: ${MOBILE_HEADER_BREAKPOINT_PX}px)`,
    );

    const clearInlineOffset = () => {
      document.documentElement.style.removeProperty("--site-header-offset");
    };

    const sync = () => {
      if (mobileQuery.matches) {
        clearInlineOffset();
        return;
      }

      const header = document.querySelector("header");
      if (!header) return;

      const height = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty(
        "--site-header-offset",
        `${height}px`,
      );
    };

    const header = document.querySelector("header");
    let resizeObserver: ResizeObserver | null = null;

    const startDesktopObserver = () => {
      if (!header || typeof ResizeObserver === "undefined") return;
      resizeObserver?.disconnect();
      resizeObserver = new ResizeObserver(sync);
      resizeObserver.observe(header);
    };

    const stopDesktopObserver = () => {
      resizeObserver?.disconnect();
      resizeObserver = null;
    };

    const onBreakpointChange = () => {
      if (mobileQuery.matches) {
        stopDesktopObserver();
        clearInlineOffset();
      } else {
        sync();
        startDesktopObserver();
      }
    };

    if (mobileQuery.matches) {
      clearInlineOffset();
    } else {
      sync();
      startDesktopObserver();
    }

    window.addEventListener("resize", sync);
    mobileQuery.addEventListener("change", onBreakpointChange);

    return () => {
      stopDesktopObserver();
      window.removeEventListener("resize", sync);
      mobileQuery.removeEventListener("change", onBreakpointChange);
    };
  }, []);

  return null;
}
