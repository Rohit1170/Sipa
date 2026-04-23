import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Navbar from "@/components/Navbar"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SIPA Nutrition | India's First Daily Vitamin D3 + K2 Sachets",
  description:
    "Plant-based, doctor-recommended daily Vitamin D3 + K2 maintenance dose. Coming soon to revolutionize your daily nutrition.",
  icons: {
    icon: [
      {
        url: "/icon.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon.jpeg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="canonical" href="https://www.sipanutrition.com/" />
        <meta name="google-site-verification" content="432lcv7Hma2TkRpJCpEaAMtT3M1Zw9g95ByAAZR12JE" />
      </head>
      <body className={`font-sans antialiased`}>
        <Navbar /> 
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
