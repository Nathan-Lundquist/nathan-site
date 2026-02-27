import { Download } from 'lucide-react'
import { getResources } from '@/lib/mdx'

export default function ResourcesPage() {
  const resources = getResources()

  return (
    <div className="section pt-24">
      <span className="accent-line" />
      <h1 className="section-heading">Resources</h1>
      <p className="mb-12" style={{ color: '#888888' }}>
        Free guides, checklists, and templates to help defense contractors
        navigate CMMC and NIST 800-171 compliance.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((r) => (
          <div key={r.slug} className="card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="tag">{r.category}</span>
              <span className="tag-accent">{r.free ? 'FREE' : 'PREMIUM'}</span>
            </div>
            <h2
              className="font-black text-xl mb-2"
              style={{ color: '#F5F5F5' }}
            >
              {r.title}
            </h2>
            <p
              className="text-sm leading-relaxed mb-6 flex-1"
              style={{ color: '#888888' }}
            >
              {r.description}
            </p>
            {r.fileUrl ? (
              <a
                href={r.fileUrl}
                download
                className="btn-primary text-sm justify-center"
              >
                <Download className="w-4 h-4" /> Download Free
              </a>
            ) : (
              <span className="tag text-center">Coming Soon</span>
            )}
          </div>
        ))}
      </div>

      {resources.length === 0 && (
        <p style={{ color: '#888888' }}>Resources coming soon.</p>
      )}
    </div>
  )
}
