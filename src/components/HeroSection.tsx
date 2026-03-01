'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="md:min-h-screen flex flex-col justify-between pt-16"
      style={{ backgroundColor: '#E8F4FD' }}
    >
      {/*
        Container strategy:
        - Default (≤1535px): max-w-7xl = 1280px — fills a standard laptop screen
        - 2xl (≥1536px):     max-w-[1600px]   — grows to 1600px on 1080p/4K desks
        Background colour floods the remaining viewport width on either side.
      */}
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 xl:px-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-8 xl:gap-16 items-start pt-8 pb-6 md:pt-16 md:pb-8">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-5 md:mb-8">
              <Shield className="w-5 h-5 shrink-0" style={{ color: '#006FC6' }} />
              <div className="w-px h-5" style={{ backgroundColor: '#E5E5E5' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#1A1A1A' }}>
                Information Security Consulting for Growing Organizations
              </span>
            </div>

            {/* Headline — clamp keeps it readable from 375px → 2560px */}
            <h1
              className="font-bold leading-none mb-6 md:mb-10"
              style={{
                fontSize: 'clamp(2rem, 5vw, 5.5rem)',
                color: '#006FC6',
                letterSpacing: '-0.02em',
              }}
            >
              Securing Your<br />
              Business Is<br />
              Easier Than<br />
              You Think.
            </h1>

            {/* Sub */}
            <p className="text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-md" style={{ color: '#333333' }}>
              We help SMBs and enterprises build real security programs — from first risk assessment to a compliance-ready posture, with clarity at every step.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Get a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/resources" className="btn-secondary">
                Free Resources
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — Stat Cards Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Primary stat card */}
            <div
              className="w-full bg-white p-6 xl:p-8"
              style={{ border: '1px solid #E5E5E5' }}
            >
              {/* Big stat + year labels */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span
                    className="font-bold leading-none block"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 4rem)', color: '#006FC6' }}
                  >
                    $4.88M
                  </span>
                  <p className="text-sm mt-2 max-w-[220px]" style={{ color: '#333333' }}>
                    Average cost of a data breach in 2024
                  </p>
                </div>
                <div className="flex gap-3 text-xs pt-1" style={{ color: '#646464' }}>
                  <span>'22</span>
                  <span>'23</span>
                  <span className="font-bold" style={{ color: '#006FC6' }}>'24</span>
                </div>
              </div>

              {/* Animated bar chart — breach cost rising YoY */}
              <div className="mt-6 mb-2">
                <div className="flex items-end gap-3" style={{ height: '72px' }}>
                  {[
                    { label: "'22", h: 46, active: false },
                    { label: "'23", h: 58, active: false },
                    { label: "'24", h: 72, active: true },
                  ].map(({ label, h, active }) => (
                    <motion.div
                      key={label}
                      initial={{ height: 0 }}
                      animate={{ height: h }}
                      transition={{ duration: 0.6, delay: active ? 0.8 : 0.6 }}
                      className="flex-1"
                      style={{ backgroundColor: active ? '#006FC6' : '#B3D7F5' }}
                    />
                  ))}
                </div>
                <div className="flex gap-3 mt-2">
                  {["'22", "'23", "'24"].map((label, i) => (
                    <span
                      key={label}
                      className="flex-1 text-center text-xs"
                      style={{ color: i === 2 ? '#006FC6' : '#646464', fontWeight: i === 2 ? 700 : 400 }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card footer */}
              <div
                className="flex justify-between text-xs pt-4 mt-3"
                style={{ color: '#646464', borderTop: '1px solid #E5E5E5' }}
              >
                <span>IBM Cost of a Data Breach Report</span>
                <span>2024</span>
              </div>
            </div>

            {/* Secondary card — risk mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-full p-5 xl:p-6 flex justify-between"
              style={{ backgroundColor: '#006FC6' }}
            >
              {[
                { num: '60%', label: 'SMBs close within 6 months of a breach' },
                { num: '94%', label: 'Attacks start with phishing or email' },
                { num: '72h', label: 'Avg time to detect a breach' },
              ].map(({ num, label }, i) => (
                <div
                  key={num}
                  className="flex flex-col items-center text-center flex-1 px-2"
                  style={i < 2 ? { borderRight: '1px solid rgba(255,255,255,0.2)' } : undefined}
                >
                  <span
                    className="font-bold text-white leading-none mb-1"
                    style={{ fontSize: 'clamp(1.25rem, 1.75vw, 1.75rem)' }}
                  >
                    {num}
                  </span>
                  <span className="text-xs leading-snug" style={{ color: 'rgba(255,255,255,0.75)' }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll for more — only visible on md+ where min-h-screen applies */}
      <div className="hidden md:flex max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 xl:px-10 w-full pb-6 justify-end">
        <span className="text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2" style={{ color: '#006FC6' }}>
          Scroll for more <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </section>
  )
}
