import "@/styles/marketing.css";
import { CloudflareWebAnalyticsLoader } from "@/components/analytics/cloudflare-web-analytics-loader";

export default function PayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <CloudflareWebAnalyticsLoader />
    </>
  );
}
