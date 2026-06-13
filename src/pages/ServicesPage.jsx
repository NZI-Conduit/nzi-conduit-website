import infraBg from "../assets/services/infrastructure_support_tech.png";

export default function ServicesPage({ onNavigate }) {
  return (
    <main>
      {/* 2-Column Split-Screen Hero */}
      <header className="relative min-h-[auto] md:min-h-[90vh] flex flex-col md:flex-row items-stretch overflow-hidden bg-surface-container-lowest">
        
        {/* Left Column: Clear Text on Solid Background */}
        <div className="w-full md:w-1/2 flex items-center justify-end px-4 sm:px-lg py-16 sm:py-xxl md:py-xxxl bg-surface-container-lowest border-b md:border-b-0 md:border-r border-outline-variant/10 z-10">
          <div className="max-w-[560px] w-full space-y-md sm:space-y-xl md:pr-xl md:pl-lg">
            <div className="bg-primary-fixed text-on-primary-fixed-variant px-lg py-xs rounded-full font-label text-xs uppercase tracking-widest font-bold inline-flex items-center gap-sm shadow-sm border border-primary/10 animate-reveal delay-1">
              <span className="material-symbols-outlined icon-fill text-[16px]">build</span>
              <span>Professional IT Solutions</span>
            </div>
            
            <h1 className="font-hero-lg text-hero-lg text-on-surface leading-tight animate-reveal delay-2">
              Personalized IT <br />
              to <span className="text-gradient">Fit Your Needs</span>
            </h1>
            
            <p className="font-body-lg text-on-surface-variant leading-relaxed animate-reveal delay-3">
              NZI Conduit is structured for those who are largely excluded from major service providers. Our services are tailored to provide personalized IT solutions—bringing dynamic services centered around the individual and their needs.
            </p>
            
            <div className="pt-md animate-reveal delay-4">
              <button
                className="w-full sm:w-auto bg-primary text-on-primary h-[52px] sm:h-[56px] px-xl sm:px-xxl rounded-full font-label font-bold hover:shadow-xl transition-all active:scale-95 duration-200 flex items-center justify-center gap-sm group cursor-pointer text-sm uppercase tracking-wider"
                onClick={() => {
                  const element = document.getElementById("core-services");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}>
                Explore Services
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Column: Immersive Background Visual */}
        <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 sm:p-xl md:p-xxl bg-surface-container-low overflow-hidden min-h-[300px] sm:min-h-[450px] md:min-h-0">
          
          {/* High Visibility Context Background Image */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img 
              alt="Modern Office" 
              className="w-full h-full object-cover opacity-80" 
              src="/images/services_hero_bg_1781285811369.png" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-low/40 to-transparent"></div>
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
          </div>
          
          {/* Centered Premium Tilted Dashboard mockup */}
          <div className="relative z-10 w-full max-w-[540px] animate-reveal delay-5 group">
            {/* Ambient Backlight Blob */}
            <div className="absolute -inset-6 bg-primary/25 rounded-3xl blur-3xl z-0 pointer-events-none group-hover:bg-primary/30 transition-colors duration-500"></div>
            
            {/* Frame container */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,55,176,0.3)] border-4 border-white backdrop-blur-sm transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1">
              <img 
                alt="Dashboard Interface" 
                className="w-full h-auto object-contain" 
                src="/images/services_dashboard_1781285823506.png" 
              />
              {/* Glass reflection shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none"></div>
            </div>
          </div>
        </div>
        
      </header>

      {/* High-Level Overview Section */}
      <section id="core-services" className="py-section-py bg-surface px-lg">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-xxxl">
            <div className="text-primary font-label uppercase tracking-widest text-sm mb-sm">Core Capabilities</div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-md">The Conduit Hub</h2>
            <p className="font-body-lg text-on-surface-variant max-w-[800px] mx-auto">
              Integrated solutions designed to elevate your digital presence and secure your infrastructure. We act as your central point for all technical advancement.
            </p>
          </div>
          {/* Service-Led 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {/* Card 1: Problem Solving */}
            <div className="bg-white rounded-2xl p-xl shadow-sm border border-outline-variant/10 hover:shadow-xl transition-all flex flex-col group cursor-pointer" onClick={() => onNavigate("services")}>
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-lg">
                <img alt="Technical Support" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/services_tech_support_1781285837347.png" />
              </div>
              <div className="text-primary font-label uppercase tracking-widest text-xs mb-xs">Step 01. Problem Solving</div>
              <h3 className="font-headline-md text-[24px] text-on-surface mb-md">Personal IT Issues</h3>
              <p className="font-body-md text-on-surface-variant mb-lg flex-grow text-sm leading-relaxed">
                An IT professional can quickly diagnose and resolve a wide range of personal technology issuess, from slow computers and virus infections to network connectivity issues and software malfunctions. They bring specialized knowledge and tools that allow them to efficiently troubleshoot complex technical issues.
              </p>
              <div className="bg-surface-container-low p-md rounded-xl border border-primary/5 mb-lg">
                <div className="flex items-start gap-md">
                  <span className="material-symbols-outlined icon-fill text-primary text-[20px] mt-0.5">verified_user</span>
                  <div className="text-xs font-body-sm text-on-surface">
                    <strong>Preventative Care:</strong> System optimization to keep devices running smoothly and protect personal data.
                  </div>
                </div>
              </div>
              <a className="flex items-center gap-xs text-primary font-label group/link mt-auto cursor-pointer">
                Learn more <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>

            {/* Card 2: Web Dev */}
            <div className="bg-white rounded-2xl p-xl shadow-sm border border-outline-variant/10 hover:shadow-xl transition-all flex flex-col group cursor-pointer" onClick={() => onNavigate("webdev")}>
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-lg">
                <img alt="Web Development" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/services_web_dev_1781285854843.png" />
              </div>
              <div className="text-secondary font-label uppercase tracking-widest text-xs mb-xs">Step 02. Digital Foundation</div>
              <h3 className="font-headline-md text-[24px] text-on-surface mb-md">Web Development</h3>
              <p className="font-body-md text-on-surface-variant mb-lg flex-grow text-sm leading-relaxed">
                Custom, responsive web applications built with modern frameworks for optimal performance and user experience. We focus on creating digital environments that work for you, ensuring your online presence is as professional as your physical business.
              </p>
              <div className="flex items-center gap-md mb-lg">
                <div className="flex-1 h-[1px] bg-outline-variant/30"></div>
                <span className="material-symbols-outlined text-secondary text-[24px]">code</span>
                <div className="flex-1 h-[1px] bg-outline-variant/30"></div>
              </div>
              <a className="flex items-center gap-xs text-secondary font-label group/link mt-auto cursor-pointer">
                Learn more <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>

            {/* Card 3: SEO */}
            <div className="bg-white rounded-2xl p-xl shadow-sm border border-outline-variant/10 hover:shadow-xl transition-all flex flex-col group cursor-pointer" onClick={() => onNavigate("seo")}>
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-lg">
                <img alt="SEO Dashboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/services_seo_1781285884168.png" />
              </div>
              <div className="text-tertiary font-label uppercase tracking-widest text-xs mb-xs">Step 03. Visibility</div>
              <h3 className="font-headline-md text-[24px] text-on-surface mb-md">Search Optimization</h3>
              <p className="font-body-md text-on-surface-variant mb-lg flex-grow text-sm leading-relaxed">
                Data-driven SEO strategies to improve visibility, drive organic traffic, and establish authoritative market presence through meticulous optimization and strategic planning. We ensure your brand is found by those who need it most.
              </p>
              <div className="flex gap-sm mb-lg flex-wrap">
                <span className="px-sm py-1 bg-tertiary-fixed/30 text-on-tertiary-fixed text-[10px] font-label rounded-full">Organic Growth</span>
                <span className="px-sm py-1 bg-tertiary-fixed/30 text-on-tertiary-fixed text-[10px] font-label rounded-full">Market Authority</span>
              </div>
              <a className="flex items-center gap-xs text-tertiary font-label group/link mt-auto cursor-pointer">
                Learn more <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>

            {/* Card 4: Cybersecurity */}
            <div className="bg-white rounded-2xl p-xl shadow-sm border border-outline-variant/10 hover:shadow-xl transition-all flex flex-col group lg:col-start-1 cursor-pointer" onClick={() => onNavigate("cybersecurity")}>
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-lg">
                <img alt="Cybersecurity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/services_cybersecurity_1781285896493.png" />
              </div>
              <div className="text-error font-label uppercase tracking-widest text-xs mb-xs">Step 04. Protection</div>
              <h3 className="font-headline-md text-[24px] text-on-surface mb-md">Cybersecurity</h3>
              <p className="font-body-md text-on-surface-variant mb-lg flex-grow text-sm leading-relaxed">
                Comprehensive security audits, threat mitigation, and infrastructure hardening to protect vital digital assets against modern evolving threats and vulnerabilities. Our proactive approach ensures your peace of mind in an increasingly digital world.
              </p>
              <a className="flex items-center gap-xs text-error font-label group/link mt-auto cursor-pointer">
                Learn more <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>

            {/* Additional Conduit Hub Content Card - Upgraded to 10/10 (Filled Layout) */}
            <div className="bg-gradient-to-br from-primary via-[#112d8a] to-[#25105a] rounded-3xl p-lg md:p-xxl shadow-xl flex flex-col md:flex-row gap-xl text-on-primary group lg:col-span-2 overflow-hidden relative border border-white/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              
              {/* Abstract decorative background glow */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
              
              {/* Left Side: Info & Features */}
              <div className="flex-grow flex flex-col justify-between gap-xl relative z-10 md:w-1/2">
                <div className="space-y-md">
                  <div className="bg-white/10 text-primary-fixed border border-white/20 px-sm py-1 rounded-full font-label text-[10px] uppercase tracking-widest font-bold inline-block">
                    Conduit Approach
                  </div>
                  <h3 className="font-headline-xl text-[32px] md:text-[40px] font-extrabold text-white leading-tight">
                    Full Infrastructure Support
                  </h3>
                  <p className="font-body-md text-primary-fixed/80 text-base leading-relaxed max-w-[500px]">
                    Beyond standard software, we provide hardware management and networking setup as part of our holistic 'Conduit' approach.
                  </p>
                </div>
                
                {/* 2x2 Grid of capabilities */}
                <div className="grid grid-cols-2 gap-x-xl gap-y-lg mt-md">
                  <div className="flex items-center gap-md group/item">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/5 group-hover/item:bg-white/20 transition-all">
                      <span className="material-symbols-outlined text-white">settings_input_component</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-label font-bold text-white">Hardware Selection</span>
                      <span className="text-[10px] text-primary-fixed/60">Tailored specs</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-md group/item">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/5 group-hover/item:bg-white/20 transition-all">
                      <span className="material-symbols-outlined text-white">network_ping</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-label font-bold text-white">Network Tuning</span>
                      <span className="text-[10px] text-primary-fixed/60">Optimized latency</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-md group/item">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/5 group-hover/item:bg-white/20 transition-all">
                      <span className="material-symbols-outlined text-white">dns</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-label font-bold text-white">Server Assembly</span>
                      <span className="text-[10px] text-primary-fixed/60">Custom rack builds</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-md group/item">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/5 group-hover/item:bg-white/20 transition-all">
                      <span className="material-symbols-outlined text-white">router</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-label font-bold text-white">Wi-Fi Audits</span>
                      <span className="text-[10px] text-primary-fixed/60">Zero deadzones</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side: Floating Illustration (No Inner Border Frame, Scaled Up) */}
              <div className="relative z-10 md:w-1/2 min-h-[280px] md:min-h-0 flex items-center justify-center">
                {/* Backlight glow behind the server rack */}
                <div className="absolute w-[300px] h-[300px] bg-primary/20 rounded-full blur-[60px] pointer-events-none z-0"></div>
                <img 
                  alt="Server Infrastructure" 
                  className="w-[240px] md:w-[320px] h-auto object-contain relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] group-hover:scale-105 group-hover:-rotate-2 transition-all duration-500" 
                  src={infraBg} 
                />
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Full-Width CTA */}
      <section className="relative py-section-py px-lg overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
        <div className="w-full relative z-10 text-center">
          <div className="max-w-[800px] mx-auto flex flex-col items-center gap-xl">
            <h2 className="font-hero-lg text-hero-lg text-on-primary">Ready to optimize your technology?</h2>
            <p className="font-body-lg text-primary-fixed max-w-[600px]">Get specialized IT support tailored exactly to your personal or business needs. Start the conversation today with our expert team.</p>
            <div className="flex flex-col sm:flex-row gap-md w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white text-primary h-[56px] sm:h-[64px] px-xl sm:px-xxl rounded-full font-label hover:bg-primary-fixed transition-colors shadow-2xl text-base sm:text-lg min-h-[52px]">
                Contact Us
              </button>
              <button className="border-2 border-white/30 text-on-primary h-[64px] px-xxl rounded-full font-label hover:bg-white/10 transition-colors text-lg">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}