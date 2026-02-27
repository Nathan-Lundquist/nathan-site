'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ClipboardCheck, Search, Map, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: ClipboardCheck,
    title: 'CMMC Level 2 Assessment Prep',
    description:
      'Full readiness assessment and remediation planning before your C3PAO assessment. Know exactly where you stand.',
  },
  {
    icon: Search,
    title: 'NIST 800-171 Gap Analysis',
    description:
      'Identify gaps in your CUI environment against all 110 practices. Get a prioritized remediation roadmap.',
  },
  {
    icon: Map,
    title: 'Compliance Roadmap & Remediation',
    description:
      'Hands-on guidance building your SSP, POAM, and implementing technical controls across your environment.',
  },
]

export default function ServicesSnapshot() {
  return (
    <section className="section" style={{ borderTop: '1px solid #222222' }}>
      <span className="accent-line" />
      <h2 className="section-heading">How I Can Help</h2>
      <p className="mb-12 max-w-xl" style={{ color: '#888888' }}>
        Practical, no-BS compliance consulting for defense contractors who need
        results — not just paperwork.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-6 group"
          >
            <s.icon
              className="w-8 h-8 mb-4"
              style={{ color: '#FF6B00' }}
            />
            <h3
              className="font-black text-lg mb-2 transition-colors group-hover:text-[#FF6B00]"
              style={{ color: '#F5F5F5' }}
            >
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
              {s.description}
            </p>
          </motion.div>
        ))}
      </div>
      <Link href="/contact" className="btn-primary">
        Work With Me <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  )
}
