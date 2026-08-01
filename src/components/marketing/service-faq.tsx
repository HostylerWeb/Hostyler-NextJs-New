"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { site } from "@/content/site";

type ServiceFaqProps = {
  faqs: Array<{ question: string; answer: string }>;
  serviceTitle: string;
};

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function ServiceFaqAccordion({ faqs }: { faqs: ServiceFaqProps["faqs"] }) {
  const baseId = useId();
  const [openKey, setOpenKey] = useState(`${baseId}-0`);

  const toggle = (key: string) => {
    setOpenKey((current) => (current === key ? "" : key));
  };

  return (
    <div className="service-faq-list">
      {faqs.map((faq, index) => {
        const key = `${baseId}-${index}`;
        const isOpen = openKey === key;
        const answerId = `${key}-answer`;

        return (
          <div key={faq.question} className={`service-faq-item${isOpen ? " open" : ""}`}>
            <button
              type="button"
              className="service-faq-q"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => toggle(key)}
            >
              <span>{faq.question}</span>
              <span className="service-faq-icon" aria-hidden="true">
                <PlusIcon />
              </span>
            </button>
            <div
              className="service-faq-a"
              id={answerId}
              role="region"
              style={{ maxHeight: isOpen ? "400px" : "0" }}
            >
              <div className="service-faq-a-inner">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ServiceFaq({ faqs, serviceTitle }: ServiceFaqProps) {
  return (
    <section className="service-page-section wrap">
      <div className="service-faq-layout">
        <aside className="service-faq-side reveal">
          <span className="eyebrow-chip">
            <i />
            {serviceTitle}
          </span>
          <h3>Didn&apos;t find your answer?</h3>
          <p>Send us a note and we&apos;ll reply within one business day.</p>
          <Link href="/contact" className="service-faq-side-link">
            Ask us anything
            <ArrowIcon />
          </Link>
          <Link href={`mailto:${site.email}`} className="service-faq-side-email">
            {site.email}
          </Link>
        </aside>

        <div className="service-faq-list-wrap reveal">
          <ServiceFaqAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
