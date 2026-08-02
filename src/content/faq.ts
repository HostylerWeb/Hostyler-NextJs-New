export type FaqItem = {
  question: string;
  answer: string;
  tag?: string;
};

export type FaqGroup = {
  title: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    title: "Getting started",
    items: [
      {
        question: "How fast can you start?",
        answer:
          "Discovery usually kicks off within one to two weeks of signing. If you have a hard deadline, tell us upfront. We'll be straight about whether we can hit it.",
      },
      {
        question: "Do you work with early-stage startups?",
        answer:
          "Yes, about half our projects are pre-seed to Series A companies building their first real product. We scope tightly so you ship something meaningful, not a prototype that gets thrown away.",
      },
      {
        question: "Can you sign an NDA before we share details?",
        answer: "Of course. We sign NDAs routinely before first calls. No awkwardness, no delay.",
      },
      {
        question: "What does a first call look like?",
        answer:
          "30 minutes on your goals, constraints, and timeline. We'll ask sharp questions, tell you honestly if we're a fit, and outline what a scoped engagement could look like. No slide deck, no pressure.",
      },
    ],
  },
  {
    title: "Process & delivery",
    items: [
      {
        question: "How do you communicate during a project?",
        answer:
          "Weekly demos, async updates in Slack or your tool of choice, and a shared board so you always know what's in progress.",
      },
      {
        question: "Do I own the code?",
        answer: "Yes, full ownership from day one. Repos, infrastructure, and docs are yours.",
        tag: "Full ownership",
      },
      {
        question: "What happens after launch?",
        answer:
          "Every project includes 12 months of free technical support. After that, most clients move to a retainer or call us back for the next phase.",
      },
      {
        question: "Can you work with our in-house team?",
        answer:
          "Absolutely. We plug into your workflow, PR process, and standups, as extra senior capacity, not a separate silo.",
      },
    ],
  },
  {
    title: "Pricing & scope",
    items: [
      {
        question: "How much does a typical project cost?",
        answer:
          "Web development starts from $3,500 USD. Mobile apps for both iOS and Android start from $6,000 USD. Advanced AI work: training, custom implementation, infrastructure, and production wiring, starts from $7,500 USD. Every project includes 12 months of free technical support. We'll give you a clear number after discovery. Not a range that doubles mid-project.",
      },
      {
        question: "Do you work on hourly or fixed price?",
        answer:
          "Both, depending on the engagement. Fixed price for clearly scoped builds; monthly retainer or embedded team for ongoing work. We avoid open-ended hourly without a cap. That's how budgets spiral.",
      },
      {
        question: "What if scope changes mid-project?",
        answer:
          "It happens. We document the change, agree on impact to timeline and budget before writing code, and keep a clear change log so nothing surprises you at invoice time.",
      },
    ],
  },
  {
    title: "Technical",
    items: [
      {
        question: "What tech stack do you use?",
        answer:
          "We work across three core stacks: PHP (Laravel, CodeIgniter), Python (Django, Flask, FastAPI), and TypeScript (React, Next.js, Nuxt, Vue, Node.js). We recommend the stack that fits your product, team, and timeline. Not a one-size-fits-all default. React Native or native Swift/Kotlin for apps. Modern LLM APIs for AI features.",
      },
      {
        question: "Can you work with our existing codebase?",
        answer:
          "Yes. We start with a short technical audit, identify risks, and propose a pragmatic path forward.",
      },
      {
        question: "How do you handle AI features responsibly?",
        answer:
          "We ground models on your data, evaluate outputs before launch, add guardrails for edge cases, and monitor usage and cost in production.",
        tag: "Evaluated before ship",
      },
    ],
  },
];
