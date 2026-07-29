import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Wrap } from "@/components/layout/wrap";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your data.`,
};

export default function PrivacyPage() {
  return (
    <Section className="pt-40">
      <Wrap className="max-w-3xl prose prose-neutral">
        <h1>Privacy Policy</h1>
        <p className="lead text-muted">Last updated: July 29, 2026</p>

        <h2>What we collect</h2>
        <p>
          When you use Hostyler, we may collect your name, email address, company
          name, phone number, project details, invoice and payment information,
          and support messages you send us.
        </p>

        <h2>How we use it</h2>
        <ul>
          <li>To provide our development services and client portal</li>
          <li>To send invoices, payment receipts, and support replies</li>
          <li>To respond to contact form submissions</li>
          <li>To maintain account security and prevent abuse</li>
        </ul>

        <h2>Payments</h2>
        <p>
          Payments are processed by PayPal. We do not store full card or bank
          details on our servers. PayPal provides us with transaction references
          and payer email where applicable.
        </p>

        <h2>Data retention</h2>
        <p>
          We retain account, invoice, and support data for as long as needed to
          provide services and meet legal obligations. You may request deletion
          of your account by contacting us.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Wrap>
    </Section>
  );
}
