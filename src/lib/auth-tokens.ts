import { createHash, randomBytes, randomInt } from "node:crypto";
import { prisma } from "@/lib/db";
import { findUserByEmail } from "@/lib/repositories/users";

export function createToken(): string {
  return randomBytes(32).toString("hex");
}

export function createOtpCode(): string {
  return String(randomInt(100000, 1000000));
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createEmailVerificationToken(email: string) {
  const token = createToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await prisma.verification_tokens.deleteMany({
    where: { identifier: email.toLowerCase() },
  });

  await prisma.verification_tokens.create({
    data: {
      identifier: email.toLowerCase(),
      token: hashToken(token),
      expires,
    },
  });

  return token;
}

export async function consumeEmailVerificationToken(token: string) {
  const hashed = hashToken(token);
  const record = await prisma.verification_tokens.findFirst({
    where: { token: hashed, expires: { gt: new Date() } },
  });

  if (!record) return null;

  await prisma.verification_tokens.delete({
    where: {
      identifier_token: {
        identifier: record.identifier,
        token: record.token,
      },
    },
  });

  return record.identifier;
}

export async function createPasswordResetOtp(userId: string) {
  const otp = createOtpCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.password_reset_tokens.deleteMany({ where: { user_id: userId } });

  await prisma.password_reset_tokens.create({
    data: {
      user_id: userId,
      token_hash: hashToken(`otp:${otp}`),
      expires_at: expiresAt,
    },
  });

  return otp;
}

export async function verifyPasswordResetOtp(email: string, otp: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const record = await prisma.password_reset_tokens.findFirst({
    where: {
      user_id: user.id,
      token_hash: hashToken(`otp:${otp}`),
      expires_at: { gt: new Date() },
      used_at: null,
    },
  });

  if (!record) return null;

  const sessionToken = createToken();

  await prisma.password_reset_tokens.update({
    where: { id: record.id },
    data: {
      token_hash: hashToken(sessionToken),
      expires_at: new Date(Date.now() + 30 * 60 * 1000),
    },
  });

  return sessionToken;
}

export async function consumePasswordResetToken(token: string) {
  const hashed = hashToken(token);
  const record = await prisma.password_reset_tokens.findFirst({
    where: {
      token_hash: hashed,
      expires_at: { gt: new Date() },
      used_at: null,
    },
  });

  if (!record) return null;

  await prisma.password_reset_tokens.update({
    where: { id: record.id },
    data: { used_at: new Date() },
  });

  return record.user_id;
}
