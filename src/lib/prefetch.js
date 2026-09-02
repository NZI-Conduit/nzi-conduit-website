/**
 * Route prefetching utility to load lazy route chunks on pointer hover or focus
 * for instantaneous transitions when clicked.
 */
const prefetchMap = {
  services: () => import("../pages/ServicesPage"),
  pricing: () => import("../pages/PricingPage"),
  cybersecurity: () => import("../pages/CybersecurityPage"),
  seo: () => import("../pages/SeoPage"),
  webdev: () => import("../pages/WebDevPage"),
  about: () => import("../pages/AboutPage"),
};

const prefetchedPages = new Set();

export function prefetchPage(pageName) {
  if (!pageName || prefetchedPages.has(pageName)) return;

  const importer = prefetchMap[pageName];
  if (typeof importer === "function") {
    prefetchedPages.add(pageName);
    importer().catch(() => {
      // Gracefully ignore network failures during prefetch
      prefetchedPages.delete(pageName);
    });
  }
}
