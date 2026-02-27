'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Award } from 'lucide-react'

const credentials = [
  'CMMC Registered Practitioner',
  'NIST 800-171 Specialist',
  'CUI Program Expert',
  'DoD Contractor Support',
]

export default function AboutSnapshot() {
  return (
    <section className="section" style={{ borderTop: '1px solid #222222' }}>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Headshot / placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div
            className="aspect-square max-w-sm flex items-center justify-center"
            style={{
              backgroundColor: '#111111',
              border: '1px solid #222222',
            }}
          >
            <div className="text-center">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: '#222222' }}
              >
                <span
                  className="text-3xl font-black"
                  style={{ color: '#FF6B00' }}
                >
                  NL
                </span>
              </div>
              <p
                className="text-sm font-mono"
                style={{ color: '#888888' }}
              >
                Replace with headshot
              </p>
            </div>
          </div>
          {/* Years badge */}
          <div
            className="absolute -bottom-4 -right-4 p-4 font-black text-sm leading-tight"
            style={{ backgroundColor: '#FF6B00', color: '#0A0A0A' }}
          >
            10+ Years
            <br />
            Cybersecurity
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="accent-line" />
          <h2 className="section-heading">Who I Am</h2>
          <p
            className="leading-relaxed mb-6"
            style={{ color: '#888888' }}
          >
            I&apos;m Nathan Lundquist — a cybersecurity professional specializing
            in CMMC Level 2 assessment preparation and NIST SP 800-171
            compliance for defense contractors. Through PCShards, I help
            organizations identify gaps, build remediation roadmaps, and stay
            compliant so they can keep winning DoD contracts.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {credentials.map((c) => (
              <span
                key={c}
                className="flex items-center gap-1 tag-accent"
              >
                <Award className="w-3 h-3" />
                {c}
              </span>
            ))}
          </div>
          <Link
            href="/about"
            className="btn-outline inline-flex items-center gap-2"
          >
            Full Bio <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
