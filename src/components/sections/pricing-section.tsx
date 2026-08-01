import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/content/pricing";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function PricingSection() {
  return (
    <section className="section wrap" id="pricing">
      <div className="head reveal">
        <span className="eyebrow-chip">
          <i />
          Ways to work with us
        </span>
        <h2>Starting points for common builds.</h2>
        <p>
          Clear entry pricing by project type — final scope and quote come after discovery, not
          mid-project surprises.
        </p>
      </div>
      <div className="pricing-grid">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`price-card reveal${tier.featured ? " featured" : ""}`}
          >
            {"ribbon" in tier && tier.ribbon ? (
              <span className="price-ribbon">{tier.ribbon}</span>
            ) : null}
            <h4>{tier.name}</h4>
            <span className="price">{tier.price}</span>
            <span className="price-note">{tier.note}</span>
            <p>{tier.description}</p>
            <ul className="price-features">
              {tier.features.map((feature) => (
                <li key={feature}>
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              href="#contact"
              variant={tier.featured ? "ink" : "ghost"}
              className={tier.featured ? "btn btn-primary" : "btn btn-ghost"}
            >
              {tier.cta}
            </Button>
          </div>
        ))}
      </div>
      <p className="pricing-support-note reveal">
        <strong>12 months of free technical support</strong> on every project — bug fixes, stability,
        and post-launch help without a retainer.
      </p>
    </section>
  );
}
