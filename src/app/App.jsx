import { useState, useEffect, Suspense, lazy, startTransition } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import { isValidPackageId } from "../data/servicePackages";
import { applySeoToDom } from "../lib/seo";
import { loadedComponents, preloadRouteChunk } from "../lib/routes";

const LazyRequestAuditModal = lazy(() => import("../components/ui/RequestAuditModal"));

// Fallback lazy loaders for client-side navigation if not preloaded in memory
const LazyServicesPage = lazy(() => import("../pages/ServicesPage"));
const LazyPricingPage = lazy(() => import("../pages/PricingPage"));
const LazyCybersecurityPage = lazy(() => import("../pages/CybersecurityPage"));
const LazySeoPage = lazy(() => import("../pages/SeoPage"));
const LazyWebDevPage = lazy(() => import("../pages/WebDevPage"));
const LazyAboutPage = lazy(() => import("../pages/AboutPage"));
const LazyEmailPreviewPage = lazy(() => import("../pages/EmailPreviewPage"));
const LazyNotFoundPage = lazy(() => import("../pages/NotFoundPage"));

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
      if (progress > 0) {
        setProgress(100);
        const resetTimer = setTimeout(() => setProgress(0), 200);
        return () => clearTimeout(resetTimer);
      }
    }
  }, [isNavigating, progress]);

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
    const validPages = ["home", "services", "pricing", "cybersecurity", "seo", "webdev", "about", "email-preview"];
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

  // Synchronize SEO metadata to DOM whenever activePage changes
  useEffect(() => {
    applySeoToDom(activePage);
  }, [activePage]);

  // URL path and query param synchronization
  useEffect(() => {
    const syncFromLocation = () => {
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, "");
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get("page");
      const packageParam = params.get("package");

      const resolvedPage = pathname || pageParam || "home";
      const validPages = ["home", "services", "pricing", "cybersecurity", "seo", "webdev", "about", "email-preview"];

      if (validPages.includes(resolvedPage)) {
        if (resolvedPage === "home" || loadedComponents[resolvedPage]) {
          startTransition(() => {
            setActivePage(resolvedPage);
          });
        } else {
          setIsNavigating(true);
          preloadRouteChunk(resolvedPage).finally(() => {
            startTransition(() => {
              setActivePage(resolvedPage);
              setIsNavigating(false);
            });
          });
        }
      } else if (pathname) {
        startTransition(() => {
          setActivePage("404");
        });
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

    if (packageId && isValidPackageId(packageId)) {
      setHighlightedPackageId(packageId);
    }

    // Update browser URL state cleanly
    const newPath = page === "home" ? "/" : `/${page}`;
    const newSearch = packageId && isValidPackageId(packageId) ? `?package=${packageId}` : "";
    window.history.pushState({}, "", `${newPath}${newSearch}`);
    applySeoToDom(page);

    // Resolve component chunk BEFORE switching activePage to ensure zero PageLoader flash
    if (page === "home" || loadedComponents[page]) {
      startTransition(() => {
        setActivePage(page);
        setIsNavigating(false);
      });
    } else {
      preloadRouteChunk(page).finally(() => {
        startTransition(() => {
          setActivePage(page);
          setIsNavigating(false);
        });
      });
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    window.__navigate = handleNavigate;
    return () => {
      delete window.__navigate;
    };
  }, [handleNavigate]);

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

  const knownPages = ["home", "services", "pricing", "cybersecurity", "seo", "webdev", "about", "email-preview"];
  const is404 = !knownPages.includes(activePage);

  // Synchronous component resolution: If already preloaded into memory, renders synchronously without Suspense!
  const ServicesComp = loadedComponents.services || LazyServicesPage;
  const PricingComp = loadedComponents.pricing || LazyPricingPage;
  const CybersecurityComp = loadedComponents.cybersecurity || LazyCybersecurityPage;
  const SeoComp = loadedComponents.seo || LazySeoPage;
  const WebDevComp = loadedComponents.webdev || LazyWebDevPage;
  const AboutComp = loadedComponents.about || LazyAboutPage;
  const EmailPreviewComp = loadedComponents["email-preview"] || LazyEmailPreviewPage;
  const NotFoundComp = loadedComponents["404"] || LazyNotFoundPage;

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

      {/* Page Content with Smooth Pure CSS Transition */}
      <main className="pt-14 md:pt-16">
        <div key={activePage} className="animate-page-enter">
          {activePage === "home" && (
            <HomePage
              onNavigate={handleNavigate}
              onRequestAudit={() => handleOpenAuditModal(null)}
            />
          )}
          {activePage === "services" &&
            (loadedComponents.services ? (
              <ServicesComp
                onNavigate={handleNavigate}
                onRequestAudit={() => handleOpenAuditModal(null)}
              />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <LazyServicesPage
                  onNavigate={handleNavigate}
                  onRequestAudit={() => handleOpenAuditModal(null)}
                />
              </Suspense>
            ))}
          {activePage === "pricing" &&
            (loadedComponents.pricing ? (
              <PricingComp
                onNavigate={handleNavigate}
                onRequestAudit={handleOpenAuditModal}
                highlightedPackageId={highlightedPackageId}
              />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <LazyPricingPage
                  onNavigate={handleNavigate}
                  onRequestAudit={handleOpenAuditModal}
                  highlightedPackageId={highlightedPackageId}
                />
              </Suspense>
            ))}
          {activePage === "cybersecurity" &&
            (loadedComponents.cybersecurity ? (
              <CybersecurityComp
                onNavigate={handleNavigate}
                onRequestAudit={() => handleOpenAuditModal(null)}
              />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <LazyCybersecurityPage
                  onNavigate={handleNavigate}
                  onRequestAudit={() => handleOpenAuditModal(null)}
                />
              </Suspense>
            ))}
          {activePage === "seo" &&
            (loadedComponents.seo ? (
              <SeoComp
                onNavigate={handleNavigate}
                onRequestAudit={() => handleOpenAuditModal(null)}
              />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <LazySeoPage
                  onNavigate={handleNavigate}
                  onRequestAudit={() => handleOpenAuditModal(null)}
                />
              </Suspense>
            ))}
          {activePage === "webdev" &&
            (loadedComponents.webdev ? (
              <WebDevComp
                onNavigate={handleNavigate}
                onRequestAudit={() => handleOpenAuditModal(null)}
              />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <LazyWebDevPage
                  onNavigate={handleNavigate}
                  onRequestAudit={() => handleOpenAuditModal(null)}
                />
              </Suspense>
            ))}
          {activePage === "about" &&
            (loadedComponents.about ? (
              <AboutComp
                onNavigate={handleNavigate}
                onRequestAudit={() => handleOpenAuditModal(null)}
              />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <LazyAboutPage
                  onNavigate={handleNavigate}
                  onRequestAudit={() => handleOpenAuditModal(null)}
                />
              </Suspense>
            ))}
          {activePage === "email-preview" &&
            (loadedComponents["email-preview"] ? (
              <EmailPreviewComp onNavigate={handleNavigate} />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <LazyEmailPreviewPage onNavigate={handleNavigate} />
              </Suspense>
            ))}
          {is404 &&
            (loadedComponents["404"] ? (
              <NotFoundComp onNavigate={handleNavigate} />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <LazyNotFoundPage onNavigate={handleNavigate} />
              </Suspense>
            ))}
        </div>
      </main>

      {/* Shared Footer */}
      <Footer
        onNavigate={handleNavigate}
        onRequestAudit={() => handleOpenAuditModal(null)}
      />

      {/* Audit Request Modal Dialog (Lazy-loaded with intent prefetch) */}
      {isAuditModalOpen && (
        <Suspense fallback={null}>
          <LazyRequestAuditModal
            isOpen={isAuditModalOpen}
            onClose={handleCloseAuditModal}
            selectedPackageId={selectedPackageId}
            onNavigate={handleNavigate}
          />
        </Suspense>
      )}
    </div>
  );
}