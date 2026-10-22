import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";
import { createAuditEmail, escapeHtml, isValidHttpUrl, formatISTDate } from "../src/lib/auditEmailTemplate.js";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ARTIFACT_DIR = "/Users/pratyakshkalsi/.gemini/antigravity-ide/brain/cb2b2717-745c-416b-9a2c-a599d54191d6";

async function main() {
  console.log("==========================================");
  console.log("   NZI CONDUIT EMAIL TEMPLATE PREVIEW     ");
  console.log("==========================================");

  // Sample data with ASAP timeline, multiline notes, valid website
  const sampleRequest = {
    name: "Marcus Vance",
    email: "marcus.vance@vancetech.io",
    business_name: "Vance Technology Solutions",
    current_url: "https://vancetech.io",
    location: "Phoenix, Arizona",
    services: ["web", "seo"],
    budget_fit: "fits",
    timeline: "asap",
    notes: `We are migrating from an old WordPress monolith to a modern headless React/Vite architecture.
Our current bounce rate is over 62% and page load speed is hurting our Google Local Pack ranking.

Looking for:
1. Complete performance overhaul (Lighthouse 95+).
2. Local SEO schema and technical audit.
3. Rapid 3-week turnaround before our Q4 product release.`,
    submitted_at: "2026-10-22T12:32:00.000Z", // Formatted to "22 Oct 2026, 6:02 PM IST"
  };

  const emailResult = createAuditEmail(sampleRequest);

  console.log("Subject:", emailResult.subject);
  console.log("Reply-To:", emailResult.replyTo);
  console.log("To:", emailResult.to);
  console.log("Date in IST:", emailResult.dateIST);
  console.log("Is ASAP Priority:", emailResult.isAsap);

  // Security test: XSS injection & invalid URL attempt
  const attackVector = {
    name: "<script>alert('xss')</script>John Doe",
    email: "attacker@exploit.com",
    business_name: "Evil Corp <img src=x onerror=alert(1)>",
    current_url: "javascript:alert(document.cookie)",
    location: "Unknown <b>bold</b>",
    services: ["web"],
    budget_fit: "not_now",
    timeline: "quarter",
    notes: "Trying injection: <iframe src='https://malicious.com'></iframe>",
  };
  const securityResult = createAuditEmail(attackVector);
  if (
    securityResult.html.includes("<script>") ||
    securityResult.html.includes("<img") ||
    securityResult.html.includes("<iframe") ||
    securityResult.html.includes("href=\"javascript")
  ) {
    throw new Error("SECURITY FAILURE: Raw HTML injection detected!");
  }
  console.log("✓ Security Check: HTML escaping and URL protocol checks PASSED!");

  // Save HTML to artifact directory
  const htmlPath = path.join(ARTIFACT_DIR, "rendered_audit_email_preview.html");
  fs.writeFileSync(htmlPath, emailResult.html, "utf8");
  console.log(`✓ Saved HTML email preview to: ${htmlPath}`);

  // Save plain-text fallback to artifact directory
  const textPath = path.join(ARTIFACT_DIR, "audit_email_plaintext_fallback.txt");
  fs.writeFileSync(textPath, emailResult.text, "utf8");
  console.log(`✓ Saved Plain-Text fallback to: ${textPath}`);

  // Launch Puppeteer to capture visual screenshots
  console.log("\nCapturing rendered screenshots with Puppeteer...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Desktop Email View (1000px viewport, rendered email container is 600px)
  await page.setViewport({ width: 1000, height: 1100, deviceScaleFactor: 2 });
  await page.setContent(emailResult.html, { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 500));
  
  const desktopScreenshotPath = path.join(ARTIFACT_DIR, "email_preview_desktop.png");
  await page.screenshot({ path: desktopScreenshotPath, fullPage: true });
  console.log(`✓ Desktop preview screenshot saved: ${desktopScreenshotPath}`);

  // Mobile Email View (390px iPhone-style viewport)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 1200, deviceScaleFactor: 2 });
  await mobilePage.setContent(emailResult.html, { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 500));
  
  const mobileScreenshotPath = path.join(ARTIFACT_DIR, "email_preview_mobile.png");
  await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: true });
  console.log(`✓ Mobile preview screenshot saved: ${mobileScreenshotPath}`);

  await browser.close();
  console.log("\n✅ ALL PREVIEW RENDERS COMPLETED SUCCESSFULLY!");
}

main().catch((err) => {
  console.error("Preview script error:", err);
  process.exit(1);
});
