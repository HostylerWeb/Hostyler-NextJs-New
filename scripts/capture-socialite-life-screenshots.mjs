import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outDir = "/var/www/hostyler/public/work/socialite-life";
const baseUrl = "https://socialitelife.com";
const headerOffset = 100;

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function snap(page, file, waitMs = 4000) {
  await page.waitForTimeout(waitMs);
  await page.screenshot({ path: `${outDir}/${file}`, fullPage: false });
  console.log("saved", file, "->", page.url());
}

async function dismissCookies(page) {
  const accept = page.locator('a:has-text("Accept"), button:has-text("Accept")').first();
  if (await accept.count()) {
    try {
      await accept.click({ timeout: 3000 });
      await page.waitForTimeout(500);
    } catch {
      // banner may already be dismissed
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
  await page.waitForTimeout(3000);
  await dismissCookies(page);
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
await snap(page, "homepage.png", 4000);

await goto(page, "/category/entertainment/");
await scrollToSelector(page, "h1");
await snap(page, "category.png", 3000);

await goto(page, "/usher-fan-snub-lap-dance-claps-back/");
await scrollToSelector(page, ".entry-content, h1");
await snap(page, "article.png", 3000);

await goto(page, "/blog-2/");
await scrollToSelector(page, "h1, .main-content article, article");
await snap(page, "blog.png", 3000);

await goto(page, "/category/interviews/");
await scrollToSelector(page, "h1");
await snap(page, "interviews.png", 3000);

await goto(page, "/about/");
await scrollToSelector(page, "h1, .entry-content, .main-content");
await snap(page, "about.png", 3000);

await browser.close();
console.log("done");
