"use client";

import { useInView } from "react-intersection-observer";

const steps = [
  {
    number: "01",
    label: "Quantity",
    title: "One Sachet Per Day",
    description: "Take exactly one 1g sachet daily — no more, no less.",
    accent: "#c2410c",
  },
  {
    number: "02",
    label: "Timing",
    title: "After Morning Meal",
    description: "Consume after your morning breakfast for best results.",
    accent: "#166534",
  },
  {
    number: "03",
    label: "Absorption",
    title: "With Fatty Food",
    description: "Take with fat-containing food to maximise absorption.",
    accent: "#c2410c",
  },
  {
    number: "04",
    label: "Duration",
    title: "Daily Maintenance",
    description: "Clinically safe for consistent, long-term daily use.",
    accent: "#166534",
  },
];

export default function Dosage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-0 lg:py-4 bg-[#f7f4ef] overflow-hidden">
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
            How to Consume
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A Simple
              <br />
              <em className="italic text-orange-700">Daily Ritual</em>
            </h2>
            <p
              className="text-neutral-500 text-base max-w-sm lg:text-right leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Four easy steps to build a consistent routine and unlock
              the full benefit of D3 + K2 every day.
            </p>
          </div>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-300">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`bg-[#f7f4ef] p-10 flex flex-col justify-between min-h-[280px] transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="text-xs font-semibold tracking-widest text-neutral-400 uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {s.number}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full mt-1"
                    style={{ backgroundColor: s.accent }}
                  />
                </div>

                <p
                  className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.label}
                </p>

                <h3
                  className="text-2xl font-bold text-neutral-900 mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.title}
                </h3>
              </div>

              <div>
                <div className="h-px bg-neutral-200 mb-6" />
                <p
                  className="text-sm text-neutral-500 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
}