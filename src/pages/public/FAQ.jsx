import { useState } from "react";
import { Search } from "lucide-react";
import { faqGroups } from "../../data/content";
import { pageByKey } from "../../config/pages";
import { usePageContent } from "../../hooks/useSiteData";
import { CtaBanner, EmptyState, PageHero, Section } from "../../Components/common/primitives";
import { FaqAccordion } from "../../Components/public/Blocks";

export default function FAQ() {
  const { heading, intro } = usePageContent("faq", pageByKey.faq);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const groups = faqGroups
    .map((group) => ({ ...group, items: group.items.filter((item) => !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)) }))
    .filter((group) => group.items.length);

  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently Asked Questions" accent={heading} intro={intro}>
        <div className="relative max-w-xl mt-8">
          <label htmlFor="faq-search" className="sr-only">Search questions</label>
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
          <input id="faq-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search questions…" className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[var(--rj-panel)] border border-[var(--rj-panel-border)] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40" />
        </div>
      </PageHero>

      <Section>
        {groups.length === 0 ? (
          <EmptyState title="No questions match your search" text="Try a different keyword, or contact us directly." />
        ) : (
          <div className="grid lg:grid-cols-[240px_1fr] gap-10">
            <nav aria-label="FAQ categories" className="hidden lg:block">
              <ul className="sticky top-28 space-y-1">
                {groups.map((group) => (
                  <li key={group.title}><a href={`#faq-${group.title.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="block px-4 py-2.5 rounded-lg text-sm text-[#CBD5E1] hover:bg-white/5 hover:text-white">{group.title}</a></li>
                ))}
              </ul>
            </nav>
            <div className="space-y-12">
              {groups.map((group) => {
                const id = `faq-${group.title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
                return (
                  <section key={group.title} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
                    <h2 id={`${id}-title`} className="text-2xl font-bold text-[var(--rj-cyan)] mb-5">{group.title}</h2>
                    <FaqAccordion items={group.items} idPrefix={id} />
                  </section>
                );
              })}
            </div>
          </div>
        )}
      </Section>

      <CtaBanner title="Still have questions?" text="Send us a message and we'll answer personally." primary={{ to: "/contact", label: "Contact us" }} secondary={null} />
    </>
  );
}
