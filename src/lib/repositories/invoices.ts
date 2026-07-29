import {
  invoice_line_items,
  invoice_status,
  invoice_status_history,
  invoices,
  Prisma,
} from "@/generated/prisma/client";
import { prisma } from "@/lib/db";

export type InvoiceLineItemInput = {
  description: string;
  quantity: number;
  unit_price: number;
  sort_order?: number;
};

export type CreateInvoiceInput = {
  user_id: string;
  created_by_id: string;
  currency?: string;
  tax_rate?: number;
  issue_date: Date;
  due_date: Date;
  notes?: string | null;
  client_notes?: string | null;
  line_items: InvoiceLineItemInput[];
};

export type InvoiceWithRelations = invoices & {
  line_items: invoice_line_items[];
  status_history?: invoice_status_history[];
};

function calculateLineAmount(quantity: number, unitPrice: number): number {
  return Math.round(quantity * unitPrice * 100) / 100;
}

function calculateTotals(
  lineItems: InvoiceLineItemInput[],
  taxRate: number,
): { subtotal: number; tax_amount: number; total: number } {
  const subtotal = lineItems.reduce(
    (sum, item) => sum + calculateLineAmount(item.quantity, item.unit_price),
    0,
  );
  const tax_amount = Math.round(subtotal * (taxRate / 100) * 100) / 100;
  const total = Math.round((subtotal + tax_amount) * 100) / 100;
  return { subtotal, tax_amount, total };
}

export async function generateInvoiceNumber(
  issueDate: Date = new Date(),
): Promise<string> {
  const year = issueDate.getFullYear();
  const prefix = `INV-${year}-`;

  return prisma.$transaction(async (tx) => {
    const latest = await tx.invoices.findFirst({
      where: { invoice_number: { startsWith: prefix } },
      orderBy: { invoice_number: "desc" },
      select: { invoice_number: true },
    });

    const nextSequence = latest
      ? parseInt(latest.invoice_number.replace(prefix, ""), 10) + 1
      : 1;

    return `${prefix}${String(nextSequence).padStart(4, "0")}`;
  });
}

export async function createInvoice(
  input: CreateInvoiceInput,
): Promise<InvoiceWithRelations> {
  const taxRate = input.tax_rate ?? 0;
  const { subtotal, tax_amount, total } = calculateTotals(
    input.line_items,
    taxRate,
  );
  const invoice_number = await generateInvoiceNumber(input.issue_date);

  return prisma.$transaction(async (tx) => {
    const invoice = await tx.invoices.create({
      data: {
        invoice_number,
        user_id: input.user_id,
        created_by_id: input.created_by_id,
        currency: input.currency ?? "USD",
        tax_rate: taxRate,
        subtotal,
        tax_amount,
        total,
        issue_date: input.issue_date,
        due_date: input.due_date,
        notes: input.notes,
        client_notes: input.client_notes,
        line_items: {
          create: input.line_items.map((item, index) => ({
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unit_price,
            amount: calculateLineAmount(item.quantity, item.unit_price),
            sort_order: item.sort_order ?? index,
          })),
        },
        status_history: {
          create: {
            from_status: null,
            to_status: "draft",
            changed_by_id: input.created_by_id,
            note: "Invoice created",
          },
        },
      },
      include: { line_items: { orderBy: { sort_order: "asc" } } },
    });

    return invoice;
  });
}

export async function getInvoiceById(
  id: string,
  include?: Prisma.invoicesInclude,
): Promise<InvoiceWithRelations | null> {
  return prisma.invoices.findUnique({
    where: { id },
    include: {
      line_items: { orderBy: { sort_order: "asc" } },
      ...include,
    },
  }) as Promise<InvoiceWithRelations | null>;
}

export async function getInvoiceByNumber(
  invoiceNumber: string,
): Promise<InvoiceWithRelations | null> {
  return prisma.invoices.findUnique({
    where: { invoice_number: invoiceNumber },
    include: { line_items: { orderBy: { sort_order: "asc" } } },
  }) as Promise<InvoiceWithRelations | null>;
}

export async function getInvoiceByPayToken(
  payToken: string,
): Promise<InvoiceWithRelations | null> {
  return prisma.invoices.findFirst({
    where: {
      pay_token: payToken,
      pay_token_expires_at: { gt: new Date() },
    },
    include: { line_items: { orderBy: { sort_order: "asc" } } },
  }) as Promise<InvoiceWithRelations | null>;
}

export async function listInvoicesByUser(
  userId: string,
): Promise<InvoiceWithRelations[]> {
  return prisma.invoices.findMany({
    where: { user_id: userId },
    include: { line_items: { orderBy: { sort_order: "asc" } } },
    orderBy: { created_at: "desc" },
  }) as Promise<InvoiceWithRelations[]>;
}

export async function listAllInvoices(
  filters?: { status?: invoice_status; user_id?: string },
): Promise<InvoiceWithRelations[]> {
  return prisma.invoices.findMany({
    where: {
      status: filters?.status,
      user_id: filters?.user_id,
    },
    include: { line_items: { orderBy: { sort_order: "asc" } } },
    orderBy: { created_at: "desc" },
  }) as Promise<InvoiceWithRelations[]>;
}

type DbClient = Prisma.TransactionClient | typeof prisma;

export async function updateInvoiceStatus(
  id: string,
  toStatus: invoice_status,
  options?: {
    changed_by_id?: string | null;
    note?: string | null;
    pay_token?: string | null;
    pay_token_expires_at?: Date | null;
    sent_at?: Date | null;
    paid_at?: Date | null;
    amount_paid?: number;
  },
  db: DbClient = prisma,
): Promise<invoices> {
  const current = await db.invoices.findUniqueOrThrow({ where: { id } });

  const updated = await db.invoices.update({
    where: { id },
    data: {
      status: toStatus,
      pay_token: options?.pay_token,
      pay_token_expires_at: options?.pay_token_expires_at,
      sent_at: options?.sent_at,
      paid_at: options?.paid_at,
      amount_paid:
        options?.amount_paid !== undefined ? options.amount_paid : undefined,
    },
  });

  await db.invoice_status_history.create({
    data: {
      invoice_id: id,
      from_status: current.status,
      to_status: toStatus,
      changed_by_id: options?.changed_by_id ?? null,
      note: options?.note,
    },
  });

  return updated;
}

export async function markInvoicesOverdue(asOf: Date = new Date()): Promise<number> {
  const result = await prisma.invoices.updateMany({
    where: {
      status: { in: ["sent", "viewed", "partially_paid"] },
      due_date: { lt: asOf },
    },
    data: { status: "overdue" },
  });
  return result.count;
}

export type UpdateInvoiceInput = {
  currency?: string;
  tax_rate?: number;
  issue_date?: Date;
  due_date?: Date;
  notes?: string | null;
  client_notes?: string | null;
  line_items?: InvoiceLineItemInput[];
};

export async function updateInvoice(
  id: string,
  input: UpdateInvoiceInput,
  changedById?: string,
): Promise<InvoiceWithRelations> {
  const current = await prisma.invoices.findUniqueOrThrow({
    where: { id },
    include: { line_items: true },
  });

  if (!["draft", "sent"].includes(current.status)) {
    throw new Error("Invoice cannot be edited in its current status");
  }

  const lineItems = input.line_items ?? current.line_items.map((item) => ({
    description: item.description,
    quantity: Number(item.quantity),
    unit_price: Number(item.unit_price),
    sort_order: item.sort_order,
  }));
  const taxRate =
    input.tax_rate !== undefined ? input.tax_rate : Number(current.tax_rate);
  const { subtotal, tax_amount, total } = calculateTotals(lineItems, taxRate);

  return prisma.$transaction(async (tx) => {
    if (input.line_items) {
      await tx.invoice_line_items.deleteMany({ where: { invoice_id: id } });
    }

    const invoice = await tx.invoices.update({
      where: { id },
      data: {
        currency: input.currency ?? current.currency,
        tax_rate: taxRate,
        subtotal,
        tax_amount,
        total,
        issue_date: input.issue_date ?? current.issue_date,
        due_date: input.due_date ?? current.due_date,
        notes: input.notes !== undefined ? input.notes : current.notes,
        client_notes:
          input.client_notes !== undefined
            ? input.client_notes
            : current.client_notes,
        ...(input.line_items
          ? {
              line_items: {
                create: lineItems.map((item, index) => ({
                  description: item.description,
                  quantity: item.quantity,
                  unit_price: item.unit_price,
                  amount: calculateLineAmount(item.quantity, item.unit_price),
                  sort_order: item.sort_order ?? index,
                })),
              },
            }
          : {}),
      },
      include: { line_items: { orderBy: { sort_order: "asc" } } },
    });

    if (input.line_items) {
      await tx.invoice_status_history.create({
        data: {
          invoice_id: id,
          from_status: current.status,
          to_status: current.status,
          changed_by_id: changedById ?? null,
          note: "Invoice updated",
        },
      });
    }

    return invoice;
  });
}

export async function markInvoiceViewed(id: string): Promise<void> {
  const invoice = await prisma.invoices.findUnique({ where: { id } });
  if (!invoice || invoice.status !== "sent") return;

  await prisma.invoices.update({
    where: { id },
    data: { status: "viewed" },
  });

  await prisma.invoice_status_history.create({
    data: {
      invoice_id: id,
      from_status: "sent",
      to_status: "viewed",
      note: "Client viewed invoice",
    },
  });
}

export { calculateTotals, calculateLineAmount };
