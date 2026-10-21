import { spawn } from "child_process";
import puppeteer from "puppeteer-core";
import http from "http";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4173;

function waitForServer(port, timeoutMs = 5000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      http
        .get(`http://localhost:${port}/`, (res) => {
          resolve();
        })
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

async function run() {
  console.log("Starting compressing static server...");
  const server = spawn("node", ["scripts/test-server.js"], { stdio: "inherit" });
  await waitForServer(PORT);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("pageerror", (err) => consoleErrors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  try {
    // Navigate cold to home page
    await page.goto("http://localhost:4173/");
    await new Promise((r) => setTimeout(r, 600));

    // Enable CDP network throttling (Fast 3G: latency 150ms, 1.5 Mbps download)
    const client = await page.target().createCDPSession();
    await client.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 150,
      downloadThroughput: (1.5 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
    });

    const routesToTest = [
      { key: "services", path: "/services" },
      { key: "pricing", path: "/pricing" },
      { key: "cybersecurity", path: "/cybersecurity" },
      { key: "seo", path: "/seo" },
      { key: "webdev", path: "/webdev" },
      { key: "about", path: "/about" },
    ];

    const results = [];

    for (const route of routesToTest) {
      let hadBlankFrame = false;
      let hadPageLoaderFlash = false;

      // Start rapid DOM polling during transition (every 10ms)
      const poller = setInterval(async () => {
        try {
          const check = await page.evaluate(() => {
            const main = document.querySelector("main");
            // Check for PageLoader's distinctive text or spinner
            const hasLoader =
              document.body.innerText.includes("Loading module...") ||
              !!document.querySelector(".animate-spin");
            // Check if entire main content is empty or blank
            const isBlank = !main || main.innerText.trim().length === 0;
            return { hasLoader, isBlank };
          });
          if (check.isBlank) hadBlankFrame = true;
          if (check.hasLoader) hadPageLoaderFlash = true;
        } catch (e) {}
      }, 10);

      // Trigger client-side navigation using app programmatic navigate
      await page.evaluate((targetKey) => {
        if (typeof window.__navigate === "function") {
          window.__navigate(targetKey);
        } else {
          window.history.pushState({}, "", "/" + targetKey);
          window.dispatchEvent(new PopStateEvent("popstate"));
        }
      }, route.key);

      // Wait for URL and target route to render
      await page.waitForFunction(
        (targetPath) => {
          const hasHeading = !!document.querySelector("h1, h2");
          return document.location.pathname === targetPath && hasHeading;
        },
        { timeout: 8000 },
        route.path
      );

      clearInterval(poller);
      await new Promise((r) => setTimeout(r, 150));

      const finalPath = await page.evaluate(() => document.location.pathname);
      const heading = await page.evaluate(() =>
        document.querySelector("h1") ? document.querySelector("h1").innerText.replace(/\n/g, " ") : "no h1"
      );

      results.push({
        Route: route.path,
        "Final URL": finalPath,
        "Heading Detected": heading.slice(0, 35) + "...",
        "Blank Frame": hadBlankFrame ? "YES (FAIL)" : "None (PASS)",
        "PageLoader Flash": hadPageLoaderFlash ? "YES (FAIL)" : "None (PASS)",
      });
    }

    console.log("\n=== CLIENT NAVIGATION TEST (FAST 3G THROTTLED, COLD TARGET CHUNKS) ===");
    console.table(results);
    console.log("Console errors encountered:", consoleErrors.length === 0 ? "ZERO" : consoleErrors);
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
