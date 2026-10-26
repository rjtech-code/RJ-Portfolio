import { useContext, useEffect, useState } from "react";
import { SiteDataContext } from "../context/siteDataContext";
import { publicApi } from "../services/api";

export const useSiteData = () => useContext(SiteDataContext);

// Heading/intro for a page, with Admin > Content overrides applied
export const usePageContent = (key, defaults = {}) => {
  const { pagesByKey } = useSiteData();
  const override = pagesByKey[key] || {};
  return {
    heading: override.heading || defaults.heading,
    intro: override.intro || defaults.intro,
  };
};

// Loads a full portfolio item or blog post for a detail page.
// Returns { item, summary, state } where state is "ready" | "loading" | "not-found" | "error".
export function useDetail(type, slug) {
  const { details, setDetail, portfolio, posts } = useSiteData();
  const key = `${type}:${slug}`;
  const cached = details[key];
  const [failures, setFailures] = useState({});

  useEffect(() => {
    if (cached) return undefined;
    let cancelled = false;
    const load = type === "portfolio" ? publicApi.portfolioItem : publicApi.post;
    load(slug)
      .then((item) => {
        if (!cancelled) setDetail(key, item);
      })
      .catch((error) => {
        if (!cancelled) setFailures((prev) => ({ ...prev, [key]: error.status === 404 ? "not-found" : "error" }));
      });
    return () => {
      cancelled = true;
    };
  }, [cached, key, slug, type, setDetail]);

  const summary = (type === "portfolio" ? portfolio : posts).find((entry) => entry.slug === slug);
  const state = cached ? "ready" : failures[key] || "loading";
  return { item: cached || null, summary, state };
}
