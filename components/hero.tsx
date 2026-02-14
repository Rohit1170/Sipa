"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => setIsLoaded(true), []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f7f4ef]">
      {/* Background glow orbs */}
      {/* <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-green-300/30 rounded-full blur-3xl" /> */}

   <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
  {/* LEFT: Text */}
  <div
    className={`transition-all duration-1000 ${
      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`}
  >
    {/* Badge */}
    <span className="inline-block mb-4 rounded-full bg-orange-100 text-orange-700 px-4 py-1 text-sm font-semibold">
      Wellness Simplified
    </span>

    {/* Heading */}
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
      SIPA <span className="text-orange-600">Nutrition</span>
    </h1>

    {/* Product Name */}
    <p className="mt-6 text-xl sm:text-2xl font-semibold text-yellow-700">
      Daily Vitamin D3 + K2 Sachets
    </p>

    {/* Subtext */}
    <p className="mt-4 text-lg text-muted-foreground max-w-xl italic">
      Vegan daily maintenance formula designed for better absorption, modern lifestyles, and long-term wellness.
    </p>
    
    <p className="mt-4 text-base font-semibold text-orange-600 tracking-wide animate-pulse">
      Let’s Get Better Together.
    </p>

    {/* Price + CTA */}
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <Button disabled className="rounded-full px-8 py-6 text-lg font-semibold shadow-md">
        Only ₹599
      </Button>

      <div className="flex flex-col text-sm text-muted-foreground leading-tight">
        <span>No prescription required</span>
        <span className="text-xs">≈ ₹19.9/day</span>
      </div>
    </div>

    {/* Trust Line */}
    <div className="mt-5 text-sm font-medium text-gray-600">
      ✔ Clinically dosed&nbsp;&nbsp;|&nbsp;&nbsp;✔ Vegan&nbsp;&nbsp;|&nbsp;&nbsp;✔ Highly absorbable
    </div>
  </div>



        {/* RIGHT: Product */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] bg-background">
            <img
              src="/product.jpeg"
              alt="SIPA Nutrition Vitamin D3 K2 Sachets"
              className="w-full h-full object-contain   scale-105"
            />

            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white/90 px-8 py-4 rounded-full shadow-lg">
                <p className="text-2xl font-bold text-orange-600 tracking-wide">
                  MRP 599
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
