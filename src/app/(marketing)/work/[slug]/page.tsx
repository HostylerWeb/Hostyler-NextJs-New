import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudyBySlug } from "@/lib/repositories/case-studies";
import { getCaseStudyDetail } from "@/content/case-studies";
import { CaseStudyDetailContent } from "@/components/marketing/case-study-detail-content";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Wrap } from "@/components/layout/wrap";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Work" };
  return {
    title: study.title,
    description: study.excerpt ?? undefined,
  };
}

function parseTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.filter((tag): tag is string => typeof tag === "string");
  }
  return [];
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const detail = getCaseStudyDetail(slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.excerpt,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    image: study.cover_image_url,
  };

  if (detail) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <CaseStudyDetailContent study={study} detail={detail} />
      </>
    );
  }

  const tags = parseTags(study.tags);

  return (
    <Section pageTop>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Wrap className="max-w-3xl">
        <Link href="/#work" className="font-mono text-xs font-bold text-violet uppercase">
          ← All work
        </Link>
        <h1 className="mt-6 text-[clamp(30px,4vw,46px)]">{study.title}</h1>
        <p className="mt-2 font-mono text-sm text-muted">{study.client_name}</p>
        {study.cover_image_url ? (
          <div className="case-shot mt-8 overflow-hidden rounded-[var(--radius-lg)] border-2.5 border-ink shadow-brutal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={study.cover_image_url} alt="" className="block h-80 w-full object-cover" />
          </div>
        ) : null}
        <p className="mt-8 text-lg text-muted">{study.excerpt}</p>
        <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-wrap text-[15px] leading-relaxed">
          {study.body}
        </div>
        {tags.length > 0 ? (
          <div className="tag-row mt-8">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
        <div className="mt-12">
          <Button href="/contact">Start a similar project</Button>
        </div>
      </Wrap>
    </Section>
  );
}
