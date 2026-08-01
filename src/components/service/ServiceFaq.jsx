import { useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function ServiceFaq({
  badgeText = "FAQ",
  title = "Frequently Asked Questions",
  subtitle = "Have questions before getting started? Here are answers to common questions about our technical services and delivery timeline.",
  faqs = [],
  onRequestAudit,
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full py-section-py bg-[#FAF7F2] border-t border-outline-variant/10">
      <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (40%): Title, Description & Direct Support Card */}
          <div className="lg:col-span-5 text-left space-y-6 lg:sticky lg:top-24">
            <Badge variant="primary">{badgeText}</Badge>

            <h2 className="font-hero-lg text-hero-lg text-on-surface leading-tight">{title}</h2>

            <p className="font-body-lg text-on-surface-variant text-base sm:text-lg leading-relaxed">
              {subtitle}
            </p>

            {/* Direct Contact Support Card */}
            <div className="p-6 rounded-2xl bg-card text-card-foreground border border-outline-variant/20 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div>
                  <h4 className="font-headline text-base font-bold text-on-surface">Have a specific question?</h4>
                  <p className="font-body text-xs text-on-surface-variant">Speak directly with a senior engineer.</p>
                </div>
              </div>
              <div className="text-xs font-label text-on-surface-variant/80 flex items-center gap-2 pt-1 border-t border-outline-variant/10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Response SLA: Guaranteed &lt; 24 Hours</span>
              </div>
              {onRequestAudit && (
                <Button size="sm" variant="outline" onClick={onRequestAudit} icon="chat" className="w-full">
                  Ask an Engineer
                </Button>
              )}
            </div>
          </div>

          {/* Right Column (60%): Interactive Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="group bg-card text-card-foreground rounded-2xl border border-outline-variant/20 overflow-hidden shadow-xs hover:border-primary/40 hover:shadow-md transition-[transform,box-shadow,border-color] duration-200 ease-out text-left"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full text-left p-5 sm:p-6 font-headline text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`material-symbols-outlined text-primary text-[20px] transition-transform duration-200 group-hover:scale-115 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 font-body text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
