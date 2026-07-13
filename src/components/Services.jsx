import { useState } from 'react'
import Reveal from './Reveal.jsx'
import MagneticButton from './MagneticButton.jsx'
import { SERVICES } from '../data/services.jsx'

const CARD_COLORS = ['#e8b923', '#3b82f6', '#f472b6', '#10b981', '#8b5cf6', '#f97316', '#ef4444']

function ServiceRow({ service, index }) {
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const color = CARD_COLORS[index % CARD_COLORS.length]

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPos({ x: event.clientX - rect.left, y: event.clientY - rect.top })
  }

  return (
    <a
      href={`/services#${service.slug}`}
      className="group relative flex flex-col gap-3 border-b border-paper/10 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMove}
    >
      <div className="flex items-baseline gap-4 sm:gap-6">
        <span className="font-mono text-xs text-paper/40">{String(index + 1).padStart(2, '0')}</span>
        <span className="font-display text-2xl font-bold text-paper transition-colors duration-200 group-hover:text-marigold sm:text-3xl">
          {service.title}
        </span>
      </div>
      <div className="flex items-center gap-4 pl-9 sm:pl-0">
        <p className="max-w-xs font-sans text-sm text-paper/60 sm:text-right">{service.summary}</p>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-paper/20 text-paper transition-all duration-200 group-hover:border-marigold group-hover:bg-marigold group-hover:text-pine-deep">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17L17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {hover && (
        <div
          className="pointer-events-none absolute z-20 hidden h-52 w-60 -translate-x-1/2 -translate-y-1/2 flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-2xl sm:flex"
          style={{ left: pos.x, top: pos.y, backgroundColor: color }}
        >
          <span className="relative font-mono text-xs font-semibold uppercase tracking-[0.15em] text-pine-deep/70">
            {String(index + 1).padStart(2, '0')} / Service
          </span>
          <svg
            className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 text-pine-deep/10"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            {service.icon}
          </svg>
          <span className="relative font-display text-lg font-bold leading-tight text-pine-deep">
            {service.title}
          </span>
        </div>
      )}
    </a>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-pine-deep py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
              What we do
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">
              Everything your business needs online, under one roof.
            </h2>
          </div>
          <MagneticButton
            href="/services"
            className="inline-flex w-fit items-center rounded-full border border-paper/30 px-5 py-2.5 font-sans text-sm font-semibold text-paper hover:border-marigold hover:bg-marigold hover:text-pine-deep"
          >
            All services
          </MagneticButton>
        </Reveal>

        <div className="mt-10 border-t border-paper/10">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 60}>
              <ServiceRow service={service} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="font-sans text-base text-paper/70">
            Not sure what you need yet? Tell us about your business and we'll recommend a starting point.
          </p>
          <MagneticButton
            href="#contact"
            className="rounded-full bg-marigold px-8 py-3.5 font-sans text-sm font-semibold text-pine-deep hover:bg-marigold-deep"
          >
            Get a Free Quote
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
