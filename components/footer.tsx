"use client"

import { Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">SIPA Nutrition</h3>
            <p className="text-background/80">India&apos;s First Daily Vitamin D3 + K2 Sachets</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#about" className="hover:text-background transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#dosage" className="hover:text-background transition-colors">
                  Usage
                </a>
              </li>
              <li>
                <a href="#ingredients" className="hover:text-background transition-colors">
                  Ingredients
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#contact" className="hover:text-background transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-background transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-background transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-background transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div> */}
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/80 text-sm">© {currentYear} SIPA Nutrition. Coming Soon.</p>
            <p className="text-background/70 text-xs max-w-md">
              This product is a health supplement and not intended to diagnose, treat, cure, or prevent any disease.
              Always consult with a healthcare professional before starting any new supplement regimen.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
