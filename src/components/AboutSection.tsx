'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const pillars = [
  { num: '01', label: 'Security Assessment', active: false },
  { num: '02', label: 'Risk Management', active: false },
  { num: '03', label: 'Compliance Readiness', active: false },
  { num: '04', label: 'Ongoing Security Support', active: true },
]

export default function AboutSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <p className="section-label">About Nathan</p>

        {/* Full-width heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-bold leading-tight mb-16"
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            color: '#1A1A1A',
            maxWidth: '900px',
          }}
        >
          Nathan Lundquist is redefining how organizations approach information
          security. We believe security should be clear, achievable, and
          built to last.
        </motion.h2>

        {/* Two-column */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — numbered list */}
          <div>
            <div className="flex flex-col" style={{ borderTop: '1px solid #E5E5E5' }}>
              {pillars.map((p) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 py-5"
                  style={{ borderBottom: '1px solid #E5E5E5' }}
                >
                  <span className="text-xs font-bold w-6 shrink-0" style={{ color: '#006FC6' }}>
                    {p.num}
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{ color: p.active ? '#006FC6' : '#B3D7F5' }}
                  >
                    {p.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/services" className="btn-primary">
                Our Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right — headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/headshot.jpg"
                alt="Nathan Lundquist, information security consultant"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
