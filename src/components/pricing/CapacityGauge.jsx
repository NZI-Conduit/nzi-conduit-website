import { CAPACITY_CONFIG } from "../../data/servicePackages";

export function CapacityGauge({ onDiscussOpening = null, className = "" }) {
  const { totalSlots, filledSlots, openSlots, headline, subtext } = CAPACITY_CONFIG;

  const slots = Array.from({ length: totalSlots }, (_, index) => {
    return index < filledSlots ? "filled" : "open";
  });

  return (
    <div
      className={`w-full max-w-3xl mx-auto rounded-2xl bg-surface border border-outline-variant/40 p-5 sm:p-6 shadow-xs ${className}`}
      role="region"
      aria-label="Client Capacity Status"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Indicator & Headline */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            {/* Visual Slots Meter */}
            <div className="flex items-center gap-2" aria-hidden="true">
              {slots.map((status, i) => (
                <span
                  key={i}
                  className={`w-3.5 h-3.5 rounded-xs transition-colors ${
                    status === "filled"
                      ? "bg-amber-500 border border-amber-600"
                      : "bg-transparent border-2 border-primary/40"
                  }`}
                  title={status === "filled" ? `Slot ${i + 1}: Active Client` : `Slot ${i + 1}: Open Capacity`}
                />
              ))}
            </div>

            <span className="font-mono text-xs sm:text-sm font-bold text-on-surface tracking-tight">
              {headline}
            </span>
          </div>

          <p className="font-body text-xs text-on-surface-variant max-w-xl">
            {subtext}
          </p>
        </div>

        {/* Right: Discuss Opening Action */}
        {openSlots > 0 && onDiscussOpening && (
          <button
            type="button"
            onClick={onDiscussOpening}
            className="shrink-0 px-4 py-2 rounded-xl bg-blue-50 text-primary border border-blue-200 hover:bg-blue-100 font-label text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span>Discuss This Opening</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
}
