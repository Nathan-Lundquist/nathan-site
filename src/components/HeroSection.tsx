'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plus, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="min-h-screen flex items-center pt-16"
      style={{ backgroundColor: '#EFEFEF' }}
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
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', color: '#555555' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: '#22C55E' }}
              />
              Available for Consulting
            </div>

            {/* Heading */}
            <h1
              className="font-black leading-tight tracking-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.75rem)', color: '#0A0A0A' }}
            >
              Hey, I&apos;m Nathan —<br />
              <span>CMMC &amp; NIST 800-171</span><br />
              Compliance Expert
            </h1>

            {/* Sub */}
            <p
              className="text-lg mb-8 max-w-md leading-relaxed"
              style={{ color: '#666666' }}
            >
              I help defense contractors achieve CMMC Level 2 compliance —
              protecting CUI and keeping you in the contract game.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-full transition-all hover:opacity-80"
                style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
              >
                <Plus className="w-4 h-4" /> Get a Consultation
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-full border transition-all hover:bg-black hover:text-white hover:border-black"
                style={{ borderColor: '#CCCCCC', color: '#0A0A0A', backgroundColor: 'transparent' }}
              >
                <Plus className="w-4 h-4" /> Free Resources
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['#0A0A0A', '#333333', '#666666', '#999999'].map((color, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{
                      backgroundColor: color,
                      border: '2px solid #EFEFEF',
                    }}
                  >
                    {['NL', 'D', 'S', '+'][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: '#555555' }}>
                Trusted by <strong style={{ color: '#0A0A0A' }}>50+</strong> defense contractors
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
            {/* Main photo card */}
            <div
              className="relative rounded-3xl overflow-hidden w-full max-w-sm"
              style={{
                aspectRatio: '3/4',
                backgroundColor: '#DDDDDD',
              }}
            >
              {/* Photo */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/headshot.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }}
              />
              {/* Placeholder monogram if no photo */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: '#BBBBBB' }}
              >
                <span className="text-7xl font-black select-none">NL</span>
              </div>

              {/* Floating stats card at bottom */}
              <div
                className="absolute bottom-4 left-4 right-4 px-4 py-3 rounded-2xl flex justify-between items-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="text-center">
                  <p className="text-xs mb-0.5" style={{ color: '#888888' }}>Experience</p>
                  <p className="text-xl font-black leading-none" style={{ color: '#0A0A0A' }}>10+</p>
                </div>
                <div className="w-px h-8" style={{ backgroundColor: '#E5E5E5' }} />
                <div className="text-center">
                  <p className="text-xs mb-0.5" style={{ color: '#888888' }}>Clients</p>
                  <p className="text-xl font-black leading-none" style={{ color: '#0A0A0A' }}>50+</p>
                </div>
                <div className="w-px h-8" style={{ backgroundColor: '#E5E5E5' }} />
                <div className="text-center">
                  <p className="text-xs mb-0.5" style={{ color: '#888888' }}>Via</p>
                  <p className="text-sm font-bold leading-none" style={{ color: '#8C7A6B' }}>PCShards</p>
                </div>
              </div>
            </div>

            {/* Spinning circular badge */}
            <div
              className="absolute -bottom-6 left-4 w-20 h-20"
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-spin"
                style={{ animationDuration: '10s' }}
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
                  />
                </defs>
                <text style={{ fontSize: '9.5px', fill: '#333333', fontWeight: 700, letterSpacing: '0.05em' }}>
                  <textPath href="#circlePath">CMMC EXPERT • NIST 800-171 • </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" style={{ color: '#0A0A0A' }} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
