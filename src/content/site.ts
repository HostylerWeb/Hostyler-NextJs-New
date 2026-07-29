export const site = {
  name: "Hostyler",
  tagline: "Web, App & AI Development Studio",
  description:
    "Hostyler is a senior web, app, and AI development studio for founders who need to ship real products — fixed timelines, full code ownership, and no junior handoffs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@hostyler.dev",
  copyright: "© 2026 Hostyler Studio",
  footerNote: "US & EU hours · Remote-first",
} as const;
