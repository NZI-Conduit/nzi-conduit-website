import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import http from "http";
import { spawn } from "child_process";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4173;
const ARTIFACT_DIR = "/Users/pratyakshkalsi/.gemini/antigravity-ide/brain/cb2b2717-745c-416b-9a2c-a599d54191d6";

const phase4Inter = fs.readFileSync("scratch/inter-phase4.woff2");
const phase4Jakarta = fs.readFileSync("scratch/jakarta-phase4.woff2");

function waitForServer(port, timeoutMs = 5000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      http
        .get(`http://localhost:${port}/`, (res) => resolve())
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

async function captureHeading(browser, routePath, width, height, usePhase4, fontDisplayOptional = false) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, isMobile: width <= 500, hasTouch: width <= 500 });
  await page.setRequestInterception(true);

  page.on("request", (req) => {
    const url = req.url();
    if (usePhase4 && url.includes("inter-latin")) {
      req.respond({
        status: 200,
        contentType: "font/woff2",
        body: phase4Inter,
      });
    } else if (usePhase4 && url.includes("plus-jakarta-sans")) {
      req.respond({
        status: 200,
        contentType: "font/woff2",
        body: phase4Jakarta,
      });
    } else {
      req.continue();
    }
  });

  if (fontDisplayOptional) {
    // Inject CSS override to set font-display: optional
    await page.evaluateOnNewDocument(() => {
      const style = document.createElement("style");
      style.textContent = `
        @font-face { font-family: 'Inter'; font-display: optional !important; }
        @font-face { font-family: 'Plus Jakarta Sans'; font-display: optional !important; }
      `;
      document.head && document.head.appendChild(style);
    });
  }

  await page.goto(`http://localhost:${PORT}${routePath}`, { waitUntil: "networkidle0" });
  await documentFontsReady(page);

  // Find the H1 or hero section
  const h1Handle = await page.$("h1");
  const heroHandle = await page.$("main > section:first-of-type") || h1Handle;

  const h1Buffer = await h1Handle.screenshot();
  const heroBuffer = await heroHandle.screenshot();
  const fullBuffer = await page.screenshot({ fullPage: false });

  await page.close();
  return { h1Buffer, heroBuffer, fullBuffer };
}

async function documentFontsReady(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

// Side-by-side composer using Puppeteer browser page
async function composeComparisonImage(browser, title, metaLeft, leftBuffer, metaRight, rightBuffer, outputPath, width = 1200) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 800 });

  const leftBase64 = `data:image/png;base64,${leftBuffer.toString("base64")}`;
  const rightBase64 = `data:image/png;base64,${rightBuffer.toString("base64")}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          margin: 0;
          padding: 24px;
          background: #0f172a;
          color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          font-size: 20px;
          margin: 0 0 6px 0;
          font-weight: 700;
          color: #38bdf8;
        }
        .header p {
          font-size: 13px;
          margin: 0;
          color: #94a3b8;
        }
        .grid {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        .panel {
          flex: 1;
          max-width: 50%;
          background: #1e293b;
          border-radius: 10px;
          border: 1px solid #334155;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .panel-header {
          padding: 10px 14px;
          background: #0b1329;
          font-size: 12px;
          font-weight: 600;
          border-bottom: 1px solid #334155;
          display: flex;
          justify-content: space-between;
        }
        .badge-left { color: #f59e0b; }
        .badge-right { color: #10b981; }
        .img-container {
          padding: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #faf7f2;
        }
        img {
          max-width: 100%;
          height: auto;
          display: block;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div id="capture-container">
        <div class="header">
          <h1>${title}</h1>
          <p>Visual fidelity and glyph geometry validation between Phase 4 full font vs Phase 5 subsetted font</p>
        </div>
        <div class="grid">
          <div class="panel">
            <div class="panel-header">
              <span class="badge-left">Phase 4 Full Fonts</span>
              <span>${metaLeft}</span>
            </div>
            <div class="img-container">
              <img src="${leftBase64}" />
            </div>
          </div>
          <div class="panel">
            <div class="panel-header">
              <span class="badge-right">Phase 5 Subsetted Fonts</span>
              <span>${metaRight}</span>
            </div>
            <div class="img-container">
              <img src="${rightBase64}" />
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: "networkidle0" });
  const container = await page.$("#capture-container");
  const screenshot = await container.screenshot();
  fs.writeFileSync(outputPath, screenshot);
  await page.close();
}

async function main() {
  console.log("Starting server...");
  const server = spawn("node", ["scripts/test-server.js"], { stdio: "inherit" });
  await waitForServer(PORT);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox"],
  });

  try {
    console.log("1. Generating bold-heading comparisons for / and /pricing at 390px and 1280px...");

    // Test matrix
    const configs = [
      { route: "/", name: "Homepage (/)", key: "home" },
      { route: "/pricing", name: "Pricing Page (/pricing)", key: "pricing" },
    ];

    const viewports = [
      { width: 390, height: 844, label: "390px (Mobile)" },
      { width: 1280, height: 800, label: "1280px (Desktop)" },
    ];

    for (const cfg of configs) {
      for (const vp of viewports) {
        console.log(`  Capturing ${cfg.name} @ ${vp.label}...`);

        // Phase 4 capture
        const p4 = await captureHeading(browser, cfg.route, vp.width, vp.height, true);
        // Subset (Phase 5) capture
        const p5 = await captureHeading(browser, cfg.route, vp.width, vp.height, false);

        // Save raw H1 comparisons
        const h1ComparisonPath = path.join(
          ARTIFACT_DIR,
          `comparison-${cfg.key}-bold-heading-${vp.width}px.png`
        );
        await composeComparisonImage(
          browser,
          `${cfg.name} Bold Heading @ ${vp.label}`,
          "Inter (48.3 KB) + Jakarta (27.3 KB) [wght 100-900]",
          p4.h1Buffer,
          "Inter (36.1 KB) + Jakarta (20.6 KB) [Subset -25%]",
          p5.h1Buffer,
          h1ComparisonPath,
          vp.width <= 500 ? 900 : 1300
        );
        console.log(`  ✓ Saved ${h1ComparisonPath}`);

        // Save hero comparisons
        const heroComparisonPath = path.join(
          ARTIFACT_DIR,
          `comparison-${cfg.key}-hero-section-${vp.width}px.png`
        );
        await composeComparisonImage(
          browser,
          `${cfg.name} Hero Section @ ${vp.label}`,
          "Phase 4 Full Variable Fonts",
          p4.heroBuffer,
          "Phase 5 Subsetted Variable Fonts",
          p5.heroBuffer,
          heroComparisonPath,
          vp.width <= 500 ? 950 : 1400
        );
        console.log(`  ✓ Saved ${heroComparisonPath}`);
      }
    }

    console.log("\n2. Capturing first load with font-display: optional at 390px and 1280px...");
    for (const vp of viewports) {
      const pageOpt = await browser.newPage();
      await pageOpt.setViewport({ width: vp.width, height: vp.height, isMobile: vp.width <= 500 });
      // Inject font-display: optional
      await pageOpt.evaluateOnNewDocument(() => {
        const style = document.createElement("style");
        style.textContent = `
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400 700;
            font-display: optional !important;
            src: url('/assets/inter-latin-wght-normal-ZR_xFx3s.woff2') format('woff2-variations');
          }
          @font-face {
            font-family: 'Plus Jakarta Sans';
            font-style: normal;
            font-weight: 500 800;
            font-display: optional !important;
            src: url('/assets/plus-jakarta-sans-latin-wght-normal-BlfcxZ0E.woff2') format('woff2-variations');
          }
        `;
        document.head && document.head.appendChild(style);
      });

      await pageOpt.goto(`http://localhost:${PORT}/`, { waitUntil: "domcontentloaded" });
      const optPath = path.join(ARTIFACT_DIR, `first-load-font-display-optional-${vp.width}px.png`);
      await pageOpt.screenshot({ path: optPath });
      console.log(`  ✓ Saved ${optPath}`);
      await pageOpt.close();
    }

    console.log("\n✅ All screenshots captured and saved to artifacts successfully!");
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
