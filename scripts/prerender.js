import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";
import { SEO_ROUTES, getBreadcrumbJsonLd } from "../src/lib/seo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
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

  const server = await startServer();
  console.log(`✓ Local snapshot server started on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
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
  console.log("=== PRE-RENDER COMPLETE ===\n");
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
