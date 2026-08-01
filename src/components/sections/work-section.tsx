import Image from "next/image";
import Link from "next/link";
import { listPublishedCaseStudies } from "@/lib/repositories/case-studies";

function WorkArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function getShortMark(clientName: string) {
  return clientName.split(" ")[0] ?? clientName;
}

function parseTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.filter((tag): tag is string => typeof tag === "string");
  }
  return [];
}

export async function WorkSection() {
  const caseStudies = await listPublishedCaseStudies();

  return (
    <section className="section wrap" id="work">
      <div className="head reveal">
        <span className="eyebrow-chip">
          <i />
          Selected work
        </span>
        <h2>Recent builds.</h2>
        <p>A few of the products we&apos;ve taken from a first call to production traffic.</p>
      </div>

      <div className="work-grid">
        {caseStudies.map((study) => {
          const tags = parseTags(study.tags);

          return (
            <Link key={study.id} href={`/work/${study.slug}`} className="work-card reveal">
              <div className="work-thumb">
                <Image
                  className="img-cover"
                  src={study.cover_image_url}
                  alt={study.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  unoptimized
                />
                <span className="work-mark">{getShortMark(study.client_name)}</span>
              </div>
              <div className="work-body">
                <div className="work-meta">
                  <h3>{study.title}</h3>
                  <div className="work-arrow">
                    <WorkArrowIcon />
                  </div>
                </div>
                <p>{study.excerpt}</p>
                {tags.length > 0 ? (
                  <div className="tag-row">
                    {tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
