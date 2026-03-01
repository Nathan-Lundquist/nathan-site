import Link from 'next/link'
import { ClipboardCheck, Search, Map, ArrowRight } from 'lucide-react'

const services = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'CMMC Level 2 Assessment Prep',
    description:
      'End-to-end readiness support before your C3PAO assessment. Includes mock assessment, gap remediation, SSP review, and POAM development. I help you walk into your assessment confident — not scrambling.',
    deliverables: [
      'Gap Assessment Report',
      'SSP Review & Updates',
      'POAM Development',
      'Evidence Package Prep',
      'Mock Assessment',
    ],
  },
  {
    number: '02',
    icon: Search,
    title: 'NIST 800-171 Gap Analysis',
    description:
      'Comprehensive analysis of your current security practices against all 110 NIST 800-171 Rev 2 requirements. You get a clear picture of where you stand, what needs to change, and what order to tackle it in.',
    deliverables: [
      'Gap Analysis Report',
      'Risk Scoring by Domain',
      'Prioritized Remediation Plan',
      'Executive Summary',
      'SPRS Score Estimate',
    ],
  },
  {
    number: '03',
    icon: Map,
    title: 'Compliance Roadmap & Remediation',
    description:
      'Ongoing compliance support including technical control implementation guidance, policy development, and staff training. Ideal for organizations just starting their compliance journey or managing continuous compliance.',
    deliverables: [
      'Compliance Roadmap',
      'Policy & Procedure Templates',
      'Technical Implementation Guide',
      'Staff Awareness Training',
      'Quarterly Review Sessions',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: '#E7ECEF', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: '#E7ECEF' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: '#8F96A9' }}>
            What I offer
          </p>
          <h1
            className="font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#4768FA' }}
          >
            Services
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#8F96A9' }}>
            All consulting engagements are delivered through{' '}
            <a
              href="https://pcshards.com"
              className="font-bold hover:underline"
              style={{ color: '#6B84FB' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              PCShards
            </a>
            . I work with defense contractors of all sizes — from small machine
            shops to mid-size manufacturers.
          </p>
        </div>
      </section>

      {/* Services numbered list */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          {services.map((s, i) => (
            <div key={s.number}>
              <div className="grid md:grid-cols-[80px_60px_1fr] gap-8 py-10 items-start">
                {/* Number */}
                <span
                  className="text-5xl font-bold leading-none"
                  style={{ color: '#D3D8E9' }}
                >
                  {s.number}
                </span>
                {/* Icon */}
                <s.icon className="w-8 h-8 mt-1" style={{ color: '#444444' }} />
                {/* Content */}
                <div>
                  <h2
                    className="font-bold text-2xl mb-3"
                    style={{ color: '#4768FA' }}
                  >
                    {s.title}
                  </h2>
                  <p className="leading-relaxed mb-6" style={{ color: '#555555' }}>
                    {s.description}
                  </p>
                  <div>
                    <p
                      className="text-xs font-mono uppercase tracking-widest mb-3"
                      style={{ color: '#8F96A9' }}
                    >
                      Deliverables
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {s.deliverables.map((d) => (
                        <span
                          key={d}
                          className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ backgroundColor: '#F0F0F0', color: '#555555' }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {i < services.length - 1 && (
                <div style={{ borderTop: '1px solid #D3D8E9' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ backgroundColor: '#F0F5FA' }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl p-12 text-center"
            style={{ backgroundColor: '#4768FA' }}
          >
            <h2
              className="font-bold mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FFFFFF' }}
            >
              Ready to Get Compliant?
            </h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: '#8F96A9' }}>
              Let&apos;s discuss your environment and build a plan that actually works
              for your organization.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full"
              style={{ backgroundColor: '#FFFFFF', color: '#4768FA' }}
            >
              Schedule a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
