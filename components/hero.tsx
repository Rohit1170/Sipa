"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale     = useTransform(scrollYProgress, [0, 1],    [1.0, 1.05]);
  const imageY         = useTransform(scrollYProgress, [0, 1],    ["0%", "-2%"]);
  const tintOpacity    = useTransform(scrollYProgress, [0, 0.85], [0, 0.45]);
  const contentY       = useTransform(scrollYProgress, [0, 0.5],  ["0%", "-22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0]);

  // ← NEW: corners go from 0 → 80px as user starts scrolling
  const borderRadius   = useTransform(scrollYProgress, [0, 0.3],  ["0px", "80px"]);

  return (
    <>
      <style>{`
        @keyframes hero-fade-in-down {
          from { opacity: 0; transform: translateY(-1rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-brand-in {
          from { opacity: 0; transform: translateY(1.5rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-expand-x {
          from { opacity: 0; transform: scaleX(0); }
          to   { opacity: 1; transform: scaleX(1); }
        }
        @keyframes hero-fade-in-up {
          from { opacity: 0; transform: translateY(2rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* ← changed: motion.section + removed rounded-b-[90px] + added style borderRadius */}
      <motion.section
        ref={containerRef}
        className="relative min-h-screen flex flex-col pt-16 overflow-hidden"
        style={{ borderRadius, backgroundColor: "#f7f4ef" }}
      >
        {/* ── PARALLAX BG IMAGE ── */}
        <motion.div
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={{ scale: imageScale, y: imageY, backgroundColor: "#f7f4ef" }}
        >
          <Image
            src={isMobile ? "/bg-mobile.png" : "/bg.png"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover bg-[#f7f4ef]"
            style={{ objectPosition: isMobile ? "calc(50% - 20px) center" : "center center" }}
          />
        </motion.div>

        {/* Static overlay — natural on left, darker toward right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, transparent 0%, rgba(15,10,5,0.35) 40%, rgba(15,10,5,0.68) 100%)",
          }}
        />

        {/* Scroll-driven dark tint */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-black"
          style={{ opacity: tintOpacity }}
        />

        {/* ── ALL HERO CONTENT ── */}
        <motion.div
          className="relative z-10 flex flex-col flex-1"
          style={{ y: contentY }}
        >
          {/* Top bar + Brand name — fade on scroll, no backdrop-filter here so opacity is safe */}
          <motion.div style={{ opacity: contentOpacity }}>
            {/* Top bar */}
            <div
              className="flex items-center px-5 sm:px-12 pt-7 gap-4"
              style={{ animation: "hero-fade-in-down 700ms ease 0ms both" }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.25em] text-orange-500 font-semibold whitespace-nowrap"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Daily Vitamin D3 + K2
              </p>
              <div className="h-px bg-white/20 flex-1" />
              <p
                className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-white/35"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Est. 2026
              </p>
            </div>

            {/* Brand name */}
            <div
              className="px-5 sm:px-12 pt-3 pb-2"
              style={{ animation: "hero-brand-in 1000ms ease 100ms both" }}
            >
              <h1
                className="font-bold text-white leading-[0.9] uppercase tracking-tight"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(2.4rem, 9vw, 5rem)",
                }}
              >
                SIPA
                <em className="italic text-orange-500 ml-3 sm:ml-6">Nutrition</em>
              </h1>
            </div>
          </motion.div>

          {/* Main content — glass card NOT inside an opacity-animated ancestor
              so backdrop-filter always blurs through to the real background */}
          <div className="flex-1 px-10 flex items-center">
            <div
              className="px-5 sm:px-10 w-full max-w-xl py-8 sm:py-10 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(52px)",
                WebkitBackdropFilter: "blur(52px)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {/* Card content fades independently — opacity on children, never on the card itself */}
              <motion.div style={{ opacity: contentOpacity }}>
                {/* Headline + description */}
                <div style={{ animation: "hero-fade-in-up 1000ms ease 300ms both" }}>
                  <p
                    className="font-bold text-white leading-snug mb-4"
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
                    }}
                  >
                    Let's Get{" "}
                    <em className="italic text-orange-500 whitespace-nowrap">Better Together.</em>
                  </p>
                  <p
                    className="text-sm text-white/60 max-w-xs sm:max-w-sm leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    A vegan daily maintenance formula engineered for optimal
                    absorption, modern lifestyles, and lasting wellness.
                  </p>
                </div>

                {/* Trust pills */}
                <div
                  className="flex items-center gap-3 mt-6 mb-8 flex-wrap"
                  style={{ animation: "hero-fade-in-up 1000ms ease 380ms both" }}
                >
                  {[
                    { color: "bg-orange-400", label: "Clinically dosed" },
                    { color: "bg-green-400",  label: "100% Vegan" },
                    { color: "bg-blue-300",   label: "30 Sachets" },
                  ].map(({ color, label }) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 text-[11px] text-white/55"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${color} inline-block shrink-0`} />
                      {label}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div
                  className="flex items-center gap-5 flex-wrap"
                  style={{ animation: "hero-fade-in-up 1000ms ease 460ms both" }}
                >
                  <Link
                    href="/productOverview"
                    className="group relative overflow-hidden flex items-center gap-2.5 px-7 py-3.5 rounded-[10px] border-[1.5px] border-white/70 hover:border-orange-400 text-white bg-transparent transition-colors duration-[400ms] cursor-pointer"
                    style={{
                      fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span className="absolute inset-0 bg-orange-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)]" />
                    <span className="relative z-10">Shop Now</span>
                    <svg
                      className="relative z-10 w-3 h-3 stroke-current group-hover:translate-x-1 transition-transform duration-300"
                      viewBox="0 0 14 14"
                      fill="none"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </Link>

                  <Link
                    href="/about"
                    className="text-white/45 hover:text-white text-[11px] uppercase tracking-[0.18em] underline underline-offset-4 transition-colors duration-200 cursor-pointer bg-transparent border-none"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Our Story
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom rule — fades on scroll */}
          <motion.div style={{ opacity: contentOpacity }}>
            <div
              className="flex items-center gap-6 px-5 sm:px-12 pb-5"
              style={{ animation: "hero-fade-in 1000ms ease 700ms both" }}
            >
              <div className="h-px bg-white/15 flex-1" />
              <p
                className="text-[9px] uppercase tracking-[0.3em] text-white/25"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Wellness Simplified
              </p>
              <div className="h-px bg-white/15 flex-1" />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}