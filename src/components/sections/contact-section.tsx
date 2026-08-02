import { ContactForm } from "@/components/contact/contact-form";

export function ContactSection() {
  return (
    <section className="wrap" id="contact">
      <div className="cta-section reveal">
        <h2>Have a build in mind?</h2>
        <p>
          Tell us what you&apos;re building, we&apos;ll reply ASAP, usually within a few hours, with
          next steps, not a sales pitch.
        </p>
        <ContactForm variant="cta" />
        <p className="cta-alt">
          Prefer email only? <a href="mailto:support@hostyler.com">support@hostyler.com</a>
        </p>
        <p className="cta-note">No spam. No auto-dialed sales calls.</p>
      </div>
    </section>
  );
}
