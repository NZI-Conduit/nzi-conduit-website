import Icon from "./ui/Icon";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/Button";
import { prefetchPage } from "../lib/prefetch";
import { prefetchAuditModal } from "../lib/modalPrefetch";

export default function Navbar({ activePage, onNavigate, onRequestAudit }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Scroll listener for scroll-aware header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on navigation
  const handleNavigate = (page) => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
    onNavigate(page);
  };

  const handleAuditClick = () => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
    if (onRequestAudit) onRequestAudit();
  };

  const isServicesActive =
    activePage === "services" ||
    activePage === "webdev" ||
    activePage === "seo" ||
    activePage === "cybersecurity";

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-surface/95 backdrop-blur-md shadow-sm border-b border-outline-variant/15 py-2.5"
            : "bg-surface/80 backdrop-blur-sm border-b border-transparent py-3.5"
        }`}
      >
        <div className="max-w-container-max mx-auto px-4 sm:px-lg flex justify-between items-center">
          {/* Logo */}
          <a
            href="/"
            className="font-headline-md text-headline-md font-bold text-primary tracking-tight cursor-pointer flex items-center gap-2.5 min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("home");
            }}
          >
            <picture>
              <source srcSet="/logo.avif" type="image/avif" />
              <img
                src="/favicon-48x48.png"
                alt="NZI Conduit Logo"
                width="36"
                height="36"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                className="h-9 w-9 object-contain rounded-full shadow-sm"
              />
            </picture>
            <span className="text-lg md:text-xl font-bold tracking-tight">NZI Conduit</span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-container-low/60 p-1.5 rounded-full border border-outline-variant/15">
            <button
              type="button"
              onClick={() => handleNavigate("home")}
              className={`px-4 py-2 text-sm font-label rounded-full transition-all duration-200 cursor-pointer ${
                activePage === "home"
                  ? "bg-white text-primary shadow-sm font-bold"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-variant/40"
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => prefetchPage("services")}
                onFocus={() => prefetchPage("services")}
                className={`px-4 py-2 text-sm font-label rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  isServicesActive
                    ? "bg-white text-primary shadow-sm font-bold"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-variant/40"
                }`}
              >
                <span>Services</span>
                <Icon
                  name="expand_more"
                  size={18}
                  className={`transition-transform duration-200 ${
                    isServicesOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              {isServicesOpen && (
                <div
                  role="menu"
                  style={{ transformOrigin: "top left" }}
                  className="absolute top-full left-0 mt-3 w-64 bg-surface border border-outline-variant/20 rounded-2xl shadow-xl overflow-hidden p-2 z-50 animate-[slideDown_0.2s_ease-out]"
                >
                  <button
                    role="menuitem"
                    className="w-full text-left px-3.5 py-3 rounded-xl hover:bg-primary/8 font-label text-sm transition-colors text-on-surface flex items-center gap-3 cursor-pointer group"
                    onClick={() => handleNavigate("services")}
                    onMouseEnter={() => prefetchPage("services")}
                  >
                    <Icon name="code" size={20} className="text-primary" />
                    <div>
                      <div className="font-bold text-on-surface group-hover:text-primary">
                        Services Overview
                      </div>
                      <div className="text-xs text-on-surface-variant opacity-80">
                        All technical capabilities
                      </div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-outline-variant/10" />

                  <button
                    role="menuitem"
                    className="w-full text-left px-3.5 py-3 rounded-xl hover:bg-primary/8 font-label text-sm transition-colors text-on-surface flex items-center gap-3 cursor-pointer group"
                    onClick={() => handleNavigate("webdev")}
                    onMouseEnter={() => prefetchPage("webdev")}
                  >
                    <Icon name="code" size={20} className="text-primary" />
                    <div>
                      <div className="font-bold text-on-surface group-hover:text-primary">
                        Web Development
                      </div>
                      <div className="text-xs text-on-surface-variant opacity-80">
                        Custom apps & sites
                      </div>
                    </div>
                  </button>

                  <button
                    role="menuitem"
                    className="w-full text-left px-3.5 py-3 rounded-xl hover:bg-primary/8 font-label text-sm transition-colors text-on-surface flex items-center gap-3 cursor-pointer group"
                    onClick={() => handleNavigate("seo")}
                    onMouseEnter={() => prefetchPage("seo")}
                  >
                    <Icon name="search" size={20} className="text-secondary" />
                    <div>
                      <div className="font-bold text-on-surface group-hover:text-primary">
                        SEO Optimization
                      </div>
                      <div className="text-xs text-on-surface-variant opacity-80">
                        Search ranking & visibility
                      </div>
                    </div>
                  </button>

                  <button
                    role="menuitem"
                    className="w-full text-left px-3.5 py-3 rounded-xl hover:bg-primary/8 font-label text-sm transition-colors text-on-surface flex items-center gap-3 cursor-pointer group"
                    onClick={() => handleNavigate("cybersecurity")}
                    onMouseEnter={() => prefetchPage("cybersecurity")}
                  >
                    <Icon name="security" size={20} className="text-tertiary" />
                    <div>
                      <div className="font-bold text-on-surface group-hover:text-primary">
                        Cybersecurity
                      </div>
                      <div className="text-xs text-on-surface-variant opacity-80">
                        Threat defense & compliance
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleNavigate("pricing")}
              onMouseEnter={() => prefetchPage("pricing")}
              onFocus={() => prefetchPage("pricing")}
              className={`px-4 py-2 text-sm font-label rounded-full transition-all duration-200 cursor-pointer ${
                activePage === "pricing"
                  ? "bg-white text-primary shadow-sm font-bold"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-variant/40"
              }`}
            >
              Pricing
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("about")}
              onMouseEnter={() => prefetchPage("about")}
              onFocus={() => prefetchPage("about")}
              className={`px-4 py-2 text-sm font-label rounded-full transition-all duration-200 cursor-pointer ${
                activePage === "about"
                  ? "bg-white text-primary shadow-sm font-bold"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-variant/40"
              }`}
            >
              About
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              onClick={handleAuditClick}
              onMouseEnter={prefetchAuditModal}
              onFocus={prefetchAuditModal}
              onTouchStart={prefetchAuditModal}
              icon="bolt"
            >
              Request Audit
            </Button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              ref={menuButtonRef}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-primary rounded-full hover:bg-primary/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-expanded={isMobileOpen}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              <Icon name={isMobileOpen ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        ref={mobileDrawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed top-0 right-0 bottom-0 z-50 md:hidden w-[85vw] max-w-[340px] bg-surface shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20">
          <a
            href="/"
            className="flex items-center gap-2.5 font-bold text-primary text-lg"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("home");
            }}
          >
            <picture>
              <source srcSet="/logo.avif" type="image/avif" />
              <img
                src="/favicon-32x32.png"
                alt="NZI Conduit Logo"
                width="32"
                height="32"
                loading="lazy"
                decoding="async"
                className="h-8 w-8 object-contain rounded-full shadow-sm"
              />
            </picture>
            <span>NZI Conduit</span>
          </a>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 text-on-surface-variant rounded-full hover:bg-surface-variant/30 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close drawer"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <button
            onClick={() => handleNavigate("home")}
            className={`w-full text-left px-4 py-3 rounded-xl font-label text-base transition-colors min-h-[48px] flex items-center cursor-pointer ${
              activePage === "home"
                ? "bg-primary/10 text-primary font-bold"
                : "text-on-surface hover:bg-surface-container-low"
            }`}
          >
            Home
          </button>

          {/* Services Accordion */}
          <div>
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              onMouseEnter={() => prefetchPage("services")}
              className={`w-full text-left px-4 py-3 rounded-xl font-label text-base transition-colors min-h-[48px] flex items-center justify-between cursor-pointer ${
                isServicesActive
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-on-surface hover:bg-surface-container-low"
              }`}
            >
              <span>Services</span>
              <Icon
                name="expand_more"
                size={18}
                className={`transition-transform ${
                  isMobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMobileServicesOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-4">
                <button
                  onClick={() => handleNavigate("services")}
                  onMouseEnter={() => prefetchPage("services")}
                  className="w-full text-left px-3 py-3 rounded-lg font-label text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors min-h-[44px] flex items-center cursor-pointer"
                >
                  All Services
                </button>
                <button
                  onClick={() => handleNavigate("webdev")}
                  onMouseEnter={() => prefetchPage("webdev")}
                  className="w-full text-left px-3 py-3 rounded-lg font-label text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors min-h-[44px] flex items-center cursor-pointer"
                >
                  Web Development
                </button>
                <button
                  onClick={() => handleNavigate("seo")}
                  onMouseEnter={() => prefetchPage("seo")}
                  className="w-full text-left px-3 py-3 rounded-lg font-label text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors min-h-[44px] flex items-center cursor-pointer"
                >
                  SEO Optimization
                </button>
                <button
                  onClick={() => handleNavigate("cybersecurity")}
                  onMouseEnter={() => prefetchPage("cybersecurity")}
                  className="w-full text-left px-3 py-3 rounded-lg font-label text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors min-h-[44px] flex items-center cursor-pointer"
                >
                  Cybersecurity Audit
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavigate("pricing")}
            onMouseEnter={() => prefetchPage("pricing")}
            className={`w-full text-left px-4 py-3 rounded-xl font-label text-base transition-colors min-h-[48px] flex items-center cursor-pointer ${
              activePage === "pricing"
                ? "bg-primary/10 text-primary font-bold"
                : "text-on-surface hover:bg-surface-container-low"
            }`}
          >
            Pricing & Packages
          </button>

          <button
            onClick={() => handleNavigate("about")}
            onMouseEnter={() => prefetchPage("about")}
            className={`w-full text-left px-4 py-3 rounded-xl font-label text-base transition-colors min-h-[48px] flex items-center cursor-pointer ${
              activePage === "about"
                ? "bg-primary/10 text-primary font-bold"
                : "text-on-surface hover:bg-surface-container-low"
            }`}
          >
            About
          </button>
        </nav>

        {/* Drawer Footer CTA */}
        <div className="px-6 py-6 border-t border-outline-variant/20 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <Button
            size="lg"
            className="w-full"
            onClick={handleAuditClick}
            onMouseEnter={prefetchAuditModal}
            onFocus={prefetchAuditModal}
            onTouchStart={prefetchAuditModal}
            icon="bolt"
          >
            Request Audit
          </Button>
        </div>
      </div>
    </>
  );
}