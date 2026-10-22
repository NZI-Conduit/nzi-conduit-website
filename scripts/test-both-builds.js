import puppeteer from "puppeteer-core";
import { spawn } from "child_process";
import http from "http";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function waitForServer(port, timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      http
        .get(`http://localhost:${port}/`, () => resolve())
        .on("error", () => {
          if (Date.now() - start > timeoutMs) {
            reject(new Error(`Timed out waiting for server on port ${port}`));
          } else {
            setTimeout(check, 100);
          }
        });
    }
    check();
  });
}

async function testProductionBuild() {
  console.log("\n==========================================");
  console.log("TESTING PRODUCTION BUILD (NO WEBHOOK URL)");
  console.log("==========================================");

  const server = spawn("node", ["scripts/test-server.js"], {
    env: { ...process.env, PORT: "4175" },
    stdio: "inherit",
  });

  try {
    await waitForServer(4175);
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto("http://localhost:4175/", { waitUntil: "networkidle0" });

    // Click CTA to open modal
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      btns.find((b) => b.textContent.includes("Request Free Audit") || b.textContent.includes("Request Audit"))?.click();
    });

    await page.waitForSelector('div[role="dialog"]:not([aria-label*="Mobile Navigation"])', { visible: true });

    // Verify the intake form is rendered even before the webhook is configured.
    const hasForm = await page.evaluate(() => document.querySelector("#intake-panel") !== null || document.querySelector("#name") !== null);
    console.log(`✓ IntakeForm rendered in prod without webhook: ${hasForm} (expected: true)`);
    if (!hasForm) throw new Error("IntakeForm should render in prod without webhook");

    // Test /email-preview password gate in production
    await page.goto("http://localhost:4175/email-preview", { waitUntil: "networkidle0" });
    const isLocked = await page.evaluate(() => document.body.textContent.includes("Developer Email Preview") && document.querySelector('input[type="password"]') !== null);
    console.log(`✓ EmailPreview locked behind password gate in prod: ${isLocked} (expected: true)`);
    if (!isLocked) throw new Error("Expected EmailPreview to be locked in production");

    // Unlock with password
    await page.type('input[type="password"]', "nzi2026");
    await page.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 400));
    const isUnlocked = await page.evaluate(() => document.querySelector('iframe[title="Email Preview Frame"]') !== null);
    console.log(`✓ EmailPreview unlocked with dev password in prod: ${isUnlocked} (expected: true)`);
    if (!isUnlocked) throw new Error("Expected EmailPreview to unlock with password");

    await browser.close();
    console.log("✅ Production intake form and email preview gate tests PASSED");
  } finally {
    server.kill();
  }
}

async function testDevBuild() {
  console.log("\n==========================================");
  console.log("TESTING DEV BUILD (NO WEBHOOK URL)");
  console.log("==========================================");

  const devServer = spawn("npx", ["vite", "--port", "5175", "--strictPort"], {
    stdio: "inherit",
  });

  try {
    await waitForServer(5175);
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    let devLoggedPayload = null;
    page.on("console", (msg) => {
      const text = msg.text();
      if (text.includes("[intake] no webhook URL set; payload:")) {
        console.log("DEV CONSOLE LOG DETECTED:", text);
        devLoggedPayload = text;
      }
    });

    await page.goto("http://localhost:5175/", { waitUntil: "networkidle0" });

    // Click CTA to open modal
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      btns.find((b) => b.textContent.includes("Request Free Audit") || b.textContent.includes("Request Audit"))?.click();
    });

    await page.waitForSelector('div[role="dialog"]:not([aria-label*="Mobile Navigation"])', { visible: true });

    // Item 3 check: Confirm modal renders IntakeForm already expanded (defaultOpen)
    const isAlreadyExpanded = await page.evaluate(() => {
      const panel = document.querySelector("#intake-panel");
      const nameInput = document.querySelector("#name");
      const disclosureBtn = Array.from(document.querySelectorAll("button")).find((b) => b.getAttribute("aria-controls") === "intake-panel");
      const isExpandedAttr = disclosureBtn?.getAttribute("aria-expanded");
      return {
        hasPanel: panel !== null,
        hasNameInput: nameInput !== null,
        isExpandedAttr,
      };
    });
    console.log("✓ IntakeForm already expanded on modal open (defaultOpen):", isAlreadyExpanded);
    if (!isAlreadyExpanded.hasPanel || !isAlreadyExpanded.hasNameInput || isAlreadyExpanded.isExpandedAttr !== "true") {
      throw new Error("IntakeForm was not rendered already expanded");
    }

    // Fill form and submit in DEV
    await page.type("#name", "Dev User");
    await page.type("#email", "dev@example.com");
    await page.type("#business_name", "Dev Studio");
    await page.type("#location", "Phoenix, AZ");
    await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("label"));
      labels.find((l) => l.textContent.trim() === "Website")?.click();
      labels.find((l) => l.textContent.trim() === "Fits")?.click();
      labels.find((l) => l.textContent.trim() === "Within a month")?.click();
      const consent = labels.find((l) => l.textContent.includes("OK to contact me"))?.querySelector('input[type="checkbox"]');
      if (consent && !consent.checked) consent.click();
      const submitBtn = Array.from(document.querySelectorAll('button[type="submit"]')).find((b) => b.textContent.includes("Send request"));
      submitBtn?.click();
    });

    await new Promise((r) => setTimeout(r, 600));

    console.log(`✓ Dev console payload logged: ${devLoggedPayload !== null}`);
    if (!devLoggedPayload) throw new Error("Expected dev console payload was not logged");

    await browser.close();
    console.log("✅ Dev build test PASSED");
  } finally {
    devServer.kill();
  }
}

async function main() {
  await testProductionBuild();
  await testDevBuild();
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
