/**
 * Local HTTP smoke tests — requires the app running:
 *   pnpm build && pnpm start
 * or: pnpm dev
 */
import { config as loadEnv } from "dotenv";

loadEnv();

const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";

type SmokeResult = { name: string; ok: boolean; detail?: string };

const results: SmokeResult[] = [];

function record(name: string, ok: boolean, detail?: string) {
  results.push({ name, ok, detail });
  if (ok) console.log(`✓ ${name}`);
  else console.error(`✗ ${name}${detail ? `: ${detail}` : ""}`);
}

async function fetchStatus(
  path: string,
  options?: RequestInit,
): Promise<{ status: number; body: unknown }> {
  const response = await fetch(`${BASE_URL}${path}`, {
    redirect: "manual",
    ...options,
  });
  let body: unknown = null;
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    body = await response.json();
  }
  return { status: response.status, body };
}

async function main() {
  console.log(`Local smoke tests → ${BASE_URL}\n`);

  try {
    await fetch(BASE_URL);
  } catch {
    console.error(
      "Cannot reach server. Start with `pnpm dev` or `pnpm start` first.",
    );
    process.exit(1);
  }

  const publicPages = [
    "/",
    "/contact",
    "/login",
    "/privacy",
    "/terms",
    "/services/web-development",
    "/services/app-development",
    "/services/ai-automation",
  ];
  for (const path of publicPages) {
    const { status } = await fetchStatus(path);
    record(`GET ${path}`, status === 200, `status ${status}`);
  }

  const { status: healthStatus, body: healthBody } = await fetchStatus(
    "/api/health",
    {
      headers: process.env.HEALTH_CHECK_SECRET
        ? { "x-health-secret": process.env.HEALTH_CHECK_SECRET }
        : undefined,
    },
  );
  record(
    "GET /api/health",
    healthStatus === 200 && (healthBody as { ok?: boolean })?.ok === true,
    `status ${healthStatus}`,
  );

  const { status: portalRedirect } = await fetchStatus("/portal");
  record(
    "GET /portal redirects unauthenticated",
    portalRedirect === 307 || portalRedirect === 302,
    `status ${portalRedirect}`,
  );

  const { status: adminRedirect } = await fetchStatus("/admin");
  record(
    "GET /admin redirects unauthenticated",
    adminRedirect === 307 || adminRedirect === 302,
    `status ${adminRedirect}`,
  );

  const { status: contactBad } = await fetchStatus("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "x" }),
  });
  record(
    "POST /api/contact rejects invalid payload",
    contactBad === 400,
    `status ${contactBad}`,
  );

  const { status: sitemapStatus } = await fetchStatus("/sitemap.xml");
  record("GET /sitemap.xml", sitemapStatus === 200, `status ${sitemapStatus}`);

  const { status: robotsStatus } = await fetchStatus("/robots.txt");
  record("GET /robots.txt", robotsStatus === 200, `status ${robotsStatus}`);

  const { status: payInvalid } = await fetchStatus("/pay/invalid-token-xyz");
  record(
    "GET /pay/[invalid] shows error page",
    payInvalid === 200,
    `status ${payInvalid}`,
  );

  const cronSecret = process.env.CRON_SECRET ?? process.env.HEALTH_CHECK_SECRET;
  if (cronSecret) {
    const { status: cronOk } = await fetchStatus("/api/cron/invoices-overdue", {
      headers: { Authorization: `Bearer ${cronSecret}` },
    });
    record(
      "GET /api/cron/invoices-overdue (authed)",
      cronOk === 200,
      `status ${cronOk}`,
    );

    const { status: cronDenied } = await fetchStatus(
      "/api/cron/invoices-overdue",
    );
    record(
      "GET /api/cron/invoices-overdue rejects missing auth",
      cronDenied === 401,
      `status ${cronDenied}`,
    );
  } else {
    record("Cron auth", true, "skipped (no CRON_SECRET)");
  }

  const failed = results.filter((r) => !r.ok);
  console.log(
    `\n${failed.length === 0 ? "All smoke tests passed." : `${failed.length} test(s) failed.`}`,
  );
  if (failed.length > 0) process.exit(1);
}

main().catch((error) => {
  console.error("Smoke tests failed:", error);
  process.exit(1);
});
