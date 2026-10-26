import { Boxes, Gauge, Puzzle, Search } from "lucide-react";
import { getService } from "../../data/services";
import { Section } from "../../Components/common/primitives";
import ServiceLayout, { CardGrid, ListPanel } from "../../Components/public/ServiceLayout";

const SLUG = "react-development";
const whyReact = [
  { icon: Puzzle, title: "Reusable components", desc: "Build a UI once and reuse it consistently across screens." },
  { icon: Gauge, title: "Responsive interfaces", desc: "Fast updates for dashboards, forms and interactive pages." },
  { icon: Boxes, title: "Large ecosystem", desc: "Proven libraries for routing, forms, charts and data fetching." },
  { icon: Search, title: "SEO when needed", desc: "Prerendering or server rendering so search engines see full HTML." },
];

export default function ReactDevelopment() {
  const service = getService(SLUG);
  return (
    <ServiceLayout slug={SLUG} illustration="atom">
      <Section eyebrow="Why React?" title="Why we build with React">
        <ul className="grid md:grid-cols-2 gap-5">
          {whyReact.map(({ icon: ReasonIcon, title, desc }) => (
            <li key={title} className="flex gap-4 p-6 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
              <span className="w-11 h-11 shrink-0 rounded-xl bg-sky-400/10 text-[var(--rj-cyan)] flex items-center justify-center"><ReasonIcon size={20} aria-hidden="true" /></span>
              <div>
                <h3 className="text-white font-bold mb-1">{title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="light" eyebrow="Use cases" title="What we do with React">
        <CardGrid items={service.offerings} spots={["react", "code", "chart", "rocket"]} />
      </Section>
      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          <ListPanel title="When to bring us in" items={service.problems} accent />
          <ListPanel title="How we build React apps" items={service.features} />
        </div>
      </Section>
    </ServiceLayout>
  );
}
