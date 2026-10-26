import { useEffect } from "react";
import { useSiteData } from "../hooks/useSiteData";
import { brand, DEFAULT_ROBOTS, normalizeSiteUrl } from "../config/site";
import { buildStructuredData, toJsonLd } from "./head";
import { setCanonical, setMeta } from "./dom";

const SITE_URL = normalizeSiteUrl(import.meta.env.VITE_SITE_URL);

// Keeps <head> in sync with the current route after client-side navigation.
// The initial HTML already contains the same tags (generated at build time).
export function HeadSync({ meta }) {
  const data = useSiteData();

  useEffect(() => {
    const indexable = !meta.noIndex;
    const canonical = indexable && SITE_URL && meta.path ? `${SITE_URL}${meta.path}` : null;
    const ogImage = indexable && SITE_URL ? `${SITE_URL}${brand.ogImagePath}` : null;

    document.title = meta.title;
    setMeta("name", "description", meta.description || null);
    setMeta("name", "robots", indexable ? DEFAULT_ROBOTS : "noindex, nofollow");
    setCanonical(canonical);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:title", indexable ? meta.title : null);
    setMeta("property", "og:description", indexable ? meta.description || null : null);
    setMeta("property", "og:image", ogImage);
    setMeta("name", "twitter:title", indexable ? meta.title : null);
    setMeta("name", "twitter:description", indexable ? meta.description || null : null);
    setMeta("name", "twitter:image", ogImage);

    document.head.querySelectorAll("script[data-seo-jsonld]").forEach((el) => el.remove());
    for (const block of buildStructuredData(meta, data, SITE_URL)) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "");
      script.textContent = toJsonLd(block);
      document.head.appendChild(script);
    }
  }, [meta, data]);

  return null;
}
