import { useState } from 'react'
import Reveal from './Reveal.jsx'
import MagneticButton from './MagneticButton.jsx'

const PACKAGES = [
  {
    name: 'Content Only',
    price: '₱5,000',
    tagline:
      'You run the business. We handle the content. Professional content and a consistent online presence.',
    items: [
      '30 graphic posts / month',
      'Caption writing',
      'Content calendar',
      'Social media posting & scheduling',
      'Free Meta Ads setup & guidance',
    ],
    groups: [
      {
        title: 'Content & social media',
        items: [
          '30 graphic posts per month',
          'Caption writing',
          'Content calendar',
          'Social media posting',
          'Content scheduling',
        ],
      },
      {
        title: 'Free bonus',
        items: [
          'Meta Ads setup & guidance: we set up your Facebook & Instagram Ads account and walk you through the basics',
        ],
      },
    ],
  },
  {
    name: 'Content & Ads',
    price: '₱8,000',
    featured: true,
    tag: 'Most Recommended',
    tagline:
      'We create your content. We run your ads. Reach more potential customers with professional content and managed advertising.',
    adBudget: '₱3,000',
    items: [
      '30 graphic posts / month',
      'Caption writing, calendar, posting & scheduling',
      'Facebook ads planning & creation',
      'Campaign management & optimization',
    ],
    groups: [
      {
        title: 'Content & social media',
        items: ['30 graphic posts per month', 'Caption writing', 'Content calendar', 'Posting & scheduling'],
      },
      {
        title: 'Facebook ads management',
        items: ['Campaign planning', 'Ads creation', 'Campaign management', 'Ads optimization'],
      },
    ],
  },
  {
    name: 'Fully Managed Sales System',
    price: '₱22,000',
    top: true,
    tag: 'Fully Managed',
    tagline:
      'We build it. We manage it. We optimize it. Your end-to-end marketing and sales system to attract leads, generate inquiries, and grow your business every month.',
    adBudget: '₱3,000',
    items: [
      'Full business website + sales funnel',
      '30 graphic posts / month + Facebook ads',
      'Chatbot setup & automation',
      'Meta Pixel & conversion tracking',
      'Monthly performance report & strategy call',
      'Domain, hosting & maintenance included',
    ],
    groups: [
      {
        title: 'Website & sales funnel management',
        items: [
          'Full business website development',
          'Mobile-responsive website design',
          'Landing pages',
          'Thank you pages',
          'Lead capture forms',
          'Sales funnel setup & optimization',
          'Website maintenance & updates',
        ],
      },
      {
        title: 'Content & advertising',
        items: [
          '30 graphic posts per month',
          'Caption writing & content calendar',
          'Social media posting & scheduling',
          'Facebook ads management & optimization',
          'Meta Pixel & conversion tracking',
        ],
      },
      {
        title: 'Automation & strategy',
        items: [
          'Chatbot setup & automation',
          'Chatbot maintenance & updates',
          'Monthly performance report',
          'Monthly strategy call',
        ],
      },
      {
        title: 'Included in your monthly package',
        items: ['Domain registration & renewal', 'Website hosting & maintenance'],
      },
    ],
  },
]

function Check({ className }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={`mt-0.5 shrink-0 ${className}`}
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
  )
}

function PackageCard({ pkg, isExpanded, onToggle }) {
  const dark = Boolean(pkg.top)
  const detailsId = `pkg-details-${pkg.name.replace(/\W+/g, '-').toLowerCase()}`

  const shell = dark
    ? 'border border-marigold/35 bg-gradient-to-br from-pine-deep via-pine to-pine-deep text-paper shadow-xl shadow-marigold/10'
    : pkg.featured
      ? 'bg-manila text-ink'
      : 'border border-line bg-manila text-ink hover:border-pine/40'
  const muted = dark ? 'text-paper/70' : 'text-ink-muted'
  const rule = dark ? 'border-paper/20' : 'border-line'
  const accent = dark ? 'text-marigold' : 'text-marigold-ink'

  return (
    <div className={`flex h-full flex-col rounded-2xl p-7 text-left transition-colors ${shell}`}>
      {pkg.tag && (
        <span
          className={`mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${
            dark ? 'border border-marigold text-marigold' : 'bg-marigold text-pine-deep'
          }`}
        >
          {pkg.tag}
        </span>
      )}
      <h3 className="font-display text-lg font-bold leading-tight">{pkg.name}</h3>
      <p className="mt-2 flex items-baseline gap-1">
        <span className="font-display text-3xl font-bold tabular-nums">{pkg.price}</span>
        <span className={`font-sans text-sm ${muted}`}>/mo</span>
      </p>
      <p className={`mt-3 font-sans text-sm leading-relaxed ${muted}`}>{pkg.tagline}</p>

      {pkg.adBudget && (
        <div
          className={`mt-4 rounded-[10px] border px-3 py-2.5 font-sans text-[13px] leading-snug ${
            dark ? 'border-marigold/35 bg-marigold/10' : 'border-line bg-paper'
          }`}
        >
          <span className={`font-display text-[17px] font-bold ${dark ? 'text-marigold' : ''}`}>
            {pkg.adBudget}
          </span>{' '}
          monthly KJ3-funded ad budget, included in your package
        </div>
      )}

      <ul className={`mt-5 space-y-2 border-t pt-5 ${rule}`}>
        {pkg.items.map((item) => (
          <li key={item} className="flex gap-2 font-sans text-sm leading-snug">
            <Check className={accent} />
            {item}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        className={`mt-4 flex w-fit items-center gap-1.5 font-sans text-xs font-semibold ${accent}`}
      >
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
      </button>

      <div
        id={detailsId}
        className={`grid transition-all duration-300 ease-out ${
          isExpanded ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className={`space-y-4 border-t pt-4 ${rule}`}>
            {pkg.groups.map((group) => (
              <div key={group.title}>
                <h4 className="font-display text-[13px] font-bold">{group.title}</h4>
                <ul className="mt-1.5 space-y-1">
                  {group.items.map((item) => (
                    <li key={item} className={`flex gap-1.5 font-sans text-xs leading-relaxed ${muted}`}>
                      <Check className={accent} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <MagneticButton
          href="#contact"
          className={`w-full rounded-full px-6 py-3 text-center font-sans text-sm font-semibold ${
            dark
              ? 'bg-marigold text-pine-deep hover:bg-marigold-deep'
              : 'bg-pine text-paper hover:bg-pine-mid'
          }`}
        >
          Avail Now
        </MagneticButton>
      </div>
    </div>
  )
}

export default function Pricing() {
  const [expanded, setExpanded] = useState({})

  const toggle = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <section id="pricing" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold-ink">
            Pricing
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Pick the package that fits where your business is now.
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-ink-muted">
            One monthly price per package. Start with content, add ads when you&rsquo;re ready, or let us
            run the whole sales system. Need something different? We&rsquo;ll quote it individually, just
            ask.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg, index) => (
            <Reveal
              key={pkg.name}
              delay={(index % 4) * 80}
              className={pkg.featured ? 'relative z-10' : 'relative'}
            >
              <div
                className={`h-full transition-transform duration-300 ${
                  pkg.featured
                    ? 'rounded-2xl p-[2px] pricing-glow-border shadow-xl shadow-marigold/20 lg:scale-105'
                    : ''
                }`}
              >
                <PackageCard pkg={pkg} isExpanded={Boolean(expanded[pkg.name])} onToggle={() => toggle(pkg.name)} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-10 text-center">
          <p className="mx-auto max-w-2xl font-sans text-xs leading-relaxed text-ink-muted">
            2 rounds of revisions included on every deliverable.
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
