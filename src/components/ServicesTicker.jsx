const SERVICE_TAGS = [
  'Website Creation',
  'Social Media Management',
  'DM Sales Handling',
  'Content Creation',
  'Paid Ads Management',
  'SEO',
  'Chatbot Automation',
]

function TickerItem({ label }) {
  return (
    <span className="flex items-center gap-8 sm:gap-12">
      <span className="font-mono text-sm uppercase tracking-[0.2em] text-paper/50 sm:text-base">
        {label}
      </span>
      <span className="h-2 w-2 shrink-0 rotate-45 bg-marigold" aria-hidden="true" />
    </span>
  )
}

export default function ServicesTicker() {
  return (
    <section className="overflow-hidden border-y border-paper/10 bg-pine-deep py-8">
      <span className="sr-only">Our services: {SERVICE_TAGS.join(', ')}</span>
      <div className="marquee-track flex w-max items-center gap-8 sm:gap-12" aria-hidden="true">
        {[...SERVICE_TAGS, ...SERVICE_TAGS].map((label, index) => (
          <TickerItem key={`${label}-${index}`} label={label} />
        ))}
      </div>
    </section>
  )
}
