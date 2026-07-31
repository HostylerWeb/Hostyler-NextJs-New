"use client";

import { logoutAction } from "@/lib/actions/logout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type AdminLogoutButtonProps = {
  variant?: "sidebar" | "header";
  className?: string;
};

export function AdminLogoutButton({
  variant = "header",
  className,
}: AdminLogoutButtonProps) {
  if (variant === "sidebar") {
    return (
      <form action={logoutAction}>
        <button
          type="submit"
          className={cn(
            "w-full rounded-full border-2 border-transparent px-4 py-2.5 text-left text-sm font-semibold text-paper/80 transition hover:border-paper hover:bg-paper/10",
            className,
          )}
        >
          Log out
        </button>
      </form>
    );
  }

  return (
    <form action={logoutAction}>
      <Button variant="ghost" size="sm" type="submit" className={className}>
        Log out
      </Button>
    </form>
  );
}
