import fs from "fs";
import path from "path";
import { benchmarkCondition } from "./benchmark-harness.js";

const indexPath = path.resolve("dist/index.html");
const originalHtml = fs.readFileSync(indexPath, "utf8");

async function main() {
  console.log("Starting Step 4.0 Isolation Tests...");

  // (a) Current build
  const resA = await benchmarkCondition("(a) Current build (both preloads: Inter + Jakarta)");

  // (b) Without font preload links
  const htmlNoPreloads = originalHtml.replace(
    /\s*<link rel="preload" href="\/assets\/[a-z0-9_-]+\.woff2"[^>]*>/gi,
    ""
  );
  fs.writeFileSync(indexPath, htmlNoPreloads, "utf8");
  const resB = await benchmarkCondition("(b) Without font preload links");

  // (c) Only Inter preload
  const htmlOnlyInter = originalHtml.replace(
    /\s*<link rel="preload" href="\/assets\/plus-jakarta[a-z0-9_-]*\.woff2"[^>]*>/gi,
    ""
  );
  fs.writeFileSync(indexPath, htmlOnlyInter, "utf8");
  const resC = await benchmarkCondition("(c) Only Inter preload");

  // Restore original
  fs.writeFileSync(indexPath, originalHtml, "utf8");
  console.log("\nRestored original dist/index.html.");

  console.log("\n=======================================================");
  console.log("FINAL ISOLATION COMPARISON (5-RUN MEDIANS & MIN/MAX)");
  console.log("=======================================================");
  const table = [
    {
      Condition: "(a) Both Fonts Preloaded",
      Perf: `${resA.perf.median} (${resA.perf.min}-${resA.perf.max})`,
      FCP: `${resA.fcp.median}ms (${resA.fcp.min}-${resA.fcp.max})`,
      LCP: `${resA.lcp.median}ms (${resA.lcp.min}-${resA.lcp.max})`,
      TBT: `${resA.tbt.median}ms (${resA.tbt.min}-${resA.tbt.max})`,
      CLS: `${resA.cls.median} (${resA.cls.min}-${resA.cls.max})`
    },
    {
      Condition: "(b) No Font Preloads",
      Perf: `${resB.perf.median} (${resB.perf.min}-${resB.perf.max})`,
      FCP: `${resB.fcp.median}ms (${resB.fcp.min}-${resB.fcp.max})`,
      LCP: `${resB.lcp.median}ms (${resB.lcp.min}-${resB.lcp.max})`,
      TBT: `${resB.tbt.median}ms (${resB.tbt.min}-${resB.tbt.max})`,
      CLS: `${resB.cls.median} (${resB.cls.min}-${resB.cls.max})`
    },
    {
      Condition: "(c) Only Inter Preloaded",
      Perf: `${resC.perf.median} (${resC.perf.min}-${resC.perf.max})`,
      FCP: `${resC.fcp.median}ms (${resC.fcp.min}-${resC.fcp.max})`,
      LCP: `${resC.lcp.median}ms (${resC.lcp.min}-${resC.lcp.max})`,
      TBT: `${resC.tbt.median}ms (${resC.tbt.min}-${resC.tbt.max})`,
      CLS: `${resC.cls.median} (${resC.cls.min}-${resC.cls.max})`
    }
  ];
  console.table(table);
}

main().catch(console.error);
