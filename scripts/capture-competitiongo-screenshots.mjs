import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outDir = "/var/www/hostyler/public/work/competitiongo";
const baseUrl = "https://competitiongo.co.uk";
const competitionId = "825";
const competitionSlug = "big-up-your-neighbours";

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

async function registerAndLogin(page, email, password, name) {
  await page.goto(`${baseUrl}/auth`, { waitUntil: "networkidle", timeout: 90000 });
  await enableDarkTheme(page);

  const result = await page.evaluate(
    async ({ email, password, name }) => {
      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirm_password: password,
          terms_accepted: true,
          age_verified: true,
        }),
      });
      const registerData = await registerRes.json();

      if (registerData.status !== "success" && registerData.message !== "User registered successfully.") {
        const loginRes = await fetch("/api/auth/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const loginData = await loginRes.json();
        if (loginData.status !== "success") {
          return { ok: false, registerData, loginData };
        }
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));
        document.cookie = `token=${loginData.token}; path=/; SameSite=Lax`;
        return { ok: true, mode: "login" };
      }

      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const loginData = await loginRes.json();
      if (loginData.status !== "success") {
        return { ok: false, registerData, loginData };
      }
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData.user));
      document.cookie = `token=${loginData.token}; path=/; SameSite=Lax`;
      return { ok: true, mode: "register" };
    },
    { email, password, name },
  );

  if (!result.ok) {
    console.error("Auth failed", JSON.stringify(result, null, 2));
    throw new Error("Could not register or login test user");
  }
  console.log("auth ok via", result.mode);
}

async function addCompetitionToCart(page) {
  const added = await page.evaluate(async (competitionId) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/cart/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        competition_id: competitionId,
        ticket_quantity: 5,
        skill_answer_id: 122,
        skill_answer_text: "Microsoft",
      }),
    });
    const data = await res.json();
    return { status: res.status, data };
  }, competitionId);

  console.log("cart add", JSON.stringify(added));
}

async function clickTab(page, tabId) {
  await page.locator(`#${tabId}`).click({ force: true });
  await page.waitForTimeout(2000);
}

async function clickAffiliateSubTab(page, tabId) {
  await page.locator(`#${tabId}`).click({ force: true });
  await page.waitForTimeout(2500);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
await context.addInitScript(() => {
  localStorage.setItem("theme", "dark-theme");
});

const page = await context.newPage();
const email = `hostyler.screens.${Date.now()}@yopmail.com`;
const password = "HostylerTest123!";
const name = "Hostyler Demo";

await registerAndLogin(page, email, password, name);

await page.goto(`${baseUrl}/`, { waitUntil: "networkidle", timeout: 90000 });
await snap(page, "homepage.png", 4000);

await page.goto(`${baseUrl}/competition-detail?competition=${competitionSlug}`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await snap(page, "competition-detail.png", 6000);

await addCompetitionToCart(page);

await page.goto(`${baseUrl}/my-account`, { waitUntil: "networkidle", timeout: 90000 });
await enableDarkTheme(page);
await clickTab(page, "profile-tab");
await snap(page, "profile.png", 3000);

await page.goto(`${baseUrl}/cart`, { waitUntil: "networkidle", timeout: 90000 });
await snap(page, "cart.png", 5000);

await page.goto(`${baseUrl}/checkout`, { waitUntil: "networkidle", timeout: 90000 });
await snap(page, "checkout.png", 5000);

await page.goto(`${baseUrl}/my-account`, { waitUntil: "networkidle", timeout: 90000 });
await enableDarkTheme(page);
await clickTab(page, "affiliate-tab");
await clickAffiliateSubTab(page, "referrals-tab");
await snap(page, "referrals.png", 4000);

await clickTab(page, "account-control-tab");
await snap(page, "account-control.png", 4000);

await browser.close();
console.log("done");
