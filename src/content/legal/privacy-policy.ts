import type { LegalDocument } from "@/content/legal/types";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: "August 1, 2026",
  intro: [
    "This policy explains how Hostyler Group collects, uses, and protects personal data when you use our website and client services.",
  ],
  sections: [
    {
      title: "Owner and Data Controller",
      paragraphs: ["Hostyler Group", "Email: support@hostyler.com"],
    },
    {
      title: "Types of Data We Collect",
      paragraphs: [
        "We may collect your name, email address, phone number, company details, and any information you submit through contact forms, project enquiries, or client portal registration.",
        "When you use the client portal, we also process account credentials (stored as hashed passwords), invoice and payment records, and support ticket messages.",
        "We collect limited technical data such as IP address, browser type, and device information for security, rate limiting, and abuse prevention.",
      ],
    },
    {
      title: "How We Use Your Data",
      paragraphs: [
        "We use personal data to respond to enquiries, deliver contracted services, operate the client portal, process invoices, send transactional emails (such as password resets and payment confirmations), and maintain platform security.",
        "We do not sell your personal data. We do not use third-party advertising or behavioural tracking on this website.",
      ],
    },
    {
      title: "Cookies and Similar Technologies",
      paragraphs: [
        "We use essential cookies and similar technologies required for authentication, session management, and security. These are necessary for the site and client portal to function.",
        "We use Cloudflare Web Analytics on public pages to understand traffic and improve the website. This service is cookieless, does not track you across other sites, and is not used for advertising.",
        "We do not use Google Analytics or third-party marketing cookies on this website.",
      ],
    },
    {
      title: "Data Retention and Security",
      paragraphs: [
        "We retain personal data only as long as needed for the purposes described above, or as required by law. We apply appropriate technical and organisational measures to protect data against unauthorised access, loss, or misuse.",
      ],
    },
    {
      title: "Your Rights",
      paragraphs: [
        "Depending on your location, you may have the right to access, correct, delete, or restrict processing of your personal data, and to object to certain processing. To exercise these rights, contact us at support@hostyler.com.",
      ],
    },
    {
      title: "Changes to This Policy",
      paragraphs: [
        "We may update this policy from time to time. The latest version will always be published on this page with an updated date.",
      ],
    },
  ],
};
