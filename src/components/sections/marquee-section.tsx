import { marqueeItems } from "@/content/trust";

export function MarqueeSection() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section className="marquee-section wrap" aria-label="Tech stack">
      <div className="marquee">
        <div className="marquee-track">
          {items.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
