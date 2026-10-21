import Icon from "../ui/Icon";
import { useState } from "react";
import { Button } from "../ui/Button";

// Number of included scope items shown initially
const INCLUDED_PREVIEW_COUNT = 4;

export function PackageCard({
  packageData,
  isHighlighted = false,
  onSelectPackage,
  isWide = false,
}) {
  const [isAddonsOpen, setIsAddonsOpen] = useState(false);
  const [isScopeExpanded, setIsScopeExpanded] = useState(false);

  if (!packageData) return null;

  const {
    id,
    code,
    icon,
    name,
    kind,
    badge,
    badgeVariant,
    priceFormatted,
    priceSubtext,
    bestFor,
    included,
    excluded,
    timeline,
    capacityBoundary,
    addons,
  } = packageData;

  const handleSelect = () => {
    if (onSelectPackage) {
      onSelectPackage(id);
    }
  };

  // Separate top inclusions from overflow
  const includedPreview = included.slice(0, INCLUDED_PREVIEW_COUNT);
  const includedRest = included.slice(INCLUDED_PREVIEW_COUNT);
  const hasScopeOverflow = includedRest.length > 0 || excluded.length > 0;

  return (
    <div
      id={id}
      className={`relative rounded-2xl bg-[#1B2128] text-[#DFE3E1] border transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between h-full ${
        isWide ? "lg:col-span-2" : "col-span-1"
      } ${
        isHighlighted
          ? "border-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          : "border-[#2B333C] hover:border-[#5B87A8]/60 hover:shadow-xl"
      }`}
    >
      {/* Corner Technical Blueprint Accents */}
      <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-[#5B87A8] opacity-70 pointer-events-none" />
      <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-[#5B87A8] opacity-70 pointer-events-none" />
      <span className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-[#5B87A8] opacity-70 pointer-events-none" />
      <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-[#5B87A8] opacity-70 pointer-events-none" />

      {/* Main Card Content Container */}
      <div className="flex flex-col flex-grow">
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="font-mono text-xs text-[#5B87A8] tracking-widest font-semibold flex items-center gap-1.5">
            {icon && <Icon name={icon} size={16} />}
            <span>{code}</span>
          </span>
          <span
            className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded font-bold ${
              badgeVariant === "accent"
                ? "bg-[#5B87A8] text-[#14181D]"
                : "bg-amber-400 text-[#14181D]"
            }`}
          >
            {badge}
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
          {name}
        </h3>
        <p className="font-body text-xs sm:text-sm text-[#8B9490] mb-4">
          {kind}
        </p>

        {/* Pricing Block */}
        <div className="py-4 border-y border-[#2B333C] mb-5 min-h-[92px] flex flex-col justify-center">
          <div className="font-mono text-3xl sm:text-4xl font-extrabold text-amber-400 leading-tight">
            {priceFormatted}
          </div>
          <p className="font-body text-xs text-[#8B9490] mt-1.5">
            {priceSubtext}
          </p>
        </div>

        {/* Best For Section */}
        <div className="mb-5 min-h-[52px]">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#5B87A8] block font-semibold mb-1">
            Best For
          </span>
          <p className="font-body text-xs sm:text-sm text-[#DFE3E1] leading-relaxed">
            {bestFor}
          </p>
        </div>

        {/* Growth Partner Component Breakdown (Wide Anchor Card Only) */}
        {isWide && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            <div className="bg-[#14181D] border border-[#2B333C] rounded-lg p-2.5 text-center">
              <span className="font-mono text-[10px] text-[#5B87A8] block uppercase">01 Build</span>
              <span className="font-label text-xs text-white font-bold">Web Build</span>
            </div>
            <div className="bg-[#14181D] border border-[#2B333C] rounded-lg p-2.5 text-center">
              <span className="font-mono text-[10px] text-[#5B87A8] block uppercase">02 Retainer</span>
              <span className="font-label text-xs text-white font-bold">Local SEO</span>
            </div>
            <div className="bg-[#14181D] border border-[#2B333C] rounded-lg p-2.5 text-center">
              <span className="font-mono text-[10px] text-[#5B87A8] block uppercase">03 Content</span>
              <span className="font-label text-xs text-white font-bold">4 Reels/mo</span>
            </div>
            <div className="bg-[#14181D] border border-[#2B333C] rounded-lg p-2.5 text-center">
              <span className="font-mono text-[10px] text-[#5B87A8] block uppercase">04 Advisory</span>
              <span className="font-label text-xs text-white font-bold">Strategy Review</span>
            </div>
          </div>
        )}

        {/* Scope Section — Top Inclusions */}
        <div className="mb-3">
          <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#93B389] font-bold flex items-center gap-1.5 mb-2">
            <span>+ Key Inclusions</span>
          </h4>
          <ul className="space-y-1.5 font-body text-xs text-[#DFE3E1]">
            {includedPreview.map((item, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-[#93B389] font-bold shrink-0">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Full Scope (Remaining Inclusions + Exclusions) */}
        {hasScopeOverflow && (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setIsScopeExpanded(!isScopeExpanded)}
              aria-expanded={isScopeExpanded}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#5B87A8] hover:text-white transition-colors cursor-pointer py-1"
            >
              <Icon
                name="expand_more"
                size={14}
                className={`transition-transform duration-200 ${
                  isScopeExpanded ? "rotate-180" : ""
                }`}
              />
              <span>
                {isScopeExpanded
                  ? "Hide full scope"
                  : `View full scope (+${includedRest.length} more, ${excluded.length} exclusions)`}
              </span>
            </button>

            {isScopeExpanded && (
              <div className="mt-3 space-y-4 pt-3 border-t border-[#2B333C]/60">
                {/* Remaining Inclusions */}
                {includedRest.length > 0 && (
                  <div>
                    <h5 className="font-mono text-[10px] uppercase tracking-wider text-[#93B389] font-bold mb-1.5">
                      + Additional Inclusions
                    </h5>
                    <ul className="space-y-1.5 font-body text-xs text-[#DFE3E1]">
                      {includedRest.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-[#93B389] font-bold shrink-0">+</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Exclusions */}
                {excluded.length > 0 && (
                  <div>
                    <h5 className="font-mono text-[10px] uppercase tracking-wider text-[#C07567] font-bold mb-1.5">
                      – Excluded From Scope
                    </h5>
                    <ul className="space-y-1.5 font-body text-xs text-[#8B9490]">
                      {excluded.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-[#C07567] font-bold shrink-0">–</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Timeline & Boundary Notes */}
        <div className="space-y-2 text-xs py-3 border-t border-[#2B333C] mb-4 mt-auto">
          <div className="flex items-start gap-2 text-[#8B9490]">
            <Icon name="schedule" size={16} className="text-[#5B87A8] shrink-0 mt-0.5" />
            <span>
              <strong className="text-white font-mono font-semibold">Timeline: </strong>
              {timeline}
            </span>
          </div>
          <div className="pl-6 text-[11px] text-[#5B87A8] border-l-2 border-[#5B87A8]/40">
            {capacityBoundary}
          </div>
        </div>

        {/* Expandable Add-ons Drawer */}
        {addons && addons.length > 0 && (
          <div className="border-t border-[#2B333C] pt-3 mb-5">
            <button
              type="button"
              onClick={() => setIsAddonsOpen(!isAddonsOpen)}
              aria-expanded={isAddonsOpen}
              className="w-full flex items-center justify-between text-left font-mono text-xs uppercase tracking-wider text-[#5B87A8] hover:text-white py-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Icon name="tune" size={16} />
                <span>Optional Add-Ons Menu ({addons.length})</span>
              </span>
              <Icon
                name="expand_more"
                size={18}
                className={`transition-transform duration-200 ${
                  isAddonsOpen ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {isAddonsOpen && (
              <div className="mt-2 space-y-1.5 bg-[#14181D]/80 rounded-xl p-3 border border-[#2B333C]">
                {addons.map((addon, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 text-xs py-1 border-b border-[#2B333C]/60 last:border-none"
                  >
                    <span className="text-[#8B9490]">{addon.name}</span>
                    <span className="font-mono text-white font-semibold text-[11px] shrink-0">
                      {addon.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Action CTA */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="md"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
          onClick={handleSelect}
          icon="bolt"
        >
          Start Inquiry
        </Button>
      </div>
    </div>
  );
}
