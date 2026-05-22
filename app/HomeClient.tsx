"use client"
import Hero from "@/components/hero"
import ProductAbout from "@/components/product-about"
import Dosage from "@/components/dosage"
import Ingredients from "@/components/ingredients"
import Certifications from "@/components/certifications"
import DoctorAdvice from "@/components/doctor-advice"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import BenefitSection from "@/components/benefit"
import Timeline from "@/components/timeline"

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-background">

      {/* MOBILE — < 768px */}
      <div className="block md:hidden">
        <Hero />
        <BenefitSection />
        <Timeline />
        <Ingredients />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </div>

      {/* DESKTOP — 768px+ */}
      <div className="hidden md:block">
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
