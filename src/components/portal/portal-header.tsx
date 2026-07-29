"use client";

import { logoutAction } from "@/lib/actions/logout";
import { Button } from "@/components/ui/button";

type PortalHeaderProps = {
  userName: string;
};

export function PortalHeader({ userName }: PortalHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 border-b-2.5 border-ink bg-paper/90 px-[var(--shell-padding)] py-4 backdrop-blur">
      <div>
        <p className="font-mono text-[11px] font-bold tracking-wider text-muted uppercase">
          Client portal
        </p>
        <h1 className="font-display text-xl">Welcome back, {userName}</h1>
      </div>
      <form action={logoutAction}>
        <Button variant="ghost" size="sm" type="submit">
          Log out
        </Button>
      </form>
    </header>
  );
}
