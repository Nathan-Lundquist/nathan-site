import Link from 'next/link'
import { ArrowRight, Shield, FileSearch, Map as MapIcon, Lock, CheckCircle } from 'lucide-react'

const cards = [
  {
    icon: Shield,
    title: 'CMMC L2 Assessment Prep',
    bullets: ['Readiness gap analysis', 'Remediation roadmap', 'Pre-assessment review'],
  },
  {
    icon: FileSearch,
    title: 'NIST 800-171 Gap Analysis',
    bullets: ['All 110 practices', 'CUI environment scope', 'Prioritized findings'],
  },
  {
    icon: MapIcon,
    title: 'Compliance Roadmap',
    bullets: ['SSP development', 'POAM creation', 'Control implementation'],
  },
  {
    icon: Lock,
    title: 'CUI Program Support',
    bullets: ['CUI identification', 'Handling procedures', 'Training & docs'],
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0D1824' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div
          className="flex justify-between items-center pt-6 mb-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Our services
          </span>
          <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>02</span>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-black leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF' }}>
            Complete compliance solutions
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            From initial gap analysis to assessment day — everything you need to achieve CMMC Level 2 certification.
          </p>
        </div>

        {/* 2×2 card grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div className="mb-5">
                  <Icon className="w-7 h-7" style={{ color: '#6096BA' }} />
                </div>
                <h3 className="font-bold text-lg mb-4" style={{ color: '#FFFFFF' }}>
                  {card.title}
                </h3>
                <ul className="space-y-2">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#6096BA' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#274C77] px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
          >
            Get a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
