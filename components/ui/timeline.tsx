"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-[#f7f4ef] font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-6xl mx-auto pb-20">

        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-12 md:pt-36 md:gap-10"
          >
            {/* LEFT COLUMN */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs md:w-full">

              {/* DOT */}
              <div className="h-10 absolute left-3 w-10 rounded-full bg-white flex items-center justify-center shadow-md">
                <div className="h-4 w-4 rounded-full bg-orange-400 border-2 border-orange-200" />
              </div>

              {/* DESKTOP TITLE */}
              <h3 className="hidden md:block text-3xl md:pl-20 font-bold text-orange-500">
                {item.title}
              </h3>
            </div>

            {/* RIGHT CONTENT */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">

              {/* MOBILE TITLE */}
              <h3 className="md:hidden block text-2xl mb-4 font-bold text-orange-500">
                {item.title}
              </h3>

              <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 hover:shadow-md transition">
                {item.content}
              </div>
            </div>
          </div>
        ))}

        {/* PROGRESS LINE */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 overflow-hidden w-[3px]
          bg-gradient-to-b from-transparent via-orange-200 to-transparent
          [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px]
            bg-gradient-to-b from-orange-500 via-orange-400 to-transparent
            rounded-full"
          />
        </div>

      </div>
    </div>
  );
};
