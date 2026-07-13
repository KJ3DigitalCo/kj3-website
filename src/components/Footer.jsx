const LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'How We Work' },
  { href: '/#contact', label: 'Contact' },
]

const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/kj3digitalcoofficial' },
  { label: 'Instagram', href: 'https://www.instagram.com/kj3digitalcoofficial' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@kj3digitalcoofficial' },
  { label: 'YouTube', href: 'https://www.youtube.com/@kj3digitalcoofficial' },
  { label: 'X', href: 'https://x.com/kj3digitalco' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-pine-deep py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <a href="/" className="flex items-center gap-2 font-display text-lg font-bold text-paper">
            KJ3
            <span className="h-1.5 w-1.5 rounded-full bg-marigold" aria-hidden="true" />
            Digital Co.
          </a>
          <p className="mt-3 font-sans text-sm leading-relaxed text-paper/60">
            Digital marketing for local and small businesses across the Philippines.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-paper/70 transition-colors duration-200 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-4">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-paper/70 transition-colors duration-200 hover:text-paper"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-paper/10 px-6 pt-6">
        <p className="font-sans text-xs text-paper/50">
          © {year} KJ3 Digital Co. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
