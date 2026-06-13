

export default function SeoPage({ onNavigate }) {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden py-24">
        <div className="absolute inset-0 z-0"></div>
        <div className="max-w-container-max mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#e3e7fc] text-[#2f3bc2] font-label text-xs tracking-[0.1em] uppercase font-semibold">Search Engine Optimization</span>
            <h1 className="font-headline-xl text-[56px] md:text-[72px] font-extrabold leading-[1.1] text-on-surface">
              Boost Your <br /><span className="text-[#2f3bc2]">Digital Presence</span>
            </h1>
            <p className="text-on-surface-variant text-[18px] md:text-[20px] max-w-l leading-relaxed">
              Is your website getting lost in the crowded digital landscape? Our comprehensive SEO services help businesses like yours climb to the top of search results and connect with customers actively looking for you.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
              <a
                className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 group cursor-pointer min-h-[52px]"
                onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}>
                
                Start Free Audit
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
              <a
                className="w-full sm:w-auto border border-outline-variant text-on-surface px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-surface-container-low transition-all cursor-pointer flex items-center justify-center min-h-[52px]"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                
                View Services
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                alt="Search engine analytics dashboard"
                className="w-full h-auto object-cover"
                src="/images/services_seo_1781285884168.png" />
              
            </div>
          </div>
        </div>
      </section>

      {/* What is SEO & Stats */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 bg-surface p-12 rounded-xl border border-surface-container-high">
              <h2 className="font-headline-xl text-[36px] font-bold text-on-surface">What is SEO and Why Does It Matter?</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Search Engine Optimization (SEO) is the art and science of making your website more attractive to search engines like Google. When done correctly, SEO helps your business appear higher in search results, driving more qualified traffic to your site and ultimately increasing your revenue.
              </p>
              <div className="flex items-center gap-4 text-primary font-bold">
                <span className="text-5xl">75%</span>
                <span className="text-on-surface-variant font-medium">of users never scroll past the first page of search results.</span>
              </div>
            </div>
            <div className="lg:col-span-5 bg-primary p-12 rounded-xl text-on-primary flex flex-col justify-between shadow-lg">
              <div>
                <span className="material-symbols-outlined text-[64px] mb-6">insights</span>
                <h3 className="text-2xl font-bold mb-4 leading-tight">If your business isn't ranking on page one, you're missing out.</h3>
              </div>
              <p className="text-on-primary-container opacity-90">
                We bridge the gap between your brand and your potential customers by ensuring you're visible exactly when they are searching for solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-24" id="services">
        <div className="max-w-container-max mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-headline-xl text-[48px] font-extrabold text-on-surface mb-4">Our SEO Services Include</h2>
            <p className="text-on-surface-variant text-lg">A multi-faceted approach to dominating the search engine result pages.</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Keyword Research */}
            <div className="col-span-12 md:col-span-8 rounded-2xl bg-surface-container border border-surface-container-highest p-10 hover:shadow-xl group transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-primary-container text-3xl">key</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-on-surface mb-2">Keyword Research & Strategy</h3>
                  <p className="text-on-surface-variant text-lg">We identify the terms your customers are actually searching for and develop a targeted approach to capture that traffic.</p>
                </div>
              </div>
            </div>

            {/* On-Page */}
            <div className="col-span-12 md:col-span-4 rounded-2xl bg-surface border border-surface-container-highest p-10 hover:shadow-xl hover:-translate-y-1 transition-all group duration-300">
              <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-on-secondary-container text-3xl">pageview</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">On-Page Optimization</h3>
              <p className="text-on-surface-variant">From title tags to structure, we optimize every element for search engine visibility.</p>
            </div>

            {/* Technical SEO */}
            <div className="col-span-12 md:col-span-4 rounded-2xl bg-inverse-surface text-inverse-on-surface p-10 hover:shadow-2xl group transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-tertiary-container flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-on-tertiary-container text-3xl">code</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Technical SEO</h3>
              <p className="opacity-80">We ensure lightning-fast loads, seamless mobile experiences, and technical perfection for Google.</p>
            </div>

            {/* Content Development */}
            <div className="col-span-12 md:col-span-8 rounded-2xl bg-surface-container-highest p-10 flex flex-col md:flex-row justify-between items-center group relative overflow-hidden transition-all duration-300">
              <div className="z-10 pr-6">
                <h3 className="text-2xl font-bold text-on-surface mb-2">Content Development</h3>
                <p className="text-on-surface-variant text-lg">Valuable, engaging content that attracts visitors and establishes your industry authority.</p>
              </div>
              <div className="shrink-0 mt-6 md:mt-0 opacity-20 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[120px] text-primary">edit_note</span>
              </div>
            </div>

            {/* Link Building */}
            <div className="col-span-12 md:col-span-6 rounded-2xl bg-primary-fixed p-10 hover:shadow-xl group transition-all duration-300">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-primary text-3xl">link</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-on-primary-fixed-variant mb-2">Link Building</h3>
                  <p className="text-on-surface-variant">High-quality backlinks that boost your website's credibility and search rankings significantly.</p>
                </div>
              </div>
            </div>

            {/* Performance Tracking */}
            <div className="col-span-12 md:col-span-6 rounded-2xl bg-secondary-fixed p-10 hover:shadow-xl group transition-all duration-300">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary text-3xl">query_stats</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-on-secondary-fixed-variant mb-2">Performance Tracking</h3>
                  <p className="text-on-surface-variant">Regular reports showing exactly how your SEO investment pays off with leads and sales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Info */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-6 flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="font-headline-xl text-[28px] sm:text-[36px] font-bold text-on-surface mb-6">Ready to Get Started?</h2>
            <p className="text-on-surface-variant text-base sm:text-lg mb-8 leading-relaxed">
              SEO is a long-term investment that delivers lasting results. While some tactics can show improvements in weeks, the most significant gains typically occur over 3-6 months as search engines recognize your website's growing authority and relevance.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 py-3 px-4 rounded-full bg-surface-container border border-surface-container-high">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-sm font-bold shrink-0">1</span>
                <span className="text-on-surface font-medium text-sm md:text-base">Month 1: Technical Audit & Foundation</span>
              </div>
              <div className="flex items-center gap-4 py-3 px-4 rounded-full bg-surface-container border border-surface-container-high">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-sm font-bold shrink-0">2</span>
                <span className="text-on-surface font-medium text-sm md:text-base">Month 2-3: Content Strategy & On-Page SEO</span>
              </div>
              <div className="flex items-center gap-4 py-3 px-4 rounded-full bg-surface-container border border-surface-container-high">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-sm font-bold shrink-0">3</span>
                <span className="text-on-surface font-medium text-sm md:text-base">Month 4+: Authority Building & Scale</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="bg-[#2f3bc2] p-8 sm:p-12 rounded-[2rem] text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6">Don't let your competitors dominate search.</h3>
              <p className="text-lg sm:text-xl opacity-90 mb-8 leading-relaxed">
                Contact us today for a free SEO consultation and discover how we can help your business thrive online.
              </p>
              <button className="w-full sm:w-auto bg-white text-[#2f3bc2] px-8 py-4 rounded-full font-bold hover:scale-105 transition-all min-h-[52px]">Schedule Consultation</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" id="audit">
        <div className="absolute inset-0 z-0"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="bg-surface-bright border border-primary/20 shadow-2xl p-8 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[3rem]">
            <h2 className="font-headline-xl text-[30px] sm:text-[48px] font-extrabold text-on-surface mb-6">Get Your Free SEO Audit Today</h2>
            <p className="text-on-surface-variant text-base sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto">
              We'll analyze your current website performance and show you exactly what opportunities exist to improve your search rankings.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch justify-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input className="flex-grow px-5 sm:px-6 py-4 rounded-full border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[52px]" placeholder="Your work email" type="email" />
              <button className="w-full sm:w-auto bg-primary text-on-primary px-6 sm:px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-lg transition-all active:scale-95 min-h-[52px]" type="submit">
                Run Audit
              </button>
            </form>
            <p className="mt-6 text-body-sm text-on-surface-variant opacity-70 italic">No credit card required. Instant report delivered to your inbox.</p>
          </div>
        </div>
      </section>
    </main>);

}