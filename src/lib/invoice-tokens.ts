import { randomBytes } from "node:crypto";

const PAY_TOKEN_TTL_MS = 90 * 24 * 60 * 60 * 1000;

export function createPayToken(): { token: string; expiresAt: Date } {
  return {
    token: randomBytes(32).toString("hex"),
    expiresAt: new Date(Date.now() + PAY_TOKEN_TTL_MS),
  };
}
