"use client";

import { useInView } from "react-intersection-observer";

const points = [
  {
    number: "01",
    label: "Clinical Backing",
    title: "Doctor Recommended",
    desc: "Daily D3 + K2 supplementation is commonly recommended by doctors as a maintenance dose for overall health and wellness.",
    accent: "#c2410c",
  },
  {
    number: "02",
    label: "Accessibility",
    title: "No Prescription Required",
    desc: "Can be taken without medical prescription as a daily maintenance supplement for long-term health support.",
    accent: "#166534",
  },
  {
    number: "03",
    label: "Modern Lifestyle",
    title: "Built for Today",
    desc: "Perfect for individuals with indoor lifestyles, limited sun exposure, or long working hours who need consistent D3 + K2 support.",
    accent: "#c2410c",
  },
];

export default function DoctorAdvice() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-4 lg:py-8 bg-[#f7f4ef] overflow-hidden">
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
            Medical Guidance
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Trusted by
              <br />
              <em className="italic text-orange-700">Professionals.</em>
            </h2>
            <p
              className="text-neutral-500 text-base max-w-sm lg:text-right leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Formulated to meet daily maintenance standards —
              safe, accessible, and clinically sound.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-300">
          {points.map((p, i) => (
            <div
              key={i}
              className={`bg-[#f7f4ef] p-10 flex flex-col justify-between min-h-[280px] transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div>
                <div className="flex items-start justify-between mb-8">
                  <span
                    className="text-xs font-semibold tracking-widest text-neutral-400 uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {p.number}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full mt-1"
                    style={{ backgroundColor: p.accent }}
                  />
                </div>

                <p
                  className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {p.label}
                </p>

                <h3
                  className="text-2xl font-bold text-neutral-900 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {p.title}
                </h3>
              </div>

              <div>
                <div className="h-px bg-neutral-200 mb-5" />
                <p
                  className="text-sm text-neutral-500 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}