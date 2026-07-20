import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'

const CONTACT_EMAIL = 'kj3digitalco@gmail.com'
const CONTACT_PHONE = '0917 506 0103'
const LAST_UPDATED = 'July 20, 2026'

const SECTIONS = [
  {
    number: '01',
    title: 'What this policy covers',
    body: [
      'This Privacy Policy explains how KJ3 Digital Co. ("KJ3", "we," "us") collects, uses, and protects information from visitors, leads, and clients who interact with us through kj3digitalco.com, our Meta (Facebook/Instagram) ads and lead forms, our Messenger chatbot, and our website contact and quote forms.',
      'KJ3 Digital Co. is a digital marketing agency based in Antipolo, Philippines, serving local and small businesses across the country. By submitting a form, messaging us, or otherwise sharing your information with us, you agree to the practices described here.',
    ],
  },
  {
    number: '02',
    title: 'Information we collect',
    body: [
      'We collect information you give us directly, through:',
    ],
    list: [
      'Meta Lead Ads forms — name, email, phone number, and any details you provide when you respond to one of our Facebook or Instagram ads.',
      'Website contact and quote forms — name, business name, email, phone number, the service you\'re interested in, and any message or business details you share with us.',
      'Messenger chatbot conversations — your name and profile info from Messenger/Instagram, plus whatever you tell us in the conversation (questions, business details, order info, etc.).',
    ],
  },
  {
    number: '03',
    title: 'How we use your information',
    body: [
      'We use the information you share with us to:',
    ],
    list: [
      'Follow up with you about the services you asked about',
      'Prepare and send you a quote tailored to your business',
      'Answer questions and provide customer support',
      'Understand what\'s working in our marketing, so we can improve it',
    ],
    footNote: 'We do not sell, rent, or trade your personal information to third parties. Ever.',
  },
  {
    number: '04',
    title: 'How we store and protect your data',
    body: [
      'Lead and contact form submissions are stored in a private Google Sheet, accessible only to the KJ3 team. Messenger conversations are stored within Meta\'s Messenger platform and, where we use one, our chatbot provider\'s systems.',
      'We take reasonable steps to keep your information secure, but no online system is 100% guaranteed against every risk. We only keep information for as long as it\'s useful for the purposes above, or as long as we\'re required to for legal or accounting reasons.',
    ],
  },
  {
    number: '05',
    title: 'Cookies and tracking',
    body: [
      'Our website uses cookies and similar tracking technologies to understand how visitors use the site and to measure how well our ads are performing:',
    ],
    list: [
      'Google Analytics (GA4) — tracks page views and general visitor behavior across the site.',
      'Meta Pixel / Conversions API — helps us measure and improve our Facebook/Instagram ad campaigns, and show relevant ads to people who\'ve already shown interest in KJ3 (retargeting).',
    ],
    footNote: 'You can control or disable cookies through your browser settings at any time.',
  },
  {
    number: '06',
    title: 'Third-party services we use',
    body: [
      'We work with a small number of trusted third-party platforms to run our business and marketing, each of which processes some of your data under its own privacy terms:',
    ],
    list: [
      'Meta (Facebook/Instagram) — for lead ads, Messenger, and Instagram DM conversations.',
      'ManyChat — powers our automated chatbot replies in Messenger and Instagram DMs.',
      'Google — for storing lead submissions (Google Sheets) and website analytics (Google Analytics).',
    ],
  },
  {
    number: '07',
    title: 'Your rights and choices',
    body: [
      `You can ask us to see what information we have about you, correct it, or delete it at any time. To make a request, just email us at ${CONTACT_EMAIL} — we'll reply and take care of it within a reasonable time.`,
      'If you no longer want to hear from us, you can also just tell us — reply "stop" to a message, or email us directly, and we\'ll remove you from our follow-up list.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy | KJ3 Digital Co."
        description="How KJ3 Digital Co. collects, uses, and protects your information across our website, ads, and chatbot."
        path="/privacy-policy"
      />

      <section className="bg-pine-deep pb-20 pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
              Privacy Policy
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-paper sm:text-5xl">
              How we handle your information.
            </h1>
            <p className="mt-5 font-sans text-base leading-relaxed text-paper/70 sm:text-lg">
              Plain language, no legal jargon — here's exactly what we collect, why, and how you're
              in control of it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-manila py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <Reveal
                key={section.number}
                className="border-b border-line pb-12 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-marigold font-mono text-xs text-marigold-ink">
                    {section.number}
                  </span>
                  <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    {section.title}
                  </h2>
                </div>

                <div className="mt-4 space-y-3 pl-11">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="font-sans text-base leading-relaxed text-ink-muted">
                      {paragraph}
                    </p>
                  ))}

                  {section.list && (
                    <ul className="space-y-2.5 pt-1">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-2.5 font-sans text-base leading-relaxed text-ink-muted">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="mt-1 shrink-0 text-marigold-ink"
                            aria-hidden="true"
                          >
                            <path
                              d="M5 12.5l4.5 4.5L19 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.footNote && (
                    <p className="pt-1 font-sans text-sm font-semibold text-ink">
                      {section.footNote}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-4 rounded-2xl border border-line bg-paper p-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-marigold-ink">
              Contact us
            </span>
            <h2 className="mt-2 font-display text-xl font-bold text-ink">
              Questions about your data?
            </h2>
            <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-ink-muted">
              Reach out any time — we'll get back to you within one business day.
            </p>
            <dl className="mt-5 space-y-2 font-sans text-sm">
              <div className="flex gap-2">
                <dt className="text-ink-muted">Email:</dt>
                <dd className="font-medium text-ink">{CONTACT_EMAIL}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-ink-muted">Phone / WhatsApp:</dt>
                <dd className="font-medium text-ink">{CONTACT_PHONE}</dd>
              </div>
            </dl>
          </Reveal>

          <p className="mt-8 text-center font-sans text-xs text-ink-muted">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>
    </>
  )
}
