import { DatabaseBackup, KeyRound, ShieldCheck, UserCog } from "lucide-react";
import { getService } from "../../data/services";
import { Section } from "../../Components/common/primitives";
import ServiceLayout, { CardGrid, ListPanel } from "../../Components/public/ServiceLayout";

const SLUG = "saas-development";
const architecture = [
  "Separate frontend, API and database layers",
  "Account and team (tenant) separation in the data model",
  "Background jobs for emails and scheduled tasks",
  "Staging and production environments",
];
const security = [
  { icon: KeyRound, label: "Secure authentication" },
  { icon: UserCog, label: "Roles & permissions" },
  { icon: ShieldCheck, label: "Input validation" },
  { icon: DatabaseBackup, label: "Backups" },
];

export default function SaaSDevelopment() {
  const service = getService(SLUG);
  return (
    <ServiceLayout slug={SLUG} illustration="dashboard">
      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          <ListPanel title="Core features" items={service.features} accent />
          <ListPanel title="Architecture" items={architecture} />
        </div>
      </Section>
      <Section tone="light" eyebrow="Security" title="Security built in from day one">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {security.map(({ icon: SecurityIcon, label }) => (
            <li key={label} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] text-center">
              <span className="w-14 h-14 rounded-full bg-emerald-400/10 text-emerald-300 flex items-center justify-center"><SecurityIcon size={24} aria-hidden="true" /></span>
              <span className="text-white text-sm font-semibold">{label}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Section eyebrow="From MVP to scale" title="How we help SaaS products">
        <CardGrid items={service.offerings} spots={["rocket", "team", "ecommerce", "chart"]} />
      </Section>
      <Section tone="light">
        <div className="max-w-3xl"><ListPanel title="Where founders usually start" items={service.problems} /></div>
      </Section>
    </ServiceLayout>
  );
}
