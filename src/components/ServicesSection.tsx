'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const cards = [
  {
    type: 'photo' as const,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    title: 'Gap Analysis & Readiness',
    href: '/services',
  },
  {
    type: 'photo' as const,
    gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #243447 100%)',
    title: 'NIST 800-171 & SSP',
    href: '/services',
  },
  {
    type: 'red' as const,
    gradient: '',
    title: 'Fast & results-driven',
    description: 'Achieve CMMC Level 2 certification without the guesswork. Nathan delivers a clear path from current state to assessment-ready.',
    href: '/contact',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="section-label">Services</p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1A1A1A' }}
            >
              The compliance expertise<br />you need, fast.
            </motion.h2>
          </div>
          <Link href="/services" className="btn-secondary shrink-0">
            All Services
          </Link>
        </div>

        {/* Three cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={card.href}
                className="block relative overflow-hidden group"
                style={{ aspectRatio: '3/4' }}
              >
                {card.type === 'photo' ? (
                  <>
                    {/* Dark gradient bg */}
                    <div
                      className="absolute inset-0"
                      style={{ background: card.gradient }}
                    />
                    {/* Subtle dot overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                      <span className="text-white font-bold text-lg leading-tight">
                        {card.title}
                      </span>
                      <div
                        className="w-10 h-10 flex items-center justify-center shrink-0 ml-3"
                        style={{ backgroundColor: '#FFFFFF' }}
                      >
                        <ArrowRight className="w-4 h-4" style={{ color: '#B82416' }} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Red card */}
                    <div className="absolute inset-0" style={{ backgroundColor: '#B82416' }} />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <h3 className="text-white font-black leading-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                        {card.title}
                      </h3>
                      <div>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                          {card.description}
                        </p>
                        <div className="flex justify-end">
                          <div
                            className="w-10 h-10 flex items-center justify-center"
                            style={{ backgroundColor: '#FFFFFF' }}
                          >
                            <ArrowRight className="w-4 h-4" style={{ color: '#B82416' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
