import Reveal from './Reveal.jsx'
import FlowFieldBackground from './FlowFieldBackground.jsx'

const STEPS = [
  {
    number: '01',
    title: 'You tell us your goals',
    description:
      'A short intake on your business, your customers, and your budget. No jargon, no obligation.',
  },
  {
    number: '02',
    title: 'We draft, then refine',
    description:
      'We put together first drafts of copy, content, and ad variations fast. A KJ3 strategist reviews and edits every piece before it goes near your brand.',
  },
  {
    number: '03',
    title: 'You approve, we launch',
    description:
      'Nothing goes live without your sign-off. Once approved, we launch, monitor performance, and adjust as we go.',
  },
]

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-pine-deep py-24">
      <FlowFieldBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
            How we work
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">
            Fast enough to be affordable, careful enough to be right.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 100} className="relative">
              <span className="font-display text-5xl font-bold text-marigold/70">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-paper">{step.title}</h3>
              <p className="mt-2.5 font-sans text-sm leading-relaxed text-paper/70">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
