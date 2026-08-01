// Minimal polyfills for browsers Next.js 16 supports (Chrome/Edge/Firefox 111+, Safari 16.4+).
// Replaces next/dist/build/polyfills/polyfill-module to drop unused legacy shims Lighthouse flags.

if (typeof URL !== "undefined" && !("canParse" in URL)) {
  Object.assign(URL, {
    canParse(url: string, base?: string) {
      try {
        return Boolean(new URL(url, base));
      } catch {
        return false;
      }
    },
  });
}
