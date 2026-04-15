"use client";

import { useEffect, useRef, useState } from "react";

const timelineData = [
  {
    number: "01",
    time: "Week 1",
    label: "Early Response",
    title: "Levels Start Restoring",
    desc: "Your body begins restoring Vitamin D levels and improving absorption efficiency.",
    accent: "#c2410c",
  },
  {
    number: "02",
    time: "Month 1",
    label: "Building Immunity",
    title: "Immunity Support",
    desc: "Supports immune balance and muscle function with consistent daily intake.",
    accent: "#166534",
  },
  {
    number: "03",
    time: "Month 3",
    label: "Structural Strength",
    title: "Stronger Foundation",
    desc: "Bone strength and calcium utilization improve gradually and measurably.",
    accent: "#c2410c",
  },
  {
    number: "04",
    time: "Long Term",
    label: "Sustained Wellness",
    title: "Optimal Wellness",
    desc: "Maintains healthy vitamin levels and supports overall long-term wellbeing.",
    accent: "#166534",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0–1 within current step

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;

      if (scrolled < 0 || scrolled > sectionHeight) return;

      const ratio = scrolled / sectionHeight; // 0 → 1 over the whole sticky section
      const stepRatio = ratio * timelineData.length;
      const index = Math.min(Math.floor(stepRatio), timelineData.length - 1);
      const stepProgress = stepRatio - index;

      setActiveIndex(index);
      setProgress(stepProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const item = timelineData[activeIndex];
  // Arc progress for the circular indicator: full circle = all steps done
  const totalProgress =
    (activeIndex + progress) / timelineData.length;
  const circumference = 2 * Math.PI * 38;
  const strokeDash = totalProgress * circumference;

  return (
    /* Outer scroll container — tall enough for 4 "scroll steps" */
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${timelineData.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen bg-[#f7f4ef] overflow-hidden flex flex-col">

        {/* ── Header ── */}
        <div className="border-b border-neutral-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
            <p
              className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Results Timeline
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What Happens
                <br />
                <em className="italic text-orange-700">Day by Day?</em>
              </h2>
              <p
                className="text-neutral-500 text-base max-w-sm sm:text-right leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Real results don't happen overnight. Consistent daily intake
                supports your body step by step.
              </p>
            </div>
          </div>
        </div>

        {/* ── Main content area ── */}
        <div className="flex-1 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row">

          {/* Left: Step dial + nav pills */}
          <div className="flex lg:flex-col items-center justify-between lg:justify-start lg:gap-8 py-6 lg:py-10 border-b lg:border-b-0 lg:border-r border-neutral-200 lg:w-52 shrink-0 lg:pr-8">
            {/* Circular progress dial */}
            <div className="relative w-24 h-24 shrink-0">
              <svg
                viewBox="0 0 88 88"
                className="w-full h-full -rotate-90"
                style={{ overflow: "visible" }}
              >
                {/* Track */}
                <circle
                  cx="44"
                  cy="44"
                  r="38"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                />
                {/* Progress arc */}
                <circle
                  cx="44"
                  cy="44"
                  r="38"
                  fill="none"
                  stroke={item.accent}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${strokeDash} ${circumference}`}
                  style={{ transition: "stroke-dasharray 0.4s ease, stroke 0.4s ease" }}
                />
              </svg>
              {/* Step number in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-2xl font-bold text-neutral-900 tabular-nums leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    transition: "color 0.4s ease",
                    color: item.accent,
                  }}
                >
                  {item.number}
                </span>
                <span
                  className="text-[9px] uppercase tracking-widest text-neutral-400 mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  of {String(timelineData.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Step nav pills */}
            <div className="flex lg:flex-col gap-2 lg:gap-3 mt-0 lg:mt-6">
              {timelineData.map((t, i) => (
                <button
                  key={i}
                  onClick={() => {
                    /* Scroll to the start of that step */
                    const section = sectionRef.current;
                    if (!section) return;
                    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
                    const sectionHeight = section.offsetHeight - window.innerHeight;
                    const target = sectionTop + (i / timelineData.length) * sectionHeight;
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 group text-left"
                  aria-label={`Go to step ${t.number}`}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0 transition-all duration-400"
                    style={{
                      backgroundColor: i === activeIndex ? t.accent : "#d1d5db",
                      transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
                    }}
                  />
                  <span
                    className="hidden lg:block text-xs transition-colors duration-300"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: i === activeIndex ? item.accent : "#9ca3af",
                      fontWeight: i === activeIndex ? 600 : 400,
                    }}
                  >
                    {t.time}
                  </span>
                </button>
              ))}
            </div>

            {/* Scroll hint */}
            <div
              className="hidden lg:flex items-center gap-2 mt-auto text-neutral-400"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none" className="shrink-0">
                <rect x="1" y="1" width="12" height="18" rx="6" stroke="#9ca3af" strokeWidth="1.5"/>
                <circle cx="7" cy="6" r="2" fill="#9ca3af">
                  <animate attributeName="cy" values="6;12;6" dur="1.8s" repeatCount="indefinite"/>
                </circle>
              </svg>
              <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            </div>
          </div>

          {/* Right: Animated content */}
          <div className="flex-1 relative overflow-hidden flex items-center">
            {timelineData.map((t, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col justify-center lg:pl-12"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translateY(0px)"
                      : i < activeIndex
                      ? "translateY(-40px)"
                      : "translateY(40px)",
                    transition: "opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* Label + accent bar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="h-px w-12 transition-colors duration-500"
                      style={{ backgroundColor: t.accent }}
                    />
                    <p
                      className="text-xs uppercase tracking-[0.3em] font-semibold"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: t.accent,
                      }}
                    >
                      {t.label}
                    </p>
                  </div>

                  {/* Time */}
                  <p
                    className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-none mb-3"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: t.accent,
                    }}
                  >
                    {t.time}
                  </p>

                  {/* Title */}
                  <h3
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-8"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t.title}
                  </h3>

                  {/* Divider */}
                  <div
                    className="h-px mb-8 max-w-md"
                    style={{ backgroundColor: "#e5e7eb" }}
                  />

                  {/* Description */}
                  <p
                    className="text-neutral-500 text-base sm:text-lg leading-relaxed max-w-md"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {t.desc}
                  </p>
                </div>
              );
            })}

            {/* Step progress bar — bottom of content area */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-200">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${totalProgress * 100}%`,
                  backgroundColor: item.accent,
                  transition: "width 0.3s ease, background-color 0.4s ease",
                }}
              />
            </div>
          </div>
          </div>{/* end max-w-6xl row */}
        </div>{/* end flex-1 content area */}
      </div>{/* end sticky */}
    </div>
  );
}