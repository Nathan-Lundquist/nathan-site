import { Award } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const certifications = [
  'CyberAB Registered Practitioner (RP) — Jan 2026',
  'CMMC Certified Professional (CCP) — Sep 2025',
  'B.S. Information Technology, Oakland University',
]

const expertise = [
  { label: 'Security Risk Assessment', desc: 'Systematic identification, analysis, and prioritization of risks aligned to NIST SP 800-30 and ISO 31000.' },
  { label: 'SOC 2 Compliance', desc: 'Type I and Type II readiness support across all Trust Service Criteria — from gap analysis to audit day.' },
  { label: 'ISO 27001', desc: 'Gap analysis and implementation guidance for the international information security management standard.' },
  { label: 'HIPAA Security Rule', desc: 'Technical, administrative, and physical safeguards for covered entities and their business associates.' },
  { label: 'NIST CSF & 800-53', desc: 'Mapping and implementing controls across the Identify, Protect, Detect, Respond, and Recover functions.' },
  { label: 'Security Program Dev', desc: 'Policies, procedures, and governance frameworks designed to be practical — and actually used by your team.' },
]

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#E8F4FD', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: '#E8F4FD' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#006FC6' }}>
            About Nathan
          </p>
          <h1
            className="font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#1A1A1A' }}
          >
            Nathan Lundquist
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#333333' }}>
            Information Security Analyst at PCShards — a Managed Security Service Provider
            based in Metro Detroit. I help growing organizations build practical security
            programs they can actually maintain.
          </p>
        </div>
      </section>

      {/* Bio + Credentials */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Bio */}
          <div className="md:col-span-2 space-y-5 leading-relaxed" style={{ color: '#333333' }}>
            <p>
              I&apos;m Nathan Lundquist — an Information Security Analyst at{' '}
              <a
                href="https://pcshards.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
                style={{ color: '#006FC6' }}
              >
                PCShards
              </a>
              , a Managed Security Service Provider based out of Shelby Township
              in the Metro Detroit area. I specialize in helping SMBs and enterprises
              build security programs that are practical, achievable, and built to last.
            </p>
            <p>
              With 5+ years in information security, my work spans risk assessments,
              compliance readiness across frameworks like SOC 2, ISO 27001, HIPAA, and
              NIST CSF, and end-to-end security program development. I&apos;ve helped
              over 50 organizations achieve their security goals — most on the first attempt.
            </p>
            <p>
              My path into security started on the development side. I was building software
              to track compliance frameworks when I realized my real passion wasn&apos;t the
              code — it was the policies themselves. That shift took me from software engineering
              into security consulting, where I could put that knowledge to work directly for
              the organizations navigating these requirements.
            </p>
            <p>
              What I find most rewarding is helping teams actually understand their security
              posture — breaking complex requirements into language that makes sense for their
              business, so security feels achievable instead of overwhelming.
            </p>
            <div className="pt-4">
              <Link href="/contact" className="btn-primary w-fit">
                Work With Nathan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Credentials */}
          <div>
            <h2
              className="font-bold text-xs uppercase tracking-[0.15em] mb-5 flex items-center gap-2"
              style={{ color: '#646464' }}
            >
              <Award className="w-4 h-4" style={{ color: '#006FC6' }} />
              Credentials
            </h2>
            <ul className="space-y-3 mb-8">
              {certifications.map((c) => (
                <li
                  key={c}
                  className="text-sm"
                  style={{ color: '#333333', borderLeft: '2px solid #006FC6', paddingLeft: '12px' }}
                >
                  {c}
                </li>
              ))}
            </ul>

            {/* Stats block */}
            <div style={{ backgroundColor: '#006FC6' }} className="p-6">
              <div className="mb-5">
                <p className="text-3xl font-bold text-white leading-none">5+</p>
                <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>Years of experience</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1.25rem' }} className="mb-5">
                <p className="text-2xl font-bold text-white leading-none">50+</p>
                <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>Clients served</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1.25rem' }}>
                <p className="text-sm font-bold text-white">Metro Detroit, MI</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>PCShards · Shelby Township</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise grid */}
      <section className="py-16 px-6" style={{ backgroundColor: '#E8F4FD' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#006FC6' }}>
              Expertise
            </p>
            <h2
              className="font-bold leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#1A1A1A' }}
            >
              Areas of Expertise
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {expertise.map((e) => (
              <div
                key={e.label}
                className="p-6"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
              >
                <h3 className="font-bold mb-2 text-sm uppercase tracking-[0.1em]" style={{ color: '#006FC6' }}>
                  {e.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#646464' }}>
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
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
                Ready to build your security program?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)' }}>
                Get hands-on guidance tailored to your environment and compliance requirements.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-bold px-6 py-3 shrink-0 text-sm"
              style={{ backgroundColor: '#FFFFFF', color: '#006FC6' }}
            >
              Get a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
