"use client";

import { useInView } from "react-intersection-observer";

export default function Packaging() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      number: "01",
      label: "Sachet Weight",
      value: "1g",
      description: "Precisely measured for optimal daily intake — no guesswork, no mess.",
      accent: "#c2410c",
    },
    {
      number: "02",
      label: "Per Box",
      value: "30 Sachets",
      description: "One box covers an entire month of consistent, daily wellness.",
      accent: "#166534",
    },
    {
      number: "03",
      label: "Daily Ritual",
      value: "1 Sachet",
      description: "One sachet, one day. Effortless portion control built right in.",
      accent: "#c2410c",
    },
  ];

  return (
    <section ref={ref} className="py-16 lg:py-18 bg-[#f7f4ef] overflow-hidden">
      {/* Top rule */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`h-px bg-neutral-300 mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        {/* Header */}
        <div
          className={`mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Packaging
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Designed for
              <br />
              <em className="italic text-orange-700">Daily Life</em>
            </h2>
            <p
              className="text-neutral-500 text-base max-w-sm lg:text-right leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Every detail of our packaging is engineered around your routine —
              clean, precise, and built for consistency.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-300">
          {features.map((f, i) => (
            <div
              key={i}
              className={`bg-[#f7f4ef] p-10 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div className="flex items-start justify-between mb-8">
                <span
                  className="text-xs font-semibold tracking-widest text-neutral-400 uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {f.number}
                </span>
                <div
                  className="w-2 h-2 rounded-full mt-1"
                  style={{ backgroundColor: f.accent }}
                />
              </div>

              <p
                className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {f.label}
              </p>

              <p
                className="text-5xl font-bold text-neutral-900 mb-6 leading-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: f.accent,
                }}
              >
                {f.value}
              </p>

              <div className="h-px bg-neutral-200 mb-6" />

              <p
                className="text-sm text-neutral-500 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div
          className={`mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-700 delay-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="h-px bg-neutral-300 flex-1" />
          <p
            className="text-xs uppercase tracking-[0.3em] text-neutral-400 px-6 whitespace-nowrap"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Simple · Precise · Consistent
          </p>
          <div className="h-px bg-neutral-300 flex-1" />
        </div>
      </div>
    </section>
  );
}