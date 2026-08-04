export const MOBILE_HEADER_BREAKPOINT_PX = 940;
/** Desktop sticky header height in px (matches marketing.css --site-header-offset: 7.75rem). */
export const DESKTOP_HEADER_OFFSET_PX = 124;

export function isMobileHeaderLayout(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(max-width: ${MOBILE_HEADER_BREAKPOINT_PX}px)`).matches;
}

function parseLengthPx(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.endsWith("px")) {
    const parsed = Number.parseFloat(trimmed);
    return Number.isFinite(parsed) && parsed > 0 ? Math.ceil(parsed) : null;
  }

  if (trimmed.endsWith("rem")) {
    const parsed = Number.parseFloat(trimmed);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    const rootSize = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    return Number.isFinite(rootSize) && rootSize > 0
      ? Math.ceil(parsed * rootSize)
      : null;
  }

  return null;
}

export function getSiteHeaderOffset(): number {
  if (typeof window === "undefined") return DESKTOP_HEADER_OFFSET_PX;

  const fromComputed = parseLengthPx(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--site-header-offset",
    ),
  );
  if (fromComputed) return fromComputed;

  return DESKTOP_HEADER_OFFSET_PX;
}
