import { z } from "zod";

export const newTicketSchema = z.object({
  subject: z.string().min(3, "Subject is required").max(500),
  category: z.enum(["billing", "technical", "project", "other"]),
  priority: z.enum(["low", "normal", "high", "urgent"]),
  body: z.string().min(10, "Please describe your issue").max(10000),
});

export const ticketReplySchema = z.object({
  body: z.string().min(1, "Message is required").max(10000),
  is_internal: z.coerce.boolean().optional().default(false),
});
