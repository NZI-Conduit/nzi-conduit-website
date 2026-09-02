/**
 * Single Source of Truth for Service Packages, Pricing, Capacity, and Terms.
 * All pricing, scope inclusions/exclusions, timelines, and business rules originate here.
 */

export const SERVICE_PACKAGES = [
  {
    id: "pkg-01",
    code: "PKG 01",
    icon: "code",
    name: "Launch Site",
    kind: "Web development · one-time project",
    category: "webdev",
    badge: "Starter",
    badgeVariant: "primary",
    priceFormatted: "$3,500–$5,500",
    priceType: "fixed",
    priceSubtext: "Fixed, scoped by page count/features at signing",
    bestFor: "A small business that needs a clean, professional website and doesn't require e-commerce or complex functionality.",
    included: [
      "1 discovery call (60 min) to define pages, goals, and content needs",
      "Up to 5 pages (e.g. Home, About, Services, Contact, + 1 more)",
      "Custom design using a premium theme/framework tailored to brand colors and fonts",
      "Mobile-responsive build, tested across major browsers",
      "Contact form with spam protection",
      "Basic on-page SEO setup: title tags, meta descriptions, XML sitemap, GA4 + GSC",
      "Google Business Profile connection / link-out",
      "1 structured round of revisions after first draft is presented",
      "30-day post-launch bug-fix warranty (bugs only, not new work)",
    ],
    excluded: [
      "Copywriting (client supplies text, or add it on)",
      "E-commerce, booking/scheduling systems, membership/login areas",
      "Custom illustration, animation, or bespoke UI from scratch",
      "Multi-language sites",
      "Ongoing maintenance or hosting management",
      "Additional revision rounds beyond the one included",
    ],
    timeline: "3–4 weeks from date all assets are received (clock pauses on client delays)",
    capacityBoundary: "Boundary: Fixed 5 pages, 1 revision round, and content-dependency clause (client delay pauses timeline, does not compress queue).",
    addons: [
      { name: "Copywriting", price: "$75–$125/page" },
      { name: "Extra page beyond 5", price: "$250–$400" },
      { name: "Booking/scheduling integration", price: "$400–$800" },
      { name: "Basic e-commerce (up to 20 products)", price: "$1,200+" },
      { name: "Logo / brand refresh", price: "$500+" },
      { name: "Extra revision round", price: "$200" },
    ],
  },
  {
    id: "pkg-02",
    code: "PKG 02",
    icon: "trending_up",
    name: "Local Visibility SEO",
    kind: "SEO · monthly retainer",
    category: "seo",
    badge: "Starter",
    badgeVariant: "primary",
    priceFormatted: "$900–$1,400/mo",
    priceType: "recurring",
    priceSubtext: "Per month, 3-month minimum commitment",
    bestFor: "A single-location small business that wants to rank locally and hasn't had structured SEO work done before.",
    included: [
      "Month 1: full technical SEO audit + priority fixes",
      "Google Business Profile optimization and ongoing management",
      "On-page optimization for up to 5 core pages",
      "Monthly keyword tracking (up to 15 keywords)",
      "2 content pieces/month (AI-assisted drafting with human edit and fact-check)",
      "Citation cleanup/creation across top 10 relevant directories (month 1–2)",
      "Monthly performance report (rankings, traffic, GBP insights)",
    ],
    excluded: [
      "Link building / digital PR campaigns",
      "Multi-location SEO",
      "Paid ad management (Google Ads, Meta Ads)",
      "Full site redesigns or new page builds",
      "More than 5 pages optimized or 15 keywords tracked",
      "Unlimited content — 2 pieces/month is the ceiling",
    ],
    timeline: "Ongoing · 3-month minimum commitment, 30-day written notice after",
    capacityBoundary: "Boundary: Hard caps on pages (5), keywords (15), and content volume (2/mo) plus 3-month minimum prevent scope creep.",
    addons: [
      { name: "Extra content piece", price: "$150–$250 each" },
      { name: "Additional keyword cluster tracking", price: "$100/month" },
      { name: "Link-building campaign", price: "$500–$1,500/month" },
      { name: "Social cross-posting of GBP content", price: "$150/month" },
    ],
  },
  {
    id: "pkg-03",
    code: "PKG 03",
    icon: "smart_display",
    name: "Reel Batch",
    kind: "AI video production · monthly retainer",
    category: "video",
    badge: "Starter",
    badgeVariant: "primary",
    priceFormatted: "$1,400–$2,200/mo",
    priceType: "recurring",
    priceSubtext: "Per month for 8 videos (~$175–$275/video)",
    bestFor: "A business that wants consistent short-form social content without hiring an in-house videographer.",
    included: [
      "8 short-form vertical videos/month (15–45 seconds each)",
      "Built from client-supplied footage/photos, or AI b-roll + voiceover",
      "Burned-in captions, platform-formatted exports (TikTok, Reels, Shorts)",
      "1 revision round per video",
      "Monthly content calendar and topic list provided at start of cycle",
    ],
    excluded: [
      "On-location filming or production days",
      "Paid ad management / spend",
      "Influencer or UGC creator casting",
      "More than 8 videos or more than 1 revision/video per month",
      "Custom/licensed music beyond royalty-free library tracks",
    ],
    timeline: "Delivered within 10 business days of receiving monthly assets & direction",
    capacityBoundary: "Boundary: Fixed video count (8) and 1 revision per video. Template-driven workflow with contractor delegation.",
    addons: [
      { name: "Explainer/demo video (60–90 sec)", price: "$600–$1,200 each" },
      { name: "Extra video beyond 8 in batch", price: "$150–$200 each" },
      { name: "Extra revision round", price: "$75/video" },
      { name: "Paid-ad cutdown versions of reels", price: "$100/video" },
    ],
  },
  {
    id: "pkg-04",
    code: "PKG 04",
    icon: "rocket_launch",
    name: "Growth Partner",
    kind: "Web + SEO + Video · bundled retainer",
    category: "bundle",
    badge: "Anchor",
    badgeVariant: "accent",
    priceFormatted: "$4,000 one-time + $1,800/mo",
    priceType: "hybrid",
    priceSubtext: "Site build (~11% off) + Recurring (~10% off standalone) · 3-mo min",
    bestFor: "A business ready to commit to an ongoing digital presence and wants one point of contact instead of managing three vendors.",
    included: [
      "Launch Site build (PKG 01 scope) in month 1",
      "Local Visibility SEO retainer (PKG 02 scope) in parallel from month 1",
      "Lighter Reel Batch: 4 videos/month (half of PKG 03 scope)",
      "Quarterly cross-channel strategy call reviewing site, search, and content",
    ],
    excluded: [
      "Same exclusions as the three component packages — bundling does not expand scope",
      "No custom software engineering or multi-location SEO beyond component limits",
    ],
    timeline: "Site launches weeks 3–4; SEO & video start immediately · 3-month minimum",
    capacityBoundary: "Boundary: Heaviest package — capped at 1–2 Growth Partner clients concurrently within 4-slot ceiling.",
    addons: [
      { name: "Individual package add-ons", price: "Standard add-on menu rates apply" },
    ],
  },
];

export const CAPACITY_CONFIG = {
  totalSlots: 4,
  filledSlots: 3,
  openSlots: 1,
  headline: "Capacity: 3 / 4 client slots — 1 opening",
  subtext: "Capacity is strictly capped to ensure senior-engineer attention and zero deadline slippage.",
  startingLineupNote: "Launch Site → Local Visibility SEO → Reel Batch. Growth Partner opens once initial case studies are established.",
};

export const PAYMENT_TERMS = [
  {
    title: "Launch Site (One-Time)",
    detail: "50% deposit before work begins, 50% due before final files are handed off or domain goes live.",
  },
  {
    title: "Monthly Retainers (SEO, Video, Growth Partner)",
    detail: "First month due upfront before work begins. Billed monthly on the same calendar date thereafter via autopay.",
  },
  {
    title: "Retainer Commitments",
    detail: "All retainers carry a 3-month minimum term, followed by month-to-month with 30-day written cancellation notice.",
  },
  {
    title: "Late Content Protection",
    detail: "Client delay in delivering assets pauses the project timeline clock; it never compresses our delivery window.",
  },
];

export const CAPACITY_RULES = [
  {
    title: "Dual Capacity Pools",
    detail: "We track ongoing retainers and one-time site builds separately so new builds don't congest active monthly clients.",
  },
  {
    title: "Contractor-Backed Scale",
    detail: "Reel Batch production steps are delegated to vetted contractors, protecting senior engineering time for SEO and web architecture.",
  },
  {
    title: "Reserved Buffer Slot",
    detail: "We cap sellable capacity at 3 concurrent retainers and preserve the 4th slot as buffer against scope disputes or contractor gaps.",
  },
  {
    title: "Demand-Driven Pricing",
    detail: "Once all slots run smoothly for 2–3 consecutive months, new-client pricing is raised 10–15% to match demand.",
  },
];

/**
 * Lookup helper to retrieve a package by ID safely
 */
export function getPackageById(packageId) {
  if (!packageId) return null;
  return SERVICE_PACKAGES.find((pkg) => pkg.id === packageId) || null;
}

/**
 * Validate whether a package ID exists
 */
export function isValidPackageId(packageId) {
  if (!packageId) return false;
  return SERVICE_PACKAGES.some((pkg) => pkg.id === packageId);
}
