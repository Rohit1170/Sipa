"use client"

import { useInView } from "react-intersection-observer"

export default function Ingredients() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const ingredients = [
    { name: "Vitamin D3", amount: "600 IU", rda: "100% RDA" },
    { name: "Vitamin K2", amount: "55 mcg", rda: "100% RDA" },
    { name: "Natural Flavour", amount: "q.s.", rda: "Natural" },
    { name: "Excipients", amount: "q.s.", rda: "GRAS" },
  ]

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[#f7f4ef]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Ingredients</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Pure, potent ingredients for optimal health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className={`p-8 bg-gray-100 rounded-xl border border-green-200 hover:border-green-400 transition-all duration-500 text-center ${
                inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-bold text-foreground mb-3">{ingredient.name}</h3>
              <p className="text-2xl font-bold text-green-700 mb-1">{ingredient.amount}</p>
              <p className="text-sm text-muted-foreground">{ingredient.rda}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
