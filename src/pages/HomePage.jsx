import saasBg from "../assets/home/premium_saas_hero_bg_no_grid.png";

export default function HomePage({ onNavigate }) {
  return (
    <main className="w-full bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-outline-variant/10 py-xxl md:py-xxxl">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            alt="Premium SaaS Hero Background"
            className="w-full h-full object-cover opacity-90 dark:opacity-70 transition-opacity duration-500"
            src={saasBg}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          {/* Ambient Glow Blobs */}
          <div className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse duration-10000"></div>
          <div className="absolute -bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] animate-pulse duration-10000 delay-3000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-container-max mx-auto px-lg text-center flex flex-col items-center gap-lg md:gap-xl pt-12 md:pt-16 pb-16 md:pb-24">
          <div className="inline-flex items-center gap-sm px-sm py-xs bg-primary-fixed text-on-primary-fixed-variant rounded-full font-label text-xs uppercase tracking-widest font-bold shadow-sm border border-primary/10 animate-reveal delay-1">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Premium IT Solutions</span>
          </div>

          <h1 className="font-hero-lg text-hero-lg text-on-surface mb-xs max-w-[900px] animate-reveal delay-2 leading-tight">
            Personalized IT to <br className="hidden md:block" />
            <span className="text-gradient">Fit Your Needs</span>
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-[700px] mx-auto animate-reveal delay-3 text-lg md:text-xl">
            Dynamic services centered around the individual and their needs. NZI Conduit is structured for those that are largely excluded from major service providers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-md w-full sm:w-auto pt-md animate-reveal delay-4">
            <button
              onClick={() => onNavigate("services")}
              className="w-full sm:w-auto bg-primary text-on-primary font-label px-xxl py-md rounded-full hover:shadow-xl transition-all active:scale-95 duration-200 shimmer-effect uppercase text-center cursor-pointer text-sm font-bold tracking-wide"
            >
              Explore Services
            </button>
            <button
              onClick={() => onNavigate("about")}
              className="w-full sm:w-auto border-2 border-primary text-primary font-label px-xxl py-md rounded-full hover:bg-primary/5 transition-all active:scale-95 duration-200 uppercase text-center cursor-pointer text-sm font-bold tracking-wide"
            >
              Our Approach
            </button>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-section-py bg-surface-container-lowest relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-lg scroll-reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-lg md:gap-xl">
            {/* Bento Card 1 */}
            <div className="glass-card p-6 sm:p-10 flex flex-col justify-center relative overflow-hidden group hover:border-primary/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-primary select-none pointer-events-none">
                <span className="material-symbols-outlined text-[140px]">architecture</span>
              </div>
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant/30 mb-6 sm:mb-8 z-10 shadow-sm transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl">settings_suggest</span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 z-10 text-on-surface">Personalized Solutions</h2>
              <p className="font-body-md text-on-surface-variant z-10 leading-relaxed text-base sm:text-lg">
                NZI Conduit is structured for those excluded from major providers. We bring dynamic services centered around individual needs.
              </p>
            </div>

            {/* Bento Card 2 */}
            <div className="glass-card p-6 sm:p-10 flex flex-col justify-center relative overflow-hidden group hover:border-primary/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-primary select-none pointer-events-none">
                <span className="material-symbols-outlined text-[140px]">psychiatry</span>
              </div>
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant/30 mb-6 sm:mb-8 z-10 shadow-sm transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl">diversity_3</span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 z-10 text-on-surface">Designed For You</h2>
              <p className="font-body-md text-on-surface-variant z-10 leading-relaxed text-base sm:text-lg">
                From custom device setups to personalized support, we provide IT services designed for you—not the masses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section className="py-section-py bg-surface relative border-t border-outline-variant/10">
        <div className="max-w-[1200px] mx-auto px-lg scroll-reveal">
          <div className="text-center mb-16 max-w-[800px] mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-sm block">Our Core Capabilities</span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-md">Tailored Tech Capabilities</h2>
            <p className="font-body-lg text-on-surface-variant max-w-[600px] mx-auto">
              We provide highly focused support across web, visibility, and security. Explore our dedicated expertise areas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg md:gap-xl">
            {/* Card 1: Web Dev */}
            <div 
              onClick={() => onNavigate("webdev")}
              className="group bg-white rounded-3xl p-8 border border-outline-variant/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">code</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-3">Web Development</h3>
                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-6">
                  Custom, responsive websites built with modern frameworks to elevate your creative business presence.
                </p>
              </div>
              <span className="text-primary font-label text-sm flex items-center gap-xs group-hover:gap-sm transition-all font-bold">
                Learn More <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </div>

            {/* Card 2: SEO */}
            <div 
              onClick={() => onNavigate("seo")}
              className="group bg-white rounded-3xl p-8 border border-outline-variant/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">trending_up</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-3">Search Optimization</h3>
                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-6">
                  Data-driven search strategy to grow organic visibility and connect with your audience.
                </p>
              </div>
              <span className="text-secondary font-label text-sm flex items-center gap-xs group-hover:gap-sm transition-all font-bold">
                Learn More <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </div>

            {/* Card 3: Cybersecurity */}
            <div 
              onClick={() => onNavigate("cybersecurity")}
              className="group bg-white rounded-3xl p-8 border border-outline-variant/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">shield_lock</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-3">Cybersecurity</h3>
                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-6">
                  Robust security assessments and active monitoring scaled precisely for small business needs.
                </p>
              </div>
              <span className="text-error font-label text-sm flex items-center gap-xs group-hover:gap-sm transition-all font-bold">
                Learn More <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Holistic Banner CTA */}
      <section className="relative py-section-py px-4 sm:px-lg overflow-hidden bg-primary scroll-reveal">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]"></div>
        <div className="w-full relative z-10 text-center">
          <div className="max-w-[800px] mx-auto flex flex-col items-center gap-md sm:gap-xl">
            <h2 className="font-hero-lg text-hero-lg text-on-primary">Ready to optimize your technology?</h2>
            <p className="font-body-lg text-primary-fixed max-w-[600px] text-sm sm:text-base">Get specialized IT support tailored exactly to your personal or business needs. Start the conversation today with our expert team.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-md w-full sm:w-auto pt-md justify-center">
              <button 
                onClick={() => onNavigate("services")}
                className="w-full sm:w-auto bg-white text-primary h-[52px] sm:h-[56px] px-xl sm:px-xxl rounded-full font-label font-bold hover:bg-primary-fixed transition-all active:scale-95 duration-200 cursor-pointer shadow-lg uppercase text-sm tracking-wider min-h-[52px]"
              >
                Get Started
              </button>
              <button 
                onClick={() => onNavigate("about")}
                className="w-full sm:w-auto border-2 border-white/30 text-on-primary h-[52px] sm:h-[56px] px-xl sm:px-xxl rounded-full font-label font-bold hover:bg-white/10 transition-all active:scale-95 duration-200 cursor-pointer uppercase text-sm tracking-wider min-h-[52px]"
              >
                Our Approach
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}