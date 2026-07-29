import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHead } from "@/components/layout/section-head";
import { Section } from "@/components/layout/section";
import { Wrap } from "@/components/layout/wrap";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you are building. We reply within one business day.",
};

export default function ContactPage() {
  return (
    <Section className="pt-40">
      <Wrap className="max-w-2xl">
        <SectionHead
          eyebrow="Contact"
          title="Start a project"
          description="Tell us what you are building — we will reply within one business day with next steps, not a sales pitch."
        />
        <ContactForm variant="cta" />
      </Wrap>
    </Section>
  );
}
