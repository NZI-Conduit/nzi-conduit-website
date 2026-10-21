import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SERVICE_PACKAGES, CAPACITY_CONFIG } from "../data/servicePackages";
import { CapacityGauge } from "../components/pricing/CapacityGauge";
import { PackageCard } from "../components/pricing/PackageCard";
import { TermsAndCapacityPanels } from "../components/pricing/TermsAndCapacityPanels";
import { ServiceFaq } from "../components/service/ServiceFaq";
import { ServiceCtaBanner } from "../components/service/ServiceCtaBanner";

export default function PricingPage({
  onNavigate,
  onRequestAudit,
  highlightedPackageId = null,
}) {
  const prefersReducedMotion = useReducedMotion();

  // Phase 8: Set page title dynamically
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Service Packages & Pricing | NZI Conduit";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  // Separate the standalone packages from the anchor bundle
  const standalonePackages = SERVICE_PACKAGES.filter((pkg) => pkg.id !== "pkg-04");
  const anchorPackage = SERVICE_PACKAGES.find((pkg) => pkg.id === "pkg-04");

  const pricingFaqs = [
    {
      question: "Why do you have fixed scope boundaries?",
      answer:
        "Fixed scope protects both our delivery schedule and your budget. Every package has explicit inclusions and exclusions so you know exactly what is delivered without surprise invoices or creeping timelines.",
    },
    {
      question: "How does the capacity limit of 4 clients work?",
      answer:
        "We cap active ongoing relationships to maintain senior engineering attention. Once 3 slots are filled, the 4th is reserved as an operational buffer. Site builds are queued separately from monthly retainers.",
    },
    {
      question: "What happens if I need extra revisions or pages?",
      answer:
        "Transparent add-on rates are provided on every package card (e.g. $250–$400 for extra pages, $200 for extra site revision rounds, $75 for video revisions). You can request add-ons during onboarding or at any point.",
    },
    {
      question: "What are the payment milestones?",
      answer:
        "For Launch Site builds, 50% deposit is due upfront and 50% upon completion before going live. For retainers, the first month is billed upfront with a 3-month initial commitment.",
    },
    {
      question: "What if my content or assets are delayed?",
      answer:
        "Our content-dependency clause pauses the delivery timeline clock until your materials arrive. This protects your queue spot without compressing our engineering schedule.",
    },
  ];

  const handleSelectPackage = (packageId) => {
    if (onRequestAudit) {
      onRequestAudit(packageId);
    }
  };

  return (
    <main className="w-full bg-background overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative py-12 sm:py-16 md:py-20 border-b border-outline-variant/10">
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-primary border border-blue-500/20 font-mono text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="w-2 h-0.5 bg-primary" />
            <span>Service Catalog · Rev 2026</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-4 max-w-3xl mx-auto">
            Fixed scope. <span className="text-gradient">No surprises.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8">
            Four packages, each with a locked boundary on what's included. No unlimited revisions, no open-ended guesswork — just senior engineering deliverables at a fixed price.
          </p>

          {/* Capacity Gauge */}
          <div>
            <CapacityGauge
              onDiscussOpening={() => onRequestAudit()}
              className="mb-8"
            />
          </div>

          {/* Starting Lineup Callout Strip */}
          <div className="w-full max-w-3xl mx-auto rounded-xl bg-surface-container-low border border-outline-variant/30 border-l-4 border-l-amber-500 p-4 text-left flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-amber-600 font-bold shrink-0">
              Starting Lineup:
            </span>
            <span className="font-body text-xs sm:text-sm text-on-surface leading-relaxed">
              {CAPACITY_CONFIG.startingLineupNote}
            </span>
          </div>
        </div>
      </section>

      {/* 2. PACKAGES GRID SECTION */}
      <section className="w-full py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50/60 via-background to-slate-50/40 border-b border-outline-variant/10">
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold block mb-2">
              Fixed-Fee Packages
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Select Your Scope & Level
            </h2>
            <p className="font-body text-sm text-on-surface-variant mt-2">
              Every package is strictly scoped to eliminate scope creep and ensure timely delivery.
            </p>
          </div>

          {/* Grid of Standalone Packages (3 columns on desktop, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {standalonePackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                packageData={pkg}
                isHighlighted={highlightedPackageId === pkg.id}
                onSelectPackage={handleSelectPackage}
                isWide={false}
              />
            ))}
          </div>

          {/* Wide Anchor Package (Growth Partner) */}
          {anchorPackage && (
            <div className="w-full">
              <PackageCard
                packageData={anchorPackage}
                isHighlighted={highlightedPackageId === anchorPackage.id}
                onSelectPackage={handleSelectPackage}
                isWide={true}
              />
            </div>
          )}
        </div>
      </section>

      {/* 3. TERMS & CAPACITY RULES */}
      <section className="w-full py-12 sm:py-16 bg-surface-container-lowest border-b border-outline-variant/10">
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold block mb-2">
              Operational Standards
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Client & Delivery Agreements
            </h2>
          </div>

          <TermsAndCapacityPanels />
        </div>
      </section>

      {/* 4. PRICING FAQs */}
      <section className="w-full">
        <ServiceFaq faqs={pricingFaqs} />
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="w-full">
        <ServiceCtaBanner
          title="Ready to discuss your project?"
          description="Submit an inquiry or request a free comprehensive technical audit to get started."
          onRequestAudit={() => onRequestAudit()}
          onNavigate={onNavigate}
        />
      </section>
    </main>
  );
}
