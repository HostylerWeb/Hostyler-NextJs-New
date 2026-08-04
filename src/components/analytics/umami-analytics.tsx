import Script from "next/script";

type UmamiAnalyticsProps = {
  websiteId: string;
  scriptUrl: string;
};

export function UmamiAnalytics({ websiteId, scriptUrl }: UmamiAnalyticsProps) {
  return (
    <Script
      defer
      src={scriptUrl}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
