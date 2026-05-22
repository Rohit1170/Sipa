import type { Metadata } from "next";
import Script from "next/script";
import ProductOverviewClient from "./ProductOverviewClient";

export const metadata: Metadata = {
  title: "Buy SIPA Nutrition D3+K2 Daily Sachet — 30 Pack, ₹399",
  description:
    "Order SIPA Nutrition's vegan Vitamin D3 + K2 daily sachet. 600 IU D3 (VitaShine®) + 55 mcg K2 MK-7. 30 sachets, sugar-free, lab-tested. Just ₹13/day.",
  alternates: { canonical: "https://www.sipanutrition.com/productOverview" },
  openGraph: {
    title: "SIPA Nutrition Daily D3+K2 Sachet",
    description: "Vegan, lab-tested, ₹399 for 30 days.",
    url: "https://www.sipanutrition.com/productOverview",
    type: "website",
    images: [
      {
        url: "https://www.sipanutrition.com/prod3.png",
        width: 1200,
        height: 1200,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIPA Nutrition D3+K2 Sachet",
    description: "Vegan, lab-tested, ₹399 for 30 days.",
    images: ["https://www.sipanutrition.com/prod3.png"],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SIPA Nutrition Daily Vitamin D3 + K2 Sachets",
  description:
    "Vegan daily D3+K2 sachets. 600 IU Cholecalciferol via VitaShine® lichen + 55 mcg Menaquinone MK-7. 30 sachets per pack. Sugar-free, lab tested, FSSAI approved.",
  brand: { "@type": "Brand", name: "SIPA Nutrition" },
  image: [
    "https://www.sipanutrition.com/prod3.png",
    "https://www.sipanutrition.com/prod1.jpeg",
  ],
  sku: "SIPA-D3K2-30",
  offers: {
    "@type": "Offer",
    price: "399",
    priceCurrency: "INR",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: "https://www.sipanutrition.com/productOverview",
    seller: { "@type": "Organization", name: "SIPA Nutrition" },
  },
};

export default function ProductOverviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="google-maps"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
      />
      <ProductOverviewClient />
    </>
  );
}
