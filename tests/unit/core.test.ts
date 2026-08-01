import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { contactFormSchema } from "@/lib/validators/contact";
import { invoiceFormSchema } from "@/lib/validators/invoice";
import {
  canPayInvoice,
  canViewInvoice,
  canViewTicket,
  isAdmin,
  isClient,
} from "@/lib/permissions";
import {
  calculateLineAmount,
  calculateTotals,
} from "@/lib/repositories/invoices";
import { createPayToken } from "@/lib/invoice-tokens";
import {
  amountsMatch,
  currenciesMatch,
  getAmountDue,
  validateCaptureAmount,
} from "@/lib/paypal-amounts";

describe("contactFormSchema", () => {
  it("accepts valid contact data", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      project_type: "web",
      budget: "web_from_3500",
      message: "Hello",
      website: "",
    });
    assert.equal(result.success, true);
  });

  it("rejects honeypot", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      project_type: "web",
      budget: "web_from_3500",
      website: "spam",
    });
    assert.equal(result.success, false);
  });
});

describe("invoiceFormSchema", () => {
  it("requires at least one line item", () => {
    const result = invoiceFormSchema.safeParse({
      user_id: "00000000-0000-0000-0000-000000000001",
      issue_date: "2026-07-01",
      due_date: "2026-07-15",
      line_items: [],
    });
    assert.equal(result.success, false);
  });
});

describe("calculateTotals", () => {
  it("sums line items and applies tax", () => {
    const totals = calculateTotals(
      [
        { description: "A", quantity: 2, unit_price: 50 },
        { description: "B", quantity: 1, unit_price: 100 },
      ],
      10,
    );
    assert.equal(totals.subtotal, 200);
    assert.equal(totals.tax_amount, 20);
    assert.equal(totals.total, 220);
  });

  it("rounds line amounts to cents", () => {
    assert.equal(calculateLineAmount(3, 33.33), 99.99);
  });
});

describe("permissions", () => {
  const admin = { id: "a1", role: "admin" as const };
  const client = { id: "c1", role: "client" as const };
  const invoice = { user_id: "c1", status: "sent" as const };

  it("identifies roles", () => {
    assert.equal(isAdmin(admin), true);
    assert.equal(isClient(client), true);
    assert.equal(isAdmin(client), false);
  });

  it("scopes invoice access", () => {
    assert.equal(canViewInvoice(client, invoice), true);
    assert.equal(canViewInvoice(admin, invoice), true);
    assert.equal(canViewInvoice({ ...client, id: "other" }, invoice), false);
  });

  it("blocks payment on paid invoices", () => {
    assert.equal(
      canPayInvoice(client, { ...invoice, status: "paid" }),
      false,
    );
    assert.equal(canPayInvoice(client, invoice), true);
    assert.equal(
      canPayInvoice(null, invoice, { validPayToken: true }),
      true,
    );
  });

  it("scopes ticket access", () => {
    const ticket = { user_id: "c1" };
    assert.equal(canViewTicket(client, ticket), true);
    assert.equal(canViewTicket(admin, ticket), true);
    assert.equal(canViewTicket({ ...client, id: "x" }, ticket), false);
  });
});

describe("createPayToken", () => {
  it("returns hex token expiring in the future", () => {
    const { token, expiresAt } = createPayToken();
    assert.match(token, /^[a-f0-9]{64}$/);
    assert.ok(expiresAt > new Date());
  });
});

describe("paypal amounts", () => {
  it("calculates amount due from invoice totals", () => {
    assert.equal(getAmountDue(220, 50), 170);
    assert.equal(getAmountDue(100, 100), 0);
  });

  it("matches amounts within tolerance", () => {
    assert.equal(amountsMatch(99.99, 100, 0.01), true);
    assert.equal(amountsMatch(99.97, 100, 0.01), false);
  });

  it("matches currencies case-insensitively", () => {
    assert.equal(currenciesMatch("usd", "USD"), true);
    assert.equal(currenciesMatch("USD", "EUR"), false);
  });

  it("validates capture amounts", () => {
    const valid = validateCaptureAmount(
      { value: "170.00", currency_code: "USD" },
      170,
      "USD",
    );
    assert.equal(valid.ok, true);

    const mismatch = validateCaptureAmount(
      { value: "50.00", currency_code: "USD" },
      170,
      "USD",
    );
    assert.equal(mismatch.ok, false);
    if (!mismatch.ok) {
      assert.equal(mismatch.reason, "Capture amount mismatch");
    }
  });
});
