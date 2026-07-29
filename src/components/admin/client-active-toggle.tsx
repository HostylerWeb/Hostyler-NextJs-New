"use client";

import { useTransition } from "react";
import { toggleClientActiveAction } from "@/lib/actions/clients";
import { Button } from "@/components/ui/button";

type ClientToggleProps = {
  clientId: string;
  isActive: boolean;
};

export function ClientActiveToggle({ clientId, isActive }: ClientToggleProps) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await toggleClientActiveAction(clientId, !isActive);
        })
      }
    >
      {isActive ? "Deactivate" : "Activate"}
    </Button>
  );
}
