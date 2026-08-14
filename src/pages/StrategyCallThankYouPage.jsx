import { useEffect } from 'react'
import Seo from '../components/Seo.jsx'
import { trackEvent } from '../lib/analytics.js'

const CALENDLY_URL = 'https://calendly.com/theofficialtoshi/1on1-strategy'

export default function StrategyCallThankYouPage() {
  useEffect(() => {
    trackEvent('Purchase', { value: 199, currency: 'PHP' })
  }, [])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <Seo
        title="You're In! Book Your Call | KJ3 Digital Co."
        description="Payment received — book your 1-on-1 strategy call below."
        path="/strategy-call/thank-you"
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

      <section className="bg-manila py-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="rounded-full border border-marigold-ink/30 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-marigold-ink">
            Payment Received
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">You&rsquo;re All Set!</h1>
          <p className="mx-auto mt-3 max-w-lg font-sans text-[15px] leading-relaxed text-ink-muted">
            Pick a date and time below to book your 1-on-1 Strategy Call — no need to wait for an email.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl px-6">
          <div
            className="calendly-inline-widget rounded-2xl border border-line bg-paper"
            data-url={CALENDLY_URL}
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </section>

      <footer className="bg-pine-deep py-8 text-center">
        <p className="font-sans text-xs text-paper/50">© {new Date().getFullYear()} KJ3 Digital Co. All rights reserved.</p>
      </footer>
    </>
  )
}
