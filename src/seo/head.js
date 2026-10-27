// Builds <head> tags, JSON-LD, robots.txt and sitemap.xml from resolved route metadata.
// Runs at build time (Node) and in the browser, so keep it free of JSX and browser-only APIs.
import { brand, DEFAULT_ROBOTS, phoneE164 } from "../config/site.js";
import { faqGroups } from "../data/content.js";
import { getService } from "../data/services.js";

export const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// "</script>" inside JSON-LD would end the script tag early
export const toJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

const absolute = (siteUrl, path) => `${siteUrl}${path}`;

export function buildStructuredData(meta, data, siteUrl) {
  if (!siteUrl || meta.noIndex) return [];
  const { settings } = data;
  const organizationId = `${siteUrl}/#organization`;
  const blocks = [];

  if (meta.key === "home") {
    const organization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: settings.companyName,
      alternateName: brand.alternateNames,
      url: `${siteUrl}/`,
      logo: { "@type": "ImageObject", url: absolute(siteUrl, brand.logoPath), width: 512, height: 512 },
      image: absolute(siteUrl, brand.ogImagePath),
      description: brand.description,
      foundingDate: brand.foundingYear,
      email: settings.email,
      telephone: phoneE164(settings) || undefined,
      address: {
        "@type": "PostalAddress",
        addressLocality: settings.locality || undefined,
        addressRegion: settings.region || undefined,
        addressCountry: settings.country || undefined,
      },
    };
    if (settings.socialLinks?.length) organization.sameAs = settings.socialLinks.map((link) => link.url);
    blocks.push(organization, {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: settings.companyName,
      inLanguage: "en",
      publisher: { "@id": organizationId },
    });
  }

  if (meta.breadcrumbs?.length > 1) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: meta.breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absolute(siteUrl, crumb.path),
      })),
    });
  }

  if (meta.key?.startsWith("service-")) {
    const service = getService(meta.key.slice("service-".length));
    blocks.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.summary,
      serviceType: service.title,
      url: absolute(siteUrl, meta.path),
      provider: { "@type": "Organization", "@id": organizationId, name: settings.companyName, url: `${siteUrl}/` },
      areaServed: settings.country || undefined,
    });
  }

  if (meta.key === "faq") {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqGroups.flatMap((group) =>
        group.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } }))
      ),
    });
  }

  if (meta.kind === "blog" && meta.item) {
    const post = meta.item;
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt || undefined,
      datePublished: post.publishedAt || undefined,
      dateModified: post.updatedAt || post.publishedAt || undefined,
      author: { "@type": "Organization", name: post.author || settings.companyName },
      publisher: { "@id": organizationId },
      image: post.coverImage || absolute(siteUrl, brand.ogImagePath),
      mainEntityOfPage: absolute(siteUrl, meta.path),
    });
  }

  return blocks;
}

// Full set of SEO head tags for a page (string, for build-time HTML)
export function buildHeadTags(meta, data, siteUrl) {
  const robots = meta.noIndex ? "noindex, nofollow" : DEFAULT_ROBOTS;
  const canonical = !meta.noIndex && siteUrl && meta.path ? absolute(siteUrl, meta.path) : null;
  const ogImage = siteUrl ? absolute(siteUrl, brand.ogImagePath) : null;
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    meta.description && `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
  ];

  if (!meta.noIndex) {
    tags.push(
      canonical && `<link rel="canonical" href="${canonical}" />`,
      `<meta property="og:type" content="${meta.kind === "blog" ? "article" : "website"}" />`,
      `<meta property="og:site_name" content="${escapeHtml(data.settings.companyName)}" />`,
      canonical && `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
      meta.description && `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
      `<meta property="og:locale" content="en_IN" />`,
      ogImage && `<meta property="og:image" content="${ogImage}" />`,
      ogImage && `<meta property="og:image:width" content="1200" />`,
      ogImage && `<meta property="og:image:height" content="630" />`,
      ogImage && `<meta property="og:image:alt" content="${escapeHtml(brand.ogImageAlt)}" />`,
      `<meta name="twitter:card" content="${ogImage ? "summary_large_image" : "summary"}" />`,
      `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
      meta.description && `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
      ogImage && `<meta name="twitter:image" content="${ogImage}" />`
    );
    for (const block of buildStructuredData(meta, data, siteUrl)) {
      tags.push(`<script type="application/ld+json" data-seo-jsonld>${toJsonLd(block)}</script>`);
    }
  }

  return tags.filter(Boolean).join("\n    ");
}

export const SEO_START = "<!-- seo:start -->";
export const SEO_END = "<!-- seo:end -->";

export const replaceSeoBlock = (html, headTags) => {
  const start = html.indexOf(SEO_START);
  const end = html.indexOf(SEO_END);
  if (start === -1 || end === -1) throw new Error("SEO markers not found in index.html");
  return `${html.slice(0, start + SEO_START.length)}\n    ${headTags}\n    ${html.slice(end)}`;
};

export const buildRobotsTxt = (siteUrl) =>
  [
    "User-agent: *",
    "Allow: /",
    "",
    // Admin and draft pages are excluded with noindex (meta + X-Robots-Tag), not robots.txt,
    // so crawlers can see the directive.
    ...(siteUrl ? [`Sitemap: ${siteUrl}/sitemap.xml`] : []),
    "",
  ].join("\n");

// Sitemap priority / change frequency per kind of page
const SITEMAP_RULES = {
  home: ["weekly", "1.0"],
  services: ["monthly", "0.9"],
  service: ["monthly", "0.8"],
  portfolio: ["weekly", "0.8"],
  blog: ["weekly", "0.8"],
  contact: ["yearly", "0.8"],
  "portfolio-item": ["monthly", "0.6"],
  "blog-post": ["monthly", "0.6"],
  legal: ["yearly", "0.3"],
  default: ["monthly", "0.7"],
};

export const sitemapRule = (meta) => {
  if (meta.kind === "portfolio") return SITEMAP_RULES["portfolio-item"];
  if (meta.kind === "blog") return SITEMAP_RULES["blog-post"];
  if (meta.key?.startsWith("service-")) return SITEMAP_RULES.service;
  if (meta.key === "privacy-policy" || meta.key === "terms-and-conditions") return SITEMAP_RULES.legal;
  return SITEMAP_RULES[meta.key] || SITEMAP_RULES.default;
};

// entries: { path, lastmod, changefreq, priority, images: [{ loc, title }] }
export const buildSitemapXml = (siteUrl, entries) =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries.map(({ path, lastmod, changefreq, priority, images = [] }) =>
      [
        "  <url>",
        `    <loc>${escapeHtml(absolute(siteUrl, path))}</loc>`,
        lastmod && `    <lastmod>${lastmod}</lastmod>`,
        changefreq && `    <changefreq>${changefreq}</changefreq>`,
        priority && `    <priority>${priority}</priority>`,
        ...images.map(
          (image) =>
            `    <image:image>\n      <image:loc>${escapeHtml(image.loc.startsWith("http") ? image.loc : absolute(siteUrl, image.loc))}</image:loc>${image.title ? `\n      <image:title>${escapeHtml(image.title)}</image:title>` : ""}\n    </image:image>`
        ),
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n")
    ),
    "</urlset>",
    "",
  ].join("\n");

