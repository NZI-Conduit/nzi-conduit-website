import { ServiceHero } from "../components/service/ServiceHero";
import { ProblemSection } from "../components/service/ProblemSection";
import { FeatureGrid } from "../components/service/FeatureGrid";
import { ProcessTimeline } from "../components/service/ProcessTimeline";
import { TechStackSection } from "../components/service/TechStackSection";
import { ServiceFaq } from "../components/service/ServiceFaq";
import { ServiceCtaBanner } from "../components/service/ServiceCtaBanner";

export default function ServicesPage({ onNavigate, onRequestAudit }) {
  const heroMetrics = [
    { value: "3", label: "Core Expertise Domains" },
    { value: "24h", label: "Audit Delivery" },
    { value: "99.9%", label: "System Uptime" },
    { value: "100%", label: "Individual Focus" },
  ];

  const problemPoints = [
    {
      title: "Excluded by Enterprise Firms",
      description: "Major IT providers ignore individual creators and small teams or force expensive corporate retainers.",
    },
    {
      title: "Slow Fragmented Support",
      description: "Getting help usually means dealing with chatbots, call centers, and multi-week ticket queues.",
    },
    {
      title: "One-Size-Fits-All Templates",
      description: "Generic tech solutions result in bloated code, weak security postures, and poor search ranking.",
    },
  ];

  const capabilities = [
    {
      icon: "code",
      title: "Web Development",
      description: "Custom React, Next.js, and Vite web applications optimized for speed, conversion, and mobility.",
      badge: "High Performance",
    },
    {
      icon: "trending_up",
      title: "SEO Optimization",
      description: "Data-driven organic search strategy, technical audit, and content hierarchy tuning to drive high-intent leads.",
      badge: "Organic Growth",
    },
    {
      icon: "shield_lock",
      title: "Cybersecurity Audits",
      description: "Comprehensive vulnerability scanning, data encryption posture review, and proactive threat prevention.",
      badge: "Enterprise Defense",
    },
  ];

  const processSteps = [
    {
      title: "Initial Audit",
      description: "We perform a thorough analysis of your web infrastructure, search health, or security posture.",
    },
    {
      title: "Custom Strategy",
      description: "We design a targeted engineering blueprint built specifically for your goals and budget.",
    },
    {
      title: "Agile Build & Tuning",
      description: "Senior developers implement high-performance code, search optimizations, and security patches.",
    },
    {
      title: "Continuous Support",
      description: "Proactive maintenance, uptime monitoring, and direct line engineer access whenever needed.",
    },
  ];

  const techStack = ["React 19", "TypeScript", "Node.js", "Vite", "Tailwind CSS", "Cloudflare", "Docker"];

  const faqs = [
    {
      question: "Which service should I start with?",
      answer: "We recommend starting with a free technical audit. Our report pinpoints whether web speed, search visibility, or security requires immediate attention.",
    },
    {
      question: "Can I bundle multiple services together?",
      answer: "Yes! All NZI Conduit services integrate seamlessly. You can combine web development with SEO optimization and cybersecurity monitoring.",
    },
    {
      question: "What is the typical project timeline?",
      answer: "Free technical audit reports are delivered within 24 hours. Full web projects typically complete within 1 to 3 weeks depending on scope.",
    },
  ];

  return (
    <main className="w-full bg-background overflow-hidden">
      <ServiceHero
        badgeText="Core Services & Capabilities"
        title="Tailored Tech Solutions Built for"
        gradientTitle="The Individual"
        description="NZI Conduit provides direct engineer-backed web development, search engine strategy, and cybersecurity auditing structured specifically for underserved creators and growing businesses."
        onRequestAudit={onRequestAudit}
        onNavigate={onNavigate}
        secondaryCtaText={null}
        metrics={heroMetrics}
      />

      <ProblemSection
        title="Why Traditional IT Fails Independent Clients"
        description="Mass market providers prioritize fortune 500 retainers, leaving smaller teams with generic templates and impersonal call center support."
        points={problemPoints}
      />

      <FeatureGrid
        badgeText="Full Capabilities"
        title="Core Engineering Pillars"
        description="Explore our dedicated focus areas designed to solve your technical challenges."
        features={capabilities}
      />

      <ProcessTimeline
        title="How We Execute Your Project"
        description="A transparent 4-step workflow designed for rapid delivery and zero friction."
        steps={processSteps}
      />

      <TechStackSection title="Powered by Production Technology" techList={techStack} />

      <ServiceFaq faqs={faqs} />

      <ServiceCtaBanner
        title="Ready to Elevate Your Digital Infrastructure?"
        description="Request your free comprehensive IT & Web audit report today."
        onRequestAudit={onRequestAudit}
        onNavigate={onNavigate}
      />
    </main>
  );
}