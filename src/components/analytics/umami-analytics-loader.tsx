import { UmamiAnalytics } from "@/components/analytics/umami-analytics";
import { clientEnv } from "@/lib/env";

export function UmamiAnalyticsLoader() {
  const { NEXT_PUBLIC_UMAMI_WEBSITE_ID, NEXT_PUBLIC_UMAMI_SCRIPT_URL } = clientEnv;

  if (!NEXT_PUBLIC_UMAMI_WEBSITE_ID || !NEXT_PUBLIC_UMAMI_SCRIPT_URL) {
    return null;
  }

  return (
    <UmamiAnalytics
      websiteId={NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      scriptUrl={NEXT_PUBLIC_UMAMI_SCRIPT_URL}
    />
  );
}
