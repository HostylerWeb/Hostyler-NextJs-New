import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { ServiceFaq } from "@/components/marketing/service-faq";
import { RevealInit } from "@/components/sections/reveal-init";
import { ServiceVisual } from "@/components/sections/service-visual";
import type { ServicePage, ServiceVisualType } from "@/content/service-pages";
import { servicePages } from "@/content/service-pages";

type RelatedWork = {
  slug: string;
  title: string;
  client_name: string;
  excerpt: string | null;
  cover_image_url: string;
};

type ServicePageContentProps = {
  page: ServicePage;
  relatedWork?: RelatedWork[];
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function OverviewParagraph({ text, isLead }: { text: string; isLead?: boolean }) {
  if (!isLead) {
    return <p>{text}</p>;
  }

  const colonIndex = text.indexOf(": ");
  if (colonIndex > 0 && colonIndex < 140) {
    return (
      <p>
        <strong>{text.slice(0, colonIndex)}</strong>
        {text.slice(colonIndex)}
      </p>
    );
  }

  return <p>{text}</p>;
}

function PathVisual({
  variant,
  visual,
}: {
  variant: "build" | "modernize";
  visual: ServiceVisualType;
}) {
  if (visual === "app") {
    if (variant === "build") {
      return (
        <div className="service-path-visual service-path-visual-app" aria-hidden>
          <div className="service-path-phone">
            <div className="service-path-phone-notch" />
            <div className="service-path-phone-bubble">Order confirmed ✓</div>
            <div className="service-path-phone-bubble accent">Push sent</div>
          </div>
          <div className="service-path-float service-path-float-cms">TestFlight ✓</div>
        </div>
      );
    }

    return (
      <div className="service-path-visual service-path-visual-modernize" aria-hidden>
        <div className="service-path-compare">
          <div className="service-path-compare-col before">
            <span>Before</span>
            <div className="service-path-meter slow" />
            <p>Crashy · stuck</p>
          </div>
          <div className="service-path-compare-arrow">→</div>
          <div className="service-path-compare-col after">
            <span>After</span>
            <div className="service-path-meter fast" />
            <p>Stable · shipping</p>
          </div>
        </div>
      </div>
    );
  }

  if (visual === "ai") {
    if (variant === "build") {
      return (
        <div className="service-path-visual service-path-visual-ai" aria-hidden>
          <div className="service-path-chat">
            <div className="service-path-chat-bubble user">Why was this flagged?</div>
            <div className="service-path-chat-bubble ai">
              Policy threshold exceeded: review required.
              <span>✦ grounded in ticket data</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="service-path-visual service-path-visual-modernize" aria-hidden>
        <div className="service-path-compare">
          <div className="service-path-compare-col before">
            <span>Before</span>
            <div className="service-path-meter slow" />
            <p>Demo only</p>
          </div>
          <div className="service-path-compare-arrow">→</div>
          <div className="service-path-compare-col after">
            <span>After</span>
            <div className="service-path-meter fast" />
            <p>Production</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "build") {
    return (
      <div className="service-path-visual service-path-visual-build" aria-hidden>
        <div className="service-path-browser">
          <div className="service-path-browser-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="service-path-browser-body">
            <div className="service-path-browser-line wide" />
            <div className="service-path-browser-line" />
            <div className="service-path-browser-grid">
              <span />
              <span />
              <span />
            </div>
            <div className="service-path-browser-btn" />
          </div>
        </div>
        <div className="service-path-float service-path-float-cms">CMS publish ✓</div>
      </div>
    );
  }

  return (
    <div className="service-path-visual service-path-visual-modernize" aria-hidden>
      <div className="service-path-compare">
        <div className="service-path-compare-col before">
          <span>Before</span>
          <div className="service-path-meter slow" />
          <p>Slow · brittle</p>
        </div>
        <div className="service-path-compare-arrow">→</div>
        <div className="service-path-compare-col after">
          <span>After</span>
          <div className="service-path-meter fast" />
          <p>Fast · editable</p>
        </div>
      </div>
    </div>
  );
}

function getEyebrowLabel(page: ServicePage) {
  const index = page.tag.split("·")[0]?.trim() ?? "01";
  return `${index} · ${page.title}`;
}

export function ServicePageContent({ page, relatedWork = [] }: ServicePageContentProps) {
  const otherServices = servicePages.filter((item) => item.slug !== page.slug);

  const accentStyle = {
    "--sp-accent":
      page.tint === "violet"
        ? "var(--violet)"
        : page.tint === "coral"
          ? "var(--coral)"
          : "var(--ink)",
    "--sp-accent-fill":
      page.tint === "violet"
        ? "var(--violet)"
        : page.tint === "coral"
          ? "var(--coral)"
          : "var(--lime)",
    "--sp-tint":
      page.tint === "violet"
        ? "var(--violet-tint)"
        : page.tint === "coral"
          ? "var(--coral-tint)"
          : "var(--lime-tint)",
  } as CSSProperties;

  return (
    <RevealInit>
      <div className="service-detail" data-tint={page.tint} style={accentStyle}>
        <div className="wrap">
          <nav className="service-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#services">Services</Link>
            <span aria-hidden="true">/</span>
            <span className="service-breadcrumb-current">{page.title}</span>
          </nav>
        </div>

        {/* Hero: research-first, no CTAs */}
        <section className="service-page-hero wrap">
          <div className="dots" aria-hidden="true" />
          <div className="service-page-hero-grid">
            <div className="service-page-hero-copy reveal">
              <span className="eyebrow-chip">
                <i />
                {getEyebrowLabel(page)}
              </span>
              <h1>{page.title}</h1>
              <p>{page.lead}</p>

              <div className="case-stats service-page-hero-stats">
                {page.outcomes.map((outcome) => (
                  <div key={outcome.label} className="case-stat">
                    <b>{outcome.value}</b>
                    <span>{outcome.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-page-hero-visual reveal">
              <ServiceVisual type={page.visual} />
            </div>
          </div>
        </section>

        {/* Snapshot strip */}
        {page.snapshotStrip && page.snapshotStrip.length > 0 ? (
          <section className="service-snapshot wrap" aria-label="At a glance">
            <ul className="service-snapshot-grid reveal">
              {page.snapshotStrip.map((item) => (
                <li key={item.label}>
                  <b>{item.value}</b>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Overview */}
        <section className="service-page-section wrap" id="overview">
          {page.overviewSection ? (
            <>
              <div className="why-head reveal">
                <span className="eyebrow-chip">
                  <i />
                  Overview
                </span>
                <div className="why-head-row">
                  <h2>
                    {page.overviewSection.headline}
                    {page.overviewSection.headlineLine2 ? (
                      <>
                        <br />
                        {page.overviewSection.headlineLine2}
                      </>
                    ) : null}
                  </h2>
                  <p className="why-lead">{page.overviewSection.lead}</p>
                </div>
              </div>

              <div className="service-overview-spotlight reveal">
                <div className="service-overview-spotlight-visual">
                  <Image
                    src={page.overviewSection.spotlight.image}
                    alt={page.overviewSection.spotlight.imageAlt}
                    width={900}
                    height={520}
                    loading="lazy"
                  />
                </div>
                <div className="service-overview-audiences">
                  {page.overviewSection.spotlight.audiences.map((audience, index) => (
                    <article key={audience.tag} className="service-audience-card">
                      <span className="service-audience-tag">
                        0{index + 1} · {audience.tag}
                      </span>
                      <h3>{audience.title}</h3>
                      <p>{audience.description}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="service-path-grid">
                {page.overviewSection.paths.map((path) => (
                  <article
                    key={path.title}
                    className={`service-path-card reveal is-${path.variant}`}
                  >
                    <div className="service-path-card-copy">
                      <h3>{path.title}</h3>
                      <p>{path.description}</p>
                      <div className="service-path-chips">
                        {path.chips.map((chip) => (
                          <span key={chip}>{chip}</span>
                        ))}
                      </div>
                    </div>
                    <PathVisual variant={path.variant} visual={page.visual} />
                  </article>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="why-head reveal">
                <span className="eyebrow-chip">
                  <i />
                  Overview
                </span>
                <div className="why-head-row">
                  <h2>
                    Built for teams
                    <br />
                    who need to ship.
                  </h2>
                  <p className="why-lead">{page.lead}</p>
                </div>
              </div>
              <div className="service-detail-text reveal">
                {page.overview.map((paragraph, index) => (
                  <OverviewParagraph
                    key={paragraph.slice(0, 48)}
                    text={paragraph}
                    isLead={index === 0}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* What we build */}
        {page.projectTypes && page.projectTypes.length > 0 ? (
          <section className="service-page-section wrap" id="what-we-build">
            <div className="why-head reveal">
              <span className="eyebrow-chip">
                <i />
                {page.projectTypesSection?.eyebrow ?? "What we build"}
              </span>
              <div className="why-head-row">
                <h2>
                  {page.projectTypesSection?.headline ?? "What we build"}
                  {page.projectTypesSection?.headlineLine2 ? (
                    <>
                      <br />
                      {page.projectTypesSection.headlineLine2}
                    </>
                  ) : null}
                </h2>
                <p className="why-lead">
                  {page.projectTypesSection?.lead ??
                    "Most engagements start with one clear product surface and grow from there."}
                </p>
              </div>
            </div>
            <div className="service-build-grid">
              {page.projectTypes.map((type, index) => (
                <article key={type.title} className="service-build-card reveal">
                  {type.image ? (
                    <div className="service-build-card-media">
                      <Image
                        src={type.image}
                        alt={type.imageAlt ?? type.title}
                        width={800}
                        height={360}
                        loading="lazy"
                      />
                      <span className="service-build-card-num">0{index + 1}</span>
                    </div>
                  ) : (
                    <span className="service-build-card-num standalone">0{index + 1}</span>
                  )}
                  <div className="service-build-card-body">
                    <h3>{type.title}</h3>
                    <p>{type.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Fit & scope */}
        <section className="service-page-section wrap" id="fit">
          <div className="why-head reveal">
            <span className="eyebrow-chip">
              <i />
              Fit & scope
            </span>
            <div className="why-head-row">
              <h2>
                Is this the
                <br />
                right fit?
              </h2>
              <p className="why-lead">
                {page.fitSection?.callout ??
                  "Scan these lists to see if your project matches how we usually help."}
              </p>
            </div>
          </div>

          <div
            className={`service-fit-bento reveal${page.fitSection ? "" : " service-fit-bento-single"}`}
          >
            {page.fitSection ? (
              <div className="service-fit-bento-visual">
                <Image
                  src={page.fitSection.image}
                  alt={page.fitSection.imageAlt}
                  width={700}
                  height={900}
                  loading="lazy"
                />
                <div className="service-fit-bento-badge">
                  <span>{page.fitSection.badgeLabel ?? "Typical yes"}</span>
                  <b>{page.fitSection.badgeValue ?? "Startups → Scale-ups"}</b>
                </div>
              </div>
            ) : null}

            <div className="service-fit-bento-panels">
              <article className="service-fit-panel service-fit-panel-great">
                <div className="service-fit-panel-head">
                  <p className="service-panel-label">Great for</p>
                  <span>{page.greatFor.length} scenarios</span>
                </div>
                <ul className="service-fit-tags">
                  {page.greatFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="service-fit-panel service-fit-panel-included">
                <div className="service-fit-panel-head">
                  <p className="service-panel-label">What&apos;s included</p>
                  <span>Every engagement</span>
                </div>
                <ul className="service-fit-checklist">
                  {page.included.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Principles */}
        {page.principles && page.principles.length > 0 ? (
          <section className="service-page-section wrap" id="principles">
            <div className="why-head reveal">
              <span className="eyebrow-chip">
                <i />
                How we think
              </span>
              <div className="why-head-row">
                <h2>
                  Principles that shape
                  <br />
                  every build.
                </h2>
                <p className="why-lead">
                  These are the defaults we bring unless your product needs something different.
                </p>
              </div>
            </div>
            <div className="why-grid">
              {page.principles.map((principle) => (
                <article key={principle.title} className="why-card reveal">
                  <div className="why-badge">{principle.title.charAt(0)}</div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Process */}
        <section className="service-page-section wrap" id="process">
          <div className="head reveal">
            <span className="eyebrow-chip">
              <i />
              How we build
            </span>
            <h2>From scope to ship.</h2>
            <p>A clear, repeatable process for every {page.title.toLowerCase()} engagement.</p>
          </div>

          <ol className="service-steps reveal">
            {page.process.map((step) => (
              <li key={step.step} className="service-step">
                <span className="service-step-num">{step.step}</span>
                <div className="service-step-body">
                  <div className="service-step-title-row">
                    <h3>{step.title}</h3>
                    {step.duration ? (
                      <span className="service-step-duration">{step.duration}</span>
                    ) : null}
                  </div>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Stack & deliverables */}
        <section className="service-page-section wrap" id="deliverables">
          <div className="head reveal">
            <span className="eyebrow-chip">
              <i />
              What you get
            </span>
            <h2>What we use, and what you get.</h2>
            <p>
              The tools and outputs for a typical {page.title.toLowerCase()} project with Hostyler.
            </p>
          </div>

          <div className="service-td-grid">
            <article className="service-td-card reveal">
              <p className="service-td-label">Technologies</p>
              <h3>Chosen for your product</h3>
              <p>Battle-tested tools. Not whatever is trending this week.</p>
              <div className="service-tech-chips">
                {page.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
            <article className="service-td-card reveal">
              <p className="service-td-label">Deliverables</p>
              <h3>What you walk away with</h3>
              <p>Everything needed to launch, maintain, and grow.</p>
              <ul className="service-deliver-list">
                {page.deliverables.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* Business value: app and AI pages */}
        {page.businessValue ? (
          <section className="service-page-section wrap" id="value">
            <div className="head reveal">
              <span className="eyebrow-chip">
                <i />
                Why it matters
              </span>
              <h2>{page.businessValue.headline}</h2>
              <p>{page.businessValue.lead}</p>
            </div>

            <div className="why-grid">
              {page.businessValue.benefits.map((benefit) => (
                <article key={benefit.title} className="why-card reveal">
                  <div className="why-badge">{benefit.title.charAt(0)}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>

            <div className="head reveal mt-16">
              <span className="eyebrow-chip">
                <i />
                What we can build
              </span>
              <h2>Examples for your business.</h2>
              <p>
                Practical use cases we deliver. From customer-facing apps to internal automations.
              </p>
            </div>
            <div className="service-build-grid">
              {page.businessValue.examples.map((example, index) => (
                <article key={example.title} className="service-build-card reveal">
                  <span className="service-build-card-num standalone">0{index + 1}</span>
                  <div className="service-build-card-body">
                    <h3>{example.title}</h3>
                    <p>{example.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Related work */}
        {relatedWork.length > 0 ? (
          <section className="service-page-section wrap" id="work">
            <div className="head reveal">
              <span className="eyebrow-chip">
                <i />
                Related work
              </span>
              <h2>{page.relatedWorkSection?.headline ?? "Projects we have shipped."}</h2>
              <p>
                {page.relatedWorkSection?.lead ??
                  "A few examples so you can see the kind of product this service produces."}
              </p>
            </div>
            <div className="work-grid service-related-work">
              {relatedWork.map((study) => (
                <Link key={study.slug} href={`/work/${study.slug}`} className="work-card reveal">
                  <div className="work-thumb">
                    <Image
                      className="img-cover"
                      src={study.cover_image_url}
                      alt={study.title}
                      width={900}
                      height={220}
                      loading="lazy"
                    />
                    <span className="work-mark">{study.client_name.split(" ")[0]}</span>
                  </div>
                  <div className="work-body">
                    <div className="work-meta">
                      <h3>{study.title}</h3>
                    </div>
                    <p>{study.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* Engagement */}
        {page.engagement ? (
          <section className="service-page-section wrap" id="engagement">
            <div className="head reveal">
              <span className="eyebrow-chip">
                <i />
                Working together
              </span>
              <h2>{page.engagement.title}</h2>
              <p>{page.engagement.description}</p>
            </div>
            <ol className="service-engagement-list reveal">
              {page.engagement.points.map((point, index) => (
                <li key={point}>
                  <span className="service-engagement-num">0{index + 1}</span>
                  <p>{point}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <div id="faq">
          <ServiceFaq faqs={page.faqs} serviceTitle={page.title} />
        </div>

        {otherServices.length > 0 ? (
          <section className="service-page-section wrap">
            <div className="head reveal">
              <span className="eyebrow-chip">
                <i />
                More from Hostyler
              </span>
              <h2>Explore our other disciplines.</h2>
            </div>
            <div className="service-page-related">
              {otherServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="service-page-related-card reveal"
                >
                  <span className="pkg-tag">{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p>{service.lead}</p>
                  <span className="service-page-related-link">View service →</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* Single CTA after the reader has the full picture */}
        <section className="wrap service-page-cta-wrap">
          <div className="cta-section reveal">
            <h2>Ready when you are.</h2>
            <p>
              If this sounds like the right fit, tell us what you&apos;re building, we&apos;ll reply
              within one business day with next steps, not a sales pitch.
            </p>
            <div className="cta-actions">
              <Button href="/contact" variant="lime" className="btn btn-ghost">
                {page.cta}
              </Button>
              <Button
                href={`mailto:support@hostyler.com`}
                variant="ghost"
                className="btn btn-ghost"
              >
                Or email us directly
              </Button>
            </div>
          </div>
        </section>
      </div>
    </RevealInit>
  );
}
