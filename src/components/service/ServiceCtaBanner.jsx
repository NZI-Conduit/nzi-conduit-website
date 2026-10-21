import Icon from "../ui/Icon";
import { Button } from "../ui/Button";

export function ServiceCtaBanner({
  title,
  description,
  onRequestAudit,
  onNavigate,
  secondaryCtaText = "Our Approach",
}) {
  return (
    <section className="w-full relative py-section-py px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#1D4ED8] text-center text-white">
      {/* Mesh Gradient Radial & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-tertiary/20 blur-[100px] pointer-events-none" />

      <div className="max-w-[840px] mx-auto relative z-10 flex flex-col items-center gap-md">
        {/* Floating Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-label font-semibold text-primary-fixed mb-2">
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center gap-1.5">
            <Icon name="check_circle" size={16} className="text-emerald-400" />
            <span>24h Audit Delivery SLA</span>
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center gap-1.5">
            <Icon name="check_circle" size={16} className="text-emerald-400" />
            <span>100% Code Ownership</span>
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center gap-1.5">
            <Icon name="check_circle" size={16} className="text-emerald-400" />
            <span>Zero Contract Lock-in</span>
          </span>
        </div>

        <h2 className="font-hero-lg text-hero-lg text-on-primary tracking-tight leading-tight">{title}</h2>

        <p className="font-body-lg text-primary-fixed max-w-[620px] text-base sm:text-lg leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-md w-full sm:w-auto pt-md justify-center">
          <Button size="lg" variant="white" onClick={onRequestAudit} icon="bolt">
            Request Free Audit
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
            onClick={() => onNavigate("about")}
          >
            {secondaryCtaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
