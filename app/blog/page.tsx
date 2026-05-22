import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Why D3 + K2 Must Be Taken Together — SIPA Nutrition",
  description:
    "Discover why Vitamin D3 needs K2 to work. Science guide on the D3+K2 synergy for bone strength, immunity, and heart safety. India's best vegan sachet.",
  alternates: { canonical: "https://www.sipanutrition.com/blog" },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-snippet": -1 },
  },
  openGraph: {
    title: "Why Vitamin D3 + K2 Must Be Taken Together",
    description:
      "Science-backed guide: how D3 and K2 synergize for bone health, immunity, and heart safety.",
    url: "https://www.sipanutrition.com/blog",
    type: "article",
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
    title: "Why D3 + K2 Must Be Taken Together",
    description: "Science guide on the D3+K2 synergy.",
    images: ["https://www.sipanutrition.com/hero.jpeg"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Why Vitamin D3 and K2 Are Important and Why They Should Be Taken Together",
  description:
    "A science-backed guide covering the individual benefits of Vitamin D3 and K2, the biochemical synergy between them, and why SIPA Nutrition's vegan D3+K2 sachets are India's smartest daily supplement.",
  image: "https://www.sipanutrition.com/hero.jpeg",
  datePublished: "2026-04-02",
  dateModified: "2026-04-02",
  author: {
    "@type": "Organization",
    name: "SIPA Nutrition",
    url: "https://www.sipanutrition.com",
  },
  publisher: {
    "@type": "Organization",
    name: "SIPA Nutrition",
    url: "https://www.sipanutrition.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.sipanutrition.com/logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.sipanutrition.com/blog",
  },
  keywords: [
    "Vitamin D3",
    "Vitamin K2",
    "D3 K2 together",
    "vegan supplement",
    "bone health",
    "immunity",
    "MK-7",
    "cholecalciferol",
    "India supplement",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I take Vitamin D3 without K2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can, but it is not advisable. Vitamin D3 significantly increases calcium absorption. Without K2 to activate the proteins that guide calcium into bones, that calcium can be deposited in arteries and soft tissues. For long-term safety, always pair D3 with K2.",
      },
    },
    {
      "@type": "Question",
      name: "Is vegan Vitamin D3 as effective as regular D3?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Vegan D3 sourced from lichen via VitaShine® is chemically identical to D3 from animal sources (lanolin). Your body absorbs and uses both forms identically.",
      },
    },
    {
      "@type": "Question",
      name: "When should I take a D3 + K2 supplement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both D3 and K2 are fat-soluble vitamins. They absorb best when taken with a fat-containing meal. Morning after breakfast — with eggs, nuts, or whole milk — is the optimal time.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to take D3 and K2 every day long-term?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. At a daily maintenance dose of 600 IU of D3 and 55 mcg of K2 (MK-7), daily long-term supplementation is clinically safe and doctor-recommended without a prescription.",
      },
    },
    {
      "@type": "Question",
      name: "How soon will I see results from Vitamin D3 and K2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vitamin D levels typically begin restoring within the first week. Immunity and muscle function improvements are often noticeable after one month. Structural bone benefits are measurable around the three-month mark.",
      },
    },
    {
      "@type": "Question",
      name: "Are SIPA Nutrition's D3 + K2 sachets suitable for vegans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely. SIPA Nutrition uses VitaShine® D3, sourced from lichen — a 100% plant-based source. There are no animal-derived ingredients of any kind.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.sipanutrition.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://www.sipanutrition.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Why Vitamin D3 and K2 Should Be Taken Together",
      item: "https://www.sipanutrition.com/blog",
    },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SIPA Nutrition Vitamin D3 + K2 Daily Sachets",
  description:
    "India's first vegan daily Vitamin D3 + K2 sachet. 600 IU D3 via VitaShine® lichen + 55 mcg K2 MK-7. 100% lab tested. No sugar.",
  brand: { "@type": "Brand", name: "SIPA Nutrition" },
  offers: {
    "@type": "Offer",
    price: "399",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: "https://www.sipanutrition.com/productOverview",
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <BlogClient />
    </>
  );
}
