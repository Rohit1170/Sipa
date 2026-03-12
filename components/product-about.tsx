"use client";

import { useInView } from "react-intersection-observer";

const features = [
  {
    number: "01",
    label: "Source",
    title: "Vegan Vitamin D3",
    description: "Sourced from lichen via VitaShine® — the purest plant-based D3 available.",
    accent: "#c2410c",
  },
  {
    number: "02",
    label: "Bioavailability",
    title: "Enhanced Absorption",
    description: "Vitamin K2 works synergistically to maximise calcium uptake and utilisation.",
    accent: "#166534",
  },
  {
    number: "03",
    label: "Clinical Backing",
    title: "Doctor Recommended",
    description: "A daily maintenance dose — clinically safe without requiring a prescription.",
    accent: "#c2410c",
  },
  {
    number: "04",
    label: "Formulation",
    title: "Natural Orange Flavour",
    description: "No added sugar. No artificial additives. Just clean, natural taste.",
    accent: "#166534",
  },
  {
    number: "05",
    label: "Format",
    title: "Easy to Carry",
    description: "Slim 1g sachets designed to fit seamlessly into any daily routine.",
    accent: "#c2410c",
  },
  {
    number: "06",
    label: "Usage",
    title: "Long-Term Safe",
    description: "Formulated for sustained daily maintenance — consistent results over time.",
    accent: "#166534",
  },
];

export default function ProductAbout() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" ref={ref} className="py-0 lg:py-8 bg-[#f7f4ef] overflow-hidden">
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
            About the Product
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Everyday Health,
              <br />
              <em className="italic text-orange-700">Expertly Designed</em>
            </h2>
            <p
              className="text-neutral-500 text-base max-w-sm lg:text-right leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              A complete nutritional solution built for daily wellness —
              every ingredient chosen with purpose and precision.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-300">
          {features.map((f, i) => (
            <div
              key={i}
              className={`bg-[#f7f4ef] p-10 flex flex-col justify-between min-h-[260px] transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div>
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

                <h3
                  className="text-2xl font-bold text-neutral-900 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {f.title}
                </h3>
              </div>

              <div>
                <div className="h-px bg-neutral-200 mb-5" />
                <p
                  className="text-sm text-neutral-500 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {f.description}
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
            Vegan · Clinically Backed · Additive-Free
          </p>
          <div className="h-px bg-neutral-300 flex-1" />
        </div> */}

      </div>
    </section>
  );
}