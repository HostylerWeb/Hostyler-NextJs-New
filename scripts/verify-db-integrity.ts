import { prisma } from "../src/lib/db";

type CheckResult = { name: string; ok: boolean; detail?: string };

const results: CheckResult[] = [];

function pass(name: string) {
  results.push({ name, ok: true });
  console.log(`✓ ${name}`);
}

function fail(name: string, detail: string) {
  results.push({ name, ok: false, detail });
  console.error(`✗ ${name}: ${detail}`);
}

async function main() {
  console.log("Database integrity check\n");

  await prisma.$connect();
  pass("Database connection");

  const tables = [
    "users",
    "invoices",
    "invoice_line_items",
    "payments",
    "support_tickets",
    "support_messages",
    "case_studies",
  ] as const;

  for (const table of tables) {
    try {
      const count = await (prisma[table] as { count: () => Promise<number> }).count();
      pass(`Table ${table} accessible (${count} rows)`);
    } catch (error) {
      fail(`Table ${table}`, error instanceof Error ? error.message : "unknown");
    }
  }

  const invoices = await prisma.invoices.findMany({
    include: { line_items: true, payments: true },
  });

  for (const invoice of invoices) {
    const subtotal = invoice.line_items.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );
    const expectedTax =
      Math.round(subtotal * (Number(invoice.tax_rate) / 100) * 100) / 100;
    const expectedTotal = Math.round((subtotal + expectedTax) * 100) / 100;

    if (Math.abs(Number(invoice.subtotal) - subtotal) > 0.01) {
      fail(
        `Invoice ${invoice.invoice_number} subtotal`,
        `expected ${subtotal}, got ${invoice.subtotal}`,
      );
    }
    if (Math.abs(Number(invoice.tax_amount) - expectedTax) > 0.01) {
      fail(
        `Invoice ${invoice.invoice_number} tax`,
        `expected ${expectedTax}, got ${invoice.tax_amount}`,
      );
    }
    if (Math.abs(Number(invoice.total) - expectedTotal) > 0.01) {
      fail(
        `Invoice ${invoice.invoice_number} total`,
        `expected ${expectedTotal}, got ${invoice.total}`,
      );
    }

    for (const item of invoice.line_items) {
      const expected =
        Math.round(Number(item.quantity) * Number(item.unit_price) * 100) / 100;
      if (Math.abs(Number(item.amount) - expected) > 0.01) {
        fail(
          `Line item ${item.id}`,
          `amount ${item.amount} != ${expected}`,
        );
      }
    }

    if (invoice.line_items.length === 0) {
      fail(`Invoice ${invoice.invoice_number}`, "has no line items");
    }

    const paidTotal = invoice.payments
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + Number(p.amount), 0);
    if (paidTotal > Number(invoice.total) + 0.01) {
      fail(
        `Invoice ${invoice.invoice_number}`,
        `payments (${paidTotal}) exceed total (${invoice.total})`,
      );
    }
  }
  pass(`Invoice totals verified (${invoices.length} invoices)`);

  const duplicateNumbers = await prisma.$queryRaw<
    Array<{ invoice_number: string; count: bigint }>
  >`
    SELECT invoice_number, COUNT(*) as count
    FROM invoices
    GROUP BY invoice_number
    HAVING COUNT(*) > 1
  `;
  if (duplicateNumbers.length > 0) {
    fail("Invoice numbers", "duplicate invoice_number values found");
  } else {
    pass("Invoice numbers unique");
  }

  const orphanLineItems = await prisma.$queryRaw<[{ count: bigint }]>`
    SELECT COUNT(*) as count
    FROM invoice_line_items li
    LEFT JOIN invoices i ON li.invoice_id = i.id
    WHERE i.id IS NULL
  `;
  const orphanCount = Number(orphanLineItems[0]?.count ?? 0);
  if (orphanCount > 0) {
    fail("Orphan line items", `${orphanCount} found`);
  } else {
    pass("No orphan invoice line items");
  }

  const tickets = await prisma.support_tickets.findMany({
    include: { _count: { select: { messages: true } } },
  });
  for (const ticket of tickets) {
    if (ticket._count.messages === 0) {
      fail(`Ticket ${ticket.ticket_number}`, "has no messages");
    }
  }
  pass(`Support tickets have messages (${tickets.length} tickets)`);

  const usersWithoutPassword = await prisma.users.count({
    where: { password_hash: "" },
  });
  if (usersWithoutPassword > 0) {
    fail("Users", `${usersWithoutPassword} users missing password_hash`);
  } else {
    pass("All users have password hashes");
  }

  const failed = results.filter((r) => !r.ok);
  console.log(
    `\n${failed.length === 0 ? "All integrity checks passed." : `${failed.length} check(s) failed.`}`,
  );

  if (failed.length > 0) {
    process.exit(1);
  }
}

main()
  .catch((error) => {
    console.error("Integrity check failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
