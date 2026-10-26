// Build step: renders the homepage to static HTML and writes the non-indexable
// shells used by the host for client-only routes (spa.html) and unknown URLs (404.html).
// Run after `vite build` and `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { business } from '../src/config/site.js'
import { pages, replaceSeoBlock } from '../src/seo/head.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const ROOT_DIV = '<div id="root"></div>'

const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')
if (!template.includes(ROOT_DIV)) throw new Error('Empty root element not found in dist/index.html')

// Client-only shell for /admin routes (rewritten to /spa.html by vercel.json)
await fs.writeFile(
  path.join(distDir, 'spa.html'),
  replaceSeoBlock(template, { title: business.name, noIndex: true }, ''),
)

// Served by the host with a 404 status for unknown URLs
await fs.writeFile(path.join(distDir, '404.html'), replaceSeoBlock(template, pages.notFound, ''))

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const markup = render(pages.home.path)
if (!markup.includes('<h1')) throw new Error('Prerendered homepage is missing its <h1>')

await fs.writeFile(
  path.join(distDir, 'index.html'),
  template.replace(ROOT_DIV, `<div id="root">${markup}</div>`),
)
await fs.rm(ssrDir, { recursive: true, force: true })

console.log(`[prerender] dist/index.html (${(markup.length / 1024).toFixed(1)} KB of HTML), spa.html, 404.html`)
