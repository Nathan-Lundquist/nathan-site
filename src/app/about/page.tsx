import { Shield, Award, Briefcase } from 'lucide-react'
import Link from 'next/link'

const certifications = [
  'CMMC Registered Practitioner (RP)',
  'NIST SP 800-171 Implementation Specialist',
  'CUI Program Specialist',
  'DoD Contractor Compliance Advisor',
]

const expertise = [
  { label: 'CMMC Level 1 & 2', desc: 'Assessment prep, gap analysis, and remediation for DIB contractors' },
  { label: 'NIST 800-171 Rev 2', desc: 'All 110 practices across 14 families — implementation and documentation' },
  { label: 'System Security Plans', desc: 'Writing and reviewing SSPs that actually hold up to assessor scrutiny' },
  { label: 'POAM Development', desc: 'Realistic, defensible Plans of Action & Milestones' },
  { label: 'CUI Identification & Scoping', desc: 'Defining what you protect and where it lives' },
  { label: 'Vendor & Supply Chain', desc: 'Flow-down requirements and subcontractor compliance support' },
]

export default function AboutPage() {
  return (
    <div className="section pt-24">
      <span className="accent-line" />
      <h1 className="section-heading">About Nathan</h1>

      <div className="grid md:grid-cols-3 gap-12 mb-16">
        {/* Bio */}
        <div
          className="md:col-span-2 space-y-5 leading-relaxed"
          style={{ color: '#888888' }}
        >
          <p>
            I&apos;m Nathan Lundquist — a cybersecurity professional with over a
            decade of experience helping organizations protect sensitive
            information and navigate complex compliance frameworks.
          </p>
          <p>
            I specialize in CMMC Level 2 assessment preparation and NIST SP
            800-171 compliance for defense contractors and organizations
            handling Controlled Unclassified Information (CUI). Through my
            company{' '}
            <a
              href="https://pcshards.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
              style={{ color: '#FF6B00' }}
            >
              PCShards
            </a>
            , I provide hands-on consulting that goes beyond checklists — I
            help you understand what compliance means for your specific
            environment and build sustainable security practices.
          </p>
          <p>
            My approach is direct and practical. I&apos;ve seen too many
            organizations fail assessments because they focused on paperwork
            instead of actual security posture. I help you get both right.
          </p>
          <p>
            Before focusing exclusively on compliance consulting, I worked
            across a range of cybersecurity roles including network security,
            incident response, and security program management. That
            breadth of experience means I understand your environment — not
            just the requirements.
          </p>
        </div>

        {/* Credentials */}
        <div>
          <h2
            className="font-black text-xl mb-4 flex items-center gap-2"
            style={{ color: '#F5F5F5' }}
          >
            <Award className="w-5 h-5" style={{ color: '#FF6B00' }} />{' '}
            Credentials
          </h2>
          <ul className="space-y-3 mb-8">
            {certifications.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2 text-sm"
                style={{ color: '#888888' }}
              >
                <Shield
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: '#FF6B00' }}
                />
                {c}
              </li>
            ))}
          </ul>

          <Link href="/contact" className="btn-primary text-sm w-full justify-center">
            Work With Me
          </Link>
        </div>
      </div>

      {/* Expertise grid */}
      <div style={{ borderTop: '1px solid #222222', paddingTop: '3rem' }}>
        <h2
          className="font-black text-2xl mb-8 flex items-center gap-2"
          style={{ color: '#F5F5F5' }}
        >
          <Briefcase className="w-6 h-6" style={{ color: '#FF6B00' }} />{' '}
          Areas of Expertise
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {expertise.map((e) => (
            <div
              key={e.label}
              className="card p-5"
            >
              <h3
                className="font-black mb-1"
                style={{ color: '#FF6B00' }}
              >
                {e.label}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
                {e.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
