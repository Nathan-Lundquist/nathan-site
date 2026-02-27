import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBlogPosts } from '@/lib/mdx'

export default function BlogPreview() {
  const posts = getBlogPosts().slice(0, 3)

  return (
    <section className="section" style={{ borderTop: '1px solid #222222' }}>
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="accent-line" />
          <h2 className="section-heading">Latest Insights</h2>
        </div>
        <Link
          href="/blog"
          className="font-bold text-sm flex items-center gap-1 hover:underline"
          style={{ color: '#FF6B00' }}
        >
          All Posts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card p-6 group block"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <h3
              className="font-black text-lg mb-2 leading-snug transition-colors group-hover:text-[#FF6B00]"
              style={{ color: '#F5F5F5' }}
            >
              {post.title}
            </h3>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#888888' }}>
              {post.description}
            </p>
            <p className="text-xs font-mono" style={{ color: '#888888' }}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
