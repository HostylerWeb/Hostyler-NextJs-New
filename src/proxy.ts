import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const session = request.auth;

  const isPortalRoute = pathname.startsWith("/portal");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if ((isPortalRoute || isAdminRoute) && !session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && session?.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  if (isAuthRoute && session?.user) {
    const destination = session.user.role === "admin" ? "/admin" : "/portal";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/portal/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
