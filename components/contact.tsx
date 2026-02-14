"use client"

import { useInView } from "react-intersection-observer"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-32 bg-[#f7f4ef]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Reach out to us for more information.
          </p>

          <div
            className={`bg-white rounded-2xl shadow-xl p-12 border-t-4 border-orange-600 transition-all duration-700 delay-200 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Mail className="w-8 h-8 text-orange-600" />
              <a
                href="mailto:nutritionsipa@gmail.com"
                className="text-2xl font-bold text-foreground hover:text-orange-600 transition-colors"
              >
                hello@sipanutrition.com
              </a>
            </div>
            <p className="text-muted-foreground mb-8">
              We&apos;re currently in development. Join us on our journey to revolutionize daily nutrition in India.
            </p>
            <a
                href="mailto:nutritionsipa@gmail.com"
                className="text-2xl font-bold text-foreground hover:text-orange-600 transition-colors"
              >
            <Button
            
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 py-6 text-lg font-semibold"
            >
              
              Mail Us
            </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
