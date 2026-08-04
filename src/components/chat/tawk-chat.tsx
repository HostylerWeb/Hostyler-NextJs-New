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

export function TawkChat({ propertyId, widgetId }: TawkChatProps) {
  useEffect(() => {
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
    script.setAttribute("crossorigin", "*");

    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }, [propertyId, widgetId]);

  return null;
}
