"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const images = [
    "/prod3.png",
    "/prod2.jpeg",
    "/prod1.jpeg",
    "/prod4.jpeg",
    "/prod5.jpeg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // ✅ REMOVED: fetch("/api/warmup") — was triggering a cold-start on every page load,
    // inflating TTFB. Use a Vercel cron job to keep functions warm instead.
    setIsLoaded(true);
  }, []);

  return (
    <>
      <section className="pt-16 py-0 lg:py-8 px-0 sm:px-6 relative min-h-screen flex flex-col bg-[#f7f4ef] overflow-hidden">
        {/* Top bar */}
        <div
          className={`flex items-center justify-between px-6 sm:px-10 pt-8 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold whitespace-nowrap"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Daily Vitamin D3 + K2
          </p>
          <div className="h-px bg-neutral-300 flex-1 mx-6" />
          <p
            className="text-xs uppercase tracking-[0.3em] text-neutral-400"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Est. 2026
          </p>
        </div>

        {/* Brand name */}
        <div
          className={`px-6 sm:px-8 pt-4 pb-2 transition-all duration-1000 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1
            className="text-[10vw] sm:text-[6vw] lg:text-[6vw] font-bold text-neutral-900 leading-[0.9] uppercase tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            SIPA
            <em className="italic text-orange-700 ml-4 sm:ml-6">Nutrition</em>
          </h1>
        </div>

        {/* Hairline rule */}
        <div
          className={`mx-6 sm:mx-10 h-px bg-neutral-300 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full py-8">
            {/* ── DESKTOP layout ── */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-20 items-center">
              {/* Desktop LEFT */}
              <div
                className={`transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <p
                  className="text-3xl sm:text-4xl font-bold text-neutral-700 leading-snug mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Let's Get{" "}
                  <em className="italic text-orange-700">Better Together.</em>
                </p>
                <p
                  className="text-base text-neutral-500 max-w-md leading-relaxed mb-8"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  A vegan daily maintenance formula engineered for optimal
                  absorption, modern lifestyles, and lasting wellness.
                </p>
                <div className="h-px bg-neutral-300 mb-8 max-w-md" />
                <div className="flex flex-wrap items-center gap-8 mb-10">
                  <div>
                    {/* Price Row */}
                    <div className="flex items-end gap-3">
                      {/* Old Price */}
                      <p
                        className="text-2xl text-neutral-400 line-through"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        ₹599
                      </p>

                      {/* New Price */}
                      <p
                        className="text-5xl font-bold text-[#C4541A]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        ₹359
                      </p>

                      {/* Badge */}
                      <span className="bg-[#C4541A]/10 text-[#C4541A] text-xs font-semibold px-2 py-1 rounded-md">
                        40% OFF
                      </span>
                    </div>

                    {/* Sub text */}
                    <p
                      className="text-xs uppercase tracking-widest text-neutral-600 mt-2"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Special Launch Offer • ≈ ₹12/day
                    </p>
                  </div>
                  <div
                    className="flex flex-col gap-1.5 text-sm text-neutral-500"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 inline-block" />
                      Clinically dosed
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-700 inline-block" />
                      100% Vegan
                    </span>
                  </div>
                </div>

                {/* CTA — Desktop */}
                <button
                  onClick={() => router.push("/productOverview")}
                  className="group relative overflow-hidden flex items-center gap-2.5 px-8 py-[15px] rounded-[10px] border-[1.5px] border-[#1a1a1a] hover:border-[#c2410c] text-[#1a1a1a] hover:text-white bg-transparent transition-colors duration-[400ms] cursor-pointer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {/* Orange fill sweeps left to right */}
                  <span className="absolute inset-0 bg-[#c2410c] -translate-x-full group-hover:translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)]" />

                  <span className="relative z-10">Pre-book Now</span>

                  <svg
                    className="relative z-10 w-3.5 h-3.5 stroke-current group-hover:translate-x-1 transition-transform duration-300"
                    viewBox="0 0 14 14"
                    fill="none"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </button>
              </div>

              {/* Desktop RIGHT — image */}
              {/* ✅ CHANGED: <img> → next/image <Image> with priority prop */}
              {/* priority adds <link rel="preload"> in <head>, directly fixing LCP */}
              <div
                className={`transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="relative max-w-md mx-auto">
                  <div
                    className="absolute -inset-4 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at 60% 40%, rgba(194,65,12,0.08) 0%, transparent 70%)",
                    }}
                  />
                  <div className="absolute top-6 right-6 w-32 h-32 rounded-full border border-neutral-200 opacity-60" />
                  <div className="absolute bottom-10 left-4 w-16 h-16 rounded-full border border-orange-200 opacity-80" />
                  <div className="hidden md:block relative rounded-2xl overflow-hidden group">
                    <div className="relative rounded-2xl overflow-hidden">
                      <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                          transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                      >
                        {images.map((img, i) => (
                          <div
                            key={i}
                            className="min-w-full rounded-xl overflow-hidden"
                          >
                            <Image
                              src={img}
                              alt={`Product ${i}`}
                              width={600}
                              height={700}
                              priority={i === 0}
                              quality={80}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`absolute -top-4 -right-4 bg-orange-700 text-white px-4 py-2 shadow-sm transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    <p
                      className="text-xs uppercase tracking-widest"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      30 Sachets
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── MOBILE layout ── */}
            <div className="flex flex-col gap-8 lg:hidden">
              {/* 1. Description */}
              <div
                className={`transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <p
                  className="text-2xl font-bold text-neutral-700 leading-snug mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Let's Get{" "}
                  <em className="italic text-orange-700">Better Together.</em>
                </p>
                <p
                  className="text-sm text-neutral-500 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  A vegan daily maintenance formula engineered for optimal
                  absorption, modern lifestyles, and lasting wellness.
                </p>
              </div>

              {/* 2. Image */}

              <div
                className={`transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="relative max-w-sm mx-auto">
                  <div
                    className="absolute -inset-4 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at 60% 40%, rgba(194,65,12,0.08) 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative rounded-2xl overflow-hidden group">
                    <div className="relative rounded-2xl overflow-hidden">
                      <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                          transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                      >
                        {images.map((img, i) => (
                          <div
                            key={i}
                            className="min-w-full rounded-xl overflow-hidden"
                          >
                            <Image
                              src={img}
                              alt={`Product ${i}`}
                              width={600}
                              height={700}
                              priority={i === 0}
                              quality={80}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* subtle gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>
                  <div
                    className={`absolute -top-4 -right-4 bg-orange-700 text-white px-3 py-1.5 shadow-sm transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    <p
                      className="text-[10px] uppercase tracking-widest"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      30 Sachets
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Price + trust + CTA */}
              <div
                className={`transition-all duration-1000 delay-400 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="h-px bg-neutral-300 mb-6" />
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-end gap-3">
                    {/* Old Price */}
                    <p
                      className="text-2xl text-neutral-400 line-through"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ₹599
                    </p>
                    {/* New Price */}
                    <p
                      className="text-5xl font-bold text-[#C4541A]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ₹359
                    </p>
                    {/* Badge */}
                    <span className="bg-[#C4541A]/10 text-[#C4541A] text-xs font-semibold px-2 py-1 rounded-md">
                      40% OFF
                    </span>
                  </div>
                  <p
                    className="text-xs uppercase tracking-widest text-neutral-400 mt-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    ≈ ₹12/ day
                  </p>
                  <div
                    className="flex flex-col gap-1.5 text-sm text-neutral-500"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 inline-block" />
                      Clinically dosed
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-700 inline-block" />
                      100% Vegan
                    </span>
                  </div>
                </div>

                {/* CTA — Mobile */}
                <button
                  onClick={() => router.push("/productOverview")}
                  className="group relative overflow-hidden flex items-center mx-auto gap-2.5 px-8 py-[15px] rounded-[10px] border-[1.5px] border-[#1a1a1a] hover:border-[#c2410c] text-[#1a1a1a] hover:text-white bg-transparent transition-colors duration-[400ms] cursor-pointer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {/* Orange fill sweeps left to right */}
                  <span className="absolute inset-0 bg-[#c2410c] -translate-x-full group-hover:translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)]" />

                  <span className="relative z-10">Pre-book Now</span>

                  <svg
                    className="relative z-10 w-3.5 h-3.5 stroke-current group-hover:translate-x-1 transition-transform duration-300"
                    viewBox="0 0 14 14"
                    fill="none"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className={`flex items-center gap-6 px-6 sm:px-10 pb-6 transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-px bg-neutral-300 flex-1" />
          <p
            className="text-xs uppercase tracking-[0.3em] text-neutral-400"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Wellness Simplified
          </p>
          <div className="h-px bg-neutral-300 flex-1" />
        </div>
      </section>
    </>
  );
}
