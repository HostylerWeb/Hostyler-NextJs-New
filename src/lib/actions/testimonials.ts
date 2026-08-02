"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonialById,
  getTestimonialBySlug,
  updateTestimonial,
} from "@/lib/repositories/testimonials";
import { testimonialFormSchema } from "@/lib/validators/testimonial";
import { isAdmin } from "@/lib/permissions";

export type TestimonialActionState = {
  error?: string;
  success?: string;
};

function parseTestimonialForm(formData: FormData) {
  return testimonialFormSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    role: formData.get("role"),
    quote: formData.get("quote"),
    avatar_url: formData.get("avatar_url"),
    tint: formData.get("tint") ?? "violet",
    sort_order: formData.get("sort_order") ?? 0,
    published: formData.get("published") === "on",
  });
}

function revalidateTestimonialPaths(id?: string) {
  revalidatePath("/admin/testimonials");
  if (id) {
    revalidatePath(`/admin/testimonials/${id}`);
  }
  revalidatePath("/");
}

export async function getTestimonialForAdmin(id: string) {
  const session = await auth();
  if (!isAdmin(session?.user)) return null;
  return getTestimonialById(id);
}

export async function createTestimonialAction(
  _prev: TestimonialActionState,
  formData: FormData,
): Promise<TestimonialActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const parsed = parseTestimonialForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const existing = await getTestimonialBySlug(parsed.data.slug);
  if (existing) {
    return { error: "A review with this slug already exists." };
  }

  const testimonial = await createTestimonial(parsed.data);

  revalidateTestimonialPaths(testimonial.id);
  redirect(`/admin/testimonials/${testimonial.id}`);
}

export async function updateTestimonialAction(
  id: string,
  _prev: TestimonialActionState,
  formData: FormData,
): Promise<TestimonialActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const existing = await getTestimonialById(id);
  if (!existing) {
    return { error: "Review not found." };
  }

  const parsed = parseTestimonialForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  if (parsed.data.slug !== existing.slug) {
    const slugTaken = await getTestimonialBySlug(parsed.data.slug);
    if (slugTaken && slugTaken.id !== id) {
      return { error: "A review with this slug already exists." };
    }
  }

  const testimonial = await updateTestimonial(id, parsed.data);

  revalidateTestimonialPaths(testimonial.id);
  return { success: "Review saved." };
}

export async function deleteTestimonialAction(
  id: string,
): Promise<TestimonialActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const existing = await getTestimonialById(id);
  if (!existing) {
    return { error: "Review not found." };
  }

  await deleteTestimonial(id);
  revalidateTestimonialPaths(existing.id);
  return { success: "Review deleted." };
}
