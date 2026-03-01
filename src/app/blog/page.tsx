import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBlogPosts } from '@/lib/mdx'

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div style={{ backgroundColor: '#E8F4FD', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: '#E8F4FD' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#006FC6' }}>
            Insights
          </p>
          <h1
            className="font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#1A1A1A' }}
          >
            Security Blog
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#333333' }}>
            Plain-language guides on cybersecurity, compliance frameworks, and building security programs that actually work.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p style={{ color: '#646464' }}>No posts yet. Check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-6 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  style={{
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E5E5',
                  }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-bold uppercase tracking-wider px-3 py-1"
                        style={{ backgroundColor: '#E8F4FD', color: '#006FC6' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2
                    className="font-bold text-xl mb-2 leading-snug transition-colors group-hover:text-[#006FC6]"
                    style={{ color: '#1A1A1A' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: '#646464' }}>
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs" style={{ color: '#646464' }}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors group-hover:text-[#006FC6]"
                      style={{ color: '#646464' }}
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
