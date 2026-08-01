"use server";

import { Prisma } from "@/generated/prisma/client";
import { signIn } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/password-utils";
import { consumeRateLimit, getRequestIp } from "@/lib/rate-limit";
import {
  getActiveIpBlock,
  guardPasswordResetRequest,
  recordPasswordResetCompleted,
  recordPasswordResetOtpFailure,
  recordPasswordResetOtpVerified,
  recordPasswordResetPasswordFailure,
} from "@/lib/repositories/security";
import { notifyPasswordResetIncident } from "@/lib/security/password-reset-incidents";
import { buildSecurityContextFromForm } from "@/lib/security/request-context";
import {
  createEmailVerificationToken,
  createPasswordResetOtp,
  consumeEmailVerificationToken,
  consumePasswordResetToken,
  verifyPasswordResetOtp,
} from "@/lib/auth-tokens";
import {
  createUser,
  findClientByRegistrationIp,
  findUserByEmail,
  findUserById,
  markEmailVerified,
  updateUserPassword,
  updateLastLogin,
} from "@/lib/repositories/users";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyPasswordResetOtpSchema,
} from "@/lib/validators/contact";
import {
  sendEmailVerification,
  sendPasswordResetOtp,
  sendWelcomeEmail,
} from "@/lib/mail";

export type AuthFormState = {
  error?: string;
  success?: string;
  resetToken?: string;
};

export async function registerAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const ip = await getRequestIp();
  const existingFromIp = await findClientByRegistrationIp(ip);
  if (existingFromIp) {
    return {
      error:
        "An account is already linked to your network. Please log in to your existing account instead of creating a new one.",
    };
  }

  const [emailRate, ipRate] = await Promise.all([
    consumeRateLimit(`register:email:${parsed.data.email.toLowerCase()}`, 3, 60 * 60 * 1000),
    consumeRateLimit(`register:ip:${ip}`, 10, 60 * 60 * 1000),
  ]);
  if (!emailRate.allowed || !ipRate.allowed) {
    return { error: "Too many registration attempts. Try again later." };
  }

  const existing = await findUserByEmail(parsed.data.email);
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const user = await createUser({
    email: parsed.data.email,
    name: parsed.data.name,
    company: parsed.data.company ?? null,
    password_hash: await hashPassword(parsed.data.password),
    role: "client",
    registration_ip: ip === "unknown" ? null : ip,
  }).catch((error: unknown) => {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      Array.isArray(error.meta?.target) &&
      error.meta.target.includes("registration_ip")
    ) {
      return null;
    }
    throw error;
  });

  if (!user) {
    return {
      error:
        "An account is already linked to your network. Please log in to your existing account instead of creating a new one.",
    };
  }

  const token = await createEmailVerificationToken(user.email);
  try {
    await sendEmailVerification(user, token);
  } catch {
    return {
      success:
        "Account created, but we could not send the verification email. Contact support@hostyler.com and we will activate your account.",
    };
  }

  return {
    success: "Account created. Check your email to verify before logging in.",
  };
}

export async function loginAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Invalid email or password." };
  }

  const ip = await getRequestIp();
  const [emailRate, ipRate] = await Promise.all([
    consumeRateLimit(`login:email:${parsed.data.email.toLowerCase()}`, 10, 15 * 60 * 1000),
    consumeRateLimit(`login:ip:${ip}`, 30, 15 * 60 * 1000),
  ]);
  if (!emailRate.allowed || !ipRate.allowed) {
    return { error: "Too many login attempts. Try again later." };
  }

  const user = await findUserByEmail(parsed.data.email);
  if (!user || !user.is_active) {
    return { error: "Invalid email or password." };
  }

  const valid = await verifyPassword(parsed.data.password, user.password_hash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  if (!user.email_verified_at) {
    return { error: "Please verify your email before logging in." };
  }

  const callbackUrl = String(formData.get("callbackUrl") || "/portal");
  await updateLastLogin(user.id);

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: user.role === "admin" ? "/admin" : callbackUrl,
  });

  return {};
}

export async function forgotPasswordAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email address." };
  }

  const securityContext = await buildSecurityContextFromForm(
    formData,
    parsed.data.email.toLowerCase(),
  );
  const guardResult = await guardPasswordResetRequest(securityContext);

  if (!guardResult.allowed) {
    if (guardResult.isNewIncident && guardResult.blockedUntil && guardResult.attempts) {
      await notifyPasswordResetIncident({
        context: securityContext,
        blockedUntil: guardResult.blockedUntil,
        attempts: guardResult.attempts,
      });
    }

    return { error: guardResult.message };
  }

  if (guardResult.isNewIncident && guardResult.blockedUntil && guardResult.attempts) {
    await notifyPasswordResetIncident({
      context: securityContext,
      blockedUntil: guardResult.blockedUntil,
      attempts: guardResult.attempts,
    });
  }

  const ip = securityContext.ip_address;
  const emailRate = await consumeRateLimit(
    `forgot:email:${parsed.data.email.toLowerCase()}`,
    3,
    60 * 60 * 1000,
  );
  if (!emailRate.allowed) {
    return { error: "Too many reset requests for this email. Try again later." };
  }

  const user = await findUserByEmail(parsed.data.email);
  if (user?.is_active) {
    const otp = await createPasswordResetOtp(user.id);
    try {
      await sendPasswordResetOtp(user, otp);
    } catch {
      return { error: "Could not send the reset code. Try again later." };
    }
  }

  return {
    success: "If an account exists for that email, we sent a 6-digit reset code.",
  };
}

async function ensurePasswordResetIpAllowed(formData: FormData, email?: string) {
  const securityContext = await buildSecurityContextFromForm(formData, email);
  const activeBlock = await getActiveIpBlock(securityContext.ip_address);

  if (activeBlock) {
    return {
      allowed: false as const,
      error: "Too many password reset attempts from your network. Try again in 1 hour.",
      context: securityContext,
    };
  }

  return { allowed: true as const, context: securityContext };
}

export async function verifyPasswordResetOtpAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = verifyPasswordResetOtpSchema.safeParse({
    email: formData.get("email"),
    otp: formData.get("otp"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid code" };
  }

  const access = await ensurePasswordResetIpAllowed(formData, parsed.data.email);
  if (!access.allowed) {
    return { error: access.error };
  }

  const ip = access.context.ip_address;
  const [emailRate, ipRate] = await Promise.all([
    consumeRateLimit(`reset-otp:email:${parsed.data.email.toLowerCase()}`, 8, 15 * 60 * 1000),
    consumeRateLimit(`reset-otp:ip:${ip}`, 20, 15 * 60 * 1000),
  ]);
  if (!emailRate.allowed || !ipRate.allowed) {
    return { error: "Too many attempts. Try again later." };
  }

  const resetToken = await verifyPasswordResetOtp(parsed.data.email, parsed.data.otp);
  if (!resetToken) {
    await recordPasswordResetOtpFailure(access.context, parsed.data.otp);
    return { error: "That code is invalid or has expired. Request a new one." };
  }

  await recordPasswordResetOtpVerified(access.context);

  return {
    success: "Code verified. Choose a new password below.",
    resetToken,
  };
}

export async function resetPasswordAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const access = await ensurePasswordResetIpAllowed(formData);
  if (!access.allowed) {
    return { error: access.error };
  }

  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  });

  if (!parsed.success) {
    const attemptedPassword = String(formData.get("password") ?? "");
    await recordPasswordResetPasswordFailure(
      access.context,
      attemptedPassword,
      parsed.error.issues[0]?.message ?? "Invalid password",
    );
    return { error: parsed.error.issues[0]?.message ?? "Invalid password" };
  }

  const resetToken = String(formData.get("resetToken") ?? "");
  if (!resetToken) {
    return { error: "Your reset session expired. Start again from the login page." };
  }

  const userId = await consumePasswordResetToken(resetToken);
  if (!userId) {
    await recordPasswordResetPasswordFailure(
      { ...access.context, email: access.context.email },
      parsed.data.password,
      "Expired reset session",
    );
    return { error: "Your reset session expired. Start again from the login page." };
  }

  const user = await findUserById(userId);
  if (!user || !user.is_active) {
    return { error: "Account not found." };
  }

  await updateUserPassword(userId, await hashPassword(parsed.data.password));
  await recordPasswordResetCompleted({
    ...access.context,
    email: user.email,
  });

  if (!user.email_verified_at) {
    return {
      success: "Password updated. Verify your email, then log in with your new password.",
    };
  }

  await updateLastLogin(user.id);
  await signIn("credentials", {
    email: user.email,
    password: parsed.data.password,
    redirectTo: user.role === "admin" ? "/admin" : "/portal",
  });

  return {};
}

export async function verifyEmailAction(token: string): Promise<AuthFormState> {
  const email = await consumeEmailVerificationToken(token);
  if (!email) {
    return { error: "This verification link is invalid or has expired." };
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return { error: "Account not found." };
  }

  if (!user.email_verified_at) {
    await markEmailVerified(user.id);
    await sendWelcomeEmail(user);
  }

  return { success: "Email verified. You can log in now." };
}
