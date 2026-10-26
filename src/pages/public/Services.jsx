import { CheckCircle2 } from "lucide-react";
import { services } from "../../data/services";
import { processSteps } from "../../data/content";
import { pageByKey } from "../../config/pages";
import { usePageContent } from "../../hooks/useSiteData";
import { ButtonLink, CtaBanner, PageHero, Section } from "../../Components/common/primitives";
import { ServiceCard } from "../../Components/public/Cards";
import { StepRow } from "../../Components/public/Blocks";

const capabilities = ["Frontend development", "Backend & APIs", "Database design", "Responsive design", "Cloud deployment", "Maintenance & support"];

export default function Services() {
  const { heading, intro } = usePageContent("services", pageByKey.services);

  return (
    <>
      <PageHero eyebrow="Our Services" title="Our Services" accent={heading} intro={intro} />

      <Section>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <li key={service.slug}><ServiceCard service={service} /></li>
          ))}
        </ul>
      </Section>

      <Section tone="light" eyebrow="Capabilities" title="What every project can include">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((item) => (
            <li key={item} className="flex items-center gap-3 p-5 rounded-xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] text-white font-medium">
              <CheckCircle2 size={20} className="text-[#F97316] shrink-0" aria-hidden="true" /> {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Process" title="One process for every service" intro="Whatever you need, projects follow the same transparent steps.">
        <StepRow steps={processSteps} />
        <div className="mt-10"><ButtonLink to="/process" variant="secondary" arrow>Read about our process</ButtonLink></div>
      </Section>

      <CtaBanner title="Not sure which service you need?" text="Describe your idea and we'll recommend the right approach." />
    </>
  );
}
