"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { faqGroups } from "@/content/faq";
import { site } from "@/content/site";

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function FaqSection() {
  const baseId = useId();
  const [openKey, setOpenKey] = useState(`${baseId}-0-0`);

  const toggle = (key: string) => {
    setOpenKey((current) => (current === key ? "" : key));
  };

  return (
    <section className="faq-section wrap" id="faq">
      <div className="faq-layout">
        <div className="faq-intro reveal">
          <div className="head">
            <span className="eyebrow-chip">
              <i />
              Questions
            </span>
            <h2>Answers before you ask.</h2>
          </div>
          <p>
            Everything founders usually want to know before a first call — pricing, process,
            ownership, and how we work with existing teams.
          </p>
          <div className="faq-cta-card">
            <h4>Didn&apos;t find your answer?</h4>
            <p>Send us a note and we&apos;ll reply within one business day.</p>
            <Button href="#contact" className="btn btn-primary">
              Ask us anything
            </Button>
            <Link href={`mailto:${site.email}`} className="faq-email">
              {site.email}
            </Link>
          </div>
        </div>

        <div className="faq-groups">
          {faqGroups.map((group, groupIndex) => (
            <div key={group.title} className="faq-group reveal">
              <h3 className="faq-group-title">{group.title}</h3>
              <div className="faq-list">
                {group.items.map((item, itemIndex) => {
                  const key = `${baseId}-${groupIndex}-${itemIndex}`;
                  const isOpen = openKey === key;
                  const answerId = `${key}-answer`;

                  return (
                    <div key={item.question} className={`faq-item${isOpen ? " open" : ""}`}>
                      <button
                        type="button"
                        className="faq-q"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => toggle(key)}
                      >
                        <span>{item.question}</span>
                        <div className="faq-icon" aria-hidden="true">
                          <PlusIcon />
                        </div>
                      </button>
                      <div
                        className="faq-a"
                        id={answerId}
                        role="region"
                        style={{ maxHeight: isOpen ? "400px" : "0" }}
                      >
                        <div className="faq-a-inner">
                          <p>{item.answer}</p>
                          {item.tag ? <span className="faq-tag">{item.tag}</span> : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
