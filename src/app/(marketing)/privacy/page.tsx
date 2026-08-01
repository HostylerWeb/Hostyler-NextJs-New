import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Wrap } from "@/components/layout/wrap";
import { LegalDocumentView } from "@/components/marketing/legal-document";
import { privacyPolicy } from "@/content/legal/privacy-policy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses, and protects your data.`,
};

export default function PrivacyPage() {
  return (
    <Section pageTop>
      <Wrap className="max-w-3xl">
        <LegalDocumentView document={privacyPolicy} />
      </Wrap>
    </Section>
  );
}
