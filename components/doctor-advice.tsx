"use client";

import { useInView } from "react-intersection-observer";

const ingredients = [
  {
    number: "01",
    label: "Active Compound",
    name: "Vitamin D3",
    amount: "600 IU",
    rda: "100% RDA",
    accent: "#c2410c",
    note: "Cholecalciferol — the most bioavailable form of D3.",
  },
  {
    number: "02",
    label: "Active Compound",
    name: "Vitamin K2",
    amount: "55 mcg",
    rda: "100% RDA",
    accent: "#166534",
    note: "MK-7 form — longest half-life for sustained activity.",
  },
  {
    number: "03",
    label: "Flavouring",
    name: "Natural Flavour",
    amount: "q.s.",
    rda: "Natural",
    accent: "#c2410c",
    note: "Derived from natural sources. No artificial additives.",
  },
  {
    number: "04",
    label: "Base",
    name: "Excipients",
    amount: "q.s.",
    rda: "GRAS",
    accent: "#166534",
    note: "Generally Recognised As Safe by global regulatory bodies.",
  },
];

const points = [
  {
    number: "01",
    label: "Clinical Backing",
    title: "Doctor Recommended",
    desc: "Daily D3 + K2 supplementation is widely recommended by doctors as a maintenance dose for health and wellness.",
    accent: "#c2410c",
  },
  {
    number: "02",
    label: "Modern Lifestyle",
    title: "Built for Today",
    desc: "Perfect for individuals with indoor lifestyles, limited sun exposure, or long working hours who need consistent D3 + K2 support.",
    accent: "#c2410c",
  },
];

export default function IngredientsAndAdvice() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="ingredients"
      ref={ref}
      className="py-0 lg:py-8 bg-[#f7f4ef] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top rule */}
        <div
          className={`h-px bg-neutral-300 mb-8 transition-all duration-1000 ${
            inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-neutral-300">

          {/* LEFT — Ingredients */}
          <div className="bg-[#f7f4ef]">
            {/* Header */}
            <div
              className={`px-10 pt-10 pb-6 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p
                className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Ingredients
              </p>
              <h2
                className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-[1.05]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Nothing Hidden,
                <br />
                <em className="italic text-orange-700">Nothing Extra</em>
              </h2>
              <p
                className="text-neutral-500 text-sm mt-4 leading-relaxed max-w-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Pure, potent, and fully transparent. Every ingredient serves a
                purpose — nothing more, nothing less.
              </p>
            </div>

            {/* Ingredient rows */}
            <div className="divide-y divide-neutral-200">
              {ingredients.map((ing, i) => (
                <div
                  key={i}
                  className={`px-10 py-6 flex items-start gap-6 transition-all duration-700 ${
                    inView
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-6"
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  {/* Number + dot */}
                  <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
                    <span
                      className="text-xs font-semibold tracking-widest text-neutral-400 uppercase"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {ing.number}
                    </span>
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: ing.accent }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {ing.label}
                    </p>
                    <div className="flex items-baseline justify-between gap-4 flex-wrap">
                      <h3
                        className="text-lg font-bold text-neutral-900 mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {ing.name}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="text-lg font-bold"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            color: ing.accent,
                          }}
                        >
                          {ing.amount}
                        </span>
                        <span
                          className="text-xs uppercase tracking-widest px-2 py-0.5 border border-neutral-300 text-neutral-400 rounded-full"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {ing.rda}
                        </span>
                      </div>
                    </div>
                    <div className="h-px bg-neutral-200 mb-3" />
                    <p
                      className="text-sm text-neutral-500 mt-1 leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {ing.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Doctor Advice */}
          <div className="bg-[#f7f4ef]">
            {/* Header */}
            <div
              className={`px-10 pt-10 pb-6 transition-all duration-700 delay-150 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p
                className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Medical Guidance
              </p>
              <h2
                className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-[1.05]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Trusted by
                <br />
                <em className="italic text-orange-700">Professionals.</em>
              </h2>
              <p
                className="text-neutral-500 text-sm mt-4 leading-relaxed max-w-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Formulated to meet daily maintenance standards — safe,
                accessible, and clinically sound.
              </p>
            </div>

            {/* Point rows */}
            <div className="divide-y divide-neutral-200">
              {points.map((p, i) => (
                <div
                  key={i}
                  className={`px-10 py-6 flex items-start gap-6 transition-all duration-700 ${
                    inView
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-6"
                  }`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  {/* Number + dot */}
                  <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
                    <span
                      className="text-xs font-semibold tracking-widest text-neutral-400 uppercase"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {p.number}
                    </span>
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: p.accent }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {p.label}
                    </p>
                    <h3
                      className="text-lg font-bold text-neutral-900 mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {p.title}
                    </h3>
                    <div className="h-px bg-neutral-200 mb-3" />
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

        </div>
      </div>
    </section>
  );
}