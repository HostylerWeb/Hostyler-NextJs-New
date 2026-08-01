import { z } from "zod";
import {
  contactBudgetOptions,
  contactProjectTypeOptions,
} from "@/content/contact-options";

const projectTypeValues = contactProjectTypeOptions.map((option) => option.value);
const budgetValues = [
  ...contactBudgetOptions.map((option) => option.value),
  // Legacy values still stored on older submissions
  "under_25k",
  "range_25_50k",
  "range_50_100k",
  "range_100k_plus",
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  project_type: z.enum(projectTypeValues),
  budget: z.enum(budgetValues),
  message: z.string().trim().max(5000).optional(),
  website: z.string().max(0).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
