import Icon from "../ui/Icon";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "../ui/Badge";

export function ProcessTimeline({ badgeText = "Workflow", title, description, steps = [] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="w-full py-section-py bg-white border-y border-outline-variant/10 relative overflow-hidden">
      <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <Badge variant="primary" className="mb-3">
            {badgeText}
          </Badge>
          <h2 className="font-hero-lg text-hero-lg text-on-surface mb-4">{title}</h2>
          <p className="font-body-lg text-on-surface-variant text-base sm:text-lg">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-10 left-12 right-12 h-0.5 bg-gradient-to-r from-primary/30 via-secondary/40 to-primary/30 z-0 pointer-events-none" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="group bg-card text-card-foreground p-6 rounded-2xl border border-outline-variant/20 shadow-xs hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 active:scale-[0.98] transition-[transform,box-shadow,border-color] duration-200 ease-out text-left flex flex-col justify-between relative z-10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-primary text-on-primary font-label text-sm font-bold flex items-center justify-center shadow-sm transition-transform duration-200 ease-out group-hover:scale-110">
                    0{i + 1}
                  </span>
                  <Icon name="arrow_forward" size={20} className="text-on-surface-variant/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface mb-2">{step.title}</h3>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
