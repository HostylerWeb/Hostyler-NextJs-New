function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

const intelligencePoints = [
  "Real-time stock & inventory alerts",
  "Customer behaviour & cohort analysis",
  "Competitor pricing intelligence",
] as const;

const insightMetrics = [
  { label: "Low stock", value: "3 SKUs" },
  { label: "Cart trend", value: "+38%" },
  { label: "vs competitors", value: "9% below" },
] as const;

export function AiSection() {
  return (
    <section className="section wrap" id="ai">
      <div className="ai-section reveal">
        <div className="ai-copy">
          <span className="eyebrow-chip">
            <i />
            Smart business intelligence
          </span>
          <h2>Decisions backed by your data, not guesswork.</h2>
          <p>
            We build the dashboards and AI layers operators actually use — stock levels, customer
            behaviour, and competitor positioning — wired into the same platform that runs the
            storefront.
          </p>
          <ul className="ai-list">
            {intelligencePoints.map((point) => (
              <li key={point}>
                <CheckIcon />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="ai-chat">
          <div className="chat-bubble user">What should we restock before this weekend&apos;s draw?</div>
          <div className="chat-bubble ai">
            Hoodie (M) has 12 units left and cart adds are up 38% week-on-week. Two rival comps
            raised ticket prices Tuesday — you&apos;re still 9% below the category median.
            <div className="chat-fact">✦ live inventory + competitor feed</div>
          </div>
          <div className="ai-insight-grid" aria-hidden="true">
            {insightMetrics.map((metric) => (
              <div key={metric.label} className="ai-insight-card">
                <span>{metric.label}</span>
                <b>{metric.value}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
