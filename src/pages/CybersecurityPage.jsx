

export default function CybersecurityPage({ onNavigate }) {
  return (
    <main>
      {/* Split-Screen Hero Section */}
      <section className="min-h-[85vh] flex items-center relative overflow-hidden">
        <div className="flex flex-col md:flex-row w-full min-h-[85vh]">

          {/* Left Side: Value Prop */}
          <div className="w-full md:w-1/2 flex items-center px-4 sm:px-lg py-16 sm:py-xxl bg-white">
            <div className="max-w-[600px] mx-auto md:ml-auto space-y-md sm:space-y-xl md:pr-xl">
              <div className="inline-flex items-center gap-xs px-sm py-xs bg-primary/10 text-primary rounded-full font-label text-xs uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[16px]">security</span>
                <span>Enterprise-Grade Protection</span>
              </div>
              <h1 className="font-display font-extrabold text-gray-900 leading-tight" style={{ fontSize: 'clamp(28px, 6vw, 60px)', lineHeight: 1.15 }}>
                Protect Your Business with Professional Cybersecurity Services
              </h1>
              <p className="font-body text-base sm:text-lg text-gray-600 leading-relaxed">
                In today's digital world, your website is often the first impression potential customers have of your work. A professional website doesn't just look good—it works hard for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-md pt-md">
                <button className="w-full sm:w-auto bg-[#002ba3] text-white font-bold tracking-wide px-6 py-4 rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[52px]">
                  Get Started Today
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                <button className="w-full sm:w-auto border border-gray-300 text-gray-700 font-bold tracking-wide px-6 py-4 rounded-full hover:bg-gray-50 transition-all min-h-[52px]">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Visual */}
          <div className="w-full md:w-1/2 bg-[#f4f4f4] relative flex items-center justify-center overflow-hidden min-h-[50vw] sm:min-h-[60vh] md:min-h-[85vh] py-12 md:py-0">

            {/* Background Concentric Rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
              <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] border border-blue-300 rounded-[45%] translate-x-4 rotate-12"></div>
              <div className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] border border-blue-200 rounded-full -translate-x-8 -translate-y-4"></div>
              <div className="absolute w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] border border-blue-200 rounded-[48%] translate-x-12 translate-y-8 -rotate-12"></div>
            </div>

            {/* Center Elements Wrapper */}
            <div className="relative flex items-center justify-center z-10">

              {/* Main Dark Blue Shield Block */}
              <div className="relative bg-[#002ba3] w-40 h-52 sm:w-56 sm:h-72 rounded-[32px] shadow-[0_20px_50px_rgba(0,43,163,0.3)] flex items-center justify-center z-10 transition-transform hover:scale-105 duration-300">
                <span
                  className="material-symbols-outlined text-white text-[70px] sm:text-[100px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield
                </span>
              </div>

              {/* Floating Cards — hidden on very small screens, shown on sm+ */}
              <div className="absolute top-2 sm:top-8 -right-2 sm:right-[-10%] lg:right-[-30%] bg-white p-3 sm:p-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white flex items-center gap-3 sm:gap-4 z-20 w-40 sm:w-64 hidden sm:flex">
                <div className="text-[#002ba3] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl sm:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_good</span>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Shield Status</p>
                  <p className="text-base sm:text-xl font-bold text-gray-900 leading-none">24/7 Security</p>
                </div>
              </div>

              <div className="absolute bottom-2 sm:bottom-8 -left-2 sm:left-[-10%] lg:left-[-30%] bg-white p-3 sm:p-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white flex items-center gap-3 sm:gap-4 z-20 w-40 sm:w-64 hidden sm:flex">
                <div className="text-[#002ba3] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl sm:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>bar_chart</span>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Analysis</p>
                  <p className="text-base sm:text-xl font-bold text-gray-900 leading-none">Risk Audits</p>
                </div>
              </div>

            </div>

            {/* Mobile-only compact stats row */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 sm:hidden px-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow flex items-center gap-2">
                <span className="material-symbols-outlined text-[#002ba3] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_good</span>
                <span className="text-xs font-bold text-gray-900">24/7 Security</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-xl shadow flex items-center gap-2">
                <span className="material-symbols-outlined text-[#002ba3] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bar_chart</span>
                <span className="text-xs font-bold text-gray-900">Risk Audits</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Timeline Flow: Why Cybersecurity Matters */}
      <section className="py-section-py bg-surface-container-lowest">
        <div className="max-w-3xl mx-auto px-lg">
          <div className="text-center mb-xxxl">
            <h2 className="font-display text-4xl font-bold text-on-surface mb-md">Why Cybersecurity Matters for Your Business</h2>
            <p className="font-body text-lg text-on-surface-variant">Every day, small businesses fall victim to ransomware, data breaches, and phishing attacks.</p>
          </div>
          <div className="relative space-y-xxl">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/50 -translate-x-1/2 hidden md:block"></div>

            {/* Item 1 */}
            <div className="relative flex flex-col md:flex-row items-center gap-xl">
              <div className="md:w-1/2 md:text-right">
                <div className="bg-error-container text-on-error-container p-xl rounded-xl shadow-sm inline-block">
                  <h3 className="text-4xl font-extrabold mb-xs">60%</h3>
                  <p className="font-bold">Failure Rate</p>
                </div>
              </div>
              <div className="relative z-10 w-12 h-12 bg-error rounded-full items-center justify-center text-white ring-8 ring-white hidden md:flex">
                <span className="material-symbols-outlined text-lg">priority_high</span>
              </div>
              <div className="md:w-1/2">
                <p className="font-body text-on-surface-variant">of small businesses that experience a cyberattack go out of business within six months. A single security incident can shut down operations for days.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center gap-xl">
              <div className="md:w-1/2 md:text-left">
                <div className="bg-surface-container-high p-xl rounded-xl shadow-sm inline-block">
                  <span className="material-symbols-outlined text-primary text-4xl mb-sm">bug_report</span>
                  <h3 className="text-xl font-bold text-on-surface">Constant Threats</h3>
                </div>
              </div>
              <div className="relative z-10 w-12 h-12 bg-primary rounded-full items-center justify-center text-white ring-8 ring-white hidden md:flex">
                <span className="material-symbols-outlined text-lg">history</span>
              </div>
              <div className="md:w-1/2 md:text-right">
                <p className="font-body text-on-surface-variant">Ransomware, data breaches, and phishing attacks are evolving daily, targeting vulnerabilities in small business infrastructure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop Split Section */}
      <section className="py-section-py bg-surface border-y border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-lg grid md:grid-cols-2 gap-xxxl items-center">
          <div className="order-2 md:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary to-secondary p-xxl flex items-center justify-center">
                <div className="text-center text-on-primary">
                  <span className="material-symbols-outlined text-[80px] mb-md opacity-50">hub</span>
                  <div className="bg-white/10 backdrop-blur-md p-lg rounded-xl">
                    <p className="font-bold text-xl">Enterprise-Level Security</p>
                    <p className="text-sm opacity-80">Small Business Budget</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-lg">
            <h2 className="font-display text-4xl font-bold text-on-surface leading-tight">Enterprise-Level Security, Small Business Budget</h2>
            <p className="font-body text-lg text-on-surface-variant">
              We believe every business deserves robust cybersecurity protection, regardless of size. Our services are specifically designed for individual entrepreneurs and small businesses.
            </p>
            <ul className="space-y-md">
              <li className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <span className="font-semibold">Tailored strategies for your unique risks</span>
              </li>
              <li className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <span className="font-semibold">Technologies used by Fortune 500 companies</span>
              </li>
              <li className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <span className="font-semibold">No one-size-fits-all solutions</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3-Column Service Hub Grid */}
      <section className="py-section-py bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="text-center max-w-2xl mx-auto mb-xxxl">
            <h2 className="font-display text-4xl font-bold text-on-surface mb-md">What We Offer</h2>
            <p className="font-body text-lg text-on-surface-variant">Comprehensive protection tailored to your specific needs and budget.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-xl">
            {/* Card 1 */}
            <div className="bg-surface p-xl rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">search_check</span>
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-sm">Risk Assessment & Security Audits</h3>
              <p className="text-on-surface-variant leading-relaxed">Identify vulnerabilities before attackers do with our deep-dive infrastructure analysis.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-surface p-xl rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">mail_lock</span>
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-sm">Email Security & Anti-Phishing</h3>
              <p className="text-on-surface-variant leading-relaxed">Stop threats at the most common entry point with advanced filtering and training.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-surface p-xl rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">cloud_sync</span>
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-sm">Backup & Recovery Solutions</h3>
              <p className="text-on-surface-variant leading-relaxed">Ensure your data is safe and recoverable in any event with automated cloud backups.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-surface p-xl rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-sm">Employee Security Training</h3>
              <p className="text-on-surface-variant leading-relaxed">Turn your team into your first line of defense through immersive security awareness.</p>
            </div>

            {/* Card 5 */}
            <div className="bg-surface p-xl rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">monitoring</span>
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-sm">24/7 Monitoring & Incident Response</h3>
              <p className="text-on-surface-variant leading-relaxed">Professional oversight when you need it most, ensuring rapid detection and containment.</p>
            </div>

            {/* Card 6 */}
            <div className="bg-surface p-xl rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">fact_check</span>
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-sm">Compliance Support</h3>
              <p className="text-on-surface-variant leading-relaxed">Meet industry requirements and customer expectations with professional compliance mapping.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive CTA Section */}
      <section className="py-xxxl bg-inverse-surface text-inverse-on-surface relative overflow-hidden">
        {/* Subtle texture background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/10 blur-[120px] rounded-full"></div>

        <div className="max-w-container-max mx-auto px-lg relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-xl">
            <span className="inline-block py-1 px-4 bg-white/10 rounded-full text-sm font-bold tracking-widest uppercase">Start Your Protection</span>
            <h2 className="font-display text-5xl md:text-6xl font-extrabold leading-tight">Get Started Today</h2>
            <p className="font-body text-xl opacity-80 leading-relaxed">
              Don't wait until it's too late. Cybercriminals are constantly evolving their tactics, and the best defense is a proactive one. Contact us for a free consultation.
            </p>
            <div className="flex justify-center pt-md">
              <button className="bg-primary-container text-on-primary font-bold px-xxxl py-xl rounded-full hover:shadow-[0_0_40px_rgba(29,78,216,0.5)] transition-all flex items-center gap-md text-lg group">
                Claim Free Consultation
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>);

}         