import Icon from "../components/ui/Icon";
import { useState } from "react";
import { AuroraBars } from "../components/aurora-bars";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { TechMarquee } from "../components/ui/TechMarquee";
import { prefetchAuditModal } from "../lib/modalPrefetch";

export default function HomePage({ onNavigate, onRequestAudit }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      question: "Who is NZI Conduit designed for?",
      answer:
        "NZI Conduit is engineered specifically for individuals, specialized creators, and independent businesses that need enterprise-grade tech support, custom web applications, or security audits without the overhead of massive corporate providers.",
    },
    {
      question: "How quickly will I receive my free audit report?",
      answer:
        "Once submitted, our technical engineering team analyzes your web performance, SEO visibility, or security posture and delivers a comprehensive, actionable PDF report within 24 hours.",
    },
    {
      question: "What sets NZI Conduit apart from legacy IT firms?",
      answer:
        "Legacy firms sell cookie-cutter packages and route support through call centers. NZI Conduit pairs you directly with senior engineers who build individualized solutions tailored strictly to your specific workflow.",
    },
    {
      question: "Can I upgrade or customize my support services as I grow?",
      answer:
        "Yes! All NZI Conduit architecture is built modularly. You can start with a single project audit or web build and seamlessly layer on SEO strategy or proactive cybersecurity monitoring as your requirements evolve.",
    },
  ];

  const techStack = [
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "Vite",
    "Node.js",
    "Cloudflare",
    "Google Cloud",
    "Docker",
  ];

  return (
    <main className="w-full bg-background overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background border-b border-outline-variant/10 py-xxl md:py-xxxl">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <AuroraBars
            background="#FFFFFF"
            colors={["#0037b0", "#2151da", "#4648d4", "#712ae2", "transparent"]}
            barCount={38}
            blur={1.4}
            speed={1}
            gap={0.1}
            maxHeightRatio={0.85}
            minHeightRatio={0.15}
            showVignette={true}
            vignetteColor="rgba(113, 42, 226, 0.12)"
            className="opacity-100"
          />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-secondary/15 via-primary/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />
        </div>

        <div className="w-full relative z-10 max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-lg md:gap-xl pt-12 md:pt-16 pb-16 md:pb-24">
          <div>
            <Badge pulse variant="primary" size="md">
              IT Solutions for the Individual
            </Badge>
          </div>

          <h1 className="font-hero-lg text-4xl sm:text-5xl lg:text-6xl text-on-surface font-extrabold mb-2 max-w-[920px] leading-[1.12] tracking-[-0.03em] [text-wrap:balance]">
            Personalized IT Built to <br className="hidden md:block" />
            <span className="text-gradient">Fit Your Individual Needs</span>
          </h1>

          <p id="hero-paragraph" className="font-body-lg text-slate-800 font-medium max-w-[65ch] mx-auto text-lg md:text-xl leading-relaxed [text-wrap:pretty]">
            NZI Conduit delivers enterprise-grade web development, search visibility, and cybersecurity auditing structured specifically for those largely excluded from legacy IT providers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-md w-full sm:w-auto pt-md">
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
            <Button size="lg" variant="outline" onClick={() => onNavigate("pricing")} icon="receipt_long">
              View Pricing & Packages
            </Button>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED POST-HERO TECHNOLOGY STACK TRUST SECTION (Soft blue gradient #EEF4FF -> #F8FAFC) */}
      <section className="w-full py-8 sm:py-10 bg-gradient-to-b from-[#EEF4FF] to-[#F8FAFC] border-b border-blue-100/60 overflow-hidden">
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
          <h2 className="font-headline text-sm sm:text-base font-bold text-on-surface uppercase tracking-wider mb-1">
            Technologies We Engineer With
          </h2>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto">
            Modern tools powering high-performance web, cloud, and security solutions.
          </p>
        </div>

        <TechMarquee />
      </section>

      {/* 3. METRICS BAR (Soft ambient background) */}
      <section className="w-full py-12 bg-gradient-to-b from-slate-50/80 via-[#F8FAFD] to-[#F5F9FF] border-b border-outline-variant/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left relative z-10">
          <div className="p-5 rounded-2xl bg-card text-card-foreground border border-outline-variant/20 shadow-xs flex flex-col justify-between hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-[transform,box-shadow,border-color] duration-200 ease-out">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label text-xs font-semibold text-on-surface-variant">Infrastructure Uptime</span>
              <Icon name="verified" size={20} className="text-emerald-500" />
            </div>
            <span className="font-hero-lg text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              99.9%
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-card text-card-foreground border border-outline-variant/20 shadow-xs flex flex-col justify-between hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-[transform,box-shadow,border-color] duration-200 ease-out">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label text-xs font-semibold text-on-surface-variant">Audit Turnaround SLA</span>
              <Icon name="schedule" size={20} className="text-primary" />
            </div>
            <span className="font-hero-lg text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              &lt; 24h
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-card text-card-foreground border border-outline-variant/20 shadow-xs flex flex-col justify-between hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-[transform,box-shadow,border-color] duration-200 ease-out">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label text-xs font-semibold text-on-surface-variant">Tailored Architecture</span>
              <Icon name="engineering" size={20} className="text-secondary" />
            </div>
            <span className="font-hero-lg text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              100%
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-card text-card-foreground border border-outline-variant/20 shadow-xs flex flex-col justify-between hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-[transform,box-shadow,border-color] duration-200 ease-out">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label text-xs font-semibold text-on-surface-variant">Template Bloat</span>
              <Icon name="block" size={20} className="text-emerald-500" />
            </div>
            <span className="font-hero-lg text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              0
            </span>
          </div>
        </div>
      </section>

      {/* 4. CAPABILITIES BENTO GRID (Ambient Glow & Dot Grid) */}
      <section className="w-full py-section-py bg-gradient-to-b from-[#F5F9FF] via-white to-[#F0F6FE] bg-ambient-mesh border-b border-blue-100/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-[700px] mx-auto mb-12 sm:mb-16">
            <Badge variant="primary" className="mb-3">
              Core Capabilities
            </Badge>
            <h2 className="font-hero-lg text-hero-lg text-on-surface mb-4">
              Focused IT Solutions Built For Purpose
            </h2>
            <p className="font-body-lg text-on-surface-variant text-base sm:text-lg">
              We eliminate technical overhead with dedicated engineering across web development, search visibility, and cybersecurity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg md:gap-xl">
            <div className="h-full">
              <Card
                hover
                className="flex flex-col justify-between h-full shadow-sm hover:shadow-xl transition-all duration-300 text-left"
                onClick={() => onNavigate("webdev")}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <Icon name="code" size={24} />
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface mb-3">
                    Web Development & Performance
                  </h3>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                    Custom-built web applications using React, Vite, and modern serverless architectures with sub-second page speeds.
                  </p>
                </div>
                <div className="flex items-center text-primary font-label text-sm font-bold gap-2">
                  <span>Explore Web Engineering</span>
                  <Icon name="arrow_forward" size={16} />
                </div>
              </Card>
            </div>

            <div className="h-full">
              <Card
                hover
                className="flex flex-col justify-between h-full shadow-sm hover:shadow-xl transition-all duration-300 text-left"
                onClick={() => onNavigate("seo")}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                    <Icon name="search" size={24} />
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface mb-3">
                    SEO & Digital Visibility
                  </h3>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                    Data-driven search engine optimization strategies that place your business in front of high-intent searchers.
                  </p>
                </div>
                <div className="flex items-center text-primary font-label text-sm font-bold gap-2">
                  <span>Explore SEO Strategy</span>
                  <Icon name="arrow_forward" size={16} />
                </div>
              </Card>
            </div>

            <div className="h-full">
              <Card
                hover
                className="flex flex-col justify-between h-full shadow-sm hover:shadow-xl transition-all duration-300 text-left"
                onClick={() => onNavigate("cybersecurity")}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-tertiary-container/15 text-tertiary flex items-center justify-center mb-6">
                    <Icon name="security" size={24} />
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface mb-3">
                    Cybersecurity Audit
                  </h3>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                    Proactive vulnerability scans, data protection, and security compliance assessments to safeguard your digital assets.
                  </p>
                </div>
                <div className="flex items-center text-primary font-label text-sm font-bold gap-2">
                  <span>Explore Security Audits</span>
                  <Icon name="arrow_forward" size={16} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS TIMELINE */}
      <section className="w-full py-section-py bg-surface-container-low/50 border-y border-outline-variant/10">
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <Badge variant="primary" className="mb-3">
              Streamlined Process
            </Badge>
            <h2 className="font-hero-lg text-hero-lg text-on-surface mb-4">
              How We Deliver Success
            </h2>
            <p className="font-body-lg text-on-surface-variant text-base sm:text-lg">
              A transparent, 4-step engineering workflow built for clarity and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Free Technical Audit",
                desc: "We analyze your website performance, SEO health, or security gaps and deliver a clear report.",
              },
              {
                step: "02",
                title: "Tailored Strategy",
                desc: "We present an individualized technical roadmap designed specifically for your budget and timeline.",
              },
              {
                step: "03",
                title: "Agile Execution",
                desc: "Our senior engineers implement code changes, security hardening, or search optimizations.",
              },
              {
                step: "04",
                title: "Continuous Support",
                desc: "Ongoing monitoring, proactive maintenance, and direct engineer access whenever you need help.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start p-6 bg-surface rounded-2xl border border-outline-variant/20 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <span className="w-9 h-9 rounded-xl bg-primary text-on-primary font-label text-sm font-bold flex items-center justify-center mb-4 shadow-sm">
                  {p.step}
                </span>
                <h3 className="font-headline text-base font-bold text-on-surface mb-2">
                  {p.title}
                </h3>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPARISON MATRIX */}
      <section className="w-full py-section-py bg-background border-b border-outline-variant/10 overflow-hidden">
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-14">
            <Badge variant="primary" className="mb-3">
              Why NZI Conduit
            </Badge>
            <h2 className="font-hero-lg text-hero-lg text-on-surface mb-4">
              Built Different From Legacy IT Firms
            </h2>
            <p className="font-body-lg text-on-surface-variant text-base sm:text-lg">
              See how our individualized approach compares to generic mass-market providers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px] shadow-sm rounded-2xl overflow-hidden border border-outline-variant/15">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                  <th className="py-4 px-6 font-headline text-sm text-on-surface font-bold">Feature</th>
                  <th className="py-4 px-6 font-headline text-sm text-slate-700 font-semibold">Generic IT Providers</th>
                  <th className="py-4 px-6 font-headline text-sm text-primary font-bold bg-primary/10">NZI Conduit Approach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-sm font-body bg-surface">
                <tr>
                  <td className="py-4 px-6 font-semibold text-on-surface">Client Focus</td>
                  <td className="py-4 px-6 text-on-surface-variant">Mass corporate accounts</td>
                  <td className="py-4 px-6 text-primary font-semibold bg-primary/5">Individualized & Dedicated</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-on-surface">Support Route</td>
                  <td className="py-4 px-6 text-on-surface-variant">Call center queues & chatbots</td>
                  <td className="py-4 px-6 text-primary font-semibold bg-primary/5">Direct Senior Engineer Contact</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-on-surface">Audit Turnaround</td>
                  <td className="py-4 px-6 text-on-surface-variant">1–2 Weeks</td>
                  <td className="py-4 px-6 text-primary font-semibold bg-primary/5">&lt; 24 Hours</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-on-surface">Engagement Model</td>
                  <td className="py-4 px-6 text-on-surface-variant">Rigid annual lock-in contracts</td>
                  <td className="py-4 px-6 text-primary font-semibold bg-primary/5">Transparent & Modular</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="w-full py-section-py bg-surface-container-low/30 border-t border-outline-variant/10">
        <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-3">
              FAQ
            </Badge>
            <h2 className="font-hero-lg text-hero-lg text-on-surface mb-3">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-on-surface-variant text-base">
              Everything you need to know about our audit process and services.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-surface rounded-2xl border border-outline-variant/20 overflow-hidden shadow-2xs transition-all text-left"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full text-left p-5 sm:p-6 font-headline text-base sm:text-lg font-bold text-on-surface flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <Icon
                      name="expand_more"
                      size={20}
                      className={`text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 font-body text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FINAL CONVERSION BANNER */}
      <section className="w-full relative py-section-py px-4 sm:px-6 lg:px-8 overflow-hidden bg-primary text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
        <div className="w-full max-w-[800px] mx-auto relative z-10 flex flex-col items-center gap-md">
          <h2 className="font-hero-lg text-hero-lg text-on-primary">
            Ready to Optimize Your Digital Infrastructure?
          </h2>
          <p className="font-body-lg text-primary-fixed max-w-[600px] text-base sm:text-lg">
            Request your free technical audit report today and start building a personalized IT foundation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-md w-full sm:w-auto pt-md justify-center">
            <Button
              size="lg"
              variant="white"
              onClick={onRequestAudit}
              onMouseEnter={prefetchAuditModal}
              onFocus={prefetchAuditModal}
              onTouchStart={prefetchAuditModal}
              icon="bolt"
            >
              Request Free Audit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => onNavigate("about")}
            >
              Our Approach
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}