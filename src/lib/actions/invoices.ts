"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createPayToken } from "@/lib/invoice-tokens";
import { env } from "@/lib/env";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  sendInvoiceEmail,
  sendInvoiceReminder,
} from "@/lib/mail";
import {
  createInvoice,
  deleteInvoice,
  getInvoiceById,
  listAllInvoices,
  updateInvoice,
  updateInvoiceStatus,
} from "@/lib/repositories/invoices";
import { findUserById, listClients } from "@/lib/repositories/users";
import { invoiceFormSchema, manualPaidSchema } from "@/lib/validators/invoice";
import { isAdmin } from "@/lib/permissions";

export type InvoiceActionState = {
  error?: string;
  success?: string;
};

function parseLineItems(formData: FormData) {
  const descriptions = formData.getAll("line_description");
  const quantities = formData.getAll("line_quantity");
  const prices = formData.getAll("line_unit_price");

  return descriptions
    .map((description, index) => ({
      description: String(description),
      quantity: Number(quantities[index] ?? 1),
      unit_price: Number(prices[index] ?? 0),
    }))
    .filter((item) => item.description.trim());
}

export async function createInvoiceAction(
  _prev: InvoiceActionState,
  formData: FormData,
): Promise<InvoiceActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const parsed = invoiceFormSchema.safeParse({
    user_id: formData.get("user_id"),
    currency: formData.get("currency") || "USD",
    tax_rate: formData.get("tax_rate") || 0,
    issue_date: formData.get("issue_date"),
    due_date: formData.get("due_date"),
    client_notes: formData.get("client_notes") || undefined,
    notes: formData.get("notes") || undefined,
    line_items: parseLineItems(formData),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const invoice = await createInvoice({
    user_id: parsed.data.user_id,
    created_by_id: session!.user!.id,
    currency: parsed.data.currency,
    tax_rate: parsed.data.tax_rate,
    issue_date: new Date(parsed.data.issue_date),
    due_date: new Date(parsed.data.due_date),
    client_notes: parsed.data.client_notes ?? null,
    notes: parsed.data.notes ?? null,
    line_items: parsed.data.line_items,
  });

  redirect(`/admin/invoices/${invoice.id}`);
}

export async function updateInvoiceAction(
  invoiceId: string,
  _prev: InvoiceActionState,
  formData: FormData,
): Promise<InvoiceActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const parsed = invoiceFormSchema.safeParse({
    user_id: formData.get("user_id"),
    currency: formData.get("currency") || "USD",
    tax_rate: formData.get("tax_rate") || 0,
    issue_date: formData.get("issue_date"),
    due_date: formData.get("due_date"),
    client_notes: formData.get("client_notes") || undefined,
    notes: formData.get("notes") || undefined,
    line_items: parseLineItems(formData),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  try {
    await updateInvoice(
      invoiceId,
      {
        currency: parsed.data.currency,
        tax_rate: parsed.data.tax_rate,
        issue_date: new Date(parsed.data.issue_date),
        due_date: new Date(parsed.data.due_date),
        client_notes: parsed.data.client_notes ?? null,
        notes: parsed.data.notes ?? null,
        line_items: parsed.data.line_items,
      },
      session!.user!.id,
    );
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Could not update invoice",
    };
  }

  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath("/admin/invoices");
  return { success: "Invoice updated." };
}

export async function sendInvoiceAction(
  invoiceId: string,
): Promise<InvoiceActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const invoice = await getInvoiceById(invoiceId, { client: true });
  if (!invoice) return { error: "Invoice not found" };
  if (invoice.status === "paid" || invoice.status === "cancelled") {
    return { error: "Cannot send a paid or cancelled invoice" };
  }

  const client = (invoice as { client?: { name: string; email: string } }).client;
  if (!client) return { error: "Client not found" };

  const { token, expiresAt } = createPayToken();
  const payUrl = `${env.NEXT_PUBLIC_SITE_URL}/pay/${token}`;
  const portalUrl = `${env.NEXT_PUBLIC_SITE_URL}/portal/invoices/${invoiceId}`;

  try {
    await sendInvoiceEmail({
      invoiceNumber: invoice.invoice_number,
      total: formatCurrency(Number(invoice.total), invoice.currency),
      dueDate: formatDate(invoice.due_date),
      clientName: client.name,
      clientEmail: client.email,
      payUrl,
      portalUrl,
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Could not send invoice email. Check SMTP settings and try again.",
    };
  }

  await updateInvoiceStatus(invoiceId, "sent", {
    changed_by_id: session!.user!.id,
    note: "Invoice sent to client",
    pay_token: token,
    pay_token_expires_at: expiresAt,
    sent_at: new Date(),
  });

  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath("/admin/invoices");
  return { success: "Invoice sent." };
}

export async function cancelInvoiceAction(
  invoiceId: string,
): Promise<InvoiceActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const invoice = await getInvoiceById(invoiceId);
  if (!invoice) return { error: "Invoice not found" };
  if (invoice.status === "paid") {
    return { error: "Cannot cancel a paid invoice" };
  }

  await updateInvoiceStatus(invoiceId, "cancelled", {
    changed_by_id: session!.user!.id,
    note: "Invoice voided by admin",
  });

  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath("/admin/invoices");
  return { success: "Invoice cancelled." };
}

export async function deleteInvoiceAction(
  invoiceId: string,
): Promise<InvoiceActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const invoice = await getInvoiceById(invoiceId);
  if (!invoice) return { error: "Invoice not found" };

  try {
    await deleteInvoice(invoiceId);
  } catch {
    return { error: "Could not delete this invoice." };
  }

  revalidatePath("/admin/invoices");
  revalidatePath("/admin");
  return { success: "Invoice deleted." };
}

export async function markInvoicePaidAction(
  invoiceId: string,
  _prev: InvoiceActionState,
  formData: FormData,
): Promise<InvoiceActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const parsed = manualPaidSchema.safeParse({
    note: formData.get("note"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid note" };
  }

  const invoice = await getInvoiceById(invoiceId);
  if (!invoice) return { error: "Invoice not found" };

  await updateInvoiceStatus(invoiceId, "paid", {
    changed_by_id: session!.user!.id,
    note: `Marked paid manually: ${parsed.data.note}`,
    paid_at: new Date(),
    amount_paid: Number(invoice.total),
  });

  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath("/admin/invoices");
  return { success: "Invoice marked as paid." };
}

export async function resendInvoiceAction(
  invoiceId: string,
): Promise<InvoiceActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const invoice = await getInvoiceById(invoiceId, { client: true });
  if (!invoice) return { error: "Invoice not found" };

  const client = (invoice as { client?: { name: string; email: string } }).client;
  if (!client) return { error: "Client not found" };

  let payToken = invoice.pay_token;
  let expiresAt = invoice.pay_token_expires_at;
  if (!payToken || !expiresAt || expiresAt < new Date()) {
    const created = createPayToken();
    payToken = created.token;
    expiresAt = created.expiresAt;
    await updateInvoiceStatus(invoiceId, invoice.status, {
      changed_by_id: session!.user!.id,
      note: "Pay link refreshed",
      pay_token: payToken,
      pay_token_expires_at: expiresAt,
    });
  }

  const payUrl = `${env.NEXT_PUBLIC_SITE_URL}/pay/${payToken}`;
  const portalUrl = `${env.NEXT_PUBLIC_SITE_URL}/portal/invoices/${invoiceId}`;

  await sendInvoiceEmail({
    invoiceNumber: invoice.invoice_number,
    total: formatCurrency(Number(invoice.total), invoice.currency),
    dueDate: formatDate(invoice.due_date),
    clientName: client.name,
    clientEmail: client.email,
    payUrl,
    portalUrl,
  });

  return { success: "Invoice email resent." };
}

export async function sendReminderAction(
  invoiceId: string,
): Promise<InvoiceActionState> {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return { error: "Unauthorized" };
  }

  const invoice = await getInvoiceById(invoiceId, { client: true });
  if (!invoice) return { error: "Invoice not found" };
  if (!invoice.pay_token) {
    return { error: "Invoice has not been sent yet" };
  }

  const client = (invoice as { client?: { name: string; email: string } }).client;
  if (!client) return { error: "Client not found" };

  const payUrl = `${env.NEXT_PUBLIC_SITE_URL}/pay/${invoice.pay_token}`;

  await sendInvoiceReminder({
    invoiceNumber: invoice.invoice_number,
    total: formatCurrency(Number(invoice.total), invoice.currency),
    dueDate: formatDate(invoice.due_date),
    clientName: client.name,
    clientEmail: client.email,
    payUrl,
  });

  await prisma.invoices.update({
    where: { id: invoiceId },
    data: { last_reminder_at: new Date() },
  });

  return { success: "Reminder sent." };
}

export async function getAdminInvoiceList() {
  const session = await auth();
  if (!isAdmin(session?.user)) return [];

  const invoices = await listAllInvoices();
  const clients = await listClients();
  const clientMap = new Map(clients.map((c) => [c.id, c]));

  return invoices.map((invoice) => {
    const client = clientMap.get(invoice.user_id);
    return {
      id: invoice.id,
      invoice_number: invoice.invoice_number,
      status: invoice.status,
      currency: invoice.currency,
      total: Number(invoice.total),
      due_date: invoice.due_date,
      paid_at: invoice.paid_at,
      client: client ? { name: client.name } : null,
    };
  });
}

export async function getAdminClientsForSelect() {
  const session = await auth();
  if (!isAdmin(session?.user)) return [];
  return listClients();
}

export async function getInvoiceForAdmin(id: string) {
  const session = await auth();
  if (!isAdmin(session?.user)) return null;

  const invoice = await getInvoiceById(id, {
    client: true,
    status_history: { orderBy: { created_at: "desc" }, take: 10 },
    payments: { orderBy: { created_at: "desc" } },
  });

  return invoice;
}

export async function getClientForInvoice(userId: string) {
  return findUserById(userId);
}
