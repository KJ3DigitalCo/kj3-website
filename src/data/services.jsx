export const SERVICES = [
  {
    slug: 'website-builds',
    title: 'Website Creation',
    summary: 'Fast, sharp websites that turn visitors into customers.',
    description:
      'Landing pages, full business websites, and online stores that load fast and look sharp on any phone or laptop — built to turn visitors into customers, not just look nice.',
    icon: (
      <>
        <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 20h8M12 16.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    pricing: {
      packages: [
        {
          name: 'Landing Page',
          price: '₱8,000',
          included:
            'One focused page built around a single call-to-action — for sales funnels, ad campaigns, or promos.',
        },
        {
          name: 'Business Website',
          price: '₱15,000',
          included:
            'Up to 5 pages — home, about, services, portfolio, and contact — built for credibility and search visibility.',
        },
        {
          name: 'E-commerce Website',
          price: '₱25,000',
          included: 'A product catalog, shopping cart, and payment setup so customers can buy directly on the site.',
        },
        {
          name: 'Website Redesign',
          price: '₱15,000',
          included: 'A full redesign of an outdated or broken site — new look, same or improved content.',
        },
        {
          name: 'Hosting & Maintenance',
          price: '₱2,000/mo',
          included: "Hosting, backups, edits, and security handled every month, so you don't have to think about it.",
        },
      ],
      addOns: [
        { name: 'Copywriting (free if you provide the text)', price: '₱2,000/section' },
        { name: 'Domain setup (.com)', price: '₱1,500/yr' },
        { name: 'Extra page', price: '₱3,000 each' },
      ],
      note: '2 rounds of revisions included on every page.',
    },
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    summary: 'Consistent posting and captions that sound like you.',
    description:
      'Content creation, scheduled posting, and captions that sound like you — plus a monthly content calendar. Starter, Growth, and Pro tiers scale with your platforms and volume.',
    icon: (
      <>
        <path
          d="M12 4a8 8 0 00-6.9 12l-.9 3.5 3.6-.9A8 8 0 1012 4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M8.5 11h7M8.5 14h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    pricing: {
      packages: [
        {
          name: 'Starter',
          price: '₱5,000/mo',
          included: '1 platform · 1 graphic a day + 2 stories a week — for businesses just testing social media.',
        },
        {
          name: 'Growth',
          price: '₱10,000/mo',
          included:
            '2 platforms · 1 graphic a day + 4 reels a month + 4 stories a week — for scaling reach with video.',
        },
        {
          name: 'Pro',
          price: '₱15,000/mo',
          included:
            '3 platforms · 1 graphic a day + 8 reels a month + daily stories + 4 carousels a month + a monthly performance report — a full content engine.',
        },
      ],
      addOns: [
        { name: 'Extra platform', price: '+₱2,500/mo' },
        { name: 'Monthly performance report (free in Pro)', price: '+₱500/mo' },
        { name: 'You supply the content, we post/schedule only', price: '₱4,000/mo flat' },
      ],
      note:
        'Every tier includes captions, a monthly content calendar, and scheduling. Content is made once, then resized and re-captioned for each platform — not unique content per platform.',
    },
  },
  {
    slug: 'dm-sales-handling',
    title: 'DM Sales Handling (Virtual Assistant)',
    summary: 'Real humans closing sales in your DMs, not just FAQs.',
    description:
      'For businesses that need actual sales conversations closed in Messenger and Instagram DMs — not just FAQ replies. If you just want light comment or DM moderation with no selling, pair this with Chatbot Automation instead.',
    icon: (
      <>
        <path d="M4 5h16v10H9l-4 4V15H4V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8.5 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    pricing: {
      label: 'Tier',
      packages: [
        {
          name: 'VA',
          price: '₱6,000/mo + commission',
          included: 'Standard sales handling — order-taking, basic objection handling, and closing routine sales.',
        },
        {
          name: 'Expert VA',
          price: '₱12,000/mo + commission',
          included: 'Higher-touch sales — heavy negotiation, upselling, and harder-to-close leads.',
        },
      ],
      note: 'Commission % is set per client based on expected volume and product margin.',
    },
  },
  {
    slug: 'content-creation',
    title: 'Content Creation',
    summary: 'Graphics, video edits, and print materials that pop.',
    description:
      'Graphics, reel and video editing, carousel posts, and on-site photo or video shoots — plus print materials like posters, menus, and flyers for your storefront.',
    icon: (
      <>
        <rect x="3.5" y="6" width="17" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 6l1.6-2h4.8L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
    pricing: {
      items: [
        { name: 'Graphic', price: '₱300', included: 'One custom graphic for a single post — no retainer needed.' },
        {
          name: 'Reel/video editing',
          price: '₱800',
          included: 'Edited from footage you already have — for promos or testimonials.',
        },
        {
          name: 'AI-Generated Video',
          price: '₱1,500',
          included:
            'AI spokesperson + AI-generated footage, scripted and edited into one ad — no footage needed from you. Up to 60 seconds.',
        },
        {
          name: 'Carousel set',
          price: '₱600',
          included: 'A multi-slide educational or step-by-step post.',
        },
        {
          name: 'On-site photo/video shoot',
          price: '₱5,000',
          included: "We come to you and shoot the footage if you don't have any yet.",
        },
        {
          name: 'Branding package',
          price: '₱8,000',
          included: 'A logo plus a brand kit — for brand-new businesses.',
        },
        {
          name: 'Poster/menu/flyer',
          price: '₱1,000',
          included: 'Print-ready design for offline marketing.',
        },
      ],
      addOns: [{ name: 'AI-Generated Video — extra 15 seconds', price: '₱375' }],
      note: 'À la carte, no retainer required.',
    },
  },
  {
    slug: 'paid-ads-management',
    title: 'Paid Ads Management',
    summary: 'Ad campaigns that turn spend into steady leads.',
    description:
      'Meta ad campaigns set up and managed for you, from simple boosted posts up to a full-funnel strategy that turns ad spend into steady leads.',
    icon: (
      <path
        d="M4 10v4h3l6 4V6l-6 4H4zM17 9.5c1 1 1 4 0 5M19.5 7.5c2 2 2 7 0 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    pricing: {
      packages: [
        {
          name: 'Setup',
          price: '₱5,000 (one-time)',
          included: 'Account structure, pixel tracking, and your first campaign built and launched.',
        },
        {
          name: 'Basic',
          price: '₱6,000/mo',
          included:
            'Ad spend up to ₱10,000/mo. We keep the campaign alive — pausing underperformers and refreshing stale creative.',
        },
        {
          name: 'Standard',
          price: '₱10,000/mo',
          included:
            'Ad spend up to ₱30,000/mo. Active A/B testing — we kill the losing ad and scale the winner.',
        },
        {
          name: 'Advanced',
          price: '₱20,000/mo',
          included:
            'Ad spend up to ₱100,000/mo. A full cold → warm → retargeting funnel across your ad account.',
        },
        {
          name: 'Enterprise/Scale',
          price: '₱20,000/mo + 8% beyond ₱100k spend',
          included: 'No spend cap. Everything in Advanced, uncapped ad spend.',
        },
      ],
      note:
        'Simple version: Setup gets it running once. Basic keeps it alive. Standard makes it better. Advanced turns it into a full sales strategy. Ad spend is billed separately from the management fee.',
    },
  },
  {
    slug: 'seo',
    title: 'SEO',
    summary: 'So local customers find you first on Google.',
    description:
      'Google Business Profile optimization, keyword research, on-page fixes, blog content, local citations, backlinks, and technical audits — so local customers find you first.',
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 15l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.5 10.5l2 2 3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    pricing: {
      packages: [
        {
          name: 'Starter',
          price: '₱4,000/mo',
          included: 'Google Business Profile setup, basic keyword targeting, and on-page fixes — for showing up on Maps and Search.',
        },
        {
          name: 'Standard',
          price: '₱8,000/mo',
          included: 'Everything in Starter, plus 2–4 blog articles a month, local citations, and backlinks to rank for more keywords.',
        },
        {
          name: 'Full',
          price: '₱14,000/mo',
          included: 'Everything in Standard, plus a full technical audit and ongoing link building — for competitive niches.',
        },
        {
          name: 'Audit Only',
          price: '₱3,000 (one-time)',
          included: 'A diagnostic report before committing to a monthly retainer.',
        },
      ],
      note: 'SEO is a long game — expect real movement in 3–6 months, 12+ months for competitive keywords.',
    },
  },
  {
    slug: 'chatbot-automation',
    title: 'Chatbot Automation',
    summary: 'An assistant that answers DMs while you sleep.',
    description:
      'An automated assistant that instantly answers common questions — pricing, hours, location — in your Messenger and Instagram DMs, even while you sleep.',
    icon: (
      <>
        <rect x="4" y="5" width="16" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 20l1.5-3.5h3L15 20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="9" cy="10.5" r="1" fill="currentColor" />
        <circle cx="15" cy="10.5" r="1" fill="currentColor" />
      </>
    ),
    pricing: {
      packages: [
        {
          name: 'Setup',
          price: '₱5,000 (one-time)',
          included: 'One-time setup — welcome message, FAQ flows, and comment-to-DM triggers, same for every tier.',
        },
        {
          name: 'Starter',
          price: '₱2,200/mo',
          included: 'Automates FAQs for low DM/comment volume — up to 250 contacts.',
        },
        {
          name: 'Growth',
          price: '₱4,000/mo',
          included: 'Handles a bigger contact list with more repeat FAQ traffic — up to 2,500 contacts.',
        },
        {
          name: 'Pro',
          price: '₱8,000/mo',
          included: 'Heavy automation for high-volume businesses — up to 7,500 contacts.',
        },
      ],
    },
  },
]
