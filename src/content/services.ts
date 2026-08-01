export const services = [
  {
    id: "web",
    tag: "01 · WEB",
    title: "Web Development",
    description:
      "From marketing sites to full SaaS dashboards, we build web products that load fast, rank well, and stay simple for your team to maintain long after launch.",
    tint: "violet" as const,
  },
  {
    id: "app",
    tag: "02 · APP",
    title: "App Development",
    description:
      "Native and cross-platform mobile apps with the polish users expect — onboarding, push, offline, and app store launch included.",
    tint: "coral" as const,
  },
  {
    id: "ai",
    tag: "03 · AI",
    title: "AI Development",
    description:
      "Custom AI for websites, apps, chatbots, advisors, scanners, and trained models — scoped, evaluated, and built for production.",
    tint: "lime" as const,
  },
] as const;

export const serviceCards = [
  {
    title: "Web",
    packageTag: "Websites & SaaS",
    description: "Marketing sites, dashboards, and full-stack web platforms.",
    features: ["Next.js / React", "SEO & performance", "CMS integration"],
    tint: "violet" as const,
  },
  {
    title: "App",
    packageTag: "iOS & Android",
    description: "Native and cross-platform apps built for real users.",
    features: ["React Native / native", "App Store launch", "Push & offline"],
    tint: "coral" as const,
  },
  {
    title: "AI",
    packageTag: "Custom AI builds",
    description: "Chatbots, advisors, scanners, trained models, and AI inside web and mobile apps.",
    features: ["Chatbots & advisors", "Web & app AI", "Training & RAG"],
    tint: "lime" as const,
  },
] as const;
