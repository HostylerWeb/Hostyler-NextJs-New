export const contactProjectTypeOptions = [
  { value: "web", label: "Web platform or site" },
  { value: "app", label: "Mobile or cross-platform app" },
  { value: "ai", label: "AI feature or automation" },
  { value: "multiple", label: "A few of the above" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const contactBudgetOptions = [
  { value: "web_from_3500", label: "Web development. From $3,500" },
  { value: "app_from_6000", label: "Mobile apps (iOS & Android). From $6,000" },
  { value: "ai_from_7500", label: "Advanced AI. From $7,500" },
  { value: "range_10_25k", label: "$10,000–$25,000" },
  { value: "range_25k_plus", label: "$25,000+" },
  { value: "exploring", label: "Just exploring" },
] as const;

export type ContactProjectTypeValue = (typeof contactProjectTypeOptions)[number]["value"];

export type ContactBudgetValue = (typeof contactBudgetOptions)[number]["value"];

const legacyProjectTypeLabels: Record<string, string> = Object.fromEntries(
  contactProjectTypeOptions.map((option) => [option.value, option.label]),
);

const legacyBudgetLabels: Record<string, string> = {
  under_25k: "Under $25,000",
  range_25_50k: "$25,000–$50,000",
  range_50_100k: "$50,000–$100,000",
  range_100k_plus: "$100,000+",
  ...Object.fromEntries(contactBudgetOptions.map((option) => [option.value, option.label])),
};

export function formatContactProjectType(value: string): string {
  return legacyProjectTypeLabels[value] ?? value.replace(/_/g, " ");
}

export function formatContactBudget(value: string): string {
  return legacyBudgetLabels[value] ?? value.replace(/_/g, " ");
}
