import { useEffect, useState } from 'react'
import MagneticButton from './MagneticButton.jsx'

const LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/creatives', label: 'Our Work' },
  { href: '/#process', label: 'How We Work' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? 'bg-manila/90 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className={`flex items-center gap-2 font-display text-lg font-bold transition-colors duration-300 ${
            solid ? 'text-ink' : 'text-paper'
          }`}
        >
          {solid && <img src="/favicon.svg" alt="" className="h-7 w-auto" aria-hidden="true" />}
          KJ3
          <span className="h-1.5 w-1.5 rounded-full bg-marigold" aria-hidden="true" />
          <span className="hidden sm:inline">Digital Co.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-sans text-sm font-medium transition-colors duration-300 ${
                solid ? 'text-ink-muted hover:text-ink' : 'text-paper/80 hover:text-paper'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <MagneticButton
          href="/#contact"
          className={`hidden rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition-colors duration-300 md:inline-block ${
            solid ? 'bg-pine text-paper hover:bg-pine-mid' : 'bg-marigold text-pine-deep hover:bg-marigold-deep'
          }`}
        >
          Get a Quote
        </MagneticButton>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 md:hidden ${
            solid ? 'text-ink' : 'text-paper'
          }`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t border-line bg-manila px-6 pb-6 pt-2 md:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-3 font-sans text-base font-medium text-ink transition-colors duration-150 hover:bg-paper"
            >
              {link.label}
            </a>
          ))}
          <MagneticButton
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-pine px-5 py-3 text-center font-sans text-sm font-semibold text-paper"
          >
            Get a Quote
          </MagneticButton>
        </nav>
      )}
    </header>
  )
}
