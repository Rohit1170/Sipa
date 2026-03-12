"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";

const faqs = [
  {
    number: "01",
    q: "Is this safe for daily use?",
    a: "Yes, this is a daily maintenance dose specifically designed for long-term daily use. It meets all safety standards and can be taken without prescription.",
  },
  // {
  //   number: "02",
  //   q: "Is this vegan?",
  //   a: "Our Vitamin D3 is sourced from lichen (VitaShine® D3), making it a 100% vegan product suitable for all dietary preferences.",
  // },
  {
    number: "02",
    q: "Does it contain sugar or chemicals?",
    a: "No added sugar. No artificial additives. We use only natural ingredients and excipients that are safe for daily consumption.",
  },
  // {
  //   number: "04",
  //   q: "When should I take it?",
  //   a: "Take one sachet after your morning meal with food containing fat for optimal absorption. This ensures better bioavailability and maximum benefit.",
  // },
];

export default function FAQ() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="py-0 lg:py-8 bg-[#f7f4ef] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top rule */}
        <div
          className={`h-px bg-neutral-300 mb-8 transition-all duration-1000 ${
            inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        {/* Header */}
        <div
          className={`mb-8 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            FAQ
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Good Questions
              <br />
              <em className="italic text-orange-700">Deserve Answers.</em>
            </h2>
            <p
              className="text-neutral-500 text-base max-w-sm lg:text-right leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Everything you need to know about
              SIPA Nutrition before you begin.
            </p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="divide-y divide-neutral-200 border-t border-neutral-200">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-8 py-8 text-left group"
                >
                  <div className="flex items-start gap-6">
                    <span
                      className="text-xs font-semibold tracking-widest text-neutral-400 uppercase pt-1 flex-shrink-0"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {faq.number}
                    </span>
                    <h3
                      className="text-xl font-bold text-neutral-900 group-hover:text-orange-700 transition-colors duration-200"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {faq.q}
                    </h3>
                  </div>

                  {/* Plus / Minus */}
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className="w-6 h-6 relative flex items-center justify-center"
                      style={{ color: isOpen ? "#c2410c" : "#a3a3a3" }}
                    >
                      <span
                        className="absolute w-4 h-px bg-current transition-all duration-300"
                      />
                      <span
                        className={`absolute w-px h-4 bg-current transition-all duration-300 ${
                          isOpen ? "opacity-0 rotate-90" : "opacity-100"
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? "max-h-48 pb-8" : "max-h-0"
                  }`}
                >
                  <p
                    className="text-neutral-500 leading-relaxed pl-12"
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
    </section>
  );
}