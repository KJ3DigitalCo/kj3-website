import FlagSpotlight from './FlagSpotlight.jsx'
import MagneticText from './MagneticText.jsx'
import MagneticButton from './MagneticButton.jsx'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh w-full items-center overflow-hidden bg-pine-deep pt-24"
    >
      <div className="absolute inset-0">
        <FlagSpotlight />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/20 to-pine-deep/70" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 text-center">
        <span className="mb-5 rounded-full border border-marigold/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-marigold">
          Digital Marketing · Philippines
        </span>
        <MagneticText
          as="h1"
          text="Built online. Backed by real strategists."
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-paper sm:text-5xl md:text-6xl"
        />
        <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-paper/80 sm:text-lg">
          KJ3 Digital Co. builds websites, runs your social media, and gets you found on
          Google — fast turnarounds, always checked by a real strategist. Built for local
          and small businesses across the Philippines.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <MagneticButton
            href="#contact"
            className="rounded-full bg-marigold px-8 py-3.5 font-sans text-sm font-semibold text-pine-deep hover:bg-marigold-deep"
          >
            Get a Free Quote
          </MagneticButton>
          <MagneticButton
            href="#services"
            className="rounded-full border border-paper/30 px-8 py-3.5 font-sans text-sm font-semibold text-paper hover:border-paper/60"
          >
            See Our Services
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
