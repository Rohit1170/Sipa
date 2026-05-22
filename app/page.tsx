import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "SIPA Nutrition — Daily Vitamin D3 + K2 Sachets for India",
  description:
    "India's first vegan daily D3 + K2 sachet. 600 IU + 55 mcg MK-7 at just ₹13/day. FSSAI approved, WHO-GMP certified, third-party lab tested.",
  alternates: { canonical: "https://www.sipanutrition.com/" },
  openGraph: {
    title: "SIPA Nutrition — Daily Vitamin D3 + K2 Sachets",
    description: "Vegan. Lab-tested. ₹399 for 30 days.",
    url: "https://www.sipanutrition.com/",
    type: "website",
    images: [
      {
        url: "https://www.sipanutrition.com/hero.jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIPA Nutrition — Daily D3+K2 Sachets",
    description: "Vegan. Lab-tested. ₹399 for 30 days.",
    images: ["https://www.sipanutrition.com/hero.jpeg"],
  },
};

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SIPA Nutrition",
  url: "https://www.sipanutrition.com",
  logo: "https://www.sipanutrition.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@sipanutrition.com",
    telephone: "+91-96617-44207",
    contactType: "customer service",
    availableLanguage: "English",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SIPA Nutrition",
  url: "https://www.sipanutrition.com",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeClient />
    </>
  );
}
