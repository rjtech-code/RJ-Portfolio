import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const suggestions = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

// Branded 404 (rendered for unknown routes and missing portfolio/blog items)
export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 pt-32 pb-24 bg-[var(--rj-navy-950)] overflow-hidden">
      <div className="absolute inset-0 circuit-bg pointer-events-none" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[420px] h-[420px] bg-[#F97316]/15 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="relative text-center max-w-lg">
        <p className="relative inline-block text-[9rem] md:text-[11rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FDBA74] to-[#F97316] drop-shadow-[0_0_35px_rgba(249,115,22,0.45)]" aria-hidden="true">
          404
          <span className="absolute -top-2 -right-6 w-3 h-3 rounded-full bg-[var(--rj-cyan)] animate-pulse" />
          <span className="absolute bottom-6 -left-8 w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-4 mb-4">Page Not Found</h1>
        <p className="text-[#CBD5E1] text-lg leading-relaxed mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-[#F97316] text-white px-7 py-3.5 rounded-lg font-bold hover:bg-[#EA580C] transition-colors shadow-lg shadow-[#F97316]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          <ArrowLeft size={18} aria-hidden="true" /> Back to homepage
        </Link>
        <nav aria-label="Popular pages" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {suggestions.map((s) => <li key={s.to}><Link to={s.to} className="text-[#94A3B8] hover:text-[#F97316]">{s.label}</Link></li>)}
          </ul>
        </nav>
      </div>
    </section>
  );
}
