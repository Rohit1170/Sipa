"use client";

import { useInView } from "react-intersection-observer";

const features = [
  {
    title: "Vegan Vitamin D3",
    description: "Lichen-derived via VitaShine®. No animal derivatives.",
    accent: "#c2410c",
  },
  {
    title: "Enhanced Absorption",
    description: "K2 directs calcium exactly where it belongs.",
    accent: "#166534",
  },
  {
    title: "Doctor Recommended",
    description: "Clinically dosed. No prescription needed.",
    accent: "#c2410c",
  },
  {
    title: "Easy to Carry",
    description: "1g slim sachets. Pocket-sized.",
    accent: "#c2410c",
  },
  {
    title: "Long-Term Safe",
    description: "Built for daily, long-term use.",
    accent: "#166534",
  },
];

export default function ProductAbout() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0, rootMargin: "0px 0px -50px 0px" });

  return (
    <>
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.13);
        }
      `}</style>

      <section
        id="about"
        ref={ref}
        className="pt-20 pb-16 lg:pt-28 lg:pb-24 bg-[#f7f4ef] relative"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full relative z-10">
          {/* Top rule */}
          <div
            className="h-px bg-neutral-600/20 mb-8"
          />

          {/* Header */}
          <div className="mb-8">
            <p
              className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              About the Product
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
                style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Everyday Health,
                <br />
                <em className="italic text-orange-700">Expertly Designed</em>
              </h2>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="glass-card p-5 lg:p-10 flex flex-col min-h-24 h-full">
                  <div>
                    <h3
                      className="text-2xl font-bold text-neutral-900 leading-tight"
                      style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
                    >
                      {f.title}
                    </h3>
                  </div>
                  <div
                    className="mb-5 mt-3"
                    style={{ height: "1px", background: "rgba(0,0,0,0.10)" }}
                  />
                  <div>
                    <p
                      className="text-sm text-neutral-600 leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {f.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}