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
    w-full px-4 py-3 text-sm outline-none transition-colors
    bg-[#F9FAFB] border border-[#E5E5E5] text-[#1A1A1A]
    focus:border-[#006FC6] placeholder:text-[#AAAAAA]
  `

  return (
    <div style={{ backgroundColor: '#E8F4FD', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: '#E8F4FD' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#006FC6' }}>
            Let&apos;s talk
          </p>
          <h1
            className="font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#1A1A1A' }}
          >
            Get a Consultation
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: '#333333' }}>
            Tell me about your environment and I&apos;ll put together a practical
            plan to get you to a stronger security posture.
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
                className="p-12 text-center"
                style={{ backgroundColor: '#E8F4FD', border: '1px solid #B3D7F5' }}
              >
                <CheckCircle
                  className="w-14 h-14 mx-auto mb-4"
                  style={{ color: '#006FC6' }}
                />
                <h2
                  className="font-bold text-2xl mb-2"
                  style={{ color: '#1A1A1A' }}
                >
                  Message Received
                </h2>
                <p style={{ color: '#646464' }}>
                  I&apos;ll be in touch within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {error && (
                  <div
                    className="flex items-start gap-3 p-4 text-sm"
                    style={{
                      backgroundColor: '#FEF2F2',
                      border: '1px solid #FECACA',
                      color: '#DC2626',
                    }}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-xs font-bold uppercase tracking-[0.1em] mb-2"
                      style={{ color: '#1A1A1A' }}
                    >
                      Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                    {errors.name && (
                      <p className="text-xs mt-1" style={{ color: '#DC2626' }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-xs font-bold uppercase tracking-[0.1em] mb-2"
                      style={{ color: '#1A1A1A' }}
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
                      <p className="text-xs mt-1" style={{ color: '#DC2626' }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-[0.1em] mb-2"
                    style={{ color: '#1A1A1A' }}
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
                    className="block text-xs font-bold uppercase tracking-[0.1em] mb-2"
                    style={{ color: '#1A1A1A' }}
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
                    <option value="Security Assessment & Gap Analysis">
                      Security Assessment &amp; Gap Analysis
                    </option>
                    <option value="SOC 2 Compliance Readiness">
                      SOC 2 Compliance Readiness
                    </option>
                    <option value="ISO 27001 / HIPAA / NIST">
                      ISO 27001 / HIPAA / NIST
                    </option>
                    <option value="Security Program Development">
                      Security Program Development
                    </option>
                    <option value="Ongoing Security Support">
                      Ongoing Security Support
                    </option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  {errors.service && (
                    <p className="text-xs mt-1" style={{ color: '#DC2626' }}>
                      {errors.service.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-[0.1em] mb-2"
                    style={{ color: '#1A1A1A' }}
                  >
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={5}
                    placeholder="Tell me about your environment, current security challenges, and timeline..."
                    className={inputClass}
                    style={{ resize: 'none' }}
                  />
                  {errors.message && (
                    <p className="text-xs mt-1" style={{ color: '#DC2626' }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: isSubmitting ? 0.7 : 1 }}
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
                className="font-bold text-xs uppercase tracking-[0.15em] mb-4"
                style={{ color: '#646464' }}
              >
                Contact Info
              </h2>
              <a
                href="mailto:nathan@pcshards.com"
                className="flex items-center gap-2 text-sm transition-colors hover:text-[#006FC6]"
                style={{ color: '#333333' }}
              >
                <Mail className="w-4 h-4" style={{ color: '#006FC6' }} />
                nathan@pcshards.com
              </a>
            </div>

            <div
              className="p-5"
              style={{ backgroundColor: '#E8F4FD', border: '1px solid #E5E5E5' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" style={{ color: '#006FC6' }} />
                <h3 className="font-bold text-xs uppercase tracking-[0.1em]" style={{ color: '#1A1A1A' }}>
                  Response Time
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#646464' }}>
                I respond to all inquiries within 1 business day.
              </p>
            </div>

            <div
              className="p-5"
              style={{ backgroundColor: '#E8F4FD', border: '1px solid #E5E5E5' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4" style={{ color: '#006FC6' }} />
                <h3 className="font-bold text-xs uppercase tracking-[0.1em]" style={{ color: '#1A1A1A' }}>
                  Engagements via PCShards
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#646464' }}>
                All work is contracted through{' '}
                <a
                  href="https://pcshards.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:underline"
                  style={{ color: '#006FC6' }}
                >
                  PCShards
                </a>
                .
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['SOC 2', 'ISO 27001', 'HIPAA', 'NIST CSF'].map((b) => (
                <span
                  key={b}
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1"
                  style={{ backgroundColor: '#E8F4FD', color: '#006FC6', border: '1px solid #B3D7F5' }}
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
