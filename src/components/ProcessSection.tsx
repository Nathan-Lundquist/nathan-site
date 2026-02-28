'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    label: 'Step 01',
    title: 'Requirements Analysis',
    description:
      'We review your contracts, identify CUI scope, and map applicable CMMC practices to your environment before any assessment work begins.',
  },
  {
    label: 'Step 02',
    title: 'Gap Remediation',
    description:
      'We work through your prioritized gap list systematically — implementing technical controls, updating policies, and building your SSP and POAM in parallel.',
  },
  {
    label: 'Step 03',
    title: 'Assessment Ready',
    description:
      'Final pre-assessment review simulates your C3PAO audit. We verify evidence packages, walk through likely assessor questions, and confirm you are ready.',
  },
]

export default function ProcessSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div className="flex justify-between items-center pt-6 mb-12" style={{ borderTop: '1px solid #D4DCE2' }}>
          <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Our process</span>
          <span className="font-mono text-xs text-gray-300">05</span>
        </div>

        {/* Heading + CTAs */}
        <div className="text-center mb-12">
          <h2
            className="font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0A0B0D' }}
          >
            The path to CMMC compliance
          </h2>
          <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: '#6B7280' }}>
            A proven three-step process that takes you from compliance gaps to assessment-ready.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#274C77] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
            >
              Get a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-[#274C77] text-[#274C77] px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
            >
              View services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Step card */}
        <div
          className="rounded-2xl p-10 relative overflow-hidden"
          style={{ backgroundColor: '#F0F5FA', minHeight: 280 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-mono text-xs mb-3" style={{ color: '#6096BA' }}>
                {steps[active].label}
              </p>
              <h3 className="font-black text-2xl mb-4" style={{ color: '#0A0B0D' }}>
                {steps[active].title}
              </h3>
              <p className="text-base leading-relaxed max-w-xl" style={{ color: '#6B7280' }}>
                {steps[active].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex gap-2 mt-8">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: active === i ? '#274C77' : '#D4DCE2',
                  transform: active === i ? 'scale(1.25)' : 'scale(1)',
                }}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
