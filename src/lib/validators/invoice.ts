import { z } from "zod";

export const invoiceCurrencies = ["USD", "EUR", "GBP"] as const;

export type InvoiceCurrency = (typeof invoiceCurrencies)[number];

const lineItemSchema = z.object({
  description: z.string().min(1, "Description is required").max(500),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  unit_price: z.coerce.number().min(0, "Price must be zero or more"),
});

export const invoiceFormSchema = z.object({
  user_id: z.string().uuid("Select a client"),
  currency: z.enum(invoiceCurrencies).default("USD"),
  tax_rate: z.coerce.number().min(0).max(100).default(0),
  issue_date: z.string().min(1, "Issue date is required"),
  due_date: z.string().min(1, "Due date is required"),
  client_notes: z.string().max(5000).optional(),
  notes: z.string().max(5000).optional(),
  line_items: z.array(lineItemSchema).min(1, "Add at least one line item"),
});

export const manualPaidSchema = z.object({
  note: z.string().min(1, "A note is required for manual payment"),
});
