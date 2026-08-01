"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type PayPalCheckoutSlotProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "card";
};

const PAYPAL_HOST_SELECTORS = [
  "paypal-basic-card-container",
  "paypal-basic-card-button",
  "paypal-guest-payments",
  "paypal-button",
].join(",");

function stretchPayPalElements(root: HTMLElement) {
  root.style.width = "100%";
  root.style.maxWidth = "100%";

  root.querySelectorAll<HTMLElement>(PAYPAL_HOST_SELECTORS).forEach((element) => {
    element.style.display = "block";
    element.style.width = "100%";
    element.style.maxWidth = "100%";
    element.style.boxSizing = "border-box";
  });

  root.querySelectorAll<HTMLIFrameElement>("iframe").forEach((iframe) => {
    iframe.style.width = "100%";
    iframe.style.maxWidth = "100%";
    iframe.style.display = "block";
  });
}

export function PayPalCheckoutSlot({
  children,
  className,
  variant = "default",
}: PayPalCheckoutSlotProps) {
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    const apply = () => stretchPayPalElements(slot);
    apply();

    const observer = new MutationObserver(apply);
    observer.observe(slot, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={slotRef}
      className={cn(
        "paypal-checkout-slot w-full",
        variant === "card" && "paypal-checkout-slot--card",
        className,
      )}
    >
      {children}
    </div>
  );
}
