"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteContactSubmissionAction } from "@/lib/actions/contacts";
import { Button } from "@/components/ui/button";

type ContactDeleteButtonProps = {
  id: string;
  name: string;
  size?: "sm" | "default";
};

export function ContactDeleteButton({
  id,
  name,
  size = "sm",
}: ContactDeleteButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (
      !window.confirm(
        `Delete the submission from "${name}"? This cannot be undone.`,
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteContactSubmissionAction(id);
      if (result.error) {
        window.alert(result.error);
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
