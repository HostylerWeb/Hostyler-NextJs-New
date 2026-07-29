import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import { prisma } from "@/lib/db";
import { generateInvoiceNumber } from "@/lib/repositories/invoices";

describe("database integration", () => {
  after(async () => {
    await prisma.$disconnect();
  });

  it("connects to postgres", async () => {
    const result = await prisma.$queryRaw<[{ ok: number }]>`SELECT 1 as ok`;
    assert.equal(result[0]?.ok, 1);
  });

  it("generates sequential invoice numbers per year", async () => {
    const number = await generateInvoiceNumber(new Date("2026-12-01"));
    assert.match(number, /^INV-2026-\d{4}$/);
  });

  it("has seed admin and client users", async () => {
    const admin = await prisma.users.findFirst({ where: { role: "admin" } });
    const client = await prisma.users.findFirst({ where: { role: "client" } });
    assert.ok(admin);
    assert.ok(client);
    assert.ok(admin.email_verified_at);
    assert.ok(client.email_verified_at);
  });
});
