import { z } from "zod";

const imagePathSchema = z
  .string()
  .min(1, "Avatar image is required")
  .max(500)
  .refine(
    (value) => value.startsWith("/") || /^https?:\/\//i.test(value),
    "Enter a valid image URL or site path (e.g. /testimonials/photo.webp)",
  );

export const testimonialTintSchema = z.enum(["violet", "coral", "lime"]);

export const testimonialFormSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and hyphens only",
    ),
  name: z.string().min(1, "Name is required").max(255),
  role: z.string().min(1, "Role or location is required").max(255),
  quote: z.string().min(1, "Quote is required").max(5000),
  avatar_url: imagePathSchema,
  tint: testimonialTintSchema.default("violet"),
  sort_order: z.coerce.number().int().min(0).default(0),
  published: z.coerce.boolean().default(false),
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;
