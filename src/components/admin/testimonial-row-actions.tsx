"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteTestimonialAction } from "@/lib/actions/testimonials";
import { Button } from "@/components/ui/button";

type TestimonialRowActionsProps = {
  id: string;
  name: string;
};

export function TestimonialRowActions({ id, name }: TestimonialRowActionsProps) {
  const router = useRouter();
  const [deletePending, startDelete] = useTransition();

  function handleDelete() {
    if (
      !window.confirm(
        `Delete "${name}"? This cannot be undone.`,
      )
    ) {
      return;
    }

    startDelete(async () => {
      const result = await deleteTestimonialAction(id);
      if (result.error) {
        window.alert(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/admin/testimonials/${id}`}
        className="text-sm font-semibold text-violet hover:underline"
      >
        Edit
      </Link>
      <Button
        type="button"
        variant="coral"
        size="sm"
        disabled={deletePending}
        onClick={handleDelete}
      >
        {deletePending ? "Deleting…" : "Delete"}
      </Button>
    </div>
  );
}
