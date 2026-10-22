import { useState, useEffect, useRef, useMemo } from "react";
import { createAuditEmail } from "../lib/auditEmailTemplate.js";

// Hardcoded safe dummy scenarios. Never contains real submission data.
const PREVIEW_SCENARIOS = {
  asap: {
    id: "asap",
    label: "ASAP timeline",
    description: "Urgent turnaround request with prominent red badge highlight",
    data: {
      name: "Sarah Jenkins",
      email: "sarah.jenkins@acmelogistics.test",
      business_name: "Acme Freight Solutions",
      current_url: "https://acmefreight.example.com",
      location: "Dallas, Texas",
      services: ["web", "seo"],
      budget_fit: "fits",
      timeline: "asap",
      notes: "We have an upcoming product relaunch in two weeks and need immediate performance overhaul and local SEO ranking boost before our Q4 release.",
      submitted_at: "2026-10-22T12:32:00.000Z",
    },
  },
  normal: {
    id: "normal",
    label: "Normal timeline",
    description: "Standard month timeline with single service and stretch budget",
    data: {
      name: "David Sterling",
      email: "david@sterlingapparel.test",
      business_name: "Sterling & Co. Retail",
      current_url: "https://sterlingretail.example.com",
      location: "Seattle, Washington",
      services: ["web"],
      budget_fit: "stretch",
      timeline: "month",
      notes: "Planning a steady redesign over the coming weeks. We want to transition our e-commerce store to React/Vite with zero downtime.",
      submitted_at: "2026-10-22T10:15:00.000Z",
    },
  },
  nowebsite: {
    id: "nowebsite",
    label: "No website provided",
    description: "Greenfield client with no existing URL (button hidden, table says 'None provided')",
    data: {
      name: "Elena Rostova",
      email: "elena@novapower.test",
      business_name: "Nova Renewable Energy",
      current_url: "",
      location: "Denver, Colorado",
      services: ["web", "video"],
      budget_fit: "fits",
      timeline: "quarter",
      notes: "Early-stage venture. We do not have a live website yet. Looking for a full greenfield launch site and branded short-form video assets.",
      submitted_at: "2026-10-21T18:45:00.000Z",
    },
  },
  longnotes: {
    id: "longnotes",
    label: "Long notes",
    description: "Multi-paragraph scope with bullet lists and preserved line-breaks",
    data: {
      name: "Dr. Gregory Vance",
      email: "gvance@biotechdiagnostics.test",
      business_name: "Vance BioTech Diagnostics",
      current_url: "https://vancebiotech.example.com",
      location: "Boston, Massachusetts",
      services: ["web", "seo", "video"],
      budget_fit: "fits",
      timeline: "flexible",
      notes: `Section 1: Legacy Architecture Overhaul
We operate high-throughput clinical diagnostics labs across New England. Our current customer portal is built on legacy Drupal and suffers from significant latency during peak specimen logging hours.

Section 2: Key Deliverables & Requirements
1. Sub-second initial page load with edge caching for clinical physician portals.
2. Direct integration with HIPAA-compliant intake forms and laboratory information management system (LIMS) telemetry.
3. Local SEO restructuring across our 6 laboratory facilities in Massachusetts and Connecticut.
4. Micro-video explainers for patients accessing their genomic test result downloads.

Section 3: Timeline & Compliance
We are scheduling our technical milestones for Q4. Please provide a detailed milestone plan, compliance documentation, and recommended stack components.`,
      submitted_at: "2026-10-22T08:00:00.000Z",
    },
  },
  hostile: {
    id: "hostile",
    label: "Hostile input",
    description: "XSS script tags, javascript: pseudo-protocol URL, SQL injection simulation",
    data: {
      name: "<script>alert('xss_name')</script>Robert'); DROP TABLE Clients;--",
      email: "attacker@exploit.test",
      business_name: "Evil Corp <img src=x onerror=alert('xss_img')>",
      current_url: "javascript:alert('xss_cookie:'+document.cookie)",
      location: "Nowhere <b onmouseover=alert(1)>Hover Me</b>",
      services: ["web", "seo"],
      budget_fit: "not_now",
      timeline: "asap",
      notes: `Attempting iframe injection: <iframe src="https://malicious.test"></iframe>
And SVG attack vector: <svg onload="alert('xss_svg')">
And unescaped characters: & < > " ' /`,
      submitted_at: "2026-10-22T12:00:00.000Z",
    },
  },
};

const DEV_PASSWORDS = ["nzi2026", "audit-preview", "conduit-dev"];

export default function EmailPreviewPage({ onNavigate }) {
  // Check development environment
  const isDev =
    import.meta.env.DEV ||
    (typeof process !== "undefined" && process?.env?.NODE_ENV !== "production");

  // Production password unlock state
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("nzi_email_preview_auth") === "true";
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Toolbar state
  const [scenarioId, setScenarioId] = useState("asap");
  const [viewWidth, setViewWidth] = useState("desktop"); // 'desktop' (600px) | 'mobile' (375px)
  const [viewBg, setViewBg] = useState("light"); // 'light' | 'dark'
  const [activeTab, setActiveTab] = useState("html"); // 'html' | 'text'
  const [copied, setCopied] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(900);

  const iframeRef = useRef(null);

  // Enforce <meta name="robots" content="noindex, nofollow">
  useEffect(() => {
    let robotsMeta = document.querySelector('meta[name="robots"]');
    let created = false;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.name = "robots";
      document.head.appendChild(robotsMeta);
      created = true;
    }
    const prevContent = robotsMeta.getAttribute("content");
    robotsMeta.setAttribute("content", "noindex, nofollow");

    document.title = "Email Preview (Dev Tool) | NZI Conduit";

    return () => {
      if (created && robotsMeta.parentNode) {
        robotsMeta.remove();
      } else if (robotsMeta && prevContent) {
        robotsMeta.setAttribute("content", prevContent);
      }
    };
  }, []);

  // Compute email content based on active scenario
  const currentScenario = PREVIEW_SCENARIOS[scenarioId] || PREVIEW_SCENARIOS.asap;
  const emailOutput = useMemo(() => {
    return createAuditEmail(currentScenario.data);
  }, [currentScenario]);

  // Adjust iframe height automatically when content renders
  const handleIframeLoad = () => {
    try {
      const doc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
      if (doc) {
        const h = Math.max(
          doc.body?.scrollHeight || 0,
          doc.documentElement?.scrollHeight || 0,
          850
        );
        setIframeHeight(h + 20);
      }
    } catch {
      setIframeHeight(900);
    }
  };

  useEffect(() => {
    if (activeTab === "html") {
      const timer = setTimeout(handleIframeLoad, 100);
      return () => clearTimeout(timer);
    }
  }, [emailOutput.html, viewWidth, activeTab]);

  // Copy helper
  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle password unlock for production testing
  const handleUnlock = (e) => {
    e.preventDefault();
    const configuredPass = import.meta.env.VITE_EMAIL_PREVIEW_PASSWORD;
    const validKeys = configuredPass ? [...DEV_PASSWORDS, configuredPass] : DEV_PASSWORDS;
    if (validKeys.includes(passwordInput.trim())) {
      setIsUnlocked(true);
      sessionStorage.setItem("nzi_email_preview_auth", "true");
      setPasswordError("");
    } else {
      setPasswordError("Invalid access password. Please try again.");
    }
  };

  // If in production and not unlocked, show password gate
  if (!isDev && !isUnlocked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-900 text-slate-100">
        <div className="w-full max-w-md bg-slate-800 border border-slate-700/80 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
              🔒
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">Developer Email Preview</h1>
              <p className="text-xs text-slate-400">Restricted internal inspection route</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            This route is restricted in production builds. Enter the developer access password to inspect email templates.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Access Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
              {passwordError && (
                <p className="mt-2 text-xs text-red-400 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{passwordError}</span>
                </p>
              )}
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
              >
                Unlock Preview
              </button>
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate("home")}
                  className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-semibold rounded-lg transition-colors"
                >
                  Return Home
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Active iframe container width
  const iframeContainerWidth = viewWidth === "desktop" ? "600px" : "375px";
  // Simulated background color
  const canvasBgColor = viewBg === "light" ? "#F8FAFC" : "#0B0F19";
  const canvasBorderColor = viewBg === "light" ? "#E2E8F0" : "#1E293B";

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-14 md:top-16 z-30 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full">
              Dev Only
            </span>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Audit Request Email Preview
            </h1>
            <span className="hidden sm:inline-block text-xs text-slate-500">
              Isolated &lt;iframe&gt; Sandbox
            </span>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>IST Localized: <strong className="text-slate-200">{emailOutput.dateIST}</strong></span>
            </span>
            {emailOutput.isAsap && (
              <span className="px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800 text-[11px] font-bold">
                ASAP PRIORITY
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Control Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Scenario Switcher Buttons */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Select Test Scenario
              </label>
              <div className="flex flex-wrap gap-1.5">
                {Object.values(PREVIEW_SCENARIOS).map((sc) => {
                  const isActive = scenarioId === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => setScenarioId(sc.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400/30"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                      }`}
                      title={sc.description}
                    >
                      {sc.id === "hostile" ? "🛡️ " : sc.id === "asap" ? "⏱️ " : ""}
                      {sc.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View Width & Background Toggles */}
            <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
              
              {/* Width Toggle: Desktop (600px) vs Mobile (375px) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Viewport Width
                </label>
                <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                  <button
                    onClick={() => setViewWidth("desktop")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      viewWidth === "desktop"
                        ? "bg-slate-800 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    💻 Desktop (600px)
                  </button>
                  <button
                    onClick={() => setViewWidth("mobile")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      viewWidth === "mobile"
                        ? "bg-slate-800 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    📱 Mobile (375px)
                  </button>
                </div>
              </div>

              {/* Background Color Toggle: Light vs Dark */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Canvas Mode
                </label>
                <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                  <button
                    onClick={() => setViewBg("light")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      viewBg === "light"
                        ? "bg-slate-800 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    ☀️ Light
                  </button>
                  <button
                    onClick={() => setViewBg("dark")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      viewBg === "dark"
                        ? "bg-slate-800 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    🌙 Dark
                  </button>
                </div>
              </div>

              {/* View Format Tab Switcher: HTML vs Plain Text */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  View Mode
                </label>
                <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                  <button
                    onClick={() => setActiveTab("html")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      activeTab === "html"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    HTML Preview
                  </button>
                  <button
                    onClick={() => setActiveTab("text")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      activeTab === "text"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Plain-Text Fallback
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Scenario Description Sub-bar */}
          <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-400">
            <div>
              <span className="font-semibold text-slate-300">Scenario Note:</span>{" "}
              {currentScenario.description}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCopy(activeTab === "html" ? emailOutput.html : emailOutput.text)}
                className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors flex items-center space-x-1"
              >
                <span>{copied ? "✓ Copied!" : "📋 Copy " + (activeTab === "html" ? "HTML" : "Text")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview Frame Area */}
        {activeTab === "html" ? (
          <div
            className="w-full rounded-2xl p-6 sm:p-12 transition-colors duration-300 flex flex-col items-center justify-center border shadow-inner"
            style={{
              backgroundColor: canvasBgColor,
              borderColor: canvasBorderColor,
            }}
          >
            {/* Visual dimension label above the phone / desktop mock */}
            <div className="mb-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
              Render Canvas · Width: {iframeContainerWidth} ({viewWidth.toUpperCase()})
            </div>

            {/* The Isolated Iframe Container */}
            <div
              className="w-full transition-all duration-300 ease-out rounded-2xl shadow-2xl overflow-hidden border"
              style={{
                maxWidth: iframeContainerWidth,
                borderColor: viewBg === "dark" ? "#334155" : "#CBD5E1",
              }}
            >
              <iframe
                ref={iframeRef}
                title="Email Preview Frame"
                srcDoc={emailOutput.html}
                onLoad={handleIframeLoad}
                className="w-full border-0 block"
                style={{
                  height: `${iframeHeight}px`,
                  backgroundColor: "#FFFFFF",
                }}
              />
            </div>
          </div>
        ) : (
          /* Plain-Text Fallback Tab */
          <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Plain-Text Fallback Format
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Delivered to text-only email clients and spam filter inspection engines
                </p>
              </div>
              <button
                onClick={() => handleCopy(emailOutput.text)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                {copied ? "✓ Copied" : "Copy Plain Text"}
              </button>
            </div>

            <pre className="font-mono text-xs sm:text-sm text-slate-200 bg-slate-950 border border-slate-800/80 p-5 rounded-xl overflow-x-auto whitespace-pre leading-relaxed">
              {emailOutput.text}
            </pre>
          </div>
        )}

        {/* Email Metadata Inspection Strip */}
        <div className="mt-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400">
          <div className="font-bold text-slate-300 uppercase tracking-wider mb-3">
            Compiled Metadata &amp; Headers
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/50">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Subject</span>
              <span className="font-semibold text-slate-200 break-all">{emailOutput.subject}</span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/50">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Reply-To</span>
              <span className="font-semibold text-slate-200 break-all">{emailOutput.replyTo}</span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/50">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">To (Inquiry Recipient)</span>
              <span className="font-semibold text-slate-200 break-all">{emailOutput.to}</span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/50">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Payload Weight</span>
              <span className="font-semibold text-slate-200">
                HTML: {Math.round(emailOutput.html.length / 1024 * 10) / 10} KB · Text: {emailOutput.text.length} chars
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
