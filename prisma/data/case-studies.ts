export type CaseStudySeed = {
  slug: string;
  title: string;
  client_name: string;
  excerpt: string;
  body: string;
  cover_image_url: string;
  tags: string[];
  stats: Array<{ metric: string; label: string }>;
  featured: boolean;
  sort_order: number;
  published: boolean;
  published_at: Date;
};

export const caseStudySeeds: CaseStudySeed[] = [
  {
    slug: "competitiongo",
    title: "CompetitionGo",
    client_name: "CompetitionGo",
    excerpt:
      "A UK skill-based prize competition platform with tickets from 10p, live draws twice weekly, wallets, referrals, and a full admin back office.",
    body: `CompetitionGo is a full-scale UK competition platform operated by CompetitionGo Ltd — built to handle high-volume ticket sales, live prize draws, and repeat player engagement at scale.

We designed and developed the platform end to end: skill-based entry flows, multi-competition checkout, dual wallets, instant wins, referral commissions, loyalty cashback, GoSpin and GoCollect gamification, and admin tooling for accounting, claims, and reporting.

Live draws run every Wednesday and Sunday at 8PM UK time, with guaranteed winners on every competition.`,
    cover_image_url: "/work/competitiongo/homepage.png",
    tags: ["Web", "Raffles & Competitions", "Platform"],
    stats: [
      { metric: "10p+", label: "ticket entry point" },
      { metric: "Live draws", label: "Wed & Sun 8PM" },
    ],
    featured: true,
    sort_order: 1,
    published: true,
    published_at: new Date("2026-01-01"),
  },
  {
    slug: "max-giveaways",
    title: "Max Giveaways",
    client_name: "Max Giveaways",
    excerpt:
      "A UK prize competition platform with live Facebook draws, instant-win campaigns, tickets from 2p, and £10 donated to Epilepsy Action per competition.",
    body: `Max Giveaways is a high-energy UK competition brand operated by Maxwell's Comp Shop Ltd — built for live Facebook draws, instant-win campaigns, and a purpose-driven story that donates £10 to Epilepsy Action on every competition.

We designed and developed the platform end to end: the dark-mode storefront, featured competition grid, instant-win mechanics, winner gallery, player accounts, and the Our Story content that shares Max's journey from Maxwell's Croc Shop to a national competition brand.`,
    cover_image_url: "/work/max-giveaways/homepage.png",
    tags: ["Web", "Raffles & Competitions", "Platform"],
    stats: [
      { metric: "2p+", label: "ticket entry point" },
      { metric: "Live draws", label: "on Facebook" },
    ],
    featured: false,
    sort_order: 2,
    published: true,
    published_at: new Date("2025-07-01"),
  },
  {
    slug: "sanjha-chulha",
    title: "Sanjha Chulha",
    client_name: "Sanjha Chulha",
    excerpt:
      "A premium Indian restaurant website for Tbilisi — two branches, online reservations, filterable menus, delivery links, and a photography-led brand story since 2015.",
    body: `Sanjha Chulha is one of Tbilisi's best-known Indian restaurants — operating since 2015 with two branches, authentic tandoor cooking, and halal-certified menus.

We designed and built a hospitality website that brings the dining experience online: signature dish showcases, branch-specific menus and galleries, table reservations, delivery app links, and blog content — all optimised for mobile diners searching before they visit.`,
    cover_image_url: "/work/sanjha-chulha/homepage.png",
    tags: ["Web", "Hospitality", "Restaurant"],
    stats: [
      { metric: "Since 2015", label: "serving Tbilisi" },
      { metric: "2 branches", label: "across the city" },
    ],
    featured: false,
    sort_order: 3,
    published: true,
    published_at: new Date("2024-10-01"),
  },
  {
    slug: "the-lash-house",
    title: "The Lash House",
    client_name: "The Lash House",
    excerpt:
      "A Lebanese beauty e-commerce store for professional lash artists — premium lash trays, adhesives, tools, and salon supplies with variable product options and deep category navigation.",
    body: `The Lash House supplies lash artists across Lebanon with professional-grade trays, adhesives, tools, and salon essentials — from Cashmere Silk classics to Easy Fan promade fans and magnetic lash lines.

We designed and built a WooCommerce storefront with a soft beauty-brand aesthetic, five-department category architecture, variable lash tray selectors, filterable shop pages, and account tooling for repeat restocking.`,
    cover_image_url: "/work/the-lash-house/homepage.png",
    tags: ["Web", "E-commerce", "Beauty"],
    stats: [
      { metric: "5 departments", label: "lashes to salon setup" },
      { metric: "Variable", label: "lash tray options" },
    ],
    featured: false,
    sort_order: 4,
    published: true,
    published_at: new Date("2025-03-01"),
  },
  {
    slug: "hooked-online",
    title: "Hooked Online",
    client_name: "Hooked Online",
    excerpt:
      "Australian fishing gear store with category-led shopping and a mobile-friendly product experience.",
    body: `Hooked Online sells fishing tackle to anglers who often browse and buy from the bank, the boat, or the car park.

We created an e-commerce experience with intuitive category navigation, readable product specs, and a checkout flow tuned for smaller screens. The design leans into the brand's outdoor identity while keeping practical purchase decisions front and center.

The build helps Hooked Online compete with larger retailers by offering a focused, fast shopping experience for dedicated fishing customers.`,
    cover_image_url: "/work/hooked-online/homepage.png",
    tags: ["Web", "E-commerce"],
    stats: [
      { metric: "AU", label: "fishing retail" },
      { metric: "Category-led", label: "navigation" },
    ],
    featured: false,
    sort_order: 5,
    published: true,
    published_at: new Date("2024-03-01"),
  },
  {
    slug: "socialite-life",
    title: "Socialite Life",
    client_name: "Socialite Life",
    excerpt:
      "Hollywood gossip and entertainment blog with editorial layouts built for frequent publishing and social sharing.",
    body: `Socialite Life publishes entertainment news where headline clarity and scroll speed matter as much as the writing itself.

We built a blog platform with article templates optimized for discovery, readable typography, and layouts that surface related stories and trending topics. The structure supports high publishing cadence and social sharing without sacrificing performance on mobile.

The result is a content site that feels lively and current — the right foundation for an audience that expects fresh stories throughout the day.`,
    cover_image_url: "/work/socialite-life/homepage.png",
    tags: ["Web", "Publishing"],
    stats: [
      { metric: "Editorial", label: "article templates" },
      { metric: "Social", label: "sharing ready" },
    ],
    featured: false,
    sort_order: 6,
    published: true,
    published_at: new Date("2024-03-01"),
  },
  {
    slug: "bonnie-plants",
    title: "Bonnie Plants",
    client_name: "Bonnie Plants",
    excerpt:
      "Online plant and seed store with seasonal merchandising and a shopping flow suited to hobbyist gardeners.",
    body: `Bonnie Plants needed a digital shop that could present plants and seeds in a way that inspires confidence — especially for customers buying living products online.

We designed product pages with room for care guidance, seasonal highlights, and clear delivery expectations. Navigation groups inventory in a way that matches how gardeners actually shop, from starter kits to specialty varieties.

The storefront gives Bonnie Plants a polished e-commerce channel that supports seasonal campaigns and repeat orders from enthusiastic growers.`,
    cover_image_url: "/work/bonnie-plants/homepage.png",
    tags: ["Web", "E-commerce"],
    stats: [
      { metric: "Seasonal", label: "merchandising" },
      { metric: "Garden", label: "retail UX" },
    ],
    featured: false,
    sort_order: 7,
    published: true,
    published_at: new Date("2024-03-01"),
  },
  {
    slug: "nadia-amokrane",
    title: "Dr Nadia Amokrane",
    client_name: "Dr Nadia Amokrane",
    excerpt:
      "Private gynaecology practice website for a London consultant — condition guides, credentials, and consultation booking across Dulwich and Belgravia clinics.",
    body: `Dr Nadia Amokrane is a Consultant Gynaecologist with over 15 years of experience in women's health — offering private care across Dulwich and Belgravia, with NHS leadership at Epsom & St Helier.

We designed and built a patient-focused practice website with dedicated condition pages for endometriosis, fibroids, fertility, PCOS, menopause, and early pregnancy care — plus credentials, clinic locations, and a consultation enquiry flow that makes booking straightforward.

The result is a premium digital presence that builds trust before the first appointment — warm, clear, and centred entirely on patient wellbeing.`,
    cover_image_url: "/work/nadia-amokrane/homepage.png",
    tags: ["Web", "Healthcare", "Private Practice"],
    stats: [
      { metric: "15+ years", label: "clinical experience" },
      { metric: "2 clinics", label: "across London" },
    ],
    featured: false,
    sort_order: 8,
    published: true,
    published_at: new Date("2025-08-01"),
  },
];

export const legacyCaseStudySlugs = [
  "northstar",
  "loop-health",
  "fieldnote",
  "currency-co",
  "bike-life-comps",
  "elite-carp-comps",
  "bella-comps",
  "glutie-wear",
  "super-dealer",
];
