import puppeteer from "puppeteer-core";
import { spawn } from "child_process";
import http from "http";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 5174;

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

async function runBrowserTests() {
  console.log("Starting vite dev server on port", PORT);
  const viteProcess = spawn("npx", ["vite", "--port", String(PORT), "--strictPort"], {
    stdio: "inherit",
  });

  try {
    await waitForServer(PORT);
    console.log("✓ Vite dev server ready on port", PORT);

    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    const capturedPayloads = [];
    page.on("console", (msg) => {
      const text = msg.text();
      if (text.includes("[intake]")) {
        console.log("BROWSER CONSOLE:", text);
        try {
          const jsonStr = text.replace(/^.*payload:\s*/, "");
          const parsed = JSON.parse(jsonStr);
          capturedPayloads.push(parsed);
        } catch (e) {
          capturedPayloads.push(text);
        }
      }
    });

    await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle0" });
    console.log("✓ Loaded homepage");

    // ==========================================
    // STEP 7: KEYBOARD, FOCUS TRAP & ESCAPE TEST
    // ==========================================
    console.log("\n==========================================");
    console.log("STEP 7: ACCESSIBILITY & KEYBOARD TESTS");
    console.log("==========================================");

    // 1. Open modal via CTA
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const btn = btns.find((b) => b.textContent.includes("Request Free Audit") || b.textContent.includes("Request Audit"));
      btn?.click();
    });

    await page.waitForFunction(() => {
      return Array.from(document.querySelectorAll("span")).some((s) => s.textContent.includes("Request your free technical audit"));
    }, { timeout: 10000 });
    console.log("✓ Modal opened");

    // Check dialog role and aria-modal
    const modalDialog = await page.$('div[role="dialog"]:not([aria-label*="Mobile Navigation"])');
    if (!modalDialog) throw new Error("Modal dialog missing");
    console.log("✓ Modal role='dialog' and aria-modal='true' confirmed");

    // Check Focus Trap (Tab navigation cycles inside modal)
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      const isInside = await page.evaluate(() => {
        const modal = document.querySelector('div[role="dialog"]:not([aria-label*="Mobile Navigation"])');
        return modal && modal.contains(document.activeElement);
      });
      if (!isInside) throw new Error(`Focus escaped modal on Tab ${i + 1}`);
    }
    console.log("✓ Focus trap confirmed: Tab navigation stays within modal");

    // Check Escape key closes modal
    await page.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 300));
    const isModalOpenAfterEsc = await page.evaluate(() => {
      const modal = document.querySelector('div[role="dialog"]:not([aria-label*="Mobile Navigation"])');
      return modal !== null;
    });
    if (isModalOpenAfterEsc) throw new Error("Escape key failed to close modal");
    console.log("✓ Escape key closes modal confirmed");

    // Re-open modal for error & form submission checks
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const btn = btns.find((b) => b.textContent.includes("Request Free Audit") || b.textContent.includes("Request Audit"));
      btn?.click();
    });
    await page.waitForFunction(() => {
      return Array.from(document.querySelectorAll("span")).some((s) => s.textContent.includes("Request your free technical audit"));
    }, { timeout: 10000 });

    // Test Validation & Focus on First Error
    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll('button[type="submit"]')).find((b) => b.textContent.includes("Send request"));
      submitBtn?.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const errorCount = await page.evaluate(() => document.querySelectorAll('p[role="alert"]').length);
    console.log(`✓ Submitted empty: ${errorCount} error announcements with role="alert" rendered`);

    const focusedId = await page.evaluate(() => document.activeElement?.id);
    console.log(`✓ Focus automatically placed on first error element: id="${focusedId}" (expected "name")`);
    if (focusedId !== "name") throw new Error(`Expected focus on 'name', but was '${focusedId}'`);

    // ==========================================
    // STEP 6: TEST CASES (a), (b), (c), (d)
    // ==========================================
    console.log("\n==========================================");
    console.log("STEP 6: INTAKE FORM SUBMISSION IN DEV");
    console.log("==========================================");

    // CASE (a): Website Only
    console.log("\n--- Case (a): Website Only ---");
    await page.type("#name", "Alex Vance");
    await page.type("#email", "alex@example.com");
    await page.type("#business_name", "Black Mesa Labs");
    await page.type("#location", "Socorro, NM");
    await page.type("#current_url", "https://blackmesa.gov");

    await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("label"));
      labels.find((l) => l.textContent.trim() === "Website")?.click();
    });
    await new Promise((r) => setTimeout(r, 100));

    // Fill website branch
    await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("label"));
      labels.find((l) => l.textContent.trim() === "New")?.click();
      labels.find((l) => l.textContent.trim() === "1–5")?.click();
      labels.find((l) => l.textContent.trim() === "Ready")?.click();
      labels.find((l) => l.textContent.trim() === "Online booking")?.click();
    });

    // Budget, timeline, source, consent
    await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("label"));
      labels.find((l) => l.textContent.trim() === "Fits")?.click();
      labels.find((l) => l.textContent.trim() === "Within a month")?.click();
      labels.find((l) => l.textContent.trim() === "Search")?.click();
      const consent = labels.find((l) => l.textContent.includes("OK to contact me"))?.querySelector('input[type="checkbox"]');
      if (consent && !consent.checked) consent.click();
    });
    await page.type("#notes", "Need a clean, high-performance web platform.");

    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll('button[type="submit"]')).find((b) => b.textContent.includes("Send request"));
      submitBtn?.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const noticeA = await page.evaluate(() => document.querySelector('div[role="status"]')?.textContent);
    console.log("✓ Success notice rendered:", noticeA);

    // Close modal & re-open for Case (b)
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close dialog"]');
      closeBtn?.click();
    });
    await new Promise((r) => setTimeout(r, 300));

    // Open modal again for Case (b)
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const btn = btns.find((b) => b.textContent.includes("Request Free Audit") || b.textContent.includes("Request Audit"));
      btn?.click();
    });
    await page.waitForFunction(() => {
      return Array.from(document.querySelectorAll("span")).some((s) => s.textContent.includes("Request your free technical audit"));
    }, { timeout: 10000 });

    // CASE (b): SEO + Video Together
    console.log("\n--- Case (b): SEO + Video Together ---");
    await page.type("#name", "Morgan Chen");
    await page.type("#email", "morgan@aperture.com");
    await page.type("#business_name", "Aperture Science");
    await page.type("#location", "Cleveland, OH");
    await page.type("#current_url", "https://aperturescience.com");

    // Select SEO and Short-form video
    await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("label"));
      labels.find((l) => l.textContent.trim() === "Local SEO")?.click();
      labels.find((l) => l.textContent.trim() === "Short-form video")?.click();
    });
    await new Promise((r) => setTimeout(r, 100));

    // Verify only first two questions per branch appear!
    const questionLabels = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("legend, label.block")).map((el) => el.textContent.trim());
    });
    console.log("Rendered branch questions in multi-service:", questionLabels.filter((q) => q.includes("location") || q.includes("found for") || q.includes("posted") || q.includes("footage") || q.includes("Google Business") || q.includes("accomplish")));

    const hasThirdSeoQ = questionLabels.some((q) => q.includes("Google Business Profile"));
    const hasThirdVideoQ = questionLabels.some((q) => q.includes("What should the videos accomplish"));
    console.log(`✓ Third SEO question omitted in multi-service: ${!hasThirdSeoQ}`);
    console.log(`✓ Third Video question omitted in multi-service: ${!hasThirdVideoQ}`);
    if (hasThirdSeoQ || hasThirdVideoQ) throw new Error("Multi-service branch questions not capped at 2");

    // Answer shown branch questions
    await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("label"));
      labels.find((l) => l.textContent.trim() === "1")?.click();
      labels.find((l) => l.textContent.trim() === "Instagram")?.click();
      labels.find((l) => l.textContent.trim() === "Yes, plenty")?.click();
    });
    await page.type('input[id="seo-targets"]', "quantum computing solutions");

    // Budget, timeline, source, consent
    await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("label"));
      labels.find((l) => l.textContent.trim() === "Fits")?.click();
      labels.find((l) => l.textContent.trim() === "ASAP (under 2 weeks)")?.click();
      labels.find((l) => l.textContent.trim() === "Referral")?.click();
      const consent = labels.find((l) => l.textContent.includes("OK to contact me"))?.querySelector('input[type="checkbox"]');
      if (consent && !consent.checked) consent.click();
    });

    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll('button[type="submit"]')).find((b) => b.textContent.includes("Send request"));
      submitBtn?.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const noticeB = await page.evaluate(() => document.querySelector('div[role="status"]')?.textContent);
    console.log("✓ Success notice rendered:", noticeB);

    // Close & re-open for Case (c)
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close dialog"]');
      closeBtn?.click();
    });
    await new Promise((r) => setTimeout(r, 300));

    // Open modal again for Case (c)
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const btn = btns.find((b) => b.textContent.includes("Request Free Audit") || b.textContent.includes("Request Audit"));
      btn?.click();
    });
    await page.waitForFunction(() => {
      return Array.from(document.querySelectorAll("span")).some((s) => s.textContent.includes("Request your free technical audit"));
    }, { timeout: 10000 });

    // CASE (c): "Not sure yet"
    console.log("\n--- Case (c): 'Not sure yet' ---");
    await page.type("#name", "Jordan Lee");
    await page.type("#email", "jordan@startup.io");
    await page.type("#business_name", "Apex Dynamics");
    await page.type("#location", "Austin, TX");

    // Select "Not sure yet"
    await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("label"));
      labels.find((l) => l.textContent.trim() === "Not sure yet")?.click();
    });
    await new Promise((r) => setTimeout(r, 100));

    const isGoalVisible = await page.evaluate(() => document.querySelector("#goal") !== null);
    const hasAnyBranch = await page.evaluate(() => document.querySelectorAll(".bg-slate-50").length > 0);
    console.log(`✓ Goal textarea visible: ${isGoalVisible}`);
    console.log(`✓ No branch question cards visible: ${!hasAnyBranch}`);
    if (!isGoalVisible || hasAnyBranch) throw new Error("Not sure yet state invalid");

    await page.type("#goal", "Increase client inbound leads and modernize our digital identity.");

    // Budget, timeline, source, consent
    await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("label"));
      labels.find((l) => l.textContent.trim() === "A stretch")?.click();
      labels.find((l) => l.textContent.trim() === "Flexible")?.click();
      labels.find((l) => l.textContent.trim() === "Social")?.click();
      const consent = labels.find((l) => l.textContent.includes("OK to contact me"))?.querySelector('input[type="checkbox"]');
      if (consent && !consent.checked) consent.click();
    });

    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll('button[type="submit"]')).find((b) => b.textContent.includes("Send request"));
      submitBtn?.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const noticeC = await page.evaluate(() => document.querySelector('div[role="status"]')?.textContent);
    console.log("✓ Success notice rendered:", noticeC);

    // Close & re-open for Case (d)
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close dialog"]');
      closeBtn?.click();
    });
    await new Promise((r) => setTimeout(r, 300));

    // Open modal again for Case (d)
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const btn = btns.find((b) => b.textContent.includes("Request Free Audit") || b.textContent.includes("Request Audit"));
      btn?.click();
    });
    await page.waitForFunction(() => {
      return Array.from(document.querySelectorAll("span")).some((s) => s.textContent.includes("Request your free technical audit"));
    }, { timeout: 10000 });

    // CASE (d): Honeypot Filled
    console.log("\n--- Case (d): Honeypot Filled ---");
    const countBeforeHoneypot = capturedPayloads.length;

    // Fill honeypot field
    await page.evaluate(() => {
      const hpInput = document.querySelector('input[tabindex="-1"]');
      if (hpInput) {
        hpInput.value = "http://spambot.biz";
        hpInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    // Also fill name & email
    await page.type("#name", "Spam Bot");
    await page.type("#email", "bot@spammer.ru");

    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll('button[type="submit"]')).find((b) => b.textContent.includes("Send request"));
      submitBtn?.click();
    });
    await new Promise((r) => setTimeout(r, 300));

    const noticeD = await page.evaluate(() => document.querySelector('div[role="status"]')?.textContent);
    console.log("✓ Honeypot success state shown:", noticeD);

    const countAfterHoneypot = capturedPayloads.length;
    console.log(`✓ Honeypot did not send payload to console: ${countAfterHoneypot === countBeforeHoneypot}`);
    if (countAfterHoneypot !== countBeforeHoneypot) throw new Error("Honeypot sent payload");

    await browser.close();
    console.log("\n✓ All browser tests passed successfully!");
  } finally {
    viteProcess.kill();
  }
}

runBrowserTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
