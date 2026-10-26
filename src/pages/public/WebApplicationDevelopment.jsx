import { Database, Monitor, Server, Cloud } from "lucide-react";
import { getService } from "../../data/services";
import { Section } from "../../Components/common/primitives";
import ServiceLayout, { CardGrid, ListPanel } from "../../Components/public/ServiceLayout";

const SLUG = "web-application-development";
const layers = [
  { icon: Monitor, title: "Interface", desc: "React screens for staff and customers, responsive on every device." },
  { icon: Server, title: "API", desc: "Node.js / Express services with validation, authentication and roles." },
  { icon: Database, title: "Data", desc: "MongoDB or MySQL schemas designed around your records and reports." },
  { icon: Cloud, title: "Deployment", desc: "Hosted, monitored and backed up, with a staging environment." },
];

export default function WebApplicationDevelopment() {
  const service = getService(SLUG);
  return (
    <ServiceLayout slug={SLUG} illustration="dashboard">
      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          <ListPanel title="Problems we solve" items={service.problems} accent />
          <ListPanel title="Key features" items={service.features} />
        </div>
      </Section>
      <Section tone="light" eyebrow="Architecture" title="How a web application is put together" intro="Every layer is planned so the application stays secure and easy to extend.">
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {layers.map(({ icon: LayerIcon, title, desc }, index) => (
            <li key={title} className="relative p-6 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
              <span className="absolute top-5 right-5 text-xs font-bold text-white/30">0{index + 1}</span>
              <LayerIcon size={24} className="text-[var(--rj-cyan)] mb-4" aria-hidden="true" />
              <h3 className="text-white font-bold mb-2">{title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section eyebrow="What we build" title="Typical web applications">
        <CardGrid items={service.offerings} spots={["chart", "team", "code", "webapp"]} />
      </Section>
    </ServiceLayout>
  );
}
