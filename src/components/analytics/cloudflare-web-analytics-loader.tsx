import { CloudflareWebAnalytics } from "@/components/analytics/cloudflare-web-analytics";
import { clientEnv } from "@/lib/env";

export function CloudflareWebAnalyticsLoader() {
  const token = clientEnv.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

  if (!token) {
    return null;
  }

  return <CloudflareWebAnalytics token={token} />;
}
