'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Download, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT: text content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Available badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #D4DCE2', color: '#6096BA' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22C55E' }} />
              Available for Consulting
            </div>

            {/* Heading */}
            <h1
              className="font-black leading-none tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#0A0B0D' }}
            >
              Compliance.<br />
              Precision.<br />
              Results.
            </h1>

            {/* Sub */}
            <p className="text-lg mb-8 max-w-md leading-relaxed" style={{ color: '#6B7280' }}>
              Specialized CMMC Level 2 and NIST 800-171 compliance consulting for defense contractors.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#274C77] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
              >
                Get a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 border border-[#274C77] text-[#274C77] px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
              >
                Free Resources <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Checklist widget */}
            <Link
              href="/resources"
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl transition-opacity hover:opacity-90 mb-10"
              style={{
                backgroundColor: 'rgba(255,255,255,0.85)',
                border: '1px solid #D4DCE2',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style={{ backgroundColor: '#DCEEFB' }}>
                <Download className="w-4 h-4" style={{ color: '#274C77' }} />
              </span>
              <span className="text-sm font-semibold" style={{ color: '#274C77' }}>
                Download the CMMC L2 Readiness Checklist
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" style={{ color: '#6096BA' }} />
            </Link>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {(['#274C77', '#6096BA', '#A3CEF1', '#8B8C89'] as const).map((color, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ backgroundColor: color, border: '2px solid #F3F4F6' }}
                  >
                    {['NL', 'D', 'S', '+'][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: '#8B8C89' }}>
                Trusted by <strong style={{ color: '#274C77' }}>50+</strong> defense contractors
              </p>
            </div>
          </motion.div>

          {/* RIGHT: photo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div
              className="relative rounded-3xl overflow-hidden w-full max-w-sm"
              style={{ aspectRatio: '3/4', backgroundColor: '#DCEEFB' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/headshot.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }}
              />
              {/* Floating stats card */}
              <div
                className="absolute bottom-4 left-4 right-4 px-4 py-3 rounded-2xl flex justify-between items-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <div className="text-center">
                  <p className="text-xs mb-0.5" style={{ color: '#8B8C89' }}>Experience</p>
                  <p className="text-xl font-black leading-none" style={{ color: '#274C77' }}>5+</p>
                </div>
                <div className="w-px h-8" style={{ backgroundColor: '#D4DCE2' }} />
                <div className="text-center">
                  <p className="text-xs mb-0.5" style={{ color: '#8B8C89' }}>Clients</p>
                  <p className="text-xl font-black leading-none" style={{ color: '#274C77' }}>50+</p>
                </div>
                <div className="w-px h-8" style={{ backgroundColor: '#D4DCE2' }} />
                <div className="text-center">
                  <p className="text-xs mb-0.5" style={{ color: '#8B8C89' }}>Via</p>
                  <p className="text-sm font-bold leading-none" style={{ color: '#6096BA' }}>PCShards</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
