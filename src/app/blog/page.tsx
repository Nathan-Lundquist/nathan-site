import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBlogPosts } from '@/lib/mdx'

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div style={{ backgroundColor: '#EFEFEF', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: '#EFEFEF' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: '#999999' }}>
            Insights
          </p>
          <h1
            className="font-black leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#0A0A0A' }}
          >
            Blog
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#666666' }}>
            CMMC news, NIST guidance, and cybersecurity insights for defense contractors.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p style={{ color: '#888888' }}>No posts yet. Check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl p-6 transition-all"
                  style={{
                    backgroundColor: '#F9F9F9',
                    border: '1px solid #E5E5E5',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(17,17,17,0.4)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E5E5'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                        style={{ backgroundColor: '#F0F0F0', color: '#555555' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2
                    className="font-black text-xl mb-2 transition-colors group-hover:text-[#111111]"
                    style={{ color: '#111111' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: '#666666' }}>
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-mono" style={{ color: '#999999' }}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold transition-colors group-hover:text-[#111111]"
                      style={{ color: '#999999' }}
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
