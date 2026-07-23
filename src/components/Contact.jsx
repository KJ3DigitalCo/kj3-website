import Reveal from './Reveal.jsx'
import MagneticButton from './MagneticButton.jsx'
import useLeadForm, { SERVICE_OPTIONS } from '../hooks/useLeadForm.js'

const CONTACT_EMAIL = 'kj3digitalco@gmail.com'
const CONTACT_PHONE = '0917 506 0103'

export default function Contact() {
  const { form, errors, status, updateField, handleSubmit, setStatus } = useLeadForm('Main Website')

  const inputClass = (field) =>
    `w-full rounded-xl border bg-paper px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-pine/40 ${
      errors[field] ? 'border-danger' : 'border-line'
    }`

  return (
    <section id="contact" className="bg-manila py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold-ink">
            Get in touch
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Let's get your business online.
          </h2>
          <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-ink-muted">
            Tell us about your business and what you need. We'll reply with a free, no-pressure
            quote within one business day.
          </p>

          <dl className="mt-10 space-y-4 font-sans text-sm">
            <div>
              <dt className="text-ink-muted">Email</dt>
              <dd className="font-medium text-ink">{CONTACT_EMAIL}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Phone / WhatsApp</dt>
              <dd className="font-medium text-ink">{CONTACT_PHONE}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Based in</dt>
              <dd className="font-medium text-ink">Antipolo, Philippines · serving businesses across the Philippines</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={100}>
          {status === 'sent' ? (
            <div className="rounded-2xl border border-line bg-paper p-8 text-center" role="status">
              <h3 className="font-display text-xl font-bold text-ink">Message sent!</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Thanks for reaching out — we'll reply with a free, no-pressure quote within one
                business day.
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
                  className="rounded-full bg-pine px-6 py-2.5 font-sans text-sm font-semibold text-paper hover:bg-pine-mid"
                >
                  Message us on Facebook
                </MagneticButton>
                <MagneticButton
                  as="button"
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="rounded-full border border-line px-6 py-2.5 font-sans text-sm font-semibold text-ink hover:border-pine"
                >
                  Send another message
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
                  <label htmlFor="name" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={updateField('name')}
                    className={inputClass('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 font-sans text-xs text-danger">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="business" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                    Business name
                  </label>
                  <input
                    id="business"
                    type="text"
                    autoComplete="organization"
                    value={form.business}
                    onChange={updateField('business')}
                    className={inputClass('business')}
                    aria-invalid={Boolean(errors.business)}
                    aria-describedby={errors.business ? 'business-error' : undefined}
                  />
                  {errors.business && (
                    <p id="business-error" className="mt-1.5 font-sans text-xs text-danger">
                      {errors.business}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={updateField('email')}
                    className={inputClass('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 font-sans text-xs text-danger">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                    Phone <span className="text-ink-muted">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={updateField('phone')}
                    className={inputClass('phone')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                  What do you need help with?
                </label>
                <select
                  id="service"
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
                <label htmlFor="message" className="mb-1.5 block font-sans text-sm font-medium text-ink">
                  Tell us about your business
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={updateField('message')}
                  className={inputClass('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 font-sans text-xs text-danger">
                    {errors.message}
                  </p>
                )}
              </div>

              {status === 'error' && (
                <p className="font-sans text-sm text-danger" role="alert">
                  Something went wrong sending your message. Please try again, or email us
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
                className="mt-2 rounded-full bg-pine px-8 py-3.5 font-sans text-sm font-semibold text-paper hover:bg-pine-mid disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </MagneticButton>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
