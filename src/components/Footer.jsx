import { useState } from "react";
import { Button } from "./ui/Button";
import { COMPANY_DETAILS } from "../lib/constants";

export default function Footer({ onNavigate, onRequestAudit }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setIsSubscribed(false);
    }, 4000);
  };

  const newsletterBenefits = [
    {
      icon: "engineering",
      title: "Monthly Engineering Insights",
      description: "Architecture blueprints & React 19 / Vite performance guides.",
    },
    {
      icon: "security",
      title: "Security Advisories",
      description: "Proactive vulnerability alerts & SSL encryption best practices.",
    },
    {
      icon: "speed",
      title: "Performance Benchmarks",
      description: "Core Web Vitals tuning & Lighthouse 100 optimization tips.",
    },
  ];

  return (
    <footer className="w-full bg-[#0F172A] border-t border-slate-800 pt-16 sm:pt-20 pb-8 text-left text-slate-300">
      <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Balanced Newsletter Block with 3 Benefit Cards */}
        <div className="bg-[#1E293B] border border-slate-700/60 rounded-3xl p-6 sm:p-10 mb-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (50%): Copy & Input */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-label font-bold uppercase tracking-wider border border-blue-500/20">
              <span className="material-symbols-outlined text-[16px]">mark_email_unread</span>
              <span>Engineering Digest</span>
            </div>

            <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-white tracking-tight">
              Stay Ahead with IT & Tech Insights
            </h3>
            <p className="font-body text-sm text-slate-300 leading-relaxed">
              Subscribe to our monthly engineering digest for security advisories, performance benchmarks, and code optimization tips.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              {isSubscribed ? (
                <div className="w-full flex items-center gap-2 text-emerald-400 font-label text-sm font-semibold bg-emerald-500/10 px-4 py-3 rounded-full border border-emerald-500/20">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <>
                  <div className="relative w-full">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">
                      mail
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full h-11 pl-11 pr-4 rounded-full bg-[#0F172A] border border-slate-700 text-white font-body text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <Button type="submit" size="md" variant="primary" className="w-full sm:w-auto shrink-0 bg-blue-600 hover:bg-blue-700 text-white">
                    Subscribe
                  </Button>
                </>
              )}
            </form>
          </div>

          {/* Right Column (50%): Three Benefit Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-3">
            {newsletterBenefits.map((b, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#0F172A]/70 border border-slate-700/50 flex items-start gap-3.5 hover:border-blue-500/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{b.icon}</span>
                </div>
                <div>
                  <h4 className="font-headline text-sm font-bold text-white">
                    {b.title}
                  </h4>
                  <p className="font-body text-xs text-slate-400 mt-0.5">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-xl mb-12 sm:mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 text-left">
            <a
              href="/"
              className="inline-flex items-center gap-2.5 mb-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("home");
              }}
            >
              <img
                alt="NZI Conduit Logo"
                className="h-8 w-8 rounded-full object-contain shadow-sm"
                src="/logo.png"
              />
              <span className="font-headline-md text-xl font-bold text-white tracking-tight">
                NZI Conduit
              </span>
            </a>
            <p className="font-body text-sm text-slate-400 mb-4 pr-2 leading-relaxed">
              Empowering individuals and underserved clients with modern, high-performance IT solutions.
            </p>

            {/* Live Operational & Response SLA Badges */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-label font-semibold w-max">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-slate-700 text-slate-300 text-[11px] font-label font-medium w-max">
                <span className="material-symbols-outlined text-blue-400 text-[14px]">schedule</span>
                <span>Response SLA: &lt; 24 Hours</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="NZI Conduit GitHub"
                className="w-9 h-9 rounded-full bg-[#1E293B] border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500/50 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <span className="material-symbols-outlined text-[18px]">code</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="NZI Conduit Twitter"
                className="w-9 h-9 rounded-full bg-[#1E293B] border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500/50 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="NZI Conduit LinkedIn"
                className="w-9 h-9 rounded-full bg-[#1E293B] border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500/50 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <span className="material-symbols-outlined text-[18px]">work</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="col-span-1 text-left">
            <h4 className="font-headline text-sm font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-3 font-label text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-block"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-block"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={onRequestAudit}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-block"
                >
                  Free Technical Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-block"
                >
                  Services Overview
                </button>
              </li>
              <li>
                <button
                  onClick={onRequestAudit}
                  className="group hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 text-blue-400"
                >
                  <span>Request Audit</span>
                  <span className="material-symbols-outlined text-[14px] transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-span-1 text-left">
            <h4 className="font-headline text-sm font-bold uppercase tracking-wider text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-3 font-label text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate("webdev")}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-block"
                >
                  Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("seo")}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-block"
                >
                  SEO Optimization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("cybersecurity")}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-block"
                >
                  Cybersecurity Audit
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="col-span-2 md:col-span-1 text-left">
            <h4 className="font-headline text-sm font-bold uppercase tracking-wider text-white mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3 font-body text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[18px] text-blue-400 mt-0.5 shrink-0">
                  location_on
                </span>
                <a
                  href={COMPANY_DETAILS.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors text-slate-300 leading-relaxed"
                  title="View Office Location on Google Maps"
                >
                  {COMPANY_DETAILS.address.street}
                  <br />
                  {COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.state} {COMPANY_DETAILS.address.zip}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-blue-400 shrink-0">
                  call
                </span>
                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-blue-400 shrink-0">
                  mail
                </span>
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="hover:text-white transition-colors text-slate-300 break-all"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-label text-slate-400">
          <div>© 2026 NZI Conduit Inc. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Preferences
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}