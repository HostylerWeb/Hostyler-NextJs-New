import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "src/styles/globals.css",
  "src/lib/fonts.ts",
  "src/lib/cn.ts",
  "src/lib/format.ts",
  "src/components/ui/button.tsx",
  "src/components/ui/eyebrow-chip.tsx",
  "src/components/ui/highlight.tsx",
  "src/components/ui/card.tsx",
  "src/components/ui/badge.tsx",
  "src/components/ui/tag.tsx",
  "src/components/ui/input.tsx",
  "src/components/ui/select.tsx",
  "src/components/ui/textarea.tsx",
  "src/components/ui/field.tsx",
  "src/components/ui/checkbox.tsx",
  "src/components/ui/table.tsx",
  "src/components/ui/status-badge.tsx",
  "src/components/ui/empty-state.tsx",
  "src/components/ui/loading-spinner.tsx",
  "src/components/ui/alert.tsx",
  "src/components/ui/skip-link.tsx",
  "src/components/ui/scroll-progress.tsx",
  "src/components/chat/tawk-chat-loader.tsx",
  "src/components/ui/pagination.tsx",
  "src/components/ui/dialog.tsx",
  "src/components/layout/header.tsx",
  "src/components/layout/nav-menu.tsx",
  "src/components/layout/mobile-nav.tsx",
  "src/components/layout/footer.tsx",
  "src/components/layout/wrap.tsx",
  "src/components/layout/section.tsx",
  "src/components/layout/section-head.tsx",
  "src/components/portal/portal-shell.tsx",
  "src/components/portal/portal-header.tsx",
  "src/components/admin/admin-shell.tsx",
  "src/components/admin/admin-header.tsx",
  "src/components/admin/data-table.tsx",
  "src/hooks/use-scroll-spy.ts",
  "src/hooks/use-reveal.ts",
  "src/hooks/use-media-query.ts",
  "src/content/navigation.ts",
  "src/content/services.ts",
  "src/content/process.ts",
  "src/content/why-us.ts",
  "src/content/pricing.ts",
  "src/content/faq.ts",
  "src/components/sections/testimonials-section.tsx",
  "src/content/team.ts",
  "src/content/trust.ts",
  "src/content/site.ts",
  "src/app/layout.tsx",
  "src/app/(marketing)/layout.tsx",
];

function check(name: string, ok: boolean) {
  console.log(ok ? `✓ ${name}` : `✗ ${name}`);
  return ok;
}

async function main() {
  console.log("Phase 2 verification\n");

  let passed = true;

  for (const file of requiredFiles) {
    const ok = existsSync(join(root, file));
    passed = check(`File ${file}`, ok) && passed;
  }

  const { formatCurrency, formatDate, formatDateTime } = await import(
    "../src/lib/format"
  );
  passed =
    check("formatCurrency", formatCurrency(1234.5) === "$1,234.50") && passed;
  passed =
    check(
      "formatDate",
      typeof formatDate(new Date("2026-01-15")) === "string",
    ) && passed;
  passed =
    check(
      "formatDateTime",
      typeof formatDateTime(new Date("2026-01-15T10:30:00Z")) === "string",
    ) && passed;

  const { cn } = await import("../src/lib/cn");
  passed = check("cn()", cn("a", false && "b", "c") === "a c") && passed;

  if (!passed) {
    console.error("\nPhase 2 verification failed.");
    process.exit(1);
  }

  console.log("\nPhase 2 verification passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
