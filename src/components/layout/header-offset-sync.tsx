"use client";

import { useEffect } from "react";
import {
  invalidateSiteHeaderOffsetCache,
  MOBILE_HEADER_BREAKPOINT_PX,
} from "@/lib/site-header-offset";
import { scheduleFrame } from "@/lib/schedule-frame";

function readResizeObserverHeight(entry: ResizeObserverEntry): number {
  const blockSize = entry.borderBoxSize?.[0]?.blockSize;
  if (typeof blockSize === "number" && blockSize > 0) {
    return Math.ceil(blockSize);
  }

  return Math.ceil(entry.contentRect.height);
}

export function HeaderOffsetSync() {
  useEffect(() => {
    const mobileQuery = window.matchMedia(
      `(max-width: ${MOBILE_HEADER_BREAKPOINT_PX}px)`,
    );

    const clearInlineOffset = () => {
      document.documentElement.style.removeProperty("--site-header-offset");
      invalidateSiteHeaderOffsetCache();
    };

    const applyHeight = (height: number) => {
      if (height <= 0) return;
      document.documentElement.style.setProperty(
        "--site-header-offset",
        `${height}px`,
      );
      invalidateSiteHeaderOffsetCache();
    };

    const header = document.querySelector("header");
    let resizeObserver: ResizeObserver | null = null;
    const scheduleSync = scheduleFrame(() => {
      if (!header) return;
      applyHeight(header.offsetHeight);
    });

    const startDesktopObserver = () => {
      if (!header || typeof ResizeObserver === "undefined") {
        scheduleSync();
        return;
      }

      resizeObserver?.disconnect();
      resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        applyHeight(readResizeObserverHeight(entry));
      });
      resizeObserver.observe(header);
    };

    const stopDesktopObserver = () => {
      resizeObserver?.disconnect();
      resizeObserver = null;
      scheduleSync.cancel();
    };

    const onBreakpointChange = () => {
      if (mobileQuery.matches) {
        stopDesktopObserver();
        clearInlineOffset();
      } else {
        startDesktopObserver();
      }
    };

    const bootstrapFrame = window.requestAnimationFrame(() => {
      if (mobileQuery.matches) {
        clearInlineOffset();
      } else {
        startDesktopObserver();
      }
    });

    mobileQuery.addEventListener("change", onBreakpointChange);

    return () => {
      window.cancelAnimationFrame(bootstrapFrame);
      stopDesktopObserver();
      mobileQuery.removeEventListener("change", onBreakpointChange);
    };
  }, []);

  return null;
}
