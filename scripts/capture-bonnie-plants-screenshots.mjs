import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outDir = "/var/www/hostyler/public/work/bonnie-plants";
const baseUrl = "https://bonnieplants.com";
const headerOffset = 140;

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function snap(page, file, waitMs = 4000) {
  await page.waitForTimeout(waitMs);
  await page.screenshot({ path: `${outDir}/${file}`, fullPage: false });
  console.log("saved", file, "->", page.url());
}

async function dismissOverlays(page) {
  const close = page.locator('button:has-text("Close")').first();
  if (await close.count()) {
    try {
      await close.click({ timeout: 2000 });
      await page.waitForTimeout(500);
    } catch {
      // overlay may already be closed
    }
  }
}

async function scrollToSelector(page, selector) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "visible", timeout: 60000 });
  await locator.scrollIntoViewIfNeeded();
  await page.evaluate((offset) => {
    window.scrollBy(0, -offset);
  }, headerOffset);
  await page.waitForTimeout(600);
}

async function goto(page, path) {
  await page.goto(`${baseUrl}${path}`, {
    waitUntil: "domcontentloaded",
    timeout: 120000,
  });
  await page.waitForTimeout(4000);
  await dismissOverlays(page);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  userAgent,
});

const page = await context.newPage();

await goto(page, "/");
await scrollToSelector(page, "main, #MainContent, .shopify-section");
await snap(page, "homepage.png", 3000);

await goto(page, "/collections/vegetables");
await scrollToSelector(page, "#product-grid, .collection h1, h1");
await snap(page, "category.png", 3000);

await goto(page, "/products/cherokee-purple-heirloom-tomato");
await scrollToSelector(page, "h1, .product__title, .product-form");
await snap(page, "product.png", 3000);

await goto(page, "/blogs/diy-garden-projects");
await scrollToSelector(page, "h1, .blog, .article-card, main");
await snap(page, "blog.png", 3000);

await goto(page, "/blogs/diy-garden-projects/vertical-gardening-ideas");
await scrollToSelector(page, "h1, .article-template, article");
await snap(page, "article.png", 3000);

await goto(page, "/pages/our-story");
await scrollToSelector(page, "h1, .page-content, main");
await snap(page, "about.png", 3000);

await browser.close();
console.log("done");
