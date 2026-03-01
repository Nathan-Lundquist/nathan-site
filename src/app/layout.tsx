import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Nathan Lundquist — CMMC & NIST 800-171 Consultant',
  description:
    'CMMC Level 2 and NIST 800-171 compliance consulting. Helping defense contractors protect CUI and achieve compliance through PCShards.',
  openGraph: {
    title: 'Nathan Lundquist — CMMC & NIST 800-171 Consultant',
    description: 'Cybersecurity compliance consulting for defense contractors handling CUI.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
