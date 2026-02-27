'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 z-0 animate-[gridFade_8s_ease-in-out_infinite]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, #0A0A0A 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-mono uppercase tracking-widest"
          style={{
            backgroundColor: '#111111',
            border: '1px solid rgba(255,107,0,0.3)',
            color: '#FF6B00',
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#FF6B00' }}
          />
          Available for Consulting Engagements
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-black tracking-tight mb-6 leading-none"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            color: '#F5F5F5',
          }}
        >
          CMMC &amp;{' '}
          <span style={{ color: '#FF6B00' }}>NIST 800-171</span>
          <br />
          Compliance Expert
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: '#888888' }}
        >
          I help defense contractors achieve and maintain CMMC Level 2
          compliance — protecting CUI and keeping you in the contract game.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact" className="btn-primary text-base">
            Get a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/resources" className="btn-outline text-base">
            Free Resources
          </Link>
        </motion.div>

        {/* PCShards attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-sm"
          style={{ color: '#888888' }}
        >
          Consulting through{' '}
          <a
            href="https://pcshards.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline"
            style={{ color: '#FF6B00' }}
          >
            PCShards
          </a>
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="w-6 h-6" style={{ color: '#888888' }} />
      </motion.div>
    </section>
  )
}
