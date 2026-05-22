import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About SIPA Nutrition — Science-Backed Vitamins Built for India",
  description:
    "Discover the story behind SIPA Nutrition — India's science-backed daily D3+K2 supplement brand. WHO-GMP certified, FSSAI approved, third-party tested.",
  alternates: { canonical: "https://www.sipanutrition.com/about" },
  openGraph: {
    title: "About SIPA Nutrition",
    description: "Built for India. Made with purpose.",
    url: "https://www.sipanutrition.com/about",
    type: "website",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SIPA Nutrition",
  url: "https://www.sipanutrition.com",
  logo: "https://www.sipanutrition.com/logo.png",
  description:
    "India's science-backed daily D3+K2 supplement brand. WHO-GMP certified, FSSAI approved, third-party tested.",
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutClient />
    </>
  );
}
