"use server";

import { signIn } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/password-utils";
import { consumeRateLimit, getRequestIp } from "@/lib/rate-limit";
import {
  createEmailVerificationToken,
  createPasswordResetOtp,
  consumeEmailVerificationToken,
  consumePasswordResetToken,
  verifyPasswordResetOtp,
} from "@/lib/auth-tokens";
import {
  createUser,
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
  });

  const token = await createEmailVerificationToken(user.email);
  try {
    await sendEmailVerification(user, token);
  } catch {
    return {
      success:
        "Account created, but we could not send the verification email. Contact hello@hostyler.dev and we will activate your account.",
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

  const ip = await getRequestIp();
  const [emailRate, ipRate] = await Promise.all([
    consumeRateLimit(`forgot:email:${parsed.data.email.toLowerCase()}`, 3, 60 * 60 * 1000),
    consumeRateLimit(`forgot:ip:${ip}`, 10, 60 * 60 * 1000),
  ]);
  if (!emailRate.allowed || !ipRate.allowed) {
    return { error: "Too many reset requests. Try again later." };
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

  const ip = await getRequestIp();
  const [emailRate, ipRate] = await Promise.all([
    consumeRateLimit(`reset-otp:email:${parsed.data.email.toLowerCase()}`, 8, 15 * 60 * 1000),
    consumeRateLimit(`reset-otp:ip:${ip}`, 20, 15 * 60 * 1000),
  ]);
  if (!emailRate.allowed || !ipRate.allowed) {
    return { error: "Too many attempts. Try again later." };
  }

  const resetToken = await verifyPasswordResetOtp(parsed.data.email, parsed.data.otp);
  if (!resetToken) {
    return { error: "That code is invalid or has expired. Request a new one." };
  }

  return {
    success: "Code verified. Choose a new password below.",
    resetToken,
  };
}

export async function resetPasswordAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid password" };
  }

  const resetToken = String(formData.get("resetToken") ?? "");
  if (!resetToken) {
    return { error: "Your reset session expired. Start again from the login page." };
  }

  const userId = await consumePasswordResetToken(resetToken);
  if (!userId) {
    return { error: "Your reset session expired. Start again from the login page." };
  }

  const user = await findUserById(userId);
  if (!user || !user.is_active) {
    return { error: "Account not found." };
  }

  await updateUserPassword(userId, await hashPassword(parsed.data.password));

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
