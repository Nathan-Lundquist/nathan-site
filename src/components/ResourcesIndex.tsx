'use client'
import { useState, useMemo } from 'react'
import { Download, Search, X } from 'lucide-react'
import type { Resource } from '@/lib/mdx'

interface Props {
  resources: Resource[]
}

export default function ResourcesIndex({ resources }: Props) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(resources.map((r) => r.category))).sort()
    return ['All', ...cats]
  }, [resources])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: resources.length }
    resources.forEach((r) => {
      counts[r.category] = (counts[r.category] ?? 0) + 1
    })
    return counts
  }, [resources])

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesCategory = activeCategory === 'All' || r.category === activeCategory
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [resources, query, activeCategory])

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-5">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: '#646464' }}
        />
        <input
          type="text"
          placeholder="Search by title, topic, or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-10 py-3 text-sm outline-none transition-colors bg-[#F9FAFB] border border-[#E5E5E5] text-[#1A1A1A] focus:border-[#006FC6] placeholder:text-[#AAAAAA]"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" style={{ color: '#646464' }} />
          </button>
        )}
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="text-xs font-bold uppercase tracking-wider px-4 py-2 transition-colors"
            style={
              activeCategory === cat
                ? { backgroundColor: '#006FC6', color: '#FFFFFF' }
                : { backgroundColor: '#E8F4FD', color: '#006FC6', border: '1px solid #B3D7F5' }
            }
          >
            {cat}
            <span
              className="ml-1.5 opacity-60 font-normal normal-case tracking-normal"
              style={{ fontSize: '11px' }}
            >
              {categoryCounts[cat] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <p
        className="text-xs font-bold uppercase tracking-[0.12em] mb-6"
        style={{ color: '#646464' }}
      >
        {filtered.length === resources.length
          ? `${resources.length} resource${resources.length !== 1 ? 's' : ''}`
          : `${filtered.length} of ${resources.length} resources`}
        {query && (
          <span className="ml-2 normal-case font-normal tracking-normal" style={{ color: '#AAAAAA' }}>
            for &ldquo;{query}&rdquo;
          </span>
        )}
      </p>

      {/* No results */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center" style={{ border: '1px solid #E5E5E5' }}>
          <p className="font-bold text-sm uppercase tracking-[0.1em] mb-2" style={{ color: '#1A1A1A' }}>
            No results found
          </p>
          <p className="text-sm" style={{ color: '#646464' }}>
            Try a different keyword or select a different category.
          </p>
          <button
            onClick={() => { setQuery(''); setActiveCategory('All') }}
            className="mt-4 text-xs font-bold uppercase tracking-wider underline"
            style={{ color: '#006FC6' }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        /* Resources grid */
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((r) => (
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
                  {r.free ? 'Free' : 'Premium'}
                </span>
              </div>

              <h2
                className="font-bold text-lg mb-2 leading-snug flex-1"
                style={{ color: '#1A1A1A' }}
              >
                {r.title}
              </h2>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: '#646464' }}
              >
                {r.description}
              </p>

              {r.fileUrl ? (
                <a
                  href={r.fileUrl}
                  download
                  className="inline-flex items-center justify-center gap-2 font-bold text-sm px-4 py-3 transition-opacity hover:opacity-90"
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
  )
}
