import type { CaseStudyDetail } from "@/content/case-studies/types";

export const competitionGoCaseStudy: CaseStudyDetail = {
  slug: "competitiongo",
  liveUrl: "https://competitiongo.co.uk/",
  liveUrlLabel: "Visit CompetitionGo",
  heroAccent: "UK prize competition platform",
  overviewLead:
    "CompetitionGo is a full-scale UK skill-based competition platform — built to sell tickets from 10p, run live draws twice a week, and keep players coming back through wallets, referrals, and gamified prize reveals.",
  overviewBody: [
    "Operated by CompetitionGo Ltd (Company No. 13200620), the platform handles everything from qualifying-question entry and multi-competition checkout to instant wins, prize fulfilment, and a multi-role admin back office.",
    "We designed and developed the experience end to end: the public storefront, account hub, payment routing, loyalty mechanics, and operational tooling the team relies on every draw night.",
  ],
  challenge: {
    title: "The brief",
    paragraphs: [
      "Competition sites live or die on trust and speed. Players need to understand the prize, answer a skill question, and checkout in seconds — especially on mobile during a live draw push from Facebook or YouTube.",
      "Behind the storefront, the business needed far more than a brochure site: ticket inventory with caps, wallet balances split between cash and site credit, referral commissions, instant-win reveals, accounting that reconciles card vs wallet revenue, and admin workflows that don't break when volume spikes on a Wednesday night.",
    ],
  },
  solution: {
    title: "What we delivered",
    paragraphs: [
      "A custom competition commerce engine — not a WordPress theme with a payment plugin. Every flow, from cart merge on login to guaranteed-winner redraws, was built for how UK competition operators actually run campaigns.",
      "The result is a polished player experience that converts first-time visitors, plus an operations layer that gives the team full control over competitions, claims, withdrawals, and reporting without developer hand-holding.",
    ],
  },
  stats: [
    { metric: "10p", label: "minimum ticket price" },
    { metric: "2× weekly", label: "live draws (Wed & Sun)" },
    { metric: "7%", label: "referral commission" },
    { metric: "2%", label: "loyalty cashback" },
  ],
  screenshots: [
    {
      src: "/work/competitiongo/competition-detail.png",
      alt: "CompetitionGo competition detail page with ticket purchase and skill question",
      caption: "Competition detail",
      title: "Competition detail page",
      description:
        "Each prize draw gets its own landing page — hero imagery, ticket pricing, a live countdown, sold-ticket progress bar, instant-win breakdown, and the qualifying skill question built into the purchase flow.",
    },
    {
      src: "/work/competitiongo/profile.png",
      alt: "CompetitionGo My Account profile tab with user details and balances",
      caption: "Player profile",
      title: "My Account — profile hub",
      description:
        "Logged-in players manage their identity from one dashboard: cash and Go Credit balances, contact details, billing address, and quick access to tickets, orders, wallet, and referrals.",
    },
    {
      src: "/work/competitiongo/cart.png",
      alt: "CompetitionGo shopping cart with competition entries and order summary",
      caption: "Shopping cart",
      title: "Multi-competition cart",
      description:
        "Players can bundle entries across draws, adjust quantities inline, and see loyalty cashback before checkout. The cart persists across sessions and merges when a guest logs in.",
    },
    {
      src: "/work/competitiongo/checkout.png",
      alt: "CompetitionGo checkout with order summary and payment options",
      caption: "Checkout",
      title: "Secure checkout",
      description:
        "A streamlined checkout with pre-filled contact details, discount codes, wallet payment options (Go Credit and cash balance), and card / Apple Pay / Google Pay via Cashflows.",
    },
    {
      src: "/work/competitiongo/referrals.png",
      alt: "CompetitionGo referrals tab showing affiliate program and referral link",
      caption: "Referrals",
      title: "Referral programme",
      description:
        "Every player gets a personal referral link with a 7% commission on referred orders. The dashboard tracks referrals, earnings, and available balance — convertible to wallet credit for repeat play.",
    },
    {
      src: "/work/competitiongo/account-control.png",
      alt: "CompetitionGo account control spending limits settings",
      caption: "Account control",
      title: "Responsible play controls",
      description:
        "Players set weekly, monthly, or longer spending limits from Account Control. Self-exclusion and account-disable options give users full control over their play — built into the platform, not bolted on.",
    },
  ],
  features: [
    {
      icon: "ticket",
      title: "Skill-based entry flow",
      description:
        "Qualifying questions on every competition, ticket caps, and per-user limits — structured to meet UK skill-based competition requirements while keeping checkout fast.",
    },
    {
      icon: "wallet",
      title: "Dual wallet system",
      description:
        "Separate cash and site-credit balances. Players can top up, pay with wallet, withdraw winnings, and split partial-wallet orders across card and balance.",
    },
    {
      icon: "instant",
      title: "Instant wins & reveals",
      description:
        "Automated prize crediting for cash and site credit, claim flows for physical prizes, and animated reveal styles (GoPop, GoDig) that make every ticket feel eventful.",
    },
    {
      icon: "draw",
      title: "Live draws & guaranteed winners",
      description:
        "Wednesday and Sunday 8PM UK draws streamed on Facebook and YouTube. If a random result hits an unsold ticket, the system redraws until a real entry wins.",
    },
    {
      icon: "referral",
      title: "Referral programme",
      description:
        "Personal referral links with 7% commission on every referred order — earnings convertible to wallet balance for repeat play.",
    },
    {
      icon: "loyalty",
      title: "Loyalty cashback",
      description:
        "2% cashback on orders, credited as spendable site credit. Built to reward repeat customers without complicating checkout.",
    },
    {
      icon: "spin",
      title: "GoSpin & GoCollect",
      description:
        "Gamified spin-the-wheel experiences and collectible leaderboard competitions that extend engagement beyond the main prize draws.",
    },
    {
      icon: "account",
      title: "My Account hub",
      description:
        "Tickets, orders, prize claims, shipping addresses, notifications, spending limits, and self-exclusion — all in one player dashboard.",
    },
    {
      icon: "compliance",
      title: "Responsible play",
      description:
        "Weekly and monthly spending limits, account pause/disable, postal free entry support, and transparent UK company details across the site.",
    },
    {
      icon: "admin",
      title: "Multi-role admin",
      description:
        "Separate admin, staff, and viewer portals with 2FA — competition lifecycle, accounting, prize claims, withdrawals, coupons, and reporting.",
    },
  ],
  playerSteps: [
    {
      step: "01",
      title: "Choose a prize",
      description:
        "Browse featured competitions with clear ticket prices, caps, and countdown timers. Mobile-first layouts surface the best draws immediately.",
    },
    {
      step: "02",
      title: "Pick your tickets",
      description:
        "Select how many entries to place. Multi-competition cart lets players bundle several draws into one checkout.",
    },
    {
      step: "03",
      title: "Answer the question",
      description:
        "A qualifying skill question gates every purchase — quick, clear, and built into the checkout path.",
    },
    {
      step: "04",
      title: "Watch the live draw",
      description:
        "Winners revealed live every Wednesday and Sunday at 8PM UK time on Facebook and YouTube — with a published winners gallery on-site.",
    },
  ],
  adminHighlights: [
    "Competition lifecycle from draft to drawn, with duplication and ticket export",
    "Per-competition P&L with revenue split by card, wallet, and site credit",
    "Instant-win templates, prize boosts, and fulfilment claim workflows",
    "Withdrawal processing, user impersonation, and balance adjustments",
    "Coupons, affiliate tracking, email templates, and marketing integrations",
    "Cron health checks, maintenance mode, and role-separated staff access",
  ],
  techStack: [
    "CodeIgniter 4",
    "PHP 8.1+",
    "MySQL",
    "REST API + JWT",
    "Cashflows payments",
    "Bootstrap 5",
    "Redis caching",
    "Klaviyo & Meta CAPI",
  ],
  results: [
    { metric: "£14k+", label: "donated to UK charities" },
    { metric: "49", label: "charities supported" },
    { metric: "Guaranteed", label: "winner every draw" },
    { metric: "Full-stack", label: "custom platform build" },
  ],
  quote: {
    text: "A competition platform that handles the full loop — from a 10p ticket purchase to live draw night accounting — without duct-taping plugins together.",
    attribution: "Hostyler project summary",
  },
};
