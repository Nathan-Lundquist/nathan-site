import Link from 'next/link'
import { Shield, Linkedin, Github } from 'lucide-react'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #222222',
        backgroundColor: '#111111',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-black text-lg mb-3">
              <Shield className="w-5 h-5" style={{ color: '#444444' }} />
              <span>
                NATHAN<span style={{ color: '#8C7A6B' }}>.</span>LUNDQUIST
              </span>
            </div>
            <p
              className="text-sm max-w-xs leading-relaxed"
              style={{ color: '#888888' }}
            >
              CMMC L2 &amp; NIST 800-171 compliance consultant. Helping
              defense contractors protect CUI and achieve compliance.
            </p>
            <div
              className="flex items-center gap-1 mt-3 text-sm"
              style={{ color: '#888888' }}
            >
              <span>Consulting via</span>
              <a
                href="https://pcshards.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
                style={{ color: '#8C7A6B' }}
              >
                PCShards
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p
                className="font-bold text-xs uppercase tracking-widest mb-4"
                style={{ color: '#888888' }}
              >
                Navigation
              </p>
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-sm mb-2 transition-colors hover:text-accent"
                  style={{ color: '#888888' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <p
                className="font-bold text-xs uppercase tracking-widest mb-4"
                style={{ color: '#888888' }}
              >
                Connect
              </p>
              <a
                href="https://linkedin.com/in/nathanlundquist"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm mb-3 transition-colors"
                style={{ color: '#888888' }}
              >
                <Linkedin className="w-4 h-4" style={{ color: '#444444' }} />
                LinkedIn
              </a>
              <a
                href="https://github.com/Nathan-Lundquist"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: '#888888' }}
              >
                <Github className="w-4 h-4" style={{ color: '#444444' }} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row justify-between gap-2 text-xs"
          style={{
            borderTop: '1px solid #222222',
            color: '#888888',
          }}
        >
          <p>© {new Date().getFullYear()} Nathan Lundquist. All rights reserved.</p>
          <p>Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  )
}
