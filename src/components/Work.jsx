import Reveal from './Reveal.jsx'

const CONCEPTS = [
  {
    tag: 'Website concept',
    title: 'Sari-sari store, online',
    description: 'A simple ordering site with delivery hours, product list, and a map pin.',
    gradient: 'from-pine to-pine-mid',
  },
  {
    tag: 'Social concept',
    title: 'Neighborhood salon',
    description: 'A monthly content calendar mixing before/after shots, promos, and reminders.',
    gradient: 'from-marigold-deep to-marigold',
  },
  {
    tag: 'Ads concept',
    title: 'Home-based bakery',
    description: 'A boosted-post-to-full-funnel plan for weekend order spikes.',
    gradient: 'from-pine-deep to-pine',
  },
]

export default function Work() {
  return (
    <section id="work" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold-ink">
            Sample work
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            What we'd build for a business like yours.
          </h2>
          <p className="mt-3 font-sans text-sm text-ink-muted">
            KJ3 is a new agency — these are concept directions, not real client projects yet.
            Yours could be our first case study.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONCEPTS.map((concept, index) => (
            <Reveal
              key={concept.title}
              delay={index * 90}
              className="overflow-hidden rounded-2xl border border-line bg-manila"
            >
              <div className={`h-36 w-full bg-gradient-to-br ${concept.gradient}`} aria-hidden="true" />
              <div className="p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-marigold-ink">
                  {concept.tag}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{concept.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                  {concept.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10 rounded-2xl border border-line bg-manila p-8 text-center">
          <p className="font-display text-xl leading-snug text-ink sm:text-2xl">
            "They finally got my store online — and it actually brings in orders."
          </p>
          <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
            Illustrative example — the kind of result we're building KJ3 around, not an actual client quote
          </span>
        </Reveal>
      </div>
    </section>
  )
}
