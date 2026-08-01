import { services } from "@/content/services";

export type ServiceTint = "violet" | "coral" | "lime";
export type ServiceVisualType = "web" | "app" | "ai";

export type ServicePage = {
  slug: string;
  serviceId: (typeof services)[number]["id"];
  tag: string;
  title: string;
  tint: ServiceTint;
  visual: ServiceVisualType;
  metaDescription: string;
  lead: string;
  overview: string[];
  greatFor: string[];
  included: string[];
  process: Array<{ step: string; title: string; description: string; duration?: string }>;
  technologies: string[];
  deliverables: string[];
  faqs: Array<{ question: string; answer: string }>;
  outcomes: Array<{ value: string; label: string }>;
  cta: string;
  homepageDescription?: string;
  reverseOnHomepage?: boolean;
  noBorderOnHomepage?: boolean;
  /** Research-first page sections (optional; used when present) */
  toc?: Array<{ id: string; label: string }>;
  snapshotStrip?: Array<{ value: string; label: string }>;
  projectTypes?: Array<{
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
  }>;
  principles?: Array<{ title: string; description: string }>;
  engagement?: {
    title: string;
    description: string;
    points: string[];
  };
  relatedWorkTag?: string;
  businessValue?: {
    headline: string;
    lead: string;
    benefits: Array<{ title: string; description: string }>;
    examples: Array<{ title: string; description: string }>;
  };
  fitSection?: {
    image: string;
    imageAlt: string;
    callout: string;
    badgeLabel?: string;
    badgeValue?: string;
  };
  projectTypesSection?: {
    headline: string;
    headlineLine2?: string;
    lead: string;
  };
  relatedWorkSection?: {
    headline: string;
    lead: string;
  };
  overviewSection?: {
    headline: string;
    headlineLine2?: string;
    lead: string;
    spotlight: {
      image: string;
      imageAlt: string;
      audiences: Array<{ tag: string; title: string; description: string }>;
    };
    paths: Array<{
      title: string;
      description: string;
      chips: string[];
      variant: "build" | "modernize";
    }>;
  };
};

export const servicePages: ServicePage[] = [
  {
    slug: "web-development",
    serviceId: "web",
    tag: "01 · WEB",
    title: "Web Development",
    tint: "violet",
    visual: "web",
    metaDescription:
      "Custom websites, SaaS dashboards, and e-commerce platforms built with Next.js — fast, SEO-ready, and easy for your team to maintain.",
    lead: "From marketing sites to full SaaS dashboards, we build web products that load fast, rank well, and stay simple for your team to maintain long after launch.",
    overview: [
      "Your website is often the first product your customers touch — and the system your team relies on every day. We treat web builds as long-term assets, not one-off campaigns. That means performance budgets, accessible UI, analytics wired in from day one, and a codebase your team can actually extend.",
      "Whether you need a conversion-focused marketing site, a customer portal, or a multi-tenant SaaS dashboard, we scope around business outcomes: signups, activation, retention, and operational efficiency. You get a dedicated team that designs, builds, and ships — without the handoffs between agencies.",
      "We work in Next.js and React for most projects, with headless CMS options when marketing needs to move fast without developer bottlenecks. Every launch includes deployment, monitoring hooks, and documentation so you are never stuck waiting on us for small updates.",
      "If you already have a site that feels slow, hard to edit, or expensive to change, we can audit it first, then rebuild or modernize the parts that matter — so you keep what works and replace what does not.",
    ],
    toc: [
      { id: "overview", label: "Overview" },
      { id: "what-we-build", label: "What we build" },
      { id: "fit", label: "Fit & scope" },
      { id: "principles", label: "How we think" },
      { id: "process", label: "Process" },
      { id: "deliverables", label: "Stack & deliverables" },
      { id: "work", label: "Related work" },
      { id: "engagement", label: "Working together" },
      { id: "faq", label: "FAQ" },
    ],
    snapshotStrip: [
      { value: "4–8 wks", label: "Typical MVP launch" },
      { value: "100%", label: "Codebase you own" },
      { value: "CMS-ready", label: "Marketing self-serve" },
      { value: "WCAG", label: "Accessibility baseline" },
    ],
    projectTypes: [
      {
        title: "Marketing sites & brand platforms",
        description:
          "High-conversion landing pages, multi-page marketing sites, and design systems that marketing can update without waiting on engineering.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        imageAlt: "Marketing website performance dashboard",
      },
      {
        title: "SaaS dashboards & portals",
        description:
          "Customer-facing apps, admin tools, billing views, and multi-tenant dashboards with auth, roles, and real product workflows.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        imageAlt: "SaaS analytics dashboard interface",
      },
      {
        title: "E-commerce & content platforms",
        description:
          "Storefronts, headless commerce, CMS-driven catalogs, and content systems built for editors — not just developers.",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        imageAlt: "E-commerce storefront on laptop",
      },
      {
        title: "Rebuilds & migrations",
        description:
          "Moving off WordPress, legacy PHP, or brittle stacks onto a modern Next.js foundation with cleaner SEO, speed, and maintainability.",
        image:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        imageAlt: "Developer reviewing code for a site migration",
      },
    ],
    principles: [
      {
        title: "Outcomes before polish",
        description:
          "We design and build against the metric that matters — leads, activation, checkout completion — not just how the page looks in a screenshot.",
      },
      {
        title: "Performance is a feature",
        description:
          "Core Web Vitals, image strategy, and caching are planned from the first sprint. Fast sites convert better and rank better.",
      },
      {
        title: "Editable by your team",
        description:
          "If marketing needs to ship pages weekly, we wire a CMS. If ops needs reports, we build the admin. You should not need us for every copy change.",
      },
      {
        title: "One team, no handoffs",
        description:
          "Design, front-end, backend, and launch sit with the same small senior team — so fewer meetings, fewer surprises, faster decisions.",
      },
    ],
    engagement: {
      title: "How engagements usually start",
      description:
        "Most web projects begin with a short discovery call, then a written scope and timeline before any build work. You always know what you are buying.",
      points: [
        "Free intro call (30–45 min) to understand goals, constraints, and timeline",
        "Written proposal with scope, stack, milestones, and fixed or phased pricing",
        "Kickoff with access, brand assets, and a shared project board",
        "Weekly demos — you see working product, not status slides",
        "Launch checklist, handoff docs, and a post-launch support window",
      ],
    },
    relatedWorkTag: "Web",
    overviewSection: {
      headline: "A product you own,",
      headlineLine2: "not a one-off campaign.",
      lead:
        "We treat every web build as infrastructure your business runs on — fast for users, editable for your team, and maintainable long after launch day.",
      spotlight: {
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=80",
        imageAlt: "Developer workspace building a web product",
        audiences: [
          {
            tag: "For customers",
            title: "The first product they touch",
            description:
              "Fast pages, clear flows, and a brand experience that builds trust before anyone talks to sales.",
          },
          {
            tag: "For your team",
            title: "The system you run on every day",
            description:
              "A codebase, CMS, and analytics stack your people can extend — without filing a ticket for every copy change.",
          },
        ],
      },
      paths: [
        {
          title: "Greenfield builds",
          description:
            "We work in Next.js and React for most projects, with headless CMS options when marketing needs to move fast without developer bottlenecks.",
          chips: ["Next.js", "Headless CMS", "Deploy & monitor", "Handoff docs"],
          variant: "build",
        },
        {
          title: "Rebuilds & audits",
          description:
            "If your site feels slow, hard to edit, or expensive to change, we audit first — then modernize only the parts that matter.",
          chips: ["Performance audit", "Phased migration", "Keep what works"],
          variant: "modernize",
        },
      ],
    },
    fitSection: {
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80",
      imageAlt: "Team collaborating on a web project",
      callout: "If two or more of these sound like you, we should talk.",
      badgeLabel: "Typical yes",
      badgeValue: "Startups → Scale-ups",
    },
    projectTypesSection: {
      headline: "Four kinds of web work",
      headlineLine2: "we do often.",
      lead:
        "Not every project needs everything below — most start with one clear product surface and grow from there.",
    },
    relatedWorkSection: {
      headline: "Web projects we have shipped.",
      lead: "A few examples so you can see the kind of product this service produces.",
    },
    greatFor: [
      "Startups launching a landing page or first website",
      "E-commerce brands migrating off a legacy platform",
      "SaaS companies building a customer-facing dashboard",
      "Teams that need a CMS-powered marketing site",
      "B2B companies replacing a slow WordPress stack",
      "Founders who need a credible web presence before fundraising",
    ],
    included: [
      "Custom design & UI system",
      "Next.js / React front-end",
      "Headless CMS integration",
      "SEO & analytics wired in from day one",
      "Core Web Vitals & performance tuning",
      "Deployment & hosting setup",
      "Responsive layouts for all screen sizes",
      "Accessibility baseline (WCAG-oriented)",
      "Handoff docs & component library",
    ],
    process: [
      {
        step: "01",
        title: "Discovery & architecture",
        duration: "1–2 weeks",
        description:
          "We map user journeys, content structure, integrations, and technical constraints. You get a clear scope, timeline, and stack recommendation before design starts.",
      },
      {
        step: "02",
        title: "Design & prototyping",
        duration: "1–3 weeks",
        description:
          "High-fidelity UI in your brand system, with key flows prototyped for feedback. We validate conversion paths and content hierarchy early.",
      },
      {
        step: "03",
        title: "Build & integrate",
        duration: "3–8 weeks",
        description:
          "Component-driven development with weekly demos. CMS, auth, payments, and third-party APIs are integrated as we go — not bolted on at the end.",
      },
      {
        step: "04",
        title: "Launch & optimize",
        duration: "1 week + support",
        description:
          "Staging review, performance audit, SEO checks, and production deployment. We monitor Core Web Vitals and fix regressions in the first weeks after launch.",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Sanity / Contentful",
      "PostgreSQL",
      "Vercel",
      "Stripe",
    ],
    deliverables: [
      "Production-ready web application",
      "Design system & component library",
      "CMS schema & editor training",
      "SEO metadata & sitemap setup",
      "Analytics events & conversion tracking",
      "Deployment pipeline & environment config",
      "Technical documentation for your team",
    ],
    faqs: [
      {
        question: "How long does a typical web project take?",
        answer:
          "A focused marketing site usually ships in 4–8 weeks. SaaS dashboards or e-commerce migrations typically run 8–16 weeks depending on integrations and custom logic. We give you a fixed timeline after discovery — not a range that keeps slipping.",
      },
      {
        question: "Can you work with our existing brand or design files?",
        answer:
          "Yes. We can implement from your Figma files, extend an existing design system, or create net-new UI that matches your brand guidelines. If you only have a logo and colors, we can build the system from there.",
      },
      {
        question: "Do you handle hosting and DevOps?",
        answer:
          "We set up hosting (usually Vercel or your cloud provider), CI/CD, staging environments, and monitoring. You own the accounts — we configure and document everything so you are never locked in.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Every project includes a post-launch support window for bugs and questions. After that, most clients move to a light retainer for updates, A/B tests, and new pages — or call us back for the next phase.",
      },
      {
        question: "Will we own the code and design?",
        answer:
          "Yes. Source code, design files, and documentation are yours. We prefer open, transferable handoffs — not proprietary lock-in.",
      },
      {
        question: "What do you need from us to start?",
        answer:
          "Goals and success metrics, brand assets (or permission to create them), access to existing tools (domain, analytics, CMS), and a point person who can give feedback within a few days of each demo.",
      },
    ],
    outcomes: [
      { value: "< 2s", label: "Target LCP on key pages" },
      { value: "90+", label: "Lighthouse performance goal" },
      { value: "1 team", label: "Design through deployment" },
    ],
    cta: "Start a web project",
  },
  {
    slug: "app-development",
    serviceId: "app",
    tag: "02 · APP",
    title: "App Development",
    tint: "coral",
    visual: "app",
    metaDescription:
      "iOS and Android apps with React Native or native stacks — onboarding, push notifications, offline mode, and App Store launch included.",
    lead: "Native-feeling apps for iOS, Android, and the web from a single codebase — so you ship on every platform without tripling your engineering cost.",
    homepageDescription:
      "Native-feeling apps for iOS, Android, and the web from a single codebase — so you ship on every platform without tripling your engineering cost.",
    reverseOnHomepage: true,
    overview: [
      "Mobile users expect speed, polish, and reliability — not a wrapped website. We build apps that feel at home on iOS and Android: smooth navigation, thoughtful onboarding, push notifications, offline support, and payments that just work.",
      "For most startups, React Native is the right balance of speed and quality — one codebase, two stores, shared logic with your web product. When performance or platform-specific features demand it, we go native with Swift and Kotlin.",
      "We handle the unglamorous work that kills app projects: App Store review guidelines, crash reporting, analytics, release trains, and post-launch update cycles. You focus on product; we get you through submission and into users' hands.",
    ],
    snapshotStrip: [
      { value: "2 stores", label: "iOS + Android from one build" },
      { value: "4–12 wks", label: "Typical MVP timeline" },
      { value: "99.5%", label: "Crash-free session target" },
      { value: "1 team", label: "Design through App Store" },
    ],
    projectTypes: [
      {
        title: "Consumer mobile apps",
        description:
          "Onboarding, feeds, profiles, payments, and push — polished UX for apps people open every day.",
        image:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
        imageAlt: "Person using a consumer mobile app",
      },
      {
        title: "Marketplace & two-sided apps",
        description:
          "Buyer and seller flows, messaging, ratings, and role-based experiences across iOS and Android.",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        imageAlt: "Mobile marketplace app interface",
      },
      {
        title: "Field, delivery & logistics",
        description:
          "Offline-first tools for drivers, technicians, and field teams — GPS, camera, and sync when signal returns.",
        image:
          "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80",
        imageAlt: "Delivery driver using a logistics app",
      },
      {
        title: "App rescues & rewrites",
        description:
          "Stabilize a flaky codebase, fix store rejections, and ship a sustainable release cadence before adding features.",
        image:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
        imageAlt: "Developer debugging a mobile application",
      },
    ],
    principles: [
      {
        title: "Native feel, shared code",
        description:
          "We optimize for platform conventions — gestures, navigation, haptics — while keeping one codebase where it makes sense.",
      },
      {
        title: "Offline is not optional",
        description:
          "Spotty connectivity is the norm. We design data layers and UI states that work without a perfect network.",
      },
      {
        title: "Ship through the stores",
        description:
          "Screenshots, privacy labels, review notes, and phased rollouts are part of the build — not a surprise at the end.",
      },
      {
        title: "Measure what breaks",
        description:
          "Crash reporting, session analytics, and release health dashboards are wired in before you scale acquisition.",
      },
    ],
    engagement: {
      title: "How app engagements usually start",
      description:
        "Most app projects begin with platform strategy and MVP scope — then a written plan before design or development starts.",
      points: [
        "Intro call to define platforms, timeline, and must-have v1 features",
        "Written scope with stack recommendation (React Native vs native)",
        "Figma flows for onboarding and core actions before code",
        "Weekly TestFlight / internal Android builds — real devices, not emulators only",
        "Store submission support and post-launch release playbook",
      ],
    },
    businessValue: {
      headline: "Why mobile apps grow your business",
      lead:
        "A dedicated app keeps your brand in your customer's pocket — driving repeat visits, faster actions, and loyalty that a mobile website alone cannot match.",
      benefits: [
        {
          title: "Always within reach",
          description:
            "Home screen presence, push notifications, and faster repeat access mean customers come back without searching or re-entering payment details every time.",
        },
        {
          title: "Higher engagement and retention",
          description:
            "Apps support personalised experiences, saved preferences, and in-app messaging — keeping users active longer than mobile web alone.",
        },
        {
          title: "New revenue channels",
          description:
            "Subscriptions, in-app purchases, bookings, and loyalty programmes are easier to deliver natively with smoother checkout and fewer drop-offs.",
        },
        {
          title: "Operational efficiency",
          description:
            "Field teams, drivers, and staff get offline-capable tools with camera, GPS, and real-time sync — replacing paper, WhatsApp, and manual updates.",
        },
      ],
      examples: [
        {
          title: "Customer loyalty & reorder apps",
          description:
            "Let repeat buyers reorder in two taps, track deliveries, and receive offers through push — ideal for retail, food, and service businesses.",
        },
        {
          title: "Booking & appointment apps",
          description:
            "Salons, clinics, and service providers reduce no-shows with reminders, calendar sync, and easy rescheduling from the phone.",
        },
        {
          title: "Marketplace & on-demand apps",
          description:
            "Connect buyers and sellers or riders and customers with messaging, ratings, payments, and role-based experiences on both sides.",
        },
        {
          title: "Internal staff & field apps",
          description:
            "Give teams checklists, photo capture, inventory updates, and job tracking that works offline and syncs when connectivity returns.",
        },
        {
          title: "Companion apps for web products",
          description:
            "Extend your SaaS or e-commerce platform with mobile notifications, quick actions, and features that make sense on the go.",
        },
        {
          title: "Store-ready MVPs",
          description:
            "Launch a focused v1 on the App Store and Play Store with analytics, crash reporting, and a release plan built in from day one.",
        },
      ],
    },
    overviewSection: {
      headline: "In their pocket,",
      headlineLine2: "not in a browser tab.",
      lead:
        "We build mobile products that earn a home screen spot — fast, reliable, and ready for the App Store and Play Store from day one.",
      spotlight: {
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&q=80",
        imageAlt: "Mobile app interface on smartphone",
        audiences: [
          {
            tag: "For users",
            title: "An app they actually open",
            description:
              "Smooth onboarding, push that matters, and flows designed for thumbs — not a responsive website in disguise.",
          },
          {
            tag: "For your team",
            title: "One codebase, two stores",
            description:
              "Shared logic with your web product where it helps — without sacrificing the polish people expect on iOS and Android.",
          },
        ],
      },
      paths: [
        {
          title: "Greenfield apps",
          description:
            "React Native or native Swift/Kotlin — we pick the stack for your timeline, team, and platform requirements.",
          chips: ["React Native", "Push & offline", "Payments", "Store launch"],
          variant: "build",
        },
        {
          title: "Rescues & takeovers",
          description:
            "Inherited a buggy app or stuck in review hell? We audit, stabilize, and get you shipping again on a sane cadence.",
          chips: ["Code audit", "Crash fixes", "Review support", "Release train"],
          variant: "modernize",
        },
      ],
    },
    fitSection: {
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
      imageAlt: "Product team reviewing a mobile app prototype",
      callout: "Building for phones first? These are the projects we say yes to most.",
      badgeLabel: "Store ready",
      badgeValue: "iOS + Android",
    },
    projectTypesSection: {
      headline: "Four kinds of app work",
      headlineLine2: "we ship often.",
      lead:
        "Most teams start with one core flow — then expand to new roles, platforms, or offline features.",
    },
    greatFor: [
      "Startups launching their first mobile app",
      "Consumer products needing push & offline mode",
      "Marketplaces with buyer and seller apps",
      "Field, delivery, or logistics apps",
      "SaaS products extending to mobile",
      "Teams replacing a slow or buggy existing app",
    ],
    included: [
      "React Native or native Swift / Kotlin",
      "Offline-first data sync",
      "Push notifications, payments & auth",
      "App Store & Play Store submission",
      "Crash monitoring & analytics",
      "Post-launch update cycles",
      "Deep linking & universal links",
      "Biometric login & secure storage",
      "Beta distribution via TestFlight / internal track",
    ],
    process: [
      {
        step: "01",
        title: "Product & platform strategy",
        duration: "1–2 weeks",
        description:
          "We define MVP scope, platform priorities (iOS first vs simultaneous), and the right stack. API contracts and data models are agreed before UI work.",
      },
      {
        step: "02",
        title: "UX flows & UI design",
        duration: "2–3 weeks",
        description:
          "Screen-by-screen flows for onboarding, core actions, and edge cases. We design for thumbs, notifications, and intermittent connectivity from the start.",
      },
      {
        step: "03",
        title: "Development & device testing",
        duration: "4–10 weeks",
        description:
          "Sprint-based builds with TestFlight and internal Android tracks. Real-device QA across screen sizes, OS versions, and network conditions.",
      },
      {
        step: "04",
        title: "Store submission & growth",
        duration: "1–2 weeks + support",
        description:
          "App Store and Play Store assets, review support, and phased rollout. Analytics and crash tools configured before you scale marketing spend.",
      },
    ],
    technologies: [
      "React Native",
      "Expo",
      "Swift",
      "Kotlin",
      "Firebase",
      "RevenueCat",
      "OneSignal",
      "Sentry",
    ],
    deliverables: [
      "Production iOS and Android builds",
      "App Store & Play Store listings",
      "Push notification infrastructure",
      "Offline sync & local storage layer",
      "Analytics & crash reporting dashboard",
      "Release playbook for future updates",
      "API integration documentation",
    ],
    faqs: [
      {
        question: "React Native or fully native — which do you recommend?",
        answer:
          "React Native fits most B2C and B2B apps where speed-to-market matters. We recommend native Swift/Kotlin when you need heavy graphics, complex Bluetooth/hardware integration, or platform-exclusive features at scale.",
      },
      {
        question: "Do you build the backend too?",
        answer:
          "Yes. We often build the API and admin tools alongside the app, or integrate with your existing backend. One team owns the full stack.",
      },
      {
        question: "How do App Store submissions work?",
        answer:
          "We prepare screenshots, metadata, privacy labels, and review notes. We have been through hundreds of submissions and know how to avoid common rejection reasons.",
      },
      {
        question: "Can you take over an existing app?",
        answer:
          "We audit the codebase, fix critical issues, and plan a sustainable release cadence. Rescue projects are common — we start with stability, then ship features.",
      },
      {
        question: "How long until we're in the App Store?",
        answer:
          "A focused MVP typically reaches TestFlight in 4–6 weeks and store submission in 8–12 weeks. Complex marketplaces or offline-heavy apps run longer — we lock timeline after discovery.",
      },
      {
        question: "What do you need from us to start?",
        answer:
          "MVP feature list, brand assets, Apple/Google developer accounts (or willingness to create them), and a product owner who can review builds within a few days each sprint.",
      },
    ],
    outcomes: [
      { value: "2 stores", label: "One codebase, iOS + Android" },
      { value: "4–12 wk", label: "Typical MVP timeline" },
      { value: "99.5%", label: "Crash-free session target" },
    ],
    cta: "Start an app project",
  },
  {
    slug: "ai-automation",
    serviceId: "ai",
    tag: "03 · AI",
    title: "AI & Automation",
    tint: "lime",
    visual: "ai",
    metaDescription:
      "Production AI features and workflow automation — RAG, agents, evals, and cost monitoring built on your data, not generic demos.",
    lead: "Custom AI features and internal automations that save your team real hours every week — grounded in your own data, and evaluated before they ever ship.",
    homepageDescription:
      "Custom AI features and internal automations that save your team real hours every week — grounded in your own data, and evaluated before they ever ship.",
    noBorderOnHomepage: true,
    overview: [
      "Most AI projects fail because they stop at the demo. We build features that survive production: grounded on your documents and data, guarded against hallucinations, measured with evals, and monitored for cost and quality as usage grows.",
      "That might mean a support copilot that drafts replies from your help center, an internal search tool across contracts and wikis, automated reporting pipelines, or AI-powered workflows that replace hours of manual ops work each week.",
      "We scope AI work like any other engineering project — clear inputs, outputs, success metrics, and rollback plans. You get working software with observability, not a slide deck about what GPT could do someday.",
    ],
    snapshotStrip: [
      { value: "40%+", label: "Typical ticket deflection" },
      { value: "Evals", label: "Before every ship" },
      { value: "Your data", label: "Never trains public models" },
      { value: "24/7", label: "Automated workflows" },
    ],
    projectTypes: [
      {
        title: "Support & customer copilots",
        description:
          "Draft replies from your help center, suggest macros, and route edge cases — with citations and human review for high-stakes answers.",
        image:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
        imageAlt: "AI-assisted customer support workflow",
      },
      {
        title: "Internal search & knowledge bases",
        description:
          "RAG over wikis, contracts, and tickets so teams find answers in seconds — not by paging through Slack or SharePoint.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        imageAlt: "Internal knowledge search dashboard",
      },
      {
        title: "Ops & reporting automation",
        description:
          "Scheduled pipelines that extract, summarize, and route data — replacing manual exports and spreadsheet gymnastics.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        imageAlt: "Automated business reporting dashboard",
      },
      {
        title: "Product-embedded AI features",
        description:
          "Search, recommendations, and generation inside your app — behind feature flags, with evals and cost controls from day one.",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        imageAlt: "AI feature embedded in a software product",
      },
    ],
    principles: [
      {
        title: "Grounded, not generic",
        description:
          "Every answer cites your data. Generic chatbot wrappers are demos — we build retrieval and guardrails around your content.",
      },
      {
        title: "Evaluated before launch",
        description:
          "Test suites built from your real tickets, docs, and edge cases. We catch regressions before users do.",
      },
      {
        title: "Cost-aware by design",
        description:
          "Caching, routing, and budgets are planned during prototyping — not discovered when the invoice arrives.",
      },
      {
        title: "Observable in production",
        description:
          "Latency, quality, spend, and failure modes are tracked in dashboards your team can actually use.",
      },
    ],
    engagement: {
      title: "How AI engagements usually start",
      description:
        "We begin with a use-case and data audit — then a prototype with evals before anything touches production traffic.",
      points: [
        "Discovery call to map workflows, data sources, and success metrics",
        "Data access review and ROI estimate (time saved, deflection, accuracy)",
        "Prototype on a representative dataset with eval suite",
        "Production integration behind feature flags with rollback plan",
        "Monitoring dashboard and tuning window after launch",
      ],
    },
    businessValue: {
      headline: "Why AI and automation belong in your business",
      lead:
        "The right AI features save hours every week, speed up decisions, and improve customer experience — when they are grounded in your data and built for production, not demos.",
      benefits: [
        {
          title: "Reduce repetitive work",
          description:
            "Automate ticket triage, data entry, report generation, and document review so your team focuses on work that needs human judgment.",
        },
        {
          title: "Faster answers for customers",
          description:
            "Support copilots and knowledge search help agents and customers find accurate answers in seconds — with citations from your own content.",
        },
        {
          title: "Smarter product experiences",
          description:
            "Add search, recommendations, summarisation, and generation inside your app — features users expect from modern software.",
        },
        {
          title: "Measurable ROI",
          description:
            "We define success metrics upfront — time saved, deflection rate, accuracy, and cost per task — so you know whether the investment pays off.",
        },
      ],
      examples: [
        {
          title: "Support copilots",
          description:
            "Draft replies from your help centre, suggest macros, and route complex cases — with human review for high-stakes answers.",
        },
        {
          title: "Internal knowledge search",
          description:
            "Search across wikis, contracts, SOPs, and tickets so teams stop digging through Slack threads and shared drives.",
        },
        {
          title: "Sales & proposal automation",
          description:
            "Generate first drafts of proposals, summarise CRM notes, and pull relevant case studies for outbound teams.",
        },
        {
          title: "Ops & reporting pipelines",
          description:
            "Scheduled workflows that extract, summarise, classify, and route data — replacing manual exports and spreadsheet work.",
        },
        {
          title: "Document processing",
          description:
            "Extract fields from invoices, contracts, and forms; flag anomalies; and push structured data into your systems.",
        },
        {
          title: "Product-embedded AI",
          description:
            "Add AI search, assistants, and generation inside your SaaS — behind feature flags with evals and cost controls from day one.",
        },
      ],
    },
    overviewSection: {
      headline: "Intelligence that survives",
      headlineLine2: "real users.",
      lead:
        "Demos are easy. We scope, evaluate, and monitor every AI feature like any other part of your stack — so it still works when traffic spikes.",
      spotlight: {
        image:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&q=80",
        imageAlt: "AI workflow integrated into a business tool",
        audiences: [
          {
            tag: "For users",
            title: "Answers they can trust",
            description:
              "Grounded responses with citations — not confident hallucinations. High-stakes outputs go through human review.",
          },
          {
            tag: "For your team",
            title: "Hours back every week",
            description:
              "Automations that replace repetitive ops work — with clear metrics on time saved, accuracy, and cost per task.",
          },
        ],
      },
      paths: [
        {
          title: "New AI features",
          description:
            "Copilots, search, and generation built on your data — with RAG pipelines, evals, and guardrails before launch.",
          chips: ["RAG", "Eval suites", "Guardrails", "Cost controls"],
          variant: "build",
        },
        {
          title: "Integrate into your product",
          description:
            "Add AI to an existing app via your APIs and auth — feature-flagged rollout with monitoring from the first user.",
          chips: ["Feature flags", "Your VPC", "Slack / Zendesk", "Dashboards"],
          variant: "modernize",
        },
      ],
    },
    fitSection: {
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80",
      imageAlt: "Team reviewing AI automation workflow",
      callout: "If manual work is eating your team's week, there's probably an automation here.",
      badgeLabel: "ROI focus",
      badgeValue: "Ops + Support",
    },
    projectTypesSection: {
      headline: "Four kinds of AI work",
      headlineLine2: "we productionize.",
      lead:
        "We start with one high-ROI workflow — then expand once quality and cost are proven in production.",
    },
    greatFor: [
      "Support teams drowning in repetitive tickets",
      "Ops teams doing manual data entry or reporting",
      "Products that want AI search or recommendations",
      "Internal tools needing document or voice processing",
      "Sales teams needing proposal and CRM automation",
      "Companies with proprietary data that generic chatbots cannot use",
    ],
    included: [
      "LLM-powered chat, search & generation",
      "Retrieval-augmented generation (RAG)",
      "Internal workflow automation",
      "Model evaluation & guardrails before launch",
      "Usage monitoring & cost tracking",
      "Ongoing tuning as usage grows",
      "Prompt versioning & A/B testing",
      "Human-in-the-loop review flows",
      "Data pipeline & embedding infrastructure",
    ],
    process: [
      {
        step: "01",
        title: "Use-case & data audit",
        duration: "1–2 weeks",
        description:
          "We identify high-ROI workflows, assess data quality and access, and define success metrics — time saved, resolution rate, accuracy, or cost per task.",
      },
      {
        step: "02",
        title: "Prototype & evaluate",
        duration: "2–4 weeks",
        description:
          "A working prototype on a representative dataset, with eval suites that catch regressions before users do. We compare models and architectures on your actual content.",
      },
      {
        step: "03",
        title: "Production integration",
        duration: "3–6 weeks",
        description:
          "APIs, UI, auth, and logging wired into your existing tools — Slack, Zendesk, your app, or internal dashboards. Guardrails and fallbacks are built in.",
      },
      {
        step: "04",
        title: "Monitor & improve",
        duration: "Ongoing",
        description:
          "Dashboards for usage, latency, cost, and quality. We tune prompts, retrieval, and routing as real traffic patterns emerge.",
      },
    ],
    technologies: [
      "OpenAI",
      "Anthropic",
      "LangChain",
      "Pinecone",
      "PostgreSQL pgvector",
      "Python",
      "Node.js",
      "Temporal",
    ],
    deliverables: [
      "Production AI feature or automation",
      "Eval suite & quality benchmarks",
      "RAG pipeline & vector index",
      "Admin tools for prompt & content management",
      "Cost & usage monitoring dashboard",
      "Runbook for model updates",
      "Security review for data handling",
    ],
    faqs: [
      {
        question: "How do you prevent AI hallucinations?",
        answer:
          "We use retrieval grounding, citation requirements, confidence thresholds, and human review for high-stakes outputs. Every feature ships with an eval set built from your real data.",
      },
      {
        question: "Will our data be used to train public models?",
        answer:
          "No. We use enterprise API terms and can deploy on your VPC or preferred cloud when data residency matters.",
      },
      {
        question: "What does AI cost at scale?",
        answer:
          "We model cost per task during prototyping and set budgets, caching, and routing rules before launch. You get alerts when spend deviates from plan.",
      },
      {
        question: "Can you add AI to our existing product?",
        answer:
          "Yes — that is the most common engagement. We integrate via your APIs and auth, ship behind feature flags, and roll out gradually.",
      },
      {
        question: "How long until we see ROI?",
        answer:
          "A focused copilot or automation often reaches production in 6–10 weeks. We define success metrics in week one so you know if it is working.",
      },
      {
        question: "What do you need from us to start?",
        answer:
          "Sample data (tickets, docs, or reports), access to relevant systems, a product owner for feedback, and clarity on what success looks like — time saved, deflection rate, or accuracy.",
      },
    ],
    outcomes: [
      { value: "40%+", label: "Typical ticket deflection" },
      { value: "Evals", label: "Before every production ship" },
      { value: "24/7", label: "Automated workflows" },
    ],
    cta: "Start an AI project",
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicePages.map((page) => page.slug);
}

export function getHomepageServiceBlocks() {
  return servicePages.map((page) => ({
    id: `svc-${page.serviceId}`,
    serviceId: page.serviceId,
    href: `/services/${page.slug}`,
    cta: `Learn more about ${page.title}`,
    greatFor: page.greatFor.slice(0, 4),
    included: page.included.slice(0, 6),
    visual: page.visual,
    reverse: page.reverseOnHomepage,
    description: page.homepageDescription ?? page.lead,
    noBorder: page.noBorderOnHomepage,
  }));
}
