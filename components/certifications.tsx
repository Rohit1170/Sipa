"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

const certLogos = [
  { src: "/iso.png", alt: "ISO 9001 Certified" },
  { src: "/gmp.png", alt: "WHO GMP Certified" },
  { src: "/FDA.png", alt: "FDA Registered" },
  { src: "/vitt.png", alt: "VitaShine D3 Trademark" },
  { src: "/fssai.png", alt: "FSSAI Certified" },
];

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#f7f4ef] overflow-hidden">
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
          className={`mb-16 transition-all duration-700 ${
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
        {/* Infinite logo slider */}
<div
  className={`relative mb-12 transition-all duration-700 delay-200 ${
    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`}
>
  {/* Fade edges */}
  <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
    style={{ background: "linear-gradient(to right, #f7f4ef, transparent)" }} />
  <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
    style={{ background: "linear-gradient(to left, #f7f4ef, transparent)" }} />

  <style>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-33.333%); }
    }
    .marquee-track {
      animation: marquee 20s linear infinite;
    }
  `}</style>

  <div className="overflow-hidden border-y border-neutral-200 py-8">
    <div className="marquee-track flex items-center gap-12 w-max">
  {[...certLogos, ...certLogos, ...certLogos].map((logo, i) => (
    <div key={i} className="flex items-center gap-12 flex-shrink-0">
      <div className="flex items-center justify-center h-14 w-32 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        <img
          src={logo.src}
          alt={logo.alt}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="w-2 h-2 rounded-full bg-gray-500 flex-shrink-0" />
    </div>
  ))}
</div>
  </div>
</div>
        {/* GMP Card */}
        {/* <div
          className={`bg-[#f7f4ef] border border-neutral-200 p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8 transition-all duration-700 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Certification
            </p>
            <h3
              className="text-4xl font-bold text-neutral-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              GMP Certified
            </h3>
          </div>

          <div className="h-px sm:h-16 sm:w-px bg-neutral-200 flex-shrink-0" />

          <p
            className="text-sm text-neutral-500 leading-relaxed max-w-md"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Good Manufacturing Practice certified facility — every batch
            produced under strict quality control protocols for your safety.
          </p>

          <div className="flex-shrink-0">
            <div
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "#166534" }}
            >
              <div className="w-2 h-2 rounded-full bg-[#166534]" />
            </div>
          </div>
        </div> */}

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