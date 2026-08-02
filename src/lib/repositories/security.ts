import type { Prisma, security_event_kind, security_events } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import type { SecurityRequestContext } from "@/lib/security/request-context";

const PASSWORD_RESET_REQUEST_LIMIT = 3;
const PASSWORD_RESET_BLOCK_MS = 60 * 60 * 1000;

type SecurityEventInput = {
  kind: security_event_kind;
  context: SecurityRequestContext;
  attempted_value?: string | null;
  is_incident?: boolean;
  blocked_until?: Date | null;
  metadata?: Prisma.InputJsonValue;
};

export async function createSecurityEvent(input: SecurityEventInput) {
  return prisma.security_events.create({
    data: {
      kind: input.kind,
      ip_address: input.context.ip_address,
      email: input.context.email ?? null,
      attempted_value: input.attempted_value ?? null,
      device_fingerprint: input.context.device_fingerprint,
      user_agent: input.context.user_agent,
      browser_details: input.context.browser_details,
      is_incident: input.is_incident ?? false,
      blocked_until: input.blocked_until ?? null,
      metadata: input.metadata ?? {},
    },
  });
}

export async function getActiveIpBlock(ipAddress: string) {
  return prisma.security_ip_blocks.findFirst({
    where: {
      ip_address: ipAddress,
      blocked_until: { gt: new Date() },
    },
  });
}

export async function upsertIpBlock(ipAddress: string, reason: string, blockedUntil: Date) {
  return prisma.security_ip_blocks.upsert({
    where: { ip_address: ipAddress },
    create: {
      ip_address: ipAddress,
      reason,
      blocked_until: blockedUntil,
    },
    update: {
      reason,
      blocked_until: blockedUntil,
    },
  });
}

export async function countRecentPasswordResetRequests(ipAddress: string, windowMs: number) {
  return prisma.security_events.count({
    where: {
      ip_address: ipAddress,
      kind: "password_reset_request",
      created_at: { gte: new Date(Date.now() - windowMs) },
    },
  });
}

export async function listRecentPasswordResetAttempts(ipAddress: string, windowMs: number) {
  return prisma.security_events.findMany({
    where: {
      ip_address: ipAddress,
      kind: {
        in: [
          "password_reset_request",
          "password_reset_otp_failed",
          "password_reset_password_failed",
        ],
      },
      created_at: { gte: new Date(Date.now() - windowMs) },
    },
    orderBy: { created_at: "asc" },
  });
}

export async function listSecurityEventsForAdmin(take = 200) {
  return prisma.security_events.findMany({
    orderBy: { created_at: "desc" },
    take,
  });
}

export async function countActiveSecurityIncidents() {
  return prisma.security_events.count({
    where: {
      is_incident: true,
      blocked_until: { gt: new Date() },
    },
  });
}

export async function countOpenSecurityIncidents() {
  return prisma.security_events.count({
    where: { is_incident: true },
  });
}

export async function listActiveIpBlocks() {
  return prisma.security_ip_blocks.findMany({
    where: { blocked_until: { gt: new Date() } },
    orderBy: { blocked_until: "desc" },
  });
}

export async function clearSecurityEvents() {
  return prisma.security_events.deleteMany();
}

export type PasswordResetGuardResult =
  | { allowed: true; isNewIncident?: boolean; blockedUntil?: Date; attempts?: security_events[] }
  | {
      allowed: false;
      message: string;
      blockedUntil?: Date;
      isNewIncident?: boolean;
      attempts?: security_events[];
    };

export async function guardPasswordResetRequest(context: SecurityRequestContext) {
  const activeBlock = await getActiveIpBlock(context.ip_address);
  if (activeBlock) {
    await createSecurityEvent({
      kind: "password_reset_blocked",
      context,
      metadata: {
        reason: "active_ip_block",
        blocked_until: activeBlock.blocked_until.toISOString(),
      },
    });

    return {
      allowed: false as const,
      message: "Too many password reset attempts from your network. Try again in 1 hour.",
      blockedUntil: activeBlock.blocked_until,
    };
  }

  const recentCount = await countRecentPasswordResetRequests(
    context.ip_address,
    PASSWORD_RESET_BLOCK_MS,
  );

  if (recentCount >= PASSWORD_RESET_REQUEST_LIMIT) {
    const blockedUntil = new Date(Date.now() + PASSWORD_RESET_BLOCK_MS);
    const attempts = await listRecentPasswordResetAttempts(
      context.ip_address,
      PASSWORD_RESET_BLOCK_MS,
    );

    await upsertIpBlock(
      context.ip_address,
      "Password reset abuse: 3 consecutive reset requests",
      blockedUntil,
    );

    await createSecurityEvent({
      kind: "password_reset_blocked",
      context,
      is_incident: true,
      blocked_until: blockedUntil,
      metadata: {
        trigger: "password_reset_request_limit",
        attempt_count: recentCount,
        attempts: attempts.map((attempt) => ({
          kind: attempt.kind,
          email: attempt.email,
          attempted_value: attempt.attempted_value,
          created_at: attempt.created_at.toISOString(),
        })),
      },
    });

    return {
      allowed: false as const,
      message: "Too many password reset attempts from your network. Try again in 1 hour.",
      blockedUntil,
      isNewIncident: true,
      attempts,
    };
  }

  await createSecurityEvent({
    kind: "password_reset_request",
    context,
  });

  const newCount = recentCount + 1;
  if (newCount >= PASSWORD_RESET_REQUEST_LIMIT) {
    const blockedUntil = new Date(Date.now() + PASSWORD_RESET_BLOCK_MS);
    const attempts = await listRecentPasswordResetAttempts(
      context.ip_address,
      PASSWORD_RESET_BLOCK_MS,
    );

    await upsertIpBlock(
      context.ip_address,
      "Password reset abuse: 3 consecutive reset requests",
      blockedUntil,
    );

    await createSecurityEvent({
      kind: "password_reset_blocked",
      context,
      is_incident: true,
      blocked_until: blockedUntil,
      metadata: {
        trigger: "password_reset_request_limit_reached",
        attempt_count: newCount,
        attempts: attempts.map((attempt) => ({
          kind: attempt.kind,
          email: attempt.email,
          attempted_value: attempt.attempted_value,
          device_fingerprint: attempt.device_fingerprint,
          browser_details: attempt.browser_details,
          user_agent: attempt.user_agent,
          created_at: attempt.created_at.toISOString(),
        })),
      },
    });

    return {
      allowed: true as const,
      isNewIncident: true,
      blockedUntil,
      attempts,
    };
  }

  return { allowed: true as const };
}

export async function recordPasswordResetOtpFailure(
  context: SecurityRequestContext,
  otp: string,
) {
  return createSecurityEvent({
    kind: "password_reset_otp_failed",
    context,
    attempted_value: otp,
  });
}

export async function recordPasswordResetPasswordFailure(
  context: SecurityRequestContext,
  attemptedPassword: string,
  reason: string,
) {
  return createSecurityEvent({
    kind: "password_reset_password_failed",
    context,
    attempted_value: attemptedPassword,
    metadata: { reason },
  });
}

export async function recordPasswordResetOtpVerified(context: SecurityRequestContext) {
  return createSecurityEvent({
    kind: "password_reset_otp_verified",
    context,
  });
}

export async function recordPasswordResetCompleted(context: SecurityRequestContext) {
  return createSecurityEvent({
    kind: "password_reset_completed",
    context,
  });
}
