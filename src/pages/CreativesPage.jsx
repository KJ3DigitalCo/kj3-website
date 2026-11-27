import { useEffect, useMemo, useRef, useState } from 'react'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import { CREATIVE_CLIENTS } from '../data/portfolio.js'

const FULL = '/portfolio/creatives/'
const THUMB = '/portfolio/creatives/thumbs/'
const INDUSTRIES = [...new Set(CREATIVE_CLIENTS.map((c) => c.industry))]
const TOTAL_POSTS = CREATIVE_CLIENTS.reduce((sum, c) => sum + c.total, 0)

const ALL_POSTS = CREATIVE_CLIENTS.flatMap((client) =>
  client.images.map((file) => ({ file, name: client.name })),
)

export default function CreativesPage() {
  const [industry, setIndustry] = useState('All')
  const [open, setOpen] = useState(null)
  const closeRef = useRef(null)
  const isOpen = open !== null

  const visible = useMemo(
    () => (industry === 'All' ? CREATIVE_CLIENTS : CREATIVE_CLIENTS.filter((c) => c.industry === industry)),
    [industry],
  )

  // A plain fixed overlay instead of <dialog>: the top layer would render above
  // the site's custom cursor, and the real pointer is hidden site-wide.
  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(null)
      if (event.key === 'ArrowLeft') setOpen((i) => (i - 1 + ALL_POSTS.length) % ALL_POSTS.length)
      if (event.key === 'ArrowRight') setOpen((i) => (i + 1) % ALL_POSTS.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const step = (delta) => setOpen((i) => (i + delta + ALL_POSTS.length) % ALL_POSTS.length)
  const current = open === null ? null : ALL_POSTS[open]

  return (
    <>
      <Seo
        title="Our Creative Work | KJ3 Digital Co."
        description="Real social media posts we designed for real Philippine businesses: clinics, salons, resorts, insurance teams, and more."
        path="/creatives"
      />

      <section className="bg-pine-deep pb-16 pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">Our Creative Work</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-paper sm:text-6xl">
              Posts we designed for <span className="text-marigold">real businesses.</span>
            </h1>
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-paper/70 sm:text-lg">
              Every image here was made for a client and posted on their page. Pick your industry and see what
              your own page could look like.
            </p>
            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
              {[
                [CREATIVE_CLIENTS.length, 'brands'],
                [`${Math.floor(TOTAL_POSTS / 10) * 10}+`, 'posts designed'],
                [INDUSTRIES.length, 'industries'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-3xl font-bold tabular-nums text-marigold">{value}</dd>
                  <dd className="font-mono text-xs uppercase tracking-[0.08em] text-paper/60">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <nav
        aria-label="Filter by industry"
        className="sticky top-[72px] z-30 border-b border-line bg-manila/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none]">
          {['All', ...INDUSTRIES].map((name) => {
            const count = name === 'All' ? CREATIVE_CLIENTS.length : CREATIVE_CLIENTS.filter((c) => c.industry === name).length
            const active = industry === name
            return (
              <button
                key={name}
                type="button"
                aria-pressed={active}
                onClick={() => setIndustry(name)}
                className={`shrink-0 rounded-full border px-4 py-2 font-sans text-[13px] font-semibold transition-colors ${
                  active ? 'border-pine bg-pine text-paper' : 'border-line bg-paper text-ink hover:border-pine'
                }`}
              >
                {name}
                <span className="ml-1.5 font-mono text-[11px] opacity-60">{count}</span>
              </button>
            )
          })}
        </div>
      </nav>

      <section className="bg-manila pb-20 pt-10">
        <div className="mx-auto max-w-6xl px-6">
          {visible.map((client) => (
            <div key={client.name} className="border-t border-line py-8 first:border-t-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-marigold-ink">
                    {client.industry}
                  </span>
                  <h2 className="font-display text-xl font-bold text-ink">{client.name}</h2>
                </div>
                <span className="font-mono text-xs text-ink-muted">5 of {client.total} posts</span>
              </div>
              <div className="-mr-6 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pr-6 md:mr-0 md:grid md:grid-cols-5 md:overflow-visible md:pr-0">
                {client.images.map((file) => {
                  const index = ALL_POSTS.findIndex((post) => post.file === file)
                  return (
                    <button
                      key={file}
                      type="button"
                      onClick={() => setOpen(index)}
                      aria-label={`Enlarge ${client.name} post`}
                      className="aspect-square w-[62%] shrink-0 snap-start cursor-zoom-in overflow-hidden rounded-xl bg-[#ecebe6] shadow-lg shadow-black/10 transition-transform duration-300 hover:-translate-y-1 md:w-auto"
                    >
                      <img
                        src={THUMB + file}
                        alt={`Social media post for ${client.name}`}
                        loading="lazy"
                        decoding="async"
                        width="480"
                        height="480"
                        className="h-full w-full object-contain"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          <Reveal className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-pine-deep px-6 py-14 text-center">
            <h2 className="max-w-xl font-display text-3xl font-bold text-paper sm:text-4xl">
              Want posts like these for your business?
            </h2>
            <p className="max-w-md font-sans text-base text-paper/70">
              30 designed posts a month, captions included, starting at ₱5,000. Message us and we&rsquo;ll show
              you samples from your own industry.
            </p>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <MagneticButton
                href="/#contact"
                className="rounded-full bg-marigold px-8 py-3.5 font-sans text-sm font-semibold text-pine-deep hover:bg-marigold-deep"
              >
                Get a Free Quote
              </MagneticButton>
              <a href="/work" className="font-sans text-sm font-semibold text-paper/80 underline-offset-4 hover:text-paper hover:underline">
                See the websites we&rsquo;ve built &rarr;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Post for ${current.name}`}
          onClick={(event) => event.target === event.currentTarget && setOpen(null)}
          className="fixed inset-0 z-[900] flex items-center justify-center bg-black/85 p-4"
        >
          <figure className="flex max-w-[min(92vw,860px)] flex-col items-center gap-3">
            <img src={FULL + current.file} alt={`Post for ${current.name}`} className="max-h-[80vh] max-w-full rounded-xl" />
            <figcaption className="font-mono text-[13px] text-paper/80">{current.name}</figcaption>
          </figure>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="fixed right-4 top-4 h-11 w-11 rounded-full bg-paper/15 text-xl text-paper hover:bg-paper/25"
          >
            &#10005;
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous post"
            className="fixed left-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-paper/15 text-2xl text-paper hover:bg-paper/25"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next post"
            className="fixed right-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-paper/15 text-2xl text-paper hover:bg-paper/25"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  )
}
