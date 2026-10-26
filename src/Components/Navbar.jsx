import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "../data/services";
import { Icon } from "./common/Icon";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services", dropdown: true },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/process", label: "Process" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const linkClass = ({ isActive }) =>
  `relative px-1 py-2 text-sm font-medium transition-colors after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#F97316] after:transition-transform ${
    isActive ? "text-white after:scale-x-100" : "text-[#CBD5E1] hover:text-white after:scale-x-0"
  }`;

export const Logo = ({ compact = false }) => (
  <Link to="/" className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]" aria-label="RJ TechForce home">
    <img src="/brand/rj-techforce-logo-80.png" alt="" width="40" height="40" className="w-10 h-10 rounded-lg" />
    {!compact && (
      <span className="leading-tight">
        <span className="block text-lg font-bold text-white tracking-tight">RJ TechForce</span>
        <span className="block text-[11px] text-[#94A3B8]">Build · Design · Grow</span>
      </span>
    )}
  </Link>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  // Menus remember the page they were opened on, so navigating closes them
  const [mobileOpenAt, setMobileOpenAt] = useState(null);
  const [servicesOpenAt, setServicesOpenAt] = useState(null);
  const mobileOpen = mobileOpenAt === location.pathname;
  const servicesOpen = servicesOpenAt === location.pathname;
  const setMobileOpen = (open) => setMobileOpenAt(open ? location.pathname : null);
  const setServicesOpen = (open) => setServicesOpenAt(open ? location.pathname : null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click / Escape; lock scroll while the drawer is open
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setServicesOpenAt(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setServicesOpenAt(null);
        setMobileOpenAt(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled || mobileOpen ? "bg-[var(--rj-navy-950)]/90 backdrop-blur-md border-[var(--rj-panel-border)] py-3" : "bg-transparent border-transparent py-5"
      }`}
    >
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        <Logo />

        <ul className="hidden lg:flex items-center gap-6">
          {links.map((link) =>
            link.dropdown ? (
              <li key={link.to} ref={dropdownRef} className="relative" onMouseLeave={() => setServicesOpen(false)}>
                <div className="flex items-center" onMouseEnter={() => setServicesOpen(true)}>
                  <NavLink to={link.to} className={linkClass}>{link.label}</NavLink>
                  <button
                    type="button"
                    aria-label="Show services"
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="ml-1 p-1 rounded text-[#CBD5E1] hover:text-white focus-visible:outline-2 focus-visible:outline-[#F97316]"
                  >
                    <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                <div id="services-menu" hidden={!servicesOpen} className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[560px]">
                  <ul className="grid grid-cols-2 gap-1 p-3 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] shadow-2xl shadow-black/50">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link to={`/services/${service.slug}`} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                          <span className="w-9 h-9 shrink-0 rounded-lg bg-[#F97316]/10 text-[#F97316] flex items-center justify-center"><Icon name={service.icon} size={18} /></span>
                          <span>
                            <span className="block text-sm font-semibold text-white group-hover:text-[#F97316]">{service.title}</span>
                            <span className="block text-xs text-[#94A3B8] line-clamp-1">{service.summary}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li className="col-span-2 border-t border-white/5 mt-1 pt-2">
                      <Link to="/services" className="block px-3 py-2 text-sm font-semibold text-[#F97316] hover:underline">View all services →</Link>
                    </li>
                  </ul>
                </div>
              </li>
            ) : (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={linkClass}>{link.label}</NavLink>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden sm:inline-flex items-center bg-[#F97316] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#EA580C] transition-colors shadow-lg shadow-[#F97316]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Get a Quote
          </Link>
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-[#CBD5E1] hover:text-white hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#F97316]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div id="mobile-menu" hidden={!mobileOpen} className="lg:hidden max-h-[calc(100vh-72px)] overflow-y-auto border-t border-[var(--rj-panel-border)] bg-[var(--rj-navy-950)]">
        <ul className="px-4 py-4 space-y-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={({ isActive }) => `block px-4 py-3 rounded-xl text-base font-semibold ${isActive ? "bg-[#F97316]/10 text-[#F97316]" : "text-white hover:bg-white/5"}`}>
                {link.label}
              </NavLink>
              {link.dropdown && (
                <ul className="ml-4 mt-1 mb-2 border-l border-white/10 pl-3 space-y-0.5">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <NavLink to={`/services/${service.slug}`} className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm ${isActive ? "text-[#F97316]" : "text-[#CBD5E1] hover:text-white"}`}>
                        {service.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="pt-3">
            <Link to="/contact" className="block text-center bg-[#F97316] text-white px-5 py-3 rounded-xl font-bold">Get a Quote</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
