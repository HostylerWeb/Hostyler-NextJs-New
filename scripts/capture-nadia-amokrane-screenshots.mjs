import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outDir = "/var/www/hostyler/public/work/nadia-amokrane";
const baseUrl = "https://nadiaamokrane.com";
const headerOffset = 120;

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function snap(page, file, waitMs = 3500) {
  await page.waitForTimeout(waitMs);
  await page.screenshot({ path: `${outDir}/${file}`, fullPage: false });
  console.log("saved", file, "->", page.url());
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
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  userAgent,
});

const page = await context.newPage();

await goto(page, "/index.html");
await snap(page, "homepage.png", 3000);

await goto(page, "/index.html#clinical");
await scrollToSelector(page, "#clinical, .hero + section, h2");
await snap(page, "clinical.png", 2500);

await goto(page, "/about.html");
await scrollToSelector(page, "h1");
await snap(page, "about.png", 2500);

await goto(page, "/conditions/endometriosis-adenomyosis.html");
await scrollToSelector(page, "h1");
await snap(page, "condition.png", 2500);

await goto(page, "/conditions/fertility-check.html");
await scrollToSelector(page, "h1");
await snap(page, "fertility.png", 2500);

await goto(page, "/contact.html");
await scrollToSelector(page, "form, h1");
await snap(page, "contact.png", 2500);

await browser.close();
console.log("done");
