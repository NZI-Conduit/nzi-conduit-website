import http from "http";
import fs from "fs";
import path from "path";
import zlib from "zlib";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const PORT = process.env.PORT || 4173;

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
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const cache = new Map();

const server = http.createServer((req, res) => {
  const urlPath = req.url.split("?")[0];
  let filePath = path.join(distDir, urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  // Clean URL resolution
  if (!fs.existsSync(filePath) && !path.extname(urlPath)) {
    const cleanPath = urlPath.replace(/^\//, "").replace(/\/$/, "");
    const nested = path.join(distDir, cleanPath, "index.html");
    const direct = path.join(distDir, `${cleanPath}.html`);
    if (fs.existsSync(nested)) {
      filePath = nested;
    } else if (fs.existsSync(direct)) {
      filePath = direct;
    }
  }

  // 404 fallback
  let statusCode = 200;
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, "404.html");
    statusCode = 404;
    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const fileContent = fs.readFileSync(filePath);

  const acceptEncoding = req.headers["accept-encoding"] || "";
  const isCompressible = /text|javascript|css|json|xml|svg/.test(contentType);

  if (isCompressible && acceptEncoding.includes("br")) {
    const cacheKey = `br:${filePath}`;
    let compressed = cache.get(cacheKey);
    if (!compressed) {
      compressed = zlib.brotliCompressSync(fileContent);
      cache.set(cacheKey, compressed);
    }
    res.writeHead(statusCode, {
      "Content-Type": contentType,
      "Content-Encoding": "br",
      "Vary": "Accept-Encoding",
    });
    res.end(compressed);
  } else if (isCompressible && acceptEncoding.includes("gzip")) {
    const cacheKey = `gz:${filePath}`;
    let compressed = cache.get(cacheKey);
    if (!compressed) {
      compressed = zlib.gzipSync(fileContent);
      cache.set(cacheKey, compressed);
    }
    res.writeHead(statusCode, {
      "Content-Type": contentType,
      "Content-Encoding": "gzip",
      "Vary": "Accept-Encoding",
    });
    res.end(compressed);
  } else {
    res.writeHead(statusCode, {
      "Content-Type": contentType,
      "Content-Length": Buffer.byteLength(fileContent),
    });
    res.end(fileContent);
  }
});

server.listen(PORT, () => {
  console.log(`Compressing static server running on http://localhost:${PORT}`);
});
