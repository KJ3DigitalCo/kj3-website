import Seo from '../components/Seo.jsx'
import FlagSpotlight from '../components/FlagSpotlight.jsx'
import MagneticText from '../components/MagneticText.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import BuildTransition from '../components/BuildTransition.jsx'
import ServicesTicker from '../components/ServicesTicker.jsx'
import FlowFieldBackground from '../components/FlowFieldBackground.jsx'
import useLeadForm, { SERVICE_OPTIONS } from '../hooks/useLeadForm.js'
import { SERVICES } from '../data/services.jsx'

const CONTACT_EMAIL = 'kj3digitalco@gmail.com'

const TRUST_POINTS = [
  'A real strategist gets on the call — not a generic sales script.',
  'Built for local and small businesses across the Philippines.',
  "We reply within one business day — guaranteed.",
]

const STEPS = [
  {
    number: '01',
    title: 'Tell us about your business',
    description: 'A few quick details — no jargon, no obligation.',
  },
  {
    number: '02',
    title: 'A strategist reviews it',
    description: "We look at what you actually need, not a one-size-fits-all package.",
  },
  {
    number: '03',
    title: 'Get on your free call',
    description: "We'll reach out to schedule it within one business day. No pressure to commit.",
  },
]

function IncludedTable({ rows, label = 'Package' }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-paper">
      <table className="w-full min-w-[380px] max-w-2xl border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th className="whitespace-nowrap px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
              {label}
            </th>
            <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
              What's included
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-line last:border-b-0">
              <td className="whitespace-nowrap px-5 py-3 font-sans text-sm font-semibold text-ink">
                {row.name}
              </td>
              <td className="px-5 py-3 font-sans text-sm text-ink-muted">{row.included}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function GetQuotePage() {
  const { form, errors, status, updateField, handleSubmit, setStatus } = useLeadForm(
    'Free Strategy Call Funnel',
  )

  const inputClass = (field) =>
    `w-full rounded-xl border bg-paper px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-pine/40 ${
      errors[field] ? 'border-danger' : 'border-line'
    }`

  return (
    <>
      <Seo
        title="Book a Free Strategy Call | KJ3 Digital Co."
        description="Book a free, no-pressure strategy call for your website, social media, ads, or SEO — tailored to your business and budget."
        path="/free-strategy-call"
        noindex
      />
      <header className="bg-pine-deep py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6">
          <span className="flex items-center gap-2 font-display text-lg font-bold text-paper">
            KJ3
            <span className="h-1.5 w-1.5 rounded-full bg-marigold" aria-hidden="true" />
            Digital Co.
          </span>
        </div>
      </header>

      <section className="relative flex min-h-dvh w-full items-center overflow-hidden bg-pine-deep">
        <div className="absolute inset-0">
          <FlagSpotlight />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/20 to-pine-deep/70" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center">
          <span className="mb-5 rounded-full border border-marigold/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-marigold">
            Free Strategy Call · No Obligation
          </span>
          <MagneticText
            as="h1"
            text="A free strategy call to grow your business online."
            className="font-display text-4xl font-bold leading-[1.1] text-paper sm:text-5xl"
          />
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-paper/80 sm:text-lg">
            Website, social media, ads, SEO, or all of it — tell us what you need and a KJ3
            strategist will walk you through a plan built around your business and budget.
          </p>

          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex gap-3 font-sans text-sm text-paper/80">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mt-0.5 shrink-0 text-marigold"
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
                {point}
              </li>
            ))}
          </ul>

          <MagneticButton
            href="#quote-form"
            className="mt-10 rounded-full bg-marigold px-8 py-3.5 font-sans text-sm font-semibold text-pine-deep hover:bg-marigold-deep"
          >
            Book My Free Strategy Call
          </MagneticButton>
        </div>
      </section>

      <BuildTransition />

      <ServicesTicker />

      <section className="bg-manila py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold-ink">
              What we do
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Everything your business needs online, under one roof.
            </h2>
          </div>

          <div className="mt-14 space-y-12">
            {SERVICES.map((service, index) => {
              const rows = service.pricing?.packages || service.pricing?.items || []
              return (
                <div
                  key={service.slug}
                  className="flex flex-col gap-6 border-b border-line pb-12 last:border-b-0 sm:flex-row sm:items-start"
                >
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
                      <h3 className="font-display text-2xl font-bold text-ink">{service.title}</h3>
                    </div>
                    <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-ink-muted">
                      {service.description}
                    </p>
                    {rows.length > 0 && (
                      <IncludedTable
                        rows={rows}
                        label={service.pricing?.label || (service.pricing?.packages ? 'Package' : 'Item')}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-pine-deep py-20" id="quote-form">
        <FlowFieldBackground />
        <div className="relative z-10 mx-auto max-w-xl px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-paper sm:text-4xl">
              Book your free strategy call
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-paper/70">
              Fill this out and we'll reach out to schedule it within one business day — no
              pressure to commit.
            </p>
          </div>

          <div className="mt-10">
            {status === 'sent' ? (
              <div
                className="rounded-2xl border border-marigold/30 bg-paper p-8 text-center"
                role="status"
              >
                <h3 className="font-display text-xl font-bold text-ink">You're all set!</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                  Thanks for reaching out — we'll reply to schedule your free strategy call within
                  one business day.
                </p>
                <p className="mt-1 font-sans text-sm leading-relaxed text-ink-muted">
                  Want a faster reply? Message us on Facebook and we'll get back to you sooner.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <MagneticButton
                    as="a"
                    href="https://www.facebook.com/kj3digitalcoofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-marigold px-6 py-2.5 font-sans text-sm font-semibold text-pine-deep hover:bg-marigold-deep"
                  >
                    Message us on Facebook
                  </MagneticButton>
                  <MagneticButton
                    as="button"
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="rounded-full border border-line px-6 py-2.5 font-sans text-sm font-semibold text-ink hover:border-pine"
                  >
                    Submit another request
                  </MagneticButton>
                </div>
              </div>
            ) : (
              <form
                className="grid gap-5 rounded-2xl border border-line bg-paper p-8"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lp-name" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                      Name
                    </label>
                    <input
                      id="lp-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={updateField('name')}
                      className={inputClass('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'lp-name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="lp-name-error" className="mt-1.5 font-sans text-xs text-danger">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lp-business" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                      Business name
                    </label>
                    <input
                      id="lp-business"
                      type="text"
                      autoComplete="organization"
                      value={form.business}
                      onChange={updateField('business')}
                      className={inputClass('business')}
                      aria-invalid={Boolean(errors.business)}
                      aria-describedby={errors.business ? 'lp-business-error' : undefined}
                    />
                    {errors.business && (
                      <p id="lp-business-error" className="mt-1.5 font-sans text-xs text-danger">
                        {errors.business}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lp-email" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                      Email
                    </label>
                    <input
                      id="lp-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={updateField('email')}
                      className={inputClass('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'lp-email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="lp-email-error" className="mt-1.5 font-sans text-xs text-danger">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lp-phone" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                      Phone <span className="text-ink-muted">(optional)</span>
                    </label>
                    <input
                      id="lp-phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={updateField('phone')}
                      className={inputClass('phone')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lp-service" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                    What do you need help with?
                  </label>
                  <select
                    id="lp-service"
                    value={form.service}
                    onChange={updateField('service')}
                    className={inputClass('service')}
                  >
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="lp-message" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                    Tell us about your business
                  </label>
                  <textarea
                    id="lp-message"
                    rows={4}
                    value={form.message}
                    onChange={updateField('message')}
                    className={inputClass('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'lp-message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="lp-message-error" className="mt-1.5 font-sans text-xs text-danger">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="font-sans text-sm text-danger" role="alert">
                    Something went wrong sending your request. Please try again, or email us
                    directly at{' '}
                    <a className="font-medium underline" href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                )}

                <MagneticButton
                  as="button"
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-2 rounded-full bg-marigold px-8 py-3.5 font-sans text-sm font-semibold text-pine-deep hover:bg-marigold-deep disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Book My Free Strategy Call'}
                </MagneticButton>
              </form>
            )}
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.number}>
                <span className="font-display text-3xl font-bold text-marigold/70">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-paper">{step.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-paper/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesTicker />

      <footer className="bg-pine-deep py-8 text-center">
        <p className="font-sans text-xs text-paper/50">
          © {new Date().getFullYear()} KJ3 Digital Co. All rights reserved.
        </p>
      </footer>
    </>
  )
}
