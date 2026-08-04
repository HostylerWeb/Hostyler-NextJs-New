"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";

export type TestimonialCard = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar_url: string;
};

function SwipeHintIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function NavIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      {direction === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

type TestimonialsCarouselProps = {
  testimonials: TestimonialCard[];
};

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll<HTMLElement>(".testi-card");
    if (!cards.length) return;

    const nextIndex = Math.max(0, Math.min(index, cards.length - 1));
    activeIndexRef.current = nextIndex;
    cards[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }, []);

  const scroll = (direction: "prev" | "next") => {
    const delta = direction === "next" ? 1 : -1;
    scrollToIndex(activeIndexRef.current + delta);
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section wrap" id="testimonials">
      <div className="testi-head reveal">
        <div className="head" style={{ marginBottom: 0 }}>
          <span className="eyebrow-chip">
            <i />
            Client notes
          </span>
          <h2>What it&apos;s like to work with us.</h2>
        </div>
        <p className="testi-hint">
          <SwipeHintIcon />
          Swipe for more
        </p>
      </div>

      <div className="testi-carousel">
        <div
          ref={trackRef}
          className="testi-track"
          tabIndex={0}
          role="region"
          aria-label="Client testimonials"
        >
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="testi-card">
              <div className="testi-stars" aria-hidden>
                ★★★★★
              </div>
              <p>&quot;{testimonial.quote}&quot;</p>
              <div className="testi-person">
                <div className="testi-avatar">
                  <Image
                    src={testimonial.avatar_url}
                    alt={testimonial.name}
                    width={44}
                    height={44}
                    loading="lazy"
                  />
                </div>
                <div>
                  <b>{testimonial.name}</b>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="testi-nav">
        <button type="button" onClick={() => scroll("prev")} aria-label="Previous">
          <NavIcon direction="prev" />
        </button>
        <button type="button" onClick={() => scroll("next")} aria-label="Next">
          <NavIcon direction="next" />
        </button>
      </div>
    </section>
  );
}
