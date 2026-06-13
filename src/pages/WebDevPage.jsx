

export default function WebDevPage({ onNavigate }) {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-xxxl pb-section-py bg-grid-subtle">
        <div className="max-w-container-max mx-auto px-lg grid grid-cols-1 lg:grid-cols-2 gap-xl items-center relative z-10">
          <div className="space-y-lg">
            <div className="inline-flex items-center gap-sm bg-primary-fixed text-on-primary-fixed px-md py-xs rounded-full font-label text-label">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              Professional Solutions for Creators
            </div>
            <h1 className="font-hero-lg text-hero-lg text-on-surface leading-tight tracking-tight">
              Professional Web Development for <span className="text-primary">Artists, Creators</span> & Entrepreneurs
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-l">
              Your creative vision deserves a digital presence that captures attention and converts visitors into customers with high-performance engineering.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-md pt-md">
              <button className="w-full sm:w-auto bg-primary text-on-primary px-xxl py-md rounded-full font-label text-label hover:shadow-lg transition-all min-h-[52px]">Get Started</button>
              <button className="w-full sm:w-auto border-2 border-primary text-primary px-xxl py-md rounded-full font-label text-label hover:bg-primary-fixed transition-all min-h-[52px]">View Our Work</button>
            </div>
          </div>
          <div className="relative lg:h-[540px]">
            <div className="h-full rounded-lg overflow-hidden shadow-2xl bento-card border border-outline-variant bg-surface-container">
              <img alt="Professional workspace with laptop" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-xl -left-xl w-64 h-64 bg-primary-container/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-xl -right-xl w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Why Professional Section (Bento Style) */}
      <section className="bg-surface-container-low py-section-py">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="text-center mb-xxl">
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-md">Why Your Business Needs a Professional Website</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              In today's digital world, your website is often the first impression potential customers have of your work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {/* Bento Item 1 */}
            <div className="md:col-span-2 bg-surface-container-lowest p-xxl rounded-lg bento-card border border-outline-variant/30 flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="material-symbols-outlined text-primary text-5xl mb-md">verified_user</span>
                <h3 className="font-headline-md text-headline-md mb-md">Build Instant Credibility</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-l">
                  A professional website serves as your 24/7 sales representative, showcasing your authority and dedication to quality before you even say hello.
                </p>
              </div>
              <div className="mt-xl flex items-center gap-md">
                <div className="h-1.5 flex-1 bg-surface-variant rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary"></div>
                </div>
                <span className="font-label text-label text-primary">High Impact</span>
              </div>
            </div>

            {/* Bento Item 2 */}
            <div className="bg-primary text-on-primary p-xxl rounded-lg bento-card flex flex-col justify-center text-center">
              <h4 className="font-hero-lg text-hero-lg mb-xs">24/7</h4>
              <p className="font-label text-label uppercase tracking-widest opacity-80">Sales Representative</p>
              <p className="font-body-sm text-body-sm mt-md">Your brand never sleeps. We ensure it's always ready to convert.</p>
            </div>

            {/* Bento Item 3 */}
            <div className="bg-surface-container-lowest p-xxl rounded-lg bento-card border border-outline-variant/30 min-h-[300px]">
              <span className="material-symbols-outlined text-secondary text-5xl mb-md">conversion_path</span>
              <h3 className="font-headline-md text-headline-md mb-md">Capture Leads</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Providing a seamless experience that turns curious visitors into loyal, paying customers with optimized conversion paths.
              </p>
            </div>

            {/* Bento Item 4 */}
            <div className="md:col-span-2 bg-surface-container-lowest p-xxl rounded-lg bento-card border border-outline-variant/30 relative overflow-hidden group min-h-[300px]">
              <div className="relative z-10 h-full flex flex-col justify-center">
                <h3 className="font-headline-md text-headline-md mb-md">Optimized Performance</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-l">
                  Every millisecond counts. We build for speed, ensuring your portfolio or store loads instantly on any device, anywhere.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 pointer-events-none opacity-15 group-hover:opacity-30 transition-opacity">
                <span
                  className="material-symbols-outlined text-[220px] md:text-[300px] xl:text-[380px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}>
                  speed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-section-py">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-xl mb-xxl">
            <div className="max-w-2xl">
              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-md">Our Web Development Services</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                We specialize in building custom websites that showcase your unique brand while delivering high-end functionality.
              </p>
            </div>
            <button className="font-label text-label text-primary flex items-center gap-xs hover:gap-md transition-all mb-2">
              View All Services <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {/* Service 1 */}
            <div className="p-xl rounded-lg border border-outline-variant hover:border-primary hover:shadow-lg transition-all bg-surface group">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center mb-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-2xl">web</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-sm">Custom Website Design</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Unique, visually stunning websites that reflect your brand personality and captivate your target audience.
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-xl rounded-lg border border-outline-variant hover:border-primary hover:shadow-lg transition-all bg-surface group">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center mb-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-sm">E-commerce Solutions</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Sell your art, products, or services online with secure, user-friendly shopping experiences that maximize conversions.
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-xl rounded-lg border border-outline-variant hover:border-primary hover:shadow-lg transition-all bg-surface group">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center mb-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-2xl">photo_library</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-sm">Portfolio Websites</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Showcase your creative work with elegant galleries, smooth navigation, and optimized loading times.
              </p>
            </div>

            {/* Service 4 */}
            <div className="p-xl rounded-lg border border-outline-variant hover:border-primary hover:shadow-lg transition-all bg-surface group">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center mb-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-2xl">settings_suggest</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-sm">CMS Integration</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Update your website easily with intuitive CMS solutions that put you in total control of your content.
              </p>
            </div>

            {/* Service 5 */}
            <div className="p-xl rounded-lg border border-outline-variant hover:border-primary hover:shadow-lg transition-all bg-surface group">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center mb-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-2xl">search_check</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-sm">SEO Foundation</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We build SEO best practices into every website, helping you get discovered by the right audience.
              </p>
            </div>

            {/* Service 6 */}
            <div className="p-xl rounded-lg border border-outline-variant hover:border-primary hover:shadow-lg transition-all bg-surface group">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center mb-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-2xl">bolt</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-sm">Performance Optimization</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Fast-loading, reliable websites that provide excellent user experiences and rank well in search.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narratives & Image Section */}
      <section className="py-section-py bg-surface-container overflow-hidden">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xxl items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl bento-card border border-outline-variant">
                <img alt="Digital creator in studio" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1698512191563-d14881d80fd8?q=80&w=2374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </div>
              <div className="absolute -bottom-10 -right-6 bg-surface p-md rounded-lg shadow-lg max-w-l bento-card border border-outline-variant hidden sm:block">
                <p className="font-label text-label text-primary mb-xs">Trusted Partner</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">"NZI Conduit transformed our digital presence from a basic page to a high-converting portfolio."</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-xl">
              <h2 className="font-headline-xl text-headline-xl text-on-surface">Perfect for Creative Professionals & Small Businesses</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                We understand the unique challenges facing artists, creators, and entrepreneurs. You need a website that's both beautiful and functional, professional yet affordable.
              </p>
              <ul className="space-y-lg">
                <li className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Beautiful and functional design focused specifically on your business goals.</span>
                </li>
                <li className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Complex enough to grow with your brand, simple enough to manage daily.</span>
                </li>
                <li className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Comprehensive SEO and enterprise-grade security features included by default.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-section-py">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="text-center mb-xxl">
            <h2 className="font-headline-xl text-headline-xl text-on-surface">From Concept to Launch</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Our collaborative approach ensures your website truly represents your vision while incorporating technical excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-lg relative">
            {/* Connector line (Desktop) */}
            <div className="hidden md:block absolute top-16 left-0 w-full h-[2px] bg-surface-variant -z-10"></div>

            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-32 h-32 rounded-full bg-surface-container-lowest border-4 border-surface shadow-md mx-auto flex items-center justify-center mb-lg group-hover:border-primary transition-all duration-300">
                <span className="font-hero-lg text-hero-lg text-primary text-5xl">01</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs">Concept</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Discovery & strategy</p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-32 h-32 rounded-full bg-surface-container-lowest border-4 border-surface shadow-md mx-auto flex items-center justify-center mb-lg group-hover:border-primary transition-all duration-300">
                <span className="font-hero-lg text-hero-lg text-primary text-5xl">02</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs">Design</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Visual prototyping</p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-32 h-32 rounded-full bg-surface-container-lowest border-4 border-surface shadow-md mx-auto flex items-center justify-center mb-lg group-hover:border-primary transition-all duration-300">
                <span className="font-hero-lg text-hero-lg text-primary text-5xl">03</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs">Development</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Coding & integration</p>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="w-32 h-32 rounded-full bg-surface-container-lowest border-4 border-surface shadow-md mx-auto flex items-center justify-center mb-lg group-hover:border-primary transition-all duration-300">
                <span className="font-hero-lg text-hero-lg text-primary text-5xl">04</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs">Launch</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Deployment & training</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-section-py">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="bg-primary-container text-on-primary-container rounded-lg p-xxl relative overflow-hidden flex flex-col items-center text-center">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <h2 className="font-hero-lg text-hero-lg mb-lg relative z-10 max-w-4xl">Ready to Build Your Digital Presence?</h2>
            <p className="font-body-lg text-body-lg mb-xxl max-w-2xl relative z-10 opacity-95">
              Contact us today for a free consultation and let's discuss how a custom website can help your creative business reach its full potential.
            </p>
            <button className="w-full sm:w-auto bg-surface-container-lowest text-primary px-xxxl py-md rounded-full font-label text-label hover:shadow-xl hover:scale-105 transition-all relative z-10 active:scale-95 text-lg min-h-[52px]">Contact Us Today</button>
          </div>
        </div>
      </section>
    </main>);

}