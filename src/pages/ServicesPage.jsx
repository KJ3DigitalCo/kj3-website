import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import PricingTable from '../components/PricingTable.jsx'
import { SERVICES } from '../data/services.jsx'

export default function ServicesPage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const target = document.getElementById(location.hash.slice(1))
    if (target) target.scrollIntoView({ block: 'start' })
  }, [location.hash])

  return (
    <>
      <section className="bg-pine-deep pb-20 pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
              Services
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-paper sm:text-5xl">
              Everything we do for your business online.
            </h1>
            <p className="mt-5 font-sans text-base leading-relaxed text-paper/70 sm:text-lg">
              Pick one service or bundle them together — every engagement gets the same
              strategist-checked quality.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-manila py-20">
        <div className="mx-auto max-w-4xl px-6">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.slug}
              id={service.slug}
              delay={(index % 3) * 80}
              className="scroll-mt-28 border-b border-line py-12 first:pt-0 last:border-b-0"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pine text-paper">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {service.icon}
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-marigold font-mono text-xs text-marigold-ink">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                      {service.title}
                    </h2>
                  </div>
                  <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-ink-muted">
                    {service.description}
                  </p>
                  <PricingTable pricing={service.pricing} />
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal className="mt-16 flex flex-col items-center gap-4 text-center">
            <h2 className="font-display text-2xl font-bold text-ink">
              Not sure what you need yet?
            </h2>
            <p className="max-w-md font-sans text-base text-ink-muted">
              Tell us about your business and we'll recommend a starting point — no pressure,
              no jargon.
            </p>
            <MagneticButton
              href="/#contact"
              className="mt-2 rounded-full bg-pine px-8 py-3.5 font-sans text-sm font-semibold text-paper hover:bg-pine-mid"
            >
              Get a Free Quote
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
