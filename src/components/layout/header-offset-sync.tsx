"use client";

import { useEffect } from "react";

export function HeaderOffsetSync() {
  useEffect(() => {
    const sync = () => {
      const header = document.querySelector("header");
      if (!header) return;

      const height = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--site-header-offset", `${height}px`);
    };

    sync();

    const header = document.querySelector("header");
    const resizeObserver =
      header && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(sync)
        : null;

    resizeObserver?.observe(header as Element);
    window.addEventListener("resize", sync);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return null;
}
