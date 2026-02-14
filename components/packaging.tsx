"use client";

import { useInView } from "react-intersection-observer";

export default function Packaging() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 bg-[#f7f4ef]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
              Convenient Packaging
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
                  📦
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    1g Sachets
                  </h3>
                  <p className="text-muted-foreground">
                    Easy-to-carry individual sachets for daily convenience
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  📅
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    30 Sachets Per Box
                  </h3>
                  <p className="text-muted-foreground">
                    One box = one month of daily maintenance
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    One Sachet = One Day
                  </h3>
                  <p className="text-muted-foreground">
                    Perfect portion control for daily wellness
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden max-w-md mx-auto">
              <img
                src="/box.jpeg"
                alt="SIPA Nutrition Sachets Box Packaging"
                className="w-full h-auto object-contain "
              />
              {/* <div className="absolute inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center">
              <div className="bg-white/95  px-8 py-4 rounded-full">
                <p className="text-2xl font-bolds ">
                  Coming Soon
                </p>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
