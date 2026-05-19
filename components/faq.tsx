"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const sections = [
  {
    id: "product-use",
    label: "Product Use",
    faqs: [
      {
        number: "01",
        q: "Is this safe for daily use?",
        a: "Yes, this is a daily maintenance dose specifically designed for long-term daily use. It meets all safety standards and can be taken without prescription.",
      },
      {
        number: "02",
        q: "When is the best time to take it?",
        a: "For best absorption, take it with or after your morning meal along with fat-soluble foods.",
      },
    ],
  },
  {
    id: "refund",
    label: "Refund",
    faqs: [
      {
        number: "01",
        q: "Can I return or exchange my product?",
        a: "We do not accept returns or exchanges under any circumstances. Refunds are only issued for visibly damaged, unusable products upon delivery.",
      },
      {
        number: "02",
        q: "How do I claim a damaged or missing item?",
        a: "Contact us within 48 hours of delivery at hello@sipanutrition.com or WhatsApp +91 96617 44207. You'll need your Order ID, photos of the package, and an unboxing video recorded from the sealed package without cuts.",
      },
      {
        number: "03",
        q: "How long does a refund take?",
        a: "Approved refunds are processed within 5–7 business days to your original payment method. COD orders are refunded via bank transfer or UPI.",
      },
    ],
  },
];

export default function FAQ() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openMap, setOpenMap] = useState<Record<string, number | null>>({
    "product-use": 0,
    refund: null,
  });
  const [activeSection, setActiveSection] = useState("product-use");
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleFaq = (sectionId: string, index: number) => {
    setOpenMap((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === index ? null : index,
    }));
  };

  const scrollToSection = (id: string) => {
    const container = scrollRef.current;
    const target = sectionRefs.current[id];
    if (container && target) {
      container.scrollTo({
        top: target.offsetTop - container.offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;

      // Find which section's top edge is closest to (but still above)
      // the top of the scroll container — that's the active one.
      // We also handle the end-of-scroll case by checking which section
      // is the last one whose top edge has passed the container midpoint.
      let best = sections[0].id;

      for (const s of sections) {
        const el = sectionRefs.current[s.id];
        if (!el) continue;
        const elTop = el.getBoundingClientRect().top - containerTop;
        // Section is considered "active" as soon as its top crosses
        // the upper 40% of the visible container area
        if (elTop <= containerRect.height * 0.4) {
          best = s.id;
        }
      }

      setActiveSection(best);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="faq"
      ref={ref}
      className="py-0 lg:py-8 bg-[#f7f4ef] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">

        {/* Top rule */}
        <div
          className={`h-px bg-neutral-300 mb-8 transition-all duration-1000 ${
            inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        {/* Header */}
        <div
          className={`mb-10 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Knowledge Base
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Inquiry &amp; Insight.
            </h2>
            <div className="lg:text-right">
              <p
                className="text-neutral-500 text-base max-w-sm leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Transparency is the core of our ritual. Explore the science,
                logistics, and daily application of SIPA Nutrition.
              </p>
              <p
                className="text-xs italic text-neutral-400 mt-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Updated Quarterly
              </p>
            </div>
          </div>
        </div>

        {/* Layout: sidebar + scrollable content */}
        <div
          className={`flex gap-10 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Sticky sidebar nav */}
          <div className="hidden lg:flex flex-col gap-1 w-36 flex-shrink-0 sticky top-8 self-start pt-1">
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className="flex items-center gap-3 py-2 text-left"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span
                    className="h-px flex-shrink-0 transition-all duration-300"
                    style={{
                      width: "24px",
                      background: isActive ? "#c2410c" : "#d4d4d4",
                    }}
                  />
                  <span
                    className="text-sm transition-colors duration-200"
                    style={{
                      color: isActive ? "#c2410c" : "#737373",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scrollable FAQ content */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto pr-1"
            style={{ maxHeight: "520px", scrollbarWidth: "none" }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {sections.map((section) => (
              <div
                key={section.id}
                ref={(el) => { sectionRefs.current[section.id] = el; }}
                className="mb-12"
              >
                <h3
                  className="text-2xl font-bold text-neutral-900 pb-4 border-b border-neutral-200 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {section.label}
                </h3>

                <div className="divide-y divide-neutral-200">
                  {section.faqs.map((faq, i) => {
                    const isOpen = openMap[section.id] === i;
                    return (
                      <div key={i}>
                        <button
                          onClick={() => toggleFaq(section.id, i)}
                          className="w-full flex items-start justify-between gap-8 py-6 text-left group"
                        >
                          <div className="flex items-start gap-5">
                            <span
                              className="text-xs font-semibold tracking-widest text-neutral-400 uppercase pt-1 flex-shrink-0"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              {faq.number}
                            </span>
                            <h4
                              className="text-lg font-bold text-neutral-900 group-hover:text-orange-700 transition-colors duration-200"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {faq.q}
                            </h4>
                          </div>

                          <div className="flex-shrink-0 mt-1">
                            <div
                              className="w-6 h-6 relative flex items-center justify-center"
                              style={{ color: isOpen ? "#c2410c" : "#a3a3a3" }}
                            >
                              <span className="absolute w-4 h-px bg-current transition-all duration-300" />
                              <span
                                className={`absolute w-px h-4 bg-current transition-all duration-300 ${
                                  isOpen ? "opacity-0 rotate-90" : "opacity-100"
                                }`}
                              />
                            </div>
                          </div>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-500 ${
                            isOpen ? "max-h-48 pb-6" : "max-h-0"
                          }`}
                        >
                          <p
                            className="text-neutral-500 leading-relaxed pl-10"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}