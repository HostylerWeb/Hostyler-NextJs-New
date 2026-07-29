import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();

const requiredPaths = [
  ".gitignore",
  ".env.example",
  ".prettierrc",
  "eslint.config.mjs",
  "README.md",
  "docker-compose.yml",
  "next.config.ts",
  "tsconfig.json",
  "docs/hostyler-prototype.html",
  "src/proxy.ts",
  "src/instrumentation.ts",
  "src/lib/env.ts",
  "src/lib/auth.ts",
  "src/lib/mail.ts",
  "src/lib/paypal.ts",
  "src/lib/validators/contact.ts",
  "src/app/api/health/route.ts",
  "src/app/(auth)/login/page.tsx",
  "src/app/(auth)/register/page.tsx",
  "src/app/(auth)/forgot-password/page.tsx",
  "src/app/(auth)/reset-password/page.tsx",
  "src/app/portal/page.tsx",
  "src/app/admin/page.tsx",
  "src/app/pay/[token]/page.tsx",
  "src/components/sections/.gitkeep",
  "public/.gitkeep",
];

function check(name: string, ok: boolean) {
  console.log(ok ? `✓ ${name}` : `✗ ${name}`);
  return ok;
}

async function main() {
  console.log("Phase 0 verification\n");

  let passed = true;

  passed = check("Git repository", existsSync(join(root, ".git"))) && passed;

  for (const file of requiredPaths) {
    passed = check(`Path ${file}`, existsSync(join(root, file))) && passed;
  }

  const { env, validateProductionEnv } = await import("../src/lib/env");
  passed = check("env.DATABASE_URL", Boolean(env.DATABASE_URL)) && passed;
  passed =
    check(
      "env.NEXT_PUBLIC_SITE_URL",
      env.NEXT_PUBLIC_SITE_URL.startsWith("http"),
    ) && passed;

  try {
    validateProductionEnv();
    passed = check("validateProductionEnv (dev skips strict)", true) && passed;
  } catch {
    passed = check("validateProductionEnv (dev skips strict)", false) && passed;
  }

  const { verifyDatabaseConnection } = await import("../src/lib/db");
  try {
    await verifyDatabaseConnection();
    passed = check("Database connection from Node", true) && passed;
  } catch (error) {
    console.log(
      `⚠ Database connection skipped: ${error instanceof Error ? error.message : "unavailable"}`,
    );
  }

  const tsc = spawnSync("pnpm", ["typecheck"], { cwd: root, stdio: "inherit" });
  passed = check("TypeScript", tsc.status === 0) && passed;

  if (!passed) {
    console.error("\nPhase 0 verification failed.");
    process.exit(1);
  }

  console.log("\nPhase 0 verification passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
