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

          {/* RIGHT — Stat Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-end items-start pt-4"
          >
            <div
              className="w-full max-w-sm bg-white p-6"
              style={{ border: '1px solid #E5E5E5' }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#006FC6' }}>
                  +98%
                </span>
                <div className="flex gap-3 text-xs" style={{ color: '#646464' }}>
                  <span>Q1</span>
                  <span>Q2</span>
                  <span className="font-bold" style={{ color: '#006FC6' }}>Q3</span>
                </div>
              </div>
              <p className="text-xs mb-6" style={{ color: '#006FC6' }}>Clients who achieve their security goals on first attempt</p>

              {/* Dot matrix chart */}
              <div className="grid mb-6" style={{ gridTemplateColumns: 'repeat(20, 1fr)', gap: '3px' }}>
                {Array.from({ length: 100 }).map((_, i) => {
                  const col = i % 20
                  const row = Math.floor(i / 20)
                  const threshold = Math.floor((col / 19) * 4)
                  const active = row >= (4 - threshold)
                  return (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: 5,
                        height: 5,
                        backgroundColor: active ? '#006FC6' : '#B3D7F5',
                      }}
                    />
                  )
                })}
              </div>

              {/* Card footer */}
              <div className="flex justify-between text-xs" style={{ color: '#646464' }}>
                <span>Engagements 2023</span>
                <span>Engagements 2024</span>
              </div>
            </div>
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
