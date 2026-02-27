import Link from 'next/link'
import { getBlogPosts } from '@/lib/mdx'

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="section pt-24">
      <span className="accent-line" />
      <h1 className="section-heading">Blog</h1>
      <p className="mb-12" style={{ color: '#888888' }}>
        CMMC news, NIST guidance, and cybersecurity insights for defense contractors.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
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
            <h2
              className="font-black text-xl mb-2 transition-colors group-hover:text-[#FF6B00]"
              style={{ color: '#F5F5F5' }}
            >
              {post.title}
            </h2>
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

      {posts.length === 0 && (
        <p style={{ color: '#888888' }}>No posts yet. Check back soon.</p>
      )}
    </div>
  )
}
