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
      style={{ backgroundColor: '#FEF4EE', border: '1px solid #E5E5E5' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FEF4EE' }}>
          <Mail className="w-4 h-4" style={{ color: '#B82416' }} />
        </div>
        <span className="text-sm font-semibold" style={{ color: '#B82416' }}>Newsletter</span>
      </div>
      <h3 className="font-bold text-lg mb-2" style={{ color: '#1A1A1A' }}>
        Our latest articles in your inbox
      </h3>
      <p className="text-sm mb-6 flex-1" style={{ color: '#646464' }}>
        CMMC updates, compliance tips, and new resources — no spam.
      </p>
      {submitted ? (
        <p className="text-sm font-semibold" style={{ color: '#B82416' }}>Thanks! You&apos;re on the list.</p>
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
            className="w-full px-0 py-2.5 text-sm outline-none bg-transparent"
            style={{
              borderBottom: '1px solid #E5E5E5',
              color: '#1A1A1A',
            }}
          />
          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center gap-2"
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
        <div className="flex justify-between items-center pt-6 mb-12" style={{ borderTop: '1px solid #E5E5E5' }}>
          <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Latest insights</span>
          <span className="font-mono text-xs text-gray-300">08</span>
        </div>

        {/* Heading row */}
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <p className="section-label">Latest Insights</p>
            <h2 className="font-bold" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#1A1A1A' }}>
              Insights &amp; articles
            </h2>
          </div>
          <Link href="/blog" className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: '#B82416' }}>
            Browse all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left 2/3: blog posts stacked */}
          <div className="md:col-span-2 space-y-6">
            {posts.length === 0 ? (
              <p className="text-sm" style={{ color: '#646464' }}>No posts yet.</p>
            ) : posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex gap-5 p-5 rounded-2xl transition-opacity hover:opacity-80 group"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
              >
                {/* Thumbnail placeholder */}
                <div className="w-24 h-20 rounded-xl shrink-0" style={{ backgroundColor: '#FEF4EE' }} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: '#FEF4EE', color: '#B82416' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-sm leading-snug mb-1" style={{ color: '#1A1A1A' }}>
                    {post.title}
                  </h3>
                  <p className="text-xs font-mono" style={{ color: '#646464' }}>
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
