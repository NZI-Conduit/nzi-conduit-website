import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");
const publicDir = path.resolve(rootDir, "public");

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

const SEO_METADATA = {
  home: {
    title: "NZI Conduit | Personalized IT Solutions",
    description: "Direct engineer-backed web development, search engine strategy, and cybersecurity auditing structured specifically for creators and growing businesses.",
    canonical: "https://nziconduit.com/",
    ogTitle: "NZI Conduit | Personalized IT Solutions",
    ogDescription: "Direct engineer-backed web development, search engine strategy, and cybersecurity auditing structured specifically for creators and growing businesses.",
    ogUrl: "https://nziconduit.com/",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumb: null,
  },
  services: {
    title: "Engineered Digital Services | NZI Conduit",
    description: "Comprehensive IT services: custom web applications, precision search engine visibility, and proactive cybersecurity auditing.",
    canonical: "https://nziconduit.com/services",
    ogTitle: "Engineered Digital Services | NZI Conduit",
    ogDescription: "Custom web applications, search engine strategy, and proactive cybersecurity auditing built by senior engineers.",
    ogUrl: "https://nziconduit.com/services",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumb: "Services",
  },
  pricing: {
    title: "Transparent Fixed Pricing & Packages | NZI Conduit",
    description: "Fixed-scope engineering deliverables with locked boundaries. Compare our Starter, Growth, Enterprise, and Retainer packages.",
    canonical: "https://nziconduit.com/pricing",
    ogTitle: "Transparent Fixed Pricing & Packages | NZI Conduit",
    ogDescription: "Fixed-scope engineering deliverables with locked boundaries. Clear milestones, no open-ended guesswork.",
    ogUrl: "https://nziconduit.com/pricing",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumb: "Pricing & Packages",
  },
  cybersecurity: {
    title: "Cybersecurity Audits & Vulnerability Assessments | NZI Conduit",
    description: "Enterprise security auditing, penetration testing, and vulnerability assessments designed for independent businesses and modern apps.",
    canonical: "https://nziconduit.com/cybersecurity",
    ogTitle: "Cybersecurity Audits & Vulnerability Assessments | NZI Conduit",
    ogDescription: "Enterprise security auditing, penetration testing, and vulnerability assessments designed for independent businesses and modern apps.",
    ogUrl: "https://nziconduit.com/cybersecurity",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumb: "Cybersecurity Audits",
  },
  seo: {
    title: "Technical Search Engine Optimization & Growth | NZI Conduit",
    description: "Data-driven SEO strategies, technical audits, Core Web Vitals optimization, and keyword discovery to dominate organic search.",
    canonical: "https://nziconduit.com/seo",
    ogTitle: "Technical Search Engine Optimization & Growth | NZI Conduit",
    ogDescription: "Data-driven SEO strategies, technical audits, Core Web Vitals optimization, and keyword discovery to dominate organic search.",
    ogUrl: "https://nziconduit.com/seo",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumb: "SEO Strategy",
  },
  webdev: {
    title: "Custom Web Application Development | NZI Conduit",
    description: "High-performance modern web apps built with React, Vite, Tailwind CSS, and edge deployment for sub-second load times.",
    canonical: "https://nziconduit.com/webdev",
    ogTitle: "Custom Web Application Development | NZI Conduit",
    ogDescription: "High-performance modern web apps built with React, Vite, Tailwind CSS, and edge deployment for sub-second load times.",
    ogUrl: "https://nziconduit.com/webdev",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumb: "Web Development",
  },
  about: {
    title: "About NZI Conduit | Senior Engineering IT Partner",
    description: "Learn why NZI Conduit was founded: to give independent operators and high-growth teams direct access to senior engineers without corporate bloat.",
    canonical: "https://nziconduit.com/about",
    ogTitle: "About NZI Conduit | Senior Engineering IT Partner",
    ogDescription: "Learn why NZI Conduit was founded: direct access to senior engineers without corporate bloat.",
    ogUrl: "https://nziconduit.com/about",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumb: "About Us",
  },
  "404": {
    title: "404 - Page Not Found | NZI Conduit",
    description: "The page you are looking for does not exist or has been moved.",
    canonical: "https://nziconduit.com/404",
    ogTitle: "404 - Page Not Found | NZI Conduit",
    ogDescription: "The page you are looking for does not exist or has been moved.",
    ogUrl: "https://nziconduit.com/404",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumb: null,
  },
};

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
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
          res.end(content, "utf-8");
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

  // Write to dist/ and public/
  fs.writeFileSync(path.join(distDir, "robots.txt"), robotsTxt, "utf8");
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");

  console.log("✓ Generated robots.txt and sitemap.xml");
}

async function prerender() {
  console.log("\n=== STARTING STATIC PRE-RENDER ===");
  if (!fs.existsSync(distDir)) {
    throw new Error("dist directory does not exist. Run vite build first.");
  }

  generateRobotsAndSitemap();

  const server = await startServer();
  console.log(`✓ Local snapshot server started on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

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

    // Small delay to let any microtasks settle
    await new Promise((r) => setTimeout(r, 200));

    // Clean transient artifacts and inject per-route SEO tags
    const meta = SEO_METADATA[route.key] || SEO_METADATA.home;
    await page.evaluate((seo) => {
      // 1. Remove TopProgressBar if present mid-animation
      document.querySelectorAll(".fixed.top-0.left-0.right-0.h-1").forEach((el) => el.remove());

      // 2. Remove any modal backdrops or open overlays (excluding the permanent mobile drawer)
      document.querySelectorAll('div[role="dialog"]:not([aria-label="Mobile Navigation Menu"])').forEach((el) => el.remove());

      // 3. Remove any transient inline opacity: 0 or mid-animation transforms
      document.querySelectorAll('[style*="opacity"]').forEach((el) => {
        if (el.style.opacity === "0" || el.style.opacity === "0%") {
          el.style.opacity = "";
        }
      });

      // 3. Update Title & Meta
      document.title = seo.title;

      const updateMeta = (name, content, attr = "name") => {
        let el = document.querySelector(`meta[${attr}="${name}"]`);
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute(attr, name);
          document.head.appendChild(el);
        }
        el.setAttribute("content", content);
      };

      updateMeta("description", seo.description);
      updateMeta("og:title", seo.ogTitle, "property");
      updateMeta("og:description", seo.ogDescription, "property");
      updateMeta("og:url", seo.ogUrl, "property");
      updateMeta("og:image", seo.ogImage, "property");
      updateMeta("twitter:title", seo.ogTitle, "name");
      updateMeta("twitter:description", seo.ogDescription, "name");
      updateMeta("twitter:image", seo.ogImage, "name");

      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", seo.canonical);

      // 4. Inject BreadcrumbList JSON-LD if applicable
      let breadcrumbScript = document.getElementById("jsonld-breadcrumbs");
      if (seo.breadcrumb) {
        if (!breadcrumbScript) {
          breadcrumbScript = document.createElement("script");
          breadcrumbScript.id = "jsonld-breadcrumbs";
          breadcrumbScript.type = "application/ld+json";
          document.head.appendChild(breadcrumbScript);
        }
        breadcrumbScript.textContent = JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://nziconduit.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": seo.breadcrumb,
                "item": seo.canonical
              }
            ]
          },
          null,
          2
        );
      } else if (breadcrumbScript) {
        breadcrumbScript.remove();
      }
    }, meta);

    // Extract full HTML
    const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);

    const outputPath = path.join(distDir, route.output);
    const outputFolder = path.dirname(outputPath);
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    fs.writeFileSync(outputPath, html, "utf8");
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
