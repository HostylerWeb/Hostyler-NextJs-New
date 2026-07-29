import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/password-utils";
import {
  findUserByEmail,
  updateLastLogin,
} from "@/lib/repositories/users";
import { loginSchema } from "@/lib/validators/contact";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await findUserByEmail(parsed.data.email);
        if (!user || !user.is_active) return null;

        const valid = await verifyPassword(
          parsed.data.password,
          user.password_hash,
        );
        if (!valid) return null;

        if (!user.email_verified_at) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        await updateLastLogin(user.id);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          is_active: user.is_active,
        };
      },
    }),
  ],
});

export async function getSessionFromRequest() {
  return auth();
}
