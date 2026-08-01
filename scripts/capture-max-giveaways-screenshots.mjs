import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outDir = "/var/www/hostyler/public/work/max-giveaways";
const baseUrl = "https://maxgiveaways.co.uk";

async function enableDarkTheme(page) {
  await page.evaluate(() => {
    localStorage.setItem("theme", "dark-theme");
    document.documentElement.classList.remove("light-theme");
    document.documentElement.classList.add("dark-theme");
    if (document.body) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    }
  });
}

async function snap(page, file, waitMs = 3500) {
  await page.waitForTimeout(waitMs);
  await enableDarkTheme(page);
  await page.screenshot({ path: `${outDir}/${file}`, fullPage: false });
  console.log("saved", file, "->", page.url());
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await context.addInitScript(() => {
  localStorage.setItem("theme", "dark-theme");
});

const page = await context.newPage();

await page.goto(`${baseUrl}/`, { waitUntil: "networkidle", timeout: 90000 });
await snap(page, "homepage.png", 5000);

await page.goto(`${baseUrl}/current-competitions`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await snap(page, "competitions.png", 5000);

await page.goto(
  `${baseUrl}/competition-detail.php?competition=win-this-deeper-chirp-3-or-220-cash`,
  { waitUntil: "networkidle", timeout: 90000 },
);
await snap(page, "competition-detail.png", 6000);

await page.goto(
  `${baseUrl}/competition-detail.php?competition=mx-milwaukee-tool-takeover-instant-win`,
  { waitUntil: "networkidle", timeout: 90000 },
);
await snap(page, "instant-win.png", 6000);

await page.goto(`${baseUrl}/previous-winners`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await snap(page, "winners.png", 5000);

await page.goto(`${baseUrl}/our-story`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await snap(page, "our-story.png", 5000);

await page.goto(`${baseUrl}/auth`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await snap(page, "auth.png", 4000);

await browser.close();
console.log("done");
