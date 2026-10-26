import { CheckCircle2, MessageSquare } from "lucide-react";
import { getService, services } from "../../data/services";
import { pageByKey } from "../../config/pages";
import { usePageContent, useSiteData } from "../../hooks/useSiteData";
import { ButtonLink, CtaBanner, PageHero, Section } from "../common/primitives";
import { ProjectCard, ServiceCard } from "./Cards";
import { FaqAccordion } from "./Blocks";
import { HeroIllustration } from "./Illustrations";
import { whatsappUrl } from "../../config/site";
import Spot from "../common/Spot";
import TechStack from "./TechStack";

// Bordered panel with an orange-bulleted list (two-column panels in the reference)
export const ListPanel = ({ title, items, accent = false }) => (
  <div className="p-7 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] h-full">
    <h2 className={`text-xl font-bold mb-5 ${accent ? "text-[var(--rj-cyan)]" : "text-white"}`}>{title}</h2>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[#CBD5E1] leading-relaxed">
          <CheckCircle2 size={18} className="text-[#F97316] shrink-0 mt-1" aria-hidden="true" /> {item}
        </li>
      ))}
    </ul>
  </div>
);

// Titled cards grid (offerings, use cases, ...); optional small illustration per card
export const CardGrid = ({ items, columns = "lg:grid-cols-4", spots }) => (
  <ul className={`grid sm:grid-cols-2 ${columns} gap-5`}>
    {items.map((item, index) => (
      <li key={item.title} className="group p-6 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] hover:border-[#F97316]/40 transition-colors">
        {spots && (
          <div className="-mx-2 -mt-2 mb-4 rounded-xl bg-[var(--rj-navy-950)]/60 border border-white/5 overflow-hidden">
            <Spot variant={spots[index % spots.length]} className="w-full h-24 transition-transform duration-500 group-hover:scale-105" />
          </div>
        )}
        <span className="block text-xs font-bold text-[#F97316] mb-3">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="text-white font-bold mb-2">{item.title}</h3>
        <p className="text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
      </li>
    ))}
  </ul>
);

// Shared frame for the six service pages. Each page file passes its own sections as children.
export default function ServiceLayout({ slug, illustration = "laptop", children }) {
  const service = getService(slug);
  const { heading, intro } = usePageContent(`service-${slug}`, pageByKey[`service-${slug}`]);
  const { portfolio, settings } = useSiteData();
  const related = portfolio.filter((item) => item.category === service.portfolioCategory).slice(0, 3);
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);
  const whatsapp = whatsappUrl(settings, `Hello RJ TechForce, I'm interested in ${service.title}.`);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={heading}
        accent={service.summary}
        intro={intro}
        actions={
          <>
            <ButtonLink to="/contact" arrow>Discuss your project</ButtonLink>
            {whatsapp && (
              <ButtonLink to={whatsapp} variant="secondary">
                <MessageSquare size={16} aria-hidden="true" /> WhatsApp us
              </ButtonLink>
            )}
          </>
        }
        aside={<HeroIllustration variant={illustration} />}
      />

      {children}

      <Section eyebrow="Technologies" title="Tools we use" intro="Languages, libraries and platforms we commonly use for this service." tone="light">
        <TechStack stack={service.stack} />
      </Section>

      {related.length > 0 && (
        <Section eyebrow="Related work" title={`${service.portfolioCategory} from our portfolio`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </Section>
      )}

      <Section eyebrow="FAQ" title={`${service.title}: common questions`} tone="light">
        <div className="max-w-3xl">
          <FaqAccordion items={service.faqs} idPrefix={`faq-${slug}`} />
        </div>
      </Section>

      <Section eyebrow="Explore" title="Other services">
        <ul className="grid md:grid-cols-3 gap-6">
          {otherServices.map((s) => <li key={s.slug}><ServiceCard service={s} compact /></li>)}
        </ul>
      </Section>

      <CtaBanner title={`Ready to start your ${service.title.toLowerCase()} project?`} />
    </>
  );
}
