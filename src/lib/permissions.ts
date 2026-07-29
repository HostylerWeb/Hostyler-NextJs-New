import type {
  invoices,
  support_tickets,
  user_role,
  users,
} from "@/generated/prisma/client";

type AuthUser = Pick<users, "id" | "role"> & { is_active?: boolean };

export function isAdmin(user: AuthUser | null | undefined): boolean {
  if (!user) return false;
  if (user.is_active === false) return false;
  return user.role === "admin";
}

export function isClient(user: AuthUser | null | undefined): boolean {
  if (!user) return false;
  if (user.is_active === false) return false;
  return user.role === "client";
}

export function canViewInvoice(
  user: AuthUser | null | undefined,
  invoice: Pick<invoices, "user_id">,
): boolean {
  if (!user) return false;
  if (user.is_active === false) return false;
  if (isAdmin(user)) return true;
  return isClient(user) && invoice.user_id === user.id;
}

export function canPayInvoice(
  user: AuthUser | null | undefined,
  invoice: Pick<invoices, "user_id" | "status">,
  options?: { validPayToken?: boolean },
): boolean {
  if (invoice.status === "paid" || invoice.status === "cancelled") {
    return false;
  }
  if (options?.validPayToken) return true;
  return canViewInvoice(user, invoice);
}

export function canViewTicket(
  user: AuthUser | null | undefined,
  ticket: Pick<support_tickets, "user_id">,
): boolean {
  if (!user) return false;
  if (user.is_active === false) return false;
  if (isAdmin(user)) return true;
  return isClient(user) && ticket.user_id === user.id;
}

export function canReplyTicket(
  user: AuthUser | null | undefined,
  ticket: Pick<support_tickets, "user_id">,
  isInternal: boolean,
): boolean {
  if (!user) return false;
  if (user.is_active === false) return false;
  if (isInternal) return isAdmin(user);
  if (isAdmin(user)) return true;
  return isClient(user) && ticket.user_id === user.id;
}

export function hasRole(
  user: AuthUser | null | undefined,
  role: user_role,
): boolean {
  if (!user) return false;
  if (user.is_active === false) return false;
  return user.role === role;
}
