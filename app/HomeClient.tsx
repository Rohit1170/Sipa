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
    <main className="min-h-screen bg-background md:bg-[#f7f4ef] flex flex-col">
      <div className="order-1"><Hero /></div>
      <div className="order-2"><Certifications /></div>

      {/* DESKTOP-ONLY — replaces Ingredients in the reading order below */}
      <div className="hidden md:block md:order-3"><ProductAbout /></div>

      <div className="order-3 md:order-4"><BenefitSection /></div>
      <div className="order-4 md:order-5"><Timeline /></div>

      {/* MOBILE-ONLY */}
      <div className="order-5 md:hidden"><Ingredients /></div>

      {/* DESKTOP-ONLY */}
      <div className="hidden md:block md:order-6"><Dosage /></div>
      <div className="hidden md:block md:order-7"><DoctorAdvice /></div>

      <div className="order-6 md:order-8"><Testimonials /></div>
      <div className="order-7 md:order-9"><FAQ /></div>
      <div className="order-8 md:order-10"><Contact /></div>
      <div className="order-9 md:order-11"><Footer /></div>
    </main>
  )
}
