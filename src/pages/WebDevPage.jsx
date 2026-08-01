import { ServiceHero } from "../components/service/ServiceHero";
import { ProblemSection } from "../components/service/ProblemSection";
import { FeatureGrid } from "../components/service/FeatureGrid";
import { ProcessTimeline } from "../components/service/ProcessTimeline";
import { TechStackSection } from "../components/service/TechStackSection";
import { ServiceFaq } from "../components/service/ServiceFaq";
import { ServiceCtaBanner } from "../components/service/ServiceCtaBanner";

export default function WebDevPage({ onNavigate, onRequestAudit }) {
  const metrics = [
    { value: "< 100ms", label: "Page Load Time" },
    { value: "100/100", label: "Lighthouse Performance" },
    { value: "100%", label: "Responsive Mobile Fit" },
    { value: "0", label: "Bloated Plugin Dependencies" },
  ];

  const problemPoints = [
    {
      title: "Slow WordPress & Page Builders",
      description: "Generic site builders load dozens of unnecessary scripts, resulting in 4+ second load times and lost customers.",
    },
    {
      title: "Poor Mobile UX",
      description: "Over 60% of traffic is mobile, but most sites suffer from broken layouts, tiny touch targets, and horizontal overflow.",
    },
    {
      title: "Unmaintainable Spaghetti Code",
      description: "Freelance hack jobs lead to fragile sites that break on every browser or dependency update.",
    },
  ];

  const features = [
    {
      icon: "bolt",
      title: "Lightning-Fast React & Vite",
      description: "Built with modern component architectures for instantaneous page transitions and crisp interactions.",
      badge: "Sub-Second Load",
    },
    {
      icon: "devices",
      title: "Responsive Across 320px–1920px",
      description: "Engineered to fit every screen perfectly from small iPhones to ultra-wide desktop monitors.",
      badge: "Pixel Perfect",
    },
    {
      icon: "accessibility_new",
      title: "WCAG 2.1 AA Accessibility",
      description: "Full screen reader support, keyboard focus traps, contrast optimization, and ARIA bindings.",
      badge: "100% Accessible",
    },
    {
      icon: "search",
      title: "Built-In Technical SEO",
      description: "Semantic HTML5 layout, open graph cards, structured meta tags, and high Core Web Vitals scores.",
      badge: "Search Ready",
    },
    {
      icon: "lock",
      title: "Security & Encryption",
      description: "HTTPS enforcement, Content Security Policy headers, and secure API integrations.",
      badge: "Hardened Security",
    },
    {
      icon: "build",
      title: "Clean Maintainable Code",
      description: "Written in modular TypeScript/React so future developers can easily extend functionality.",
      badge: "Scalable Architecture",
    },
  ];

  const processSteps = [
    {
      title: "Architecture & Design",
      description: "We map out your component hierarchy, wireframes, and design system tokens.",
    },
    {
      title: "Frontend Engineering",
      description: "We build modern React components with smooth micro-animations and crisp responsive layouts.",
    },
    {
      title: "Performance & A11y Audit",
      description: "Rigorous testing across devices, keyboard navigation, and Lighthouse 100 benchmarks.",
    },
    {
      title: "Deployment & CI/CD",
      description: "Zero-downtime deployment on global edge networks with automated build pipelines.",
    },
  ];

  const techStack = [
    { id: "react", name: "React", subtitle: "Modern Component Architecture" },
    { id: "typescript", name: "TypeScript", subtitle: "Type-Safe Development" },
    { id: "vite", name: "Vite", subtitle: "Lightning Fast Builds" },
    { id: "tailwind", name: "Tailwind CSS", subtitle: "Utility-First Styling" },
    { id: "node", name: "Node.js", subtitle: "Backend Runtime" },
    { id: "cloudflare", name: "Cloudflare", subtitle: "Global CDN & Edge Network" },
  ];

  const faqs = [
    {
      question: "Do you build custom sites or use templates?",
      answer: "Every NZI Conduit website is built from scratch using modern React/Vite code tailored to your brand design system.",
    },
    {
      question: "How do you ensure fast page load speeds?",
      answer: "We use code-splitting, asset optimization, sub-second edge deployment, and zero bloated third-party plugin scripts.",
    },
    {
      question: "Will my website work well on mobile devices?",
      answer: "Yes! Every layout is tested across 320, 375, 390, 430, 768, 1024, and 1440px viewports to ensure 100% responsive perfection.",
    },
  ];

  return (
    <main className="w-full bg-background overflow-hidden">
      <ServiceHero
        badgeText="Web Development & Engineering"
        title="Custom High-Performance Websites &"
        gradientTitle="Web Apps"
        description="We build lightning-fast, accessible, and conversion-optimized web applications designed to outperform legacy site builders."
        onRequestAudit={onRequestAudit}
        onNavigate={onNavigate}
        metrics={metrics}
      />

      <ProblemSection
        title="Why Legacy Web Development Slows You Down"
        description="Bloated templates and poor coding standards destroy your conversion rates and search rankings."
        points={problemPoints}
      />

      <FeatureGrid
        badgeText="Web Capabilities"
        title="Modern Frontend Excellence"
        description="Engineering standards comparable to Vercel, Linear, and Stripe."
        features={features}
      />

      <ProcessTimeline
        title="Our Web Development Workflow"
        description="From component blueprint to zero-downtime edge deployment."
        steps={processSteps}
      />

      <TechStackSection title="Built with Enterprise Tech" techList={techStack} />

      <ServiceFaq faqs={faqs} />

      <ServiceCtaBanner
        title="Ready for a Faster, Modern Website?"
        description="Request a free website speed & performance audit today."
        onRequestAudit={onRequestAudit}
        onNavigate={onNavigate}
      />
    </main>
  );
}