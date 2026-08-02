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
    eyebrow?: string;
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
      "Custom websites, SaaS dashboards, and e-commerce platforms built in PHP, Python, or TypeScript that are fast, SEO-ready, and easy for your team to maintain.",
    lead: "From marketing sites to full SaaS dashboards, we build web products that load fast, rank well, and stay simple for your team to maintain long after launch.",
    overview: [
      "Your website is often the first product your customers touch, and the system your team relies on every day. We treat web builds as long-term assets, not one-off campaigns. That means performance budgets, accessible UI, analytics wired in from day one, and a codebase your team can actually extend.",
      "Whether you need a conversion-focused marketing site, a customer portal, or a multi-tenant SaaS dashboard, we scope around business outcomes: signups, activation, retention, and operational efficiency. You get a dedicated team that designs, builds, and ships without the handoffs between agencies.",
      "We ship across three core stacks: PHP (Laravel, CodeIgniter), Python (Django, Flask, FastAPI), and TypeScript (React, Next.js, Nuxt, Vue, Node.js). We pick the one that fits your product, existing codebase, and team. Headless CMS options are available when marketing needs to move fast without developer bottlenecks. Every launch includes deployment, monitoring hooks, and documentation so you are never stuck waiting on us for small updates.",
      "If you already have a site that feels slow, hard to edit, or expensive to change, we can audit it first, then rebuild or modernize the parts that matter, so you keep what works and replace what does not.",
    ],
    toc: [
      { id: "overview", label: "Overview" },
      { id: "what-we-build", label: "Capabilities" },
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
        title: "Backend & API endpoints",
        description:
          "Custom server logic, REST and GraphQL APIs, authentication, webhooks, and third-party integrations: the engine behind your product, not just a static front end.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        imageAlt: "Developer writing backend code and API logic",
      },
      {
        title: "Frontend & responsive design",
        description:
          "UI implementation, mobile-first layouts, accessible components, and interfaces that look and work correctly across phones, tablets, and desktops.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        imageAlt: "Responsive web interface and layout design",
      },
      {
        title: "Database management",
        description:
          "Schema design, PostgreSQL setup, migrations, indexing, and data layers built for performance, integrity, and maintainability as your product grows.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        imageAlt: "Server and database infrastructure",
      },
      {
        title: "Cyber security",
        description:
          "Secure auth flows, input validation, HTTPS, secrets management, and production hardening, so your app is safe to run on the public internet.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        imageAlt: "Cyber security and application protection",
      },
    ],
    principles: [
      {
        title: "Outcomes before polish",
        description:
          "We design and build against the metric that matters: leads, activation, checkout completion, not just how the page looks in a screenshot.",
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
          "Design, front-end, backend, and launch sit with the same small senior team, so fewer meetings, fewer surprises, faster decisions.",
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
        "Weekly demos. You see working product, not status slides",
        "Launch checklist, handoff docs, and 12 months of free technical support",
      ],
    },
    relatedWorkTag: "Web",
    overviewSection: {
      headline: "A product you own,",
      headlineLine2: "not a one-off campaign.",
      lead: "We treat every web build as infrastructure your business runs on: fast for users, editable for your team, and maintainable long after launch day.",
      spotlight: {
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=80",
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
              "A codebase, CMS, and analytics stack your people can extend, without filing a ticket for every copy change.",
          },
        ],
      },
      paths: [
        {
          title: "Greenfield builds",
          description:
            "We choose between PHP, Python, and TypeScript based on your product: Laravel or CodeIgniter for proven PHP ecosystems, Django or FastAPI for data-heavy backends, and React, Next.js, or Nuxt when the front end needs to move fast.",
          chips: ["Laravel", "Django", "Next.js", "Nuxt", "Handoff docs"],
          variant: "build",
        },
        {
          title: "Rebuilds & audits",
          description:
            "If your site feels slow, hard to edit, or expensive to change, we audit first. Then modernize only the parts that matter.",
          chips: ["Performance audit", "Phased migration", "Keep what works"],
          variant: "modernize",
        },
      ],
    },
    fitSection: {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80",
      imageAlt: "Team collaborating on a web project",
      callout: "If two or more of these sound like you, we should talk.",
      badgeLabel: "Typical yes",
      badgeValue: "Startups → Scale-ups",
    },
    projectTypesSection: {
      eyebrow: "Capabilities",
      headline: "Full-stack capabilities",
      headlineLine2: "we deliver on web projects.",
      lead: "These are the engineering layers behind the work: backend, frontend, data, and security, not just example site types.",
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
      "PHP, Python, or TypeScript codebase",
      "Laravel, Django, React, Next.js, Nuxt & related frameworks",
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
          "Component-driven development with weekly demos. CMS, auth, payments, and third-party APIs are integrated as we go. Not bolted on at the end.",
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
      "Laravel",
      "CodeIgniter",
      "Django",
      "Flask",
      "FastAPI",
      "React",
      "Next.js",
      "Nuxt",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
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
          "A focused marketing site usually ships in 4–8 weeks. SaaS dashboards or e-commerce migrations typically run 8–16 weeks depending on integrations and custom logic. We give you a fixed timeline after discovery. Not a range that keeps slipping.",
      },
      {
        question: "Can you work with our existing brand or design files?",
        answer:
          "Yes. We can implement from your Figma files, extend an existing design system, or create net-new UI that matches your brand guidelines. If you only have a logo and colors, we can build the system from there.",
      },
      {
        question: "Do you handle hosting and DevOps?",
        answer:
          "We set up hosting (usually Vercel or your cloud provider), CI/CD, staging environments, and monitoring. You own the accounts. We configure and document everything so you are never locked in.",
      },
      {
        question: "Which stack do you recommend: PHP, Python, or TypeScript?",
        answer:
          "It depends on your product and what you already run. Laravel or CodeIgniter fits classic web apps and PHP teams. Django, Flask, or FastAPI suits APIs, data pipelines, and Python-heavy workflows. TypeScript with React, Next.js, or Nuxt is our go-to for fast, interactive front ends and modern SaaS dashboards. We recommend the right fit in discovery. Not one default stack for every project.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Every project includes 12 months of free technical support for bugs and questions. After that, most clients move to a light retainer for updates, A/B tests, and new pages, or call us back for the next phase.",
      },
      {
        question: "Will we own the code and design?",
        answer:
          "Yes. Source code, design files, and documentation are yours. We prefer open, transferable handoffs. Not proprietary lock-in.",
      },
      {
        question: "What do you need from us to start?",
        answer:
          "Goals and success metrics, brand assets (or permission to create them), access to existing tools (domain, analytics, CMS), and a point person who can give feedback within a few days of each demo.",
      },
    ],
    outcomes: [
      { value: "PHP · Python · TS", label: "Stacks we build in" },
      { value: "From $3.5k", label: "Starting project price" },
      { value: "12 mo", label: "Free technical support" },
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
      "iOS and Android apps with React Native or native stacks, onboarding, push notifications, offline mode, and App Store launch included.",
    lead: "Native-feeling apps for iOS, Android, and the web from a single codebase: ship on every platform without tripling your engineering cost.",
    homepageDescription:
      "Native-feeling apps for iOS, Android, and the web from a single codebase, so you ship on every platform without tripling your engineering cost.",
    reverseOnHomepage: true,
    overview: [
      "Mobile users expect speed, polish, and reliability. Not a wrapped website. We build apps that feel at home on iOS and Android: smooth navigation, thoughtful onboarding, push notifications, offline support, and payments that just work.",
      "For most startups, React Native is the right balance of speed and quality, one codebase, two stores, shared logic with your web product. When performance or platform-specific features demand it, we go native with Swift and Kotlin.",
      "We handle the unglamorous work that kills app projects: App Store review guidelines, crash reporting, analytics, release trains, and post-launch update cycles. You focus on product; we get you through submission and into users' hands.",
    ],
    snapshotStrip: [
      { value: "iOS + Android", label: "Both platforms in one project" },
      { value: "4–12 wks", label: "Typical MVP timeline" },
      { value: "React Native", label: "Cross-platform by default" },
      { value: "12 mo", label: "Free technical support" },
    ],
    projectTypes: [
      {
        title: "Consumer mobile apps",
        description:
          "Onboarding, feeds, profiles, payments, and push, polished UX for apps people open every day.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
        imageAlt: "Person using a consumer mobile app",
      },
      {
        title: "Marketplace & two-sided apps",
        description:
          "Buyer and seller flows, messaging, ratings, and role-based experiences across iOS and Android.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        imageAlt: "Mobile marketplace app interface",
      },
      {
        title: "Field, delivery & logistics",
        description:
          "Offline-first tools for drivers, technicians, and field teams: GPS, camera, and sync when signal returns.",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80",
        imageAlt: "Delivery driver using a logistics app",
      },
      {
        title: "App rescues & rewrites",
        description:
          "Stabilize a flaky codebase, fix store rejections, and ship a sustainable release cadence before adding features.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
        imageAlt: "Developer debugging a mobile application",
      },
    ],
    principles: [
      {
        title: "Native feel, shared code",
        description:
          "We optimize for platform conventions: gestures, navigation, haptics, while keeping one codebase where it makes sense.",
      },
      {
        title: "Offline is not optional",
        description:
          "Spotty connectivity is the norm. We design data layers and UI states that work without a perfect network.",
      },
      {
        title: "Ship through the stores",
        description:
          "Screenshots, privacy labels, review notes, and phased rollouts are part of the build. Not a surprise at the end.",
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
        "Most app projects begin with platform strategy and MVP scope. Then a written plan before design or development starts.",
      points: [
        "Intro call to define platforms, timeline, and must-have v1 features",
        "Written scope with stack recommendation (React Native vs native)",
        "Figma flows for onboarding and core actions before code",
        "Weekly TestFlight / internal Android builds: real devices, not emulators only",
        "Store submission support and post-launch release playbook",
      ],
    },
    businessValue: {
      headline: "Why mobile apps grow your business",
      lead: "A dedicated app keeps your brand in your customer's pocket, driving repeat visits, faster actions, and loyalty that a mobile website alone cannot match.",
      benefits: [
        {
          title: "Always within reach",
          description:
            "Home screen presence, push notifications, and faster repeat access mean customers come back without searching or re-entering payment details every time.",
        },
        {
          title: "Higher engagement and retention",
          description:
            "Apps support personalised experiences, saved preferences, and in-app messaging, keeping users active longer than mobile web alone.",
        },
        {
          title: "New revenue channels",
          description:
            "Subscriptions, in-app purchases, bookings, and loyalty programmes are easier to deliver natively with smoother checkout and fewer drop-offs.",
        },
        {
          title: "Operational efficiency",
          description:
            "Field teams, drivers, and staff get offline-capable tools with camera, GPS, and real-time sync, replacing paper, WhatsApp, and manual updates.",
        },
      ],
      examples: [
        {
          title: "Customer loyalty & reorder apps",
          description:
            "Let repeat buyers reorder in two taps, track deliveries, and receive offers through push. Ideal for retail, food, and service businesses.",
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
      lead: "We build mobile products that earn a home screen spot: fast, reliable, and ready for the App Store and Play Store from day one.",
      spotlight: {
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&q=80",
        imageAlt: "Mobile app interface on smartphone",
        audiences: [
          {
            tag: "For users",
            title: "An app they actually open",
            description:
              "Smooth onboarding, push that matters, and flows designed for thumbs. Not a responsive website in disguise.",
          },
          {
            tag: "For your team",
            title: "One codebase, two stores",
            description:
              "Shared logic with your web product where it helps, without sacrificing the polish people expect on iOS and Android.",
          },
        ],
      },
      paths: [
        {
          title: "Greenfield apps",
          description:
            "React Native or native Swift/Kotlin. We pick the stack for your timeline, team, and platform requirements.",
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
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
      imageAlt: "Product team reviewing a mobile app prototype",
      callout: "Building for phones first? These are the projects we say yes to most.",
      badgeLabel: "Store ready",
      badgeValue: "iOS + Android",
    },
    projectTypesSection: {
      headline: "Four kinds of app work",
      headlineLine2: "we ship often.",
      lead: "Most teams start with one core flow. Then expand to new roles, platforms, or offline features.",
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
        question: "React Native or fully native: which do you recommend?",
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
          "We audit the codebase, fix critical issues, and plan a sustainable release cadence. Rescue projects are common. We start with stability, then ship features.",
      },
      {
        question: "How long until we're in the App Store?",
        answer:
          "A focused MVP typically reaches TestFlight in 4–6 weeks and store submission in 8–12 weeks. Complex marketplaces or offline-heavy apps run longer. We lock timeline after discovery.",
      },
      {
        question: "What do you need from us to start?",
        answer:
          "MVP feature list, brand assets, Apple/Google developer accounts (or willingness to create them), and a product owner who can review builds within a few days each sprint.",
      },
    ],
    outcomes: [
      { value: "iOS + Android", label: "Native-feeling apps on both platforms" },
      { value: "From $6k", label: "Starting price for both apps" },
      { value: "12 mo", label: "Free technical support" },
    ],
    cta: "Start an app project",
  },
  {
    slug: "ai-automation",
    serviceId: "ai",
    tag: "03 · AI",
    title: "AI Development",
    tint: "lime",
    visual: "ai",
    metaDescription:
      "Custom AI development: model training, chatbots, advisors, vision tools, and AI features embedded in websites and apps, built for production.",
    lead: "Custom AI for real products: chatbots, advisors, scanners, trained models, and intelligent features inside your website or app, scoped, evaluated, and wired into production infrastructure.",
    homepageDescription:
      "Custom AI for real products: chatbots, advisors, scanners, trained models, and intelligent features inside your website or app, scoped, evaluated, and wired into production infrastructure.",
    noBorderOnHomepage: true,
    overview: [
      "AI work is not one thing. It can mean a customer chatbot, a document scanner, a product advisor, a trained model on your data, or an intelligent layer inside a website or mobile app. We build all of it as software engineering: clear inputs, outputs, infrastructure, and quality checks before anything reaches users.",
      "That might mean fine-tuning or training on proprietary data, wiring RAG over your documents, building a vision pipeline for images and PDFs, or embedding generation and search inside an existing product. We handle the logic, APIs, hosting, monitoring, and handoff, not just a prompt in a demo.",
      "We scope AI projects like any other build, success metrics, evals, guardrails, rollback plans, and cost controls from the first prototype. You get production-ready AI your team can run and extend, not a slide deck about what models could do someday.",
    ],
    snapshotStrip: [
      { value: "Custom builds", label: "Chatbots, apps, sites & models" },
      { value: "From $7.5k", label: "Starting price for AI work" },
      { value: "Evals", label: "Tested before production launch" },
      { value: "12 mo", label: "Free technical support" },
    ],
    projectTypes: [
      {
        title: "Chatbots & AI advisors",
        description:
          "Customer support bots, internal copilots, sales advisors, and domain-specific assistants, grounded on your content with citations and human review where it matters.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
        imageAlt: "AI chatbot and advisor interface",
      },
      {
        title: "AI in websites & mobile apps",
        description:
          "Search, recommendations, generation, and assistants embedded in your product, behind auth, feature flags, and the same release process as the rest of your app.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        imageAlt: "AI feature embedded in a software product",
      },
      {
        title: "Custom training & model work",
        description:
          "Fine-tuning, private datasets, retrieval pipelines, and model selection tuned to your domain, with infrastructure, versioning, and deployment included.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        imageAlt: "Custom AI model training and monitoring dashboard",
      },
      {
        title: "Vision, scanners & document AI",
        description:
          "Image classification, OCR, invoice and form extraction, quality checks, and document routing, turning unstructured files into structured data your systems can use.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        imageAlt: "Document scanning and AI data extraction workflow",
      },
    ],
    principles: [
      {
        title: "Built for your product",
        description:
          "We design around your users, data, and workflows. Whether that is a public chatbot, an in-app advisor, or a private model trained on proprietary content.",
      },
      {
        title: "Evaluated before launch",
        description:
          "Test suites built from your real documents, tickets, images, and edge cases. We catch regressions before users do.",
      },
      {
        title: "Infrastructure included",
        description:
          "APIs, hosting, vector stores, queues, auth, and monitoring are part of the build. Not an afterthought once the demo works.",
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
        "We begin with the use case, your data, and success metrics. Then a prototype with evals before anything touches production traffic.",
      points: [
        "Discovery call to map the product surface, data sources, and success metrics",
        "Data access review and architecture recommendation (RAG, fine-tune, vision, agents)",
        "Prototype on a representative dataset with eval suite",
        "Production integration behind feature flags with rollback plan",
        "Monitoring dashboard, handoff docs, and tuning window after launch",
      ],
    },
    businessValue: {
      headline: "Why custom AI belongs in your product",
      lead: "The right AI feature can improve customer experience, speed up internal work, and unlock new product capabilities when it is trained, integrated, and monitored like any other part of your stack.",
      benefits: [
        {
          title: "Smarter customer experiences",
          description:
            "Chatbots, advisors, and in-product assistants that answer from your content, on your website, in your app, or across support channels.",
        },
        {
          title: "Faster internal work",
          description:
            "Search across documents, summarise reports, classify inputs, and route work automatically so teams spend less time on repetitive tasks.",
        },
        {
          title: "New product capabilities",
          description:
            "Add recommendations, generation, vision, and document understanding to products that did not have those features before.",
        },
        {
          title: "Measurable delivery",
          description:
            "We define success metrics upfront: accuracy, latency, cost per task, and user adoption, so you know whether the build is working.",
        },
      ],
      examples: [
        {
          title: "Customer & support chatbots",
          description:
            "Public-facing bots and internal copilots grounded on help centres, SOPs, and product docs, with citations and escalation paths.",
        },
        {
          title: "AI inside web & mobile apps",
          description:
            "Embedded search, assistants, recommendations, and generation inside existing products, behind auth and feature flags.",
        },
        {
          title: "Custom model training",
          description:
            "Fine-tuning, retrieval pipelines, and domain-specific model selection on your proprietary data and workflows.",
        },
        {
          title: "Vision & document scanners",
          description:
            "OCR, invoice extraction, image classification, and quality checks that turn files and photos into structured data.",
        },
        {
          title: "Workflow automation",
          description:
            "AI steps inside reporting, routing, enrichment, and approval flows, replacing manual exports and spreadsheet work.",
        },
        {
          title: "Advisors & decision tools",
          description:
            "Domain-specific assistants for sales, compliance, onboarding, or operations that guide users through complex choices.",
        },
      ],
    },
    overviewSection: {
      headline: "AI that ships as",
      headlineLine2: "real product engineering.",
      lead: "Whether you need a chatbot, a trained model, a scanner, or AI inside an existing website or app. We scope, build, evaluate, and deploy it like any other production feature.",
      spotlight: {
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&q=80",
        imageAlt: "Custom AI feature integrated into a software product",
        audiences: [
          {
            tag: "For users",
            title: "Useful intelligence in the product",
            description:
              "Advisors, search, generation, and automation that feel native to your app. Not a bolted-on chat widget.",
          },
          {
            tag: "For your team",
            title: "Infrastructure you can run",
            description:
              "Training pipelines, APIs, monitoring, and handoff docs, so AI stays maintainable after launch.",
          },
        ],
      },
      paths: [
        {
          title: "New AI products",
          description:
            "Chatbots, advisors, scanners, and custom models built from scratch, with data pipelines, evals, and deployment included.",
          chips: ["RAG", "Fine-tuning", "Vision", "Agents"],
          variant: "build",
        },
        {
          title: "AI inside what you already have",
          description:
            "Add intelligent features to an existing website or app via your APIs and auth, feature-flagged rollout with monitoring from day one.",
          chips: ["Web & mobile", "Feature flags", "Your VPC", "Dashboards"],
          variant: "modernize",
        },
      ],
    },
    fitSection: {
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80",
      imageAlt: "Development team planning a custom AI implementation",
      callout:
        "If you can describe the workflow or user experience, we can usually scope the AI build around it.",
      badgeLabel: "Typical fit",
      badgeValue: "Products & teams",
    },
    projectTypesSection: {
      headline: "Four kinds of AI work",
      headlineLine2: "we build and ship.",
      lead: "From customer-facing chatbots to trained models and vision tools. We start with one clear use case, then expand once quality is proven.",
    },
    greatFor: [
      "Founders adding AI to a website or mobile app",
      "Teams that need a custom chatbot or product advisor",
      "Businesses with proprietary data that needs training or retrieval",
      "Products needing document scanning, OCR, or image classification",
      "Companies replacing manual review with intelligent automation",
      "Teams that tried a demo and need production infrastructure",
    ],
    included: [
      "Custom chatbots, advisors & copilots",
      "AI features in websites & mobile apps",
      "Model training, fine-tuning & RAG pipelines",
      "Vision, OCR & document processing",
      "Evaluation suites & guardrails before launch",
      "APIs, infrastructure & deployment setup",
      "Usage monitoring & cost tracking",
      "Prompt versioning & human review flows",
      "Data pipelines & embedding infrastructure",
    ],
    process: [
      {
        step: "01",
        title: "Use-case & data audit",
        duration: "1–2 weeks",
        description:
          "We identify high-ROI workflows, assess data quality and access, and define success metrics: time saved, resolution rate, accuracy, or cost per task.",
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
          "APIs, UI, auth, and logging wired into your existing tools: Slack, Zendesk, your app, or internal dashboards. Guardrails and fallbacks are built in.",
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
      "Production AI feature, bot, or model integration",
      "Eval suite & quality benchmarks",
      "Data, retrieval, or training pipeline",
      "Admin tools for prompts, content & monitoring",
      "Cost & usage monitoring dashboard",
      "Runbook for updates and model changes",
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
          "Yes, that is the most common engagement. We integrate via your APIs and auth, ship behind feature flags, and roll out gradually.",
      },
      {
        question: "How long until we see ROI?",
        answer:
          "A focused copilot or automation often reaches production in 6–10 weeks. We define success metrics in week one so you know if it is working.",
      },
      {
        question: "What do you need from us to start?",
        answer:
          "Sample data (documents, images, tickets, or product content), access to relevant systems, a product owner for feedback, and clarity on what success looks like: accuracy, speed, adoption, or cost per task.",
      },
    ],
    outcomes: [
      { value: "Custom AI", label: "Chatbots, apps, sites & models" },
      { value: "From $7.5k", label: "Training & implementation" },
      { value: "12 mo", label: "Free technical support" },
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
