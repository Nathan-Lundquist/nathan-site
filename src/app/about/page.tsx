import { Shield, Award, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const certifications = [
  'CyberAB Registered Practitioner (RP) — Jan 2026',
  'CMMC Certified Professional (CCP) — Sep 2025',
  'B.S. Information Technology, Oakland University',
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
    <div style={{ backgroundColor: '#E7ECEF', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: '#E7ECEF' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: '#8F96A9' }}>
            About me
          </p>
          <h1
            className="font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#4768FA' }}
          >
            Nathan Lundquist
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#8F96A9' }}>
            Information Security Analyst at PCShards — a Managed Security Service Provider
            based in Metro Detroit. I help defense contractors navigate CMMC and NIST 800-171
            so they can focus on what they do best.
          </p>
        </div>
      </section>

      {/* Bio + Credentials */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Bio */}
          <div className="md:col-span-2 space-y-5 leading-relaxed" style={{ color: '#555555' }}>
            <p>
              I&apos;m Nathan Lundquist — an Information Security Analyst at{' '}
              <a
                href="https://pcshards.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
                style={{ color: '#6B84FB' }}
              >
                PCShards
              </a>
              , a Managed Security Service Provider based out of Shelby Township
              in the Metro Detroit area. I specialize in CMMC and NIST 800-171
              compliance for defense contractors — helping them navigate the path
              to certification so they can focus on what they do best.
            </p>
            <p>
              My path into compliance started on the development side. I was
              building software to track all five levels of the original CMMC
              framework when I realized my real passion wasn&apos;t the code —
              it was the policies themselves. That shift took me from software
              engineering into compliance consulting, where I could put that
              knowledge to work directly for the organizations navigating these
              requirements.
            </p>
            <p>
              At NUDG Systems, I led a development team designing tools to help
              organizations implement and maintain NIST 800-171 controls — giving
              me hands-on experience with both the technical and policy sides of
              compliance. Today I build System Security Plans, run gap
              assessments, and guide defense contractors through the C3PAO audit
              process.
            </p>
            <p>
              What I find most rewarding is helping teams actually understand
              these policies — breaking complex requirements into language that
              makes sense for their business, so compliance feels achievable
              instead of overwhelming.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full"
                style={{ backgroundColor: '#4768FA', color: '#FFFFFF' }}
              >
                Work With Me <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Credentials */}
          <div>
            <h2
              className="font-bold text-lg mb-5 flex items-center gap-2"
              style={{ color: '#4768FA' }}
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
              style={{ backgroundColor: '#F0F5FA', border: '1px solid #D3D8E9' }}
            >
              <div>
                <p className="text-3xl font-bold" style={{ color: '#4768FA' }}>5+</p>
                <p className="text-sm" style={{ color: '#8F96A9' }}>Years of experience</p>
              </div>
              <div style={{ borderTop: '1px solid #D3D8E9', paddingTop: '1rem' }}>
                <p className="text-sm font-bold leading-snug" style={{ color: '#4768FA' }}>Metro Detroit, MI</p>
                <p className="text-sm" style={{ color: '#8F96A9' }}>Shelby Township</p>
              </div>
              <div style={{ borderTop: '1px solid #D3D8E9', paddingTop: '1rem' }}>
                <p className="text-sm font-bold" style={{ color: '#6B84FB' }}>PCShards</p>
                <p className="text-sm" style={{ color: '#8F96A9' }}>Managed Security Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise grid */}
      <section className="py-16 px-6" style={{ backgroundColor: '#F0F5FA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-16 mb-12">
            <p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#8F96A9' }}>
              Expertise
            </p>
            <div>
              <h2
                className="font-bold leading-tight mb-3"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#4768FA' }}
              >
                <Briefcase className="inline w-7 h-7 mr-2 mb-1" style={{ color: '#444444' }} />
                Areas of Expertise
              </h2>
              <p style={{ color: '#8F96A9' }}>
                Deep specialization across all CMMC and NIST 800-171 domains.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {expertise.map((e) => (
              <div
                key={e.label}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #D3D8E9' }}
              >
                <h3 className="font-bold mb-2" style={{ color: '#6B84FB' }}>
                  {e.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8F96A9' }}>
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
