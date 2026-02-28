import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { getResources } from '@/lib/mdx'

export default function ResourcesPreview() {
  const resources = getResources().slice(0, 3)

  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E5E5' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Lukes-style label+heading header */}
        <div className="grid md:grid-cols-[200px_1fr] gap-16 mb-16">
          <p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#8C7A6B' }}>
            Resources
          </p>
          <div className="flex justify-between items-start">
            <h2
              className="font-black leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#111111' }}
            >
              Free Resources
            </h2>
            <Link
              href="/resources"
              className="font-bold text-sm flex items-center gap-1 hover:underline shrink-0 mt-2"
              style={{ color: '#8C7A6B' }}
            >
              All Resources <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((r) => (
            <div
              key={r.slug}
              className="flex flex-col p-6 rounded-xl"
              style={{
                backgroundColor: '#F9F9F9',
                border: '1px solid #E5E5E5',
              }}
            >
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold mb-4 w-fit"
                style={{
                  backgroundColor: '#0A0A0A',
                  color: '#FFFFFF',
                }}
              >
                {r.free ? 'FREE' : 'PREMIUM'}
              </span>
              <h3
                className="font-black text-lg mb-2"
                style={{ color: '#111111' }}
              >
                {r.title}
              </h3>
              <p
                className="text-sm mb-6 leading-relaxed flex-1"
                style={{ color: '#666666' }}
              >
                {r.description}
              </p>
              {r.fileUrl && (
                <a
                  href={r.fileUrl}
                  download
                  className="inline-flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-full w-fit transition-colors"
                  style={{ backgroundColor: '#111111', color: '#FFFFFF' }}
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
