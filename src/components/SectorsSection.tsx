'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

const sectors = [
  { name: 'Aerospace', sub: 'CUI handling' },
  { name: 'Manufacturing', sub: 'CMMC scope' },
  { name: 'IT Services', sub: 'System security' },
  { name: 'R&D', sub: 'CUI protection' },
  { name: 'Systems Integration', sub: 'Access control' },
  { name: 'Engineering', sub: 'NIST mapping' },
  { name: 'Defense Electronics', sub: 'Asset inventory' },
  { name: 'Cyber Services', sub: 'Incident response' },
  { name: 'Software Dev', sub: 'Secure SDLC' },
  { name: 'Logistics', sub: 'Supply chain' },
  { name: 'Prime Contractors', sub: 'Flow-down reqs' },
  { name: 'Consulting Firms', sub: 'Advisory scope' },
]

export default function SectorsSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FEF4EE' }}>
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <p className="section-label text-center">Defense Sectors We Serve</p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-black leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1A1A1A' }}
        >
          Protecting defense contractors{' '}
          <Shield
            className="inline-block align-middle"
            style={{ color: '#B82416', width: '1em', height: '1em' }}
          />{' '}
          across every sector.
        </motion.h2>

        {/* CTA */}
        <div className="flex justify-center mb-16">
          <Link href="/about" className="btn-primary">
            Learn More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {sectors.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-white p-5"
              style={{ border: '1px solid #E5E5E5' }}
            >
              <p className="font-bold text-sm leading-tight mb-1" style={{ color: '#1A1A1A' }}>
                {s.name}
              </p>
              <p className="text-xs" style={{ color: '#646464' }}>
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
