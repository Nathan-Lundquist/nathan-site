import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  const bars = [60, 80, 55, 90, 70, 95, 65, 100, 75, 110, 85, 130, 105, 150, 120, 170]

  return (
    <section className="relative overflow-hidden py-24 px-6" style={{ backgroundColor: '#B82416' }}>
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top label */}
        <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Start Your Compliance Journey Today
        </p>
        <p className="text-sm font-bold uppercase tracking-[0.12em] mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Simple. Secure. Assessment-ready.
        </p>

        {/* Main heading + CTA row */}
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <h2
              className="font-black leading-tight mb-8 text-white"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              Nathan offers expertise, clarity, and a proven path to CMMC certification.
            </h2>
            <Link href="/contact" className="btn-outline-white">
              Get a Consultation Today <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bar chart decoration */}
          <div className="flex items-end gap-2 h-40 justify-end" aria-hidden="true">
            {bars.map((h, i) => (
              <div
                key={i}
                className="w-1 shrink-0"
                style={{ height: `${h}px`, backgroundColor: 'rgba(255,255,255,0.35)' }}
              />
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-12 pt-8 flex items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <div
            className="w-8 h-8 flex items-center justify-center text-white text-xs font-black shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            NL
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            CMMC &amp; NIST 800-171 Consulting for Defense Contractors
          </span>
        </div>
      </div>
    </section>
  )
}
