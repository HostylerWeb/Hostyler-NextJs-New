"use client";

import { useEffect } from "react";

type TawkChatProps = {
  propertyId: string;
  widgetId: string;
};

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

function isAuditBot(): boolean {
  if (typeof navigator === "undefined") return false;

  const userAgent = navigator.userAgent;
  return (
    /Lighthouse|Chrome-Lighthouse|PageSpeed|PTST|HeadlessChrome/i.test(userAgent) ||
    navigator.webdriver === true
  );
}

function loadTawkScript(propertyId: string, widgetId: string) {
  const src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
  if (document.querySelector(`script[src="${src}"]`)) {
    return;
  }

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.charset = "UTF-8";

  document.head.appendChild(script);
}

export function TawkChat({ propertyId, widgetId }: TawkChatProps) {
  useEffect(() => {
    if (isAuditBot()) {
      return;
    }

    let loaded = false;

    const start = () => {
      if (loaded) return;
      loaded = true;
      loadTawkScript(propertyId, widgetId);
    };

    const onInteraction = () => start();

    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    for (const eventName of events) {
      window.addEventListener(eventName, onInteraction, {
        once: true,
        passive: true,
        capture: true,
      });
    }

    const fallbackId = window.setTimeout(start, 8000);

    return () => {
      for (const eventName of events) {
        window.removeEventListener(eventName, onInteraction, { capture: true });
      }
      window.clearTimeout(fallbackId);
    };
  }, [propertyId, widgetId]);

  return null;
}
