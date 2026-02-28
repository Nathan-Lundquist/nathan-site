'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left: form */}
        <div>
          <h3
            className="font-black text-3xl mb-2"
            style={{ color: '#F5F5F5' }}
          >
            Stay in the loop.
          </h3>
          <p className="mb-6 text-sm" style={{ color: '#888888' }}>
            CMMC updates, compliance tips, and new resources — no spam.
          </p>
          {submitted ? (
            <p className="font-semibold" style={{ color: '#FFFFFF' }}>Thanks! You&apos;re on the list.</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm rounded-full outline-none"
                style={{
                  backgroundColor: '#222222',
                  border: '1px solid #333333',
                  color: '#F5F5F5',
                }}
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-1 transition-colors"
                style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A' }}
              >
                Subscribe <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          )}
        </div>

        {/* Right: quick links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#666666' }}>
              Pages
            </p>
            <div className="flex flex-col gap-2">
              {[['About', '/about'], ['Services', '/services'], ['Blog', '/blog'], ['Resources', '/resources'], ['Contact', '/contact']].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm transition-colors hover:text-[#FFFFFF]"
                  style={{ color: '#888888' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#666666' }}>
              Connect
            </p>
            <div className="flex flex-col gap-2">
              <a href="https://linkedin.com/in/nathanlundquist" target="_blank" rel="noopener noreferrer"
                className="text-sm transition-colors hover:text-[#FFFFFF]" style={{ color: '#888888' }}>
                LinkedIn
              </a>
              <a href="https://pcshards.com" target="_blank" rel="noopener noreferrer"
                className="text-sm transition-colors hover:text-[#FFFFFF]" style={{ color: '#888888' }}>
                PCShards
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
