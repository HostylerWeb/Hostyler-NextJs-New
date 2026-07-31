import { techLogos, trustStats } from "@/content/trust";

export function LogosSection() {
  return (
    <section className="logos-section wrap" aria-label="Technologies and integrations">
      <p className="logos-label">Technologies &amp; integrations</p>
      <div className="logos-row">
        {techLogos.map((logo) => (
          <div key={logo.name} className="logo-badge logo-badge-tech reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              className="logo-image-tech"
              style={{ height: logo.height, maxWidth: logo.maxWidth }}
              loading="lazy"
              decoding="async"
            />
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
