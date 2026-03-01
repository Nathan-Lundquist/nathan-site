'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const tabs = {
  approach: {
    label: 'APPROACH',
    p1: 'Our approach puts your team in control from day one. We map every gap, build a practical remediation roadmap, and stand beside you through every assessment milestone.',
    p2: "We don't just deliver documents — we build the understanding your team needs to maintain compliance long after we're gone.",
  },
  results: {
    label: 'RESULTS',
    p1: 'Defense contractors who work with Nathan achieve CMMC Level 2 certification without surprise findings or failed assessments.',
    p2: 'Our structured process eliminates guesswork and replaces it with a repeatable system you can own and sustain.',
  },
}

const stats = [
  { num: '5+', label: 'Years Experience' },
  { num: '50+', label: 'Clients Served' },
  { num: '100%', label: 'First-try Pass Rate' },
]

export default function ApproachSection() {
  const [active, setActive] = useState<'approach' | 'results'>('approach')
  const reducedMotion = useReducedMotion()
  const tab = tabs[active]

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <p className="section-label">Our Approach</p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black leading-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#1A1A1A' }}
            >
              We envision compliance as clear, systematic, and achievable.
            </motion.h2>

            {/* Toggle tabs */}
            <div
              className="flex items-center gap-6 mb-8"
              role="tablist"
              aria-label="Approach tabs"
            >
              {(['approach', 'results'] as const).map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active === key}
                  onClick={() => setActive(key)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors"
                  style={{ color: active === key ? '#B82416' : '#646464' }}
                >
                  {/* Toggle pill */}
                  <span
                    className="w-10 h-5 rounded-full flex items-center transition-colors shrink-0"
                    style={{
                      backgroundColor: active === key ? '#B82416' : '#E5E5E5',
                      padding: '2px',
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded-full bg-white transition-transform"
                      style={{ transform: active === key ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </span>
                  {tabs[key].label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div
              role="tabpanel"
              aria-label={tab.label}
              tabIndex={0}
              className="mb-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#333333' }}>
                    {tab.p1}
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: '#646464' }}>
                    {tab.p2}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stats */}
            <div className="pt-8" style={{ borderTop: '1px solid #E5E5E5' }}>
              <div className="grid grid-cols-3 gap-6">
                {stats.map((s) => (
                  <div key={s.num}>
                    <p
                      className="font-black leading-none mb-1"
                      style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#B82416' }}
                    >
                      {s.num}
                    </p>
                    <p className="text-xs leading-snug" style={{ color: '#646464' }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — headshot on cream */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden"
            style={{
              aspectRatio: '3/4',
              backgroundColor: '#FEF4EE',
              backgroundImage: 'url(/headshot.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
        </div>
      </div>
    </section>
  )
}
