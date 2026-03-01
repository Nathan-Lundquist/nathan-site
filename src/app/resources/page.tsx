import { Download, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getResources } from '@/lib/mdx'

export default function ResourcesPage() {
  const resources = getResources()

  return (
    <div style={{ backgroundColor: '#E7ECEF', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: '#E7ECEF' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: '#8F96A9' }}>
            Free downloads
          </p>
          <h1
            className="font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#4768FA' }}
          >
            Resources
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#8F96A9' }}>
            Free guides, checklists, and templates to help defense contractors
            navigate CMMC and NIST 800-171 compliance.
          </p>
        </div>
      </section>

      {/* Resources grid */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          {resources.length === 0 ? (
            <p style={{ color: '#8F96A9' }}>Resources coming soon.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {resources.map((r) => (
                <div
                  key={r.slug}
                  className="rounded-2xl p-6 flex flex-col"
                  style={{ backgroundColor: '#F0F5FA', border: '1px solid #D3D8E9' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{ backgroundColor: '#F0F0F0', color: '#555555' }}
                    >
                      {r.category}
                    </span>
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: r.free ? '#4768FA' : '#444444',
                        color: '#FFFFFF',
                        border: 'none',
                      }}
                    >
                      {r.free ? 'FREE' : 'PREMIUM'}
                    </span>
                  </div>
                  <h2
                    className="font-bold text-xl mb-2"
                    style={{ color: '#4768FA' }}
                  >
                    {r.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-6 flex-1"
                    style={{ color: '#8F96A9' }}
                  >
                    {r.description}
                  </p>
                  {r.fileUrl ? (
                    <a
                      href={r.fileUrl}
                      download
                      className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-4 py-2.5 rounded-full"
                      style={{ backgroundColor: '#4768FA', color: '#FFFFFF' }}
                    >
                      <Download className="w-4 h-4" /> Download Free
                    </a>
                  ) : (
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-center"
                      style={{ backgroundColor: '#F0F0F0', color: '#8F96A9' }}
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
      <section className="py-16 px-6" style={{ backgroundColor: '#F0F5FA' }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ backgroundColor: '#4768FA' }}
          >
            <div>
              <h2
                className="font-bold mb-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#FFFFFF' }}
              >
                Need more than a template?
              </h2>
              <p style={{ color: '#8F96A9' }}>
                Get hands-on guidance tailored to your specific environment.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full shrink-0"
              style={{ backgroundColor: '#FFFFFF', color: '#4768FA' }}
            >
              Work With Me <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
