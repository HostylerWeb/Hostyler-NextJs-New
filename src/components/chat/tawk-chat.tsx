"use client";

import { useCallback, useState } from "react";

type TawkChatProps = {
  propertyId: string;
  widgetId: string;
};

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      maximize?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

function ensureTawkIframeTitle() {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe[src*="tawk.to"]');
  if (iframe && !iframe.title) {
    iframe.title = "Live chat";
  }
}

function loadTawkScript(propertyId: string, widgetId: string, onReady?: () => void) {
  const src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
  if (document.querySelector(`script[src="${src}"]`)) {
    onReady?.();
    return;
  }

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  window.Tawk_API.onLoad = () => {
    ensureTawkIframeTitle();
    window.Tawk_API?.maximize?.();
    onReady?.();
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.charset = "UTF-8";
  document.head.appendChild(script);
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function TawkChat({ propertyId, widgetId }: TawkChatProps) {
  const [launcherVisible, setLauncherVisible] = useState(true);

  const openChat = useCallback(() => {
    loadTawkScript(propertyId, widgetId, () => {
      setLauncherVisible(false);
    });
  }, [propertyId, widgetId]);

  if (!launcherVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className="chat-launcher"
      aria-label="Open live chat"
      onClick={openChat}
    >
      <ChatIcon />
      <span className="chat-launcher-label">Chat</span>
    </button>
  );
}
