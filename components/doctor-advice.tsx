"use client"

import { useInView } from "react-intersection-observer"

export default function DoctorAdvice() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Doctor Recommended Daily Maintenance Dose
          </h2>
        </div>

        <div
          className={`bg-white rounded-2xl shadow-xl p-8 lg:p-12 border-t-4 border-green-600 transition-all duration-700 delay-200 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="text-4xl">👨‍⚕️</div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Professional Recommendation</h3>
                <p className="text-lg text-muted-foreground">
                  Daily D3 + K2 supplementation is commonly recommended by doctors as a maintenance dose for overall
                  health and wellness.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-4xl">🆓</div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Prescription Required</h3>
                <p className="text-lg text-muted-foreground">
                  Can be taken without medical prescription as a daily maintenance supplement for long-term health
                  support.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-4xl">💼</div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Ideal For Modern Lifestyle</h3>
                <p className="text-lg text-muted-foreground">
                  Perfect for individuals with indoor lifestyle, limited sun exposure, or long working hours who need
                  daily vitamin D3 & K2 support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
