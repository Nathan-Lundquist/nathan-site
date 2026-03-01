import Link from 'next/link'
import { ClipboardCheck, Search, ShieldCheck, ArrowRight } from 'lucide-react'

const services = [
  {
    number: '01',
    icon: Search,
    title: 'Security Assessment & Gap Analysis',
    description:
      'A comprehensive analysis of your current security posture against industry frameworks like NIST CSF, ISO 27001, or CIS Controls. You get a clear picture of where you stand, what risks exist, and a prioritized roadmap to address them — no guesswork.',
    deliverables: [
      'Risk Assessment Report',
      'Gap Analysis',
      'Asset Inventory',
      'Threat Modeling',
      'Executive Summary',
      'Remediation Roadmap',
    ],
  },
  {
    number: '02',
    icon: ClipboardCheck,
    title: 'Compliance Readiness',
    description:
      'End-to-end readiness support for SOC 2, ISO 27001, HIPAA, NIST CSF, PCI-DSS, CMMC, and more. I help you walk into your audit confident — not scrambling. Includes gap analysis, policy development, evidence preparation, and mock assessments.',
    deliverables: [
      'Compliance Gap Report',
      'Policy & Procedure Templates',
      'Control Evidence Package',
      'Audit Preparation',
      'Mock Assessment',
      'Remediation Tracker',
    ],
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Security Program Development',
    description:
      'Ongoing security support including policy development, control implementation guidance, security awareness training, and continuous compliance management. Ideal for organizations building their security program from the ground up or maturing an existing one.',
    deliverables: [
      'Security Program Charter',
      'Policy & Procedure Library',
      'Security Awareness Training',
      'Quarterly Review Sessions',
      'Vendor Risk Assessment',
      'Incident Response Plan',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: '#E8F4FD', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: '#E8F4FD' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#006FC6' }}>
            What I offer
          </p>
          <h1
            className="font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#1A1A1A' }}
          >
            Services
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#333333' }}>
            All consulting engagements are delivered through{' '}
            <a
              href="https://pcshards.com"
              className="font-bold hover:underline"
              style={{ color: '#006FC6' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              PCShards
            </a>
            . I work with organizations of all sizes — from small businesses to
            mid-market enterprises across every industry.
          </p>
        </div>
      </section>

      {/* Services numbered list */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          {services.map((s, i) => (
            <div key={s.number}>
              <div className="grid md:grid-cols-[80px_56px_1fr] gap-8 py-10 items-start">
                {/* Number */}
                <span
                  className="text-5xl font-bold leading-none"
                  style={{ color: '#E5E5E5' }}
                >
                  {s.number}
                </span>
                {/* Icon */}
                <s.icon className="w-7 h-7 mt-1" style={{ color: '#006FC6' }} />
                {/* Content */}
                <div>
                  <h2
                    className="font-bold text-2xl mb-3"
                    style={{ color: '#1A1A1A' }}
                  >
                    {s.title}
                  </h2>
                  <p className="leading-relaxed mb-6" style={{ color: '#333333' }}>
                    {s.description}
                  </p>
                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-[0.15em] mb-3"
                      style={{ color: '#646464' }}
                    >
                      Deliverables
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {s.deliverables.map((d) => (
                        <span
                          key={d}
                          className="text-xs font-bold uppercase tracking-wider px-3 py-1"
                          style={{ backgroundColor: '#E8F4FD', color: '#006FC6' }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {i < services.length - 1 && (
                <div style={{ borderTop: '1px solid #E5E5E5' }} />
              )}
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
                Ready to strengthen your security posture?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)' }}>
                Let&apos;s discuss your environment and build a plan that actually works
                for your organization.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-bold px-6 py-3 shrink-0 text-sm"
              style={{ backgroundColor: '#FFFFFF', color: '#006FC6' }}
            >
              Schedule a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
