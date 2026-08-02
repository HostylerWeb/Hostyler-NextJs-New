import Image from "next/image";
import Link from "next/link";
import type { case_studies } from "@/generated/prisma/client";
import type { CaseStudyDetail } from "@/content/case-studies/types";
import { Button } from "@/components/ui/button";
import { RevealInit } from "@/components/sections/reveal-init";
import { Wrap } from "@/components/layout/wrap";

type CaseStudyDetailContentProps = {
  study: case_studies;
  detail: CaseStudyDetail;
};

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function FeatureIcon({ type }: { type: CaseStudyDetail["features"][number]["icon"] }) {
  const paths: Record<string, string> = {
    ticket: "M4 8h16v8H4zM8 8V5h8v3",
    wallet: "M3 7h18v10H3zM16 11h3",
    draw: "M12 3v4M12 17v4M5 12H3M21 12h-2M7 7l-1.5-1.5M18.5 18.5L17 17M7 17l-1.5 1.5M18.5 5.5L17 7",
    instant: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
    referral:
      "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    loyalty:
      "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z",
    account: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
    admin:
      "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z",
    compliance: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    spin: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2",
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d={paths[type] ?? paths.ticket} />
    </svg>
  );
}

function parseTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.filter((tag): tag is string => typeof tag === "string");
  }
  return [];
}

export function CaseStudyDetailContent({ study, detail }: CaseStudyDetailContentProps) {
  const tags = parseTags(study.tags);
  const screenshots = detail.screenshots ?? [];
  const sections = detail.sections ?? {};
  const heroShot = screenshots[0] ?? {
    src: study.cover_image_url,
    alt: `${study.title} homepage`,
    caption: "Homepage",
  };
  const featureBandKey = detail.featureBandMatch ?? "competition-detail";
  const featureShot =
    screenshots.find((s) => s.src.includes(featureBandKey)) ?? screenshots[1] ?? heroShot;

  return (
    <RevealInit>
      <article className="case-study-detail" data-slug={study.slug}>
        <section className="csd-hero">
          <Wrap>
            <Link href="/#work" className="csd-back">
              ← All work
            </Link>

            <div className="csd-hero-grid">
              <div className="csd-hero-copy reveal">
                {detail.heroAccent ? (
                  <span className="eyebrow-chip">
                    <i />
                    {detail.heroAccent}
                  </span>
                ) : null}
                <h1>{study.title}</h1>
                <p className="csd-lead">{detail.overviewLead}</p>
                <div className="tag-row csd-tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="csd-hero-actions">
                  {detail.liveUrl ? (
                    <a
                      href={detail.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-full border-2.5 border-ink bg-violet px-7 py-[15px] font-body text-[15px] font-bold text-white shadow-brutal"
                    >
                      {detail.liveUrlLabel ?? "View live site"}
                      <ExternalIcon />
                    </a>
                  ) : null}
                  <Button href="/contact" variant="ghost" className="btn btn-ghost">
                    Start a similar project
                  </Button>
                </div>
              </div>

              <div className="csd-hero-visual reveal">
                <div className="csd-shot-frame">
                  <Image
                    src={heroShot.src}
                    alt={heroShot.alt}
                    width={1200}
                    height={700}
                    priority
                    unoptimized
                    className="img-contain"
                  />
                </div>
                <p className="csd-shot-caption">{heroShot.caption}</p>
              </div>
            </div>
          </Wrap>
        </section>

        <section className="csd-overview">
          <Wrap>
            <div className="csd-overview-grid reveal">
              {detail.overviewBody.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="csd-split" id="brief">
          <Wrap>
            <div className="csd-split-grid">
              <div className="csd-split-card reveal">
                <span className="csd-section-label">01: Challenge</span>
                <h2>{detail.challenge.title}</h2>
                {detail.challenge.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              <div className="csd-split-card csd-split-card-accent reveal">
                <span className="csd-section-label">02: Solution</span>
                <h2>{detail.solution.title}</h2>
                {detail.solution.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Wrap>
        </section>

        <section className="csd-shot-band">
          <div className="csd-shot-band-inner reveal">
            <Image
              src={featureShot.src}
              alt={featureShot.alt}
              width={1920}
              height={720}
              unoptimized
              className="img-contain"
            />
          </div>
          <p className="csd-shot-band-caption">{featureShot.caption}</p>
        </section>

        {screenshots.length > 0 ? (
          <section className="csd-section csd-showcase-section" id="screens">
            <Wrap>
              <div className="head reveal">
                <span className="eyebrow-chip">
                  <i />
                  {sections.showcaseEyebrow ?? "Platform screens"}
                </span>
                <h2>{sections.showcaseTitle ?? "Inside the product."}</h2>
                <p>
                  {sections.showcaseIntro ??
                    "Screens captured from the live platform: browse, entry, instant wins, winners, and account flows."}
                </p>
              </div>

              <div className="csd-showcase">
                {screenshots.map((shot, index) => (
                  <article
                    key={shot.src}
                    className={`csd-showcase-row reveal${index % 2 === 1 ? " csd-showcase-row-reverse" : ""}`}
                  >
                    <div className="csd-showcase-copy">
                      <span className="csd-section-label">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{shot.title}</h3>
                      <p>{shot.description}</p>
                    </div>
                    <figure className="csd-showcase-visual">
                      <div className="csd-gallery-frame">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={1200}
                          height={700}
                          loading="lazy"
                          unoptimized
                          className="img-contain"
                        />
                      </div>
                      <figcaption>{shot.caption}</figcaption>
                    </figure>
                  </article>
                ))}
              </div>
            </Wrap>
          </section>
        ) : null}

        <section className="csd-section" id="features">
          <Wrap>
            <div className="head reveal">
              <span className="eyebrow-chip">
                <i />
                {sections.featuresEyebrow ?? "Platform features"}
              </span>
              <h2>{sections.featuresTitle ?? "Everything a competition operator needs."}</h2>
              <p>
                {sections.featuresIntro ??
                  "Player-facing flows and back-office tooling built as one product. Not bolted-on plugins."}
              </p>
            </div>

            <div className="csd-feature-grid">
              {detail.features.map((feature) => (
                <article key={feature.title} className="csd-feature-card reveal">
                  <div className="csd-feature-icon">
                    <FeatureIcon type={feature.icon} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="csd-section csd-section-tint" id="journey">
          <Wrap>
            <div className="head reveal">
              <span className="eyebrow-chip">
                <i />
                {sections.journeyEyebrow ?? "Player journey"}
              </span>
              <h2>{sections.journeyTitle ?? "From browse to live draw."}</h2>
              <p>
                {sections.journeyIntro ??
                  "Four steps, optimised for mobile traffic arriving during draw-night pushes."}
              </p>
            </div>

            <div className="csd-steps">
              {detail.playerSteps.map((step) => (
                <article key={step.step} className="csd-step reveal">
                  <span className="csd-step-num">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="csd-section" id="operations">
          <Wrap>
            <div className="csd-ops-grid">
              <div className="csd-ops-copy reveal">
                <span className="csd-section-label">Operations</span>
                <h2>{sections.operationsTitle ?? "Built for draw night, not just launch day."}</h2>
                <p>
                  {sections.operationsIntro ??
                    "The admin layer handles the messy reality of running competitions at scale, accounting splits, prize claims, withdrawals, and staff workflows included."}
                </p>
                <ul className="csd-checklist">
                  {detail.adminHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="csd-results-panel reveal">
                <span className="csd-section-label">Impact</span>
                <div className="csd-results-grid">
                  {detail.results.map((result) => (
                    <div key={result.label} className="case-stat">
                      <b>{result.metric}</b>
                      <span>{result.label}</span>
                    </div>
                  ))}
                </div>
                {detail.quote ? (
                  <blockquote className="csd-quote">
                    &ldquo;{detail.quote.text}&rdquo;
                    <cite>{detail.quote.attribution}</cite>
                  </blockquote>
                ) : null}
              </div>
            </div>
          </Wrap>
        </section>

        <section className="csd-section csd-tech" id="stack">
          <Wrap>
            <div className="csd-tech-inner reveal">
              <div>
                <span className="csd-section-label">Tech stack</span>
                <h2>Custom build, production-ready.</h2>
                <p>
                  {sections.techIntro ??
                    "Custom PHP backend with a REST API, payment processing, and integrations for email, analytics, and social live-draw promotion."}
                </p>
              </div>
              <div className="tag-row csd-tech-tags">
                {detail.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </Wrap>
        </section>

        <section className="csd-cta">
          <Wrap>
            <div className="csd-cta-panel reveal">
              <div>
                <h2>{sections.ctaTitle ?? "Need a competition platform like this?"}</h2>
                <p>
                  {sections.ctaIntro ??
                    "We build custom raffle and competition sites with the checkout speed, compliance structure, and admin depth operators actually need."}
                </p>
              </div>
              <div className="csd-cta-actions">
                <Button href="/contact">Start a project</Button>
                <Button href="/services/web-development" variant="ghost" className="btn btn-ghost">
                  Our web services
                </Button>
              </div>
            </div>
          </Wrap>
        </section>
      </article>
    </RevealInit>
  );
}
