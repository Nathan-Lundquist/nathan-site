'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ backgroundColor: '#EFEFEF' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #AAAAAA 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            opacity: 0.35,
          }}
        />
        {/* Large rotating rings — top right */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          className="absolute"
          style={{ top: -180, right: -180 }}
        >
          <svg width="680" height="680" viewBox="0 0 680 680" fill="none">
            <circle cx="340" cy="340" r="328" stroke="#BBBBBB" strokeWidth="1" strokeDasharray="6 14" />
            <circle cx="340" cy="340" r="270" stroke="#CCCCCC" strokeWidth="0.75" />
            <circle cx="340" cy="340" r="208" stroke="#BBBBBB" strokeWidth="1" strokeDasharray="3 9" />
          </svg>
        </motion.div>
        {/* Small counter-rotating ring — bottom left */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute"
          style={{ bottom: -120, left: -120 }}
        >
          <svg width="380" height="380" viewBox="0 0 380 380" fill="none">
            <circle cx="190" cy="190" r="178" stroke="#C2C2C2" strokeWidth="1" strokeDasharray="5 12" />
            <circle cx="190" cy="190" r="130" stroke="#CCCCCC" strokeWidth="0.75" strokeDasharray="2 8" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 w-full relative">
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

          </motion.div>

        </div>
      </div>
    </section>
  )
}
