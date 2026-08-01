import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outDir = "/var/www/hostyler/public/work/hooked-online";
const baseUrl = "https://www.hookedonline.com.au";
const headerOffset = 120;

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function snap(page, file, waitMs = 5000) {
  await page.waitForTimeout(waitMs);
  await page.screenshot({ path: `${outDir}/${file}`, fullPage: false });
  console.log("saved", file, "->", page.url());
}

async function scrollToFirstVisibleProduct(page) {
  await page.waitForTimeout(8000);
  await page.evaluate((offset) => {
    const thumbs = [...document.querySelectorAll("article.product_thumbnail")];
    const target = thumbs.find((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "instant" });
    } else {
      window.scrollBy(0, 900);
    }
  }, headerOffset);
  await page.waitForTimeout(800);
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
await snap(page, "homepage.png", 7000);

await goto(page, "/newcategory/fishing/");
await scrollToFirstVisibleProduct(page);
await snap(page, "category.png", 4000);

await goto(page, "/jarvis-walker-deep-sea-rig-deep-sea-fishing-rig-wi");
await snap(page, "product.png", 5000);

await goto(page, "/brands/");
await scrollToSelector(page, "h1");
await snap(page, "brands.png", 4000);

await goto(page, "/aboutus/");
await scrollToSelector(page, "h1");
await snap(page, "about.png", 4000);

await goto(page, "/shipping-and-returns/");
await scrollToSelector(page, "h1, .page-content, main");
await snap(page, "shipping.png", 4000);

await browser.close();
console.log("done");
