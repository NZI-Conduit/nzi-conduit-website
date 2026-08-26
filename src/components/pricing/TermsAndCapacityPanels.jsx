import { PAYMENT_TERMS, CAPACITY_RULES } from "../../data/servicePackages";
import { memo } from "react";

export const TermsAndCapacityPanels = memo(function TermsAndCapacityPanels({ className = "" }) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 ${className}`}>
      {/* Panel 1: Payment Terms */}
      <div className="rounded-2xl bg-surface border border-outline-variant/40 p-6 sm:p-8 shadow-xs text-left">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-mono text-xs font-bold shrink-0">
            01
          </div>
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface tracking-tight">
              Payment & Retainer Terms
            </h3>
            <p className="font-body text-xs text-on-surface-variant">
              Milestone and billing schedule agreements
            </p>
          </div>
        </div>

        <ul className="space-y-5">
          {PAYMENT_TERMS.map((term, index) => (
            <li key={index} className="space-y-1">
              <h4 className="font-label text-xs sm:text-sm font-bold text-on-surface">
                {term.title}
              </h4>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {term.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Panel 2: Capacity & Operational Rules */}
      <div className="rounded-2xl bg-surface border border-outline-variant/40 p-6 sm:p-8 shadow-xs text-left">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-primary font-mono text-xs font-bold shrink-0">
            02
          </div>
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface tracking-tight">
              Capacity & Delivery Rules
            </h3>
            <p className="font-body text-xs text-on-surface-variant">
              Operational buffer and quality protection standards
            </p>
          </div>
        </div>

        <ul className="space-y-5">
          {CAPACITY_RULES.map((rule, index) => (
            <li key={index} className="space-y-1">
              <h4 className="font-label text-xs sm:text-sm font-bold text-on-surface">
                {rule.title}
              </h4>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {rule.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
