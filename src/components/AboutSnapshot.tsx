'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const credentials = [
  'CMMC Registered Practitioner',
  'NIST 800-171 Specialist',
  'CUI Program Expert',
  'DoD Contractor Support',
]

export default function AboutSnapshot() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-16 items-start">
        {/* Left: label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#999999' }}>
            About me
          </p>
        </motion.div>

        {/* Right: content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-bold leading-tight mb-6"
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              color: '#111111',
            }}
          >
            I&apos;m Nathan Lundquist — a cybersecurity professional specializing
            in CMMC Level 2 assessment preparation and NIST SP 800-171 compliance
            for defense contractors. I help organizations identify gaps, build
            remediation roadmaps, and stay compliant so they can keep winning
            DoD contracts.
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {credentials.map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: '#F0EDE9',
                  color: '#8C7A6B',
                  border: '1px solid rgba(140,122,107,0.2)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
            style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
          >
            Full Bio <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
