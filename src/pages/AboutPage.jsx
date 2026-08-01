import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ServiceFaq } from "../components/service/ServiceFaq";
import { ServiceCtaBanner } from "../components/service/ServiceCtaBanner";

export default function AboutPage({ onNavigate, onRequestAudit }) {
  const principles = [
    {
      icon: "person",
      title: "Individualized Engineering",
      description: "We reject mass-market templates and call center queues. Every client works directly with senior engineers who understand their specific workflow.",
    },
    {
      icon: "verified",
      title: "Transparent Audits",
      description: "We provide honest, data-backed reports that highlight exact speed, security, and search bottlenecks without technical jargon or inflated claims.",
    },
    {
      icon: "bolt",
      title: "Modern Tech Standards",
      description: "We build on enterprise-grade React, Vite, TypeScript, and edge networks to guarantee sub-second load times and WCAG 2.1 AA accessibility.",
    },
    {
      icon: "lock_open",
      title: "Zero Lock-In Ownership",
      description: "You retain 100% full ownership of your code, domain assets, and infrastructure. No hidden maintenance traps or annual retainers.",
    },
  ];

  const differentiators = [
    {
      title: "Direct Engineer Pairing",
      description: "No account managers or junior interns. Your technical contact is the engineer building your project.",
    },
    {
      title: "Sub-Second Speed",
      description: "Our web applications score 95+ on Google Lighthouse, ensuring zero lag for your visitors.",
    },
    {
      title: "Hardened Security",
      description: "Every deployment enforces HTTPS encryption, Content Security Policies, and proactive vulnerability scanning.",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "In-Depth Technical Audit",
      description: "We analyze your existing codebase, Core Web Vitals, and SSL/headers to locate exact bottlenecks.",
      icon: "analytics",
    },
    {
      step: "02",
      title: "Tailored Architecture Plan",
      description: "Senior engineers craft a bespoke roadmap detailing tech stack, performance targets, and milestone dates.",
      icon: "architecture",
    },
    {
      step: "03",
      title: "Clean Code Engineering",
      description: "We build using modular React, TypeScript, and edge APIs—delivering 60fps animations and sub-second load times.",
      icon: "terminal",
    },
    {
      step: "04",
      title: "Full Asset Transfer & SLA",
      description: "100% code ownership is transferred to your account with 24/7 system health monitoring active.",
      icon: "verified_user",
    },
  ];

  const faqs = [
    {
      question: "What type of clients does NZI Conduit work with?",
      answer: "We partner with independent professionals, creators, local businesses, and growing startups who need high-performance web applications, search engine optimization, or cybersecurity audits without corporate bloat.",
    },
    {
      question: "How do we get started working together?",
      answer: "Simply request a free audit. We analyze your website speed, security posture, or search health and deliver a comprehensive report within 24 hours.",
    },
    {
      question: "Do I own my website code and assets?",
      answer: "Yes, 100%. Upon completion, all source code, domain configurations, and analytics accounts are completely transferred to your control.",
    },
  ];

  return (
    <main className="w-full bg-background overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="w-full relative py-16 sm:py-24 bg-gradient-to-b from-amber-50/30 via-slate-50/20 to-[#FAF7F2] bg-ambient-mesh border-b border-outline-variant/10 overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 relative z-10">
          <Badge variant="primary" size="md">
            Engineered for the Individual
          </Badge>

          <h1 className="font-hero-lg text-hero-lg text-on-surface max-w-[900px] leading-tight tracking-[-0.03em] [text-wrap:balance]">
            Empowering Clients Excluded by <span className="text-gradient">Legacy IT Firms</span>
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-[680px] text-lg sm:text-xl leading-relaxed">
            NZI Conduit was founded to bridge the gap between complex enterprise technology and individual creators, small teams, and independent businesses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-4">
            <Button size="lg" variant="primary" onClick={onRequestAudit} icon="bolt">
              Request Free Audit
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate("services")} icon="grid_view">
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* 2. ENGINEERING WORKFLOW & PIPELINE ARCHITECTURE */}
      <section className="w-full py-section-py bg-surface-container-low/40 border-b border-outline-variant/10">
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-12 sm:mb-16">
            <Badge variant="primary" className="mb-3">
              Engineering Architecture
            </Badge>
            <h2 className="font-hero-lg text-hero-lg text-on-surface mb-4">
              How We Build & Protect Your Products
            </h2>
            <p className="font-body-lg text-on-surface-variant text-base sm:text-lg">
              A transparent, 4-step engineering pipeline designed for zero friction and maximum reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="group bg-surface p-6 rounded-2xl border border-outline-variant/20 shadow-2xs hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-[transform,box-shadow,border-color] duration-200 ease-out text-left relative flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-headline text-2xl font-extrabold text-primary/30 group-hover:text-primary transition-colors">
                      {step.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                    </div>
                  </div>
                  <h3 className="font-headline text-base font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE PRINCIPLES */}
      <section className="w-full py-section-py bg-white border-b border-outline-variant/10">
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-12 sm:mb-16">
            <Badge variant="primary" className="mb-3">
              Core Philosophy
            </Badge>
            <h2 className="font-hero-lg text-hero-lg text-on-surface mb-4">
              Our Working Principles
            </h2>
            <p className="font-body-lg text-on-surface-variant text-base sm:text-lg">
              How we approach engineering, communication, and client success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {principles.map((item, index) => (
              <Card key={index} hover className="text-left flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CLIENTS CHOOSE US */}
      <section className="w-full py-section-py bg-surface-container-low/50 border-y border-outline-variant/10">
        <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-12">
            <Badge variant="primary" className="mb-3">
              The NZI Advantage
            </Badge>
            <h2 className="font-hero-lg text-hero-lg text-on-surface mb-4">
              Why Clients Trust NZI Conduit
            </h2>
            <p className="font-body-lg text-on-surface-variant text-base sm:text-lg">
              Enterprise engineering standards delivered with transparent communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((diff, i) => (
              <div key={i} className="group bg-surface p-6 rounded-2xl border border-outline-variant/20 shadow-2xs hover:border-emerald-500/40 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-[transform,box-shadow,border-color] duration-200 ease-out text-left cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                </div>
                <h4 className="font-headline text-base font-bold text-on-surface mb-2 group-hover:text-emerald-700 transition-colors">{diff.title}</h4>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <ServiceFaq faqs={faqs} title="About NZI Conduit FAQs" />

      {/* 6. FINAL CONVERSION BANNER */}
      <ServiceCtaBanner
        title="Ready to Work with a Dedicated IT Partner?"
        description="Request your free technical audit report today and see how we can optimize your infrastructure."
        onRequestAudit={onRequestAudit}
        onNavigate={onNavigate}
      />
    </main>
  );
}
