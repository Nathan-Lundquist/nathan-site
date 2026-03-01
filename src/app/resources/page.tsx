import { Download, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getResources } from '@/lib/mdx'

export default function ResourcesPage() {
  const resources = getResources()

  return (
    <div style={{ backgroundColor: '#E8F4FD', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: '#E8F4FD' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#006FC6' }}>
            Free Downloads
          </p>
          <h1
            className="font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#1A1A1A' }}
          >
            Resources
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#333333' }}>
            Free checklists, templates, and guides to help your organization build a stronger security posture — no strings attached.
          </p>
        </div>
      </section>

      {/* Resources grid */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          {resources.length === 0 ? (
            <p style={{ color: '#646464' }}>Resources coming soon.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {resources.map((r) => (
                <div
                  key={r.slug}
                  className="p-6 flex flex-col"
                  style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-3 py-1"
                      style={{ backgroundColor: '#E8F4FD', color: '#006FC6' }}
                    >
                      {r.category}
                    </span>
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-3 py-1"
                      style={{
                        backgroundColor: r.free ? '#006FC6' : '#1A1A1A',
                        color: '#FFFFFF',
                      }}
                    >
                      {r.free ? 'FREE' : 'PREMIUM'}
                    </span>
                  </div>
                  <h2
                    className="font-bold text-lg mb-2 leading-snug"
                    style={{ color: '#1A1A1A' }}
                  >
                    {r.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-6 flex-1"
                    style={{ color: '#646464' }}
                  >
                    {r.description}
                  </p>
                  {r.fileUrl ? (
                    <a
                      href={r.fileUrl}
                      download
                      className="inline-flex items-center justify-center gap-2 font-bold text-sm px-4 py-3"
                      style={{ backgroundColor: '#006FC6', color: '#FFFFFF' }}
                    >
                      <Download className="w-4 h-4" /> Download Free
                    </a>
                  ) : (
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-3 py-2 text-center"
                      style={{ backgroundColor: '#E5E5E5', color: '#646464' }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ backgroundColor: '#E8F4FD' }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="p-12 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ backgroundColor: '#006FC6' }}
          >
            <div>
              <h2
                className="font-bold mb-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#FFFFFF' }}
              >
                Need more than a template?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)' }}>
                Get hands-on guidance tailored to your specific environment and compliance requirements.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-bold px-6 py-3 shrink-0"
              style={{ backgroundColor: '#FFFFFF', color: '#006FC6' }}
            >
              Work With Nathan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
