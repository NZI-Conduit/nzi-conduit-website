import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const RUNS = 5;
const URL = "http://localhost:4173/";

function runLighthouse() {
  const tmpFile = path.resolve("scratch_lh.json");
  const cmd = `npx lighthouse ${URL} --preset=perf --throttling-method=simulate --output=json --output-path=${tmpFile} --chrome-flags="--headless=new --no-sandbox"`;
  execSync(cmd, { stdio: "ignore" });
  const data = JSON.parse(fs.readFileSync(tmpFile, "utf8"));
  try { fs.unlinkSync(tmpFile); } catch (e) {}

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

export async function benchmarkCondition(label) {
  console.log(`\n========================================`);
  console.log(`BENCHMARKING: ${label} (${RUNS} runs)`);
  console.log(`========================================`);

  const results = [];
  for (let i = 1; i <= RUNS; i++) {
    process.stdout.write(`  Run ${i}/${RUNS}... `);
    const r = runLighthouse();
    results.push(r);
    console.log(`Perf: ${r.perf} | FCP: ${Math.round(r.fcp)}ms | LCP: ${Math.round(r.lcp)}ms | TBT: ${Math.round(r.tbt)}ms | CLS: ${r.cls.toFixed(4)}`);
  }

  const perfs = results.map(r => r.perf);
  const fcps = results.map(r => r.fcp);
  const lcps = results.map(r => r.lcp);
  const tbts = results.map(r => r.tbt);
  const clss = results.map(r => r.cls);

  const summary = {
    label,
    perf: { median: median(perfs), min: Math.min(...perfs), max: Math.max(...perfs) },
    fcp: { median: Math.round(median(fcps)), min: Math.round(Math.min(...fcps)), max: Math.round(Math.max(...fcps)) },
    lcp: { median: Math.round(median(lcps)), min: Math.round(Math.min(...lcps)), max: Math.round(Math.max(...lcps)) },
    tbt: { median: Math.round(median(tbts)), min: Math.round(Math.min(...tbts)), max: Math.round(Math.max(...tbts)) },
    cls: { median: Number(median(clss).toFixed(4)), min: Number(Math.min(...clss).toFixed(4)), max: Number(Math.max(...clss).toFixed(4)) },
  };

  console.log(`\n>>> SUMMARY for [${label}]:`);
  console.log(`Perf: ${summary.perf.median} (min: ${summary.perf.min}, max: ${summary.perf.max})`);
  console.log(`FCP:  ${summary.fcp.median} ms (min: ${summary.fcp.min}, max: ${summary.fcp.max})`);
  console.log(`LCP:  ${summary.lcp.median} ms (min: ${summary.lcp.min}, max: ${summary.lcp.max})`);
  console.log(`TBT:  ${summary.tbt.median} ms (min: ${summary.tbt.min}, max: ${summary.tbt.max})`);
  console.log(`CLS:  ${summary.cls.median} (min: ${summary.cls.min}, max: ${summary.cls.max})`);

  return summary;
}
