import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
    <div className="section pt-24 max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm mb-10 transition-colors hover:text-[#FF6B00]"
        style={{ color: '#888888' }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <h1
        className="font-black mb-4 leading-tight"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          color: '#F5F5F5',
        }}
      >
        {post.title}
      </h1>

      <p className="font-mono text-sm mb-12" style={{ color: '#888888' }}>
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <article
        className="prose prose-invert max-w-none"
        style={
          {
            '--tw-prose-body': '#888888',
            '--tw-prose-headings': '#F5F5F5',
            '--tw-prose-links': '#FF6B00',
            '--tw-prose-bold': '#F5F5F5',
            '--tw-prose-code': '#FF6B00',
            '--tw-prose-hr': '#222222',
            '--tw-prose-quotes': '#888888',
            '--tw-prose-quote-borders': '#FF6B00',
          } as React.CSSProperties
        }
      >
        <MDXRemote source={post.content} />
      </article>

      <div
        className="mt-16 p-8 card text-center"
      >
        <h2 className="font-black text-xl mb-2" style={{ color: '#F5F5F5' }}>
          Need Help with Compliance?
        </h2>
        <p className="text-sm mb-4" style={{ color: '#888888' }}>
          Get personalized guidance for your specific environment.
        </p>
        <Link href="/contact" className="btn-primary text-sm">
          Schedule a Consultation
        </Link>
      </div>
    </div>
  )
}
