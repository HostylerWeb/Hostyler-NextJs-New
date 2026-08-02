import type { LegalDocument } from "@/content/legal/types";

export const cookiePolicy: LegalDocument = {
  title: "Cookie Policy",
  lastUpdated: "August 1, 2026",
  intro: [
    "This Cookie Policy explains how Hostyler Group uses cookies and similar technologies on hostyler.com and how you can manage your choices.",
  ],
  sections: [
    {
      title: "What Are Cookies?",
      paragraphs: [
        "Cookies are small text files stored on your device when you visit a website. Similar technologies include local storage and session storage used by web applications.",
      ],
    },
    {
      title: "How We Use Cookies",
      paragraphs: [
        "Hostyler Group uses a minimal cookie approach focused on security and functionality rather than advertising tracking.",
      ],
    },
    {
      title: "Essential Cookies",
      paragraphs: [
        "These cookies are required for the website and client portal to function. Without them, features such as login, session management, and secure form submission may not work.",
      ],
      list: [
        "Authentication and session cookies, keep you signed in to the client portal securely.",
        "Security cookies, help protect against cross-site request forgery and abuse.",
        "Preference cookies, remember basic settings needed for site operation.",
      ],
    },
    {
      title: "Analytics on Public Pages",
      paragraphs: [
        "We use Cloudflare Web Analytics on public marketing pages to understand traffic volume and page performance. This service is cookieless and does not track you across other websites.",
        "We do not use Google Analytics, Meta Pixel, or advertising cookies on this website.",
      ],
    },
    {
      title: "Third-Party Cookies",
      paragraphs: [
        "Some third-party services linked from our site, such as payment providers when you complete an invoice payment, may set their own cookies under their privacy policies. Hostyler Group does not control those cookies.",
      ],
    },
    {
      title: "Managing Cookies",
      paragraphs: [
        "You can control or delete cookies through your browser settings. Blocking essential cookies may prevent the client portal from working correctly.",
        "Because our public analytics approach is cookieless, no analytics opt-out banner is required for Cloudflare Web Analytics on marketing pages.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "If you have questions about this Cookie Policy, contact Hostyler Group at support@hostyler.com.",
      ],
    },
  ],
};
