

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-surface-container-low full-width border-t border-outline-variant/20 pt-xl sm:pt-xxl">
      <div className="max-w-container-max mx-auto px-4 sm:px-lg grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-xl mb-10 sm:mb-16">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <a href="/" className="flex items-center gap-3 mb-4 sm:mb-6 cursor-pointer" onClick={(e) => {e.preventDefault();onNavigate("home");}}>
            <img
              alt="NZI Conduit Logo"
              className="h-8 w-8 rounded-full object-contain"
              src="/logo.png" />
            
            <span className="font-headline-md text-xl sm:text-2xl text-primary">NZI Conduit</span>
          </a>
          <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant mb-4 sm:mb-6 pr-2 leading-relaxed">
            We are a leading technology company dedicated to providing innovative solutions that help businesses grow and succeed in the digital age.
          </p>
          <div className="flex gap-3 sm:gap-4">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded bg-surface-container-lowest flex items-center justify-center border border-outline-variant/30 hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer shadow-sm hover:scale-110">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-on-surface-variant">share</span>
            </div>
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded bg-surface-container-lowest flex items-center justify-center border border-outline-variant/30 hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer shadow-sm hover:scale-110">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-on-surface-variant">forum</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h4 className="font-headline-md text-sm sm:text-lg mb-3 sm:mb-6 text-on-surface">Quick Links</h4>
          <ul className="space-y-2 sm:space-y-3 font-label text-on-surface-variant text-sm">
            <li><a href="/" className="hover:text-primary transition-all duration-300 cursor-pointer" onClick={(e) => {e.preventDefault();onNavigate("home");}}>Home</a></li>
            <li><a className="hover:text-primary transition-all duration-300 cursor-pointer" onClick={() => onNavigate("about")}>About Us</a></li>
            <li><a className="hover:text-primary transition-all duration-300 cursor-pointer" onClick={() => onNavigate("services")}>Services</a></li>
            <li><a className="hover:text-primary transition-all duration-300 cursor-pointer">Products</a></li>
            <li><a className="hover:text-primary transition-all duration-300 cursor-pointer">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="col-span-1">
          <h4 className="font-headline-md text-sm sm:text-lg mb-3 sm:mb-6 text-on-surface">Our Services</h4>
          <ul className="space-y-2 sm:space-y-3 font-label text-on-surface-variant text-sm">
            <li><a className="hover:text-primary transition-all duration-300 cursor-pointer" onClick={() => onNavigate("webdev")}>Web Development</a></li>
            <li><a className="hover:text-primary transition-all duration-300 cursor-pointer" onClick={() => onNavigate("seo")}>SEO</a></li>
            <li><a className="hover:text-primary transition-all duration-300 cursor-pointer" onClick={() => onNavigate("cybersecurity")}>Cybersecurity</a></li>
            <li><a className="hover:text-primary transition-all duration-300 cursor-pointer">IT Consulting</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-headline-md text-sm sm:text-lg mb-3 sm:mb-6 text-on-surface">Contact</h4>
          <ul className="space-y-3 sm:space-y-4 font-body-md text-on-surface-variant text-sm">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-primary mt-1">location_on</span>
              <span>123 Business Street, Suite 100<br />City, State 12345</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-primary">call</span>
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-primary">mail</span>
              <span className="break-all">info@nziconduit.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-outline-variant/10 py-6 sm:py-8 bg-surface-container">
        <div className="max-w-container-max mx-auto px-4 sm:px-lg flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <span className="font-body-sm text-xs sm:text-sm text-on-surface-variant opacity-70 text-center md:text-left">© 2024 NZI Conduit. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-label text-xs sm:text-sm text-on-surface-variant">
            <a className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
            <a className="hover:text-primary transition-colors cursor-pointer">Terms of Service</a>
            <a className="hover:text-primary transition-colors cursor-pointer">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>);

}