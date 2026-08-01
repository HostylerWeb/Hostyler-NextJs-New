import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outDir = "/var/www/hostyler/public/work/the-lash-house";
const baseUrl = "https://thelashhouselb.com";
const headerOffset = 120;

async function snap(page, file, waitMs = 3500) {
  await page.waitForTimeout(waitMs);
  await page.screenshot({ path: `${outDir}/${file}`, fullPage: false });
  console.log("saved", file, "->", page.url());
}

async function scrollToSelector(page, selector) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "visible", timeout: 30000 });
  await locator.scrollIntoViewIfNeeded();
  await page.evaluate((offset) => {
    window.scrollBy(0, -offset);
  }, headerOffset);
  await page.waitForTimeout(600);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

const page = await context.newPage();

await page.goto(`${baseUrl}/`, { waitUntil: "networkidle", timeout: 90000 });
await snap(page, "homepage.png", 5000);

await page.goto(`${baseUrl}/shop/`, { waitUntil: "networkidle", timeout: 90000 });
await scrollToSelector(page, ".products .product, ul.products li.product");
await snap(page, "shop.png", 3000);

await page.goto(`${baseUrl}/product/cashmere-silk/`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await snap(page, "product.png", 4000);

await page.goto(`${baseUrl}/product-category/lashes/`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await scrollToSelector(page, ".products .product, ul.products li.product");
await snap(page, "category.png", 3000);

await page.goto(`${baseUrl}/about-us/`, { waitUntil: "networkidle", timeout: 90000 });
await scrollToSelector(page, "h2");
await snap(page, "about.png", 3000);

await page.goto(`${baseUrl}/contact-us/`, { waitUntil: "networkidle", timeout: 90000 });
await scrollToSelector(page, "form, .wpcf7-form, input[name='your-email']");
await snap(page, "contact.png", 3000);

await browser.close();
console.log("done");
