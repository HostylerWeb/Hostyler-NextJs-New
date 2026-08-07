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
          <span className="mock-address">client-site.com</span>
        </div>
        <div className="body">
          <p className="mock-title">Business website we built</p>
          <p className="mock-line">Clear messaging, fast pages, easy to update</p>
          <div className="fake-grid">
            <span className="fake-grid-item">SEO</span>
            <span className="fake-grid-item">Fast</span>
            <span className="fake-grid-item">Secure</span>
          </div>
          <span className="mock-pill">Contact · Pricing · Blog</span>
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
          <div className="bubble">Push: 2 new sign-ups</div>
          <div className="bubble">Revenue up 12% this week</div>
          <div className="bubble subtle">Team synced · 4 updates</div>
          <div className="fake-btn-sm">
            <span>Open dashboard</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="svc-visual sv-ai">
      <div className="bar">
        <i />
        Hostyler AI
      </div>
      <div className="body">
        <div className="chat-bubble user">Sort these 8 client emails by topic</div>
        <div className="chat-bubble ai">
          4 sales · 2 support · 2 billing. Draft replies are ready.
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
