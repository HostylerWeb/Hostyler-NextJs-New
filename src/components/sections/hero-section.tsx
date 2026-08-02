import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
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
      <div className="dots" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow-chip">
            <i />
            Web · App · AI · {site.legalName}
          </span>
          <h1>
            Big ideas, <Highlight>built</Highlight> and shipped fast.
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
              <span>Core stacks · PHP · Python · TS</span>
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
            <div className="bar">
              <i />
              <i />
              <i />
            </div>
            <div className="body">
              <div className="fake-h" />
              <div className="fake-l" />
              <div className="fake-l" />
              <div className="fake-btn" />
            </div>
          </div>

          <div className="card-float card-phone">
            <div className="screen">
              <div className="dot-row">
                <span />
                <span />
              </div>
              <div className="bubble">Order confirmed ✓</div>
              <div className="bubble">Delivery: 12 min</div>
            </div>
          </div>

          <div className="card-float card-ai">
            <div className="bar">
              <i />
              hostyler-ai
            </div>
            <div className="body">
              Analyzing your data
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
