import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSiteData } from "./useSiteData";
import { resolveRoute } from "../seo/routes";
import { setCanonical, setMeta } from "../seo/dom";

export const useRouteMeta = () => {
  const { pathname } = useLocation();
  const data = useSiteData();
  return useMemo(() => resolveRoute(pathname, data), [pathname, data]);
};

// Minimal head handling for non-public screens (admin)
export function useNoIndexTitle(title) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "robots", "noindex, nofollow");
    setMeta("name", "description", null);
    setCanonical(null);
    document.head.querySelectorAll("script[data-seo-jsonld]").forEach((el) => el.remove());
  }, [title]);
}
