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

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <ProductAbout />
      <Dosage />
      <Ingredients />
      <Packaging />
      <Certifications />
      <DoctorAdvice />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
