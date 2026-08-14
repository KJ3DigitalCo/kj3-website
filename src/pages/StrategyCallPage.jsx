import { useEffect, useState } from 'react'
import Seo from '../components/Seo.jsx'
import FlagSpotlight from '../components/FlagSpotlight.jsx'
import MagneticText from '../components/MagneticText.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import BuildTransition from '../components/BuildTransition.jsx'
import { trackEvent } from '../lib/analytics.js'

const CHECK_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ARROW_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MYTHS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    title: "Copying Competitors Isn't A Strategy",
    body: "Yung gumagana sa audience, offer, at presyo nila, pwedeng walang epekto sa'yo.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: "More Ad Spend Won't Fix A Broken Offer",
    body: 'Mas malaking budget, mas mabilis lang matatalo ang mahinang offer, hindi bumabagal.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 5h16l-6 8v5l-4 2v-7L4 5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    title: "A Prettier Page Won't Fix Bad Follow-Up",
    body: 'Karamihan ng nawawalang sales, nangyayari pagkatapos ng click. Sa DM, sa tawag, at sa mga sumunod na araw, hindi bago pa man mag-click.',
  },
]

const VALUE_STACK = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.5c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: '60-Minute 1-on-1 Strategy Call',
    body: 'Direkta at focused na oras kasama ang totoong KJ3 strategist, hindi script ng call center.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M4 12h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'Full Sales & Marketing Diagnostic',
    body: 'Titignan namin ang offer mo, ads mo, funnel mo, at follow-up mo, mula umpisa hanggang dulo.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="6" y="4" width="12" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 3.5h6v2H9z" fill="currentColor" />
        <path d="M9 11l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'A Documented Action Plan',
    body: 'Malinaw at prioritized na listahan kung ano ang unang aayusin, para may dala kang plano, hindi lang usapan.',
  },
]

const SERVICES = [
  'Website Creation',
  'Social Media Management',
  'DM Sales Handling',
  'Content Creation',
  'Paid Ads Management',
  'SEO',
  'Chatbot Automation',
]

const FAQS = [
  {
    q: 'Is it really only ₱199?',
    a: 'Yes. This is our standing first-purchase price for new clients — not a discount code or a countdown trick. Every new client qualifies for it once.',
  },
  {
    q: "What if I don't have ads running yet?",
    a: "That's fine. We'll diagnose your overall offer and strategy, not just an ad account.",
  },
  {
    q: 'What happens right after I pay?',
    a: "You're taken straight to a page where you can book your call on the spot — no waiting on an email or message.",
  },
  {
    q: 'Do I need to prepare anything before the call?',
    a: "No. Just show up. We'll ask the right questions to get to what's actually not working.",
  },
  {
    q: 'Is this secretly a pitch for a bigger program?',
    a: "No. It's a real diagnostic call. If a bigger engagement genuinely makes sense for your business, we'll only bring it up if it does.",
  },
]

function CtaButton({ className, children }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // If the redirect to PayMongo sends the browser back here (Back button or
  // the checkout's cancel_url), the page can be restored from the
  // back/forward cache with "loading" still stuck true from right before
  // the redirect — reset it whenever that happens.
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) setLoading(false)
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  const handleClick = async () => {
    setLoading(true)
    setError(false)
    trackEvent('InitiateCheckout', { value: 199, currency: 'PHP' })

    try {
      const response = await fetch('/.netlify/functions/create-checkout', { method: 'POST' })
      const data = await response.json()
      if (!response.ok || !data.checkoutUrl) throw new Error('no checkout url')
      window.location.href = data.checkoutUrl
    } catch {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <MagneticButton as="button" type="button" onClick={handleClick} disabled={loading} className={className}>
        <span className="flex items-center justify-center gap-2">
          {loading ? 'Redirecting…' : children}
          {!loading && ARROW_ICON}
        </span>
      </MagneticButton>
      {error && (
        <p className="max-w-xs text-center font-sans text-xs text-danger">
          Something went wrong. Please try again, or message us on Facebook.
        </p>
      )}
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-line last:border-b">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left font-sans text-[15px] font-semibold text-ink"
      >
        {q}
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center text-marigold-ink transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && <p className="max-w-[54ch] pb-4 font-sans text-sm leading-relaxed text-ink-muted">{a}</p>}
    </div>
  )
}

export default function StrategyCallPage() {
  return (
    <>
      <Seo
        title="1-on-1 Strategy Call — ₱199 | KJ3 Digital Co."
        description="A 60-minute 1-on-1 diagnostic call with a KJ3 strategist — find out exactly what's costing you sales, first-purchase price ₱199."
        path="/strategy-call"
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
          <span className="rounded-full border border-marigold/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-marigold">
            1-on-1 Strategy Call
          </span>

          <MagneticText
            as="h1"
            text="Something In Your Sales Process Is Broken. One Call Tells You Exactly What."
            className="mt-5 font-display text-4xl font-bold leading-[1.1] text-paper sm:text-5xl"
          />

          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-paper/80 sm:text-lg">
            A 60-minute 1-on-1 diagnostic with a KJ3 strategist — covering your offer, your ads, and your
            follow-up — so you stop guessing and start fixing the right thing first.
          </p>

          <ul className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left">
            {['Real strategist, not a script', 'Full diagnostic, not generic tips', 'Book your call the moment you pay'].map(
              (item) => (
                <li key={item} className="flex items-start gap-2.5 font-sans text-sm text-paper">
                  <span className="mt-0.5 shrink-0 text-marigold">{CHECK_ICON}</span>
                  {item}
                </li>
              ),
            )}
          </ul>

          <div className="mt-7 flex flex-wrap items-baseline justify-center gap-3">
            <span className="font-mono text-base text-paper/60 line-through">₱1,990</span>
            <span className="font-display text-3xl font-bold text-marigold">₱199</span>
            <span className="rounded-full bg-marigold px-2.5 py-1 font-mono text-[11px] font-medium text-pine-deep">
              90% off · first purchase
            </span>
          </div>

          <CtaButton className="mt-8 rounded-full bg-marigold px-8 py-3.5 font-sans text-sm font-semibold text-pine-deep hover:bg-marigold-deep">
            Claim My ₱199 Strategy Call
          </CtaButton>
          <p className="mt-3 font-mono text-[11px] text-paper/55">
            Secure checkout via PayMongo · Book your slot immediately after payment
          </p>
        </div>
      </section>

      <BuildTransition />

      <section className="-mt-px bg-pine-deep py-16">
        <div className="mx-auto max-w-2xl px-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
            The Real Reason Your Sales Aren't Moving
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
            It&rsquo;s Rarely &ldquo;Marketing Doesn&rsquo;t Work.&rdquo; It&rsquo;s Usually One Specific Leak.
          </h2>
          <p className="mt-6 max-w-[52ch] font-sans text-[15px] leading-relaxed text-paper/75">
            Karamihan sa mga negosyante, akala nila ang solusyon ay mas malaking ad spend, bagong website, o
            pag-gaya sa competitor. Pero kadalasan, wala doon ang totoong problema. Ang paglagay ng pera sa maling
            ayos, mas mabilis lang maubos ang budget mo.
          </p>

          <div className="mt-8">
            {MYTHS.map((myth) => (
              <div key={myth.title} className="flex gap-4 border-t border-marigold/20 py-5 last:border-b">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-marigold/30 text-marigold">
                  {myth.icon}
                </span>
                <div>
                  <h3 className="font-sans text-[15.5px] font-bold text-paper">{myth.title}</h3>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-paper/65">{myth.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 rounded-xl border border-marigold/30 bg-pine p-5 font-sans text-sm leading-relaxed text-paper">
            Ang pinakamabilis na paraan para tumigil sa panghuhula ay isang totoong diagnosis, hindi na naman
            isang course, hindi na naman isang guru thread.{' '}
            <strong className="font-semibold text-marigold">Isang tawag, isang strategist, isang malinaw na sagot.</strong>
          </p>
        </div>
      </section>

      <section className="bg-manila py-16">
        <div className="mx-auto max-w-2xl px-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold-ink">What&rsquo;s Included</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Everything In Your 60-Minute Diagnostic Call
          </h2>

          <div className="mt-8">
            {VALUE_STACK.map((item) => (
              <div key={item.title} className="flex gap-4 border-t border-line py-5 last:border-b">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-manila text-marigold-ink">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-sans text-[15.5px] font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-ink-muted">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-manila pb-16">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-2xl border border-line bg-paper p-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold-ink">
              First Purchase Offer
            </span>
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink-muted">
              Regular Price <strong className="text-ink line-through">₱1,990</strong>
            </p>
            <div className="mt-1 font-display text-6xl font-bold text-ink sm:text-7xl">₱199</div>
            <div className="mt-3 flex justify-center gap-2">
              <span className="rounded-full bg-marigold px-3 py-1 font-mono text-[11px] font-medium text-pine-deep">
                90% Off
              </span>
              <span className="rounded-full border border-marigold-ink px-3 py-1 font-mono text-[11px] font-medium text-marigold-ink">
                First Purchase
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-[42ch] font-sans text-[13px] leading-relaxed text-ink-muted">
              This is our standing first-session price for every new client — not a countdown gimmick. You get
              this rate once, the first time you work with us.
            </p>
            <CtaButton className="mt-6 rounded-full bg-marigold px-8 py-3.5 font-sans text-sm font-semibold text-pine-deep hover:bg-marigold-deep">
              Claim My ₱199 Strategy Call
            </CtaButton>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 font-mono text-[11px] text-ink-muted">
            <span>Secure Checkout</span>
            <span>One-Time Payment</span>
            <span>Instant Booking</span>
          </div>
        </div>
      </section>

      <section className="bg-pine-deep py-16">
        <div className="mx-auto max-w-2xl px-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">Why KJ3</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">
            We Don&rsquo;t Just Advise. We Build And Run This Every Day.
          </h2>
          <p className="mt-6 max-w-[52ch] font-sans text-[15px] leading-relaxed text-paper/75">
            KJ3 Digital Co. is a Philippine digital marketing agency working across websites, paid ads, SEO,
            social media, and sales systems for local and small businesses. A KJ3 strategist isn&rsquo;t guessing
            from theory — they&rsquo;re pulling from what&rsquo;s actually working across live campaigns right
            now.
          </p>

          <ul className="mt-7 flex flex-col gap-3.5">
            {[
              'Real strategists — not an outsourced script or chatbot',
              'We work across ads, offers, funnels, and websites, so we see the whole picture',
              'Built for the Philippine market — we know what actually works here',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 font-sans text-[14.5px] leading-snug text-paper">
                <span className="mt-0.5 shrink-0 text-marigold">{CHECK_ICON}</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">What We Work On</p>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-marigold/35 bg-pine px-3.5 py-2 font-sans text-[13px] font-medium text-paper"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-manila py-16">
        <div className="mx-auto max-w-2xl px-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold-ink">Questions</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">Frequently Asked</h2>
          <div className="mt-6">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-marigold/20 bg-pine-deep py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl font-bold text-paper sm:text-4xl">Stop Guessing What&rsquo;s Broken.</h2>
          <div className="mt-4 flex items-baseline justify-center gap-3">
            <span className="font-mono text-base text-paper/60 line-through">₱1,990</span>
            <span className="font-display text-3xl font-bold text-marigold">₱199</span>
          </div>
          <CtaButton className="mt-6 rounded-full bg-marigold px-8 py-3.5 font-sans text-sm font-semibold text-pine-deep hover:bg-marigold-deep">
            Claim My ₱199 Strategy Call
          </CtaButton>
          <p className="mt-3 font-mono text-[11px] text-paper/55">
            Secure checkout · One-time payment · Book your call immediately after
          </p>
        </div>
      </section>

      <footer className="bg-pine-deep py-8 text-center">
        <p className="font-sans text-xs text-paper/50">© {new Date().getFullYear()} KJ3 Digital Co. All rights reserved.</p>
      </footer>
    </>
  )
}
