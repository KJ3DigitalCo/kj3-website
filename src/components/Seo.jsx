import { useEffect } from 'react'

const SITE_URL = 'https://kj3digitalco.com'
const SITE_NAME = 'KJ3 Digital Co.'

// React 19 hoists <title>/<meta>/<link> tags rendered anywhere in the tree
// into <head> automatically — no react-helmet or similar library needed.
export default function Seo({ title, description, path = '/', noindex = false }) {
  const url = `${SITE_URL}${path}`

  // index.html keeps a static fallback <meta name="description"> for
  // crawlers that don't execute JS (e.g. Bing's scanner flagged it missing
  // otherwise). React's own tag above doesn't replace that static one —
  // it only dedupes against other React-rendered tags — so once this
  // component mounts in a real browser, strip the static one manually.
  useEffect(() => {
    const tags = document.querySelectorAll('meta[name="description"]')
    if (tags.length > 1) tags[0].remove()
  }, [])

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  )
}
