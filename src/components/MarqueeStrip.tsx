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
            style={{ backgroundColor: '#274C77', color: '#FFFFFF' }}
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
      className="py-8 px-0 border-b"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#D4DCE2', overflow: 'hidden' }}
    >
      <Row />
      <Row reverse />
    </section>
  )
}
