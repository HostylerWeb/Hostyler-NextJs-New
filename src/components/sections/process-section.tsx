import { processSteps } from "@/content/process";

export function ProcessSection() {
  return (
    <section className="process-section" id="process">
      <div className="wrap">
        <div className="process-band reveal">
          <div className="process-intro">
            <span className="process-label">How we work</span>
            <h2>From first call to production traffic.</h2>
            <p>A clear, repeatable process — so you always know what&apos;s next.</p>
          </div>
          <div className="process-strip">
            {processSteps.map((step) => (
              <div key={step.number} className="process-card reveal">
                <div className="process-num">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className="process-tag">{step.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
