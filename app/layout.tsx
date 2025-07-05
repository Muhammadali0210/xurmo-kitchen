import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "@/styles/globals.css"
import Header from "@/components/header"
import ScrollToTop from "@/components/scrol-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Restoran Menyusi",
  description: "Mazali taomlarimizni kashf eting"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <ScrollToTop />
          <Header />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  )
}

