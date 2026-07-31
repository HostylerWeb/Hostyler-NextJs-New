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
    cover_image_url: "/work/competitiongo/competition-detail.png",
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
      "A full raffle and competition platform built for high-volume ticket sales, live draws, and repeat campaigns.",
    body: `Max Giveaways needed a competition site that could handle busy launch days without slowing down checkout or confusing first-time players.

We designed and built a custom raffle platform with a clear prize presentation, fast ticket purchase flow, and admin tooling for managing competitions, winners, and site content. The storefront is mobile-first, with performance tuned so pages stay responsive even when traffic spikes during popular draws.

The result is a polished, trustworthy competition brand that converts visitors into ticket buyers and gives the team full control over campaigns without relying on off-the-shelf templates.`,
    cover_image_url: "/work/max-giveaways.png",
    tags: ["Web", "Raffles & Competitions"],
    stats: [
      { metric: "Mobile-first", label: "checkout experience" },
      { metric: "Custom", label: "competition engine" },
    ],
    featured: false,
    sort_order: 2,
    published: true,
    published_at: new Date("2025-07-01"),
  },
  {
    slug: "bike-life-comps",
    title: "Bike Life Comps",
    client_name: "Bike Life Competitions",
    excerpt:
      "Competition website for a niche automotive audience, with bold branding and a streamlined ticket journey.",
    body: `Bike Life Competitions serves enthusiasts who expect energy, speed, and clarity from every page they visit.

We created a competition website that leads with strong visual identity, surfaces active draws immediately, and keeps the path from browse to buy as short as possible. Product imagery, prize details, and trust signals are structured so new visitors understand the offer within seconds.

Behind the scenes, the platform supports ongoing campaign updates and a consistent experience across desktop and mobile — essential for a community that discovers draws through social channels.`,
    cover_image_url: "/work/bike-life-comps.jpg",
    tags: ["Web", "Raffles & Competitions"],
    stats: [
      { metric: "Niche", label: "automotive audience" },
      { metric: "Fast", label: "ticket purchase flow" },
    ],
    featured: false,
    sort_order: 3,
    published: true,
    published_at: new Date("2025-06-15"),
  },
  {
    slug: "elite-carp-comps",
    title: "Elite Carp Comps",
    client_name: "Elite Carp Competitions",
    excerpt:
      "Fishing-focused raffle site with prize-led layouts and competition management built for regular launches.",
    body: `Elite Carp Competitions needed a site that feels native to the angling community while still operating like a modern e-commerce product.

We built a competition platform with prize-first layouts, clear odds and entry mechanics, and an admin experience that makes it straightforward to publish new draws. Photography and typography were tuned to match the brand's premium, specialist positioning.

The site balances excitement with clarity — helping players understand what they are entering, while giving operators the tools to run competitions confidently.`,
    cover_image_url: "/work/elite-carp-comps.webp",
    tags: ["Web", "Raffles & Competitions"],
    stats: [
      { metric: "Prize-led", label: "page layouts" },
      { metric: "Repeat", label: "campaign launches" },
    ],
    featured: false,
    sort_order: 4,
    published: true,
    published_at: new Date("2024-06-01"),
  },
  {
    slug: "bella-comps",
    title: "Bella Comps",
    client_name: "Bella Competitions",
    excerpt:
      "A competition storefront designed for conversion, with clean navigation and a trustworthy checkout experience.",
    body: `Bella Competitions wanted a professional competition presence that could scale with new prize lines and seasonal campaigns.

We delivered a custom website with structured competition pages, responsive merchandising of prizes, and a purchase flow optimized for mobile users arriving from ads and social posts. Content areas were designed so the team can highlight winners, FAQs, and compliance information without developer involvement.

The build focuses on credibility and speed — two factors that matter most when convincing someone to buy their first ticket.`,
    cover_image_url: "/work/bella-comps.jpg",
    tags: ["Web", "Raffles & Competitions"],
    stats: [
      { metric: "Conversion", label: "focused UX" },
      { metric: "Self-serve", label: "content updates" },
    ],
    featured: false,
    sort_order: 5,
    published: true,
    published_at: new Date("2025-06-01"),
  },
  {
    slug: "sanjha-chulha",
    title: "Sanjha Chulha",
    client_name: "Sanjha Chulha",
    excerpt:
      "Restaurant website for a local Georgian brand — menu discovery, atmosphere, and reservations in one place.",
    body: `Sanjha Chulha is a local restaurant that needed a website as warm and inviting as the dining room itself.

We designed a bilingual-friendly layout that showcases signature dishes, opening hours, location, and contact options without overwhelming visitors. Photography-led sections communicate the restaurant's character, while practical information stays easy to find on mobile — where most diners search before they visit.

The site gives the business a credible digital front door and a simple way to keep menus and announcements current.`,
    cover_image_url: "/work/sanjha-chulha.png",
    tags: ["Web", "Hospitality"],
    stats: [
      { metric: "Local", label: "restaurant brand" },
      { metric: "Mobile", label: "menu discovery" },
    ],
    featured: false,
    sort_order: 6,
    published: true,
    published_at: new Date("2024-10-01"),
  },
  {
    slug: "glutie-wear",
    title: "Glutie Wear",
    client_name: "Glutie Activewear",
    excerpt:
      "Online sportswear store with product-focused layouts and a shopping experience built for repeat buyers.",
    body: `Glutie Activewear needed an e-commerce site that could present collections clearly and support growth beyond a single product line.

We built a storefront with strong category navigation, product detail pages that highlight fit and fabric, and a checkout path designed to reduce friction on mobile. Visual design emphasizes the brand's athletic positioning while keeping load times practical for international shoppers.

The platform gives Glutie a foundation to expand catalogues, run promotions, and present the brand consistently across campaigns.`,
    cover_image_url: "/work/glutie-wear.webp",
    tags: ["Web", "E-commerce"],
    stats: [
      { metric: "Catalog", label: "ready storefront" },
      { metric: "Brand-led", label: "sportswear UX" },
    ],
    featured: false,
    sort_order: 7,
    published: true,
    published_at: new Date("2024-03-01"),
  },
  {
    slug: "super-dealer",
    title: "Super Dealer",
    client_name: "Super Dealer SARL",
    excerpt:
      "Business website for a printers and ink supplier, structured for product discovery and lead generation.",
    body: `Super Dealer required a professional web presence that helps B2B and retail customers find printers, consumables, and support quickly.

We designed a clear information architecture with service highlights, product categories, and contact pathways suited to a technical buyer audience. The layout works equally well for first-time visitors researching options and returning customers looking for supplies.

The site reinforces trust for a specialized trade business and makes it easier for the team to communicate offers and availability.`,
    cover_image_url: "/work/super-dealer.webp",
    tags: ["Web", "B2B"],
    stats: [
      { metric: "B2B", label: "product discovery" },
      { metric: "Lead-gen", label: "contact flows" },
    ],
    featured: false,
    sort_order: 8,
    published: true,
    published_at: new Date("2024-03-01"),
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
    cover_image_url: "/work/hooked-online.webp",
    tags: ["Web", "E-commerce"],
    stats: [
      { metric: "AU", label: "fishing retail" },
      { metric: "Category-led", label: "navigation" },
    ],
    featured: false,
    sort_order: 9,
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
    cover_image_url: "/work/socialite-life.webp",
    tags: ["Web", "Publishing"],
    stats: [
      { metric: "Editorial", label: "article templates" },
      { metric: "Social", label: "sharing ready" },
    ],
    featured: false,
    sort_order: 10,
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
    cover_image_url: "/work/bonnie-plants.webp",
    tags: ["Web", "E-commerce"],
    stats: [
      { metric: "Seasonal", label: "merchandising" },
      { metric: "Garden", label: "retail UX" },
    ],
    featured: false,
    sort_order: 11,
    published: true,
    published_at: new Date("2024-03-01"),
  },
];

export const legacyCaseStudySlugs = [
  "northstar",
  "loop-health",
  "fieldnote",
  "currency-co",
];
