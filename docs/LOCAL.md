# Hostyler — Local development reference

This project runs **entirely on your machine** for now. No VPS or custom domain required.

## Quick start

```bash
docker compose up -d          # PostgreSQL on port 5434
cp .env.example .env          # already done if you cloned with .env
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev                      # http://localhost:3000
```

## Environment variables

All variables are documented in `.env.example`. For local dev, `.env` is pre-filled with safe dev secrets.

| Variable | Local value | Notes |
|----------|-------------|-------|
| `DATABASE_URL` | `postgresql://hostyler:hostyler@localhost:5434/hostyler` | Matches Docker Compose |
| `AUTH_SECRET` | dev secret | Generate with `openssl rand -base64 32` for prod |
| `INVOICE_PAY_TOKEN_SECRET` | dev secret | Signs public pay links |
| `CRON_SECRET` | dev secret | Protects `/api/cron/invoices-overdue` |
| `HEALTH_CHECK_SECRET` | dev secret | Optional header on `/api/health` |
| `SMTP_*` | empty | Emails log to console in dev |
| `PAYPAL_*` | empty | Required only for live PayPal checkout testing |

## Seed accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `support@hostyler.com` | `Abbasisgreat123@` |
| Client | `client@example.com` | `ChangeMeClient123!` |

## Verification commands

```bash
pnpm verify:all     # Full suite: foundation, DB, tests, lint, build
pnpm test           # Unit + integration tests
pnpm db:integrity   # Invoice totals, FK checks, seed data
pnpm smoke          # HTTP smoke tests (server must be running)
```

### Smoke tests

```bash
pnpm dev            # or: pnpm build && pnpm start
pnpm smoke          # in another terminal
```

## Local production mode

Test the production build locally:

```bash
pnpm build
pnpm start          # http://localhost:3000
```

## Cron (overdue invoices)

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  http://localhost:3000/api/cron/invoices-overdue
```

Runs automatically when admin/portal invoice pages load.

## PayPal sandbox (optional)

1. Create app at [developer.paypal.com](https://developer.paypal.com)
2. Set in `.env`:
   ```
   PAYPAL_CLIENT_ID=...
   PAYPAL_CLIENT_SECRET=...
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=...   # same as CLIENT_ID
   ```
3. Test pay flow from `/portal/invoices` or `/pay/[token]`

## When you're ready for production

See `plan.md` Phase 10 for VPS/Vercel deployment. Until then, everything runs locally via Docker + Next.js.
