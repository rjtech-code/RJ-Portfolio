import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, FileText, Loader2 } from "lucide-react";
import { useRouteMeta } from "../../hooks/useSeo";

export const Container = ({ className = "", children }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Eyebrow = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 text-[#FDBA74] text-xs font-semibold ${className}`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" aria-hidden="true" />
    {children}
  </span>
);

const BUTTON_STYLES = {
  primary:
    "bg-[#F97316] text-white hover:bg-[#EA580C] shadow-lg shadow-[#F97316]/20 hover:-translate-y-0.5",
  secondary: "border border-white/15 text-white hover:border-[#F97316]/60 hover:text-[#F97316] bg-white/[0.02]",
  ghost: "text-[#F97316] hover:gap-3 px-0! py-0!",
};

const buttonClass = (variant, className) =>
  `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] ${BUTTON_STYLES[variant]} ${className}`;

// Internal links use the router; external/mailto/tel links use a plain anchor
export const ButtonLink = ({ to, variant = "primary", className = "", children, arrow = false, ...props }) => {
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />}
    </>
  );
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    const external = to.startsWith("http");
    return (
      <a href={to} className={`group ${buttonClass(variant, className)}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
        {content}
      </a>
    );
  }
  return (
    <Link to={to} className={`group ${buttonClass(variant, className)}`} {...props}>
      {content}
    </Link>
  );
};

export const Badge = ({ tone = "neutral", children, className = "" }) => {
  const tones = {
    neutral: "bg-white/5 border-[var(--rj-panel-border)] text-white/70",
    orange: "bg-[#F97316]/10 border-[#F97316]/30 text-[#F97316]",
    amber: "bg-amber-400/10 border-amber-400/30 text-amber-300",
    green: "bg-emerald-400/10 border-emerald-400/30 text-emerald-300",
    blue: "bg-sky-400/10 border-sky-400/30 text-sky-300",
    red: "bg-red-400/10 border-red-400/30 text-red-300",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
};

export const SampleBadge = () => (
  <Badge tone="amber" className="normal-case tracking-normal">Sample</Badge>
);

export const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb" className="mb-6">
    <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#94A3B8]">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <li key={item.path} className="flex items-center gap-1.5">
            {last ? (
              <span aria-current="page" className="text-white/80">{item.name}</span>
            ) : (
              <>
                <Link to={item.path} className="hover:text-[#F97316] transition-colors">{item.name}</Link>
                <ChevronRight size={12} aria-hidden="true" className="text-white/30" />
              </>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

// Shown on pages whose content hasn't been reviewed by the owner yet
export const DraftNotice = ({ sample = false }) => (
  <p className="inline-flex items-start gap-2 mb-6 px-3 py-2 rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-200 text-xs leading-relaxed max-w-2xl">
    <FileText size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
    {sample
      ? "Sample project content shown for illustration. It is being reviewed and may change."
      : "Draft content: this page is being reviewed by RJ TechForce and may change."}
  </p>
);

// Page header: big white heading, optional cyan accent line (as in the reference design)
export const PageHero = ({ eyebrow, title, accent, intro, actions, aside, children }) => {
  const meta = useRouteMeta();
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[var(--rj-navy-950)] overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 circuit-bg" />
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#F97316]/[0.06] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-blue-600/[0.06] rounded-full blur-[140px]" />
      </div>
      <Container className={`relative ${aside ? "grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center" : ""}`}>
        <div className="animate-fade-up">
          {meta.breadcrumbs?.length > 1 && <Breadcrumbs items={meta.breadcrumbs} />}
          {meta.isDraft && <DraftNotice sample={meta.isSample} />}
          {eyebrow && <div className="mb-5"><Eyebrow>{eyebrow}</Eyebrow></div>}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-4 max-w-4xl">{title}</h1>
          {/* Sub-line and intro stay small and light so the header doesn't feel heavy */}
          {accent && <p className="text-[var(--rj-cyan)] text-lg md:text-xl font-medium leading-snug mb-4 max-w-2xl">{accent}</p>}
          {intro && <p className="text-[#94A3B8] text-base leading-relaxed max-w-xl">{intro}</p>}
          {actions && <div className="flex flex-wrap gap-3 mt-8">{actions}</div>}
          {children}
        </div>
        {aside && <div className="animate-fade-up [animation-delay:120ms]">{aside}</div>}
      </Container>
    </section>
  );
};

export const Section = ({ id, eyebrow, title, intro, align = "left", className = "", children, tone = "dark" }) => (
  <section id={id} className={`relative py-20 md:py-24 ${tone === "dark" ? "bg-[var(--rj-navy-950)]" : "bg-[var(--rj-navy-900)]"} ${className}`}>
    <Container>
      {(eyebrow || title || intro) && (
        <header className={`mb-12 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}>
          {eyebrow && <div className="mb-4"><Eyebrow>{eyebrow}</Eyebrow></div>}
          {title && <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">{title}</h2>}
          {intro && <p className="text-[#94A3B8] text-base leading-relaxed">{intro}</p>}
        </header>
      )}
      {children}
    </Container>
  </section>
);

export const Card = ({ className = "", children, as: Tag = "div" }) => (
  <Tag className={`relative bg-[var(--rj-panel)] border border-[var(--rj-panel-border)] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-[#F97316]/40 ${className}`}>
    {children}
  </Tag>
);

export const IconTile = ({ children }) => (
  <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 text-[#F97316] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
    {children}
  </div>
);

export const CtaBanner = ({
  title = "Have a project in mind?",
  text = "Tell us what you want to build. We'll reply with next steps and an estimate.",
  primary = { to: "/contact", label: "Start your project" },
  secondary = { to: "/portfolio", label: "View our work" },
}) => (
  <section className="relative py-20 bg-[var(--rj-navy-950)]">
    <Container>
      <div className="relative overflow-hidden rounded-3xl border border-[#F97316]/30 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] px-6 py-12 md:px-14 md:py-16">
        <div className="absolute -right-24 -top-24 w-80 h-80 bg-[#F97316]/15 rounded-full blur-[100px]" aria-hidden="true" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter mb-3">{title}</h2>
            <p className="text-[#CBD5E1] text-lg">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <ButtonLink to={primary.to} arrow>{primary.label}</ButtonLink>
            {secondary && <ButtonLink to={secondary.to} variant="secondary">{secondary.label}</ButtonLink>}
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export const EmptyState = ({ icon: IconComponent = FileText, title, text, action }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-[var(--rj-panel-border)] rounded-2xl bg-white/[0.02]">
    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 mb-4">
      <IconComponent size={22} aria-hidden="true" />
    </div>
    <p className="text-white font-semibold mb-1">{title}</p>
    {text && <p className="text-[#94A3B8] text-sm max-w-md">{text}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export const Spinner = ({ label = "Loading" }) => (
  <div role="status" className="flex items-center justify-center gap-3 py-16 text-[#94A3B8] text-sm">
    <Loader2 size={18} className="animate-spin text-[#F97316]" aria-hidden="true" />
    {label}…
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-2xl border border-white/5 bg-[var(--rj-panel)] overflow-hidden">
        <div className="aspect-video bg-white/5 animate-pulse" />
        <div className="p-6 space-y-3">
          <div className="h-3 w-1/3 bg-white/10 rounded animate-pulse" />
          <div className="h-5 w-2/3 bg-white/10 rounded animate-pulse" />
          <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

// Renders plain-text article content safely: blank lines split paragraphs,
// "## " / "### " start headings and "- " lines form a list. No HTML is interpreted.
export const RichText = ({ text = "" }) => {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  return (
    <div className="space-y-5 text-[#CBD5E1] text-base md:text-lg leading-relaxed">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) return <h3 key={index} className="text-xl font-bold text-white pt-2">{block.slice(4)}</h3>;
        if (block.startsWith("## ")) return <h2 key={index} className="text-2xl font-extrabold text-white tracking-tight pt-4">{block.slice(3)}</h2>;
        const lines = block.split("\n");
        if (lines.every((line) => line.trim().startsWith("- "))) {
          return (
            <ul key={index} className="space-y-2 pl-1">
              {lines.map((line, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" aria-hidden="true" />
                  <span>{line.trim().slice(2)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{lines.join(" ")}</p>;
      })}
    </div>
  );
};
