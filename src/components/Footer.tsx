'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="px-6 pt-20 pb-10" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E5E5' }}>
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">

          {/* Left */}
          <div>
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <span
                className="w-8 h-8 flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: '#B82416' }}
              >
                NL
              </span>
              <span className="font-bold text-sm" style={{ color: '#1A1A1A' }}>Nathan Lundquist</span>
            </Link>

            <h3
              className="font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#1A1A1A', maxWidth: '420px' }}
            >
              Work with Nathan Lundquist and achieve your security and compliance goals with confidence.
            </h3>

            <Link href="/contact" className="btn-primary mb-12 w-fit">
              Get a Consultation <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex flex-col gap-3 mt-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#646464' }}>Email</p>
                <a href="mailto:nathan@pcshards.com" className="text-sm font-medium underline" style={{ color: '#1A1A1A' }}>
                  nathan@pcshards.com
                </a>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#646464' }}>Location</p>
                <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>Metro Detroit, MI</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-10">
            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-lg mb-4" style={{ color: '#1A1A1A' }}>
                Subscribe to security insights.
              </h4>
              <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 px-0 py-3 text-sm outline-none bg-transparent"
                  style={{ borderBottom: '1px solid #1A1A1A', color: '#1A1A1A' }}
                />
                <button type="submit" className="btn-secondary shrink-0 ml-4">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Nav columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#1A1A1A' }}>Company</p>
                <div className="flex flex-col gap-2">
                  {['About', 'Resources', 'Blog'].map((l) => (
                    <Link key={l} href={`/${l.toLowerCase()}`} className="text-sm transition-colors hover:text-[#B82416]" style={{ color: '#646464' }}>
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#1A1A1A' }}>Services</p>
                <div className="flex flex-col gap-2">
                  {['Security Assessment', 'Compliance Readiness', 'Risk Management', 'Security Program Dev'].map((l) => (
                    <Link key={l} href="/services" className="text-sm transition-colors hover:text-[#B82416]" style={{ color: '#646464' }}>
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#1A1A1A' }}>Support</p>
                <div className="flex flex-col gap-2">
                  {[['FAQ', '/resources'], ['Contact', '/contact'], ['Legal', '/']].map(([l, h]) => (
                    <Link key={l} href={h} className="text-sm transition-colors hover:text-[#B82416]" style={{ color: '#646464' }}>
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#1A1A1A' }}>Social</p>
                <div className="flex flex-col gap-2">
                  {[['LinkedIn', 'https://linkedin.com'], ['Twitter / X', 'https://x.com'], ['GitHub', 'https://github.com']].map(([l, h]) => (
                    <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-[#B82416]" style={{ color: '#646464' }}>
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-8 text-xs"
          style={{ borderTop: '1px solid #E5E5E5', color: '#646464' }}
        >
          <p>© Nathan Lundquist. All Rights Reserved.</p>
          <p>via <span className="font-semibold" style={{ color: '#1A1A1A' }}>PCShards</span></p>
        </div>
      </div>
    </footer>
  )
}
