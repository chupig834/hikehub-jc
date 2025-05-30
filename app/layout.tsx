import type React from "react"
import "./globals.css"
import { NextAuthProvider } from "@/components/providers"
import { Inter } from 'next/font/google'
import Script from "next/script";

export const metadata = {
  title: "Hikehub - The Best Packing List Tool for Hikers",
  description: "Create and manage your hiking packing lists with Hikehub",
}

const inter = Inter({
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/hikehub.png" type="image/png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}

