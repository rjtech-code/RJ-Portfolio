import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ExternalLink, FolderKanban, Image, Inbox, LayoutDashboard, LogOut, Menu, Newspaper, Settings, SlidersHorizontal, UsersRound, X,
} from "lucide-react";
import { adminApi, clearSession, getSession, SESSION_EXPIRED_EVENT } from "../services/adminApi";
import { ToastProvider } from "../Components/admin/ui";
import { useNoIndexTitle } from "../hooks/useSeo";

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/portfolio", label: "Portfolio", icon: Image },
  { to: "/admin/blog", label: "Blog", icon: Newspaper },
  { to: "/admin/clients", label: "Clients & Testimonials", icon: UsersRound },
  { to: "/admin/content", label: "Content & SEO", icon: SlidersHorizontal },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ onNavigate }) => (
  <div className="flex flex-col h-full">
    <Link to="/admin" onClick={onNavigate} className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
      <img src="/brand/rj-techforce-logo-80.png" alt="" width="36" height="36" className="w-9 h-9 rounded-lg" />
      <span className="leading-tight">
        <span className="block font-bold text-white">RJ TechForce</span>
        <span className="block text-[11px] text-[#94A3B8]">Admin dashboard</span>
      </span>
    </Link>
    <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 py-4">
      <ul className="space-y-1">
        {nav.map(({ to, label, icon: NavIcon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-[#F97316]/15 text-[#FDBA74] border border-[#F97316]/30" : "text-[#CBD5E1] hover:bg-white/5 hover:text-white border border-transparent"
                }`
              }
            >
              <NavIcon size={18} aria-hidden="true" /> {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
    <div className="p-3 border-t border-white/5">
      <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:bg-white/5 hover:text-white">
        <ExternalLink size={16} aria-hidden="true" /> View website
      </a>
    </div>
  </div>
);

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session] = useState(getSession);
  // The drawer remembers the page it was opened on, so navigating closes it
  const [drawerOpenAt, setDrawerOpenAt] = useState(null);
  const drawerOpen = drawerOpenAt === location.pathname;
  const setDrawerOpen = (open) => setDrawerOpenAt(open ? location.pathname : null);
  useNoIndexTitle("Admin | RJ TechForce");

  // Expired/invalid tokens are rejected by the API; send the user back to login
  useEffect(() => {
    const onExpired = () => navigate("/admin/login", { replace: true, state: { expired: true, from: location.pathname } });
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
    adminApi.me().catch(() => {});
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;

  const logout = () => {
    clearSession();
    navigate("/admin/login", { replace: true });
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#060E1D] text-white font-sans">
        <a href="#admin-main" className="skip-link">Skip to content</a>
        {/* Desktop sidebar */}
        <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-[#081329] border-r border-[var(--rj-panel-border)]">
          <Sidebar />
        </aside>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
            <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-[#081329] border-r border-[var(--rj-panel-border)] shadow-2xl">
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="absolute top-4 right-3 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5"><X size={20} aria-hidden="true" /></button>
              <Sidebar onNavigate={() => setDrawerOpen(false)} />
            </aside>
          </div>
        )}

        <div className="lg:pl-64">
          <header className="sticky top-0 z-40 flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-16 bg-[#060E1D]/90 backdrop-blur border-b border-[var(--rj-panel-border)]">
            <button type="button" onClick={() => setDrawerOpen(true)} aria-label="Open admin menu" aria-expanded={drawerOpen} className="lg:hidden p-2 -ml-2 rounded-lg text-[#CBD5E1] hover:bg-white/5"><Menu size={22} aria-hidden="true" /></button>
            <p className="hidden sm:block text-sm text-[#94A3B8]">Signed in as <span className="text-white font-medium">{session.email}</span></p>
            <div className="flex items-center gap-2 ml-auto">
              <Link to="/admin/enquiries" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F97316] text-white text-sm font-semibold hover:bg-[#EA580C]">
                <Inbox size={16} aria-hidden="true" /> Enquiries
              </Link>
              <button type="button" onClick={logout} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#CBD5E1] hover:bg-white/5 hover:text-white">
                <LogOut size={16} aria-hidden="true" /> Log out
              </button>
            </div>
          </header>
          <main id="admin-main" className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1400px]">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
