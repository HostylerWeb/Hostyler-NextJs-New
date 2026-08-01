import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { getHomepageServiceBlocks } from "@/content/service-pages";
import { ServiceVisual } from "@/components/sections/service-visual";

const serviceButtonVariant = {
  violet: "primary",
  coral: "coral",
  lime: "lime",
} as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function ServicesSection() {
  const serviceBlocks = getHomepageServiceBlocks();

  return (
    <section className="section wrap" id="services">
      <div className="head reveal">
        <span className="eyebrow-chip">
          <i />
          What we build
        </span>
        <h2>Three disciplines, one build process.</h2>
        <p>
          Every engagement draws on the same core team — no handoffs between a &quot;web agency&quot;
          and an &quot;AI vendor.&quot; Here&apos;s exactly what each discipline covers.
        </p>
      </div>

      {serviceBlocks.map((block) => {
        const service = services.find((item) => item.id === block.serviceId)!;

        return (
          <div
            key={block.id}
            className={`svc-block reveal${block.reverse ? " reverse" : ""}`}
            id={block.id}
            style={block.noBorder ? { borderBottom: "none" } : undefined}
          >
            <ServiceVisual type={block.visual} />
            <div className="svc-content">
              <span className="pkg-tag">{service.tag}</span>
              <h3>{service.title}</h3>
              <p>{block.description}</p>
              <div className="svc-cols">
                <div>
                  <p className="svc-col-label">Great for</p>
                  <ul className="svc-list">
                    {block.greatFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="svc-col-label">What&apos;s included</p>
                  <ul className="svc-list">
                    {block.included.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button
                href={block.href}
                variant={serviceButtonVariant[service.tint]}
                className="btn"
              >
                {block.cta}
                <ArrowIcon />
              </Button>
            </div>
          </div>
        );
      })}

      <div className="svc-cta reveal">
        <p>Not sure which one fits your project?</p>
        <Button href="#contact" variant="ghost" className="btn btn-ghost">
          Let&apos;s talk it through
        </Button>
      </div>
    </section>
  );
}
