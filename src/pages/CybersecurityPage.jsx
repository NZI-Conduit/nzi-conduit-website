import { ServiceHero } from "../components/service/ServiceHero";
import { ProblemSection } from "../components/service/ProblemSection";
import { FeatureGrid } from "../components/service/FeatureGrid";
import { ProcessTimeline } from "../components/service/ProcessTimeline";
import { TechStackSection } from "../components/service/TechStackSection";
import { ServiceFaq } from "../components/service/ServiceFaq";
import { ServiceCtaBanner } from "../components/service/ServiceCtaBanner";

export default function CybersecurityPage({ onNavigate, onRequestAudit }) {
  const metrics = [
    { value: "0", label: "Security Breach Tolerance" },
    { value: "24/7", label: "Threat Prevention" },
    { value: "100%", label: "Encrypted Data Transmission" },
    { value: "24h", label: "Security Audit Report" },
  ];

  const problemPoints = [
    {
      title: "Rising Cyber Attacks",
      description: "Small businesses and independent creators are targeted by over 43% of automated cyber attacks and ransomware scans.",
    },
    {
      title: "Exposed API & Database Endpoints",
      description: "Unprotected server ports and outdated software dependencies invite data leaks, credential theft, and malware infection.",
    },
    {
      title: "Compliance & Liability Exposure",
      description: "Failing basic data protection standards creates severe financial liability and ruins hard-earned customer trust.",
    },
  ];

  const features = [
    {
      icon: "shield_lock",
      title: "Vulnerability Scanning",
      description: "Automated and manual penetration testing to identify server vulnerabilities, open ports, and weak configurations.",
      badge: "Proactive Defense",
    },
    {
      icon: "enhanced_encryption",
      title: "SSL/TLS & Encryption Hardening",
      description: "Implementing TLS 1.3 encryption, secure HTTP headers (HSTS, CSP), and end-to-end data encryption.",
      badge: "Encryption Posture",
    },
    {
      icon: "gavel",
      title: "Compliance Assessments",
      description: "Evaluating compliance with GDPR, SOC 2, HIPAA, and industry data privacy requirements.",
      badge: "Privacy Standard",
    },
    {
      icon: "verified_user",
      title: "Access Control & Identity",
      description: "Multi-Factor Authentication (MFA), role-based access control (RBAC), and session security tuning.",
      badge: "Identity Control",
    },
    {
      icon: "bug_report",
      title: "Dependency Vulnerability Review",
      description: "Scanning third-party NPM/Node libraries for known CVE security vulnerabilities before deployment.",
      badge: "Supply Chain Defense",
    },
    {
      icon: "health_and_safety",
      title: "Incident Response Playbook",
      description: "Detailed emergency response protocols and automated backup configurations to guarantee data recovery.",
      badge: "Zero-Loss Recovery",
    },
  ];

  const processSteps = [
    {
      title: "Threat Assessment",
      description: "We audit your web applications, DNS records, SSL certificates, and server endpoints for vulnerabilities.",
    },
    {
      title: "Security Hardening Plan",
      description: "We deliver a prioritized remediation report categorizing critical, high, and moderate risks.",
    },
    {
      title: "Remediation & Patching",
      description: "Engineers apply security patches, configure firewall rules, and enforce encrypted protocols.",
    },
    {
      title: "Continuous Verification",
      description: "Ongoing automated vulnerability monitoring and quarterly security audit reviews.",
    },
  ];

  const techStack = [
    { id: "cloudflare-waf", name: "Cloudflare WAF", subtitle: "Edge Firewall" },
    { id: "owasp", name: "OWASP Top 10", subtitle: "Security Standards" },
    { id: "tls", name: "TLS 1.3", subtitle: "End-to-End Encryption" },
    { id: "oauth", name: "OAuth 2.0", subtitle: "Secure Authentication" },
    { id: "docker", name: "Docker", subtitle: "Container Isolation" },
    { id: "burp-suite", name: "Burp Suite", subtitle: "Security Testing" },
  ];

  const faqs = [
    {
      question: "Why do small businesses need a cybersecurity audit?",
      answer: "Over 43% of cyber attacks target small businesses because attackers assume they lack dedicated security teams. A quick audit stops automated exploits before damage occurs.",
    },
    {
      question: "What does the free cybersecurity audit report cover?",
      answer: "We scan your domain for SSL configuration errors, exposed headers, open ports, DNS vulnerabilities, and public data leaks.",
    },
    {
      question: "Will the audit disrupt my live website or services?",
      answer: "No. Our audit tools perform non-intrusive security scans that inspect your site without causing downtime or user disruption.",
    },
  ];

  return (
    <main className="w-full bg-background overflow-hidden">
      <ServiceHero
        badgeText="Cybersecurity & Defense"
        title="Proactive Security Audits & Threat"
        gradientTitle="Protection"
        description="Protect your business assets, user data, and reputation with enterprise-grade security assessments and threat mitigation."
        onRequestAudit={onRequestAudit}
        onNavigate={onNavigate}
        metrics={metrics}
      />

      <ProblemSection
        title="The Hidden Cost of Unprotected Infrastructure"
        description="Cyber threats target unpatched vulnerabilities, costing businesses trust and financial stability."
        points={problemPoints}
      />

      <FeatureGrid
        badgeText="Security Capabilities"
        title="Robust Defense Architecture"
        description="Proactive security measures engineered to protect your digital perimeter."
        features={features}
      />

      <ProcessTimeline
        title="Our Security Audit Process"
        description="From vulnerability detection to continuous threat prevention."
        steps={processSteps}
      />

      <TechStackSection title="Built on Industry Security Standards" techList={techStack} />

      <ServiceFaq faqs={faqs} />

      <ServiceCtaBanner
        title="Is Your Infrastructure Secure?"
        description="Request a free cybersecurity vulnerability assessment report today."
        onRequestAudit={onRequestAudit}
        onNavigate={onNavigate}
      />
    </main>
  );
}