// Builds static <head> markup, structured data, robots.txt and sitemap.xml.
// Runs at build time (Node), so keep it free of JSX and browser-only APIs.
import { business, pages, indexablePaths, DEFAULT_ROBOTS } from "../config/site.js";

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// "</script>" inside JSON-LD would end the script tag early
const toJsonLd = (data) => JSON.stringify(data, null, 2).replace(/</g, "\\u003c");

export const buildStructuredData = (siteUrl) => {
  if (!siteUrl) return [];

  const organizationId = `${siteUrl}/#organization`;
  const verifiedProfiles = business.socialProfiles.filter((p) => p.verified).map((p) => p.url);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: business.name,
    alternateName: business.alternateNames,
    url: `${siteUrl}/`,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}${business.logoPath}`,
      width: 512,
      height: 512,
    },
    image: `${siteUrl}${business.ogImagePath}`,
    description: business.description,
    foundingDate: business.foundingYear,
    email: business.email,
    telephone: business.phone.e164,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.location.locality,
      addressRegion: business.location.region,
      addressCountry: business.location.countryCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: business.phone.e164,
      email: business.email,
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
  };
  if (verifiedProfiles.length) organization.sameAs = verifiedProfiles;

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: business.name,
    inLanguage: "en",
    publisher: { "@id": organizationId },
  };

  return [organization, website];
};

// Head tags for a page. Domain-dependent tags are omitted when siteUrl is empty.
export const buildHeadTags = (page, siteUrl) => {
  const robots = page.noIndex ? "noindex, nofollow" : DEFAULT_ROBOTS;
  const canonical = !page.noIndex && siteUrl ? `${siteUrl}${page.path}` : null;
  const ogImage = siteUrl ? `${siteUrl}${business.ogImagePath}` : null;

  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    page.description && `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
  ];

  if (!page.noIndex) {
    tags.push(
      canonical && `<link rel="canonical" href="${canonical}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${escapeHtml(business.name)}" />`,
      canonical && `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
      `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
      `<meta property="og:locale" content="en_IN" />`,
      ogImage && `<meta property="og:image" content="${ogImage}" />`,
      ogImage && `<meta property="og:image:width" content="1200" />`,
      ogImage && `<meta property="og:image:height" content="630" />`,
      ogImage && `<meta property="og:image:alt" content="${escapeHtml(business.ogImageAlt)}" />`,
      `<meta name="twitter:card" content="${ogImage ? "summary_large_image" : "summary"}" />`,
      `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
      ogImage && `<meta name="twitter:image" content="${ogImage}" />`
    );

    for (const data of buildStructuredData(siteUrl)) {
      tags.push(`<script type="application/ld+json">\n${toJsonLd(data)}\n</script>`);
    }
  }

  return tags.filter(Boolean).join("\n    ");
};

export const SEO_START = "<!-- seo:start -->";
export const SEO_END = "<!-- seo:end -->";

export const replaceSeoBlock = (html, page, siteUrl) => {
  const start = html.indexOf(SEO_START);
  const end = html.indexOf(SEO_END);
  if (start === -1 || end === -1) throw new Error("SEO markers not found in index.html");
  return `${html.slice(0, start + SEO_START.length)}\n    ${buildHeadTags(page, siteUrl)}\n    ${html.slice(end)}`;
};

export const buildRobotsTxt = (siteUrl) =>
  [
    "User-agent: *",
    "Allow: /",
    "",
    // Admin pages are excluded with noindex (meta + X-Robots-Tag), not robots.txt,
    // so crawlers can see the noindex directive.
    ...(siteUrl ? [`Sitemap: ${siteUrl}/sitemap.xml`] : []),
    "",
  ].join("\n");

export const buildSitemapXml = (siteUrl) =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...indexablePaths.map((path) => `  <url>\n    <loc>${escapeHtml(`${siteUrl}${path}`)}</loc>\n  </url>`),
    "</urlset>",
    "",
  ].join("\n");

export { pages };
