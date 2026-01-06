"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => setIsLoaded(true), []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background glow orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-green-300/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT: Text */}
        <div
          className={`transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block mb-4 rounded-full bg-orange-100 text-orange-700 px-4 py-1 text-sm font-semibold">
            Launching Soon
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            SIPA <span className="text-orange-600">Nutrition</span>
          </h1>

          <p className="mt-6 text-xl sm:text-2xl font-semibold text-yellow-700">
            India’s First Daily Vitamin D3 + K2 Sachets
          </p>

          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Vegan-based daily maintenance dose designed for long-term wellness,
            modern lifestyles, and better absorption.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button disabled className="rounded-full px-8 py-6 text-lg">
              Coming Soon
            </Button>
            <span className="text-sm text-muted-foreground self-center">
              No prescription required
            </span>
          </div>
        </div>

        {/* RIGHT: Product */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] bg-gradient-to-br from-orange-100 to-green-100">
            <img
              src="/product.jpeg"
              alt="SIPA Nutrition Vitamin D3 K2 Sachets"
              className="w-full h-full object-contain  blur-sm scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white/90 px-8 py-4 rounded-full shadow-lg">
                <p className="text-2xl font-bold text-orange-600 tracking-wide">
                  Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
