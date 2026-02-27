'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Shield } from 'lucide-react'

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
        backgroundColor: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #222222',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-black text-lg tracking-tight"
          style={{ color: '#F5F5F5' }}
        >
          <Shield className="w-5 h-5" style={{ color: '#FF6B00' }} />
          <span>
            NATHAN<span style={{ color: '#FF6B00' }}>.</span>LUNDQUIST
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium uppercase tracking-wide transition-colors"
              style={{ color: '#888888' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = '#FF6B00')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = '#888888')
              }
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm py-2 px-4">
            Get a Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          style={{ color: '#F5F5F5' }}
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
            backgroundColor: '#111111',
            borderTop: '1px solid #222222',
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-medium uppercase text-sm tracking-wide transition-colors"
              style={{ color: '#888888' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary text-sm w-fit"
            onClick={() => setOpen(false)}
          >
            Get a Consultation
          </Link>
        </div>
      )}
    </nav>
  )
}
