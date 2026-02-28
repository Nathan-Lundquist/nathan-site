'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import type { BlogPost } from '@/lib/mdx'

function NewsletterCard() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div
      className="rounded-2xl p-8 flex flex-col h-full"
      style={{ backgroundColor: '#F0F5FA', border: '1px solid #D4DCE2' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#DCEEFB' }}>
          <Mail className="w-4 h-4" style={{ color: '#274C77' }} />
        </div>
        <span className="text-sm font-semibold" style={{ color: '#274C77' }}>Newsletter</span>
      </div>
      <h3 className="font-black text-lg mb-2" style={{ color: '#0A0B0D' }}>
        Our latest articles in your inbox
      </h3>
      <p className="text-sm mb-6 flex-1" style={{ color: '#6B7280' }}>
        CMMC updates, compliance tips, and new resources — no spam.
      </p>
      {submitted ? (
        <p className="text-sm font-semibold" style={{ color: '#274C77' }}>Thanks! You&apos;re on the list.</p>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
          className="space-y-3"
        >
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-full outline-none"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D4DCE2',
              color: '#0A0B0D',
            }}
          />
          <button
            type="submit"
            className="w-full px-5 py-2.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 bg-[#274C77] text-white transition-opacity hover:opacity-80"
          >
            Subscribe <ArrowRight className="w-3 h-3" />
          </button>
        </form>
      )}
    </div>
  )
}

export default function BlogNewsletterClient({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div className="flex justify-between items-center pt-6 mb-12" style={{ borderTop: '1px solid #D4DCE2' }}>
          <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Latest insights</span>
          <span className="font-mono text-xs text-gray-300">08</span>
        </div>

        {/* Heading row */}
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-black" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#0A0B0D' }}>
            Insights &amp; articles
          </h2>
          <Link href="/blog" className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: '#6096BA' }}>
            Browse all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left 2/3: blog posts stacked */}
          <div className="md:col-span-2 space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex gap-5 p-5 rounded-2xl transition-opacity hover:opacity-80 group"
                style={{ backgroundColor: '#F9FAFB', border: '1px solid #D4DCE2' }}
              >
                {/* Thumbnail placeholder */}
                <div className="w-24 h-20 rounded-xl shrink-0" style={{ backgroundColor: '#EEF2F8' }} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: '#DCEEFB', color: '#6096BA' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-sm leading-snug mb-1" style={{ color: '#0A0B0D' }}>
                    {post.title}
                  </h3>
                  <p className="text-xs font-mono" style={{ color: '#9CA3AF' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Right 1/3: newsletter card */}
          <div>
            <NewsletterCard />
          </div>
        </div>
      </div>
    </section>
  )
}
