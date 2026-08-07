import { Button } from "@/components/ui/button";
import { HeroCriticalStyles } from "@/components/sections/hero-critical-styles";
import { site } from "@/content/site";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="hero wrap" id="top">
      <HeroCriticalStyles />
      <div className="dots" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow-chip">
            <i />
            Web · App · AI · {site.legalName}
          </span>
          <h1>
            Big ideas, <span className="highlight on"><span>built</span></span> and shipped fast.
          </h1>
          <p>
            {site.legalName} is a senior team that designs and builds web platforms, mobile apps,
            and AI-powered products for founders who need to move without breaking what matters.
          </p>
          <div className="hero-actions">
            <Button href="#contact" className="btn btn-primary">
              Start a project
              <ArrowIcon />
            </Button>
            <Button href="#work" variant="ghost" className="btn btn-ghost">
              See our work
            </Button>
          </div>
          <div className="stat-row">
            <div className="stat-chip reveal">
              <b>550+</b>
              <span>Products shipped</span>
            </div>
            <div className="stat-chip reveal">
              <b>3</b>
              <span>Websites · Apps · AI</span>
            </div>
            <div className="stat-chip reveal">
              <b>8</b>
              <span>Years since 2019</span>
            </div>
          </div>
        </div>

        <div className="collage" aria-hidden="true">
          <div className="scatter sc-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="#121214" strokeWidth="2">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <div className="scatter sc-2">
            <svg viewBox="0 0 24 24" fill="var(--coral)" stroke="#121214" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <div className="scatter sc-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="#121214" strokeWidth="2">
              <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z" />
            </svg>
          </div>

          <div className="card-float card-browser">
            <span className="card-type">Website</span>
            <div className="bar">
              <i />
              <i />
              <i />
              <span className="mock-address">yourbrand.com</span>
            </div>
            <div className="body">
              <p className="mock-title">Launch your product online</p>
              <p className="mock-line">Marketing site · SEO · CMS</p>
              <p className="mock-line">Book demos, capture leads, rank on Google</p>
              <span className="mock-pill">Go live in weeks</span>
            </div>
          </div>

          <div className="card-float card-phone">
            <span className="card-type">Mobile app</span>
            <div className="screen">
              <div className="dot-row">
                <span />
                <span />
              </div>
              <div className="bubble">New lead · Acme Co.</div>
              <div className="bubble">Invoice #1042 paid ✓</div>
              <div className="bubble subtle">3 tasks due today</div>
            </div>
          </div>

          <div className="card-float card-ai">
            <span className="card-type">AI assistant</span>
            <div className="bar">
              <i />
              Hostyler AI
            </div>
            <div className="body">
              <p className="mock-prompt">Turn this brief into a project scope</p>
              <p className="mock-reply">
                MVP: login, dashboard, billing. Estimate: 6 weeks.
              </p>
              <div className="typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
