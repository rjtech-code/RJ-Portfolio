import { useState } from "react";
import { ChevronDown, Quote } from "lucide-react";
import { Icon } from "../common/Icon";
import { useSiteData } from "../../hooks/useSiteData";

// Accessible accordion (button + region); one item open at a time per group
export const FaqAccordion = ({ items, idPrefix = "faq" }) => {
  const [open, setOpen] = useState(null);
  return (
    <div className="divide-y divide-white/10 border border-[var(--rj-panel-border)] rounded-2xl bg-[var(--rj-panel)] overflow-hidden">
      {items.map((item, index) => {
        const id = `${idPrefix}-${index}`;
        const expanded = open === index;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`${id}-button`}
                aria-expanded={expanded}
                aria-controls={`${id}-panel`}
                onClick={() => setOpen(expanded ? null : index)}
                className="w-full flex items-center justify-between gap-6 text-left px-6 py-5 text-white font-semibold hover:bg-white/[0.03] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F97316]"
              >
                {item.q}
                <ChevronDown size={18} aria-hidden="true" className={`shrink-0 text-[#F97316] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`} hidden={!expanded} className="px-6 pb-6 text-[#CBD5E1] leading-relaxed">
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Only testimonials published with consent are returned by the API
export const Testimonials = ({ title = "What our clients say" }) => {
  const { testimonials } = useSiteData();
  if (!testimonials.length) return null;
  return (
    <section className="py-20 md:py-24 bg-[var(--rj-navy-900)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter mb-12 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={`${t.authorName}-${t.quote.slice(0, 20)}`} className="p-8 bg-[var(--rj-panel)] border border-[var(--rj-panel-border)] rounded-2xl">
              <Quote size={28} className="text-[#F97316] mb-4" aria-hidden="true" />
              <blockquote className="text-[#CBD5E1] leading-relaxed mb-6">“{t.quote}”</blockquote>
              <figcaption>
                <span className="block text-white font-bold">{t.authorName}</span>
                {t.authorRole && <span className="text-sm text-[#94A3B8]">{t.authorRole}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

// Numbered step row used on Home (preview) and service pages
export const StepRow = ({ steps }) => (
  <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
    <span className="absolute hidden xl:block top-7 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />
    {steps.map((step, index) => (
      <li key={step.title} className="group relative bg-[var(--rj-panel)] xl:bg-transparent border border-[var(--rj-panel-border)] xl:border-0 rounded-2xl p-5 xl:p-0 xl:text-center">
        <span className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--rj-panel)] border border-white/15 text-[#F97316] mb-4 xl:mx-auto transition-colors group-hover:border-[#F97316]">
          {step.icon ? <Icon name={step.icon} size={20} /> : <span className="font-black text-sm">{String(index + 1).padStart(2, "0")}</span>}
        </span>
        <span className="block text-[10px] font-bold text-[#F97316] uppercase tracking-widest mb-1">Step {String(index + 1).padStart(2, "0")}</span>
        <h3 className="text-white font-bold mb-1">{step.title}</h3>
        <p className="text-[#94A3B8] text-sm leading-relaxed">{step.summary}</p>
      </li>
    ))}
  </ol>
);
