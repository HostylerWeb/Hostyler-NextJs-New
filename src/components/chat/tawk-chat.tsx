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

  const firstScript = document.getElementsByTagName("script")[0];
  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
}

export function TawkChat({ propertyId, widgetId }: TawkChatProps) {
  useEffect(() => {
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      loadTawkScript(propertyId, widgetId);
    };

    const idleCallback = window.requestIdleCallback;
    if (idleCallback) {
      const idleId = idleCallback(start, { timeout: 4000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(start, 2500);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [propertyId, widgetId]);

  return null;
}
