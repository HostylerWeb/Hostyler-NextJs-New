export const pricingTiers = [
  {
    name: "Web development",
    price: "From $3,500",
    note: "USD · websites & platforms",
    description:
      "Web development and design with production infrastructure — hosting setup, GitHub repository, deployment, monitoring hooks, and everything needed to go live.",
    features: [
      "Custom design & Next.js build",
      "Hosting & infrastructure setup",
      "GitHub repo & deployment pipeline",
      "SEO, analytics & handoff docs",
    ],
    featured: false,
    cta: "Get a quote",
  },
  {
    name: "Mobile apps",
    price: "From $6,000",
    note: "USD · iOS & Android together",
    description:
      "Mobile apps for Android and iOS in one engagement — both stores, shared backend, release support, and the wiring between app and API.",
    features: [
      "Android & iOS apps in one project",
      "App store submission support",
      "Backend & API integration",
      "Push notifications & auth flows",
    ],
    featured: true,
    ribbon: "Both platforms",
    cta: "Get a quote",
  },
  {
    name: "Advanced AI",
    price: "From $7,500",
    note: "USD · custom AI systems",
    description:
      "Advanced AI work — custom training, model implementation, infrastructure, business logic, integrations, and full production wiring end to end.",
    features: [
      "Custom AI training & fine-tuning",
      "Infrastructure & deployment setup",
      "Logic, automations & integrations",
      "Monitoring, docs & handoff",
    ],
    featured: false,
    cta: "Get a quote",
  },
] as const;
