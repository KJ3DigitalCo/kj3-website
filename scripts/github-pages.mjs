// GitHub Pages has no rewrite rules, so each client-side route gets its own
// copy of index.html (Pages serves /services from services.html with a 200).
// 404.html is the same app, so unknown paths still render through the router.
import { copyFileSync, writeFileSync } from 'node:fs'

const ROUTES = ['services', 'free-strategy-call', 'privacy-policy']

for (const route of [...ROUTES, '404']) {
  copyFileSync('dist/index.html', `dist/${route}.html`)
}

// Old ad links used /get-a-quote; Pages can't send a 301, so redirect client-side.
writeFileSync(
  'dist/get-a-quote.html',
  `<!doctype html><meta charset="utf-8"><title>Redirecting…</title>
<link rel="canonical" href="https://kj3digitalco.com/free-strategy-call">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=/free-strategy-call">
<script>location.replace('/free-strategy-call' + location.search + location.hash)</script>
<a href="/free-strategy-call">Continue</a>`,
)
