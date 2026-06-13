import { useState, useRef, useEffect } from "react";

export default function Navbar({ activePage, onNavigate }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  // Close mobile menu on page change
  const handleNavigate = (page) => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
    onNavigate(page);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNavClass = (page) => {
    const baseClass = "font-label text-label transition-colors cursor-pointer ";
    if (activePage === page) {
      return baseClass + "text-primary border-b-2 border-primary pb-1";
    }
    return baseClass + "text-on-surface-variant hover:text-primary";
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm">
        <div className="max-w-container-max mx-auto px-4 sm:px-lg py-3 flex justify-between items-center">
          {/* Logo */}
          <a
            href="/"
            className="font-headline-md text-headline-md font-bold text-primary tracking-tight cursor-pointer flex items-center gap-2 min-h-[44px]"
            onClick={(e) => { e.preventDefault(); handleNavigate("home"); }}>
            <img
              src="/logo.png"
              alt="NZI Conduit Logo"
              className="h-9 md:h-10 w-auto object-contain" />
            <span className="text-base md:text-xl">NZI Conduit</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-xl">
            <div className="relative flex items-center" ref={dropdownRef}>
              <a
                className={`${getNavClass("services")} flex items-center`}
                onClick={() => handleNavigate("services")}>
                Services
              </a>
              <span
                className={`material-symbols-outlined text-[18px] transition-transform duration-200 cursor-pointer ml-1 text-on-surface-variant hover:text-primary ${isServicesOpen ? "rotate-180" : ""}`}
                onClick={() => setIsServicesOpen(!isServicesOpen)}>
                expand_more
              </span>

              {isServicesOpen &&
                <div className="absolute top-full left-0 mt-2 w-56 bg-surface dark:bg-inverse-surface border border-outline-variant/20 rounded-xl shadow-lg overflow-hidden py-2 z-50 animate-[slideDown_0.2s_ease-out]">
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-surface-variant/50 dark:hover:bg-inverse-on-surface/10 font-label text-label transition-colors text-on-surface dark:text-inverse-on-surface"
                    onClick={() => { handleNavigate("webdev"); }}>
                    Web Development
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-surface-variant/50 dark:hover:bg-inverse-on-surface/10 font-label text-label transition-colors text-on-surface dark:text-inverse-on-surface"
                    onClick={() => { handleNavigate("seo"); }}>
                    SEO
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-surface-variant/50 dark:hover:bg-inverse-on-surface/10 font-label text-label transition-colors text-on-surface dark:text-inverse-on-surface"
                    onClick={() => { handleNavigate("cybersecurity"); }}>
                    Cybersecurity
                  </button>
                </div>
              }
            </div>
            <a
              className={getNavClass("about")}
              onClick={() => handleNavigate("about")}>
              About
            </a>

            <div className="flex items-center gap-4 border-l border-outline-variant/30 pl-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-surface-variant/30 min-w-[44px] min-h-[44px]"
                title="Toggle Dark Mode">
                <span className="material-symbols-outlined text-[22px]">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <button className="bg-primary text-on-primary px-xl py-sm rounded-full font-label text-label hover:opacity-90 transition-all active:scale-95 duration-200 cursor-pointer whitespace-nowrap text-sm">
                Request Audit
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Toggle Dark Mode">
              <span className="material-symbols-outlined text-[22px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-primary rounded-full hover:bg-primary/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}>
              <span className="material-symbols-outlined text-[24px]">
                {isMobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileOpen(false)}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 md:hidden w-[85vw] max-w-[340px] bg-surface shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20">
          <a
            href="/"
            className="flex items-center gap-2 font-bold text-primary text-lg"
            onClick={(e) => { e.preventDefault(); handleNavigate("home"); }}>
            <img src="/logo.png" alt="NZI Conduit" className="h-8 w-auto object-contain" />
            <span>NZI Conduit</span>
          </a>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 text-on-surface-variant rounded-full hover:bg-surface-variant/30 min-w-[44px] min-h-[44px] flex items-center justify-center">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <button
            onClick={() => handleNavigate("home")}
            className={`w-full text-left px-4 py-3 rounded-xl font-label text-base transition-colors min-h-[48px] flex items-center ${activePage === 'home' ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'}`}>
            Home
          </button>

          {/* Services accordion */}
          <div>
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className={`w-full text-left px-4 py-3 rounded-xl font-label text-base transition-colors min-h-[48px] flex items-center justify-between ${activePage === 'services' || activePage === 'webdev' || activePage === 'seo' || activePage === 'cybersecurity' ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'}`}>
              <span>Services</span>
              <span className={`material-symbols-outlined text-[18px] transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {isMobileServicesOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-4">
                <button
                  onClick={() => handleNavigate("services")}
                  className="w-full text-left px-3 py-3 rounded-lg font-label text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors min-h-[44px] flex items-center">
                  All Services
                </button>
                <button
                  onClick={() => handleNavigate("webdev")}
                  className="w-full text-left px-3 py-3 rounded-lg font-label text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors min-h-[44px] flex items-center">
                  Web Development
                </button>
                <button
                  onClick={() => handleNavigate("seo")}
                  className="w-full text-left px-3 py-3 rounded-lg font-label text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors min-h-[44px] flex items-center">
                  SEO
                </button>
                <button
                  onClick={() => handleNavigate("cybersecurity")}
                  className="w-full text-left px-3 py-3 rounded-lg font-label text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors min-h-[44px] flex items-center">
                  Cybersecurity
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavigate("about")}
            className={`w-full text-left px-4 py-3 rounded-xl font-label text-base transition-colors min-h-[48px] flex items-center ${activePage === 'about' ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'}`}>
            About
          </button>
        </nav>

        {/* Drawer Footer CTA */}
        <div className="px-6 py-6 border-t border-outline-variant/20">
          <button className="w-full bg-primary text-on-primary py-4 rounded-full font-label font-bold hover:opacity-90 transition-all active:scale-95 text-base min-h-[52px]">
            Request Audit
          </button>
        </div>
      </div>
    </>
  );
}