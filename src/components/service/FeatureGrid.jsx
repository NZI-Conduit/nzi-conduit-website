import Icon from "../ui/Icon";
import { motion, useReducedMotion } from "motion/react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

export function FeatureGrid({ badgeText = "Capabilities", title, description, features = [] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="w-full py-section-py bg-gradient-to-b from-[#F5F9FF] via-white to-[#F0F6FE] bg-ambient-mesh border-y border-blue-100/60 relative overflow-hidden">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />

      <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-[700px] mx-auto mb-12 sm:mb-16">
          <Badge variant="primary" className="mb-3">
            {badgeText}
          </Badge>
          <h2 className="font-hero-lg text-hero-lg text-on-surface mb-4">{title}</h2>
          <p className="font-body-lg text-on-surface-variant text-base sm:text-lg">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <div key={i} className="h-full">
              <Card hover className="flex flex-col justify-between text-left h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <Icon name={feature.icon || "star"} size={24} />
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface mb-3">{feature.title}</h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">{feature.description}</p>
                </div>
                {feature.badge && (
                  <div className="mt-6 pt-4 border-t border-outline-variant/10">
                    <span className="font-label text-xs text-primary font-bold">{feature.badge}</span>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
