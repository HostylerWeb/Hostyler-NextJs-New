export const trustStats = [
  { value: "3", label: "Core stacks" },
  { value: "550+", label: "Products shipped" },
  { value: "8 yrs", label: "Since 2019" },
  { value: "6 wks", label: "Avg. first launch" },
] as const;

export const coreStacks = [
  {
    name: "PHP",
    frameworks: ["Laravel", "CodeIgniter"],
  },
  {
    name: "Python",
    frameworks: ["Django", "Flask", "FastAPI"],
  },
  {
    name: "TypeScript",
    frameworks: ["React", "Next.js", "Nuxt", "Vue", "Node.js"],
  },
] as const;

export const techLogos = [
  { src: "/logos/tech/google.svg", alt: "Google", name: "Google", height: 28, maxWidth: 96 },
  {
    src: "/logos/tech/microsoft.svg",
    alt: "Microsoft",
    name: "Microsoft",
    height: 22,
    maxWidth: 110,
  },
  { src: "/logos/tech/openai.svg", alt: "OpenAI", name: "OpenAI", height: 22, maxWidth: 104 },
  {
    src: "/logos/tech/anthropic.svg",
    alt: "Anthropic",
    name: "Anthropic",
    height: 20,
    maxWidth: 120,
  },
  { src: "/logos/tech/amazon.svg", alt: "Amazon", name: "Amazon", height: 28, maxWidth: 96 },
  { src: "/logos/tech/stripe.svg", alt: "Stripe", name: "Stripe", height: 26, maxWidth: 72 },
  { src: "/logos/tech/paypal.svg", alt: "PayPal", name: "PayPal", height: 24, maxWidth: 100 },
] as const;

export const marqueeItems = [
  "PHP",
  "Laravel",
  "CodeIgniter",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "TypeScript",
  "React",
  "Next.js",
  "Nuxt",
  "Vue",
  "Node.js",
  "PostgreSQL",
  "Tailwind",
  "Docker",
  "AWS",
  "OpenAI",
  "Anthropic",
] as const;
