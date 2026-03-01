'use client'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "Nathan identified security gaps we had no idea existed and gave us a clear roadmap to fix them. We passed our SOC 2 audit on the first try.",
    name: "Mike D.",
    title: "CEO, SaaS Company",
    initial: "M",
  },
  {
    quote: "Working with Nathan saved us months of guesswork. His risk assessment was thorough, practical, and exactly what our team needed to move forward.",
    name: "Sarah K.",
    title: "CTO, Healthcare Startup",
    initial: "S",
  },
  {
    quote: "The security policies and procedures alone were worth every penny. Nathan's guidance made ISO 27001 certification feel completely achievable.",
    name: "James R.",
    title: "IT Director, Professional Services Firm",
    initial: "J",
  },
]

function QuoteCard({
  quote, name, title, initial, delay = 0
}: {
  quote: string; name: string; title: string; initial: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col rounded-2xl p-7"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', height: '100%' }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
          style={{ backgroundColor: '#B82416' }}
        >
          {initial}
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: '#1A1A1A' }}>{name}</p>
          <p className="text-xs" style={{ color: '#646464' }}>{title}</p>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full ml-auto shrink-0" style={{ backgroundColor: '#FEF4EE', color: '#B82416' }}>
          Customer story
        </span>
      </div>
      <blockquote className="text-sm leading-relaxed flex-1" style={{ color: '#333333' }}>
        &ldquo;{quote}&rdquo;
      </blockquote>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div className="flex justify-between items-center pt-6 mb-12" style={{ borderTop: '1px solid #E5E5E5' }}>
          <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Testimonials</span>
          <span className="font-mono text-xs text-gray-300">07</span>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="section-label">Testimonials</p>
          <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A1A' }}>
            What clients say
          </h2>
          <p className="mt-3 text-base" style={{ color: '#646464' }}>
            Organizations that achieved their security goals with Nathan&apos;s guidance.
          </p>
        </div>

        {/* Bento grid */}
        {/* Top row: large quote (2/3) + stat panel (1/3) */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <QuoteCard {...testimonials[0]} delay={0} />
          </div>

          {/* Stat panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl p-7 flex flex-col items-center justify-center text-center min-h-[160px]"
            style={{ backgroundColor: '#B82416' }}
          >
            <p className="font-bold leading-none mb-3" style={{ fontSize: 'clamp(3.5rem, 7vw, 5rem)', color: '#FFFFFF' }}>
              100%
            </p>
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
              clients who meet their security goals on first attempt
            </p>
          </motion.div>
        </div>

        {/* Bottom row: two equal cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <QuoteCard {...testimonials[1]} delay={0.15} />
          <QuoteCard {...testimonials[2]} delay={0.25} />
        </div>
      </div>
    </section>
  )
}
