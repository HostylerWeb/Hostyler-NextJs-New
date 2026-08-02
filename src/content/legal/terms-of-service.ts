import type { LegalDocument } from "@/content/legal/types";

export const termsOfService: LegalDocument = {
  title: "Terms and Conditions",
  lastUpdated: "August 1, 2026",
  intro: [
    'Welcome to Hostyler Group. These Terms and Conditions ("Terms") form a legally binding agreement between you ("the Client") and Hostyler Group ("we", "us", "our"), governing your use of our website, client portal, and professional development services.',
  ],
  sections: [
    {
      title: "Acceptance of Terms",
      paragraphs: [
        "By accessing our website, creating a client account, submitting an enquiry, or engaging us for services, you confirm that you have read, understood, and agree to these Terms. If you do not agree, you must not use our website or services.",
      ],
    },
    {
      title: "About Hostyler Group",
      paragraphs: [
        "Hostyler Group provides web development, mobile app development, AI integration, and related digital services for businesses worldwide. Our website at hostyler.com and client portal are operated by Hostyler Group.",
        "Contact: support@hostyler.com",
      ],
    },
    {
      title: "1. Services and Engagements",
      paragraphs: [
        "Specific deliverables, timelines, fees, and support terms are defined in a written proposal, statement of work, or invoice issued to you before work begins. Where there is a conflict between these Terms and a signed project agreement, the project agreement takes precedence for that engagement.",
        "We may decline or discontinue work if requirements are unlawful, unsafe, technically infeasible without material scope change, or if fees remain unpaid beyond agreed terms.",
      ],
    },
    {
      title: "2. Client Responsibilities",
      list: [
        "Provide accurate information, timely feedback, and access to systems, content, and stakeholders needed to deliver the project.",
        "Ensure you have rights to any brand assets, copy, data, or third-party materials you supply to us.",
        "Review deliverables within agreed review windows and communicate approval or change requests promptly.",
        "Maintain confidentiality of portal credentials and notify us immediately of any unauthorised account access.",
      ],
    },
    {
      title: "3. Fees, Invoices, and Payments",
      paragraphs: [
        "Fees are quoted in the currency stated on your proposal or invoice. Unless otherwise agreed, invoices are due on the due date shown in the client portal or payment link.",
        "Online invoice payments may be processed through third-party payment providers such as PayPal. By completing a payment, you also agree to the applicable provider's terms.",
        "Late payments may pause work, withhold deliverables, or incur interest or recovery costs permitted by law. Deposits and milestone payments are non-refundable once work on that phase has commenced, unless otherwise stated in writing.",
      ],
    },
    {
      title: "4. Intellectual Property",
      paragraphs: [
        "Unless otherwise agreed in writing, upon full payment of all fees due for a project, you receive ownership or a perpetual licence to the custom deliverables created specifically for you, excluding our pre-existing tools, libraries, templates, and general know-how.",
        "We retain ownership of our proprietary frameworks, reusable components, internal processes, and any materials not expressly assigned to you.",
        "We may display non-confidential work in our portfolio, case studies, and marketing materials unless you request otherwise in writing before launch.",
        "You must not:",
      ],
      list: [
        "Copy, resell, or sublicense our website content, portal software, or internal tools.",
        "Reverse engineer or attempt to extract source code from systems we provide except as permitted by law.",
        "Remove lawful attribution where agreed in your project documentation.",
      ],
    },
    {
      title: "5. Confidentiality",
      paragraphs: [
        "Each party agrees to keep confidential any non-public business, technical, or financial information received from the other party, except where disclosure is required by law or already public through no fault of the receiving party.",
        "Confidentiality obligations survive termination of an engagement for a reasonable period necessary to protect legitimate business interests.",
      ],
    },
    {
      title: "6. Cookies and Website Use",
      paragraphs: [
        "Our website uses essential cookies and similar technologies required for authentication, session management, security, and core site functionality when you use the client portal.",
        "We may use privacy-friendly, cookieless analytics on public pages to understand traffic patterns and improve the website. We do not use third-party advertising cookies on this site.",
        "For more detail, see our Privacy Policy and Cookie Policy.",
      ],
    },
    {
      title: "7. Acceptable Use",
      list: [
        "Do not attempt to gain unauthorised access to our systems, portal, or other users' accounts.",
        "Do not upload malware, unlawful content, or material that infringes third-party rights.",
        "Do not use our services to build or distribute products that are illegal, deceptive, or harmful.",
        "Do not interfere with the security, availability, or integrity of our website or infrastructure.",
      ],
    },
    {
      title: "8. Warranties and Disclaimers",
      paragraphs: [
        'We perform services with reasonable skill and care in line with industry standards and the agreed scope. Except as expressly stated in a project agreement, our website and services are provided on an "as is" and "as available" basis.',
        "We do not guarantee uninterrupted availability of the website or portal, specific search rankings, revenue outcomes, or third-party platform approvals such as app store acceptance, which depend on factors outside our control.",
      ],
    },
    {
      title: "9. Limitation of Liability",
      paragraphs: [
        "To the fullest extent permitted by law, Hostyler Group is not liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, lost data, or business interruption.",
        "Our total aggregate liability arising from any engagement or use of the website is limited to the fees paid by you to Hostyler Group for the specific service giving rise to the claim during the twelve (12) months before the event, unless a higher limit is agreed in writing.",
      ],
    },
    {
      title: "10. Termination",
      paragraphs: [
        "Either party may terminate an engagement in accordance with the applicable project agreement. We may suspend portal access or website features if these Terms are breached or invoices remain unpaid.",
        "Sections relating to fees, intellectual property, confidentiality, disclaimers, and limitation of liability survive termination where appropriate.",
      ],
    },
    {
      title: "11. Third-Party Services",
      paragraphs: [
        "Your project may rely on third-party hosting, payment, email, analytics, AI, or app store services. We are not responsible for outages, policy changes, or acts of third-party providers, though we will use reasonable efforts to select reliable vendors and document dependencies.",
      ],
    },
    {
      title: "12. Changes to These Terms",
      paragraphs: [
        "We may update these Terms from time to time. The latest version will be published on this page with an updated date. Continued use of the website or portal after changes become effective constitutes acceptance of the revised Terms.",
      ],
    },
    {
      title: "13. Governing Law and Jurisdiction",
      paragraphs: [
        "These Terms are governed by the laws of Georgia. Any dispute arising from or relating to these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Georgia, unless mandatory local consumer protection laws require otherwise.",
      ],
    },
  ],
  closing: ["For questions about these Terms, contact us at support@hostyler.com."],
};
