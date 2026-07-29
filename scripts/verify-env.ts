import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv();

const root = resolve(import.meta.dirname, "..");
const example = readFileSync(resolve(root, ".env.example"), "utf8");
const keys = example
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => line.split("=")[0]!)
  .filter(Boolean);

const missing: string[] = [];
const empty: string[] = [];

for (const key of keys) {
  if (!(key in process.env)) {
    missing.push(key);
    continue;
  }
  const value = process.env[key];
  if (value === undefined || value === "") {
    empty.push(key);
  }
}

console.log("Environment variable check\n");

for (const key of keys) {
  if (missing.includes(key)) {
    console.error(`✗ ${key} — missing from .env`);
  } else if (empty.includes(key)) {
    console.log(`○ ${key} — empty (optional for local dev)`);
  } else {
    console.log(`✓ ${key}`);
  }
}

const requiredForLocal = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "AUTH_URL",
  "NEXT_PUBLIC_SITE_URL",
  "INVOICE_PAY_TOKEN_SECRET",
  "CRON_SECRET",
  "HEALTH_CHECK_SECRET",
];

const missingRequired = requiredForLocal.filter(
  (key) => !process.env[key] || process.env[key] === "",
);

if (missing.length > 0 || missingRequired.length > 0) {
  console.error("\nRequired local variables missing:");
  for (const key of [...new Set([...missing, ...missingRequired])]) {
    console.error(`  - ${key}`);
  }
  process.exit(1);
}

console.log("\n✓ All required local environment variables are set.");
console.log(
  `○ ${empty.length} optional variable(s) empty (SMTP, PayPal — fine for local dev).`,
);
