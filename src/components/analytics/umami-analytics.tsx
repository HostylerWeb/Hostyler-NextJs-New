"use client";

import { useEffect } from "react";

type UmamiAnalyticsProps = {
  websiteId: string;
  scriptUrl: string;
};

export function UmamiAnalytics({ websiteId, scriptUrl }: UmamiAnalyticsProps) {
  useEffect(() => {
    let cancelled = false;

    const load = () => {
      if (cancelled || document.querySelector(`script[src="${scriptUrl}"]`)) {
        return;
      }

      const script = document.createElement("script");
      script.defer = true;
      script.src = scriptUrl;
      script.setAttribute("data-website-id", websiteId);
      document.head.appendChild(script);
    };

    const idleCallback = window.requestIdleCallback;
    if (idleCallback) {
      const idleId = idleCallback(load, { timeout: 5000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(load, 3000);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [scriptUrl, websiteId]);

  return null;
}
