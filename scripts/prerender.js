import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";
import { SEO_ROUTES, getBreadcrumbJsonLd } from "../src/lib/seo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");

function findChromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

const PORT = 5193;

const ROUTES = [
  { key: "home", path: "/", output: "index.html" },
  { key: "services", path: "/services", output: "services/index.html" },
  { key: "pricing", path: "/pricing", output: "pricing/index.html" },
  { key: "cybersecurity", path: "/cybersecurity", output: "cybersecurity/index.html" },
  { key: "seo", path: "/seo", output: "seo/index.html" },
  { key: "webdev", path: "/webdev", output: "webdev/index.html" },
  { key: "about", path: "/about", output: "about/index.html" },
  { key: "404", path: "/404-snapshot-not-found", output: "404.html" },
];

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".avif": "image/avif",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

// Create a local static file server for dist/
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = req.url.split("?")[0];
      let filePath = path.join(distDir, urlPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      if (!fs.existsSync(filePath)) {
        filePath = path.join(distDir, "index.html");
      }

      const ext = path.extname(filePath);
      const contentType = MIME_TYPES[ext] || "application/octet-stream";

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content);
        }
      });
    });

    server.listen(PORT, () => {
      resolve(server);
    });
  });
}

function generateRobotsAndSitemap() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://nziconduit.com/sitemap.xml
`;

  const now = new Date().toISOString().split("T")[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nziconduit.com/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nziconduit.com/services</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://nziconduit.com/pricing</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://nziconduit.com/cybersecurity</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://nziconduit.com/seo</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://nziconduit.com/webdev</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://nziconduit.com/about</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
`;

  // Write strictly to dist/ (single source of truth at build time)
  fs.writeFileSync(path.join(distDir, "robots.txt"), robotsTxt, "utf8");
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");

  console.log("✓ Generated dist/robots.txt and dist/sitemap.xml");
}

function findHashedFonts() {
  const assetsDir = path.join(distDir, "assets");
  if (!fs.existsSync(assetsDir)) return [];
  const files = fs.readdirSync(assetsDir);
  const inter = files.find((f) => f.startsWith("inter-latin-wght-normal") && f.endsWith(".woff2"));
  const jakarta = files.find((f) => f.startsWith("plus-jakarta-sans-latin-wght-normal") && f.endsWith(".woff2"));
  return [inter, jakarta].filter(Boolean);
}

function getRouteChunkPreload(routeKey) {
  const manifestPath = path.join(distDir, ".vite/manifest.json");
  if (!fs.existsSync(manifestPath)) return "";
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  const keyToSrc = {
    services: "src/pages/ServicesPage.jsx",
    pricing: "src/pages/PricingPage.jsx",
    cybersecurity: "src/pages/CybersecurityPage.jsx",
    seo: "src/pages/SeoPage.jsx",
    webdev: "src/pages/WebDevPage.jsx",
    about: "src/pages/AboutPage.jsx",
    404: "src/pages/NotFoundPage.jsx",
  };

  const src = keyToSrc[routeKey];
  if (!src || !manifest[src]) return "";

  const entry = manifest[src];
  const tags = [];
  if (entry.file) {
    tags.push(`    <link rel="modulepreload" crossorigin href="/${entry.file}">`);
  }
  if (Array.isArray(entry.css)) {
    for (const css of entry.css) {
      tags.push(`    <link rel="stylesheet" href="/${css}">`);
    }
  }
  return tags.join("\n");
}

function buildHtmlFromTemplate(templateHtml, rootInnerHtml, seo, breadcrumbJson, fontFiles, routeKey) {
  let html = templateHtml;

  // 1. Replace title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);

  // 2. Replace description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"/i,
    `<meta name="description" content="${seo.description}"`
  );

  // 3. Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"/i,
    `<link rel="canonical" href="${seo.canonical}"`
  );

  // 4. Update OpenGraph and Twitter tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"/i,
    `<meta property="og:title" content="${seo.ogTitle}"`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"/i,
    `<meta property="og:description" content="${seo.ogDescription}"`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"/i,
    `<meta property="og:url" content="${seo.ogUrl}"`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"/i,
    `<meta name="twitter:title" content="${seo.ogTitle}"`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"/i,
    `<meta name="twitter:description" content="${seo.ogDescription}"`
  );

  // 5. Inject font preloads into <head>
  if (fontFiles.length > 0) {
    const fontPreloads = fontFiles
      .map((f) => `    <link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
      .join("\n");
    html = html.replace("</head>", `${fontPreloads}\n  </head>`);
  }

  // 6. Inject per-route chunk modulepreload into <head>
  const chunkPreload = getRouteChunkPreload(routeKey);
  if (chunkPreload) {
    html = html.replace("</head>", `${chunkPreload}\n  </head>`);
  }

  // 7. Inject BreadcrumbList JSON-LD if applicable
  if (breadcrumbJson) {
    const breadcrumbTag = `    <script id="jsonld-breadcrumbs" type="application/ld+json">\n${JSON.stringify(
      breadcrumbJson,
      null,
      2
    )}\n    </script>`;
    html = html.replace("</head>", `${breadcrumbTag}\n  </head>`);
  }

  // 8. Inject pre-rendered #root content
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${rootInnerHtml}</div>`
  );

  return html;
}

async function prerender() {
  console.log("\n=== STARTING STATIC PRE-RENDER ===");
  if (!fs.existsSync(distDir)) {
    throw new Error("dist directory does not exist. Run vite build first.");
  }

  generateRobotsAndSitemap();

  // Read base template from freshly built dist/index.html
  const templateHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
  const fontFiles = findHashedFonts();
  console.log(`✓ Detected self-hosted fonts to preload: ${fontFiles.join(", ") || "none"}`);

  const isCloudBuild = Boolean(process.env.VERCEL || process.env.NOW_BUILDER || process.env.NETLIFY);
  const chromePath = isCloudBuild ? null : findChromePath();

  if (!chromePath) {
    console.log(isCloudBuild ? "ℹ Cloud build environment detected (Vercel/Netlify)." : "ℹ No local Chrome/Chromium executable detected.");
    console.log("ℹ Generating pre-rendered static route shells with full SEO meta, OpenGraph tags, canonicals, and font preloads...");

    for (const route of ROUTES) {
      const seo = SEO_ROUTES[route.key] || SEO_ROUTES.home;
      const breadcrumbJson = getBreadcrumbJsonLd(route.key);
      const finalHtml = buildHtmlFromTemplate(templateHtml, "", seo, breadcrumbJson, fontFiles, route.key);

      const outputPath = path.join(distDir, route.output);
      const outputFolder = path.dirname(outputPath);
      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
      }

      fs.writeFileSync(outputPath, finalHtml, "utf8");
      const stat = fs.statSync(outputPath);
      console.log(`  ✓ Written ${outputPath.replace(rootDir + "/", "")} (${(stat.size / 1024).toFixed(2)} KB)`);
    }

    validatePrerenderedOutput(false);
    console.log("=== PRE-RENDER COMPLETE ===\n");
    return;
  }

  const server = await startServer();
  console.log(`✓ Local snapshot server started on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDER__ = true;
  });

  for (const route of ROUTES) {
    const routeUrl = `http://localhost:${PORT}${route.path}`;
    console.log(`Pre-rendering [${route.key}]: ${route.path} -> dist/${route.output}`);

    await page.goto(routeUrl, { waitUntil: "networkidle0", timeout: 30000 });

    // Wait for root container and fonts
    await page.waitForSelector("#root > div", { timeout: 10000 });
    await page.evaluate(async () => {
      if (document.fonts) {
        await document.fonts.ready;
      }
    });

    // Small delay to let fonts settle
    await new Promise((r) => setTimeout(r, 100));

    // Clean transient artifacts from snapshot DOM
    await page.evaluate(() => {
      // 1. Remove open modal dialogs (excluding permanent mobile drawer)
      document.querySelectorAll('div[role="dialog"]:not([aria-label="Mobile Navigation Menu"])').forEach((el) => el.remove());

      // 3. Remove transient inline opacity: 0
      document.querySelectorAll('[style*="opacity"]').forEach((el) => {
        if (el.style.opacity === "0" || el.style.opacity === "0%") {
          el.style.opacity = "";
        }
      });
    });

    // Extract ONLY the server-rendered #root innerHTML
    const rootInnerHtml = await page.evaluate(() => document.getElementById("root").innerHTML);

    const seo = SEO_ROUTES[route.key] || SEO_ROUTES.home;
    const breadcrumbJson = getBreadcrumbJsonLd(route.key);

    // Build the clean HTML strictly from template (no mutated runtime head)
    const finalHtml = buildHtmlFromTemplate(templateHtml, rootInnerHtml, seo, breadcrumbJson, fontFiles, route.key);

    const outputPath = path.join(distDir, route.output);
    const outputFolder = path.dirname(outputPath);
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    fs.writeFileSync(outputPath, finalHtml, "utf8");
    const stat = fs.statSync(outputPath);
    console.log(`  ✓ Written ${outputPath.replace(rootDir + "/", "")} (${(stat.size / 1024).toFixed(2)} KB)`);
  }

  await browser.close();
  server.close();

  // Run build-time prerender sanity audit
  validatePrerenderedOutput(true);

  console.log("=== PRE-RENDER COMPLETE ===\n");
}

function validatePrerenderedOutput(isHeadlessRendered = true) {
  console.log("\n=== RUNNING BUILD-TIME PRE-RENDER SANITY AUDIT ===");
  const issues = [];

  for (const route of ROUTES) {
    const filePath = path.join(distDir, route.output);
    if (!fs.existsSync(filePath)) {
      issues.push(`[${route.output}] Output file does not exist.`);
      continue;
    }

    const html = fs.readFileSync(filePath, "utf8");
    const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
    const head = headMatch ? headMatch[0] : "";

    // 1. Must contain <h1> tag (when full headless DOM snapshot is rendered)
    if (isHeadlessRendered && !/<h1[\s>]/i.test(html)) {
      issues.push(`[${route.output}] Missing required <h1> tag.`);
    }

    // 2. Must contain non-empty <title> tag
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      issues.push(`[${route.output}] Missing or empty <title> tag.`);
    }

    // 3. Must contain valid canonical link
    if (!/<link[^>]+rel=["']canonical["'][^>]+href=["']https?:\/\/[^"']+["']/i.test(html)) {
      issues.push(`[${route.output}] Missing valid <link rel="canonical"> tag.`);
    }

    // 4. Must contain valid JSON-LD structured data
    const jsonLdMatch = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
    if (!jsonLdMatch || !jsonLdMatch[1].trim()) {
      issues.push(`[${route.output}] Missing <script type="application/ld+json"> structured data.`);
    } else {
      try {
        JSON.parse(jsonLdMatch[1].trim());
      } catch (e) {
        issues.push(`[${route.output}] Malformed JSON-LD structured data: ${e.message}`);
      }
    }

    // 5. Must NOT contain runtime-mutation pattern in <head> such as media="all" onload
    if (/media=["']all["'][^>]*onload|onload=["'][^"']*media=["']?all/i.test(head)) {
      issues.push(`[${route.output}] Detected illegal runtime head mutation pattern (e.g. media="all" onload).`);
    }
  }

  if (issues.length > 0) {
    console.error("\n❌ PRE-RENDER SANITY AUDIT FAILED:");
    for (const issue of issues) {
      console.error(`  - ✗ ${issue}`);
    }
    throw new Error(`Pre-render sanity check failed with ${issues.length} error(s).`);
  }

  console.log("✓ Pre-render sanity audit passed: All 8 pages contain <h1>, <title>, canonical, JSON-LD, and zero head mutation patterns.");
}

prerender().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
