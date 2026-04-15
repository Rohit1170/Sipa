"use client";

import { useInView } from "react-intersection-observer";

const benefits = [
  {
    number: "01",
    title: "Stronger Bones",
    desc: "Supports calcium absorption and helps maintain bone density over time.",
    accent: "#c2410c",
    stat: "Bone Density",
  },
  {
    number: "02",
    title: "Immunity Support",
    desc: "Vitamin D3 helps regulate immune responses for year-round wellness.",
    accent: "#166534",
    stat: "Immune Response",
  },
  {
    number: "03",
    title: "Heart Health",
    desc: "Vitamin K2 effectively directs calcium to bones instead of arteries.",
    accent: "#c2410c",
    stat: "Cardiovascular",
  },
  {
    number: "04",
    title: "Muscle Function",
    desc: "Helps maintain muscle strength and effectively reduces fatigue.",
    accent: "#166534",
    stat: "Muscle Strength",
  },
];

export default function BenefitSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="benefits"
      ref={ref}
      className="py-0 lg:py-8 bg-[#f7f4ef] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top rule */}
        <div
          className={`h-px bg-neutral-300 mb-6 transition-all duration-1000 ${
            inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        {/* Header */}
        <div
          className={`mb-4 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold mb-2">
            Daily Benefits
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]">
              Built for Your
              <br />
              <em className="italic text-orange-700">Body's Needs</em>
            </h2>

            <p className="text-neutral-500 text-base max-w-sm lg:text-right leading-relaxed">
              Real wellness comes from consistency. Daily D3 + K2 maintains
              optimal levels to support your body long-term.
            </p>
          </div>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-300">
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`bg-[#f7f4ef] p-10 flex flex-col min-h-[280px] transition-all duration-700 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div className="flex flex-col h-full">
                {/* Top content */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                      {b.number}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full mt-1"
                      style={{ backgroundColor: b.accent }}
                    />
                  </div>

                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2">
                    {b.stat}
                  </p>

                  <h3 className="text-2xl font-bold text-neutral-900 leading-tight min-h-[56px]">
                    {b.title}
                  </h3>
                </div>

                {/* Spacer (THIS is the key) */}
               <div className="flex-1" />

                {/* Bottom content (always aligned) */}
                <div>
                  
                 <div className="h-px bg-neutral-200 my-5" />
                 
                  <p className="text-sm text-neutral-500 leading-relaxed min-h-[72px] h-full">
                    {b.desc}
                  </p>
                </div>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
