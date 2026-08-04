import { config as loadEnv } from "dotenv";
import { z } from "zod";

if (!process.env.DATABASE_URL) {
  loadEnv();
}

const paypalModeSchema = z.enum(["sandbox", "live"]);

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  AUTH_SECRET: z.string().min(1).default("dev-auth-secret-change-in-production"),
  AUTH_URL: z.string().url().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().default("Hostyler <support@hostyler.com>"),
  SMTP_TO: z.string().default("support@hostyler.com"),
  PAYPAL_MODE: paypalModeSchema.default("sandbox"),
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  PAYPAL_WEBHOOK_ID: z.string().optional(),
  CONTACT_RATE_LIMIT_PER_HOUR: z.coerce.number().int().positive().default(5),
  HEALTH_CHECK_SECRET: z.string().optional(),
  CRON_SECRET: z.string().optional(),
  INVOICE_PAY_TOKEN_SECRET: z.string().optional(),
  INVOICE_DUE_DAYS_DEFAULT: z.coerce.number().int().positive().default(14),
  SEED_ADMIN_EMAIL: z.string().email().optional(),
  SEED_ADMIN_PASSWORD: z.string().optional(),
  SEED_CLIENT_EMAIL: z.string().email().optional(),
  SEED_CLIENT_PASSWORD: z.string().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: z.string().optional(),
  NEXT_PUBLIC_PAYPAL_MODE: z.enum(["sandbox", "live"]).default("sandbox"),
  NEXT_PUBLIC_TAWK_PROPERTY_ID: z.string().optional(),
  NEXT_PUBLIC_TAWK_WIDGET_ID: z.string().optional(),
});

const productionRequired = [
  "AUTH_SECRET",
  "AUTH_URL",
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASS",
  "PAYPAL_CLIENT_ID",
  "PAYPAL_CLIENT_SECRET",
  "PAYPAL_WEBHOOK_ID",
  "NEXT_PUBLIC_PAYPAL_CLIENT_ID",
  "NEXT_PUBLIC_SITE_URL",
  "CRON_SECRET",
  "HEALTH_CHECK_SECRET",
] as const;

function formatZodError(error: z.ZodError) {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
    .join("\n");
}

function parseServerEnv() {
  const parsed = serverSchema.safeParse(process.env);

  if (!parsed.success) {
    const message = `Invalid server environment variables:\n${formatZodError(parsed.error)}`;
    throw new Error(message);
  }

  return parsed.data;
}

function parseClientEnv() {
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    NEXT_PUBLIC_PAYPAL_MODE: process.env.NEXT_PUBLIC_PAYPAL_MODE,
    NEXT_PUBLIC_TAWK_PROPERTY_ID: process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
    NEXT_PUBLIC_TAWK_WIDGET_ID: process.env.NEXT_PUBLIC_TAWK_WIDGET_ID,
  });

  if (!parsed.success) {
    const message = `Invalid client environment variables:\n${formatZodError(parsed.error)}`;
    throw new Error(message);
  }

  return parsed.data;
}

export function validateProductionEnv() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const missing = productionRequired.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required production environment variables: ${missing.join(", ")}`,
    );
  }
}

export const serverEnv = parseServerEnv();
export const clientEnv = parseClientEnv();

export const env = {
  ...serverEnv,
  ...clientEnv,
};

export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;
