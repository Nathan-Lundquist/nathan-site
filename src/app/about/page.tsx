import { Shield, Award, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
    <div style={{ backgroundColor: '#EFEFEF', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: '#EFEFEF' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: '#999999' }}>
            About me
          </p>
          <h1
            className="font-black leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#0A0A0A' }}
          >
            Nathan Lundquist
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#666666' }}>
            Cybersecurity professional specializing in CMMC Level 2 assessment preparation
            and NIST SP 800-171 compliance for defense contractors.
          </p>
        </div>
      </section>

      {/* Bio + Credentials */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Bio */}
          <div className="md:col-span-2 space-y-5 leading-relaxed" style={{ color: '#555555' }}>
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
                style={{ color: '#8C7A6B' }}
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
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full"
                style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
              >
                Work With Me <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Credentials */}
          <div>
            <h2
              className="font-black text-lg mb-5 flex items-center gap-2"
              style={{ color: '#111111' }}
            >
              <Award className="w-5 h-5" style={{ color: '#444444' }} />
              Credentials
            </h2>
            <ul className="space-y-3 mb-8">
              {certifications.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: '#555555' }}
                >
                  <Shield
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: '#444444' }}
                  />
                  {c}
                </li>
              ))}
            </ul>

            {/* Quick stats */}
            <div
              className="rounded-2xl p-5 space-y-4"
              style={{ backgroundColor: '#F9F9F9', border: '1px solid #E5E5E5' }}
            >
              <div>
                <p className="text-3xl font-black" style={{ color: '#0A0A0A' }}>10+</p>
                <p className="text-sm" style={{ color: '#888888' }}>Years of experience</p>
              </div>
              <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '1rem' }}>
                <p className="text-3xl font-black" style={{ color: '#0A0A0A' }}>50+</p>
                <p className="text-sm" style={{ color: '#888888' }}>Defense contractors helped</p>
              </div>
              <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '1rem' }}>
                <p className="text-sm font-bold" style={{ color: '#8C7A6B' }}>PCShards</p>
                <p className="text-sm" style={{ color: '#888888' }}>Via pcshards.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise grid */}
      <section className="py-16 px-6" style={{ backgroundColor: '#F9F9F9' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-16 mb-12">
            <p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#999999' }}>
              Expertise
            </p>
            <div>
              <h2
                className="font-black leading-tight mb-3"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#111111' }}
              >
                <Briefcase className="inline w-7 h-7 mr-2 mb-1" style={{ color: '#444444' }} />
                Areas of Expertise
              </h2>
              <p style={{ color: '#666666' }}>
                Deep specialization across all CMMC and NIST 800-171 domains.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {expertise.map((e) => (
              <div
                key={e.label}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
              >
                <h3 className="font-black mb-2" style={{ color: '#8C7A6B' }}>
                  {e.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
