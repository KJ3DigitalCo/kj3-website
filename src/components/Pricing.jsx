import { useState } from 'react'
import Reveal from './Reveal.jsx'
import MagneticButton from './MagneticButton.jsx'
import { SERVICES } from '../data/services.jsx'

const BUNDLES = [
  {
    name: 'Starter Bundle',
    price: '₱8,500',
    period: '/mo',
    description:
      'Consistent social media and steady search visibility — the essentials to start showing up online.',
    includes: [
      { label: 'Starter Social Media Management', slug: 'social-media-management', tier: 'Starter' },
      { label: 'Starter SEO', slug: 'seo', tier: 'Starter' },
    ],
  },
  {
    name: 'Growth Bundle',
    price: '₱17,000',
    period: '/mo',
    description:
      'More content, more platforms, and real SEO groundwork — for businesses ready to scale their presence.',
    includes: [
      { label: 'Growth Social Media Management', slug: 'social-media-management', tier: 'Growth' },
      { label: 'Standard SEO', slug: 'seo', tier: 'Standard' },
    ],
    featured: true,
  },
  {
    name: 'All-In Package',
    price: '₱35,000',
    period: '/mo',
    description:
      'Full social, complete SEO, and paid ads working together — for businesses ready to grow aggressively.',
    includes: [
      { label: 'Pro Social Media Management', slug: 'social-media-management', tier: 'Pro' },
      { label: 'Full SEO', slug: 'seo', tier: 'Full' },
      { label: 'Basic Paid Ads', slug: 'paid-ads-management', tier: 'Basic' },
    ],
  },
  {
    name: 'Scale Package',
    price: '₱52,000',
    period: '/mo',
    description:
      'Everything, maxed out — full social, complete SEO, advanced ads, and a chatbot that never sleeps.',
    includes: [
      { label: 'Pro Social Media Management', slug: 'social-media-management', tier: 'Pro' },
      { label: 'Full SEO', slug: 'seo', tier: 'Full' },
      { label: 'Advanced Paid Ads', slug: 'paid-ads-management', tier: 'Advanced' },
      { label: 'Chatbot Pro', slug: 'chatbot-automation', tier: 'Pro' },
    ],
  },
]

const LAUNCH = {
  name: 'Launch Package',
  price: '₱30,000',
  period: 'one-time',
  description:
    'Brand new business? Get a website, a brand identity, and a month of social media handled — all at once.',
  includes: [
    {
      label: 'Business Website',
      slug: 'website-builds',
      tier: 'Business Website',
      bonus: 'Copywriting included free, up to 5 sections.',
      note: 'Domain setup (.com) is not included — billed separately.',
    },
    { label: 'Branding Package', slug: 'content-creation', tier: 'Branding package' },
    {
      label: '1 month of Growth Social Media Management, free',
      slug: 'social-media-management',
      tier: 'Growth',
    },
  ],
}

function findServiceDetail(slug, tier) {
  const service = SERVICES.find((item) => item.slug === slug)
  if (!service) return null
  const rows = service.pricing?.packages || service.pricing?.items || []
  const row = rows.find((item) => item.name === tier)
  return { service, row }
}

export default function Pricing() {
  const [expanded, setExpanded] = useState({})

  const toggleBundle = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const launchExpanded = Boolean(expanded[LAUNCH.name])

  return (
    <section id="pricing" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold-ink">
            Pricing
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Bundles that cover your whole online presence.
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-ink-muted">
            One predictable monthly price instead of separate line items. Need just one service, or
            something in between? We'll quote it individually — just ask.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BUNDLES.map((bundle, index) => {
            const isExpanded = Boolean(expanded[bundle.name])
            return (
              <Reveal
                key={bundle.name}
                delay={(index % 4) * 80}
                className={bundle.featured ? 'relative z-10' : 'relative'}
              >
                <div
                  className={`h-full transition-transform duration-300 ${
                    bundle.featured
                      ? 'rounded-2xl p-[2px] pricing-glow-border shadow-xl shadow-marigold/20 lg:scale-110'
                      : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleBundle(bundle.name)}
                    aria-expanded={isExpanded}
                    className={`flex h-full w-full flex-col rounded-2xl p-7 text-left transition-colors ${
                      bundle.featured ? 'bg-manila' : 'border border-line bg-manila hover:border-pine/40'
                    }`}
                  >
                    {bundle.featured && (
                      <span className="mb-3 inline-flex w-fit items-center rounded-full bg-marigold px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-pine-deep">
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-display text-lg font-bold text-ink">{bundle.name}</h3>
                    <p className="mt-2 flex items-baseline gap-1">
                      <span className="font-display text-3xl font-bold text-ink">{bundle.price}</span>
                      <span className="font-sans text-sm text-ink-muted">{bundle.period}</span>
                    </p>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted">
                      {bundle.description}
                    </p>
                    <ul className="mt-5 space-y-2 border-t border-line pt-5">
                      {bundle.includes.map((item) => (
                        <li key={item.label} className="flex gap-2 font-sans text-sm text-ink">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="mt-0.5 shrink-0 text-marigold-ink"
                            aria-hidden="true"
                          >
                            <path
                              d="M5 12.5l4.5 4.5L19 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {item.label}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-4 flex items-center gap-1.5 font-sans text-xs font-semibold text-marigold-ink">
                      {isExpanded ? 'Hide full details' : 'See full details'}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isExpanded ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 border-t border-line pt-4">
                          {bundle.includes.map((item) => {
                            const detail = findServiceDetail(item.slug, item.tier)
                            if (!detail) return null
                            return (
                              <div key={item.label}>
                                <h4 className="font-display text-sm font-bold text-ink">
                                  {detail.service.title}
                                  {item.tier && (
                                    <span className="ml-1.5 font-sans text-xs font-normal text-ink-muted">
                                      · {item.tier}
                                    </span>
                                  )}
                                </h4>
                                {detail.row?.included && (
                                  <p className="mt-1 font-sans text-xs leading-relaxed text-ink-muted">
                                    {detail.row.included}
                                  </p>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="relative mt-6">
          <button
            type="button"
            onClick={() => toggleBundle(LAUNCH.name)}
            aria-expanded={launchExpanded}
            className="relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl border border-marigold/30 bg-gradient-to-br from-pine-deep via-pine to-pine-deep p-7 text-left shadow-xl shadow-marigold/10"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-marigold/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="premium-text-shadow relative">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-marigold">
                  New business · Premium
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-paper">{LAUNCH.name}</h3>
                <p className="mt-1.5 max-w-lg font-sans text-sm font-medium leading-relaxed text-paper/90">
                  {LAUNCH.description}
                </p>
                <span className="mt-3 flex items-center gap-1.5 font-sans text-xs font-semibold text-paper">
                  {launchExpanded ? 'Hide full details' : 'See full details'}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`transition-transform duration-300 ${launchExpanded ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div className="premium-text-shadow relative flex shrink-0 flex-col items-start gap-1 sm:items-end">
                <p className="flex items-baseline gap-1">
                  <span className="font-display text-2xl font-bold text-paper">{LAUNCH.price}</span>
                  <span className="font-sans text-sm font-semibold text-paper/90">{LAUNCH.period}</span>
                </p>
                <p className="font-sans text-xs font-medium text-paper/80">
                  {LAUNCH.includes.map((item) => item.label).join(' · ')}
                </p>
              </div>
            </div>

            <div
              className={`relative grid w-full transition-all duration-300 ease-out ${
                launchExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="premium-text-shadow grid gap-4 border-t border-paper/25 pt-5 sm:grid-cols-3">
                  {LAUNCH.includes.map((item) => {
                    const detail = findServiceDetail(item.slug, item.tier)
                    if (!detail) return null
                    return (
                      <div key={item.label}>
                        <h4 className="font-display text-sm font-bold text-paper">
                          {detail.service.title}
                          {item.tier && (
                            <span className="ml-1.5 font-sans text-xs font-normal text-paper/70">
                              · {item.tier}
                            </span>
                          )}
                        </h4>
                        {detail.row?.included && (
                          <p className="mt-1 font-sans text-xs leading-relaxed text-paper/80">
                            {detail.row.included}
                          </p>
                        )}
                        {item.bonus && (
                          <p className="mt-1 font-sans text-xs font-semibold leading-relaxed text-marigold">
                            {item.bonus}
                          </p>
                        )}
                        {item.note && (
                          <p className="mt-1 font-sans text-xs italic leading-relaxed text-paper/60">
                            {item.note}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </button>
        </Reveal>

        <Reveal delay={100} className="mt-10 text-center">
          <p className="font-sans text-sm text-ink-muted">
            2 rounds of revisions included on every deliverable. Landing pages in 3–5 days,
            business websites in 7–10 days. SEO is a long game — expect real movement in 3–6
            months, not overnight.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton
              href="#contact"
              className="rounded-full bg-pine px-8 py-3.5 font-sans text-sm font-semibold text-paper hover:bg-pine-mid"
            >
              Get a Free Quote
            </MagneticButton>
            <MagneticButton
              href="/services"
              className="rounded-full border border-line px-8 py-3.5 font-sans text-sm font-semibold text-ink hover:border-pine hover:bg-pine hover:text-paper"
            >
              View Services
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
