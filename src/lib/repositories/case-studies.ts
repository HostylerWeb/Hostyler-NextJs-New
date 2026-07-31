import { case_studies, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";

export type CaseStudyWriteInput = {
  slug: string;
  title: string;
  client_name: string;
  excerpt: string;
  body: string;
  cover_image_url: string;
  tags: string[];
  stats: Array<{ metric: string; label: string }>;
  featured: boolean;
  sort_order: number;
  published: boolean;
  published_at?: Date | null;
};

export async function listPublishedCaseStudies(): Promise<case_studies[]> {
  return prisma.case_studies.findMany({
    where: { published: true },
    orderBy: [{ sort_order: "asc" }, { published_at: "desc" }],
  });
}

export async function getFeaturedCaseStudy(): Promise<case_studies | null> {
  return prisma.case_studies.findFirst({
    where: { published: true, featured: true },
    orderBy: [{ sort_order: "asc" }, { published_at: "desc" }],
  });
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<case_studies | null> {
  return prisma.case_studies.findFirst({
    where: { slug, published: true },
  });
}

export async function getCaseStudyById(id: string): Promise<case_studies | null> {
  return prisma.case_studies.findUnique({ where: { id } });
}

export async function getCaseStudyBySlugForAdmin(
  slug: string,
): Promise<case_studies | null> {
  return prisma.case_studies.findUnique({ where: { slug } });
}

function toCreateInput(data: CaseStudyWriteInput): Prisma.case_studiesCreateInput {
  return {
    slug: data.slug,
    title: data.title,
    client_name: data.client_name,
    excerpt: data.excerpt,
    body: data.body,
    cover_image_url: data.cover_image_url,
    tags: data.tags,
    stats: data.stats,
    featured: data.featured,
    sort_order: data.sort_order,
    published: data.published,
    published_at: data.published_at ?? null,
  };
}

export async function createCaseStudy(
  data: CaseStudyWriteInput,
): Promise<case_studies> {
  return prisma.case_studies.create({
    data: toCreateInput(data),
  });
}

export async function updateCaseStudy(
  id: string,
  data: CaseStudyWriteInput,
): Promise<case_studies> {
  return prisma.case_studies.update({
    where: { id },
    data: toCreateInput(data),
  });
}

export async function deleteCaseStudy(id: string): Promise<void> {
  await prisma.case_studies.delete({ where: { id } });
}

export async function upsertCaseStudy(
  slug: string,
  data: Omit<Prisma.case_studiesCreateInput, "slug">,
): Promise<case_studies> {
  return prisma.case_studies.upsert({
    where: { slug },
    create: { slug, ...data },
    update: data,
  });
}

export async function listAllCaseStudies(): Promise<case_studies[]> {
  return prisma.case_studies.findMany({
    orderBy: [{ sort_order: "asc" }, { created_at: "desc" }],
  });
}
