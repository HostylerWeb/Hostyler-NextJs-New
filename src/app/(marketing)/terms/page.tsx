import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Wrap } from "@/components/layout/wrap";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of ${site.name} services and client portal.`,
};

export default function TermsPage() {
  return (
    <Section className="pt-40">
      <Wrap className="max-w-3xl prose prose-neutral">
        <h1>Terms of Service</h1>
        <p className="lead text-muted">Last updated: July 29, 2026</p>

        <h2>Services</h2>
        <p>
          Hostyler provides web, app, and AI development services. Specific
          scope, timelines, and fees are defined in individual statements of
          work or invoices.
        </p>

        <h2>Client accounts</h2>
        <p>
          You are responsible for keeping your login credentials secure. Notify
          us immediately if you suspect unauthorized access to your account.
        </p>

        <h2>Invoices &amp; payments</h2>
        <ul>
          <li>Invoices are due on the date shown unless otherwise agreed</li>
          <li>Online payments are processed via PayPal</li>
          <li>Work may pause on overdue accounts at our discretion</li>
          <li>Refund requests are handled case-by-case per project agreement</li>
        </ul>

        <h2>Support</h2>
        <p>
          Technical support is provided through the client portal during agreed
          support windows. Response times depend on priority and your support
          plan.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Unless otherwise stated in your contract, you receive full ownership of
          custom code and deliverables upon full payment.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Wrap>
    </Section>
  );
}
