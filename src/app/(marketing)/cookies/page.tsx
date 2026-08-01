import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Wrap } from "@/components/layout/wrap";
import { LegalDocumentView } from "@/components/marketing/legal-document";
import { cookiePolicy } from "@/content/legal/cookie-policy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${site.legalName} uses cookies and similar technologies.`,
};

export default function CookiesPage() {
  return (
    <Section pageTop>
      <Wrap className="max-w-3xl">
        <LegalDocumentView document={cookiePolicy} />
      </Wrap>
    </Section>
  );
}
