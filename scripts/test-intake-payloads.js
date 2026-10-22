// Test harness to simulate IntakeForm validation, submission, honeypot, and payload construction
import { SERVICE_PACKAGES } from "../src/data/servicePackages.js";
import { COMPANY_DETAILS } from "../src/lib/constants.js";

const webPackage = SERVICE_PACKAGES.find((pkg) => pkg.id === "pkg-01" || pkg.category === "webdev");
const seoPackage = SERVICE_PACKAGES.find((pkg) => pkg.id === "pkg-02" || pkg.category === "seo");
const videoPackage = SERVICE_PACKAGES.find((pkg) => pkg.id === "pkg-03" || pkg.category === "video");

const PRICE = {
  web: { name: webPackage?.name || "Launch Site", range: webPackage?.priceFormatted || "$3,500–$5,500" },
  seo: { name: seoPackage?.name || "Local Visibility SEO", range: seoPackage?.priceFormatted || "$900–$1,400/mo" },
  video: { name: videoPackage?.name || "Reel Batch", range: videoPackage?.priceFormatted || "$1,400–$2,200/mo" },
};

const BRANCHES = {
  web: { title: "Website", q: [
    { key: "type", label: "Is this a new site or a replacement?", opts: [["new", "New"], ["redesign", "Redesign of existing"], ["unsure", "Not sure"]] },
    { key: "pages", label: "Roughly how many pages?", opts: [["1-5", "1–5"], ["6-10", "6–10"], ["10+", "10+"], ["unsure", "Not sure"]] },
    { key: "content", label: "Is your text content ready?", opts: [["ready", "Ready"], ["partly", "Partly"], ["need_copy", "Need copywriting"]] },
    { key: "features", label: "Any of these needed?", multi: true, opts: [["booking", "Online booking"], ["ecommerce", "Selling products"], ["member_login", "Member login"], ["none", "None"]] },
  ] },
  seo: { title: "Local SEO", q: [
    { key: "locations", label: "How many physical locations?", opts: [["1", "1"], ["2-3", "2–3"], ["4+", "4+"], ["online_only", "Online only"]] },
    { key: "targets", label: "What services or products do you most want to be found for?", text: true },
    { key: "gbp", label: "Do you have a Google Business Profile?", opts: [["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]] },
    { key: "history", label: "Have you done SEO before?", opts: [["none", "No"], ["diy", "Yes, DIY"], ["agency", "Yes, with an agency"]] },
  ] },
  video: { title: "Short-form video", q: [
    { key: "platforms", label: "Where will the videos be posted?", multi: true, opts: [["instagram", "Instagram"], ["tiktok", "TikTok"], ["youtube_shorts", "YouTube Shorts"], ["facebook", "Facebook"], ["linkedin", "LinkedIn"], ["other", "Other"]] },
    { key: "footage", label: "Do you have your own footage?", opts: [["plenty", "Yes, plenty"], ["some", "Some"], ["none", "No (use AI b-roll)"]] },
    { key: "goal", label: "What should the videos accomplish?", opts: [["awareness", "Brand awareness"], ["offers", "Promote offers"], ["educate", "Educate customers"], ["recruit", "Recruit"], ["other", "Other"]] },
    { key: "reference", label: "Link to a video style you like (optional)", text: true, url: true },
  ] },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isUrl = (v) => { try { const u = new URL(v); return u.protocol === "http:" || u.protocol === "https:"; } catch { return false; } };

function createFormHarness(initialData = {}) {
  const d = {
    name: "", email: "", business_name: "", current_url: "", location: "",
    services: [], goal: "", budget_fit: "", timeline: "", notes: "",
    source: "", consent: false, hp: "", web: {}, seo: {}, video: {},
    ...initialData,
  };

  const selected = d.services.filter((s) => s !== "unsure");
  const multiService = selected.length > 1;
  const unsure = d.services.includes("unsure");

  const validate = () => {
    const e = {};
    if (!d.name.trim()) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(d.email.trim())) e.email = "Please enter a valid email address.";
    if (!d.business_name.trim()) e.business_name = "Please enter your business name.";
    if (d.current_url.trim() && !isUrl(d.current_url.trim())) e.current_url = "Enter a full link starting with https://";
    if (!d.location.trim()) e.location = "Please enter your city and country.";
    if (!d.services.length) e.services = "Choose at least one option.";
    if (!d.budget_fit) e.budget_fit = "Please choose one.";
    if (!d.timeline) e.timeline = "Please choose one.";
    if (!d.consent) e.consent = "We need your OK to contact you about this request.";
    if (d.video.reference?.trim() && !isUrl(d.video.reference.trim())) e.video_reference = "Enter a full link starting with https://";
    return e;
  };

  const buildPayload = (fixedTimestamp = "2026-10-22T06:00:00.000Z") => {
    const p = {
      form_version: "1",
      submitted_at: fixedTimestamp,
      name: d.name.trim(),
      email: d.email.trim(),
      business_name: d.business_name.trim(),
      current_url: d.current_url.trim(),
      location: d.location.trim(),
      services: d.services,
      goal: unsure ? d.goal.trim() : "",
      budget_fit: d.budget_fit,
      timeline: d.timeline,
      notes: d.notes.trim(),
      source: d.source,
      consent: true,
      turnstile_token: "",
    };
    for (const s of selected) {
      const shown = BRANCHES[s].q.slice(0, multiService ? 2 : undefined);
      p[s] = Object.fromEntries(shown.map((q) => [q.key, d[s][q.key] ?? (q.multi ? [] : "")]));
    }
    return p;
  };

  const simulateSubmit = () => {
    if (d.hp) {
      return { status: "success", action: "honeypot_triggered", payload: null };
    }
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      return { status: "validation_error", errors };
    }
    const payload = buildPayload();
    return { status: "success", action: "logged_in_dev", payload };
  };

  return { d, validate, buildPayload, simulateSubmit };
}

console.log("=== RUNNING INTAKE FORM SUITE ===");

// (a) Website only
const caseA = createFormHarness({
  name: "Alex Vance",
  email: "alex@example.com",
  business_name: "Black Mesa Labs",
  current_url: "https://blackmesa.gov",
  location: "Socorro, NM",
  services: ["web"],
  budget_fit: "fits",
  timeline: "month",
  notes: "Looking for high-performance React site.",
  source: "search",
  consent: true,
  web: { type: "new", pages: "1-5", content: "ready", features: ["booking"] },
});
const resA = caseA.simulateSubmit();
console.log("\n--- (a) Website Only Payload ---");
console.log(JSON.stringify(resA.payload, null, 2));

// (b) SEO + Video together
const caseB = createFormHarness({
  name: "Morgan Chen",
  email: "morgan@aperture.com",
  business_name: "Aperture Science",
  current_url: "https://aperturescience.com",
  location: "Cleveland, OH",
  services: ["seo", "video"],
  budget_fit: "fits",
  timeline: "asap",
  notes: "Need both local search ranking and reels.",
  source: "referral",
  consent: true,
  seo: { locations: "1", targets: "quantum portal hardware", gbp: "yes", history: "diy" },
  video: { platforms: ["instagram", "tiktok"], footage: "plenty", goal: "offers", reference: "https://youtube.com/watch?v=123" },
});
const resB = caseB.simulateSubmit();
console.log("\n--- (b) SEO + Video Together Payload ---");
console.log(JSON.stringify(resB.payload, null, 2));
console.log("Keys in seo branch:", Object.keys(resB.payload.seo));
console.log("Keys in video branch:", Object.keys(resB.payload.video));

// (c) "Not sure yet"
const caseC = createFormHarness({
  name: "Jordan Lee",
  email: "jordan@startup.io",
  business_name: "Apex Dynamics",
  current_url: "",
  location: "Austin, TX",
  services: ["unsure"],
  goal: "Increase client inbound leads and modernize our digital identity.",
  budget_fit: "stretch",
  timeline: "flexible",
  notes: "Need guidance from a senior engineer.",
  source: "social",
  consent: true,
});
const resC = caseC.simulateSubmit();
console.log("\n--- (c) 'Not sure yet' Payload ---");
console.log(JSON.stringify(resC.payload, null, 2));

// (d) Honeypot filled
const caseD = createFormHarness({
  name: "Spam Bot",
  email: "bot@spammer.ru",
  business_name: "Cheap Meds Inc",
  location: "Nowhere",
  services: ["web"],
  consent: true,
  hp: "http://spamlink.biz",
});
const resD = caseD.simulateSubmit();
console.log("\n--- (d) Honeypot Filled Result ---");
console.log(resD);
