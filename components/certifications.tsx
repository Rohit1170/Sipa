"use client";

import { useInView } from "react-intersection-observer";

const certLogos = [
  { src: "/iso.png", alt: "ISO 9001 Certified" },
  { src: "/GMP.png", alt: "WHO GMP Certified" },
  { src: "/fda.png", alt: "FDA Registered" },
  { src: "/vitt.png", alt: "VitaShine D3 Trademark" },
  { src: "/fssai.png", alt: "FSSAI Certified" },
];

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-0 lg:py-8 bg-[#f7f4ef] overflow-hidden">
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
            Quality & Trust
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Made to the
              <br />
              <em className="italic text-orange-700">Highest Standard.</em>
            </h2>
            <p
              className="text-neutral-500 text-base max-w-sm lg:text-right leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Manufactured at a third-party certified facility meeting
              the highest international safety standards.
            </p>
          </div>
        </div>

        {/* Infinite logo slider */}
        <div
          className={`relative mb-8 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #f7f4ef, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #f7f4ef, transparent)" }}
          />

          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-33.333%); }
            }
            .marquee-track {
              animation: marquee 22s linear infinite;
            }
          `}</style>

          {/* ↑ Bigger slider: taller py, larger gap */}
          <div className="overflow-hidden border-y border-neutral-200 py-10 sm:py-12">
            <div className="marquee-track flex items-center gap-16 sm:gap-20 w-max">
              {[...certLogos, ...certLogos, ...certLogos].map((logo, i) => (
                <div key={i} className="flex items-center gap-16 sm:gap-20 flex-shrink-0">

                  {/* Responsive logo container:
                      - Mobile : h-12 w-28  (48px tall, 112px wide)
                      - Tablet : h-16 w-36  (64px tall, 144px wide)
                      - Desktop: h-20 w-44  (80px tall, 176px wide)         */}
                  <div className="flex items-center justify-center h-12 w-28 sm:h-16 sm:w-36 lg:h-20 lg:w-44 flex-shrink-0">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className={`mt-8 flex gap-4 items-start transition-all duration-700 delay-400 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p
            className="text-xs uppercase tracking-[0.2em] text-neutral-400 pt-0.5 flex-shrink-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Disclaimer
          </p>
          <div className="w-px self-stretch bg-neutral-200 flex-shrink-0 mx-2" />
          <p
            className="text-xs text-neutral-400 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            This product is a health supplement and not intended to diagnose, treat, cure, or prevent any disease.
            Always consult with a healthcare professional before starting any new supplement regimen.
          </p>
        </div>

      </div>
    </section>
  );
}