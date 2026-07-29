"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  variant?: "default" | "danger";
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "default",
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-ink/35"
        onClick={close}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className="relative z-[1] w-full max-w-md rounded-[var(--radius-lg)] border-2.5 border-ink bg-paper p-6 shadow-brutal outline-none"
      >
        <h2 id={titleId} className="font-display text-xl">
          {title}
        </h2>
        {description ? (
          <p id={descriptionId} className="mt-2 text-sm text-muted">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-4">{children}</div> : null}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={close}>
            {cancelLabel}
          </Button>
          {onConfirm ? (
            <Button
              variant={variant === "danger" ? "primary" : "ink"}
              size="sm"
              className={cn(variant === "danger" && "bg-coral hover:bg-coral")}
              onClick={() => {
                onConfirm();
                close();
              }}
            >
              {confirmLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
