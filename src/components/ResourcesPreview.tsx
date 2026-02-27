import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { getResources } from '@/lib/mdx'

export default function ResourcesPreview() {
  const resources = getResources().slice(0, 3)

  return (
    <section
      className="section"
      style={{
        borderTop: '1px solid #222222',
        backgroundColor: 'rgba(17,17,17,0.5)',
      }}
    >
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="accent-line" />
          <h2 className="section-heading">Free Resources</h2>
        </div>
        <Link
          href="/resources"
          className="font-bold text-sm flex items-center gap-1 hover:underline"
          style={{ color: '#FF6B00' }}
        >
          All Resources <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((r) => (
          <div key={r.slug} className="card p-6 flex flex-col">
            <span className="tag-accent mb-4 block w-fit">
              {r.free ? 'FREE' : 'PREMIUM'}
            </span>
            <h3
              className="font-black text-lg mb-2"
              style={{ color: '#F5F5F5' }}
            >
              {r.title}
            </h3>
            <p
              className="text-sm mb-6 leading-relaxed flex-1"
              style={{ color: '#888888' }}
            >
              {r.description}
            </p>
            {r.fileUrl && (
              <a href={r.fileUrl} download className="btn-outline text-sm py-2 inline-flex items-center gap-2 w-fit">
                <Download className="w-4 h-4" /> Download
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
