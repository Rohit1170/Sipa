import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"  // ✅ correct import
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SIPA Nutrition | India's First Daily Vitamin D3 + K2 Sachets",
  description:
    "Plant-based, doctor-recommended daily Vitamin D3 + K2 maintenance dose. Coming soon to revolutionize your daily nutrition.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Google Fonts moved inside <head> as proper JSX */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://www.sipanutrition.com/" />
        <meta name="google-site-verification" content="432lcv7Hma2TkRpJCpEaAMtT3M1Zw9g95ByAAZR12JE" />
       <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wj6zosmb8d");`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
        {/* ✅ Razorpay script loads after page, non-blocking */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}