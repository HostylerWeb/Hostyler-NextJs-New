import { env } from "@/lib/env";

/** Public site origin for server-generated absolute URLs (emails, etc.). */
export function getPublicSiteUrl(): string {
  const value = env.AUTH_URL ?? env.NEXT_PUBLIC_SITE_URL;
  return value.replace(/\/$/, "");
}

export function getPublicSiteHostname(): string {
  try {
    return new URL(getPublicSiteUrl()).hostname;
  } catch {
    return "hostyler.com";
  }
}

export function publicAssetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getPublicSiteUrl()}${normalized}`;
}
