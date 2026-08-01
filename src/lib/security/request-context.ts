import { getRequestIp } from "@/lib/rate-limit";

export type SecurityRequestContext = {
  ip_address: string;
  user_agent: string | null;
  device_fingerprint: string | null;
  browser_details: string | null;
  email?: string | null;
};

export async function getRequestUserAgent(): Promise<string | null> {
  const { headers } = await import("next/headers");
  return (await headers()).get("user-agent");
}

export async function buildSecurityContextFromForm(
  formData: FormData,
  email?: string | null,
): Promise<SecurityRequestContext> {
  const [ip_address, user_agent] = await Promise.all([getRequestIp(), getRequestUserAgent()]);

  return {
    ip_address,
    user_agent,
    device_fingerprint: String(formData.get("device_fingerprint") ?? "").trim() || null,
    browser_details: String(formData.get("browser_details") ?? "").trim() || null,
    email: email ?? (String(formData.get("email") ?? "").trim().toLowerCase() || null),
  };
}
