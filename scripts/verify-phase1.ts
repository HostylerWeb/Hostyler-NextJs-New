import { verifyDatabaseConnection, prisma } from "../src/lib/db";
import {
  isAdmin,
  isClient,
  canViewInvoice,
  canPayInvoice,
  canViewTicket,
} from "../src/lib/permissions";
import { listPublishedCaseStudies } from "../src/lib/repositories/case-studies";
import { listAllInvoices } from "../src/lib/repositories/invoices";

async function main() {
  console.log("Phase 1 verification\n");

  await verifyDatabaseConnection();
  console.log("✓ Database connection");

  const counts = await Promise.all([
    prisma.users.count(),
    prisma.case_studies.count(),
    prisma.invoices.count(),
    prisma.payments.count(),
    prisma.support_tickets.count(),
    prisma.support_messages.count(),
    prisma.contact_submissions.count(),
  ]);

  const labels = [
    "users",
    "case_studies",
    "invoices",
    "payments",
    "support_tickets",
    "support_messages",
    "contact_submissions",
  ];

  labels.forEach((label, i) => {
    console.log(`✓ Table ${label}: ${counts[i]} rows`);
  });

  const admin = await prisma.users.findFirst({
    where: { role: "admin", is_active: true },
  });
  const client = await prisma.users.findFirst({
    where: { role: "client", is_active: true },
  });
  const invoice = await prisma.invoices.findFirst();

  if (!admin || !client || !invoice) {
    throw new Error("Seed data missing — run pnpm db:seed");
  }

  if (!isAdmin(admin) || !isClient(client)) {
    throw new Error("Permission role checks failed");
  }
  console.log("✓ Permissions: role helpers");

  if (!canViewInvoice(client, invoice)) {
    throw new Error("Client should view own invoice");
  }
  if (!canViewInvoice(admin, invoice)) {
    throw new Error("Admin should view any invoice");
  }
  if (!canPayInvoice(client, { ...invoice, status: "sent" })) {
    throw new Error("Client should pay open invoice");
  }
  console.log("✓ Permissions: invoice access");

  const ticket = await prisma.support_tickets.findFirstOrThrow();
  if (!canViewTicket(client, ticket)) {
    throw new Error("Client should view own ticket");
  }
  console.log("✓ Permissions: ticket access");

  const published = await listPublishedCaseStudies();
  if (published.length < 4) {
    throw new Error(`Expected 4 case studies, got ${published.length}`);
  }
  console.log("✓ Repository: case-studies.listPublishedCaseStudies");

  const invoices = await listAllInvoices();
  if (invoices.length < 2) {
    throw new Error(`Expected 2 invoices, got ${invoices.length}`);
  }
  console.log("✓ Repository: invoices.listAllInvoices");

  console.log("\nPhase 1 verification passed.");
}

main()
  .catch((error) => {
    console.error("\nPhase 1 verification failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
