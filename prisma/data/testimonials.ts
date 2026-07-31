export type TestimonialSeed = {
  slug: string;
  name: string;
  role: string;
  quote: string;
  avatar_url: string;
  tint: "violet" | "coral" | "lime";
  sort_order: number;
  published: boolean;
};

export const testimonialSeeds: TestimonialSeed[] = [
  {
    slug: "luke-woodward",
    name: "Luke Woodward",
    role: "🇬🇧 United Kingdom",
    quote:
      "Honestly the services of hostyler, knowledge, work ethic, patience for when dealing with someone that has an idea but doesn't know how to execute it is phenomenal. To have someone on your team like this would be priceless. Punctual, on time, always available. I had high expectations but he has crushed them.",
    avatar_url: "/testimonials/luke-woodward.webp",
    tint: "violet",
    sort_order: 1,
    published: true,
  },
  {
    slug: "lukey-bee",
    name: "Lukey Bee",
    role: "🇬🇧 United Kingdom",
    quote:
      "Exceptional Web Designers: Great Experience, Great Guys! Working with them was an absolute delight! From start to finish, they showcased their incredible talent, professionalism, and dedication.",
    avatar_url: "/testimonials/lukey-bee.webp",
    tint: "coral",
    sort_order: 2,
    published: true,
  },
  {
    slug: "andy-willard",
    name: "Andy Willard",
    role: "🇬🇧 United Kingdom",
    quote:
      "Had no issues at all, they've been patient and understanding supporting me for the next 6 months too which is great! Happy to work with them nothing but good vibes and incredible ideas brought to life!",
    avatar_url: "/testimonials/andy-willard.webp",
    tint: "lime",
    sort_order: 3,
    published: true,
  },
  {
    slug: "pablo-ortiz",
    name: "Pablo Ortiz",
    role: "🇺🇸 United States",
    quote:
      "What a company always looks for: Seriousness, punctuality, neatness, and good taste. Excellent developers.",
    avatar_url: "/testimonials/pablo-ortiz.webp",
    tint: "violet",
    sort_order: 4,
    published: true,
  },
  {
    slug: "adekunle-wilson",
    name: "Adekunle Wilson",
    role: "🇨🇦 Canada",
    quote:
      "If you work with Hostyler and Alex, you can never regret. His communication level is super awesome, his work is fantastic, I am really surprised I could find someone like him. When you need anything done on your website, he is your guy, and he is very honest too.",
    avatar_url: "/testimonials/adekunle-wilson.webp",
    tint: "coral",
    sort_order: 5,
    published: true,
  },
  {
    slug: "vladimir-azarov",
    name: "Vladimir Azarov",
    role: "🇱🇹 Lithuania",
    quote: "Thanks, professional and nice to work with",
    avatar_url: "/testimonials/vladimir-azarov.webp",
    tint: "lime",
    sort_order: 6,
    published: true,
  },
  {
    slug: "iftikhar-tutor",
    name: "Iftikhar Tutor",
    role: "🇦🇿 Azerbaijan",
    quote: "Good customer service, friendly, fast, helpful. Just amazing.",
    avatar_url: "/testimonials/iftikhar-tutor.webp",
    tint: "violet",
    sort_order: 7,
    published: true,
  },
];
