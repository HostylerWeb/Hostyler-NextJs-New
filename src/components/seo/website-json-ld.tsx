import { site } from "@/content/site";
import { clientEnv } from "@/lib/env";

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: clientEnv.NEXT_PUBLIC_SITE_URL,
    description: site.description,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: clientEnv.NEXT_PUBLIC_SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
