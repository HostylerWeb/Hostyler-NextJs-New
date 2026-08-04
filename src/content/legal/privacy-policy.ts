import type { LegalDocument } from "@/content/legal/types";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: "August 1, 2026",
  intro: [
    "This Privacy Policy explains how Hostyler Group collects, uses, stores, and protects personal data when you visit our website, contact us, register for the client portal, or use our services.",
  ],
  sections: [
    {
      title: "Data Controller",
      paragraphs: [
        "Hostyler Group is the data controller for personal data processed through hostyler.com and our client portal.",
        "Email: support@hostyler.com",
      ],
    },
    {
      title: "Personal Data We Collect",
      paragraphs: [
        "Depending on how you interact with us, we may collect the following categories of data:",
      ],
      list: [
        "Identity and contact details, name, email address, phone number, company name, and job title.",
        "Account data, login credentials (stored as hashed passwords), session identifiers, and portal preferences.",
        "Project and communication data, enquiry messages, support tickets, proposals, deliverables feedback, and email correspondence.",
        "Billing data, invoice records, payment status, transaction references, and billing contact details. Card or wallet details are processed by payment providers such as PayPal and are not stored on our servers.",
        "Technical and security data, IP address, browser type, device information, request logs, and security events used for fraud prevention, rate limiting, and abuse detection.",
      ],
    },
    {
      title: "How We Use Personal Data",
      paragraphs: [
        "We process personal data only where we have a lawful basis, including contract performance, legitimate interests, legal obligation, or consent where required.",
      ],
      list: [
        "Responding to enquiries and providing contracted development services.",
        "Operating the client portal, including invoices, payments, and support.",
        "Sending transactional communications such as password resets, payment confirmations, and service notices.",
        "Maintaining website security, monitoring abuse, and protecting our systems.",
        "Operating the live chat widget and privacy-friendly analytics on public marketing pages.",
        "Complying with legal, tax, and accounting obligations.",
      ],
    },
    {
      title: "Legal Bases for Processing",
      paragraphs: [
        "Where applicable under GDPR and similar laws, we rely on: performance of a contract (delivering services you request), legitimate interests (operating and securing our business, provided your rights are not overridden), legal obligation, and consent where required for optional communications.",
      ],
    },
    {
      title: "Cookies and Similar Technologies",
      paragraphs: [
        "We use essential cookies and similar technologies required for authentication, session management, security, and core website functionality. These are necessary for the client portal to work.",
        "We use Umami analytics on public marketing pages. Umami is self-hosted, cookieless, and is not used for advertising.",
        "We use Tawk.to live chat on public marketing pages. Tawk may set cookies to operate the chat widget and support conversations. It is not used for advertising.",
        "We do not use Google Analytics or third-party marketing cookies on this website.",
        "For more detail, see our Cookie Policy.",
      ],
    },
    {
      title: "Payment Processing",
      paragraphs: [
        "Invoice payments may be processed by third-party providers such as PayPal. When you pay an invoice, the payment provider processes your payment information under their own privacy policy. We receive confirmation of payment status, transaction identifiers, and amounts needed for accounting and support.",
      ],
    },
    {
      title: "Data Sharing and Processors",
      paragraphs: [
        "We do not sell your personal data. We may share data with trusted service providers who help us operate our business, such as hosting providers, email delivery services, payment processors, and security vendors. These processors act on our instructions and are required to protect your data.",
        "We may also disclose information if required by law, court order, or to protect the rights, safety, and security of Hostyler Group, our clients, or others.",
      ],
    },
    {
      title: "International Transfers",
      paragraphs: [
        "Hostyler Group works with clients globally. Your data may be processed in countries other than your own. Where required, we use appropriate safeguards for international transfers.",
      ],
    },
    {
      title: "Data Retention",
      paragraphs: [
        "We retain personal data only for as long as necessary for the purposes described in this policy, including active client relationships, legal obligations, dispute resolution, and enforcement of agreements. Support tickets, invoices, and security logs may be retained for defined periods based on business and legal needs.",
      ],
    },
    {
      title: "Security",
      paragraphs: [
        "We apply appropriate technical and organisational measures to protect personal data against unauthorised access, loss, misuse, or alteration. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "Your Rights",
      paragraphs: [
        "Depending on your location, you may have the right to access, correct, delete, restrict, or object to certain processing of your personal data, and to request data portability where applicable. You may also withdraw consent where processing is based on consent.",
        "To exercise these rights, contact support@hostyler.com. You may also lodge a complaint with your local data protection authority.",
      ],
    },
    {
      title: "Children's Privacy",
      paragraphs: [
        "Our services are directed at businesses and professionals. We do not knowingly collect personal data from children under 16.",
      ],
    },
    {
      title: "Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The latest version will always be published on this page with an updated date.",
      ],
    },
  ],
};
