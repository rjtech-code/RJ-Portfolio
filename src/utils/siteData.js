// Shape of the public site data (settings, page overrides, published content).
// Used by the React app and by scripts/prerender.js, so keep it free of JSX/browser APIs.
import { defaultSettings } from "../config/site.js";

export const mergeSettings = (settings) => {
  const merged = { ...defaultSettings };
  for (const [key, value] of Object.entries(settings || {})) {
    if (key in defaultSettings && value !== null && value !== undefined && value !== "") merged[key] = value;
  }
  return merged;
};

export const normalizeSiteData = (raw) => ({
  settings: mergeSettings(raw?.settings),
  pagesByKey: Object.fromEntries((raw?.pages || []).map((page) => [page.key, page])),
  portfolio: raw?.portfolio || [],
  posts: raw?.posts || [],
  testimonials: raw?.testimonials || [],
  // Full records for detail pages, keyed "portfolio:<slug>" / "blog:<slug>"
  details: raw?.details || {},
  // true once real data (build-time or API) is available
  loaded: Boolean(raw?.loaded),
});

export const readingTime = (text = "") => `${Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200))} min read`;

export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
