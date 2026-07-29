"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  createCaseStudy,
  deleteCaseStudy,
  getCaseStudyById,
  getCaseStudyBySlugForAdmin,
  updateCaseStudy,
} from "@/lib/repositories/case-studies";
import {
  caseStudyFormSchema,
  parseTagsInput,
} from "@/lib/validators/case-study";
import { isAdmin } from "@/lib/permissions";

export type CaseStudyActionState = {
  error?: string;
  success?: string;
};

function parseStats(formData: FormData) {
  const metrics = formData.getAll("stat_metric");
  const labels = formData.getAll("stat_label");

  return metrics
    .map((metric, index) => ({
      metric: String(metric).trim(),
      label: String(labels[index] ?? "").trim(),
    }))
    .filter((stat) => stat.metric && stat.label);
}

function parseCaseStudyForm(formData: FormData) {
  return caseStudyFormSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    client_name: formData.get("client_name"),
    excerpt: formData.get("excerpt"),
    body: formData.get("body"),
    cover_image_url: formData.get("cover_image_url"),
    tags: parseTagsInput(String(formData.get("tags") ?? "")),
    stats: parseStats(formData),
    featured: formData.get("featured") === "on",
    sort_order: formData.get("sort_order") ?? 0,
    published: formData.get("published") === "on",
  });
}

function revalidateCaseStudyPaths(slug: string, id?: string) {
  revalidatePath("/admin/case-studies");
  if (id) {
    revalidatePath(`/admin/case-studies/${id}`);
  }
  revalidatePath(`/work/${slug}`);
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/sitemap.xml");
}

export async function getCaseStudyForAdmin(id: string) {
  const session = await auth();
  if (!isAdmin(session?.user)) return null;
  return getCaseStudyById(id);
}

export async function createCaseStudyAction(
  _prev: CaseStudyActionState,
  formData: FormData,
): Promise<CaseStudyActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const parsed = parseCaseStudyForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const existing = await getCaseStudyBySlugForAdmin(parsed.data.slug);
  if (existing) {
    return { error: "A case study with this slug already exists." };
  }

  const study = await createCaseStudy({
    ...parsed.data,
    published_at: parsed.data.published ? new Date() : null,
  });

  revalidateCaseStudyPaths(study.slug, study.id);
  redirect(`/admin/case-studies/${study.id}`);
}

export async function updateCaseStudyAction(
  id: string,
  _prev: CaseStudyActionState,
  formData: FormData,
): Promise<CaseStudyActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const existing = await getCaseStudyById(id);
  if (!existing) {
    return { error: "Case study not found." };
  }

  const parsed = parseCaseStudyForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  if (parsed.data.slug !== existing.slug) {
    const slugTaken = await getCaseStudyBySlugForAdmin(parsed.data.slug);
    if (slugTaken && slugTaken.id !== id) {
      return { error: "A case study with this slug already exists." };
    }
  }

  const publishedAt = parsed.data.published
    ? (existing.published_at ?? new Date())
    : null;

  const study = await updateCaseStudy(id, {
    ...parsed.data,
    published_at: publishedAt,
  });

  revalidateCaseStudyPaths(study.slug, study.id);
  if (existing.slug !== study.slug) {
    revalidateCaseStudyPaths(existing.slug, existing.id);
  }

  return { success: "Case study saved." };
}

export async function deleteCaseStudyAction(id: string): Promise<CaseStudyActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const existing = await getCaseStudyById(id);
  if (!existing) {
    return { error: "Case study not found." };
  }

  await deleteCaseStudy(id);
  revalidateCaseStudyPaths(existing.slug, existing.id);
  redirect("/admin/case-studies");
}
