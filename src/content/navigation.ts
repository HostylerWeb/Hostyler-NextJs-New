export type NavItem = {
  label: string;
  href: string;
  sectionId: string;
  index: string;
};

export const mainNavigation: NavItem[] = [
  { index: "01", label: "Services", href: "/#services", sectionId: "services" },
  { index: "02", label: "Process", href: "/#process", sectionId: "process" },
  { index: "03", label: "Work", href: "/#work", sectionId: "work" },
  { index: "04", label: "Reviews", href: "/#testimonials", sectionId: "testimonials" },
  { index: "05", label: "Pricing", href: "/#pricing", sectionId: "pricing" },
  { index: "06", label: "FAQ", href: "/#faq", sectionId: "faq" },
];

export const serviceNavigation = [
  {
    label: "Web Development",
    href: "/services/web-development",
    index: "01",
    tint: "violet" as const,
    description: "Sites, SaaS & e-commerce",
  },
  {
    label: "App Development",
    href: "/services/app-development",
    index: "02",
    tint: "coral" as const,
    description: "iOS, Android & cross-platform",
  },
  {
    label: "AI Development",
    href: "/services/ai-automation",
    index: "03",
    tint: "lime" as const,
    description: "Chatbots, models & app AI",
  },
] as const;

export const footerNavigation = {
  company: [
    { label: "Work", href: "/#work" },
    { label: "Process", href: "/#process" },
    { label: "Why us", href: "/#why" },
  ],
  services: [
    { label: "Web development", href: "/services/web-development" },
    { label: "App development", href: "/services/app-development" },
    { label: "AI development", href: "/services/ai-automation" },
  ],
  connect: [
    { label: "support@hostyler.com", href: "mailto:support@hostyler.com" },
    { label: "Start a project", href: "/contact" },
    { label: "Client portal", href: "/login" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
} as const;

export const portalNavigation = [
  { label: "Dashboard", href: "/portal" },
  { label: "Invoices", href: "/portal/invoices" },
  { label: "Support", href: "/portal/support" },
  { label: "Settings", href: "/portal/settings" },
] as const;

export const adminNavigation = [
  { label: "Dashboard", href: "/admin" },
  { label: "Invoices", href: "/admin/invoices" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Support", href: "/admin/support" },
  { label: "Case Studies", href: "/admin/case-studies" },
  { label: "Reviews", href: "/admin/testimonials" },
  { label: "Contacts", href: "/admin/contacts" },
  { label: "Security", href: "/admin/security" },
] as const;
