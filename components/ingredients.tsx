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

export default function Ingredients() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="ingredients" ref={ref} className="py-18 lg:py-36 bg-[#f7f4ef] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top rule */}
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
            Ingredients
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nothing Hidden,
              <br />
              <em className="italic text-orange-700">Nothing Extra</em>
            </h2>
            <p
              className="text-neutral-500 text-base max-w-sm lg:text-right leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Pure, potent, and fully transparent. Every ingredient
              serves a purpose — nothing more, nothing less.
            </p>
          </div>
        </div>

        {/* Ingredient Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-300">
          {ingredients.map((ing, i) => (
            <div
              key={i}
              className={`bg-[#f7f4ef] p-10 flex flex-col justify-between min-h-[300px] transition-all duration-700 ${
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
                    {ing.number}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full mt-1"
                    style={{ backgroundColor: ing.accent }}
                  />
                </div>

                <p
                  className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {ing.label}
                </p>

                <h3
                  className="text-2xl font-bold text-neutral-900 leading-tight mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {ing.name}
                </h3>

                <p
                  className="text-3xl font-bold mt-3"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: ing.accent,
                  }}
                >
                  {ing.amount}
                </p>

                <span
                  className="inline-block mt-2 text-xs uppercase tracking-widest px-3 py-1 border border-neutral-300 text-neutral-400 rounded-full"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {ing.rda}
                </span>
              </div>

              <div>
                <div className="h-px bg-neutral-200 mb-5" />
                <p
                  className="text-sm text-neutral-500 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {ing.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        {/* <div
          className={`mt-16 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-700 delay-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="h-px bg-neutral-300 flex-1" />
          <p
            className="text-xs uppercase tracking-[0.3em] text-neutral-400 px-6 whitespace-nowrap"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Pure · Potent · Transparent
          </p>
          <div className="h-px bg-neutral-300 flex-1" />
        </div> */}

      </div>
    </section>
  );
}