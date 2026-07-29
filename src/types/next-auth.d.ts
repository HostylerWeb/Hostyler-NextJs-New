import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "client" | "admin";
      is_active: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role: "client" | "admin";
    is_active: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "client" | "admin";
    is_active?: boolean;
  }
}
