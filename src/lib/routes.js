export const ROUTE_IMPORTS = {
  services: () => import("../pages/ServicesPage"),
  pricing: () => import("../pages/PricingPage"),
  cybersecurity: () => import("../pages/CybersecurityPage"),
  seo: () => import("../pages/SeoPage"),
  webdev: () => import("../pages/WebDevPage"),
  about: () => import("../pages/AboutPage"),
  404: () => import("../pages/NotFoundPage"),
};

export const loadedComponents = {};

/**
 * Preload and store the resolved component synchronously in memory.
 * This guarantees the initial React render and hydration NEVER suspends.
 */
export async function preloadRouteChunk(key) {
  if (!ROUTE_IMPORTS[key]) return null;
  if (!loadedComponents[key]) {
    try {
      const mod = await ROUTE_IMPORTS[key]();
      loadedComponents[key] = mod.default || mod;
    } catch (err) {
      console.error(`Failed to preload chunk for [${key}]:`, err);
    }
  }
  return loadedComponents[key];
}
