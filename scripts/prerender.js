// Build step: prerenders every public page (static pages + published portfolio items and
// blog posts) to HTML, writes the non-indexable shells used by the host (spa.html for
// client-only routes, 404.html for unknown URLs) and the sitemap.
// Run after `vite build` and `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'
import { adminShellPage, notFoundPage } from '../src/config/pages.js'
import { normalizeSiteUrl } from '../src/config/site.js'
import { normalizeSiteData } from '../src/utils/siteData.js'
import { resolveRoute, publicPaths } from '../src/seo/routes.js'
import { buildHeadTags, buildSitemapXml, replaceSeoBlock } from '../src/seo/head.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const ROOT_DIV = '<div id="root"></div>'

const env = loadEnv('production', root, 'VITE_')
const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL)
const apiBase = (env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

const fetchJson = async (url, timeoutMs = 25000) => {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

// Published content from the API. If the API is unreachable the site still builds;
// lists then load in the browser and only static pages are prerendered.
let raw = { loaded: false }
if (apiBase) {
  try {
    raw = { ...(await fetchJson(`${apiBase}/api/public/bootstrap`)), loaded: true }
    console.log(`[prerender] Loaded ${raw.portfolio.length} portfolio item(s) and ${raw.posts.length} post(s) from the API`)
  } catch (error) {
    console.warn(`[prerender] Could not load content from the API (${error.message}); prerendering static pages only.`)
  }
} else {
  console.warn('[prerender] VITE_API_BASE_URL is not set; prerendering static pages only.')
}

const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')
if (!template.includes(ROOT_DIV)) throw new Error('Empty root element not found in dist/index.html')

const baseData = normalizeSiteData(raw)

// Shells (no prerendered markup, noindex)
await fs.writeFile(path.join(distDir, 'spa.html'), replaceSeoBlock(template, buildHeadTags(adminShellPage, baseData, '')))
await fs.writeFile(path.join(distDir, '404.html'), replaceSeoBlock(template, buildHeadTags(notFoundPage, baseData, '')))

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const sitemap = []
let count = 0

for (const routePath of publicPaths(baseData)) {
  const details = {}
  const [, type, slug] = routePath.match(/^\/(portfolio|blog)\/([a-z0-9-]+)$/) || []
  if (type) {
    try {
      details[`${type}:${slug}`] = await fetchJson(`${apiBase}/api/public/${type}/${slug}`)
    } catch (error) {
      console.warn(`[prerender] Skipping ${routePath}: ${error.message}`)
      continue
    }
  }

  const initialData = raw.loaded ? { ...raw, details, path: routePath } : { loaded: false, path: routePath }
  const data = normalizeSiteData(initialData)
  const meta = resolveRoute(routePath, data)
  if (meta.kind === 'not-found' || meta.kind === 'pending') continue

  const markup = render(routePath, initialData)
  if (!markup.includes('<h1')) throw new Error(`Prerendered ${routePath} has no <h1>`)

  // "</" is escaped so content can't close the script tag
  const dataScript = `<script>window.__INITIAL_DATA__=${JSON.stringify(initialData).replace(/</g, '\\u003c')}</script>`
  const html = replaceSeoBlock(template, buildHeadTags(meta, data, siteUrl))
    .replace(ROOT_DIV, `<div id="root">${markup}</div>${dataScript}`)

  // "/" -> index.html, "/about" -> about.html (served at /about via cleanUrls)
  const file = routePath === '/' ? 'index.html' : `${routePath.slice(1)}.html`
  await fs.mkdir(path.dirname(path.join(distDir, file)), { recursive: true })
  await fs.writeFile(path.join(distDir, file), html)
  count++

  if (!meta.noIndex) {
    const item = meta.item
    sitemap.push({ path: routePath, lastmod: item?.updatedAt ? item.updatedAt.slice(0, 10) : undefined })
  }
}

if (siteUrl) {
  await fs.writeFile(path.join(distDir, 'sitemap.xml'), buildSitemapXml(siteUrl, sitemap))
}
await fs.rm(ssrDir, { recursive: true, force: true })

console.log(`[prerender] ${count} page(s) prerendered; ${sitemap.length} indexable URL(s) in sitemap.xml; spa.html and 404.html written`)
