import puppeteer from "puppeteer-core";
import { spawn } from "child_process";
import http from "http";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4176;

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

async function testPrefetch() {
  const server = spawn("node", ["scripts/test-server.js"], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: "inherit",
  });

  try {
    await waitForServer(PORT);
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    const requestsDuringLoad = [];
    const requestsAfterHover = [];
    let pageLoadFinished = false;

    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("/assets/")) {
        const item = { url: url.split("/").pop(), time: Date.now() };
        if (!pageLoadFinished) {
          requestsDuringLoad.push(item);
        } else {
          requestsAfterHover.push(item);
        }
      }
    });

    console.log("1. Navigating to homepage (monitoring page load network requests)...");
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1000));
    pageLoadFinished = true;

    console.log("\n=== NETWORK REQUESTS DURING PAGE LOAD ===");
    for (const r of requestsDuringLoad) {
      console.log(`  - [PAGE LOAD] ${r.url}`);
    }

    const modalDuringLoad = requestsDuringLoad.some((r) => r.url.includes("RequestAuditModal"));
    const intakeDuringLoad = requestsDuringLoad.some((r) => r.url.includes("IntakeForm"));
    console.log(`\n✓ RequestAuditModal requested during page load: ${modalDuringLoad} (expected: false)`);
    console.log(`✓ IntakeForm requested during page load: ${intakeDuringLoad} (expected: false)`);

    if (modalDuringLoad || intakeDuringLoad) {
      throw new Error("Prefetch ran prematurely during page load!");
    }

    console.log("\n2. Hovering over CTA button ('Request Free Audit')...");
    // Get the selector or coordinates for the CTA button and use puppeteer page.hover
    const ctaHandle = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      return btns.find((b) => b.textContent.includes("Request Free Audit") || b.textContent.includes("Request Audit"));
    });
    if (!ctaHandle) throw new Error("CTA button not found");
    await ctaHandle.asElement().hover();

    await new Promise((r) => setTimeout(r, 800));

    console.log("\n=== NETWORK REQUESTS TRIGGERED ON CTA HOVER ===");
    for (const r of requestsAfterHover) {
      console.log(`  - [ON HOVER] ${r.url}`);
    }

    const modalOnHover = requestsAfterHover.some((r) => r.url.includes("RequestAuditModal"));
    const intakeOnHover = requestsAfterHover.some((r) => r.url.includes("IntakeForm"));
    console.log(`\n✓ RequestAuditModal chunk fetched on hover: ${modalOnHover}`);
    console.log(`✓ IntakeForm chunk fetched on hover: ${intakeOnHover}`);

    if (!modalOnHover || !intakeOnHover) {
      throw new Error("Hover failed to prefetch both chunks!");
    }

    await browser.close();
    console.log("\n✅ Modal prefetch isolation & hover prefetching PASSED!");
  } finally {
    server.kill();
  }
}

testPrefetch().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
