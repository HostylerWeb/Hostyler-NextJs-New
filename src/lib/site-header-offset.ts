export function getSiteHeaderOffset(): number {
  if (typeof window === "undefined") return 0;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--site-header-offset")
    .trim();
  const parsed = Number.parseFloat(value);

  if (!Number.isNaN(parsed) && parsed > 0) {
    return parsed;
  }

  const header = document.querySelector("header");
  return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
}
