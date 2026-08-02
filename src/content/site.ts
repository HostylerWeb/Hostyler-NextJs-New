export const site = {
  name: "Hostyler",
  legalName: "Hostyler Group",
  tagline: "Web, App & AI Development",
  description:
    "Hostyler Group is a senior web, app, and AI development team for founders who need to ship real products, fixed timelines, full code ownership, and no junior handoffs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "support@hostyler.com",
  copyright: "© 2026 Hostyler Group",
  footerNote: "US & EU hours · Remote-first",
  foundedYear: 2019,
} as const;
