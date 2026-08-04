import type { Metadata } from "next";
import "@/styles/marketing.css";
import { UmamiAnalyticsLoader } from "@/components/analytics/umami-analytics-loader";
import { TawkChatLoader } from "@/components/chat/tawk-chat-loader";
import { HashScroll } from "@/components/layout/hash-scroll";
import { Header } from "@/components/layout/header";
import { ScrollToTopOnNavigate } from "@/components/layout/scroll-to-top-on-navigate";
import { SkipLink } from "@/components/ui/skip-link";
import { Footer } from "@/components/layout/footer";
import { site } from "@/content/site";
import { clientEnv } from "@/lib/env";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { WebsiteJsonLd } from "@/components/seo/website-json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
  title: {
 default: `${site.name}, ${site.tagline}`,
 template: `%s, ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: clientEnv.NEXT_PUBLIC_SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
 title: `${site.name}, ${site.tagline}`,
    description: site.description,
    type: "website",
    url: clientEnv.NEXT_PUBLIC_SITE_URL,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
 alt: `${site.name}, ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
 title: `${site.name}, ${site.tagline}`,
    description: site.description,
    images: ["/opengraph-image"],
  },
};

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: clientEnv.NEXT_PUBLIC_SITE_URL,
    email: site.email,
    description: site.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <FaqJsonLd />
      <SkipLink />
      <ScrollToTopOnNavigate />
      <HashScroll />
      <Header />
      <main id="main-content" className="site-main">{children}</main>
      <Footer />
      <UmamiAnalyticsLoader />
      <TawkChatLoader />
    </>
  );
}
