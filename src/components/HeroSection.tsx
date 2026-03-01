'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="min-h-screen flex flex-col justify-between pt-16"
      style={{ backgroundColor: '#E8F4FD' }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-12 items-start pt-16 pb-8">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-8">
              <Shield className="w-5 h-5 shrink-0" style={{ color: '#006FC6' }} />
              <div className="w-px h-5" style={{ backgroundColor: '#E5E5E5' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#1A1A1A' }}>
                Information Security Consulting for Growing Organizations
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-bold leading-none mb-10"
              style={{
                fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
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
            <p className="text-lg leading-relaxed mb-8 max-w-md" style={{ color: '#333333' }}>
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
            className="flex flex-col gap-3 pt-4"
          >
            {/* Primary stat card */}
            <div
              className="w-full bg-white p-6"
              style={{ border: '1px solid #E5E5E5' }}
            >
              {/* Big stat + quarter labels */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span
                    className="font-bold leading-none block"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#006FC6' }}
                  >
                    +98%
                  </span>
                  <p className="text-xs mt-2 max-w-[180px]" style={{ color: '#333333' }}>
                    Clients who achieve their security goals on first attempt
                  </p>
                </div>
                <div className="flex gap-3 text-xs pt-1" style={{ color: '#646464' }}>
                  <span>Q1</span>
                  <span>Q2</span>
                  <span className="font-bold" style={{ color: '#006FC6' }}>Q3</span>
                </div>
              </div>

              {/* Animated bar chart */}
              <div className="mt-6 mb-2">
                <div className="flex items-end gap-2" style={{ height: '64px' }}>
                  {[
                    { label: 'Q1', h: 28, active: false },
                    { label: 'Q2', h: 44, active: false },
                    { label: 'Q3', h: 64, active: true },
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
                <div className="flex gap-2 mt-1">
                  {['Q1', 'Q2', 'Q3'].map((label, i) => (
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
                className="flex justify-between text-xs pt-4 mt-2"
                style={{ color: '#646464', borderTop: '1px solid #E5E5E5' }}
              >
                <span>Engagements 2023</span>
                <span>Engagements 2024</span>
              </div>
            </div>

            {/* Secondary card — mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-full p-5 flex justify-between"
              style={{ backgroundColor: '#006FC6' }}
            >
              {[
                { num: '5+', label: 'Years Experience' },
                { num: '50+', label: 'Clients Served' },
                { num: '10+', label: 'Frameworks' },
              ].map(({ num, label }, i) => (
                <div
                  key={num}
                  className="flex flex-col items-center text-center flex-1"
                  style={i < 2 ? { borderRight: '1px solid rgba(255,255,255,0.2)' } : undefined}
                >
                  <span className="font-bold text-white leading-none mb-1" style={{ fontSize: '1.5rem' }}>{num}</span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll for more */}
      <div className="max-w-7xl mx-auto px-6 w-full pb-6 flex justify-end">
        <span className="text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2" style={{ color: '#006FC6' }}>
          Scroll for more <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </section>
  )
}
