const items = [
  'CMMC-AB',
  'NIST SP 800-171',
  'DoD DFARS',
  'CUI Registry',
  'C3PAO Ready',
]

export default function TrustStrip() {
  return (
    <section
      className="py-10 px-6 border-b"
      style={{ backgroundColor: '#F9F9F9', borderColor: '#E5E5E5' }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs font-mono uppercase tracking-widest mb-6" style={{ color: '#8C7A6B' }}>
          Specializations &amp; Frameworks
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((item) => (
            <span
              key={item}
              className="px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: '#EEEEEE',
                color: '#333333',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
