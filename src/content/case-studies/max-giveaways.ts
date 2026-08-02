import type { CaseStudyDetail } from "@/content/case-studies/types";

export const maxGiveawaysCaseStudy: CaseStudyDetail = {
  slug: "max-giveaways",
  liveUrl: "https://maxgiveaways.co.uk/",
  liveUrlLabel: "Visit Max Giveaways",
  heroAccent: "UK prize competition platform",
  overviewLead:
    "Max Giveaways is a high-energy UK competition brand, built for live Facebook draws, instant-win campaigns, and ticket prices from 2p, with a story that puts purpose at the centre of every prize.",
  overviewBody: [
    "Operated by Maxwell's Comp Shop Ltd (Company No. 16415869), the platform runs everything from featured prize grids and instant-win mechanics to winner galleries, live-draw promotion, and a player account hub.",
    "We designed and developed the experience end to end: the dark-mode storefront, competition detail flows, checkout, winner showcase, and the content areas that tell Max's story, including a £10-per-competition donation to Epilepsy Action.",
  ],
  challenge: {
    title: "The brief",
    paragraphs: [
      "Max Giveaways needed more than a template competition site. The brand is loud, personal, and community-driven, players discover draws through Facebook live streams and expect to enter in seconds on mobile.",
      "Behind the scenes, the operator needed to run dozens of simultaneous campaigns: instant wins alongside traditional live draws, price filters for bargain hunters, cash alternatives on physical prizes, and trust signals (Trustpilot, company details, responsible play) without slowing down launch velocity.",
    ],
  },
  solution: {
    title: "What we delivered",
    paragraphs: [
      "A custom competition platform with a cinematic dark UI, orange-accent branding, and flows tuned for repeat play. From 2p instant-win machines to headline prizes with live-draw countdowns.",
      "The result is a storefront that feels premium and urgent, plus the operational depth to publish competitions quickly, surface winners publicly, and keep players engaged between draw nights.",
    ],
  },
  stats: [
    { metric: "2p+", label: "ticket entry point" },
    { metric: "Live draws", label: "streamed on Facebook" },
    { metric: "£10", label: "donated per competition" },
    { metric: "Instant win", label: "campaigns supported" },
  ],
  screenshots: [
    {
      src: "/work/max-giveaways/homepage.png",
      alt: "Max Giveaways homepage with hero crown graphic and featured competitions",
      caption: "Homepage",
      title: "Homepage & featured draws",
      description:
        "A bold hero with live community messaging, Trustpilot social proof, and a featured competition grid with price-range filters and sort controls, designed to convert mobile traffic from Facebook pushes.",
    },
    {
      src: "/work/max-giveaways/competition-detail.png",
      alt: "Max Giveaways competition detail page for a Deeper Chirp+ 3 prize draw",
      caption: "Competition detail",
      title: "Prize detail & ticket purchase",
      description:
        "Each draw gets a dedicated landing page with hero imagery, ticket pricing, countdown timer, sold-ticket progress, cash-alternative callouts, and the qualifying question built into the purchase path.",
    },
    {
      src: "/work/max-giveaways/competitions.png",
      alt: "Max Giveaways current competitions listing page",
      caption: "All competitions",
      title: "Competition catalogue",
      description:
        "The full active-draw catalogue with filtering by price band, ending soon, and sort order, so players can browse everything live without hunting through social posts.",
    },
    {
      src: "/work/max-giveaways/instant-win.png",
      alt: "Max Giveaways instant win competition with MX Milwaukee Tool Takeover prizes",
      caption: "Instant win",
      title: "Instant-win campaigns",
      description:
        "Dedicated instant-win layouts for high-volume micro-prize campaigns, tool bundles, cash explosions, lucky dips, and 2p treat machines that reveal outcomes immediately after purchase.",
    },
    {
      src: "/work/max-giveaways/winners.png",
      alt: "Max Giveaways previous winners gallery",
      caption: "Winners gallery",
      title: "Previous winners",
      description:
        "A public winners gallery that builds trust for first-time players, showing real names, prizes, and draw dates so the community can see results without leaving the site.",
    },
    {
      src: "/work/max-giveaways/our-story.png",
      alt: "Max Giveaways Our Story page about Maxwell and Epilepsy Action donations",
      caption: "Our Story",
      title: "Brand story & purpose",
      description:
        "The Our Story page shares Max's journey. From Maxwell's Croc Shop to a competition brand with purpose, and highlights the £10-per-competition donation to Epilepsy Action.",
    },
    {
      src: "/work/max-giveaways/auth.png",
      alt: "Max Giveaways login and registration page",
      caption: "Account access",
      title: "Registration & login",
      description:
        "A streamlined auth screen with dark-mode styling consistent across the platform, quick sign-up for new players arriving from live draws and social campaigns.",
    },
  ],
  features: [
    {
      icon: "ticket",
      title: "Skill-based entry flow",
      description:
        "Qualifying questions on every competition with ticket caps and clear pricing, structured for UK skill-based draws while keeping checkout fast on mobile.",
    },
    {
      icon: "instant",
      title: "Instant-win engine",
      description:
        "High-volume instant-win campaigns with immediate outcomes, cash prizes, tool bundles, lucky dips, and micro-entry formats from 2p upward.",
    },
    {
      icon: "draw",
      title: "Live Facebook draws",
      description:
        "Live-draw promotion built into the homepage and winner flows, players are directed to watch results announced in real time on Facebook.",
    },
    {
      icon: "wallet",
      title: "Cash alternatives",
      description:
        "Physical prizes paired with cash options on competition pages, so winners can choose what suits them without extra admin.",
    },
    {
      icon: "loyalty",
      title: "Featured competition grid",
      description:
        "Homepage merchandising with price filters, sort controls, and ending-soon highlights, surfacing the right draw to bargain hunters and big-prize chasers alike.",
    },
    {
      icon: "account",
      title: "Player account hub",
      description:
        "Login, registration, cart, and account management in one cohesive dark UI, with theme toggle for player preference.",
    },
    {
      icon: "referral",
      title: "Community & social proof",
      description:
        "Trustpilot integration, Facebook community links, and a public winners gallery, trust signals where first-time players need them most.",
    },
    {
      icon: "compliance",
      title: "Purpose-driven brand",
      description:
        "Our Story content and £10-per-competition charity donations to Epilepsy Action, turning every ticket into part of a bigger mission.",
    },
    {
      icon: "admin",
      title: "Operator-ready CMS",
      description:
        "Competition publishing, winner management, FAQ and contact content, built so the team can launch campaigns without developer hand-holding.",
    },
  ],
  playerSteps: [
    {
      step: "01",
      title: "Browse the draws",
      description:
        "Land on featured competitions from Facebook or the homepage grid, filter by price, sort by ending soon, and pick a prize that stands out.",
    },
    {
      step: "02",
      title: "Get your tickets",
      description:
        "Open a competition, choose your ticket quantity, answer the skill question, and add to cart, instant-win or live-draw, same fast flow.",
    },
    {
      step: "03",
      title: "Checkout securely",
      description:
        "Register or log in, review your order, and pay, with a cart that persists across sessions and clear pricing before you confirm.",
    },
    {
      step: "04",
      title: "Watch the result",
      description:
        "Instant wins reveal immediately; live draws stream on Facebook with winners published to the on-site gallery afterwards.",
    },
  ],
  adminHighlights: [
    "Competition lifecycle from draft to drawn, with instant-win and live-draw types",
    "Featured grid merchandising with price filters and sort options",
    "Winner gallery publishing and draw result management",
    "FAQ, Our Story, and contact content editable without code changes",
    "Trustpilot and social link integration across the storefront",
    "Dark/light theme support with consistent brand styling",
  ],
  techStack: [
    "CodeIgniter 4",
    "PHP 8.1+",
    "MySQL",
    "REST API",
    "Payment gateway",
    "Bootstrap 5",
    "Redis caching",
    "Facebook live integration",
  ],
  results: [
    { metric: "£10", label: "donated per competition" },
    { metric: "2p+", label: "minimum ticket price" },
    { metric: "Instant + live", label: "draw formats" },
    { metric: "Full-stack", label: "custom platform build" },
  ],
  quote: {
    text: "A competition brand with real personality, live draws, instant wins, and a purpose story woven into every campaign.",
    attribution: "Hostyler project summary",
  },
};
