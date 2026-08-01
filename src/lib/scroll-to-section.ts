import { getSiteHeaderOffset } from "@/lib/site-header-offset";

export function scrollToSection(id: string): boolean {
  const element = document.getElementById(id);
  if (!element) return false;

  const offset = getSiteHeaderOffset();
  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  element.querySelectorAll(".reveal").forEach((node) => {
    node.classList.add("in");
  });
  window.history.pushState(null, "", `/#${id}`);
  return true;
}

export function getHashFromHref(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  return href.slice(hashIndex + 1);
}
