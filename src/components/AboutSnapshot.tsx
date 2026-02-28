'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const credentials = [
  'CMMC Registered Practitioner',
  'NIST 800-171 Specialist',
  'CUI Program Expert',
  'DoD Contractor Support',
]

const expertiseBars = [
  { label: 'CMMC Level 2 Readiness',       pct: 95 },
  { label: 'NIST 800-171 Compliance',       pct: 98 },
  { label: 'CUI Handling & Identification', pct: 90 },
  { label: 'DoD DFARS Requirements',        pct: 85 },
]

function ProgressBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const reducedMotion = useReducedMotion()
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium" style={{ color: '#274C77' }}>{label}</span>
        <span className="text-sm font-semibold" style={{ color: '#6096BA' }}>{pct}%</span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ backgroundColor: '#D4DCE2', height: '6px' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: '#274C77' }}
          initial={{ width: reducedMotion ? `${pct}%` : 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function AboutSnapshot() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Star pill label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
            style={{ backgroundColor: '#DCEEFB', color: '#274C77' }}
          >
            ★ About Me
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-bold leading-tight mb-6 max-w-3xl"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#274C77' }}
          >
            I&apos;m Nathan Lundquist — a cybersecurity professional specializing
            in{' '}
            <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#6096BA' }}>
              CMMC Level 2
            </em>{' '}
            assessment preparation and NIST SP 800-171 compliance
            for defense contractors.
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {credentials.map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: '#DCEEFB',
                  color: '#6096BA',
                  border: '1px solid rgba(96,150,186,0.2)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
          {/* Progress bars */}
          <div className="mb-8 max-w-lg">
            {expertiseBars.map((bar, i) => (
              <ProgressBar key={bar.label} label={bar.label} pct={bar.pct} delay={i * 0.1} />
            ))}
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors hover:opacity-80"
            style={{ backgroundColor: '#274C77', color: '#FFFFFF' }}
          >
            Full Bio <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
