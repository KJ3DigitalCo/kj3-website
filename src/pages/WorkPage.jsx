import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import { WEBSITE_PROJECTS } from '../data/portfolio.js'

const CHECK = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-marigold-ink" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function WorkPage() {
  return (
    <>
      <Seo
        title="Websites We've Built | KJ3 Digital Co."
        description="Live websites and landing pages KJ3 Digital Co. built for real Philippine businesses. Click any of them and see them working."
        path="/work"
      />

      <section className="bg-pine-deep pb-16 pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">Our Work · Websites</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-paper sm:text-6xl">
              Real clients. Real sites. <span className="text-marigold">Live right now.</span>
            </h1>
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-paper/70 sm:text-lg">
              Every project here is a website we built and still look after. Don&rsquo;t take our word for it: click
              any of them and see it working.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-manila py-20">
        <div className="mx-auto max-w-6xl px-6">
          {WEBSITE_PROJECTS.map((project, index) => (
            <Reveal
              key={project.name}
              className="grid items-center gap-10 border-t border-line py-12 first:border-t-0 first:pt-0 lg:grid-cols-[1.25fr_1fr] lg:gap-14"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the ${project.name} website`}
                className={`group block ${index % 2 ? 'lg:order-2' : ''}`}
              >
                <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl shadow-black/20 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="flex items-center gap-3 border-b border-line bg-[#ecebe6] px-4 py-2.5">
                    <span className="flex gap-1.5" aria-hidden="true">
                      <i className="h-2.5 w-2.5 rounded-full bg-[#d4d2cb]" />
                      <i className="h-2.5 w-2.5 rounded-full bg-[#d4d2cb]" />
                      <i className="h-2.5 w-2.5 rounded-full bg-[#d4d2cb]" />
                    </span>
                    <span className="flex-1 rounded-md bg-paper px-3 py-1 text-center font-mono text-xs text-ink-muted">
                      {project.domain}
                    </span>
                  </div>
                  <img
                    src={project.image}
                    alt={`Screenshot of the ${project.name} website`}
                    loading="lazy"
                    width="1200"
                    height="750"
                    className="block aspect-[16/10] w-full object-cover object-top"
                  />
                </div>
              </a>
              <div>
                <span className="font-mono text-xs tracking-[0.15em] text-marigold-ink">
                  {String(index + 1).padStart(2, '0')} / {String(WEBSITE_PROJECTS.length).padStart(2, '0')}
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold text-ink">{project.name}</h2>
                <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                  {project.tag}
                </span>
                <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-ink">{project.need}</p>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {project.built.map((item) => (
                    <li key={item} className="flex gap-2.5 font-sans text-[15px] leading-snug text-ink">
                      {CHECK}
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3 font-sans text-sm font-semibold text-paper hover:bg-pine-mid"
                >
                  Visit live site {ARROW}
                </a>
              </div>
            </Reveal>
          ))}

          <Reveal className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-pine-deep px-6 py-14 text-center">
            <h2 className="max-w-xl font-display text-3xl font-bold text-paper sm:text-4xl">
              Want one like this for your business?
            </h2>
            <p className="max-w-md font-sans text-base text-paper/70">
              Tell us what you sell and who you sell to. We&rsquo;ll show you what we&rsquo;d build and what it costs,
              before you pay anything.
            </p>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <MagneticButton
                href="/#contact"
                className="rounded-full bg-marigold px-8 py-3.5 font-sans text-sm font-semibold text-pine-deep hover:bg-marigold-deep"
              >
                Get a Free Quote
              </MagneticButton>
              <a href="/creatives" className="font-sans text-sm font-semibold text-paper/80 underline-offset-4 hover:text-paper hover:underline">
                See our social media posts &rarr;
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
