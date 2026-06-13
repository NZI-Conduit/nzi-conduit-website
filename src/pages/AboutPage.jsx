export default function AboutPage({ onNavigate }) {
  return (
    <main className="relative bg-background text-on-surface overflow-hidden">

      {/* Decorative Background Glow Blobs for Visual Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse duration-[8000ms]"></div>
        <div className="absolute top-40 right-1/4 w-[450px] h-[450px] rounded-full bg-secondary/5 blur-[130px] animate-pulse duration-[10000ms] delay-2000"></div>
      </div>

      {/* Hero Section - Premium Centered Minimalist */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center justify-center text-center px-4 sm:px-lg pt-24 sm:pt-32 pb-lg sm:pb-xl z-10">
        <div className="max-w-4xl mx-auto space-y-md sm:space-y-xl">
          <div className="inline-flex items-center gap-sm bg-primary-fixed text-on-primary-fixed px-sm py-xs rounded-full font-label text-xs font-bold uppercase tracking-widest mx-auto shadow-sm border border-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Founded in 2022
          </div>

          <h1 className="font-hero-lg text-hero-lg text-on-background max-w-[900px] mx-auto tracking-tight">
            About us.
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-3xl mx-auto font-medium leading-relaxed">
            Based in the heart of Arizona, we are a dedicated team of passionate web developers who believe that every business, regardless of size, deserves a powerful digital presence.
          </p>

          <div className="flex justify-center mt-6 sm:mt-8">
            <div className="bg-primary p-md sm:p-lg rounded-2xl bento-shadow text-on-primary flex items-center gap-md hover:scale-[1.03] transition-transform duration-300">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
              </div>
              <div className="text-left">
                <p className="text-3xl md:text-4xl font-bold tracking-tight leading-none text-white">100+</p>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">Clients Empowered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Anchor Section with Scroll Reveal */}
      <section className="px-6 lg:px-8 -mt-16 relative z-10 scroll-reveal">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative overflow-hidden rounded-[36px] shadow-2xl">
            <img
              alt="The NZI Conduit team workspace"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo9yYJdk7HWMYxEiEEwMaeExcCwMhEa13XgOmEY18zgVm3c2dggHGMo72KXQMWOeHzOlFcQ9w6yiDkFIguyJW1SO2tyeoFaUd5Mr0BT4inxsbthXxnoQj3Sqc3EAQaFjIv_uGE-HRwB_j-PG38BBmq3NNa4WU1PUAGz6dL9FhdLi1XzkUb6wFYEi7JX-Srdy16vF3lr_2E7dIhiXPC4lJ_COlt5N4ofy_fAjP10Pi3Zjkgij-zr442vrWlI4mPZcbr9tBvy2osIwAJ"
              className="w-full h-[500px] md:h-[650px] xl:h-[750px] object-cover"
            />

            {/* Premium Glassmorphic Quote Card */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 w-[280px] md:w-[380px] lg:w-[500px] bg-white/80 dark:bg-black/50 backdrop-blur-md border border-white/20 rounded-[24px] p-6 md:p-8 shadow-2xl">
              <p className="text-lg md:text-xl leading-relaxed italic font-medium text-on-surface-variant">
                "What started as a vision to bridge the technology gap for small businesses has grown into a comprehensive digital solutions company."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section - Clean Asymmetrical Vertical Stack */}
      <section className="py-xxl px-lg mt-12 scroll-reveal z-10 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
          <div className="lg:col-span-5">
            <div className="border-l-4 border-primary pl-lg py-sm">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-on-background leading-tight">
                We bridge the technology gap for growing businesses.
              </h2>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-lg text-left">
            <p className="font-body-lg text-on-surface-variant leading-relaxed font-light">
              Our lean but mighty team brings together years of experience in web development, search engine optimization, cybersecurity, and IT consulting. We understand that small businesses and entrepreneurs face unique challenges in today's digital landscape.
            </p>
            <p className="font-body-lg text-on-surface-variant leading-relaxed font-light">
              Which is why we've built our company around providing enterprise-level solutions with the personal touch and affordability that growing businesses need. We act as a technology conduit, handling the complex digital details so you can focus on what you do best.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision - High Impact Bento Grid Layout */}
      <section className="py-xxxl bg-surface-container-low px-lg relative z-10 scroll-reveal">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">

            {/* Mission Card */}
            <div className="glass-card glow-hover bg-grid-subtle p-xl border border-outline-variant/30 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-xl">
                  <span className="material-symbols-outlined text-3xl">flag</span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-on-background mb-lg">Our Mission</h2>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  To empower small businesses, entrepreneurs, and digital creators with cutting-edge web solutions that drive growth, enhance security, and maximize online visibility. We are committed to delivering personalized, high-quality digital services that help our clients compete effectively.
                </p>
              </div>
              <div className="mt-xl h-2 w-24 bg-primary rounded-full"></div>
            </div>

            {/* Vision Card */}
            <div className="glass-card glow-hover bg-grid-subtle p-xl border border-outline-variant/30 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-xl">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-on-background mb-lg">Our Vision</h2>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  To be the trusted digital partner for small businesses across America, creating a world where every entrepreneur has access to professional-grade web development, robust cybersecurity, and strategic IT consulting that scales with their success.
                </p>
              </div>
              <div className="mt-xl h-2 w-24 bg-secondary rounded-full"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Capabilities - Sophisticated Grid with Interactive Hover */}
      <section className="py-section-py px-lg relative z-10 scroll-reveal">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-xxxl">
            <div className="text-primary font-label uppercase tracking-widest text-xs mb-xs">What We Do Best</div>
            <h2 className="font-headline-xl text-headline-xl text-on-background mb-sm">Core Capabilities</h2>
            <p className="font-body-lg text-on-surface-variant mt-4">Enterprise-grade expertise for the tools that run your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {/* Cap 1: Web Dev */}
            <div
              className="group bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden flex flex-col h-full hover:border-primary/55 transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => onNavigate('webdev')}>
              <div className="aspect-[4/3] overflow-hidden">
                <img alt="Web development interface" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3xD5Z6Vlf3A54R_H8dTE_Zi6zh-HHXyDhbvTCGkeprEScYDM5Bp08e60KyGK56t3fv24T56yXKr47Og92YxdTcQARc6sjez7w_tpPu3MeoBFjz2Rr0grNi5FQiLiH_36OmpBSUbamUaamHSVL3nuTU4cTtpR5yc53cQAVn7QvoFzTxKIQVfgFA0JvYht1Rz39izFAIs2lLy78yfboQn1E-FvUlabLSwBdH3jItAmYJGaESkieCkLoUWlcKJ0Tak53IqWC9mcIJAN1" />
              </div>
              <div className="p-xl flex-grow flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-primary mb-md">code</span>
                  <h3 className="font-headline-md text-[24px] font-bold tracking-tight mb-md text-on-background">Web Development</h3>
                  <p className="font-body-md text-on-surface-variant leading-relaxed mb-xl">Create stunning, responsive websites that engage your audience and drive business growth. We specialize in modern frameworks.</p>
                </div>
                <a className="text-sm font-bold uppercase tracking-wide text-primary inline-flex items-center gap-xs group-hover:gap-sm transition-all cursor-pointer">
                  Learn more <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Cap 2: SEO */}
            <div
              className="group bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden flex flex-col h-full hover:border-secondary/55 transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => onNavigate('seo')}>
              <div className="aspect-[4/3] overflow-hidden">
                <img alt="Professional SEO dashboard on laptop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT26wzZoO-YT14FmWNmKP3_CsJLCuUycuVbS_v5tXEgriFYw6r7TdKU0Pkl_zsGsAlkuk4ZgVElBG3zzV_7cJApe7Jw9e8kF1GxohsLMfNGAhQCMDlLSZEycy1ZJ99bCmDf06K2NdSIRtj5Ydu_wOtF-cE9prYSfmhIqpcbUYr_9uwwmb-huk83n_sABqMbsPGnW1ShLYnQVyHTUQwvLv1KFCoFKpAnAvYJOo2ELy9_fS1PTe7UrPg9Y8XvMUDsqDhUG7ZdgY1hOEP" />
              </div>
              <div className="p-xl flex-grow flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-secondary mb-md">trending_up</span>
                  <h3 className="font-headline-md text-[24px] font-bold tracking-tight mb-md text-on-background">SEO Optimization</h3>
                  <p className="font-body-md text-on-surface-variant leading-relaxed mb-xl">Boost visibility with strategic SEO that brings qualified traffic. Our data-driven approach ensures your business ranks.</p>
                </div>
                <a className="text-sm font-bold uppercase tracking-wide text-secondary inline-flex items-center gap-xs group-hover:gap-sm transition-all cursor-pointer">
                  Explore SEO Services <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Cap 3: Cybersecurity */}
            <div
              className="group bg-primary text-on-primary rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => onNavigate('cybersecurity')}>
              <div className="aspect-[4/3] overflow-hidden relative">
                <img alt="Abstract cybersecurity tech visualization" className="w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9yqjb4n2fCL9UiAzTRKe_gLok9-as6IUzQpC89y3ilSgtqUTHu2tMrdM7hA7rKyd24CzeRHNNnxPSfJz0QUliRNfeiRN7UN6R_DQyluTTjlLmpw3ARwq9fp8EYD1CfDNls_AnROs5svRU7soMEMqwK2MmmokO6UC36izClKsaZu-wyIFDWR0odT9hBbTxztR6ADMak03uGbams-RX2KsV15NGlTEt151bfdohgGTd_EIGfkzOvRtSq7-tHh-JyvE9S-BntVdVWX_c" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
              </div>
              <div className="p-xl flex-grow flex flex-col justify-between relative z-10">
                <div>
                  <span className="material-symbols-outlined text-white mb-md">security</span>
                  <h3 className="font-headline-md text-[24px] font-bold tracking-tight mb-md text-white">Cybersecurity</h3>
                  <p className="font-body-md text-primary-fixed leading-relaxed mb-xl opacity-90">Protect digital assets with vulnerability assessments and monitoring. We provide peace of mind in a complex landscape.</p>
                </div>
                <a className="text-sm font-bold uppercase tracking-wide text-white inline-flex items-center gap-xs group-hover:gap-sm transition-all cursor-pointer">
                  Secure Your Business <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA / Contact - Dynamic Gradient Accent */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-reveal">
        <div className="max-w-[1700px] mx-auto">
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[40px] bg-gradient-to-r from-primary to-secondary px-6 py-10 sm:px-8 md:px-16 md:py-20 xl:px-20 xl:py-24 shadow-2xl">

            {/* Background Glow */}
            <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
              {/* Left Content */}
              <div className="max-w-2xl text-left">
                <h2 className="text-white font-hero-lg text-hero-lg mb-6 sm:mb-8 leading-[1.05]">
                  Ready to elevate your<br />digital presence?
                </h2>

                <p className="font-body-lg font-light text-white/95 leading-relaxed mb-8 sm:mb-10 text-base sm:text-lg">
                  We are committed to delivering personalized, high-quality digital services that help our clients compete effectively while staying within their budget.
                </p>

                <button className="w-full sm:w-auto bg-white text-primary px-8 h-14 sm:h-16 rounded-full font-bold text-base sm:text-lg tracking-wide shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 min-h-[52px]">
                  Contact Our Team
                </button>
              </div>

              {/* Glassmorphic Contact Card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-[24px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)] text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-6 sm:mb-8">
                  Contact Information
                </h3>

                <div className="border-t border-white/15 mb-6 sm:mb-8" />

                <div className="space-y-6 sm:space-y-8 text-white">
                  <div className="flex gap-4 items-start">
                    <span className="material-symbols-outlined text-white/80 mt-1">location_on</span>
                    <div>
                      <p className="text-base sm:text-lg md:text-xl font-medium">Phoenix, Arizona</p>
                      <p className="text-sm sm:text-base md:text-lg text-white/80 mt-1">Serving clients nationwide</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <span className="material-symbols-outlined text-white/80">call</span>
                    <p className="text-base sm:text-lg md:text-xl font-medium">+1 (480) 555-0199</p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <span className="material-symbols-outlined text-white/80">mail</span>
                    <p className="text-sm sm:text-base md:text-xl font-medium break-all">contact@nziconduit.com</p>
                  </div>

                  <div className="border-t border-white/15 pt-6 sm:pt-8 mt-6 sm:mt-8">
                    <div className="flex gap-4 items-center">
                      <span className="material-symbols-outlined text-white/80">schedule</span>
                      <p className="text-sm sm:text-base font-medium text-white/90">Mon - Fri: 9:00 AM - 6:00 PM MST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
