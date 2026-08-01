import type { security_events } from "@/generated/prisma/client";
import { sendSecurityIncidentAlert } from "@/lib/mail";
import type { SecurityRequestContext } from "@/lib/security/request-context";

type IncidentPayload = {
  context: SecurityRequestContext;
  blockedUntil: Date;
  attempts: security_events[];
};

export async function notifyPasswordResetIncident(payload: IncidentPayload) {
  try {
    await sendSecurityIncidentAlert({
      ipAddress: payload.context.ip_address,
      email: payload.context.email,
      deviceFingerprint: payload.context.device_fingerprint,
      browserDetails: payload.context.browser_details,
      userAgent: payload.context.user_agent,
      blockedUntil: payload.blockedUntil,
      attempts: payload.attempts.map((attempt) => ({
        kind: attempt.kind,
        email: attempt.email,
        attemptedValue: attempt.attempted_value,
        deviceFingerprint: attempt.device_fingerprint,
        browserDetails: attempt.browser_details,
        userAgent: attempt.user_agent,
        createdAt: attempt.created_at.toISOString(),
      })),
    });
  } catch (error) {
    console.error("[security] Failed to send incident alert", error);
  }
}
