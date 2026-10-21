import { COMPANY_DETAILS, JSON_LD_STRUCTURED_DATA } from "./constants";

export const SEO_ROUTES = {
  home: {
    path: "/",
    title: "NZI Conduit | Personalized IT Solutions",
    description: "Direct engineer-backed web development, search engine strategy, and cybersecurity auditing structured specifically for creators and growing businesses.",
    canonical: "https://nziconduit.com/",
    ogTitle: "NZI Conduit | Personalized IT Solutions",
    ogDescription: "Direct engineer-backed web development, search engine strategy, and cybersecurity auditing structured specifically for creators and growing businesses.",
    ogUrl: "https://nziconduit.com/",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumbName: "Home",
  },
  services: {
    path: "/services",
    title: "Engineered Digital Services | NZI Conduit",
    description: "Comprehensive IT services: custom web applications, precision search engine visibility, and proactive cybersecurity auditing.",
    canonical: "https://nziconduit.com/services",
    ogTitle: "Engineered Digital Services | NZI Conduit",
    ogDescription: "Custom web applications, search engine strategy, and proactive cybersecurity auditing built by senior engineers.",
    ogUrl: "https://nziconduit.com/services",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumbName: "Services",
  },
  pricing: {
    path: "/pricing",
    title: "Transparent Fixed Pricing & Packages | NZI Conduit",
    description: "Fixed-scope engineering deliverables with locked boundaries. Compare our Starter, Growth, Enterprise, and Retainer packages.",
    canonical: "https://nziconduit.com/pricing",
    ogTitle: "Transparent Fixed Pricing & Packages | NZI Conduit",
    ogDescription: "Fixed-scope engineering deliverables with locked boundaries. Clear milestones, no open-ended guesswork.",
    ogUrl: "https://nziconduit.com/pricing",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumbName: "Pricing & Packages",
  },
  cybersecurity: {
    path: "/cybersecurity",
    title: "Cybersecurity Audits & Vulnerability Assessments | NZI Conduit",
    description: "Enterprise security auditing, penetration testing, and vulnerability assessments designed for independent businesses and modern apps.",
    canonical: "https://nziconduit.com/cybersecurity",
    ogTitle: "Cybersecurity Audits & Vulnerability Assessments | NZI Conduit",
    ogDescription: "Enterprise security auditing, penetration testing, and vulnerability assessments designed for independent businesses and modern apps.",
    ogUrl: "https://nziconduit.com/cybersecurity",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumbName: "Cybersecurity Audits",
  },
  seo: {
    path: "/seo",
    title: "Technical Search Engine Optimization & Growth | NZI Conduit",
    description: "Data-driven SEO strategies, technical audits, Core Web Vitals optimization, and keyword discovery to dominate organic search.",
    canonical: "https://nziconduit.com/seo",
    ogTitle: "Technical Search Engine Optimization & Growth | NZI Conduit",
    ogDescription: "Data-driven SEO strategies, technical audits, Core Web Vitals optimization, and keyword discovery to dominate organic search.",
    ogUrl: "https://nziconduit.com/seo",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumbName: "SEO Strategy",
  },
  webdev: {
    path: "/webdev",
    title: "Custom Web Application Development | NZI Conduit",
    description: "High-performance modern web apps built with React, Vite, Tailwind CSS, and edge deployment for sub-second load times.",
    canonical: "https://nziconduit.com/webdev",
    ogTitle: "Custom Web Application Development | NZI Conduit",
    ogDescription: "High-performance modern web apps built with React, Vite, Tailwind CSS, and edge deployment for sub-second load times.",
    ogUrl: "https://nziconduit.com/webdev",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumbName: "Web Development",
  },
  about: {
    path: "/about",
    title: "About NZI Conduit | Senior Engineering IT Partner",
    description: "Learn why NZI Conduit was founded: to give independent operators and high-growth teams direct access to senior engineers without corporate bloat.",
    canonical: "https://nziconduit.com/about",
    ogTitle: "About NZI Conduit | Senior Engineering IT Partner",
    ogDescription: "Learn why NZI Conduit was founded: direct access to senior engineers without corporate bloat.",
    ogUrl: "https://nziconduit.com/about",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumbName: "About Us",
  },
  "404": {
    path: "/404",
    title: "404 - Page Not Found | NZI Conduit",
    description: "The page you are looking for does not exist or has been moved.",
    canonical: "https://nziconduit.com/404",
    ogTitle: "404 - Page Not Found | NZI Conduit",
    ogDescription: "The page you are looking for does not exist or has been moved.",
    ogUrl: "https://nziconduit.com/404",
    ogImage: "https://nziconduit.com/logo.png",
    breadcrumbName: "404 Not Found",
  },
};

export function getBreadcrumbJsonLd(routeKey) {
  if (!routeKey || routeKey === "home" || routeKey === "404") return null;
  const meta = SEO_ROUTES[routeKey];
  if (!meta) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://nziconduit.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": meta.breadcrumbName,
        "item": meta.canonical
      }
    ]
  };
}

export function applySeoToDom(routeKey) {
  if (typeof document === "undefined") return;
  const meta = SEO_ROUTES[routeKey] || SEO_ROUTES.home;

  document.title = meta.title;

  const updateMeta = (name, content, attr = "name") => {
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  updateMeta("description", meta.description);
  updateMeta("og:title", meta.ogTitle, "property");
  updateMeta("og:description", meta.ogDescription, "property");
  updateMeta("og:url", meta.ogUrl, "property");
  updateMeta("og:image", meta.ogImage, "property");
  updateMeta("twitter:title", meta.ogTitle, "name");
  updateMeta("twitter:description", meta.ogDescription, "name");
  updateMeta("twitter:image", meta.ogImage, "name");

  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement("link");
    canonicalEl.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute("href", meta.canonical);

  // Update Breadcrumb JSON-LD
  let breadcrumbScript = document.getElementById("jsonld-breadcrumbs");
  const breadcrumbData = getBreadcrumbJsonLd(routeKey);
  if (breadcrumbData) {
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement("script");
      breadcrumbScript.id = "jsonld-breadcrumbs";
      breadcrumbScript.type = "application/ld+json";
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbData, null, 2);
  } else if (breadcrumbScript) {
    breadcrumbScript.remove();
  }
}
