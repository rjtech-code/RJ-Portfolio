import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { HeadSync } from "../seo/SeoManager";
import { useRouteMeta } from "../hooks/useSeo";

// Scroll to the top on page change, or to the #section when the URL has a hash
const useScrollOnNavigate = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
};

export default function PublicLayout() {
  const meta = useRouteMeta();
  useScrollOnNavigate();

  return (
    <div className="relative min-h-screen bg-[var(--rj-navy-950)] text-white antialiased font-sans flex flex-col">
      <HeadSync meta={meta} />
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
