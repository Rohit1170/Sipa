"use client";

import React from "react";

const benefits = [
  {
    title: "Stronger Bones",
    desc: "Supports calcium absorption and helps maintain bone density over time.",
    icon: "🦴",
  },
  {
    title: "Immunity Support",
    desc: "Vitamin D3 helps regulate immune responses for year-round wellness.",
    icon: "🛡️",
  },
  {
    title: "Heart Health",
    desc: "Vitamin K2 directs calcium to bones instead of arteries.",
    icon: "❤️",
  },
  {
    title: "Muscle Function",
    desc: "Helps maintain muscle strength and reduces fatigue.",
    icon: "💪",
  },
];

export default function BenefitSection() {
  return (
    <section className="py-24 bg-[#f7f4ef] from-white to-orange-50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-4">
          Benefits of Taking It Daily
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          Real wellness comes from consistency. Daily Vitamin D3 + K2 helps
          maintain optimal levels to support your body long-term.
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl bg-white shadow-sm border hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">{item.icon}</div>

              <h3 className="font-semibold text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="mt-16 text-orange-600 font-semibold text-lg tracking-wide">
          Let’s Get Better Together.
        </p>
      </div>
    </section>
  );
}
