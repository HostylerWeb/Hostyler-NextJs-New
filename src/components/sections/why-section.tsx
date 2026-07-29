import { whyUs } from "@/content/why-us";

export function WhySection() {
  return (
    <section className="section wrap" id="why">
      <div className="why-head reveal">
        <span className="eyebrow-chip">
          <i />
          Why Hostyler
        </span>
        <div className="why-head-row">
          <h2>
            Built different,
            <br />
            on purpose.
          </h2>
          <p className="why-lead">{whyUs.lead}</p>
        </div>
      </div>
      <div className="why-grid">
        {whyUs.points.map((point) => (
          <div key={point.title} className="why-card reveal">
            <div className="why-badge">{point.title.charAt(0)}</div>
            <h4>{point.title}</h4>
            <p>{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
