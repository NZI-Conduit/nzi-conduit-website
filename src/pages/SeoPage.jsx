import { ServiceHero } from "../components/service/ServiceHero";
import { ProblemSection } from "../components/service/ProblemSection";
import { FeatureGrid } from "../components/service/FeatureGrid";
import { ProcessTimeline } from "../components/service/ProcessTimeline";
import { TechStackSection } from "../components/service/TechStackSection";
import { ServiceFaq } from "../components/service/ServiceFaq";
import { ServiceCtaBanner } from "../components/service/ServiceCtaBanner";

export default function SeoPage({ onNavigate, onRequestAudit }) {
  const metrics = [
    { value: "+300%", label: "Organic Search Lift" },
    { value: "#1 Page", label: "Target Keyword Rank" },
    { value: "100%", label: "Core Web Vitals Pass" },
    { value: "24h", label: "SEO Audit Turnaround" },
  ];

  const problemPoints = [
    {
      title: "Invisible to High-Intent Buyers",
      description: "Without structured technical SEO, potential customers searching for your services find your competitors instead.",
    },
    {
      title: "Google Core Web Vitals Penalties",
      description: "Slow rendering speeds and unstable page layouts cause search engines to demote your domain in search results.",
    },
    {
      title: "Shallow Keyword Keyword Spam",
      description: "Outdated SEO tactics rely on keyword stuffing that hurts domain authority rather than building sustainable traffic.",
    },
  ];

  const features = [
    {
      icon: "travel_explore",
      title: "Technical SEO Auditing",
      description: "Deep crawl of site architecture, canonical tags, sitemaps, robots.txt, and HTTP status codes.",
      badge: "Deep Audit",
    },
    {
      icon: "speed",
      title: "Core Web Vitals Optimization",
      description: "Optimizing Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).",
      badge: "Speed Tuning",
    },
    {
      icon: "schema",
      title: "Structured Data Schema Markup",
      description: "JSON-LD schema implementation so search engines display rich snippets, FAQ cards, and organization info.",
      badge: "Rich Snippets",
    },
    {
      icon: "key",
      title: "High-Intent Keyword Strategy",
      description: "Data-focused keyword research targeting qualified search queries with high conversion potential.",
      badge: "Targeted Traffic",
    },
    {
      icon: "mobile_friendly",
      title: "Mobile-First Search Indexing",
      description: "Ensuring flawless mobile page rendering and touch performance required by modern indexing bots.",
      badge: "Mobile Indexing",
    },
    {
      icon: "analytics",
      title: "Transparent Ranking Analytics",
      description: "Clear performance dashboards showing position movement, organic impressions, and click-through rates.",
      badge: "Live Metrics",
    },
  ];

  const processSteps = [
    {
      title: "Technical Audit",
      description: "We crawl your entire website to uncover indexation issues, broken links, and speed bottlenecks.",
    },
    {
      title: "Keyword & Schema Map",
      description: "We build a semantic content map and JSON-LD schema tailored to your core services.",
    },
    {
      title: "On-Page Optimization",
      description: "Senior developers implement metadata, heading hierarchies, speed fixes, and internal linking.",
    },
    {
      title: "Tracking & Iteration",
      description: "Monthly monitoring of keyword positions, Google Search Console metrics, and continuous tuning.",
    },
  ];

  const techStack = [
    { id: "search-console", name: "Google Search Console", subtitle: "Search Performance" },
    { id: "lighthouse", name: "Google Lighthouse", subtitle: "Performance Auditing" },
    { id: "ahrefs", name: "Ahrefs", subtitle: "SEO Intelligence" },
    { id: "schema", name: "Schema.org JSON-LD", subtitle: "Structured Data" },
    { id: "ga4", name: "Google Analytics 4", subtitle: "Traffic & Conversion" },
    { id: "cloudflare", name: "Cloudflare", subtitle: "DNS & Edge Caching" },
  ];

  const faqs = [
    {
      question: "How long does it take to see SEO results?",
      answer: "Technical fixes (such as Core Web Vitals speed improvements and schema markup) typically index within days. Organic ranking growth usually manifests over 4 to 8 weeks.",
    },
    {
      question: "What is included in the free SEO audit report?",
      answer: "Your report includes a Core Web Vitals score, technical crawl errors, mobile usability checks, and target keyword ranking recommendations.",
    },
    {
      question: "Do you use safe white-hat SEO practices?",
      answer: "100% white-hat. We follow Google Search Essentials guidelines strictly to ensure your domain gains permanent organic authority.",
    },
  ];

  return (
    <main className="w-full bg-background overflow-hidden">
      <ServiceHero
        badgeText="SEO & Digital Visibility"
        title="Data-Driven Organic Search &"
        gradientTitle="Visibility Strategy"
        description="Dominate search results with technical SEO audits, Core Web Vitals optimization, and high-intent keyword strategies."
        onRequestAudit={onRequestAudit}
        onNavigate={onNavigate}
        metrics={metrics}
      />

      <ProblemSection
        title="Why Most Websites Fail in Search Results"
        description="Technical flaws and poor performance prevent search engines from ranking your business."
        points={problemPoints}
      />

      <FeatureGrid
        badgeText="SEO Capabilities"
        title="Comprehensive Search Optimization"
        description="Technical and strategic search engineering built for long-term organic growth."
        features={features}
      />

      <ProcessTimeline
        title="Our 4-Step SEO Workflow"
        description="A proven methodology from technical discovery to top-page rankings."
        steps={processSteps}
      />

      <TechStackSection title="Powered by SEO Analytics Tools" techList={techStack} />

      <ServiceFaq faqs={faqs} />

      <ServiceCtaBanner
        title="Ready to Grow Your Search Visibility?"
        description="Request a free technical SEO audit report today."
        onRequestAudit={onRequestAudit}
        onNavigate={onNavigate}
      />
    </main>
  );
}