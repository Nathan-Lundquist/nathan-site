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
      <section className="pt-28 pb-12 px-6" style={{ backgroundColor: '#E8F4FD' }}>
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[#006FC6]"
            style={{ color: '#646464' }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold uppercase tracking-wider px-3 py-1"
                style={{ backgroundColor: '#E8F4FD', color: '#006FC6', border: '1px solid #B3D7F5' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="font-bold mb-4 leading-tight"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: '#1A1A1A',
            }}
          >
            {post.title}
          </h1>

          <p className="text-sm" style={{ color: '#646464' }}>
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
                '--tw-prose-body': '#333333',
                '--tw-prose-headings': '#1A1A1A',
                '--tw-prose-links': '#006FC6',
                '--tw-prose-bold': '#1A1A1A',
                '--tw-prose-code': '#006FC6',
                '--tw-prose-hr': '#E5E5E5',
                '--tw-prose-quotes': '#333333',
                '--tw-prose-quote-borders': '#006FC6',
              } as React.CSSProperties
            }
          >
            <MDXRemote source={post.content} />
          </article>

          {/* CTA */}
          <div
            className="mt-16 p-10 text-center"
            style={{ backgroundColor: '#006FC6' }}
          >
            <h2 className="font-bold text-xl mb-2" style={{ color: '#FFFFFF' }}>
              Ready to strengthen your security posture?
            </h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Get personalized guidance tailored to your specific environment and compliance needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3"
              style={{ backgroundColor: '#FFFFFF', color: '#006FC6' }}
            >
              Schedule a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
