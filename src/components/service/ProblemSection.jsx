import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

export function ProblemSection({ badgeText = "The Challenge", title, description, points = [] }) {
  return (
    <section className="w-full py-section-py bg-surface-container-low/40 border-b border-outline-variant/10">
      <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[700px] mx-auto mb-12 sm:mb-16">
          <Badge variant="warning" className="mb-3">
            {badgeText}
          </Badge>
          <h2 className="font-hero-lg text-hero-lg text-on-surface mb-4">{title}</h2>
          <p className="font-body-lg text-on-surface-variant text-base sm:text-lg">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((point, index) => (
            <Card key={index} hover={true} className="bg-surface text-left">
              <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center mb-4 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-error/20">
                <span className="material-symbols-outlined text-[22px] transition-transform duration-200 ease-out group-hover:rotate-12">warning</span>
              </div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-2 group-hover:text-error transition-colors">{point.title}</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">{point.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
