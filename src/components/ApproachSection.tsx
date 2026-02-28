'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const tabs = [
  {
    number: '01',
    label: 'Gap Analysis',
    title: 'Identify every compliance gap',
    description:
      'We map your current environment against all 110 NIST SP 800-171 practices and CMMC Level 2 requirements. You get a clear, prioritized list of what needs to be addressed — no guesswork.',
    bullets: ['CUI data flow mapping', 'Control-by-control assessment', 'Risk-ranked gap list'],
  },
  {
    number: '02',
    label: 'Remediation Planning',
    title: 'Build a roadmap you can actually execute',
    description:
      'Each gap gets a concrete remediation task with owner, timeline, and effort estimate. We help you build your System Security Plan (SSP) and Plan of Action & Milestones (POAM) simultaneously.',
    bullets: ['SSP drafting assistance', 'POAM creation & tracking', 'Technical control guidance'],
  },
  {
    number: '03',
    label: 'Assessment Prep',
    title: 'Walk into your C3PAO audit confident',
    description:
      'We conduct a final pre-assessment review simulating what your C3PAO will examine. Evidence collection, interviewer prep, and last-mile remediation — so there are no surprises.',
    bullets: ['Mock assessment walkthrough', 'Evidence package review', 'Assessor interview prep'],
  },
]

export default function ApproachSection() {
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((prev) => (prev + 1) % tabs.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((prev) => (prev - 1 + tabs.length) % tabs.length)
    }
  }

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div className="flex justify-between items-center pt-6 mb-12" style={{ borderTop: '1px solid #D4DCE2' }}>
          <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Our approach</span>
          <span className="font-mono text-xs text-gray-300">03</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div>
            <h2
              className="font-black leading-tight mb-4"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#0A0B0D' }}
            >
              Built for defense contractors
            </h2>
            <p className="text-base mb-8" style={{ color: '#6B7280' }}>
              A structured, no-guesswork path from compliance gaps to assessment-ready.
            </p>
            <div className="mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#274C77] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
              >
                Get a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tab list */}
            <div
              className="space-y-1"
              role="tablist"
              aria-label="Approach steps"
              onKeyDown={handleKeyDown}
            >
              {tabs.map((tab, i) => (
                <button
                  key={tab.number}
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`approach-panel-${tab.number}`}
                  id={`approach-tab-${tab.number}`}
                  onClick={() => setActive(i)}
                  className="w-full text-left px-4 py-4 rounded-lg transition-all"
                  style={{
                    borderLeft: active === i ? '3px solid #274C77' : '3px solid transparent',
                    backgroundColor: active === i ? '#F0F5FA' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs" style={{ color: active === i ? '#6096BA' : '#9CA3AF' }}>
                      {tab.number}
                    </span>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: active === i ? '#0A0B0D' : '#9CA3AF' }}
                    >
                      {tab.label}
                    </span>
                    {active === i && (
                      <ArrowRight className="w-4 h-4 ml-auto" style={{ color: '#274C77' }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right column: content panel */}
          {/* minHeight prevents layout shift during AnimatePresence exit */}
          <div
            role="tabpanel"
            id={`approach-panel-${tabs[active].number}`}
            aria-labelledby={`approach-tab-${tabs[active].number}`}
            className="rounded-2xl p-8"
            style={{ backgroundColor: '#F0F5FA', minHeight: 320 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.25 }}
              >
                <p className="font-mono text-xs mb-3" style={{ color: '#6096BA' }}>
                  {tabs[active].number}
                </p>
                <h3 className="font-black text-xl mb-3" style={{ color: '#0A0B0D' }}>
                  {tabs[active].title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#6B7280' }}>
                  {tabs[active].description}
                </p>
                <ul className="space-y-2">
                  {tabs[active].bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm font-medium" style={{ color: '#274C77' }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#6096BA' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
