const items = [
  'ISO 27001', 'SOC 2 Type II', 'NIST CSF', 'HIPAA', 'PCI-DSS',
  'NIST 800-53', 'CIS Controls', 'GDPR Readiness', 'FedRAMP',
  'CMMC L2', 'PCI-DSS v4', 'ISO 27701',
]

function Row() {
  return (
    <div className="flex items-center gap-4 shrink-0">
      {items.map((item) => (
        <span
          key={item}
          className="whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-widest shrink-0"
          style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <section className="py-10 overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}>
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#006FC6' }}>
        Trusted by Organizations Across Industries
      </p>
      <div className="flex">
        <div className="flex animate-marquee gap-4">
          <Row /><Row />
        </div>
      </div>
    </section>
  )
}
