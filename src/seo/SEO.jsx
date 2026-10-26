import { useEffect } from "react";
import { DEFAULT_ROBOTS, normalizeSiteUrl } from "../config/site";

const SITE_URL = normalizeSiteUrl(import.meta.env.VITE_SITE_URL);

// Updates the single existing tag (or creates it) so the document never holds duplicates
const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (content == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

// Keeps route metadata in sync after client-side navigation. The initial HTML
// already contains the homepage tags (generated at build time from src/config/site.js).
const SEO = ({ title, description, path, noIndex = false }) => {
  useEffect(() => {
    const canonical = !noIndex && SITE_URL && path ? `${SITE_URL}${path}` : null;

    document.title = title;
    setMeta("name", "description", description ?? null);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : DEFAULT_ROBOTS);
    setCanonical(canonical);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:title", noIndex ? null : title);
    setMeta("property", "og:description", noIndex ? null : description ?? null);
    setMeta("name", "twitter:title", noIndex ? null : title);
    setMeta("name", "twitter:description", noIndex ? null : description ?? null);
  }, [title, description, path, noIndex]);

  return null;
};

export default SEO;
