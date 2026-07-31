"use client";

import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { testimonials } from "@/generated/prisma/client";
import {
  createTestimonialAction,
  deleteTestimonialAction,
  updateTestimonialAction,
  type TestimonialActionState,
} from "@/lib/actions/testimonials";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TestimonialFormProps = {
  mode: "create" | "edit";
  testimonialId?: string;
  defaultValues?: testimonials;
};

const initialState: TestimonialActionState = {};

const tintOptions = [
  { value: "violet", label: "Violet" },
  { value: "coral", label: "Coral" },
  { value: "lime", label: "Lime" },
] as const;

export function TestimonialForm({
  mode,
  testimonialId,
  defaultValues,
}: TestimonialFormProps) {
  const router = useRouter();
  const action =
    mode === "create"
      ? createTestimonialAction
      : updateTestimonialAction.bind(null, testimonialId!);

  const [state, formAction, pending] = useActionState(action, initialState);
  const [deletePending, startDelete] = useTransition();

  function handleDelete() {
    if (!testimonialId) return;
    if (
      !window.confirm(
        `Delete "${defaultValues?.name ?? "this review"}"? This cannot be undone.`,
      )
    ) {
      return;
    }

    startDelete(async () => {
      const result = await deleteTestimonialAction(testimonialId);
      if (result?.error) {
        window.alert(result.error);
        return;
      }
      router.push("/admin/testimonials");
      router.refresh();
    });
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? <Alert variant="success">{state.success}</Alert> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Client name" htmlFor="name">
          <Input
            id="name"
            name="name"
            defaultValue={defaultValues?.name}
            required
          />
        </Field>
        <Field label="Slug" htmlFor="slug">
          <Input
            id="slug"
            name="slug"
            defaultValue={defaultValues?.slug}
            placeholder="luke-woodward"
            required
          />
        </Field>
        <Field label="Role or location" htmlFor="role">
          <Input
            id="role"
            name="role"
            defaultValue={defaultValues?.role}
            placeholder="🇬🇧 United Kingdom"
            required
          />
        </Field>
        <Field label="Avatar image URL" htmlFor="avatar_url">
          <Input
            id="avatar_url"
            name="avatar_url"
            defaultValue={defaultValues?.avatar_url}
            placeholder="/testimonials/luke-woodward.webp"
            required
          />
        </Field>
      </div>

      <Field label="Quote" htmlFor="quote">
        <Textarea
          id="quote"
          name="quote"
          rows={6}
          defaultValue={defaultValues?.quote}
          required
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Card tint" htmlFor="tint">
          <select
            id="tint"
            name="tint"
            defaultValue={defaultValues?.tint ?? "violet"}
            className="w-full rounded-[var(--radius-md)] border-2 border-ink bg-paper px-3 py-2 text-sm font-semibold"
          >
            {tintOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sort order" htmlFor="sort_order">
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            min={0}
            defaultValue={defaultValues?.sort_order ?? 0}
          />
        </Field>
        <label className="flex cursor-pointer items-center gap-2 self-end pb-2 text-sm font-semibold">
          <Checkbox
            id="published"
            name="published"
            defaultChecked={defaultValues?.published}
          />
          Published on homepage
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Saving..."
            : mode === "create"
              ? "Create review"
              : "Save changes"}
        </Button>
        {mode === "edit" ? (
          <Button
            type="button"
            variant="ghost"
            disabled={deletePending}
            onClick={handleDelete}
          >
            {deletePending ? "Deleting..." : "Delete"}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
