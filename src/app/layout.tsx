import type { Metadata } from 'next'
import type { ReactNode } from 'react'
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
  title: 'Nathan Lundquist — Information Security Consultant',
  description:
    'Information security consulting for SMBs and enterprises. Security assessments, compliance readiness (SOC 2, ISO 27001, NIST CSF, HIPAA), and risk management.',
  openGraph: {
    title: 'Nathan Lundquist — Information Security Consultant',
    description: 'Information security consulting for SMBs and enterprises. Security assessments, compliance readiness, and risk management.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
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
