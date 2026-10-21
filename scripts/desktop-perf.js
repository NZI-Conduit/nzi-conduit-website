import { execSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import http from "http";

const PORT = 4173;
const RUNS = 5;

const ROUTES = [
  { path: "/", name: "Homepage" },
  { path: "/services", name: "Services Overview" },
  { path: "/pricing", name: "Pricing" },
  { path: "/cybersecurity", name: "Cybersecurity Service" },
  { path: "/seo", name: "SEO Service" },
  { path: "/webdev", name: "Web Development Service" },
  { path: "/about", name: "About Page" },
];

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

function runLighthouseDesktop(url) {
  const tmpFile = path.resolve(`scratch_lh_desktop_${Date.now()}_${Math.random().toString(36).slice(2, 6)}.json`);
  const cmd = `npx lighthouse ${url} --preset=desktop --throttling-method=simulate --output=json --output-path=${tmpFile} --chrome-flags="--headless=new --no-sandbox"`;
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

async function main() {
  console.log("=================================================");
  console.log("   NZI CONDUIT LIGHTHOUSE DESKTOP BENCHMARK     ");
  console.log("=================================================");
  console.log(`Evaluating ${RUNS} runs per route across all 7 routes (Preset: Desktop)...`);

  console.log(`Starting background compressing static server on port ${PORT}...`);
  const serverProcess = spawn("node", ["scripts/test-server.js"], {
    stdio: "inherit",
    detached: false,
  });

  await waitForServer(PORT);
  console.log("✓ Server ready on http://localhost:4173\n");

  const tableSummary = [];

  try {
    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route.path}`;
      console.log(`Evaluating [${route.name}] (${route.path}) over ${RUNS} desktop runs...`);

      const results = [];
      for (let i = 1; i <= RUNS; i++) {
        process.stdout.write(`  Run ${i}/${RUNS}... `);
        const r = runLighthouseDesktop(url);
        results.push(r);
        console.log(
          `Score: ${r.perf} | FCP: ${Math.round(r.fcp)}ms | LCP: ${Math.round(r.lcp)}ms | TBT: ${Math.round(r.tbt)}ms | CLS: ${r.cls.toFixed(4)}`
        );
      }

      const perfs = results.map((r) => r.perf);
      const lcps = results.map((r) => Math.round(r.lcp));
      const tbts = results.map((r) => Math.round(r.tbt));
      const clss = results.map((r) => Number(r.cls.toFixed(4)));

      const medPerf = median(perfs);
      const medLcp = median(lcps);
      const medTbt = median(tbts);
      const medCls = Number(median(clss).toFixed(4));

      tableSummary.push({
        Route: route.path,
        Name: route.name,
        "Perf (med [min-max])": `${medPerf} [${min(perfs)}-${max(perfs)}]`,
        "LCP (med [min-max])": `${medLcp}ms [${min(lcps)}-${max(lcps)}]`,
        "TBT (med [min-max])": `${medTbt}ms [${min(tbts)}-${max(tbts)}]`,
        "CLS (med [min-max])": `${medCls.toFixed(4)} [${min(clss).toFixed(4)}-${max(clss).toFixed(4)}]`,
      });
    }
  } finally {
    serverProcess.kill();
  }

  console.log("\n=================================================");
  console.log("       LIGHTHOUSE DESKTOP BENCHMARK SUMMARY       ");
  console.log("=================================================");
  console.table(tableSummary);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
