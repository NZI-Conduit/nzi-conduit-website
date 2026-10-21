import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import { RequestAuditModal } from "../components/ui/RequestAuditModal";
import { isValidPackageId } from "../data/servicePackages";
import { applySeoToDom } from "../lib/seo";

// Lazy-load secondary pages for code splitting & fast initial load
const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const PricingPage = lazy(() => import("../pages/PricingPage"));
const CybersecurityPage = lazy(() => import("../pages/CybersecurityPage"));
const SeoPage = lazy(() => import("../pages/SeoPage"));
const WebDevPage = lazy(() => import("../pages/WebDevPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Premium Top Progress Bar (Vercel / GitHub style)
function TopProgressBar({ isNavigating }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isNavigating) {
      setProgress(30);
      const timer1 = setTimeout(() => setProgress(75), 150);
      const timer2 = setTimeout(() => setProgress(100), 300);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setProgress(100);
      const resetTimer = setTimeout(() => setProgress(0), 200);
      return () => clearTimeout(resetTimer);
    }
  }, [isNavigating]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-blue-100/50">
      <div
        className="w-full h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(37,99,235,0.8)]"
        style={{
          transform: `scaleX(${progress / 100})`,
          transformOrigin: "left",
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}

// Lightweight Suspense Fallback
function PageLoader() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4 animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="font-label text-xs font-semibold text-slate-500">Loading module...</p>
    </div>
  );
}

function getInitialPage() {
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname.replace(/^\/+|\/+$/g, "");
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");
    const resolvedPage = pathname || pageParam || "home";
    const validPages = ["home", "services", "pricing", "cybersecurity", "seo", "webdev", "about"];
    if (validPages.includes(resolvedPage)) return resolvedPage;
    if (pathname) return "404";
  }
  return "home";
}

export default function App() {
  const [activePage, setActivePage] = useState(getInitialPage);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [highlightedPackageId, setHighlightedPackageId] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  // Synchronize SEO metadata to DOM whenever activePage changes
  useEffect(() => {
    applySeoToDom(activePage);
  }, [activePage]);

  // Phase 4: Zero-dependency URL path and query param synchronization
  useEffect(() => {
    const syncFromLocation = () => {
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, "");
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get("page");
      const packageParam = params.get("package");

      const resolvedPage = pathname || pageParam || "home";
      const validPages = ["home", "services", "pricing", "cybersecurity", "seo", "webdev", "about"];

      if (validPages.includes(resolvedPage)) {
        setActivePage(resolvedPage);
      } else if (pathname) {
        setActivePage("404");
      }

      if (packageParam && isValidPackageId(packageParam)) {
        setHighlightedPackageId(packageParam);
      } else {
        setHighlightedPackageId(null);
      }
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  const handleNavigate = (page, packageId = null) => {
    if (page === activePage && !packageId) return;

    setIsNavigating(true);
    setActivePage(page);

    if (packageId && isValidPackageId(packageId)) {
      setHighlightedPackageId(packageId);
    }

    // Update browser URL state cleanly
    const newPath = page === "home" ? "/" : `/${page}`;
    const newSearch = packageId && isValidPackageId(packageId) ? `?package=${packageId}` : "";
    window.history.pushState({}, "", `${newPath}${newSearch}`);
    applySeoToDom(page);

    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => setIsNavigating(false), 300);
  };

  const handleOpenAuditModal = (packageId = null) => {
    if (packageId && isValidPackageId(packageId)) {
      setSelectedPackageId(packageId);
    } else {
      setSelectedPackageId(null);
    }
    setIsAuditModalOpen(true);
  };

  const handleCloseAuditModal = () => {
    setIsAuditModalOpen(false);
    setSelectedPackageId(null);
  };

  const knownPages = ["home", "services", "pricing", "cybersecurity", "seo", "webdev", "about"];
  const is404 = !knownPages.includes(activePage);

  return (
    <div className="w-full min-h-screen bg-background text-slate-900 selection:bg-blue-500/15 selection:text-blue-700">
      {/* Top Animated Progress Bar */}
      <TopProgressBar isNavigating={isNavigating} />

      {/* Single Fixed Shared Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onRequestAudit={() => handleOpenAuditModal(null)}
      />

      {/* Page Content with Smooth Transition */}
      <main className="pt-14 md:pt-16">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activePage}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {activePage === "home" && (
                <HomePage
                  onNavigate={handleNavigate}
                  onRequestAudit={() => handleOpenAuditModal(null)}
                />
              )}
              {activePage === "services" && (
                <ServicesPage
                  onNavigate={handleNavigate}
                  onRequestAudit={() => handleOpenAuditModal(null)}
                />
              )}
              {activePage === "pricing" && (
                <PricingPage
                  onNavigate={handleNavigate}
                  onRequestAudit={handleOpenAuditModal}
                  highlightedPackageId={highlightedPackageId}
                />
              )}
              {activePage === "cybersecurity" && (
                <CybersecurityPage
                  onNavigate={handleNavigate}
                  onRequestAudit={() => handleOpenAuditModal(null)}
                />
              )}
              {activePage === "seo" && (
                <SeoPage
                  onNavigate={handleNavigate}
                  onRequestAudit={() => handleOpenAuditModal(null)}
                />
              )}
              {activePage === "webdev" && (
                <WebDevPage
                  onNavigate={handleNavigate}
                  onRequestAudit={() => handleOpenAuditModal(null)}
                />
              )}
              {activePage === "about" && (
                <AboutPage
                  onNavigate={handleNavigate}
                  onRequestAudit={() => handleOpenAuditModal(null)}
                />
              )}
              {is404 && <NotFoundPage onNavigate={handleNavigate} />}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Single Shared Footer */}
      <Footer
        onNavigate={handleNavigate}
        onRequestAudit={() => handleOpenAuditModal(null)}
      />

      {/* Shared Interactive Request Audit Modal */}
      <RequestAuditModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAuditModal}
        selectedPackageId={selectedPackageId}
      />
    </div>
  );
}