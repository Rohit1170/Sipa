"use client";

import { useEffect, useRef, useState } from "react";

const timelineData = [
  {
    time: "Week 1",
    title: "Levels Start Restoring",
    desc: "Your body begins restoring Vitamin D levels and improving absorption efficiency.",
  },
  {
    time: "Month 1",
    title: "Immunity Support",
    desc: "Supports immune balance and muscle function with consistent intake.",
  },
  {
    time: "Month 3",
    title: "Stronger Foundation",
    desc: "Bone strength and calcium utilization improve gradually.",
  },
  {
    time: "Long Term",
    title: "Optimal Wellness",
    desc: "Maintains healthy vitamin levels and supports overall long-term wellness.",
  },
];

export default function Timeline() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>([]);

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
      { threshold: 0.3 },
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    refs.current[index] = el;
  };

  return (
    <section className="relative py-28 bg-[#f7f4ef] from-white to-orange-50 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-20 px-6">
        <h2 className="text-4xl font-bold mb-4">
          What Happens When You Take It Daily?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real results don’t happen overnight. Consistent daily intake supports
          your body step by step.
        </p>
      </div>
      {/* 
    
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-orange-200 -translate-x-1/2 hidden md:block" />

      <div className="max-w-6xl mx-auto px-6 space-y-24"> */}
      <div className="relative max-w-6xl mx-auto px-6 space-y-24 md:px-6 pl-16">
        {/* Timeline line */}
        <div
          className="absolute
  left-6 md:left-1/2
  top-0 bottom-0
  w-1 bg-orange-200
  md:-translate-x-1/2"
        />

        {timelineData.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              data-index={i}
              //   ref={el => (refs.current[i] = el)}
              ref={(el) => setRef(el, i)}
              className={`relative flex flex-col md:flex-row items-center ${
                isLeft ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Dot */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-orange-400 rounded-full shadow-md z-10" />

              {/* Card */}
              <div
                className={`
                w-full md:w-[45%] p-8 rounded-3xl bg-white shadow-md border
                transition-all duration-700
               ${
                 visible[i]
                   ? "opacity-100 translate-x-0"
                   : isLeft
                     ? "opacity-0 -translate-x-10"
                     : "opacity-0 translate-x-10"
               }

                ${isLeft ? "md:mr-auto" : "md:ml-auto"}
                `}
              >
                <span className="inline-block mb-4 text-sm font-semibold text-orange-600 bg-orange-100 px-4 py-1 rounded-full">
                  {item.time}
                </span>

                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <p className="text-center mt-24 text-lg font-semibold text-orange-600">
        Let’s Get Better Together.
      </p>
    </section>
  );
}
