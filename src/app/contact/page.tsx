'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, ArrowRight, CheckCircle, AlertCircle, Clock, Shield } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  service: string
  message: string
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email nathan@pcshards.com directly.')
    }
  }

  const inputClass = `
    w-full px-4 py-3 text-sm outline-none transition-colors rounded-xl
    bg-[#F9F9F9] border border-[#E5E5E5] text-[#0A0A0A]
    focus:border-[#0A0A0A] placeholder:text-[#AAAAAA]
  `

  return (
    <div style={{ backgroundColor: '#EFEFEF', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: '#EFEFEF' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: '#999999' }}>
            Let&apos;s talk
          </p>
          <h1
            className="font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#0A0A0A' }}
          >
            Get a Consultation
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: '#666666' }}>
            Tell me about your environment and I&apos;ll put together a practical
            plan to get you compliant.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div
                className="rounded-3xl p-12 text-center"
                style={{ backgroundColor: '#F9F9F9', border: '1px solid #E5E5E5' }}
              >
                <CheckCircle
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: '#22C55E' }}
                />
                <h2
                  className="font-black text-2xl mb-2"
                  style={{ color: '#0A0A0A' }}
                >
                  Message Received
                </h2>
                <p style={{ color: '#666666' }}>
                  I&apos;ll be in touch within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {error && (
                  <div
                    className="flex items-start gap-3 p-4 text-sm rounded-xl"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      border: '1px solid rgba(0,0,0,0.2)',
                      color: '#333333',
                    }}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      style={{ color: '#333333' }}
                    >
                      Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                    {errors.name && (
                      <p className="text-xs mt-1" style={{ color: '#333333' }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      style={{ color: '#333333' }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email',
                        },
                      })}
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className="text-xs mt-1" style={{ color: '#333333' }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-bold mb-2"
                    style={{ color: '#333333' }}
                  >
                    Company
                  </label>
                  <input
                    {...register('company')}
                    placeholder="Your organization name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-bold mb-2"
                    style={{ color: '#333333' }}
                  >
                    Service Needed *
                  </label>
                  <select
                    {...register('service', {
                      required: 'Please select a service',
                    })}
                    className={inputClass}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Select a service</option>
                    <option value="CMMC Level 2 Assessment Prep">
                      CMMC Level 2 Assessment Prep
                    </option>
                    <option value="NIST 800-171 Gap Analysis">
                      NIST 800-171 Gap Analysis
                    </option>
                    <option value="Compliance Roadmap & Remediation">
                      Compliance Roadmap &amp; Remediation
                    </option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  {errors.service && (
                    <p className="text-xs mt-1" style={{ color: '#333333' }}>
                      {errors.service.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-bold mb-2"
                    style={{ color: '#333333' }}
                  >
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={5}
                    placeholder="Tell me about your environment, current compliance challenges, and timeline..."
                    className={inputClass}
                    style={{ resize: 'none' }}
                  />
                  {errors.message && (
                    <p className="text-xs mt-1" style={{ color: '#333333' }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 w-full font-semibold px-6 py-3.5 rounded-full transition-opacity text-sm"
                  style={{
                    backgroundColor: '#0A0A0A',
                    color: '#FFFFFF',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div>
              <h2
                className="font-black text-lg mb-4"
                style={{ color: '#111111' }}
              >
                Contact Info
              </h2>
              <a
                href="mailto:nathan@pcshards.com"
                className="flex items-center gap-2 text-sm transition-colors hover:text-[#111111]"
                style={{ color: '#555555' }}
              >
                <Mail className="w-4 h-4" style={{ color: '#444444' }} />
                nathan@pcshards.com
              </a>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: '#F9F9F9', border: '1px solid #E5E5E5' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" style={{ color: '#444444' }} />
                <h3 className="font-black text-sm" style={{ color: '#111111' }}>
                  Response Time
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#666666' }}>
                I respond to all inquiries within 1 business day.
              </p>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: '#F9F9F9', border: '1px solid #E5E5E5' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4" style={{ color: '#444444' }} />
                <h3 className="font-black text-sm" style={{ color: '#111111' }}>
                  Engagements via PCShards
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#666666' }}>
                All work is contracted through{' '}
                <a
                  href="https://pcshards.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:underline"
                  style={{ color: '#8C7A6B' }}
                >
                  PCShards
                </a>
                .
              </p>
            </div>

            {/* Quick trust badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['CMMC RP', 'NIST 800-171', 'DoD DIB'].map((b) => (
                <span
                  key={b}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#F0EDE9', color: '#8C7A6B', border: '1px solid rgba(140,122,107,0.2)' }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
