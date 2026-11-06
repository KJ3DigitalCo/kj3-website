import { useState } from 'react'
import Reveal from './Reveal.jsx'
import MagneticButton from './MagneticButton.jsx'

const PACKAGES = [
  {
    name: 'Content Only',
    price: '₱5,000',
    tagline:
      'A lean content solution to keep your brand active and visible online. We handle the content, you focus on your business.',
    items: [
      '30 graphic posts / month',
      'Caption writing',
      'Content calendar',
      'Posting and scheduling',
      'Free Meta Ads setup & guidance',
    ],
    details: [
      ['30 graphic posts / month', 'High-quality, on-brand designs.'],
      ['Caption writing', 'Engaging captions that connect.'],
      ['Content calendar', "Planned content so you always know what's next."],
      ['Posting', 'We post for you on your social media.'],
      ['Scheduling', 'Consistent posting, on time, every time.'],
      [
        'Free Meta Ads setup & guidance',
        'We set up your Facebook & Instagram Ads account and guide you on the basics so you can start running ads with confidence.',
      ],
    ],
  },
  {
    name: 'Content & Ads',
    price: '₱8,000',
    featured: true,
    tag: 'Most Recommended',
    tagline: 'Content that connects. Ads that bring customers.',
    guarantee: { number: '30–90', label: 'inquiries / month, guaranteed*' },
    items: [
      '30 graphic posts / month',
      'Caption writing, calendar, posting, scheduling',
      'Facebook ad campaign we run',
      'KJ3-funded ad budget',
    ],
    details: [
      ['30 graphic posts / month', 'High-quality, on-brand designs.'],
      ['Caption writing', 'Engaging captions that connect and convert.'],
      ['Content calendar', "Planned content so you always know what's next."],
      ['Posting and scheduling', 'We post for you, on time, every time.'],
      ['Facebook ad campaign we run', 'We plan, create, run and optimize.'],
      ['KJ3-funded ad budget', 'We fund your ad budget. More visibility, more conversations, more customers.'],
    ],
  },
  {
    name: 'Content, Ads & Community Management',
    price: '₱12,000',
    tagline: 'We create. We run. We manage. You grow.',
    guarantee: { number: '30–90', label: 'inquiries / month, guaranteed*' },
    items: [
      '30 graphic posts / month',
      'Facebook ad campaign we run',
      'KJ3-funded ad budget',
      'Daily community management',
      'Monthly report',
    ],
    details: [
      ['30 graphic posts a month', 'Designed to sell, not just for likes.'],
      ['Captions written for every post', 'Strategic, persuasive, and on-brand.'],
      ['Content calendar', 'Planned, organized, and aligned with your goals.'],
      ['Posting & scheduling', 'We post on time, every time.'],
      ['Facebook ad campaign we run', 'We plan, create, run and optimize.'],
      ['Ad campaign setup & monitoring', 'We test, optimize, and scale for results.'],
      ['KJ3-funded ad budget', 'We fund your ad budget.'],
      ['Daily community management', 'We reply to comments & DMs within 8 business hours.'],
      ['Monthly report', 'Clear insights. Real results. Full transparency.'],
    ],
  },
  {
    name: 'Complete Sales System',
    price: '₱22,000',
    top: true,
    tag: 'Top Tier · Done-for-you',
    tagline: 'Everything working together. More inquiries, more conversions, more sales.',
    guarantee: { number: '60–180', label: 'inquiries / month, guaranteed*' },
    items: [
      'Content that sells',
      'Community management',
      'Meta Pixel & conversion tracking',
      'Bigger Facebook ad budget',
      'Website + sales funnel',
      'Chatbot setup',
      'Monthly strategy call',
    ],
    details: [
      ['Content that sells', 'Strategic, high-converting content planned and posted consistently.'],
      ['Community management', 'Daily engagement, replying to comments & DMs within 8 business hours.'],
      ['Meta Pixel & conversion tracking', 'Track every action, measure results, and maximize ROI.'],
      ['Bigger Facebook ad budget', 'Optimized ad spend guaranteed to bring 60–180 inquiries a month.'],
      ['Website + sales funnel', 'High-converting landing page built to capture and convert leads.'],
      ['Chatbot setup', '24/7 automated responses that nurture leads and book more sales.'],
      ['Monthly strategy call', 'We review, refine, and scale together with data-backed strategies.'],
      ['KJ3-funded ad budget', 'We fund your ad budget to run and scale your campaigns.'],
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

      {pkg.guarantee && (
        <div
          className={`mt-4 rounded-[10px] border px-3 py-2.5 font-sans text-[13px] leading-snug ${
            dark ? 'border-marigold/35 bg-marigold/10' : 'border-line bg-paper'
          }`}
        >
          <span className={`font-display text-[17px] font-bold ${dark ? 'text-marigold' : ''}`}>
            {pkg.guarantee.number}
          </span>{' '}
          {pkg.guarantee.label}
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
          <dl className={`space-y-3 border-t pt-4 ${rule}`}>
            {pkg.details.map(([title, text]) => (
              <div key={title}>
                <dt className="font-display text-[13px] font-bold">{title}</dt>
                <dd className={`mt-0.5 font-sans text-xs leading-relaxed ${muted}`}>{text}</dd>
              </div>
            ))}
          </dl>
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            *Results may vary depending on offer, industry, and market conditions. We optimize for quality
            inquiries. 2 rounds of revisions included on every deliverable.
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
