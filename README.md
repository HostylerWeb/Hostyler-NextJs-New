# Hostyler

Web, app, and AI development studio — Next.js full-stack app with PostgreSQL, Auth.js, PayPal, and SMTP.

**Local-first:** runs entirely on your machine via Docker + Next.js. See [docs/LOCAL.md](docs/LOCAL.md) for the full local guide.

## Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS v4
- **Database:** PostgreSQL + Prisma
- **Auth:** Auth.js v5 (credentials + email verification)
- **Payments:** PayPal Orders API (sandbox)
- **Email:** SMTP via Nodemailer (logs to console when SMTP unset)

Design reference: `docs/hostyler-prototype.html`

## Quick start

```bash
docker compose up -d
cp .env.example .env    # pre-filled for local dev
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev                # http://localhost:3000
```

### Seed accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `support@hostyler.com` | `Abbasisgreat123@` |
| Client | `client@example.com` | `ChangeMeClient123!` |

## Verification

```bash
pnpm verify:all      # env, foundation, DB, tests, lint, build
pnpm test            # unit + integration tests
pnpm db:integrity    # invoice totals, FK checks
pnpm smoke           # HTTP smoke tests (server must be running)
pnpm env:verify      # check .env completeness
```

## Useful commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run production build locally |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |
| `pnpm foundation:verify` | Phase 0 checks |
| `pnpm db:verify` | Phase 1 database checks |
| `pnpm design:verify` | Phase 2 design system checks |

## Environment

All variables are in `.env.example`. Required for local dev:

- `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `NEXT_PUBLIC_SITE_URL`
- `INVOICE_PAY_TOKEN_SECRET`, `CRON_SECRET`, `HEALTH_CHECK_SECRET`

Optional until you need them: `SMTP_*`, `PAYPAL_*`, `NEXT_PUBLIC_PAYPAL_CLIENT_ID`

## PayPal Sandbox

1. Create app at [developer.paypal.com](https://developer.paypal.com)
2. Add to `.env`:
   ```
   PAYPAL_CLIENT_ID=...
   PAYPAL_CLIENT_SECRET=...
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=...   # same as CLIENT_ID
   ```

## Route protection

`src/proxy.ts` protects `/portal/*` (clients) and `/admin/*` (admins).

## License

Private — Hostyler Studio
