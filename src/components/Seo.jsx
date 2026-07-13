const SITE_URL = 'https://kj3digitalco.com'
const SITE_NAME = 'KJ3 Digital Co.'

// React 19 hoists <title>/<meta>/<link> tags rendered anywhere in the tree
// into <head> automatically — no react-helmet or similar library needed.
export default function Seo({ title, description, path = '/', noindex = false }) {
  const url = `${SITE_URL}${path}`

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
