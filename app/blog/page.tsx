import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Why Vitamin D3 + K2 Must Be Taken Together — SIPA Nutrition",
  description:
    "Why should you take Vitamin D3 with K2? Science-backed guide on the D3+K2 synergy for bone strength, immunity, calcium safety, and fatigue support. India's best vegan D3+K2 sachet.",
  alternates: { canonical: "https://www.sipanutrition.com/blog" },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-snippet": -1, "max-image-preview": "large" },
  },
  keywords: [
    "vitamin D3 K2 together",
    "why take vitamin K2 with D3",
    "vitamin D deficiency signs India",
    "vegan vitamin D3",
    "D3 K2 MK-7",
    "calcium absorption",
    "fatigue vitamin D",
    "bone health supplement India",
    "immunity vitamin D",
    "SIPA Nutrition D3 K2 sachets",
  ],
  openGraph: {
    title: "Why Vitamin D3 + K2 Must Be Taken Together",
    description:
      "Science-backed guide: how D3 and K2 synergize for bone health, immunity, calcium safety, and fatigue support. People also ask: when to take D3, signs of deficiency, vegan D3 sources.",
    url: "https://www.sipanutrition.com/blog",
    type: "article",
    publishedTime: "2026-04-02T00:00:00.000Z",
    modifiedTime: "2026-05-22T00:00:00.000Z",
    authors: ["https://www.sipanutrition.com"],
    images: [
      {
        url: "https://www.sipanutrition.com/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "SIPA Nutrition Vitamin D3 + K2 Daily Sachets — India's first vegan D3+K2 supplement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Vitamin D3 + K2 Must Be Taken Together",
    description:
      "Science guide: D3+K2 synergy for bone health, immunity & calcium safety. Includes FAQ and People Also Ask.",
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
  dateModified: "2026-05-22",
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
        text: "You can, but it is not advisable. Vitamin D3 significantly increases calcium absorption. Without K2 to activate the proteins that guide calcium into bones, that calcium can be deposited in arteries and soft tissues. For long-term bone and cardiovascular safety, always pair D3 with K2.",
      },
    },
    {
      "@type": "Question",
      name: "Why should Vitamin K2 be taken with Vitamin D3?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vitamin D3 increases the amount of calcium your body absorbs from food. Without K2, that extra calcium can deposit in arteries and soft tissue instead of bones. K2 activates two proteins — osteocalcin and Matrix Gla-Protein — that direct calcium specifically into bones and prevent arterial calcification. Together, D3 and K2 complete the full calcium pathway safely.",
      },
    },
    {
      "@type": "Question",
      name: "Is vegan Vitamin D3 as effective as lanolin-sourced D3?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — completely. Vegan D3 sourced from lichen via VitaShine® is chemically identical to D3 from animal sources (lanolin). Your body absorbs and uses both forms in precisely the same way. The only difference is the source.",
      },
    },
    {
      "@type": "Question",
      name: "When is the best time to take a D3 + K2 supplement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both D3 and K2 are fat-soluble vitamins. They absorb significantly better when taken with a fat-containing meal. Morning after breakfast — with eggs, nuts, avocado, or whole milk — is the optimal time for absorption and habit consistency.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to take D3 and K2 every day long-term?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. At a daily maintenance dose of 600 IU of D3 and 55 mcg of K2 MK-7, daily long-term supplementation is clinically safe and widely recommended by doctors without requiring a prescription.",
      },
    },
    {
      "@type": "Question",
      name: "How soon will I see results from Vitamin D3 and K2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Blood Vitamin D levels typically begin restoring within the first 1–2 weeks. Immunity and muscle function improvements are often noticeable after about one month. Measurable bone strength improvements typically appear around the three-month mark with daily consistent use.",
      },
    },
    {
      "@type": "Question",
      name: "Are SIPA Nutrition's D3 + K2 sachets suitable for vegans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely. SIPA Nutrition uses VitaShine® D3, sourced from lichen — a 100% plant-based source. There are no animal-derived ingredients of any kind in the formulation.",
      },
    },
    {
      "@type": "Question",
      name: "Does SIPA Nutrition's D3 + K2 product contain sugar or artificial additives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The formula contains no added sugar, no artificial flavours, and no artificial additives — only natural orange flavour and GRAS-certified excipients recognised as safe by all major global regulatory bodies.",
      },
    },
    {
      "@type": "Question",
      name: "Can Vitamin D3 help with fatigue and low energy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Vitamin D3 deficiency is directly linked to chronic fatigue, muscle weakness, and low energy. D3 plays a key role in mitochondrial function and muscle physiology. Restoring D3 to optimal levels through daily supplementation typically results in measurable improvements in energy and stamina within 4–8 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "What are the signs of Vitamin D deficiency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common signs include persistent fatigue, frequent illness or infections, bone pain, muscle weakness, mood changes or low mood, and hair loss. In India, where around 76% of the population is estimated to be Vitamin D deficient, these symptoms are widespread but often attributed to other causes. A blood test measuring 25(OH)D levels can confirm deficiency.",
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
    price: "599",
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
