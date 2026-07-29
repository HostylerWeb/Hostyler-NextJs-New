type ServiceVisualProps = {
  type: "web" | "app" | "ai";
};

export function ServiceVisual({ type }: ServiceVisualProps) {
  if (type === "web") {
    return (
      <div className="svc-visual sv-web">
        <div className="bar">
          <i />
          <i />
          <i />
        </div>
        <div className="body">
          <div className="fake-h" />
          <div className="fake-l" />
          <div className="fake-l" style={{ width: "60%" }} />
          <div className="fake-grid">
            <span />
            <span />
            <span />
          </div>
          <div className="fake-btn" />
        </div>
      </div>
    );
  }

  if (type === "app") {
    return (
      <div className="svc-visual sv-app">
        <div className="phone-screen">
          <div className="dot-row">
            <span />
            <span />
          </div>
          <div className="bubble">Order confirmed ✓</div>
          <div className="bubble">Delivery: 12 min</div>
          <div className="fake-btn-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="svc-visual sv-ai">
      <div className="bar">
        <i />
        hostyler-ai
      </div>
      <div className="body">
        <div className="chat-bubble user" style={{ marginBottom: 10 }}>
          Summarize this week&apos;s tickets
        </div>
        <div className="chat-bubble ai">
          3 recurring issues found. Drafting a fix doc now
          <div className="typing">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
