import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const Montserrat=Geist_Mono({
  variable:"--font-geist-mono",
  subsets:["latin"],
  display: "swap",

})

export const metadata: Metadata = {
  title: "Portfolio",
  description: " A portfolio showcasing my work and skills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
