import { useCallback, useEffect, useMemo, useState } from "react";
import { normalizeSiteData } from "../utils/siteData";
import { publicApi } from "../services/api";
import { SiteDataContext } from "./siteDataContext";

// Starts from build-time data (prerendered pages) and refreshes from the API after
// mount, so admin edits show up without a redeploy.
export function SiteDataProvider({ initialData, children }) {
  const [raw, setRaw] = useState(initialData || null);
  const [status, setStatus] = useState(initialData?.loaded ? "ready" : "loading");

  useEffect(() => {
    const controller = new AbortController();
    publicApi
      .bootstrap(controller.signal)
      .then((data) => {
        setRaw((prev) => ({ ...data, details: prev?.details || {}, loaded: true }));
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setStatus((prev) => (prev === "ready" ? "ready" : "error"));
      });
    return () => controller.abort();
  }, []);

  const setDetail = useCallback((key, value) => {
    setRaw((prev) => ({ ...(prev || {}), details: { ...(prev?.details || {}), [key]: value } }));
  }, []);

  const value = useMemo(() => ({ ...normalizeSiteData(raw), status, setDetail }), [raw, status, setDetail]);

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}
