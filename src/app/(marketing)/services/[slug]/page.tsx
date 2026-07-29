import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServicePageContent } from "@/components/marketing/service-page-content";
import { getAllServiceSlugs, getServicePage } from "@/content/service-pages";
import { listPublishedCaseStudies } from "@/lib/repositories/case-studies";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

function parseTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.filter((tag): tag is string => typeof tag === "string");
  }
  return [];
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return { title: "Services" };

  return {
    title: page.title,
    description: page.metaDescription,
  };
}

export default async function ServicePageRoute({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  let relatedWork: Array<{
    slug: string;
    title: string;
    client_name: string;
    excerpt: string | null;
    cover_image_url: string;
  }> = [];

  if (page.relatedWorkTag) {
    const studies = await listPublishedCaseStudies();
    relatedWork = studies
      .filter((study) =>
        parseTags(study.tags).some(
          (tag) => tag.toLowerCase() === page.relatedWorkTag!.toLowerCase(),
        ),
      )
      .slice(0, 2)
      .map((study) => ({
        slug: study.slug,
        title: study.title,
        client_name: study.client_name,
        excerpt: study.excerpt,
        cover_image_url: study.cover_image_url,
      }));
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    areaServed: "Worldwide",
    serviceType: page.title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicePageContent page={page} relatedWork={relatedWork} />
    </>
  );
}
