"use client"

import { useInView } from "react-intersection-observer"

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const certifications = [
    { name: "FSSAI Certified", icon: "✓" },
    { name: "ISO Certified Facility", icon: "✓" },
    { name: "GMP Certified", icon: "✓" },
    { name: "HACCP Certified", icon: "✓" },
    { name: "US FDA Registered", icon: "✓" },
  ]

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Quality & Trust</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meeting the highest international standards for your safety
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`p-8 bg-gradient-to-br from-orange-50 to-white rounded-xl border-2 border-green-200 flex items-center gap-4 transition-all duration-500 hover:shadow-lg ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                {cert.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground">{cert.name}</h3>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 p-8 bg-orange-50 rounded-xl border-l-4 border-orange-600 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This product is a health supplement and not intended to diagnose, treat, cure,
            or prevent any disease. Always consult with a healthcare professional before starting any new supplement
            regimen.
          </p>
        </div>
      </div>
    </section>
  )
}
