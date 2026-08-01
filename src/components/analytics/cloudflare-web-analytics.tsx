import Script from "next/script";

const BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js";

type CloudflareWebAnalyticsProps = {
  token: string;
};

export function CloudflareWebAnalytics({ token }: CloudflareWebAnalyticsProps) {
  const beaconConfig = JSON.stringify({
    token,
    spa: true,
  });

  return (
    <Script
      id="cloudflare-web-analytics"
      src={BEACON_SRC}
      strategy="afterInteractive"
      defer
      data-cf-beacon={beaconConfig}
    />
  );
}
