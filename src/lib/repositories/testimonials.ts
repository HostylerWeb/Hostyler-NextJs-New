import { Prisma, testimonials } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";

export type TestimonialWriteInput = {
  slug: string;
  name: string;
  role: string;
  quote: string;
  avatar_url: string;
  tint: "violet" | "coral" | "lime";
  sort_order: number;
  published: boolean;
};

export async function listPublishedTestimonials(): Promise<testimonials[]> {
  return prisma.testimonials.findMany({
    where: { published: true },
    orderBy: [{ sort_order: "asc" }, { created_at: "asc" }],
  });
}

export async function listAllTestimonials(): Promise<testimonials[]> {
  return prisma.testimonials.findMany({
    orderBy: [{ sort_order: "asc" }, { created_at: "asc" }],
  });
}

export async function getTestimonialById(id: string): Promise<testimonials | null> {
  return prisma.testimonials.findUnique({ where: { id } });
}

export async function getTestimonialBySlug(slug: string): Promise<testimonials | null> {
  return prisma.testimonials.findUnique({ where: { slug } });
}

function toCreateInput(data: TestimonialWriteInput): Prisma.testimonialsCreateInput {
  return {
    slug: data.slug,
    name: data.name,
    role: data.role,
    quote: data.quote,
    avatar_url: data.avatar_url,
    tint: data.tint,
    sort_order: data.sort_order,
    published: data.published,
  };
}

export async function createTestimonial(
  data: TestimonialWriteInput,
): Promise<testimonials> {
  return prisma.testimonials.create({
    data: toCreateInput(data),
  });
}

export async function updateTestimonial(
  id: string,
  data: TestimonialWriteInput,
): Promise<testimonials> {
  return prisma.testimonials.update({
    where: { id },
    data: toCreateInput(data),
  });
}

export async function deleteTestimonial(id: string): Promise<void> {
  await prisma.testimonials.delete({ where: { id } });
}

export async function upsertTestimonial(
  slug: string,
  data: Omit<Prisma.testimonialsCreateInput, "slug">,
): Promise<testimonials> {
  return prisma.testimonials.upsert({
    where: { slug },
    create: { slug, ...data },
    update: data,
  });
}
