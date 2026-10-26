import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { normalizeSiteUrl } from './src/config/site.js'
import { pages, replaceSeoBlock, buildRobotsTxt, buildSitemapXml } from './src/seo/head.js'

// Generates the homepage <head>, robots.txt and sitemap.xml from src/config/site.js
const seo = ({ siteUrl, isSsrBuild }) => ({
  name: 'rj-seo',
  transformIndexHtml(html) {
    return replaceSeoBlock(html, pages.home, siteUrl);
  },
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/robots.txt') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        return res.end(buildRobotsTxt(siteUrl));
      }
      if (req.url === '/sitemap.xml' && siteUrl) {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        return res.end(buildSitemapXml(siteUrl));
      }
      next();
    });
  },
  generateBundle() {
    if (isSsrBuild) return;
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobotsTxt(siteUrl) });
    if (siteUrl) {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemapXml(siteUrl) });
    }
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
