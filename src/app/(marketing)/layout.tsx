import type { Metadata } from "next";
import "@/styles/marketing.css";
import { BackToTop } from "@/components/ui/back-to-top";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SkipLink } from "@/components/ui/skip-link";
import { Footer } from "@/components/layout/footer";
import { HashScroll } from "@/components/layout/hash-scroll";
import { Header } from "@/components/layout/header";
import { site } from "@/content/site";
import { clientEnv } from "@/lib/env";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${site.name} — Web, App & AI Development Studio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Web, App & AI Development Studio`,
    description: site.description,
    type: "website",
    url: clientEnv.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Web, App & AI Development Studio`,
    description: site.description,
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
      <FaqJsonLd />
      <SkipLink />
      <HashScroll />
      <ScrollProgress />
      <Header />
      <main id="main-content" className="site-main">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
