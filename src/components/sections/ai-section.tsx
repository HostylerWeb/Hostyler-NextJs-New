function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

const aiPoints = [
  "Grounded on your own data",
  "Evaluated before it ships",
  "Monitored in production",
] as const;

export function AiSection() {
  return (
    <section className="section wrap" id="ai">
      <div className="ai-section reveal">
        <div className="ai-copy">
          <span className="eyebrow-chip">
            <i />
            Production-ready AI
          </span>
          <h2>Intelligence that survives real users.</h2>
          <p>
            Demos are easy. We scope, evaluate, and monitor every AI feature like any other part of
            your stack — so it still works when traffic spikes.
          </p>
          <ul className="ai-list">
            {aiPoints.map((point) => (
              <li key={point}>
                <CheckIcon />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="ai-chat">
          <div className="chat-bubble user">Why did this refund get flagged?</div>
          <div className="chat-bubble ai">
            Order #4471 exceeds the 30-day refund threshold — flagged for manual review.
            <div className="chat-fact">✦ grounded in order data</div>
          </div>
        </div>
      </div>
    </section>
  );
}
