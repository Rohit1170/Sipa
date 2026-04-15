import Hero from "@/components/hero"
import ProductAbout from "@/components/product-about"
import Dosage from "@/components/dosage"
import Ingredients from "@/components/ingredients"
import Packaging from "@/components/packaging"
import Certifications from "@/components/certifications"
import DoctorAdvice from "@/components/doctor-advice"
import FAQ from "@/components/faq"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

import BenefitSection from "@/components/benefit"
import Timeline from "@/components/timeline"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      
      {/* ✅ MOBILE ONLY */}
      <div className="block md:hidden">
        <Hero />
        <BenefitSection />
        <Timeline />
        <Ingredients />
        <FAQ />
        <Contact /> {/* CTA */}
          <Footer />
      </div>

      {/* ✅ DESKTOP ONLY */}
      <div className="hidden md:block">
        <Hero />
        <ProductAbout />
        <BenefitSection />
        <Timeline />
        <Certifications />
        <Dosage />
        <Ingredients />
        <DoctorAdvice />
        <FAQ />
        <Contact />
        <Footer />
      </div>

    </main>
  )
}