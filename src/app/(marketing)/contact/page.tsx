import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHead } from "@/components/layout/section-head";
import { Section } from "@/components/layout/section";
import { Wrap } from "@/components/layout/wrap";

import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: "Tell us what you are building. We reply ASAP, usually within a few hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section pageTop>
      <Wrap className="max-w-2xl">
        <SectionHead
          eyebrow="Contact"
          title="Start a project"
 description="Tell us what you are building. We will reply ASAP, usually within a few hours, with next steps, not a sales pitch."
        />
        <ContactForm />
      </Wrap>
    </Section>
  );
}
