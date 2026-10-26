// Resolves a URL path + site data to page metadata. Shared by the client head manager
// (src/seo/SeoManager.jsx) and the build-time prerender, so keep it free of JSX.
import { pageByKey, pageByPath, notFoundPage } from "../config/pages.js";

const crumbsFor = (page) => {
  const crumbs = [{ name: "Home", path: "/" }];
  if (page.parent && pageByKey[page.parent]) crumbs.push({ name: pageByKey[page.parent].label, path: pageByKey[page.parent].path });
  if (page.path !== "/") crumbs.push({ name: page.label, path: page.path });
  return crumbs;
};

export const normalizePath = (pathname) => (pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname);

const detailRoutes = [
  { prefix: "/portfolio/", type: "portfolio", list: "portfolio", parentKey: "portfolio", section: "Portfolio" },
  { prefix: "/blog/", type: "blog", list: "posts", parentKey: "blog", section: "Blog" },
];

export function resolveRoute(pathname, data) {
  const path = normalizePath(pathname);
  const page = pageByPath[path];

  if (page) {
    const override = data.pagesByKey[page.key] || {};
    const isDraft = Boolean(page.draft && !override.reviewed);
    return {
      kind: "page",
      key: page.key,
      path,
      title: override.metaTitle || page.title,
      description: override.metaDescription || page.description,
      isDraft,
      noIndex: isDraft,
      breadcrumbs: crumbsFor(page),
    };
  }

  for (const route of detailRoutes) {
    if (!path.startsWith(route.prefix)) continue;
    const slug = path.slice(route.prefix.length);
    if (!/^[a-z0-9-]+$/.test(slug)) break;

    const item = data.details[`${route.type}:${slug}`] || data[route.list].find((entry) => entry.slug === slug);
    if (!item) {
      // Unknown until data has loaded; treat as not indexable meanwhile
      return data.loaded ? { ...notFoundPage, kind: "not-found", path } : { kind: "pending", path, title: notFoundPage.title.replace("Page Not Found", route.section), noIndex: true };
    }

    const parent = pageByKey[route.parentKey];
    const name = item.title;
    return {
      kind: route.type,
      key: `${route.type}:${slug}`,
      path,
      title: item.metaTitle || `${name} | RJ TechForce`,
      description: item.metaDescription || item.summary || item.excerpt || parent.description,
      isDraft: Boolean(item.isSample),
      isSample: Boolean(item.isSample),
      noIndex: Boolean(item.isSample),
      item,
      breadcrumbs: [{ name: "Home", path: "/" }, { name: parent.label, path: parent.path }, { name, path }],
    };
  }

  return { ...notFoundPage, kind: "not-found", path };
}

// Paths to prerender at build time (published content only)
export const publicPaths = (data) => [
  ...Object.keys(pageByPath),
  ...data.portfolio.map((item) => `/portfolio/${item.slug}`),
  ...data.posts.map((post) => `/blog/${post.slug}`),
];
