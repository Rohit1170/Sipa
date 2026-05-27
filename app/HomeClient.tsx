"use client"
import dynamic from "next/dynamic"
import Hero from "@/components/hero"

const Certifications  = dynamic(() => import("@/components/certifications"))
const BenefitSection  = dynamic(() => import("@/components/benefit"))
const Timeline        = dynamic(() => import("@/components/timeline"))
const Ingredients     = dynamic(() => import("@/components/ingredients"))
const Testimonials    = dynamic(() => import("@/components/testimonials"))
const FAQ             = dynamic(() => import("@/components/faq"))
const Contact         = dynamic(() => import("@/components/contact"))
const Footer          = dynamic(() => import("@/components/footer"))
const ProductAbout    = dynamic(() => import("@/components/product-about"))
const Dosage          = dynamic(() => import("@/components/dosage"))
const DoctorAdvice    = dynamic(() => import("@/components/doctor-advice"))

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-background">

      {/* MOBILE — < 768px */}
      <div className="block md:hidden">
        <Hero />
        <Certifications />
        <BenefitSection />
        <Timeline />
        <Ingredients />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </div>

      {/* DESKTOP — 768px+ */}
      <div className="hidden md:block bg-[#f7f4ef]">
        <Hero />
        <Certifications />
        <ProductAbout />
        <BenefitSection />
        <Timeline />
        <Dosage />
        <DoctorAdvice />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </div>

    </main>
  )
}
