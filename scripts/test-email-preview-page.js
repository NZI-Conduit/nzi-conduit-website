import path from "path";
import puppeteer from "puppeteer-core";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ARTIFACT_DIR = "/Users/pratyakshkalsi/.gemini/antigravity-ide/brain/cb2b2717-745c-416b-9a2c-a599d54191d6";
const DEV_URL = "http://localhost:5173/email-preview";

async function run() {
  console.log("==========================================");
  console.log("TESTING /email-preview DEV ROUTE");
  console.log("==========================================");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1200, deviceScaleFactor: 2 });

  // Listen for console errors or logs
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log(`Browser console error: ${msg.text()}`);
    }
  });

  console.log(`Navigating to ${DEV_URL}...`);
  await page.goto(DEV_URL, { waitUntil: "networkidle0" });

  // 1. Check <meta name="robots">
  const robotsMeta = await page.$eval('meta[name="robots"]', (el) => el.getAttribute("content")).catch(() => null);
  console.log(`✓ Meta robots tag found: "${robotsMeta}"`);
  if (!robotsMeta || !robotsMeta.includes("noindex")) {
    throw new Error(`Expected meta robots to include 'noindex', got: ${robotsMeta}`);
  }

  // 2. Check iframe exists and has srcDoc
  const iframe = await page.$('iframe[title="Email Preview Frame"]');
  if (!iframe) {
    throw new Error("Could not find email preview iframe!");
  }
  const srcDoc = await page.evaluate((el) => el.getAttribute("srcdoc"), iframe);
  console.log(`✓ Iframe rendered with srcDoc length: ${srcDoc ? srcDoc.length : 0} characters`);
  if (!srcDoc || !srcDoc.includes("New Technical Audit Request")) {
    throw new Error("Iframe srcDoc does not contain expected email header text!");
  }

  // Save screenshot of initial state (Desktop width, Light mode, ASAP scenario)
  const initialScreenshot = path.join(ARTIFACT_DIR, "email_preview_page_desktop.png");
  await page.screenshot({ path: initialScreenshot, fullPage: false });
  console.log(`✓ Saved screenshot: ${initialScreenshot}`);

  // 3. Test Mobile (375px) width toggle
  console.log("Testing Mobile (375px) toggle...");
  const mobileBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    return btns.find((b) => b.textContent.includes("Mobile (375px)"));
  });
  if (mobileBtn) {
    await mobileBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    const mobileScreenshot = path.join(ARTIFACT_DIR, "email_preview_page_mobile_view.png");
    await page.screenshot({ path: mobileScreenshot, fullPage: false });
    console.log(`✓ Saved screenshot: ${mobileScreenshot}`);
  } else {
    throw new Error("Could not find Mobile (375px) toggle button!");
  }

  // 4. Test Dark Mode canvas toggle
  console.log("Testing Dark Canvas toggle...");
  const darkBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    return btns.find((b) => b.textContent.includes("Dark"));
  });
  if (darkBtn) {
    await darkBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    const darkScreenshot = path.join(ARTIFACT_DIR, "email_preview_page_dark.png");
    await page.screenshot({ path: darkScreenshot, fullPage: false });
    console.log(`✓ Saved screenshot: ${darkScreenshot}`);
  }

  // 5. Test Hostile Input Scenario
  console.log("Testing 'Hostile input' scenario...");
  const hostileBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    return btns.find((b) => b.textContent.includes("Hostile input"));
  });
  if (hostileBtn) {
    await hostileBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    
    // Check that script tags are escaped in srcdoc
    const hostileSrcDoc = await page.evaluate((el) => el.getAttribute("srcdoc"), iframe);
    if (hostileSrcDoc.includes("<script>alert") || hostileSrcDoc.includes('href="javascript:')) {
      throw new Error("SECURITY FAILURE: Hostile input was not properly sanitized/escaped!");
    }
    console.log("✓ Hostile scenario properly escaped (no unescaped scripts or javascript: hrefs)");

    const hostileScreenshot = path.join(ARTIFACT_DIR, "email_preview_page_hostile.png");
    await page.screenshot({ path: hostileScreenshot, fullPage: false });
    console.log(`✓ Saved screenshot: ${hostileScreenshot}`);
  }

  // 6. Test 'Plain-Text Fallback' tab
  console.log("Testing Plain-Text Fallback tab...");
  const plainTextTab = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    return btns.find((b) => b.textContent.includes("Plain-Text Fallback"));
  });
  if (plainTextTab) {
    await plainTextTab.click();
    await new Promise((r) => setTimeout(r, 400));

    const preContent = await page.$eval("pre", (el) => el.textContent).catch(() => null);
    if (!preContent || !preContent.includes("NZI CONDUIT - NEW TECHNICAL AUDIT REQUEST")) {
      throw new Error(`Expected <pre> with plain-text fallback, got: ${preContent}`);
    }
    console.log(`✓ Plain-text tab verified! <pre> content length: ${preContent.length} chars`);

    const textScreenshot = path.join(ARTIFACT_DIR, "email_preview_page_plaintext.png");
    await page.screenshot({ path: textScreenshot, fullPage: false });
    console.log(`✓ Saved screenshot: ${textScreenshot}`);
  } else {
    throw new Error("Could not find Plain-Text Fallback tab button!");
  }

  await browser.close();
  console.log("\n==========================================");
  console.log("✅ ALL /email-preview TESTS PASSED!");
  console.log("==========================================");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
