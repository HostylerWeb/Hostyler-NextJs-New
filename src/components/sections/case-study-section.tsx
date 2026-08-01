import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getFeaturedCaseStudy,
  listPublishedCaseStudies,
} from "@/lib/repositories/case-studies";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function parseTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.filter((tag): tag is string => typeof tag === "string");
  }
  return [];
}

function parseStats(stats: unknown): Array<{ metric: string; label: string }> {
  if (!Array.isArray(stats)) return [];
  return stats.filter(
    (item): item is { metric: string; label: string } =>
      typeof item === "object" &&
      item !== null &&
      "metric" in item &&
      "label" in item &&
      typeof item.metric === "string" &&
      typeof item.label === "string",
  );
}

function buildCaseDetails(excerpt: string, body: string) {
  const paragraphs = body.split("\n\n").filter(Boolean);
  return [
    {
      title: "The brief",
      body: excerpt,
    },
    {
      title: "What we built",
      body: paragraphs[0] ?? body,
    },
    {
      title: "The outcome",
      body: paragraphs[paragraphs.length - 1] ?? body,
    },
  ];
}

export async function CaseStudySection() {
  const featured = await getFeaturedCaseStudy();
  if (!featured) return null;

  const allStudies = await listPublishedCaseStudies();
  const miniCases = allStudies
    .filter((study) => study.id !== featured.id)
    .slice(0, 3);

  const tags = parseTags(featured.tags);
  const stats = parseStats(featured.stats);
  const caseDetails = buildCaseDetails(featured.excerpt, featured.body);
  const tagLabel = tags.length > 0 ? tags.join(" · ").toUpperCase() : "FEATURED PROJECT";

  return (
    <section className="section wrap" id="case-study" style={{ paddingTop: 0 }}>
      <div className="head reveal">
        <span className="eyebrow-chip">
          <i />
          Featured project
        </span>
        <h2>Inside the {featured.client_name} build.</h2>
        <p>A closer look at one launch, from first brief to live traffic.</p>
      </div>

      <div className="case-panel reveal">
        <div className="case-visual">
          <Image
            src={featured.cover_image_url}
            alt={`${featured.title} screenshot`}
            width={1000}
            height={320}
            loading="lazy"
            unoptimized
          />
        </div>
        <div className="case-body">
          <span className="pkg-tag">{tagLabel}</span>
          {stats.length > 0 ? (
            <div className="case-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="case-stat">
                  <b>{stat.metric}</b>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          ) : null}
          <p>{featured.excerpt}</p>
          <Button
            href={`/work/${featured.slug}`}
            variant="ghost"
            className="btn btn-ghost"
          >
            Read the full case study
            <ArrowIcon />
          </Button>
        </div>
      </div>

      <div className="case-detail reveal" id="case-study-detail">
        <div className="case-detail-grid">
          {caseDetails.map((detail) => (
            <div key={detail.title}>
              <h4>{detail.title}</h4>
              <p>{detail.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="case-shot reveal">
        <Image
          src={featured.cover_image_url}
          alt={`${featured.title} platform detail`}
          width={1400}
          height={280}
          loading="lazy"
          unoptimized
        />
      </div>

      {miniCases.length > 0 ? (
        <div className="mini-cases">
          {miniCases.map((study) => (
            <Link
              key={study.id}
              href={`/work/${study.slug}`}
              className="mini-case reveal"
              id={`case-${study.slug}`}
            >
              <Image
                src={study.cover_image_url}
                alt={study.title}
                width={700}
                height={140}
                loading="lazy"
                unoptimized
              />
              <div className="mini-case-body">
                <h4>{study.title}</h4>
                <p>{study.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
