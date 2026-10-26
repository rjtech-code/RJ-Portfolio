import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { normalizeSiteUrl } from './src/config/site.js'
import { normalizeSiteData } from './src/utils/siteData.js'
import { resolveRoute } from './src/seo/routes.js'
import { buildHeadTags, buildRobotsTxt, replaceSeoBlock } from './src/seo/head.js'

// Fills the <head> SEO block (homepage defaults; scripts/prerender.js writes per-page
// heads) and emits robots.txt. sitemap.xml is written by the prerender step.
const seo = ({ siteUrl, isSsrBuild }) => ({
  name: 'rj-seo',
  transformIndexHtml(html) {
    const data = normalizeSiteData(null)
    return replaceSeoBlock(html, buildHeadTags(resolveRoute('/', data), data, siteUrl));
  },
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/robots.txt') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        return res.end(buildRobotsTxt(siteUrl));
      }
      next();
    });
  },
  generateBundle() {
    if (isSsrBuild) return;
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobotsTxt(siteUrl) });
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL);

  if (siteUrl && !/^https?:\/\/[^/\s]+$/.test(siteUrl)) {
    throw new Error(`VITE_SITE_URL must be an origin like https://example.com (got "${siteUrl}")`);
  }
  if (!siteUrl && mode === 'production' && !isSsrBuild) {
    console.warn('\n[seo] VITE_SITE_URL is not set: canonical URLs, Open Graph images, structured data and sitemap.xml are omitted.\n');
  }

  return {
    plugins: [react(), tailwindcss(), seo({ siteUrl, isSsrBuild })],
  };
});
