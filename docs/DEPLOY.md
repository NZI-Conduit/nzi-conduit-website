# NZI Conduit - Production Deployment & Verification Guide

This guide details the post-deploy verification steps for the NZI Conduit website deployed on **DreamHost Apache** using the `.htaccess` configuration.

---

## 1. Automated Post-Deploy Verification Commands

Run these `curl` commands directly against the production URL to verify all routing, redirect, caching, and MIME-type rules.

### Check 1: HTTPS & Apex Domain Redirect (Single Hop 301)
Verify that `http://` redirects to `https://` and `www` redirects to the apex domain (`https://nziconduit.com`) in a single 301 hop:
```bash
# 1a. http:// apex -> https:// apex
curl -sI -o /dev/null -w "Status: %{http_code} | Redirect: %{redirect_url}\n" http://nziconduit.com/
# Expected: Status: 301 | Redirect: https://nziconduit.com/

# 1b. http://www -> https:// apex
curl -sI -o /dev/null -w "Status: %{http_code} | Redirect: %{redirect_url}\n" http://www.nziconduit.com/
# Expected: Status: 301 | Redirect: https://nziconduit.com/

# 1c. https://www -> https:// apex
curl -sI -o /dev/null -w "Status: %{http_code} | Redirect: %{redirect_url}\n" https://www.nziconduit.com/
# Expected: Status: 301 | Redirect: https://nziconduit.com/
```

---

### Check 2: Clean Route URLs Return HTTP 200 with Static Content
Verify that clean URLs serve pre-rendered HTML without redirect loops:
```bash
curl -sI https://nziconduit.com/pricing | grep "HTTP/"
# Expected: HTTP/2 200 (or HTTP/1.1 200 OK)

curl -s https://nziconduit.com/pricing | grep -o "<h1[^>]*>.*</h1>"
# Expected: <h1 ...>Fixed scope. ...No surprises.</h1>
```

---

### Check 3: Trailing Slash Consistency (`/pricing` vs `/pricing/`)
Both URLs must return HTTP 200 and serve the same pre-rendered page without an endless redirect loop:
```bash
curl -sI https://nziconduit.com/pricing | grep "HTTP/"
# Expected: 200 OK

curl -sI https://nziconduit.com/pricing/ | grep "HTTP/"
# Expected: 200 OK
```

---

### Check 4: Non-Existent Routes Return Real HTTP 404
Verify that unknown URLs return status `404 Not Found` with the custom 404 page content:
```bash
curl -sI https://nziconduit.com/does-not-exist | grep "HTTP/"
# Expected: HTTP/2 404 (or HTTP/1.1 404 Not Found)

curl -s https://nziconduit.com/does-not-exist | grep -o "<h1[^>]*>.*</h1>"
# Expected: <h1 ...>Page Couldn't Be Located</h1>
```

---

### Check 5: Cache-Control Headers
Verify that hashed assets in `/assets/` are immutable for 1 year, and HTML documents are revalidated:
```bash
# 5a. Versioned bundle asset (replace filename with active hash)
curl -sI https://nziconduit.com/assets/index-*.js | grep -i "cache-control"
# Expected: Cache-Control: public, max-age=31536000, immutable

# 5b. HTML page
curl -sI https://nziconduit.com/ | grep -i "cache-control"
# Expected: Cache-Control: public, max-age=0, must-revalidate
```

---

### Check 6: Gzip / Brotli Compression
Verify that HTML, CSS, and JS files are served with compression:
```bash
curl -sI -H "Accept-Encoding: gzip" https://nziconduit.com/ | grep -i "content-encoding"
# Expected: Content-Encoding: gzip
```

---

### Check 7: MIME Types (.woff2 and .avif)
Verify that `.avif` images and `.woff2` font files return correct `Content-Type` headers:
```bash
# 7a. AVIF Image
curl -sI https://nziconduit.com/logo.avif | grep -i "content-type"
# Expected: Content-Type: image/avif

# 7b. Self-Hosted Variable WOFF2 Font
curl -sI https://nziconduit.com/assets/inter-latin-*.woff2 | grep -i "content-type"
# Expected: Content-Type: font/woff2
```

---

### Check 8: `robots.txt` and `sitemap.xml`
Verify that `robots.txt` and `sitemap.xml` are accessible with proper content types:
```bash
curl -sI https://nziconduit.com/robots.txt | grep -i "content-type"
# Expected: Content-Type: text/plain

curl -sI https://nziconduit.com/sitemap.xml | grep -i "content-type"
# Expected: Content-Type: application/xml
```

---

## 2. DreamHost Apache Module Dependencies

The production `.htaccess` relies on standard Apache modules:
1. `mod_rewrite`: Handles clean URL routing, canonical HTTPS/apex redirects, and custom 404 routing.
2. `mod_deflate`: Provides on-the-fly Gzip compression for text, HTML, CSS, JS, and SVG.
3. `mod_expires`: Sets browser expiration dates.
4. `mod_headers`: Enforces security headers and `Cache-Control: immutable`.
5. `mod_mime`: Declares MIME types for modern asset formats (`.avif`, `.woff2`).

### How to Detect if a Module is Disabled:
- **`mod_rewrite`:** If disabled, navigating to clean URLs like `/pricing` will return `404 Not Found` directly from Apache rather than serving `/pricing/index.html`.
- **`mod_deflate`:** If disabled, `curl -H "Accept-Encoding: gzip"` will omit the `Content-Encoding: gzip` header.
- **`mod_headers`:** If disabled, the `Cache-Control` header will not include `immutable` for assets.
- If Apache encounters an un-bracketed directive for an inactive module, it will return `500 Internal Server Error`. All directives in `.htaccess` are safeguarded with `<IfModule>` guards to prevent 500 errors.

---

## 3. Automated Performance Guardrails & CI Verification

The project includes an automated performance guardrail suite to prevent performance, asset size, and SEO regressions before deploying to production.

### How to Run the Guardrails
```bash
npm run perf
```
This script:
1. Runs a full production build (`npm run build`), including the headless pre-render and static sanity check.
2. Measures the total home-page JavaScript payload from actual `dist/` production chunks using Brotli compression.
3. Spawns an isolated local compressing static server on port 4173.
4. Executes Lighthouse Mobile audits across **all 7 production routes** (`/`, `/services`, `/pricing`, `/cybersecurity`, `/seo`, `/webdev`, `/about`), running **5 times per route** (35 runs total).
5. Computes medians and min/max for each metric, prints a detailed summary table, and exits non-zero if any threshold is violated.

### Enforced Thresholds & Definitions
| Metric / Threshold | Requirement | What It Measures |
| :--- | :---: | :--- |
| **Performance Score** | `>= 95` | Overall Lighthouse mobile performance category score based on Web Vitals weighting. |
| **Largest Contentful Paint (LCP)** | `<= 2,500 ms` | Time taken for the main above-the-fold content element (e.g. hero heading/paragraph) to render. |
| **First Contentful Paint (FCP)** | `<= 2,500 ms` | Time taken for the browser to paint the first text or graphical element. |
| **Cumulative Layout Shift (CLS)** | `<= 0.05` | Visual layout stability score during page load; verifies fonts, canvas, and layout shifts do not move content. |
| **Total Blocking Time (TBT)** | `<= 150 ms` | Total main-thread blocking time between FCP and TTI caused by long JavaScript tasks (>50 ms). |
| **Home-Page JS Size (Brotli)** | `<= 100 KB` | Sum of all JavaScript chunks loaded or preloaded by `dist/index.html`, compressed with Brotli. |

### What to Do on Failure
When `npm run perf` fails, it exits with code `1` and prints the exact offending metric(s) and route(s). Follow these diagnostic steps:

1. **Home-Page JS Brotli Failure (> 100 KB):**
   - Run `npx vite-bundle-visualizer` to identify which dependency or module was newly added to the entry chunk.
   - Ensure dynamic dialogs/modals (e.g. `RequestAuditModal`) use `React.lazy()` with on-demand prefetching rather than static imports.
   - Verify utility libraries are properly tree-shaken and avoid adding class-merging dependencies unless they are required.

2. **LCP Failure (> 2,500 ms):**
   - Check if an above-the-fold element was wrapped in an entrance animation with `opacity: 0` or delayed mount.
   - Verify self-hosted fonts (`dist/assets/*.woff2`) are properly preloaded in `<head>` and font-display is set to `swap`.
   - Ensure heavy canvas animations (e.g. `AuroraBars`) remain deferred until after first paint via `requestAnimationFrame` post-mount.

3. **CLS Failure (> 0.05):**
   - Verify that `@font-face` rules in `theme.css` retain the fallback metric overrides (`size-adjust`, `ascent-override`, `descent-override`).
   - Check for newly added images or banners missing explicit `width` and `height` attributes or aspect-ratio reservations.

4. **TBT Failure (> 150 ms):**
   - Inspect main-thread execution using Chrome DevTools Performance panel or Lighthouse trace (`--save-assets`).
   - Look for synchronous work executed during hydration in `main.jsx` or top-level component render.

5. **Quick Debugging / Targeted Route Runs:**
   You can run targeted checks using environment variables:
   ```bash
   # Run 1 evaluation on Homepage only:
   GUARDRAIL_SINGLE_ROUTE=1 GUARDRAIL_RUNS=1 node scripts/perf-guardrail.js
   ```

---

## 4. Intake Form Setup

The intake form ([src/components/IntakeForm.jsx](file:///Users/pratyakshkalsi/Desktop/NZIConduit/nzi-conduit-website/src/components/IntakeForm.jsx)) is lazily loaded on demand inside the audit modal and posts verified submissions directly to an n8n webhook.

### Required Environment Variables

Configure these variables in your deployment environment (e.g., DreamHost environment or `.env.production`):

| Variable | Description | Exposure |
| :--- | :--- | :--- |
| `VITE_INTAKE_WEBHOOK_URL` | Public Cloudflare Tunnel URL of the n8n webhook endpoint (e.g. `https://n8n.yourdomain.com/webhook/intake`) | Public client-side bundle |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public site key for bot verification | Public client-side bundle |

> [!IMPORTANT]
> Never put webhook secrets or private keys in these environment variables. Everything prefixed with `VITE_` is bundled into the client-side JavaScript. All client validation is UX-only; the backend n8n workflow must independently validate all fields and verify the Turnstile token with Cloudflare's siteverify API.

### Where to Get the Cloudflare Turnstile Site Key
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Select **Turnstile** from the navigation sidebar.
3. Click **Add widget**:
   - **Widget name:** `NZI Conduit Intake`
   - **Domains:** Add `nziconduit.com` (and `localhost` for local testing).
   - **Widget Mode:** Managed (or Non-interactive) on the free tier.
4. Copy the generated **Site Key** and assign it to `VITE_TURNSTILE_SITE_KEY`.
5. The **Secret Key** goes strictly into your private n8n workflow credentials, never in this frontend repository.

### n8n Webhook CORS Requirements
Because submissions are dispatched via `fetch()` directly from the browser at `https://nziconduit.com` to the webhook URL:
1. In the n8n Webhook node settings:
   - **HTTP Method:** `POST`
   - **Response Mode:** `When Last Node Finishes` (or `Immediately`)
   - **Allowed Origins (CORS):** Set strictly to `https://nziconduit.com` (or include `http://localhost:5173` during local staging).
2. The endpoint must return the following CORS headers on `OPTIONS` preflight and `POST` responses:
   - `Access-Control-Allow-Origin: https://nziconduit.com`
   - `Access-Control-Allow-Methods: POST, OPTIONS`
   - `Access-Control-Allow-Headers: Content-Type`

### Missing Webhook Behavior (Production vs Development)
- **Development Mode (`import.meta.env.DEV`):** If `VITE_INTAKE_WEBHOOK_URL` is empty or not set, the form simulates a successful submission, logs the constructed payload to the browser console (`console.info("[intake] no webhook URL set; payload:", payload)`), and renders the success confirmation screen.
- **Production Mode (`import.meta.env.PROD`):** If `VITE_INTAKE_WEBHOOK_URL` is empty, the form immediately halts submission, fails safely, and renders the user-facing error message:
  > *"We couldn’t send your request. Please try again, or email start@nziconduit.com."*
