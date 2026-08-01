import type { LegalDocument } from "@/content/legal/types";

export const termsOfService: LegalDocument = {
  title: "Terms and Conditions",
  lastUpdated: "August 1, 2026",
  intro: [
    'Welcome to Hostyler Group. These Terms and Conditions form a legally binding agreement between you ("the Client") and Hostyler Group ("the Company"), governing your use of our web services and website.',
  ],
  sections: [
    {
      title: "Acceptance of Terms",
      paragraphs: [
        "By accessing and using the Hostyler Group website and services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you must not use our website or services.",
      ],
    },
    {
      title: "Terminology",
      list: [
        '"Client", "You", and "Your" refer to you, the person or entity using our services.',
        '"The Company", "Ourselves", "We", "Our", and "Us" refer to Hostyler Group.',
        '"Party", "Parties", or "Us" includes both the Client and ourselves.',
      ],
    },
    {
      title: "1. Cookies",
      paragraphs: [
        "Our website uses essential cookies required for authentication, session management, and security when you use the client portal. By using our website, you consent to these necessary cookies. We do not use third-party advertising or analytics cookies.",
      ],
    },
    {
      title: "2. Intellectual Property Rights",
      paragraphs: [
        "Hostyler Group and/or its licensors hold the intellectual property rights for all material on our website. Subject to the license below, all these intellectual property rights are reserved.",
        "You are allowed to view, download for caching purposes only, and print pages or other content from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.",
        "You must not:",
      ],
      list: [
        "Republish material from our website without prior consent.",
        "Sell, rent, or sub-license material or services from the website.",
        "Reproduce, duplicate, copy or otherwise exploit material on our website for a commercial purpose.",
        "Edit or otherwise modify any material on the website.",
      ],
    },
    {
      title: "3. Reservation of Rights",
      paragraphs: [
        "We reserve the right to request that you remove all links or any specific link to our website at any time. Upon such request, you agree to immediately remove all links to our website.",
      ],
    },
    {
      title: "4. Removal of Links from Our Website",
      paragraphs: [
        "Should you find any link on our website or any linked website objectionable for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links but are not obligated to or so or to respond directly to you.",
      ],
    },
    {
      title: "5. Content Liability",
      paragraphs: [
        "We shall not be held responsible for any content that appears on your website. You agree to protect and defend us against all claims that are rising on your website. No link(s) should appear on any website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.",
      ],
    },
    {
      title: "6. Proprietary Rights and Obligations",
      subsections: [
        {
          title: "Hostyler Group Plugins and Themes",
          list: [
            'Our raffle websites feature customised plugins and the "Hostyler Raffles Theme", exclusive to Hostyler Group. These are subject to intellectual property laws.',
            "Without prior written consent from Hostyler Group, these plugins, themes, and any provided materials cannot be modified, resold, or used outside the scope of your website's functionality.",
            'A custom "Powered by Hostyler" signature is included in the footer of each website. Removal of this signature will result in the termination of eligibility for free technical support and theme updates.',
          ],
        },
      ],
    },
    {
      title: "7. Unauthorised Theme And/Or Plugin Usage",
      list: [
        "Each theme and/or plugin license is strictly limited to a single domain.",
        "Unauthorised use of our themes and plugins, including but not limited to using a single license on multiple domains, is a breach of these terms.",
        "If unauthorised usage is detected, the violating domain name and associated IP addresses will be blacklisted and permanently recorded in our database.",
        "Our system tracks violations, and repeated offenses will result in legal consequences.",
      ],
    },
    {
      title: "8. Governing Law & Jurisdiction",
      paragraphs: [
        "These Terms and Conditions will be governed by and interpreted in accordance with the laws of Georgia, and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Georgia.",
      ],
    },
  ],
  closing: [
    "For additional information, queries, or support, contact us at support@hostyler.com.",
  ],
};
