"use client";

import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { case_studies } from "@/generated/prisma/client";
import {
  createCaseStudyAction,
  deleteCaseStudyAction,
  updateCaseStudyAction,
  type CaseStudyActionState,
} from "@/lib/actions/case-studies";
import { formatTagsInput } from "@/lib/validators/case-study";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type StatRow = { metric: string; label: string };

type CaseStudyFormProps = {
  mode: "create" | "edit";
  caseStudyId?: string;
  defaultValues?: case_studies;
};

const initialState: CaseStudyActionState = {};

function parseStatsFromCaseStudy(study?: case_studies): StatRow[] {
  if (!study || !Array.isArray(study.stats)) return [{ metric: "", label: "" }];
  const stats = study.stats as StatRow[];
  return stats.length > 0 ? stats : [{ metric: "", label: "" }];
}

export function CaseStudyForm({
  mode,
  caseStudyId,
  defaultValues,
}: CaseStudyFormProps) {
  const router = useRouter();
  const action =
    mode === "create"
      ? createCaseStudyAction
      : updateCaseStudyAction.bind(null, caseStudyId!);

  const [state, formAction, pending] = useActionState(action, initialState);
  const [deletePending, startDelete] = useTransition();
  const [stats, setStats] = useState<StatRow[]>(
    parseStatsFromCaseStudy(defaultValues),
  );

  function updateStat(index: number, field: keyof StatRow, value: string) {
    setStats((rows) =>
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  }

  function addStat() {
    setStats((rows) => [...rows, { metric: "", label: "" }]);
  }

  function removeStat(index: number) {
    setStats((rows) =>
      rows.length === 1 ? rows : rows.filter((_, i) => i !== index),
    );
  }

  function handleDelete() {
    if (!caseStudyId) return;
    if (
      !window.confirm(
        `Delete "${defaultValues?.title ?? "this case study"}"? This cannot be undone.`,
      )
    ) {
      return;
    }

    startDelete(async () => {
      const result = await deleteCaseStudyAction(caseStudyId);
      if (result?.error) {
        window.alert(result.error);
        return;
      }
      router.push("/admin/case-studies");
      router.refresh();
    });
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? <Alert variant="success">{state.success}</Alert> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" htmlFor="title">
          <Input
            id="title"
            name="title"
            defaultValue={defaultValues?.title}
            required
          />
        </Field>
        <Field label="Slug" htmlFor="slug">
          <Input
            id="slug"
            name="slug"
            defaultValue={defaultValues?.slug}
            placeholder="northstar-finance"
            required
          />
        </Field>
        <Field label="Client name" htmlFor="client_name">
          <Input
            id="client_name"
            name="client_name"
            defaultValue={defaultValues?.client_name}
            required
          />
        </Field>
        <Field label="Cover image URL" htmlFor="cover_image_url">
          <Input
            id="cover_image_url"
            name="cover_image_url"
            type="url"
            defaultValue={defaultValues?.cover_image_url}
            required
          />
        </Field>
      </div>

      <Field label="Excerpt" htmlFor="excerpt">
        <Textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={defaultValues?.excerpt}
          required
        />
      </Field>

      <Field label="Body" htmlFor="body">
        <Textarea
          id="body"
          name="body"
          rows={10}
          defaultValue={defaultValues?.body}
          required
        />
      </Field>

      <Field label="Tags" htmlFor="tags">
        <Input
          id="tags"
          name="tags"
          placeholder="Web, AI"
          defaultValue={
            defaultValues
              ? formatTagsInput(defaultValues.tags as string[])
              : ""
          }
        />
        <p className="text-xs text-muted">Comma-separated</p>
      </Field>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold">Stats</p>
          <Button type="button" variant="ghost" size="sm" onClick={addStat}>
            Add stat
          </Button>
        </div>
        {stats.map((stat, index) => (
          <div key={index} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <Input
              name="stat_metric"
              placeholder="Metric"
              value={stat.metric}
              onChange={(event) =>
                updateStat(index, "metric", event.target.value)
              }
            />
            <Input
              name="stat_label"
              placeholder="Label"
              value={stat.label}
              onChange={(event) =>
                updateStat(index, "label", event.target.value)
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeStat(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Sort order" htmlFor="sort_order">
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            min={0}
            defaultValue={defaultValues?.sort_order ?? 0}
          />
        </Field>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <Checkbox id="featured" name="featured" defaultChecked={defaultValues?.featured} />
          Featured on homepage
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <Checkbox id="published" name="published" defaultChecked={defaultValues?.published} />
          Published
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Saving..."
            : mode === "create"
              ? "Create case study"
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
