import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBlogPosts } from '@/lib/mdx'

export default function BlogPreview() {
  const posts = getBlogPosts().slice(0, 3)

  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E5E5' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Lukes-style label+heading header */}
        <div className="grid md:grid-cols-[200px_1fr] gap-16 mb-16">
          <p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#8C7A6B' }}>
            Latest Insights
          </p>
          <div className="flex justify-between items-start">
            <h2
              className="font-black leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#111111' }}
            >
              From the Blog
            </h2>
            <Link
              href="/blog"
              className="font-bold text-sm flex items-center gap-1 hover:underline shrink-0 mt-2"
              style={{ color: '#8C7A6B' }}
            >
              All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group p-6 rounded-xl transition-colors"
              style={{
                backgroundColor: '#F9F9F9',
                border: '1px solid #E5E5E5',
              }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: '#F0EDE9',
                      color: '#8C7A6B',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3
                className="font-black text-lg mb-2 leading-snug transition-colors group-hover:text-[#111111]"
                style={{ color: '#111111' }}
              >
                {post.title}
              </h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#666666' }}>
                {post.description}
              </p>
              <p className="text-xs font-mono" style={{ color: '#999999' }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
