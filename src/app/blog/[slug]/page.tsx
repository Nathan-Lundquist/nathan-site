import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getBlogPost, getBlogPosts } from '@/lib/mdx'

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Nathan Lundquist`,
    description: post.description,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Header */}
      <section className="pt-28 pb-12 px-6" style={{ backgroundColor: '#EFEFEF' }}>
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[#111111]"
            style={{ color: '#888888' }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
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

          <h1
            className="font-black mb-4 leading-tight"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: '#0A0A0A',
            }}
          >
            {post.title}
          </h1>

          <p className="font-mono text-sm" style={{ color: '#888888' }}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </section>

      {/* Article body */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose max-w-none"
            style={
              {
                '--tw-prose-body': '#444444',
                '--tw-prose-headings': '#0A0A0A',
                '--tw-prose-links': '#8C7A6B',
                '--tw-prose-bold': '#0A0A0A',
                '--tw-prose-code': '#8C7A6B',
                '--tw-prose-hr': '#E5E5E5',
                '--tw-prose-quotes': '#555555',
                '--tw-prose-quote-borders': '#8C7A6B',
              } as React.CSSProperties
            }
          >
            <MDXRemote source={post.content} />
          </article>

          {/* CTA */}
          <div
            className="mt-16 rounded-3xl p-10 text-center"
            style={{ backgroundColor: '#111111' }}
          >
            <h2 className="font-black text-xl mb-2" style={{ color: '#FFFFFF' }}>
              Need Help with Compliance?
            </h2>
            <p className="text-sm mb-6" style={{ color: '#888888' }}>
              Get personalized guidance for your specific environment.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-full text-sm"
              style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A' }}
            >
              Schedule a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
