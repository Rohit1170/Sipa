"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: "Is this safe for daily use?",
      a: "Yes, this is a daily maintenance dose specifically designed for long-term daily use. It meets all safety standards and can be taken without prescription.",
    },
    {
      q: "Is this vegan?",
      a: "Yes, our Vitamin D3 is sourced from lichen (VitaShine® D3), making it a 100% vegan product suitable for all dietary preferences.",
    },
    {
      q: "Does it contain sugar or chemicals?",
      a: "No added sugar, no added chemicals. We use only natural ingredients and excipients that are safe for daily consumption.",
    },
    {
      q: "When should I take it?",
      a: "Take one sachet after your morning meal with food containing fat for optimal absorption. This ensures better bioavailability and maximum benefits.",
    },
  ]

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about SIPA Nutrition
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-2 border-orange-200 rounded-xl overflow-hidden transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 bg-gradient-to-r from-orange-50 to-green-50 hover:from-orange-100 hover:to-green-100 flex items-center justify-between transition-colors"
              >
                <h3 className="text-lg font-bold text-foreground text-left">{faq.q}</h3>
                <ChevronDown
                  className={`w-6 h-6 text-orange-600 transition-transform flex-shrink-0 ml-4 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white border-t-2 border-orange-200">
                  <p className="text-muted-foreground text-lg">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
