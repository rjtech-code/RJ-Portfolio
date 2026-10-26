import { ArrowLeft } from "lucide-react";

const NotFound = () => (
  <section className="min-h-[70vh] flex items-center justify-center px-4 pt-32 pb-24 bg-[#020617]">
    <div className="text-center max-w-lg">
      <p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.2em] mb-4">Error 404</p>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6">
        Page not found
      </h1>
      <p className="text-[#CBD5E1] text-lg leading-relaxed mb-10">
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 bg-[#F97316] text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-tight hover:bg-[#EA580C] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Back to homepage
      </a>
    </div>
  </section>
);

export default NotFound;
