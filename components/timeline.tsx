"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

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
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>([]);

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    refs.current[index] = el;
  };

  return (
    <section className="py-0 lg:py-8 bg-[#f7f4ef] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top rule */}
        <div
          ref={headerRef}
          className={`h-px bg-neutral-300 mb-16 transition-all duration-1000 ${
            headerInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        {/* Header */}
        <div
          className={`mb-20 transition-all duration-700 ${
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Results Timeline
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Happens
              <br />
              <em className="italic text-orange-700">Day by Day?</em>
            </h2>
            <p
              className="text-neutral-500 text-base max-w-sm lg:text-right leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Real results don't happen overnight. Consistent daily intake
              supports your body step by step.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Center vertical line — desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-300 -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-0">
            {timelineData.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  data-index={i}
                  ref={(el) => setRef(el, i)}
                  className="relative lg:grid lg:grid-cols-2 lg:gap-0 lg:mb-0 mb-4"
                  style={{ marginBottom: i < timelineData.length - 1 ? "3rem" : 0 }}
                >
                  {/* Dot on the center line */}
                  <div
                    className="hidden lg:flex absolute left-1/2 top-10 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-neutral-400 bg-[#f7f4ef] z-10 items-center justify-center"
                    style={{ borderColor: item.accent }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                  </div>

                  {/* Left slot */}
                  <div className={`${isLeft ? "lg:pr-16" : "lg:pr-16 lg:invisible"}`}>
                    {isLeft && (
                      <div
                        className={`bg-[#f7f4ef] border border-neutral-200 p-10 transition-all duration-700 ${
                          visible[i]
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-10"
                        }`}
                      >
                        <CardContent item={item} />
                      </div>
                    )}
                  </div>

                  {/* Right slot */}
                  <div className={`${!isLeft ? "lg:pl-16" : "lg:pl-16 lg:invisible"}`}>
                    {!isLeft && (
                      <div
                        className={`bg-[#f7f4ef] border border-neutral-200 p-10 transition-all duration-700 ${
                          visible[i]
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-10"
                        }`}
                      >
                        <CardContent item={item} />
                      </div>
                    )}
                  </div>

                  {/* Mobile card (shown instead of grid on small screens) */}
                  <div
                    className={`lg:hidden border border-neutral-200 p-8 transition-all duration-700 ${
                      visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  >
                    <CardContent item={item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

function CardContent({ item }: { item: typeof timelineData[0] }) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between mb-8">
          <span
            className="text-xs font-semibold tracking-widest text-neutral-400 uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {item.number}
          </span>
          <div
            className="w-2 h-2 rounded-full mt-1"
            style={{ backgroundColor: item.accent }}
          />
        </div>

        <p
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {item.label}
        </p>

        <p
          className="text-2xl font-bold mb-1"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: item.accent,
          }}
        >
          {item.time}
        </p>

        <h3
          className="text-xl font-bold text-neutral-900 leading-tight mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {item.title}
        </h3>
      </div>

      <div>
        <div className="h-px bg-neutral-200 mb-5" />
        <p
          className="text-sm text-neutral-500 leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
}