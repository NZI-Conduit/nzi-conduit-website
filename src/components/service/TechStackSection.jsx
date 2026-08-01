import { Badge } from "../ui/Badge";
import { TechLogo } from "../ui/TechLogo";

export function TechStackSection({
  badgeText = "Integration Showcase",
  title = "Powered by Industry-Leading Technologies",
  description = "Modern engineering tools used to build secure, scalable, and high-performance solutions.",
  items,
  techList,
}) {
  const technologyData = techList || items || [];

  const defaultTechnologies = [
    {
      id: "search-console",
      name: "Google Search Console",
      subtitle: "Search Performance",
    },
    {
      id: "lighthouse",
      name: "Google Lighthouse",
      subtitle: "Performance Auditing",
    },
    {
      id: "cloudflare",
      name: "Cloudflare Edge",
      subtitle: "Global Edge CDN",
    },
    {
      id: "ahrefs",
      name: "Ahrefs",
      subtitle: "SEO Intelligence",
    },
    {
      id: "schema",
      name: "Schema.org JSON-LD",
      subtitle: "Structured Data",
    },
    {
      id: "react",
      name: "React 19",
      subtitle: "Modern Component Architecture",
    },
  ];

  const displayList = technologyData.length > 0 ? technologyData : defaultTechnologies;

  return (
    <section className="py-section-py px-4 sm:px-lg max-w-container-max mx-auto">
      {/* Soft blue gradient container (#EEF4FF -> #F8FAFC) */}
      <div className="bg-gradient-to-b from-[#EEF4FF] to-[#F8FAFC] border border-blue-100/80 rounded-3xl p-6 sm:p-10 shadow-sm text-center">
        {/* Top Header */}
        <div className="max-w-[700px] mx-auto mb-10 sm:mb-12 space-y-3">
          <Badge variant="primary" className="mb-1">
            {badgeText}
          </Badge>
          <h2 className="font-hero-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            {title}
          </h2>
          <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>

        {/* Single Row Showcase Grid on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none gap-3 sm:gap-4 lg:gap-5">
          {displayList.map((tech, index) => {
            const techName = typeof tech === "string" ? tech : tech.name || tech.title || "Technology";
            const techSubtitle = typeof tech === "string" ? "Enterprise Technology" : tech.subtitle || tech.description || "";
            const techId = typeof tech === "string" ? tech.toLowerCase().replace(/\s+/g, "-") : tech.id || tech.name?.toLowerCase() || "";

            return (
              <div
                key={`${techName}-${index}`}
                className="group bg-card text-card-foreground border border-outline-variant/20 hover:border-primary/40 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-[transform,box-shadow,border-color] duration-200 ease-out flex flex-col items-center text-center justify-between cursor-pointer min-h-[170px]"
              >
                {/* 56x56 icon container with constrained 28x28 logo */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-center mb-4 transition-all duration-250 ease-out group-hover:scale-110 group-hover:bg-blue-50/80 group-hover:border-primary/30 shrink-0 shadow-2xs">
                  <TechLogo id={techId} fallbackIcon={tech.icon || "terminal"} className="w-7 h-7 max-w-[28px] max-h-[28px] object-contain transition-transform duration-250 ease-out group-hover:scale-105" />
                </div>

                <div className="space-y-1 w-full">
                  <h3 className="font-headline text-sm font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                    {techName}
                  </h3>
                  <p className="font-body text-[11px] text-on-surface-variant font-medium leading-tight">
                    {techSubtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
