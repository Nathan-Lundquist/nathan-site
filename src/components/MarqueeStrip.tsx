const items = [
  'CMMC-AB',
  'NIST SP 800-171',
  'DoD DFARS',
  'CUI Registry',
  'C3PAO Ready',
  'CMMC Level 2',
  'Zero Trust',
  'DFARS 252.204-7012',
  'POAM',
  'SSP',
]

function Row({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-2">
      <div
        className={reverse ? 'marquee-row-reverse' : 'marquee-row'}
        style={{ display: 'flex', gap: '0.75rem', width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{ backgroundColor: '#EEF2F8', color: '#274C77', border: '1px solid #D4DCE2' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <section
      className="py-8 px-0"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #D4DCE2',
        borderBottom: '1px solid #D4DCE2',
        overflow: 'hidden',
      }}
    >
      <p className="text-center text-xs uppercase tracking-widest font-medium text-gray-400 mb-6 px-6">
        Trusted by Defense Contractors
      </p>
      <Row />
      <Row reverse />
    </section>
  )
}
