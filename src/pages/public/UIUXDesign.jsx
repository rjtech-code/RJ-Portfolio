import { Accessibility, Frame, LayoutTemplate, MousePointerClick, Palette } from "lucide-react";
import { getService } from "../../data/services";
import { Section } from "../../Components/common/primitives";
import ServiceLayout, { CardGrid, ListPanel } from "../../Components/public/ServiceLayout";

const SLUG = "ui-ux-design";
const designProcess = [
  { title: "Research", desc: "Understand users, goals and the journeys that matter most." },
  { title: "User flows & wireframes", desc: "Agree on structure and navigation before visual design." },
  { title: "Visual design", desc: "Typography, colour and components in a consistent system." },
  { title: "Prototype & test", desc: "Clickable prototypes to review and refine before development." },
];
const tools = [
  { icon: Frame, label: "Figma" },
  { icon: LayoutTemplate, label: "Wireframing" },
  { icon: MousePointerClick, label: "Prototyping" },
  { icon: Palette, label: "Design systems" },
  { icon: Accessibility, label: "Accessibility" },
];

export default function UIUXDesign() {
  const service = getService(SLUG);
  return (
    <ServiceLayout slug={SLUG} illustration="phones">
      <Section eyebrow="Design process" title="Our design process">
        <ol className="grid md:grid-cols-2 gap-5">
          {designProcess.map((step, index) => (
            <li key={step.title} className="flex gap-4 p-6 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
              <span className="w-10 h-10 shrink-0 rounded-full border-2 border-[#F97316] text-[#F97316] font-bold flex items-center justify-center">{index + 1}</span>
              <div>
                <h3 className="text-white font-bold mb-1">{step.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="light" eyebrow="Tools" title="Design tools & techniques">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {tools.map(({ icon: ToolIcon, label }) => (
            <li key={label} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] text-center">
              <span className="w-14 h-14 rounded-full bg-[#F97316]/10 text-[#F97316] flex items-center justify-center"><ToolIcon size={24} aria-hidden="true" /></span>
              <span className="text-white text-sm font-semibold">{label}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Section eyebrow="Deliverables" title="What you receive">
        <CardGrid items={service.offerings} spots={["team", "website", "uiux", "code"]} />
      </Section>
      <Section tone="light">
        <div className="grid lg:grid-cols-2 gap-6">
          <ListPanel title="Signs you need UX work" items={service.problems} accent />
          <ListPanel title="Design principles we follow" items={service.features} />
        </div>
      </Section>
    </ServiceLayout>
  );
}
