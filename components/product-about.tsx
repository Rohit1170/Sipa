"use client"

import { useInView } from "react-intersection-observer"

export default function ProductAbout() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const features = [
    {
      icon: "🌱",
      title: "Vegan Vitamin D3",
      description: "Sourced from lichen (VitaShine® D3)",
    },
    {
      icon: "💪",
      title: "Enhanced Absorption",
      description: "Vitamin K2 for improved calcium absorption",
    },
    {
      icon: "⚕️",
      title: "Doctor Recommended",
      description: "Daily maintenance dose, safe without prescription",
    },
    {
      icon: "🍊",
      title: "Natural Orange Flavor",
      description: "No added sugar, no added chemicals",
    },
    {
      icon: "📦",
      title: "Easy to Carry",
      description: "1g sachets for convenient daily use",
    },
    {
      icon: "✓",
      title: "Long-Term Use",
      description: "Designed for daily maintenance as per doctor advice",
    },
  ]

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Daily Vitamin D3 + K2 for Everyday Health
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete nutritional solution designed by experts for your daily wellness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl bg-gradient-to-br from-orange-50 to-green-50 border border-orange-100 hover:border-orange-300 transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
