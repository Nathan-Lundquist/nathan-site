'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const stats = [
  { value: '5+',  label: 'Years Experience',  pct: 85 },
  { value: '50+', label: 'Clients Served',    pct: 92 },
  { value: '110', label: 'NIST Practices',    pct: 100 },
]

function StatBar({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()

  return (
    <div ref={ref}>
      {/* Animated bar */}
      <div className="h-0.5 w-full mb-4 overflow-hidden rounded-full" style={{ backgroundColor: '#D4DCE2' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: '#274C77' }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: reducedMotion ? 1 : stat.pct / 100 } : { scaleX: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1.2, delay: index * 0.15, ease: 'easeOut' }}
        />
      </div>
      {/* Number + label */}
      <p className="font-black mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0A0B0D', lineHeight: 1 }}>
        {stat.value}
      </p>
      <p className="text-sm font-medium" style={{ color: '#6B7280' }}>{stat.label}</p>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEF2F8' }} aria-label="Company statistics">
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div className="flex justify-between items-center pt-6 mb-12" style={{ borderTop: '1px solid #D4DCE2' }}>
          <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Results</span>
          <span className="font-mono text-xs text-gray-300">04</span>
        </div>

        {/* Heading row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#0A0B0D' }}>
              Compliance results
            </h2>
            <p className="mt-2 text-base" style={{ color: '#6B7280' }}>
              Measurable outcomes for defense contractors we&apos;ve worked with.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#274C77] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80 shrink-0"
          >
            Get a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Three stat bars */}
        <div className="grid md:grid-cols-3 gap-10">
          {stats.map((stat, i) => (
            <StatBar key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
