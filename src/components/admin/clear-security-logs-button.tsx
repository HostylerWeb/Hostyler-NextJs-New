"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { clearSecurityLogsAction } from "@/lib/actions/security";
import { Button } from "@/components/ui/button";

export function ClearSecurityLogsButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleClear() {
    if (
      !window.confirm(
        "Clear all security event logs? Active IP blocks will remain. This cannot be undone.",
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await clearSecurityLogsAction();
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
      size="sm"
      disabled={pending}
      onClick={handleClear}
    >
      {pending ? "Clearing…" : "Clear logs"}
    </Button>
  );
}
