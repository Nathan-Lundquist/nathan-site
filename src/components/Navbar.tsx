'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Shield, Plus } from 'lucide-react'

const links = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 w-full z-50"
      style={{
        backgroundColor: 'rgba(239,239,239,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E0E0E0',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-black text-lg tracking-tight"
          style={{ color: '#0A0A0A' }}
        >
          <Shield className="w-5 h-5" style={{ color: '#444444' }} />
          <span>
            NATHAN<span style={{ color: '#8C7A6B' }}>.</span>LUNDQUIST
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors"
              style={{ color: '#555555' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = '#111111')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = '#555555')
              }
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm transition-all hover:opacity-80"
            style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
          >
            <Plus className="w-3.5 h-3.5" /> Get a Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          style={{ color: '#0A0A0A' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-4 py-6 flex flex-col gap-4"
          style={{
            backgroundColor: '#EFEFEF',
            borderTop: '1px solid #E0E0E0',
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-medium text-sm transition-colors"
              style={{ color: '#333333' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm w-fit"
            style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
            onClick={() => setOpen(false)}
          >
            <Plus className="w-3.5 h-3.5" /> Get a Consultation
          </Link>
        </div>
      )}
    </nav>
  )
}
