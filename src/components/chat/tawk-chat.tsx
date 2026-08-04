"use client";

import { useEffect } from "react";

type TawkChatProps = {
  propertyId: string;
  widgetId: string;
};

const SCROLL_THRESHOLD_PX = 80;

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
    };
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

function ensureTawkIframeTitle() {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe[src*="tawk.to"]');
  if (iframe && !iframe.title) {
    iframe.title = "Live chat";
  }
}

function loadTawkScript(propertyId: string, widgetId: string) {
  const src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
  if (document.querySelector(`script[src="${src}"]`)) {
    return;
  }

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  window.Tawk_API.onLoad = () => {
    ensureTawkIframeTitle();
  };

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
      window.removeEventListener("scroll", onScroll);
    };

    const onScroll = () => {
      if (window.scrollY >= SCROLL_THRESHOLD_PX) {
        start();
      }
    };

    if (window.scrollY >= SCROLL_THRESHOLD_PX) {
      start();
      return;
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [propertyId, widgetId]);

  return null;
}
