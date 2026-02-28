'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    number: '01',
    category: 'Assessment',
    title: 'CMMC Level 2 Assessment Prep',
    description: 'Full readiness assessment and remediation planning before your C3PAO assessment. Know exactly where you stand.',
    href: '/services',
  },
  {
    number: '02',
    category: 'Gap Analysis',
    title: 'NIST 800-171 Gap Analysis',
    description: 'Identify gaps in your CUI environment against all 110 practices. Get a prioritized remediation roadmap.',
    href: '/services',
  },
  {
    number: '03',
    category: 'Compliance',
    title: 'Compliance Roadmap & Remediation',
    description: 'Hands-on guidance building your SSP, POAM, and implementing technical controls across your environment.',
    href: '/services',
  },
]

export default function ServicesSnapshot() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#F9F9F9' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header: label left, heading right */}
        <div className="grid md:grid-cols-[200px_1fr] gap-16 mb-16">
          <p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#8C7A6B' }}>
            My Expertise
          </p>
          <div>
            <h2
              className="font-black leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#111111' }}
            >
              How I Can Help
            </h2>
            <p style={{ color: '#666666' }}>
              Practical, no-BS compliance consulting for defense contractors who need results — not just paperwork.
            </p>
          </div>
        </div>

        {/* Numbered list */}
        <div>
          {services.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="grid md:grid-cols-[80px_180px_1fr_auto] gap-6 items-center py-8 cursor-pointer group"
                style={{ borderTop: '1px solid #E5E5E5' }}
              >
                <span
                  className="text-4xl font-black leading-none"
                  style={{ color: '#EEEEEE' }}
                >
                  {s.number}
                </span>
                <span
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: '#999999' }}
                >
                  {s.category}
                </span>
                <div>
                  <h3
                    className="font-bold text-lg mb-1 transition-colors group-hover:text-[#111111]"
                    style={{ color: '#111111' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                    {s.description}
                  </p>
                </div>
                <Link
                  href={s.href}
                  className="hidden md:flex items-center gap-1 text-sm font-semibold transition-colors"
                  style={{ color: '#999999' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#999999')}
                >
                  Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid #E5E5E5' }} />
        </div>

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full"
            style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
          >
            Work With Me <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
