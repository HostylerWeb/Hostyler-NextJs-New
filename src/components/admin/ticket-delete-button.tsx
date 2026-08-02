"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteSupportTicketAction } from "@/lib/actions/support";
import { Button } from "@/components/ui/button";

type TicketDeleteButtonProps = {
  ticketId: string;
  ticketNumber: string;
  redirectTo?: string;
  size?: "sm" | "default";
};

export function TicketDeleteButton({
  ticketId,
  ticketNumber,
  redirectTo,
  size = "sm",
}: TicketDeleteButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (
      !window.confirm(
        `Delete ticket ${ticketNumber}? This will permanently remove the ticket and all messages.`,
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteSupportTicketAction(ticketId);
      if (result.error) {
        window.alert(result.error);
        return;
      }

      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
        return;
      }

      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      variant="coral"
      size={size}
      disabled={pending}
      onClick={handleDelete}
    >
      {pending ? "Deleting…" : "Delete"}
    </Button>
  );
}
