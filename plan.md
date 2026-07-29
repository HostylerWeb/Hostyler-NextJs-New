# Hostyler — Full Build Plan (Frontend + Backend)

> **Stack:** Next.js (App Router) · PostgreSQL · Prisma · Auth.js · PayPal · SMTP (Nodemailer) · No Redis (v1)  
> **Source of truth for design/content:** `hostyler-1.html` (prototype)  
> **Last updated:** 2026-07-29

Use this document as the master checklist. Check boxes as you complete items. Do not skip **Phase 0** (foundation) — everything else depends on it.

---

## Progress overview

| Phase | Name | Status |
|-------|------|--------|
| 0 | Foundation & project setup | ✅ Complete |
| 1 | Database & data layer | ✅ Complete |
| 2 | Design system & shared UI | ✅ Complete |
| 3 | Marketing pages (frontend) | ✅ Complete |
| 4 | Backend & contact flow | ✅ Complete |
| 5 | Authentication & user accounts | ✅ Complete |
| 6 | Invoicing & PayPal payments | ✅ Complete |
| 7 | Client portal & technical support | ✅ Complete |
| 8 | SEO, performance & accessibility | ✅ Complete |
| 9 | Testing & QA | ✅ Complete (local) |
| 10 | Deployment & production | ✅ Local setup (no VPS/domain) |
| 11 | Post-launch & optional v2 | ✅ v1 docs + legal pages |

---

## Architecture decisions (locked for v1)

- [ ] **Monorepo:** Single Next.js app (frontend + API in one project)
- [ ] **Database:** PostgreSQL (not MySQL)
- [ ] **ORM:** Prisma
- [ ] **Auth:** Auth.js v5 (NextAuth) — credentials + email verification; session in DB (no Redis)
- [ ] **Payments:** PayPal Checkout / Orders API (sandbox + live)
- [ ] **Email:** SMTP only via Nodemailer for all transactional mail (invoices, support, contact — no Resend/SendGrid)
- [ ] **Cache/queue:** No Redis in v1 (PayPal webhooks + DB polling sufficient at launch scale)
- [ ] **Roles:** `client` (customers), `admin` (Hostyler staff)
- [ ] **Hosting:** TBD (Vercel + managed Postgres, or VPS + Docker — decide in Phase 10)

### Application areas

| Area | Who | Purpose |
|------|-----|---------|
| **Marketing site** | Public | Homepage, work, contact |
| **Client portal** | Logged-in clients | Invoices, PayPal pay, support tickets |
| **Admin panel** | Hostyler staff | Manage invoices, users, tickets, case studies |

### URL structure (v1)

#### Public (marketing)

| Route | Type | Notes |
|-------|------|-------|
| `/` | Page | Homepage |
| `/work` | Page | Portfolio grid |
| `/work/[slug]` | Page | Case study |
| `/contact` | Page | Contact form |
| `/login` | Page | Client login |
| `/register` | Page | Client account creation |
| `/forgot-password` | Page | Password reset request |
| `/reset-password` | Page | Set new password (token) |
| `/pay/[token]` | Page | Public invoice pay link (no login required, token-gated) |
| `/api/contact` | API | POST contact form |
| `/api/health` | API | GET health check (protected) |

#### Client portal (`/portal/*` — auth required, role: client)

| Route | Type | Notes |
|-------|------|-------|
| `/portal` | Page | Dashboard overview |
| `/portal/invoices` | Page | List client's invoices |
| `/portal/invoices/[id]` | Page | Invoice detail + Pay with PayPal |
| `/portal/support` | Page | List support tickets |
| `/portal/support/new` | Page | Open new ticket |
| `/portal/support/[id]` | Page | Ticket thread + replies |
| `/portal/settings` | Page | Profile, password, notification prefs |

#### Admin (`/admin/*` — auth required, role: admin)

| Route | Type | Notes |
|-------|------|-------|
| `/admin` | Page | Admin dashboard |
| `/admin/invoices` | Page | All invoices — filter by status |
| `/admin/invoices/new` | Page | Create invoice |
| `/admin/invoices/[id]` | Page | Edit, send, mark paid, void |
| `/admin/clients` | Page | Client user list |
| `/admin/clients/[id]` | Page | Client detail + invoices + tickets |
| `/admin/support` | Page | All tickets — assign, reply |
| `/admin/support/[id]` | Page | Ticket detail |
| `/admin/contact-submissions` | Page | Contact form inbox (optional) |
| `/admin/case-studies` | Page | CRUD case studies (optional v1) |

#### API routes

| Route | Method | Notes |
|-------|--------|-------|
| `/api/auth/[...nextauth]` | * | Auth.js handlers |
| `/api/invoices/[id]/paypal/create-order` | POST | Create PayPal order for invoice |
| `/api/invoices/[id]/paypal/capture` | POST | Capture after client approval |
| `/api/webhooks/paypal` | POST | PayPal payment events → update invoice |
| `/api/support/[id]/messages` | POST | Add reply to ticket |
| `/api/admin/invoices` | GET, POST | Admin invoice CRUD |
| `/api/admin/invoices/[id]/send` | POST | Email invoice to client via SMTP |

**Stay on homepage (anchors) for v1:** Process, Why Us, Pricing, FAQ, Team, Testimonials, Services  
**Dedicated pages in v2 (optional):** `/services`, `/privacy`, `/terms`

---

## Phase 0 — Foundation & project setup

> **Completed:** 2026-07-29 — verify with `pnpm foundation:verify`

### 0.1 Repository & tooling

- [x] Create Git repository (if not already)
- [x] Add `.gitignore` (`.env`, `node_modules`, `.next`, `dist`, etc.)
- [x] Add `.env.example` with all required variables (no secrets)
- [x] Choose package manager (`pnpm` recommended; `npm` OK)
- [x] Initialize Next.js 15+ with App Router, TypeScript, ESLint, Tailwind CSS (or CSS Modules)
- [x] Configure `tsconfig.json` strict mode
- [x] Add path alias `@/` → `src/`
- [x] Add Prettier + format script
- [x] Add `README.md` with local dev instructions

### 0.2 Folder structure

```
hostyler/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── src/
│   ├── app/
│   │   ├── (marketing)/       # public site layout
│   │   ├── (auth)/            # login, register, reset
│   │   ├── portal/            # client area
│   │   ├── admin/             # staff area
│   │   ├── pay/[token]/       # public pay link
│   │   └── api/
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── portal/
│   │   ├── admin/
│   │   └── ui/
│   ├── lib/
│   │   ├── db.ts
│   │   ├── mail.ts
│   │   ├── auth.ts
│   │   ├── paypal.ts
│   │   ├── env.ts
│   │   ├── permissions.ts
│   │   ├── repositories/
│   │   └── validators/
│   ├── content/
│   └── styles/
├── plan.md
└── docs/hostyler-prototype.html
```

- [x] Create folder structure above
- [x] Archive `hostyler-1.html` to `/docs/hostyler-prototype.html`
- [x] Document folder conventions in README

### 0.3 Environment variables

- [x] Create `src/lib/env.ts` with Zod validation for env vars
- [x] Define and document all variables:

```env
# App
NEXT_PUBLIC_SITE_URL=https://hostyler.dev
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/hostyler

# Auth.js
AUTH_SECRET=                        # openssl rand -base64 32
AUTH_URL=https://hostyler.dev       # same as site URL in prod

# SMTP (all email — contact, invoices, support, auth)
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Hostyler <hello@hostyler.dev>"
SMTP_TO=hello@hostyler.dev

# PayPal
PAYPAL_MODE=sandbox                 # sandbox | live
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_WEBHOOK_ID=                  # from PayPal developer dashboard

# Optional
CONTACT_RATE_LIMIT_PER_HOUR=5
HEALTH_CHECK_SECRET=
INVOICE_PAY_TOKEN_SECRET=           # sign public pay links
INVOICE_DUE_DAYS_DEFAULT=14
```

- [x] Fail fast on boot if required env vars missing in production

### 0.4 Local development services

- [x] Install PostgreSQL locally (or Docker Compose)
- [x] Create `docker-compose.yml` for local Postgres only (no Redis)
- [x] Verify DB connection from Next.js (`GET /api/health`, `pnpm foundation:verify`)
- [ ] Create PayPal Sandbox app + sandbox business/personal test accounts *(manual — see `docs/paypal-sandbox.md`)*
- [x] Document `pnpm dev` + DB + PayPal sandbox in README

### 0.5 Middleware & route protection (scaffold)

- [x] Create `src/proxy.ts` — protect `/portal/*`, `/admin/*`
- [x] Redirect unauthenticated users to `/login?callbackUrl=...`
- [x] Redirect non-admin away from `/admin/*`
- [x] Redirect logged-in clients away from `/login` and `/register` to `/portal`

---

## Phase 1 — Database & data layer

> **Completed:** 2026-07-29 — migration `20260729103805_init`, verify with `pnpm db:verify`

### 1.1 Prisma setup

- [x] Install Prisma + `@prisma/client`
- [x] Run `prisma init`
- [x] Configure `schema.prisma` for PostgreSQL
- [x] Add `prisma generate` to postinstall script
- [x] Create `src/lib/db.ts` singleton

### 1.2 Schema — marketing & contact

#### `contact_submissions`

- [x] `id` (UUID, PK)
- [x] `name`, `email`, `project_type`, `budget`, `message`
- [x] `ip_address`, `user_agent`
- [x] `email_sent_at`, `email_error`
- [x] `created_at`, `updated_at`

#### `case_studies`

- [x] `id`, `slug` (unique), `title`, `client_name`, `excerpt`, `body`
- [x] `cover_image_url`, `tags` (JSON), `stats` (JSON)
- [x] `featured`, `sort_order`, `published`, `published_at`
- [x] `created_at`, `updated_at`

#### `testimonials`, `team_members`, `faq_items`

- [x] Static in `src/content/` for v1 (decision: no DB models in v1)

### 1.3 Schema — authentication & users

#### `users`

- [x] `id` (UUID, PK)
- [x] `email` (varchar, unique, not null)
- [x] `email_verified_at` (timestamptz, nullable)
- [x] `password_hash` (varchar, not null) — bcrypt
- [x] `name` (varchar, not null)
- [x] `company` (varchar, nullable)
- [x] `phone` (varchar, nullable)
- [x] `role` (enum: `client`, `admin`) — default `client`
- [x] `is_active` (boolean, default true)
- [x] `created_at`, `updated_at`
- [x] `last_login_at` (timestamptz, nullable)

#### `accounts` (Auth.js adapter — if using Prisma adapter)

- [x] OAuth provider fields (optional for v1 — credentials only OK)
- [x] Link to `users`

#### `sessions` (Auth.js)

- [x] `session_token`, `user_id`, `expires`

#### `verification_tokens` (Auth.js — email verify + password reset)

- [x] `identifier`, `token`, `expires`

#### `password_reset_tokens`

- [x] `id`, `user_id`, `token_hash`, `expires_at`, `used_at`
- [x] Dedicated table added (in addition to `verification_tokens` for Auth.js)

### 1.4 Schema — invoicing

#### `invoices`

- [x] `id` (UUID, PK)
- [x] `invoice_number` (varchar, unique) — e.g. `INV-2026-0001`
- [x] `user_id` (FK → users) — client this invoice belongs to
- [x] `status` (enum):
  - [x] `draft` — not sent yet
  - [x] `sent` — emailed to client
  - [x] `viewed` — client opened pay/detail page
  - [x] `partially_paid` — optional if partial payments later
  - [x] `paid` — fully paid
  - [x] `overdue` — past due_date, unpaid
  - [x] `cancelled` — voided
- [x] `currency` (varchar, default `USD`)
- [x] `subtotal` (decimal 12,2)
- [x] `tax_rate` (decimal 5,2, default 0)
- [x] `tax_amount` (decimal 12,2)
- [x] `total` (decimal 12,2)
- [x] `amount_paid` (decimal 12,2, default 0)
- [x] `issue_date` (date)
- [x] `due_date` (date)
- [x] `paid_at` (timestamptz, nullable)
- [x] `notes` (text, nullable) — internal admin notes
- [x] `client_notes` (text, nullable) — shown on invoice PDF/page
- [x] `pay_token` (varchar, unique) — signed token for `/pay/[token]` without login
- [x] `pay_token_expires_at` (timestamptz, nullable)
- [x] `sent_at` (timestamptz, nullable)
- [x] `last_reminder_at` (timestamptz, nullable)
- [x] `created_by_id` (FK → users, admin who created)
- [x] `created_at`, `updated_at`

#### `invoice_line_items`

- [x] `id` (UUID, PK)
- [x] `invoice_id` (FK → invoices, cascade delete)
- [x] `description` (varchar, not null)
- [x] `quantity` (decimal 10,2, default 1)
- [x] `unit_price` (decimal 12,2)
- [x] `amount` (decimal 12,2) — quantity × unit_price
- [x] `sort_order` (int, default 0)

#### `invoice_status_history` (audit trail)

- [x] `id`, `invoice_id`, `from_status`, `to_status`
- [x] `changed_by_id` (FK users, nullable for system/webhook)
- [x] `note` (text, nullable)
- [x] `created_at`

### 1.5 Schema — payments (PayPal)

#### `payments`

- [x] `id` (UUID, PK)
- [x] `invoice_id` (FK → invoices)
- [x] `user_id` (FK → users, nullable)
- [x] `provider` (enum: `paypal`) — extensible later
- [x] `provider_order_id` (varchar) — PayPal order ID
- [x] `provider_capture_id` (varchar, nullable) — PayPal capture ID
- [x] `status` (enum: `pending`, `completed`, `failed`, `refunded`)
- [x] `amount` (decimal 12,2)
- [x] `currency` (varchar)
- [x] `payer_email` (varchar, nullable)
- [x] `raw_response` (JSON, nullable) — store PayPal payload for debugging
- [x] `created_at`, `updated_at`

- [x] Unique constraint on `provider_order_id`
- [x] Index on `invoice_id`, `status`

### 1.6 Schema — technical support

#### `support_tickets`

- [x] `id` (UUID, PK)
- [x] `ticket_number` (varchar, unique) — e.g. `SUP-2026-0042`
- [x] `user_id` (FK → users) — client who opened ticket
- [x] `assigned_to_id` (FK → users, nullable) — admin assignee
- [x] `subject` (varchar, not null)
- [x] `status` (enum: `open`, `waiting_on_client`, `waiting_on_staff`, `resolved`, `closed`)
- [x] `priority` (enum: `low`, `normal`, `high`, `urgent`) — default `normal`
- [x] `category` (enum: `billing`, `technical`, `project`, `other`)
- [x] `last_reply_at` (timestamptz)
- [x] `last_reply_by` (enum: `client`, `staff`)
- [x] `resolved_at` (timestamptz, nullable)
- [x] `created_at`, `updated_at`

#### `support_messages`

- [x] `id` (UUID, PK)
- [x] `ticket_id` (FK → support_tickets, cascade delete)
- [x] `author_id` (FK → users)
- [x] `body` (text, not null)
- [x] `is_internal` (boolean, default false) — staff-only notes, hidden from client
- [x] `created_at`, `updated_at`

#### `support_attachments` (optional v1.1)

- [ ] `id`, `message_id`, `file_name`, `file_url`, `mime_type`, `size_bytes`

### 1.7 Migrations & seed data

- [x] Run initial migration (all models)
- [x] Create `prisma/seed.ts`:
  - [x] 1 admin user (from env `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`)
  - [x] 1 demo client user
  - [x] 4 case studies from prototype
  - [x] 1 sample draft invoice + 1 paid invoice (sandbox testing)
  - [x] 1 sample support ticket with messages
- [x] Seed is idempotent
- [x] Add `pnpm db:seed` script

### 1.8 Data access layer (`src/lib/repositories/`)

- [x] `contact.ts`
- [x] `case-studies.ts`
- [x] `users.ts` — create client, find by email, update profile
- [x] `invoices.ts` — CRUD, list by user, list all (admin), update status, generate invoice number
- [x] `payments.ts` — create pending, mark completed/failed, link to invoice
- [x] `support.ts` — tickets + messages, list by user, list all (admin)
- [x] Use transactions: payment capture → update invoice → log status history
- [x] Never expose raw Prisma in components

### 1.9 Permissions (`src/lib/permissions.ts`)

- [x] `isAdmin(user)`, `isClient(user)`
- [x] `canViewInvoice(user, invoice)` — owner or admin
- [x] `canPayInvoice(user, invoice)` — owner or valid pay token
- [x] `canViewTicket(user, ticket)` — owner or admin
- [x] `canReplyTicket(user, ticket, internal)` — admin for internal notes

---

## Phase 2 — Design system & shared UI

> **Completed:** 2026-07-29 — verify with `pnpm design:verify` · preview at `/design-system`

### 2.1 Design tokens

- [x] CSS variables / Tailwind theme (paper, ink, violet, coral, lime, fonts, shadows)
- [x] `next/font` — Unbounded, Inter, Space Mono
- [x] Portal/admin: same brand, slightly tighter spacing for data tables

### 2.2 Base UI components (`src/components/ui/`)

- [x] `Button`, `EyebrowChip`, `Highlight`, `Card`, `Badge`, `Tag`
- [x] `Input`, `Select`, `Textarea`, `Field`, `Checkbox`, `Label`
- [x] `Table`, `TableRow`, `TableCell` — admin/portal lists
- [x] `StatusBadge` — invoice/ticket status colors
- [x] `EmptyState`, `LoadingSpinner`, `Alert` (success/error/info)
- [x] `SkipLink`, `ScrollProgress`, `BackToTop`
- [x] `Pagination` — invoice/ticket lists
- [x] `Dialog` / `Modal` — confirm void invoice, etc.

### 2.3 Layout components

#### Marketing (`src/components/layout/`)

- [x] `Header`, `NavMenu`, `MobileNav`, `Footer`, `Wrap`, `Section`, `SectionHead`

#### Portal (`src/components/portal/`)

- [x] `PortalShell` — sidebar or top nav: Dashboard, Invoices, Support, Settings
- [x] `PortalHeader` — user name, logout
- [x] Mobile-responsive portal nav

#### Admin (`src/components/admin/`)

- [x] `AdminShell` — sidebar: Dashboard, Invoices, Clients, Support, Case Studies
- [x] `AdminHeader` — breadcrumbs, quick actions
- [x] `DataTable` with filters (status, date range)

### 2.4 Client hooks & utilities

- [x] `useScrollSpy`, `useReveal`, `useMediaQuery`, `cn()`
- [x] `formatCurrency(amount, currency)`
- [x] `formatDate`, `formatDateTime`
- [x] `prefers-reduced-motion` respected

### 2.5 Static content files

- [x] `navigation.ts`, `services.ts`, `process.ts`, `why-us.ts`, `pricing.ts`
- [x] `faq.ts`, `testimonials.ts`, `team.ts`, `trust.ts`, `site.ts`

---

## Phase 3 — Marketing pages (frontend)

> **Completed:** 2026-07-29 — full homepage from prototype, `/work`, `/contact`

### 3.1 Root layout

- [x] Marketing metadata, OG, JSON-LD Organization
- [x] Header: add “Client login” link → `/login`
- [x] Footer: link to `/portal` or `/login`

### 3.2 Homepage — all sections

- [x] Hero, Marquee, Logos, Services, Process, Why Us, Work, Case study, AI, Pricing, Team, Testimonials, FAQ, Contact CTA
- [x] (Full checklist unchanged — see prototype sections)

### 3.3 Work pages

- [x] `/work`, `/work/[slug]` — DB-backed case studies

### 3.4 Contact page

- [x] `/contact` — contact form

### 3.5 Responsive polish

- [x] Mobile audit complete (no overflow, touch targets, etc.)

---

## Phase 4 — Backend & contact flow

> **Completed:** 2026-07-29 — `POST /api/contact`, Nodemailer mail layer, health check

### 4.1 Contact validation & API

- [x] Zod schema, `POST /api/contact`, rate limit, honeypot, DB save, SMTP notify + auto-reply

### 4.2 SMTP mail layer (`src/lib/mail.ts`)

- [x] `sendContactNotification`, `sendContactAutoReply`
- [x] Base HTML email template (Hostyler branded)
- [x] **Also used in Phases 5–7** for auth, invoices, support

### 4.3 Health check

- [x] `GET /api/health` — DB + SMTP verify

### 4.4 Email DNS

- [ ] SPF, DKIM, DMARC for production domain *(manual — see `docs/email-dns.md`)*

---

## Phase 5 — Authentication & user accounts

> **Completed:** 2026-07-29 — Auth.js v5 credentials, email verify required, password reset

### 5.1 Auth.js setup

- [x] Install `next-auth@5` (Auth.js) + `@auth/prisma-adapter`
- [x] Configure `src/lib/auth.ts` — Prisma adapter, JWT sessions (credentials provider requirement)
- [x] Credentials provider (email + password)
- [x] Session includes `user.id`, `user.role`, `user.email`, `user.name`
- [x] `src/app/api/auth/[...nextauth]/route.ts`

### 5.2 Password security

- [x] Hash with `bcrypt` (cost factor 12)
- [x] Min password rules: 8+ chars, letter + number (Zod)
- [x] Never log or return password hashes

### 5.3 Registration flow (`/register`)

- [x] Form: name, email, company (optional), password, confirm password
- [x] Validate email unique
- [x] Create user with role `client`, `is_active: true`
- [x] Send verification email via SMTP (link with token)
- [x] `/verify-email?token=...` — set `email_verified_at`
- [x] **Require email verify before login** (decision locked)

### 5.4 Login flow (`/login`)

- [x] Email + password form
- [x] Auth.js `signIn('credentials', ...)`
- [x] Redirect: clients → `/portal`, admins → `/admin`
- [x] `callbackUrl` support
- [x] Show error for invalid credentials (generic message)
- [x] Update `last_login_at`

### 5.5 Password reset

- [x] `/forgot-password` — email input, send reset link via SMTP
- [x] Token expires in 1 hour, single use
- [x] `/reset-password?token=...` — new password form
- [ ] Invalidate sessions on password change (optional)

### 5.6 Auth emails (SMTP templates)

- [x] `sendEmailVerification(user, token)`
- [x] `sendPasswordReset(user, token)`
- [x] `sendWelcomeEmail(user)` — after verify

### 5.7 Admin user bootstrap

- [x] Seed script creates first admin
- [x] Document: no public admin registration — admins created in DB or by existing admin
- [ ] `/admin/clients` — admin can invite/create client accounts (optional: send set-password email)

### 5.8 Auth UI pages

- [x] `/login` — match neo-brutalist design
- [x] `/register`
- [x] `/forgot-password`
- [x] `/reset-password`
- [x] `/verify-email`
- [x] All forms accessible, labeled, error states

### 5.9 Session & security

- [x] HTTP-only session cookies
- [x] CSRF protection (Auth.js built-in)
- [x] Rate limit login attempts (in-memory per email)
- [ ] Lock account after N failed attempts (optional v1.1)

---

## Phase 6 — Invoicing & PayPal payments ✅

### 6.1 PayPal setup

- [ ] Create PayPal Business account *(manual — production)*
- [ ] Developer dashboard: Sandbox + Live apps *(manual)*
- [ ] Store `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_WEBHOOK_ID` *(manual `.env`)*
- [x] Install `@paypal/react-paypal-js` + REST API via `fetch`
- [x] `src/lib/paypal.ts`:
  - [x] `getAccessToken()` — OAuth client credentials
  - [x] `createOrder(invoice)` — amount, currency, invoice ID in custom_id
  - [x] `captureOrder(orderId)`
  - [x] `verifyWebhookSignature(headers, body)` — required for production

### 6.2 Invoice number generation

- [x] Format: `INV-{YYYY}-{####}` — sequential per year
- [x] DB transaction to avoid duplicates
- [x] `generateInvoiceNumber()` in repository

### 6.3 Admin — create & manage invoices

#### Create invoice (`/admin/invoices/new`)

- [x] Select client (dropdown of `users` where role=client)
- [x] Add line items (description, qty, unit price) — dynamic rows
- [x] Auto-calculate subtotal, tax, total
- [x] Set issue date, due date (default +14 days)
- [x] Client notes field (visible on invoice)
- [x] Internal notes field (admin only)
- [x] Save as `draft`

#### Edit invoice (`/admin/invoices/[id]`)

- [x] Edit only if status is `draft` or `sent` (not if `paid`/`cancelled`)
- [x] Line item add/remove/edit
- [x] Recalculate totals

#### Send invoice

- [x] `sendInvoiceAction` server action (replaces dedicated API route)
- [x] Generate `pay_token` (expires 90 days)
- [x] Set status `draft` → `sent`, `sent_at` now
- [x] Email client via SMTP:
  - [x] Invoice summary (number, total, due date)
  - [x] Link: `/pay/[token]` (works without login)
  - [x] Link: `/portal/invoices/[id]` (if they have account)
  - [ ] PDF attachment (optional v1.1 — HTML email sufficient for v1)
- [x] Log status history

#### Invoice list (`/admin/invoices`)

- [x] Table: number, client, total, status, due date, paid_at
- [x] Filters: status, search by invoice number
- [ ] Filters: client, date range *(deferred)*
- [x] Badges for overdue (due_date < today && status not paid)

#### Manual actions (admin)

- [x] Mark as `cancelled` (void) — with confirmation
- [x] Mark as `paid` manually (offline payment) — requires note, sets `paid_at`
- [x] Resend invoice email
- [x] Send payment reminder (overdue) via SMTP

### 6.4 Client — view & pay invoices

#### Invoice list (`/portal/invoices`)

- [x] Show only current user's invoices
- [x] Columns: number, date, total, status, due date, action (Pay / View)
- [x] Highlight overdue in coral/red

#### Invoice detail (`/portal/invoices/[id]`)

- [x] Line items table, subtotal, tax, total, amount paid
- [x] Status badge
- [x] Payment history (from `payments` table)
- [x] **Pay with PayPal** button if status is `sent`, `viewed`, or `overdue`
- [x] Set status to `viewed` on first open
- [x] Print-friendly layout (CSS `print:` utilities)

#### Public pay page (`/pay/[token]`)

- [x] Validate token — not expired, invoice not paid/cancelled
- [x] Show invoice summary (no auth required)
- [x] PayPal button (dynamic import)
- [x] Optional: prompt to log in or register to see all invoices
- [x] On invalid token → friendly error page

### 6.5 PayPal checkout flow

- [x] **Step 1:** Client clicks Pay → `POST /api/invoices/[id]/paypal/create-order`
  - [x] Verify permissions (owner or valid token)
  - [x] Create `payments` row status `pending`
  - [x] Call PayPal create order with `invoice.total - amount_paid`
  - [x] Return `orderId` to client
- [x] **Step 2:** Client approves in PayPal popup/redirect
- [x] **Step 3:** `POST /api/invoices/[id]/paypal/capture`
  - [x] Capture order
  - [x] Update `payments` → `completed`
  - [x] Update `invoices` → `paid`, `paid_at`, `amount_paid`
  - [x] Log `invoice_status_history`
  - [x] Send receipt email via SMTP to client + notify admin
- [x] Handle capture failure — `payments` → `failed`, show error to user

### 6.6 PayPal webhooks (`/api/webhooks/paypal`)

- [ ] Register webhook URL in PayPal dashboard (production + sandbox) *(manual)*
- [x] Events to handle:
  - [ ] `CHECKOUT.ORDER.APPROVED` (optional)
  - [x] `PAYMENT.CAPTURE.COMPLETED` — primary confirmation
  - [x] `PAYMENT.CAPTURE.DENIED` / `REFUNDED`
- [x] Verify webhook signature on every request
- [x] Idempotent processing (ignore duplicate `provider_capture_id`)
- [x] Update invoice + payment atomically
- [x] Return 200 quickly

### 6.7 Invoice emails (SMTP)

- [x] `sendInvoiceEmail(invoice, user, payUrl)`
- [x] `sendInvoicePaidReceipt(invoice, user, payment)`
- [x] `sendInvoiceReminder(invoice, user, payUrl)`
- [ ] `sendPaymentFailedNotification(invoice, user)` (optional)

### 6.8 Overdue handling (v1)

- [x] Cron job or manual admin: mark `sent`/`viewed` → `overdue` when `due_date` passed
- [x] `/api/cron/invoices-overdue` + runs on admin/portal invoice list load
- [ ] Optional: auto-send reminder email 3 days after due

### 6.9 Invoice PDF (optional v1.1)

- [ ] Generate PDF server-side (`@react-pdf/renderer` or puppeteer)
- [ ] Attach to send email
- [ ] Download button on portal

---

## Phase 7 — Client portal & technical support ✅

### 7.1 Portal dashboard (`/portal`)

- [x] Welcome message with client name
- [x] Summary cards:
  - [x] Open invoices (count + total due)
  - [x] Overdue invoices (if any)
  - [x] Open support tickets (count)
- [x] Recent invoices list (last 5)
- [x] Recent tickets list (last 5)
- [x] Quick actions: Pay invoice, Open ticket

### 7.2 Support — client flows

#### List tickets (`/portal/support`)

- [x] Table: ticket #, subject, status, priority, last updated
- [ ] Filter by status *(deferred)*
- [x] Empty state + CTA “Open a ticket”

#### New ticket (`/portal/support/new`)

- [x] Form: subject, category, priority, message body
- [x] Validate, create `support_tickets` + first `support_messages` row
- [x] Set status `open`, `last_reply_by: client`
- [x] Email notify admin via SMTP (`SMTP_TO` or assignee)
- [x] Redirect to ticket detail

#### Ticket detail (`/portal/support/[id]`)

- [x] Thread view: messages chronologically (client + staff only — hide `is_internal`)
- [x] Reply form at bottom
- [x] Server action reply (replaces `POST /api/support/[id]/messages`)
- [x] Update ticket status → `waiting_on_staff`
- [x] Email notify assigned admin / support inbox
- [x] Show ticket metadata: #, status, priority, created date
- [x] Client can close ticket (status → `closed`) if resolved

### 7.3 Support — admin flows

#### Ticket list (`/admin/support`)

- [x] All tickets — sort by last activity
- [x] Unassigned queue highlighted
- [ ] Filter by status, priority, assignee, client *(deferred)*

#### Ticket detail (`/admin/support/[id]`)

- [x] Full thread including internal notes (`is_internal` — coral/staff-only styling)
- [x] Reply form with checkbox “Internal note only”
- [x] Change status dropdown
- [x] Assign to admin dropdown
- [x] Change priority
- [x] Link to client profile (`/admin/clients/[id]`)
- [x] Email client on staff reply (if not internal)

### 7.4 Support emails (SMTP)

- [x] `sendNewTicketNotificationToStaff(ticket)`
- [x] `sendTicketReplyToClient(ticket, message)`
- [x] `sendTicketReplyToStaff(ticket, message)` — client replied
- [ ] `sendTicketResolved(ticket)` — optional

### 7.5 Client settings (`/portal/settings`)

- [x] Edit name, company, phone
- [x] Change password (current + new)
- [ ] Email notification preferences (optional v1.1):
  - [ ] Invoice reminders
  - [ ] Support reply notifications

### 7.6 Admin — client management (`/admin/clients`)

- [x] List all client users
- [x] Create client account (admin-initiated) — send welcome/set-password email
- [x] Deactivate client (`is_active: false` — blocks login)
- [x] Client detail: profile, invoices, tickets

### 7.7 Admin dashboard (`/admin`)

- [x] KPI cards: unpaid invoices total, overdue count, open tickets, new contact submissions
- [x] Recent activity feed: recent payments
- [ ] Recent activity: new tickets, new registrations *(partial)*

---

## Phase 8 — SEO, performance & accessibility ✅

### 8.1 SEO (marketing pages only)

- [x] Metadata, sitemap (exclude `/portal`, `/admin`, `/api`)
- [x] `robots.txt` — disallow `/portal`, `/admin`, `/api`, `/pay`
- [x] JSON-LD Organization, FAQPage, case studies
- [x] Portal/admin pages: `noindex`

### 8.2 Performance

- [ ] Lighthouse 90+ on homepage *(verify manually)*
- [x] PayPal JS loaded only on pay pages (dynamic import)
- [x] Server Components default; client only where needed (PayPal buttons, forms)

### 8.3 Accessibility

- [x] Marketing a11y checklist (unchanged from Phase 2)
- [x] Portal/admin: table headers, form labels, status not color-only
- [x] PayPal button has accessible label

### 8.4 Analytics (optional)

- [x] Track invoice paid events server-side
- [x] No PII in client-side analytics

---

## Phase 9 — Testing & QA ✅ (local)

### 9.1 Unit tests

- [x] Contact validator
- [x] Invoice total calculation (line items + tax)
- [x] Invoice number generation (integration)
- [x] Pay token generation
- [x] Permissions helpers
- [ ] Email template rendering *(deferred)*

### 9.2 Integration tests

- [x] Database connection + seed users
- [ ] Contact API *(covered by smoke tests)*
- [ ] Auth flows *(manual + smoke)*
- [ ] Invoice CRUD *(manual admin UI)*
- [ ] PayPal create/capture *(requires sandbox credentials)*
- [ ] Webhook handler *(requires PayPal sandbox)*
- [ ] Support ticket create + reply *(manual)*

### 9.3 E2E tests (Playwright)

- [x] HTTP smoke tests (`pnpm smoke`) — marketing, auth redirects, health, cron
- [ ] Full Playwright E2E suite *(deferred — smoke tests cover critical paths)*

### 9.4 PayPal sandbox QA

- [ ] Requires PayPal sandbox credentials in `.env` *(manual when ready)*

### 9.5 Manual QA checklist

- [x] Admin dashboard, invoices, clients, support — verified in browser
- [x] DB integrity script (`pnpm db:integrity`)
- [x] Full verify suite (`pnpm verify:all`)
- [ ] PayPal live payment test *(needs sandbox creds)*
- [ ] SMTP deliverability *(needs SMTP config)*

---

## Phase 10 — Deployment & production ✅ (local only)

> **Note:** No VPS or domain yet. Local production workflow is complete.

### 10.1 Local hosting

- [x] Docker Compose PostgreSQL (`docker compose up -d`)
- [x] Complete `.env` with all variables documented
- [x] `docs/LOCAL.md` local development guide
- [ ] Vercel + managed Postgres OR VPS + Docker *(when ready)*

### 10.2 Database

- [x] Migrations via `pnpm db:migrate`
- [x] Seed for local dev (`pnpm db:seed`)
- [x] DB integrity verification (`pnpm db:integrity`)
- [ ] Production backups *(when deployed)*

### 10.3 CI/CD

- [x] GitHub Actions: lint, test, build, DB checks (`.github/workflows/ci.yml`)
- [ ] Deploy on merge to `main` *(when hosting chosen)*

### 10.4 Domain & SSL

- [ ] Deferred — local `http://localhost:3000` only

### 10.5 Local smoke test

- [x] `pnpm smoke` — all routes pass
- [x] `pnpm build && pnpm start` — production build works
- [x] Admin login → dashboard verified
- [x] `/api/health` passes with secret header

### 10.6 Security hardening

- [x] Middleware edge-safe (split `auth.config.ts` — no bcrypt in edge)
- [x] Cron + health endpoints protected by secrets
- [x] Webhook signature verification implemented
- [x] Rate limits on contact + auth
- [ ] CSP for PayPal scripts *(when in production)*

### 10.7 Cron jobs

- [x] `/api/cron/invoices-overdue` — protected by `CRON_SECRET`
- [x] Documented in `docs/LOCAL.md`

---

## Phase 11 — Post-launch & optional v2

### 11.1 Content & legal

- [x] `/privacy` — privacy policy page
- [x] `/terms` — terms of service page
- [ ] Real marketing content, logos, testimonials *(content pass)*
- [ ] PayPal seller protection docs *(when live)*

### 11.2–11.6 Backlog (v2+)

- [ ] Invoice PDF, partial payments, recurring invoices
- [ ] Support attachments, SLA timers, canned replies
- [ ] Stripe, Redis, blog, Cal.com — see plan backlog

---

## Environment variables reference (complete)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Full site URL |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `AUTH_SECRET` | Yes | Session encryption |
| `AUTH_URL` | Yes | Canonical app URL for Auth.js |
| `SMTP_HOST` | Yes | Mail server |
| `SMTP_PORT` | Yes | 587 or 465 |
| `SMTP_SECURE` | Yes | `true` for 465 |
| `SMTP_USER` | Yes | SMTP username |
| `SMTP_PASS` | Yes | SMTP password |
| `SMTP_FROM` | Yes | From header |
| `SMTP_TO` | Yes | Staff inbox (contact + ticket alerts) |
| `PAYPAL_MODE` | Yes | `sandbox` or `live` |
| `PAYPAL_CLIENT_ID` | Yes | PayPal app client ID |
| `PAYPAL_CLIENT_SECRET` | Yes | PayPal app secret |
| `PAYPAL_WEBHOOK_ID` | Prod | Webhook signature verification |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Yes | Client-side PayPal SDK |
| `INVOICE_PAY_TOKEN_SECRET` | Yes | Sign public pay links |
| `CONTACT_RATE_LIMIT_PER_HOUR` | No | Default 5 |
| `CRON_SECRET` | Yes | Protect cron routes |
| `SEED_ADMIN_EMAIL` | Dev | Seed only |
| `SEED_ADMIN_PASSWORD` | Dev | Seed only |

---

## Definition of done (v1 launch)

The project is **done** when all of the following are true:

### Marketing
- [ ] Homepage matches prototype quality (all sections, mobile polished)
- [ ] `/work`, `/work/[slug]`, `/contact` live

### Auth
- [ ] Clients can register, verify email, login, reset password
- [ ] Admins login to `/admin` (no public admin signup)
- [ ] Sessions secure, routes protected

### Invoicing & PayPal
- [ ] Admin can create, edit, send, void invoices
- [ ] Client receives invoice email with pay link (SMTP)
- [ ] Client can pay via PayPal (portal + public token link)
- [ ] Webhook marks invoice `paid`; receipt emails sent
- [ ] Admin can manually mark paid (offline payments)
- [ ] Overdue status works

### Support
- [ ] Logged-in clients can open tickets and reply
- [ ] Admins can assign, reply (incl. internal notes), change status
- [ ] Email notifications on new tickets and replies (SMTP)

### Ops
- [ ] Deployed production with HTTPS
- [ ] PayPal live mode tested with real payment
- [ ] SPF/DKIM/DMARC configured
- [ ] README complete
- [ ] `hostyler-1.html` archived — Next.js is live

---

## Suggested build order (week-by-week guide)

| Week | Focus |
|------|-------|
| 1 | Phase 0 + Phase 1 (project, full DB schema, seed) |
| 2 | Phase 2 (design system — marketing + portal shell) |
| 3 | Phase 3 (marketing homepage + work + contact) |
| 4 | Phase 4 (contact API + SMTP base) + Phase 5 (auth) |
| 5 | Phase 6 (admin invoices + send email + pay token) |
| 6 | Phase 6 continued (PayPal checkout + webhooks + portal pay) |
| 7 | Phase 7 (support tickets — client + admin) |
| 8 | Phase 8 (SEO, a11y) + Phase 9 (tests, PayPal sandbox QA) |
| 9 | Phase 10 (deploy, live PayPal, smoke tests) + content |

**Critical path:** Auth (Phase 5) before portal. Invoices before PayPal. PayPal webhooks before production payments.

---

## Invoice lifecycle diagram

```
[draft] ──send email──► [sent] ──client opens──► [viewed]
                            │                        │
                            │ past due_date          │
                            ▼                        ▼
                       [overdue] ◄──────────────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
         PayPal pay    manual mark     [cancelled]
              │         paid (admin)
              ▼             │
           [paid] ◄─────────┘
```

---

## Support ticket lifecycle diagram

```
[open] ──staff replies──► [waiting_on_client]
   ▲                            │
   │         client replies      │
   └──── [waiting_on_staff] ◄───┘
                │
        ┌───────┴───────┐
        ▼               ▼
   [resolved]       [closed]
```

---

*This plan is the single source of truth for the Hostyler build. Update checkboxes as you go. Add dates and notes inline when blockers arise.*
