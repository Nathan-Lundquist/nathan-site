import { ArrowRight, Download, CheckCheck } from 'lucide-react'
import Link from 'next/link'
import { getResources } from '@/lib/mdx'

// Framework badge colors
const frameworkStyle: Record<string, { bg: string; color: string }> = {
  'CMMC':            { bg: '#1A1A1A', color: '#FFFFFF' },
  'SOC 2':           { bg: '#006FC6', color: '#FFFFFF' },
  'HIPAA':           { bg: '#0D5C9E', color: '#FFFFFF' },
  'NIST 800-30':     { bg: '#1A1A1A', color: '#FFFFFF' },
  'NIST SP 800-61':  { bg: '#1A1A1A', color: '#FFFFFF' },
  'Insurance':       { bg: '#333333', color: '#FFFFFF' },
  'General':         { bg: '#646464', color: '#FFFFFF' },
  'Multi-Framework': { bg: '#333333', color: '#FFFFFF' },
}

const categoryOrder = ['Checklists', 'Assessment', 'Templates', 'Guides']

export default function ResourcesPage() {
  const all = getResources()

  // Group by category in preferred order
  const grouped = categoryOrder.reduce<Record<string, typeof all>>((acc, cat) => {
    const items = all.filter((r) => r.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})
  // Catch any unlisted categories
  all.forEach((r) => {
    if (!categoryOrder.includes(r.category)) {
      grouped[r.category] ??= []
      grouped[r.category].push(r)
    }
  })

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
            Security Resources
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#333333' }}>
            Practical checklists, templates, and guides for every stage of your security
            program — free, no strings attached.
          </p>
        </div>
      </section>

      {/* Quick-nav table */}
      <section className="px-6 py-8" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#646464' }}>
            Jump to section
          </p>
          <div style={{ border: '1px solid #E5E5E5' }}>
            {Object.entries(grouped).map(([category, resources], i, arr) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-between px-5 py-4 group transition-colors hover:bg-[#E8F4FD]"
                style={{
                  borderBottom: i < arr.length - 1 ? '1px solid #E5E5E5' : 'none',
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="font-bold text-xs uppercase tracking-[0.15em] transition-colors group-hover:text-[#006FC6]"
                    style={{ color: '#1A1A1A' }}
                  >
                    {category}
                  </span>
                  <span className="text-xs" style={{ color: '#AAAAAA' }}>
                    {resources.length} {resources.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 transition-colors group-hover:text-[#006FC6]" style={{ color: '#AAAAAA' }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Resource sections */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto space-y-16">
          {Object.entries(grouped).map(([category, resources]) => (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
              {/* Section label */}
              <div
                className="flex items-center gap-4 mb-8 pb-4"
                style={{ borderBottom: '1px solid #E5E5E5' }}
              >
                <h2 className="font-bold text-xs uppercase tracking-[0.2em]" style={{ color: '#006FC6' }}>
                  {category}
                </h2>
                <span className="text-xs" style={{ color: '#AAAAAA' }}>
                  {resources.length} {resources.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Cards grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {resources.map((r) => {
                  const fwStyle = r.framework
                    ? (frameworkStyle[r.framework] ?? { bg: '#333333', color: '#FFFFFF' })
                    : null

                  return (
                    <div
                      key={r.slug}
                      className="flex flex-col"
                      style={{
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #E5E5E5',
                        borderTop: '3px solid #006FC6',
                      }}
                    >
                      {/* Badges */}
                      <div className="px-6 pt-6 pb-4 flex items-center gap-2 flex-wrap">
                        {r.framework && fwStyle && (
                          <span
                            className="text-xs font-bold uppercase tracking-wider px-3 py-1"
                            style={{ backgroundColor: fwStyle.bg, color: fwStyle.color }}
                          >
                            {r.framework}
                          </span>
                        )}
                        <span
                          className="text-xs font-bold uppercase tracking-wider px-3 py-1"
                          style={{ backgroundColor: '#E8F4FD', color: '#006FC6' }}
                        >
                          {r.category}
                        </span>
                      </div>

                      {/* Title + description */}
                      <div className="px-6 pb-5 flex-1">
                        <h3
                          className="font-bold text-xl mb-3 leading-snug"
                          style={{ color: '#1A1A1A' }}
                        >
                          {r.title}
                        </h3>
                        <p className="text-sm leading-relaxed mb-5" style={{ color: '#646464' }}>
                          {r.description}
                        </p>

                        {/* What's inside */}
                        {r.highlights.length > 0 && (
                          <ul className="space-y-2.5">
                            {r.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#333333' }}>
                                <CheckCheck
                                  className="w-4 h-4 shrink-0 mt-0.5"
                                  style={{ color: '#006FC6' }}
                                />
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Download */}
                      <div className="px-6 py-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                        {r.fileUrl ? (
                          <a
                            href={r.fileUrl}
                            download
                            className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 transition-opacity hover:opacity-90"
                            style={{ backgroundColor: '#006FC6', color: '#FFFFFF' }}
                          >
                            <Download className="w-4 h-4" />
                            Download Free
                          </a>
                        ) : (
                          <span
                            className="inline-flex items-center text-xs font-bold uppercase tracking-wider px-4 py-2"
                            style={{ backgroundColor: '#E5E5E5', color: '#646464' }}
                          >
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
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
              className="inline-flex items-center gap-2 font-bold px-6 py-3 shrink-0 text-sm"
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
