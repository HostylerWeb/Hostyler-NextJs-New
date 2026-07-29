import { z } from "zod";

const statSchema = z.object({
  metric: z.string().min(1, "Metric is required").max(100),
  label: z.string().min(1, "Label is required").max(200),
});

export const caseStudyFormSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and hyphens only",
    ),
  title: z.string().min(1, "Title is required").max(255),
  client_name: z.string().min(1, "Client name is required").max(255),
  excerpt: z.string().min(1, "Excerpt is required").max(2000),
  body: z.string().min(1, "Body is required").max(50000),
  cover_image_url: z.string().url("Enter a valid image URL").max(500),
  tags: z.array(z.string().min(1).max(50)).default([]),
  stats: z.array(statSchema).default([]),
  featured: z.coerce.boolean().default(false),
  sort_order: z.coerce.number().int().min(0).default(0),
  published: z.coerce.boolean().default(false),
});

export type CaseStudyFormValues = z.infer<typeof caseStudyFormSchema>;

export function parseTagsInput(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function formatTagsInput(tags: string[]): string {
  return tags.join(", ");
}
