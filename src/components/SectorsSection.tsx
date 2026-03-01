'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

const sectors = [
  { name: 'Healthcare', sub: 'HIPAA scope' },
  { name: 'Finance', sub: 'PCI-DSS' },
  { name: 'Technology', sub: 'SOC 2' },
  { name: 'Manufacturing', sub: 'NIST CSF' },
  { name: 'Legal', sub: 'Data protection' },
  { name: 'Professional Services', sub: 'ISO 27001' },
  { name: 'Retail', sub: 'PCI-DSS v4' },
  { name: 'Education', sub: 'FERPA' },
  { name: 'Government', sub: 'NIST 800-53' },
  { name: 'Startups', sub: 'Security baseline' },
  { name: 'SaaS Companies', sub: 'SOC 2 Type II' },
  { name: 'Nonprofits', sub: 'Data privacy' },
]

export default function SectorsSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FEF4EE' }}>
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <p className="section-label text-center">Industries We Serve</p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-bold leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1A1A1A' }}
        >
          Protecting organizations{' '}
          <Shield
            className="inline-block align-middle"
            style={{ color: '#B82416', width: '1em', height: '1em' }}
          />{' '}
          across every industry.
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
