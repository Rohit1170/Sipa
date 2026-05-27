import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { Providers } from "@/components/Providers"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-plus-jakarta",
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    default: "SIPA Nutrition | Daily Vitamin D3 + K2 Sachets",
    template: "%s | SIPA Nutrition",
  },
  description:
    "Plant-based, doctor-recommended daily Vitamin D3 + K2 sachets. FSSAI approved, 100% vegan via VitaShine®, third-party lab tested. Ships across India.",
  openGraph: {
    siteName: "SIPA Nutrition",
    images: [
      {
        url: "https://www.sipanutrition.com/hero.jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/icon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/icon.ico", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.ico", type: "image/svg+xml" },
    ],
    apple: "/icon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${plusJakartaSans.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="432lcv7Hma2TkRpJCpEaAMtT3M1Zw9g95ByAAZR12JE" />
        <meta name="google-site-verification" content="aBvuh8BkWYYAZUMQWJQjwUind3GYgmRc7oLaeW9boTY" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <Navbar/>
          {children}
          <Analytics />
          <SpeedInsights />
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="lazyOnload"
          />
          <Script
            id="microsoft-clarity"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wj6zosmb8d");`,
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
