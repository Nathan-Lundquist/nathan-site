'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

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
    bg-[#111111] border border-[#222222] text-[#F5F5F5]
    focus:border-[#FF6B00] placeholder:text-[#555555]
  `

  return (
    <div className="section pt-24">
      <span className="accent-line" />
      <h1 className="section-heading">Get a Consultation</h1>

      <div className="grid md:grid-cols-3 gap-16">
        {/* Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="card p-12 text-center">
              <CheckCircle
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: '#FF6B00' }}
              />
              <h2
                className="font-black text-2xl mb-2"
                style={{ color: '#F5F5F5' }}
              >
                Message Received
              </h2>
              <p style={{ color: '#888888' }}>
                I&apos;ll be in touch within 1 business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {error && (
                <div
                  className="flex items-start gap-3 p-4 text-sm"
                  style={{
                    backgroundColor: 'rgba(255,107,0,0.1)',
                    border: '1px solid rgba(255,107,0,0.3)',
                    color: '#FF6B00',
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
                    style={{ color: '#F5F5F5' }}
                  >
                    Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-xs mt-1" style={{ color: '#FF6B00' }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-bold mb-2"
                    style={{ color: '#F5F5F5' }}
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
                    <p className="text-xs mt-1" style={{ color: '#FF6B00' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-bold mb-2"
                  style={{ color: '#F5F5F5' }}
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
                  style={{ color: '#F5F5F5' }}
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
                  <p className="text-xs mt-1" style={{ color: '#FF6B00' }}>
                    {errors.service.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-bold mb-2"
                  style={{ color: '#F5F5F5' }}
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
                  <p className="text-xs mt-1" style={{ color: '#FF6B00' }}>
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
        <div className="space-y-6">
          <div>
            <h2
              className="font-black text-xl mb-4"
              style={{ color: '#F5F5F5' }}
            >
              Contact Info
            </h2>
            <a
              href="mailto:nathan@pcshards.com"
              className="flex items-center gap-2 text-sm transition-colors hover:text-[#FF6B00]"
              style={{ color: '#888888' }}
            >
              <Mail className="w-4 h-4" style={{ color: '#FF6B00' }} />
              nathan@pcshards.com
            </a>
          </div>

          <div className="card p-5">
            <h3
              className="font-black mb-1 text-sm"
              style={{ color: '#F5F5F5' }}
            >
              Response Time
            </h3>
            <p className="text-sm" style={{ color: '#888888' }}>
              I respond to all inquiries within 1 business day.
            </p>
          </div>

          <div className="card p-5">
            <h3
              className="font-black mb-1 text-sm"
              style={{ color: '#F5F5F5' }}
            >
              Engagements via PCShards
            </h3>
            <p className="text-sm" style={{ color: '#888888' }}>
              All work is contracted through{' '}
              <a
                href="https://pcshards.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
                style={{ color: '#FF6B00' }}
              >
                PCShards
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
