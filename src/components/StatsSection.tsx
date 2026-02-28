'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const stats = [
  { value: 5,   suffix: '+', label: 'Years Experience' },
  { value: 50,  suffix: '+', label: 'Clients Served' },
  { value: 110, suffix: '',  label: 'NIST Practices' },
  { value: 3,   suffix: '',  label: 'Assessment Levels' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      setCount(value)
      return
    }
    let start = 0
    const duration = 1200
    const step = 16
    const increment = value / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, step)
    return () => clearInterval(timer)
  }, [inView, value, reducedMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section
      className="py-16 px-6"
      style={{ backgroundColor: '#1A2F4A' }}
      aria-label="Company statistics"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center${i < stats.length - 1 ? ' md:border-r' : ''}`}
              style={{ borderColor: 'rgba(163,206,241,0.15)' }}
            >
              <p
                className="font-black leading-none mb-2"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#FFFFFF' }}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p
                className="text-sm font-medium uppercase tracking-wider"
                style={{ color: '#A3CEF1' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
