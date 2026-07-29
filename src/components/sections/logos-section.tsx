import { clientLogos, trustStats } from "@/content/trust";

export function LogosSection() {
  return (
    <section className="logos-section wrap" aria-label="Trusted by">
      <p className="logos-label">Trusted by teams at</p>
      <div className="logos-row">
        {clientLogos.map((logo) => (
          <div key={logo.name} className="logo-badge reveal">
            <span className="logo-icon">{logo.icon}</span>
            <span className="logo-name">{logo.name}</span>
          </div>
        ))}
      </div>
      <div className="trust-strip reveal">
        {trustStats.flatMap((stat, index) => {
          const items = [
            <div key={stat.label} className="trust-item">
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>,
          ];

          if (index > 0) {
            items.unshift(
              <div key={`${stat.label}-divider`} className="trust-divider" aria-hidden="true" />,
            );
          }

          return items;
        })}
      </div>
    </section>
  );
}
