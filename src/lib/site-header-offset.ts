export const MOBILE_HEADER_BREAKPOINT_PX = 940;

let cachedHeaderOffsetPx: number | undefined;

export function isMobileHeaderLayout(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(max-width: ${MOBILE_HEADER_BREAKPOINT_PX}px)`).matches;
}

export function invalidateSiteHeaderOffsetCache() {
  cachedHeaderOffsetPx = undefined;
}

export function getSiteHeaderOffset(): number {
  if (typeof window === "undefined") return 0;

  const inline = document.documentElement.style
    .getPropertyValue("--site-header-offset")
    .trim();

  if (inline.endsWith("px")) {
    const parsed = Number.parseFloat(inline);
    if (!Number.isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }

  if (cachedHeaderOffsetPx !== undefined) {
    return cachedHeaderOffsetPx;
  }

  const header = document.querySelector("header");
  cachedHeaderOffsetPx = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
  return cachedHeaderOffsetPx;
}
