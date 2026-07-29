export const pricingTiers = [
  {
    name: "Fixed Scope",
    price: "From $18k",
    note: "one project, fixed price",
    description:
      "A single, clearly scoped build — website, app, or AI feature — with a fixed price and date.",
    features: ["Fixed price & timeline", "Weekly demos", "30-day post-launch support"],
    featured: false,
    cta: "Get a quote",
  },
  {
    name: "Embedded Team",
    price: "From $12k/mo",
    note: "ongoing, monthly",
    description:
      "Senior engineers and designers embedded in your workflow as extra capacity, for as long as you need it.",
    features: ["Dedicated senior team", "Works inside your tools", "Scale up or down monthly"],
    featured: true,
    ribbon: "Most popular",
    cta: "Get a quote",
  },
  {
    name: "Retainer",
    price: "From $4k/mo",
    note: "ongoing support",
    description:
      "For products already live — bug fixes, small features, and infrastructure upkeep on a monthly retainer.",
    features: ["Priority response time", "Monitoring included", "Cancel anytime"],
    featured: false,
    cta: "Get a quote",
  },
] as const;
