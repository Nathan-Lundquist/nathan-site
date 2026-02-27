import Link from 'next/link'
import { ClipboardCheck, Search, Map, ArrowRight } from 'lucide-react'

const services = [
  {
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
    <div className="section pt-24">
      <span className="accent-line" />
      <h1 className="section-heading">Services</h1>
      <p className="max-w-2xl mb-16 leading-relaxed" style={{ color: '#888888' }}>
        All consulting engagements are delivered through{' '}
        <a
          href="https://pcshards.com"
          className="font-bold hover:underline"
          style={{ color: '#FF6B00' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          PCShards
        </a>
        . I work with defense contractors of all sizes — from small machine
        shops to mid-size manufacturers.
      </p>

      <div className="space-y-6 mb-16">
        {services.map((s) => (
          <div key={s.title} className="card p-8">
            <div className="flex items-start gap-6">
              <s.icon
                className="w-10 h-10 shrink-0 mt-1"
                style={{ color: '#FF6B00' }}
              />
              <div className="flex-1">
                <h2
                  className="font-black text-2xl mb-3"
                  style={{ color: '#F5F5F5' }}
                >
                  {s.title}
                </h2>
                <p className="leading-relaxed mb-6" style={{ color: '#888888' }}>
                  {s.description}
                </p>
                <div>
                  <p
                    className="text-xs font-mono uppercase tracking-widest mb-3"
                    style={{ color: '#888888' }}
                  >
                    Deliverables
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.deliverables.map((d) => (
                      <span key={d} className="tag">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA block */}
      <div className="card p-10 text-center">
        <h2
          className="font-black text-3xl mb-4"
          style={{ color: '#F5F5F5' }}
        >
          Ready to Get Compliant?
        </h2>
        <p className="mb-8 max-w-md mx-auto" style={{ color: '#888888' }}>
          Let&apos;s discuss your environment and build a plan that actually works
          for your organization.
        </p>
        <Link href="/contact" className="btn-primary text-base">
          Schedule a Consultation <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
