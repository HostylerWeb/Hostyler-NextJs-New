import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outDir = "/var/www/hostyler/public/work/sanjha-chulha";
const baseUrl = "https://sanjhachulha.ge";
const headerOffset = 110;

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

async function scrollToHeading(page, name) {
  const locator = page.getByRole("heading", { name }).first();
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

await page.goto(`${baseUrl}/menu-marjanishvili/`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await scrollToSelector(page, ".menu-photo-card");
await snap(page, "menu.png", 3000);

await page.goto(`${baseUrl}/reservation/`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await scrollToSelector(page, "#reservation-form");
await snap(page, "reservation.png", 3000);

await page.goto(`${baseUrl}/gallery-marjanishvili/`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await snap(page, "gallery.png", 5000);

await page.goto(`${baseUrl}/best-indian-food-in-tbilisi/`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await scrollToHeading(page, /Our Story/i);
await snap(page, "about.png", 3000);

await page.goto(`${baseUrl}/contact/`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await scrollToSelector(page, "#contact-form");
await snap(page, "contact.png", 3000);

await browser.close();
console.log("done");
