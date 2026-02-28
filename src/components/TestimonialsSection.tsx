'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const testimonials = [
  {
    quote: "Nathan identified gaps we had no idea existed and gave us a clear roadmap to fix them. We passed our CMMC assessment on the first try.",
    name: "Mike D.",
    title: "CEO, Defense Manufacturer",
    photo: null,
  },
  {
    quote: "Working with Nathan saved us months of guesswork. His NIST 800-171 gap analysis was thorough, practical, and exactly what we needed.",
    name: "Sarah K.",
    title: "CTO, DoD Subcontractor",
    photo: null,
  },
  {
    quote: "The SSP and POAM templates alone were worth every penny. Nathan's hands-on guidance made compliance feel achievable.",
    name: "James R.",
    title: "IT Director, Aerospace Firm",
    photo: null,
  },
]

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[200px_1fr] gap-16 mb-12">
          <p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#8C7A6B' }}>
            Client Feedback
          </p>
          <h2
            className="font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#111111' }}
          >
            What Clients Say
          </h2>
        </div>

        {/* Testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: '#F5F2EF',
              minHeight: '380px',
              display: 'grid',
              gridTemplateColumns: t.photo ? '1fr 1fr' : '1fr',
            }}
          >
            {/* Quote side */}
            <div className="p-10 flex flex-col justify-between">
              <span className="text-6xl leading-none font-serif" style={{ color: '#333333' }}>&ldquo;</span>
              <blockquote
                className="text-xl font-medium leading-relaxed my-4"
                style={{ color: '#111111' }}
              >
                {t.quote}
              </blockquote>
              <div>
                <p className="font-bold" style={{ color: '#111111' }}>{t.name}</p>
                <p className="text-sm" style={{ color: '#666666' }}>{t.title}</p>
              </div>
            </div>
            {/* Photo side (hidden if no photo) */}
            {t.photo && (
              <div
                style={{
                  backgroundImage: `url(${t.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 flex items-center justify-center rounded-full border transition-colors"
            style={{ borderColor: '#E5E5E5', color: '#333333' }}
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-sm" style={{ color: '#999999' }}>
            {index + 1} / {testimonials.length}
          </span>
          <button
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="w-10 h-10 flex items-center justify-center rounded-full border transition-colors"
            style={{ borderColor: '#E5E5E5', color: '#333333' }}
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
