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
