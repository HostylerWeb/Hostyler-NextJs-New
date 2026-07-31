import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Wrap } from "@/components/layout/wrap";
import { LegalDocumentView } from "@/components/marketing/legal-document";
import { termsOfService } from "@/content/legal/terms-of-service";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of ${site.name} services and client portal.`,
};

export default function TermsPage() {
  return (
    <Section pageTop>
      <Wrap className="max-w-3xl">
        <LegalDocumentView document={termsOfService} />
      </Wrap>
    </Section>
  );
}
