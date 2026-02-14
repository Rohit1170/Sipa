"use client"

import { useInView } from "react-intersection-observer"

export default function Dosage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const steps = [
    { number: 1, title: "One Sachet Per Day", description: "Take exactly one 1g sachet daily" },
    { number: 2, title: "After Morning Meal", description: "Consume after your morning breakfast" },
    {
      number: 3,
      title: "With Fat-Containing Food",
      description: "Take with food containing fat for optimal absorption",
    },
    { number: 4, title: "Daily Maintenance Dose", description: "Safe for long-term daily use" },
  ]

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[#f7f4ef] from-green-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">How to Consume</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Simple daily routine for maximum benefits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-8 bg-white rounded-xl border-2 border-orange-200 shadow-lg transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-foreground mt-4 mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
