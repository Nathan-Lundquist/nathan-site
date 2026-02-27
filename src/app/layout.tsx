import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-var',
})

export const metadata: Metadata = {
  title: 'Nathan Lundquist — CMMC & NIST 800-171 Consultant',
  description:
    'CMMC Level 2 and NIST 800-171 compliance consulting. Helping defense contractors protect CUI and achieve compliance through PCShards.',
  openGraph: {
    title: 'Nathan Lundquist — CMMC & NIST 800-171 Consultant',
    description:
      'Cybersecurity compliance consulting for defense contractors handling CUI.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
