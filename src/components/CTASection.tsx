import Link from 'next/link'
import { ArrowRight, Mail, MapPin } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0D1824' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <h2
              className="font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF' }}
            >
              Achieve CMMC compliance with confidence
            </h2>
            <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Whether you&apos;re starting your compliance journey or preparing for a C3PAO assessment,
              Nathan provides the expertise and hands-on guidance to get you there.
            </p>
            <div className="mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#274C77] px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
              >
                Get a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              <a
                href="mailto:nathan@pcshards.com"
                className="flex items-center gap-3 text-sm transition-opacity hover:opacity-80"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <Mail className="w-4 h-4 shrink-0" style={{ color: '#6096BA' }} />
                nathan@pcshards.com
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <MapPin className="w-4 h-4 shrink-0" style={{ color: '#6096BA' }} />
                Metro Detroit, MI
              </div>
            </div>
          </div>

          {/* Right column: decorative dot grid */}
          <div className="hidden md:flex items-center justify-center" aria-hidden="true">
            <div
              className="w-full max-w-xs aspect-square rounded-3xl"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(96,150,186,0.35) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            />
          </div>
        </div>

        {/* Section divider at bottom */}
        <div
          className="flex justify-between items-center mt-16 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Work with Nathan
          </span>
          <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>06</span>
        </div>
      </div>
    </section>
  )
}
