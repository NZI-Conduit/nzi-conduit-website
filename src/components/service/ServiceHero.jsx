import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { prefetchAuditModal } from "../../lib/modalPrefetch";

export function ServiceHero({
  badgeText,
  title,
  gradientTitle,
  description,
  onRequestAudit,
  onNavigate,
  secondaryCtaText = "Explore Capabilities",
  onSecondaryCta,
  metrics = [],
}) {
  return (
    <section className="w-full relative py-16 sm:py-24 bg-gradient-to-b from-amber-50/30 via-slate-50/20 to-[#FAF7F2] bg-ambient-mesh border-b border-outline-variant/10 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 relative z-10">
        <Badge variant="primary" size="md">
          {badgeText}
        </Badge>

        <h1 className="font-hero-lg text-4xl sm:text-5xl lg:text-6xl text-on-surface font-extrabold max-w-[900px] leading-[1.12] tracking-[-0.03em] [text-wrap:balance]">
          <span>{`${title} `}</span>
          <span className="text-gradient">{gradientTitle}</span>
        </h1>

        <p className="font-body-lg text-slate-800 font-medium max-w-[65ch] text-lg sm:text-xl leading-relaxed [text-wrap:pretty]">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-4">
          <Button
            size="lg"
            variant="primary"
            onClick={onRequestAudit}
            onMouseEnter={prefetchAuditModal}
            onFocus={prefetchAuditModal}
            onTouchStart={prefetchAuditModal}
            icon="bolt"
          >
            Request Free Audit
          </Button>
          {secondaryCtaText && (
            <Button
              size="lg"
              variant="outline"
              onClick={onSecondaryCta || (() => onNavigate("services"))}
              icon="arrow_forward"
            >
              {secondaryCtaText}
            </Button>
          )}
        </div>

        {metrics.length > 0 && (
          <div className="pt-10 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-outline-variant/10 mt-6">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-hero-lg text-2xl sm:text-3xl font-extrabold text-primary">
                  {m.value}
                </span>
                <span className="font-label text-xs text-on-surface-variant font-semibold mt-1">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
