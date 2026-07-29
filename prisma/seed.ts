import { randomBytes } from "node:crypto";
import bcrypt from "bcrypt";
import { prisma } from "../src/lib/db";
import { upsertCaseStudy } from "../src/lib/repositories/case-studies";
import { createInvoice } from "../src/lib/repositories/invoices";
import { upsertUserByEmail } from "../src/lib/repositories/users";
import { createSupportTicket } from "../src/lib/repositories/support";

const BCRYPT_ROUNDS = 12;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

async function seedUsers() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "support@hostyler.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Abbasisgreat123@";
  const clientEmail = process.env.SEED_CLIENT_EMAIL ?? "client@example.com";
  const clientPassword =
    process.env.SEED_CLIENT_PASSWORD ?? "ChangeMeClient123!";

  const admin = await upsertUserByEmail(adminEmail, {
    password_hash: await hashPassword(adminPassword),
    name: "Hostyler Admin",
    role: "admin",
    email_verified_at: new Date(),
  });

  if (adminEmail.toLowerCase() !== "admin@hostyler.dev") {
    await prisma.users.updateMany({
      where: { email: "admin@hostyler.dev", role: "admin" },
      data: { is_active: false },
    });
  }

  const client = await upsertUserByEmail(clientEmail, {
    password_hash: await hashPassword(clientPassword),
    name: "Jordan Reyes",
    company: "Northstar Finance",
    role: "client",
    email_verified_at: new Date(),
  });

  return { admin, client };
}

async function seedCaseStudies() {
  const studies = [
    {
      slug: "northstar",
      title: "Northstar Finance",
      client_name: "Northstar Finance",
      excerpt:
        "Rebuilt a legacy dashboard into a real-time analytics platform.",
      body: "Northstar's reporting tool was a legacy dashboard that analysts avoided. We rebuilt it as a real-time analytics platform with AI-generated summaries on top of their existing data warehouse.",
      cover_image_url:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      tags: ["Web", "AI"],
      stats: [
        { metric: "6 weeks", label: "to first launch" },
        { metric: "0", label: "data migrations" },
      ],
      featured: true,
      sort_order: 1,
      published: true,
      published_at: new Date("2025-11-01"),
    },
    {
      slug: "loop-health",
      title: "Loop Health",
      client_name: "Loop Health",
      excerpt:
        "Cross-platform care app connecting patients with clinicians.",
      body: "Patient-clinician app shipped on iOS, Android, and web in 8 weeks with offline-first sync and HIPAA-aware architecture.",
      cover_image_url:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      tags: ["App", "HealthTech"],
      stats: [{ metric: "8 weeks", label: "to ship" }],
      featured: false,
      sort_order: 2,
      published: true,
      published_at: new Date("2025-09-15"),
    },
    {
      slug: "fieldnote",
      title: "Fieldnote",
      client_name: "Fieldnote",
      excerpt:
        "AI-powered field reporting that turns voice notes into reports.",
      body: "Voice-to-report AI that cut field reporting time by 62% with guardrails and human review loops.",
      cover_image_url:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
      tags: ["AI", "Automation"],
      stats: [{ metric: "62%", label: "faster reporting" }],
      featured: false,
      sort_order: 3,
      published: true,
      published_at: new Date("2025-08-01"),
    },
    {
      slug: "currency-co",
      title: "Currency Co.",
      client_name: "Currency Co.",
      excerpt: "Headless storefront rebuild that cut load times by 68%.",
      body: "Headless commerce rebuild with Next.js and a modern CDN pipeline for global buyers.",
      cover_image_url:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      tags: ["Web", "Performance"],
      stats: [{ metric: "68%", label: "faster loads" }],
      featured: false,
      sort_order: 4,
      published: true,
      published_at: new Date("2025-06-01"),
    },
  ];

  for (const study of studies) {
    await upsertCaseStudy(study.slug, study);
  }
}

async function seedInvoices(
  adminId: string,
  clientId: string,
) {
  const existingDraft = await prisma.invoices.findUnique({
    where: { invoice_number: "INV-2026-0001" },
  });

  if (!existingDraft) {
    await createInvoice({
      user_id: clientId,
      created_by_id: adminId,
      issue_date: new Date("2026-07-01"),
      due_date: new Date("2026-07-15"),
      client_notes: "Thank you for partnering with Hostyler.",
      line_items: [
        {
          description: "Discovery & technical architecture",
          quantity: 1,
          unit_price: 4500,
        },
        {
          description: "Design system + UI implementation",
          quantity: 1,
          unit_price: 8500,
        },
      ],
      tax_rate: 0,
    });
  }

  const existingPaid = await prisma.invoices.findUnique({
    where: { invoice_number: "INV-2026-0002" },
  });

  if (!existingPaid) {
    const paid = await createInvoice({
      user_id: clientId,
      created_by_id: adminId,
      issue_date: new Date("2026-05-01"),
      due_date: new Date("2026-05-15"),
      line_items: [
        {
          description: "MVP web platform build",
          quantity: 1,
          unit_price: 18000,
        },
      ],
    });

    await prisma.invoices.update({
      where: { id: paid.id },
      data: {
        invoice_number: "INV-2026-0002",
        status: "paid",
        amount_paid: paid.total,
        paid_at: new Date("2026-05-10"),
        sent_at: new Date("2026-05-01"),
        pay_token: randomBytes(24).toString("hex"),
        pay_token_expires_at: new Date("2026-12-31"),
      },
    });

    await prisma.payments.create({
      data: {
        invoice_id: paid.id,
        user_id: clientId,
        provider_order_id: `SEED-PAYPAL-${paid.id.slice(0, 8)}`,
        provider_capture_id: `SEED-CAPTURE-${paid.id.slice(0, 8)}`,
        status: "completed",
        amount: paid.total,
        currency: "USD",
        payer_email: process.env.SEED_CLIENT_EMAIL ?? "client@example.com",
      },
    });
  }
}

async function seedSupport(clientId: string, adminId: string) {
  const existing = await prisma.support_tickets.findUnique({
    where: { ticket_number: "SUP-2026-0001" },
  });

  if (existing) return;

  const ticket = await createSupportTicket({
    user_id: clientId,
    subject: "API webhook timing on staging",
    body: "We're seeing delayed webhook callbacks on our staging environment after the last deploy. Can you help us trace whether this is on our side or the integration layer?",
    category: "technical",
    priority: "normal",
  });

  await prisma.support_tickets.update({
    where: { id: ticket.id },
    data: { ticket_number: "SUP-2026-0001", assigned_to_id: adminId },
  });

  await prisma.support_messages.create({
    data: {
      ticket_id: ticket.id,
      author_id: adminId,
      body: "Thanks for the detail — we're checking logs on our side and will follow up within one business day.",
      is_internal: false,
    },
  });
}

async function main() {
  console.log("Seeding Hostyler database...");

  const { admin, client } = await seedUsers();
  console.log(`  Users: admin=${admin.email}, client=${client.email}`);

  await seedCaseStudies();
  console.log("  Case studies: 4 upserted");

  await seedInvoices(admin.id, client.id);
  console.log("  Invoices: draft + paid sample");

  await seedSupport(client.id, admin.id);
  console.log("  Support: 1 ticket with reply");

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
