import { execSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import http from "http";
import zlib from "zlib";

const PORT = 4173;
const RUNS = process.env.GUARDRAIL_RUNS ? parseInt(process.env.GUARDRAIL_RUNS) : 5;

// Thresholds to enforce
const THRESHOLDS = {
  PERFORMANCE_MIN: 95,
  LCP_MAX_MS: 2500,
  FCP_MAX_MS: 2500,
  CLS_MAX: 0.05,
  TBT_MAX_MS: 150,
  HOME_JS_MAX_BROTLI_KB: 100,
};

const ALL_ROUTES = [
  { path: "/", name: "Homepage" },
  { path: "/services", name: "Services Overview" },
  { path: "/pricing", name: "Pricing" },
  { path: "/cybersecurity", name: "Cybersecurity Service" },
  { path: "/seo", name: "SEO Service" },
  { path: "/webdev", name: "Web Development Service" },
  { path: "/about", name: "About Page" },
];

const ROUTES = process.env.GUARDRAIL_SINGLE_ROUTE
  ? ALL_ROUTES.slice(0, 1)
  : ALL_ROUTES;

function waitForServer(port, timeoutMs = 10000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      http
        .get(`http://localhost:${port}/`, (res) => {
          resolve();
        })
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

function runLighthouse(url) {
  const tmpFile = path.resolve(`scratch_lh_guardrail_${Date.now()}_${Math.random().toString(36).slice(2, 6)}.json`);
  const cmd = `npx lighthouse ${url} --preset=perf --throttling-method=simulate --output=json --output-path=${tmpFile} --chrome-flags="--headless=new --no-sandbox"`;
  execSync(cmd, { stdio: "ignore" });
  const data = JSON.parse(fs.readFileSync(tmpFile, "utf8"));
  try {
    fs.unlinkSync(tmpFile);
  } catch (e) {}

  const audits = data.audits;
  return {
    perf: Math.round(data.categories.performance.score * 100),
    fcp: audits["first-contentful-paint"].numericValue,
    lcp: audits["largest-contentful-paint"].numericValue,
    tbt: audits["total-blocking-time"].numericValue,
    cls: audits["cumulative-layout-shift"].numericValue,
  };
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function min(arr) {
  return Math.min(...arr);
}

function max(arr) {
  return Math.max(...arr);
}

function measureHomeJsBrotli() {
  const indexPath = path.resolve("dist/index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error("dist/index.html does not exist. Run npm run build first.");
  }

  const html = fs.readFileSync(indexPath, "utf8");
  const scriptMatches = [...html.matchAll(/<script[^>]+src=["\x27]([^"\x27]+)["\x27]/g)];
  const modulepreloadMatches = [...html.matchAll(/<link[^>]+rel=["\x27]modulepreload["\x27][^>]+href=["\x27]([^"\x27]+)["\x27]/g)];

  const allJs = [...scriptMatches.map((m) => m[1]), ...modulepreloadMatches.map((m) => m[1])]
    .filter((p) => p.endsWith(".js"));

  let totalBrotliBytes = 0;
  const processed = new Set();
  const fileBreakdown = [];

  for (const jsPath of allJs) {
    const cleanPath = jsPath.startsWith("/") ? jsPath.slice(1) : jsPath;
    if (processed.has(cleanPath)) continue;
    processed.add(cleanPath);

    const fullPath = path.join("dist", cleanPath);
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath);
      const brotli = zlib.brotliCompressSync(raw).length;
      totalBrotliBytes += brotli;
      fileBreakdown.push({
        file: cleanPath,
        rawKB: (raw.length / 1024).toFixed(2),
        brotliKB: (brotli / 1024).toFixed(2),
      });
    }
  }

  const totalBrotliKB = Number((totalBrotliBytes / 1024).toFixed(2));
  return { totalBrotliKB, totalBrotliBytes, fileBreakdown };
}

async function main() {
  console.log("=================================================");
  console.log("   NZI CONDUIT COMPREHENSIVE GUARDRAIL RUNNER    ");
  console.log("=================================================");
  console.log(`Enforcing Thresholds:`);
  console.log(`  - Performance:  >= ${THRESHOLDS.PERFORMANCE_MIN}`);
  console.log(`  - LCP:          <= ${THRESHOLDS.LCP_MAX_MS} ms`);
  console.log(`  - FCP:          <= ${THRESHOLDS.FCP_MAX_MS} ms`);
  console.log(`  - CLS:          <= ${THRESHOLDS.CLS_MAX}`);
  console.log(`  - TBT:          <= ${THRESHOLDS.TBT_MAX_MS} ms`);
  console.log(`  - Home JS:      <= ${THRESHOLDS.HOME_JS_MAX_BROTLI_KB} KB (brotli)`);
  console.log(`  - Evaluations:  ${RUNS} runs per route across all 7 routes`);
  console.log("=================================================\n");

  console.log("1. Building production bundle...");
  execSync("npm run build", { stdio: "inherit" });

  console.log("\n2. Measuring Home Page JavaScript Brotli size from dist...");
  const jsMeasurement = measureHomeJsBrotli();
  console.log("  Home Page JavaScript Chunks:");
  for (const f of jsMeasurement.fileBreakdown) {
    console.log(`    - ${f.file}: ${f.rawKB} KB raw | ${f.brotliKB} KB brotli`);
  }
  console.log(`  Total Home Page JS: ${jsMeasurement.totalBrotliKB} KB brotli`);

  const failures = [];

  if (jsMeasurement.totalBrotliKB > THRESHOLDS.HOME_JS_MAX_BROTLI_KB) {
    failures.push(
      `Home Page JS brotli size (${jsMeasurement.totalBrotliKB} KB) exceeds threshold of ${THRESHOLDS.HOME_JS_MAX_BROTLI_KB} KB`
    );
  }

  console.log(`\n3. Starting background compressing static server on port ${PORT}...`);
  const serverProcess = spawn("node", ["scripts/test-server.js"], {
    stdio: "inherit",
    detached: false,
  });

  await waitForServer(PORT);
  console.log("✓ Server ready on http://localhost:4173");

  const tableSummary = [];

  try {
    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route.path}`;
      console.log(`\nEvaluating [${route.name}] (${route.path}) over ${RUNS} runs...`);

      const results = [];
      for (let i = 1; i <= RUNS; i++) {
        process.stdout.write(`  Run ${i}/${RUNS}... `);
        const r = runLighthouse(url);
        results.push(r);
        console.log(
          `Score: ${r.perf} | FCP: ${Math.round(r.fcp)}ms | LCP: ${Math.round(r.lcp)}ms | TBT: ${Math.round(r.tbt)}ms | CLS: ${r.cls.toFixed(4)}`
        );
      }

      const perfs = results.map((r) => r.perf);
      const fcps = results.map((r) => Math.round(r.fcp));
      const lcps = results.map((r) => Math.round(r.lcp));
      const tbts = results.map((r) => Math.round(r.tbt));
      const clss = results.map((r) => Number(r.cls.toFixed(4)));

      const medPerf = median(perfs);
      const medFcp = median(fcps);
      const medLcp = median(lcps);
      const medTbt = median(tbts);
      const medCls = Number(median(clss).toFixed(4));

      const routeFailures = [];
      if (medPerf < THRESHOLDS.PERFORMANCE_MIN) {
        routeFailures.push(`Performance ${medPerf} < ${THRESHOLDS.PERFORMANCE_MIN}`);
      }
      if (medLcp > THRESHOLDS.LCP_MAX_MS) {
        routeFailures.push(`LCP ${medLcp}ms > ${THRESHOLDS.LCP_MAX_MS}ms`);
      }
      if (medFcp > THRESHOLDS.FCP_MAX_MS) {
        routeFailures.push(`FCP ${medFcp}ms > ${THRESHOLDS.FCP_MAX_MS}ms`);
      }
      if (medCls > THRESHOLDS.CLS_MAX) {
        routeFailures.push(`CLS ${medCls} > ${THRESHOLDS.CLS_MAX}`);
      }
      if (medTbt > THRESHOLDS.TBT_MAX_MS) {
        routeFailures.push(`TBT ${medTbt}ms > ${THRESHOLDS.TBT_MAX_MS}ms`);
      }

      if (routeFailures.length > 0) {
        failures.push(`Route [${route.name}] (${route.path}): ${routeFailures.join(", ")}`);
      }

      tableSummary.push({
        Route: route.path,
        Name: route.name,
        "Perf (med [min-max])": `${medPerf} [${min(perfs)}-${max(perfs)}]`,
        "FCP (med [min-max])": `${medFcp}ms [${min(fcps)}-${max(fcps)}]`,
        "LCP (med [min-max])": `${medLcp}ms [${min(lcps)}-${max(lcps)}]`,
        "TBT (med [min-max])": `${medTbt}ms [${min(tbts)}-${max(tbts)}]`,
        "CLS (med [min-max])": `${medCls.toFixed(4)} [${min(clss).toFixed(4)}-${max(clss).toFixed(4)}]`,
        Status: routeFailures.length === 0 ? "PASS" : `FAIL: ${routeFailures.join("; ")}`,
      });
    }
  } finally {
    serverProcess.kill();
  }

  console.log("\n=================================================");
  console.log("              GUARDRAIL REPORT SUMMARY            ");
  console.log("=================================================");
  console.table(tableSummary);
  console.log(`\nHome Page JS: ${jsMeasurement.totalBrotliKB} KB brotli (Threshold <= ${THRESHOLDS.HOME_JS_MAX_BROTLI_KB} KB) -> ${jsMeasurement.totalBrotliKB <= THRESHOLDS.HOME_JS_MAX_BROTLI_KB ? "PASS" : "FAIL"}`);

  if (failures.length > 0) {
    console.error("\n❌ GUARDRAIL ENFORCEMENT FAILED:");
    for (const f of failures) {
      console.error(`  - ✗ ${f}`);
    }
    process.exit(1);
  } else {
    console.log("\n✅ ALL GUARDRAILS PASSED:");
    console.log("  - Performance >= 95 on all 7 routes");
    console.log("  - LCP <= 2500 ms on all 7 routes");
    console.log("  - FCP <= 2500 ms on all 7 routes");
    console.log("  - CLS <= 0.05 on all 7 routes");
    console.log("  - TBT <= 150 ms on all 7 routes");
    console.log(`  - Total home-page JS <= 100 KB brotli (${jsMeasurement.totalBrotliKB} KB)`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
