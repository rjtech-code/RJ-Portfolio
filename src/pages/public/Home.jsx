import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Code, LayoutTemplate, Rocket, ShieldCheck } from "lucide-react";
import Hero from "../../Components/Hero";
import { services } from "../../data/services";
import { faqGroups, processSteps } from "../../data/content";
import { useSiteData } from "../../hooks/useSiteData";
import { Container, CtaBanner, Eyebrow, Section, SkeletonGrid, EmptyState, ButtonLink } from "../../Components/common/primitives";
import Spot from "../../Components/common/Spot";
import { ProjectCard } from "../../Components/public/Cards";
import { FaqAccordion, StepRow, Testimonials } from "../../Components/public/Blocks";

const reasons = [
  { icon: Code, title: "React & full-stack expertise", desc: "Modern frontends with React and reliable backends with Node.js, Express and databases." },
  { icon: LayoutTemplate, title: "Design that serves the business", desc: "Clear layouts, responsive design and user flows that make it easy to contact or buy." },
  { icon: ShieldCheck, title: "Built to be maintained", desc: "Clean code, secure foundations and documentation so your product can grow." },
  { icon: Rocket, title: "From idea to launch", desc: "Planning, design, development, deployment and support handled by one team." },
];

const TILE_TINTS = ["text-[#F97316] bg-[#F97316]/10", "text-sky-300 bg-sky-400/10", "text-cyan-300 bg-cyan-400/10", "text-pink-300 bg-pink-400/10", "text-amber-300 bg-amber-400/10", "text-violet-300 bg-violet-400/10"];

const FeaturedProjects = () => {
  const { portfolio, status } = useSiteData();
  const featured = [...portfolio].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 3);

  return (
    <Section eyebrow="Portfolio" title="Our featured projects" tone="light">
      {featured.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      ) : status === "loading" ? (
        <SkeletonGrid count={3} />
      ) : (
        <EmptyState title="Projects coming soon" text="Our latest case studies will appear here." />
      )}
      <div className="mt-10">
        <ButtonLink to="/portfolio" variant="secondary" arrow>View full portfolio</ButtonLink>
      </div>
    </Section>
  );
};

export default function Home() {
  const faqPreview = faqGroups.flatMap((group) => group.items).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Service tiles directly under the hero, as in the reference layout */}
      <section aria-labelledby="home-services" className="relative bg-[var(--rj-navy-900)] border-y border-[var(--rj-panel-border)]">
        <Container className="py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <Eyebrow>What we do</Eyebrow>
              <h2 id="home-services" className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-4">Services for every stage of your product</h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:gap-3 transition-all">
              All services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`} className="group flex flex-col items-center text-center h-full gap-3 p-5 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] hover:border-[#F97316]/50 hover:-translate-y-1 transition-all focus-visible:outline-2 focus-visible:outline-[#F97316]">
                  <span className={`w-full rounded-xl flex items-center justify-center ${TILE_TINTS[index % TILE_TINTS.length]}`}>
                    <Spot variant={service.spot} className="w-full h-20 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#F97316] transition-colors">{service.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Company introduction */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>About RJ TechForce</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-4 mb-5">
              A web development team <span className="text-[var(--rj-cyan)]">from Churu, Rajasthan</span>
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed mb-6">
              Since 2021 we have been designing and building websites, web applications and SaaS products. We work
              closely with each client, from the first conversation to launch and support.
            </p>
            <ButtonLink to="/about" variant="secondary" arrow>More about us</ButtonLink>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4">
            {reasons.map(({ icon: ReasonIcon, title, desc }) => (
              <li key={title} className="p-6 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
                <ReasonIcon size={22} className="text-[#F97316] mb-4" aria-hidden="true" />
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FeaturedProjects />

      {/* Why choose */}
      <Section eyebrow="Why RJ TechForce" title="Why businesses work with us" align="center">
        <ul className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            ["Custom, not templated", "Every project is designed and built for your requirements."],
            ["Clear communication", "Regular updates, a staging link and direct contact on WhatsApp or email."],
            ["Support after launch", "Maintenance, fixes and improvements when you need them."],
          ].map(([title, desc]) => (
            <li key={title} className="flex gap-4 p-6 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
              <CheckCircle2 size={22} className="text-[#F97316] shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-white font-bold mb-1">{title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Process preview */}
      <Section eyebrow="Process" title="How a project runs" intro="Seven clear steps from the first call to ongoing support." tone="light">
        <StepRow steps={processSteps} />
        <div className="mt-10">
          <ButtonLink to="/process" variant="secondary" arrow>See our process in detail</ButtonLink>
        </div>
      </Section>

      <Testimonials />

      {/* FAQ preview */}
      <Section eyebrow="FAQ" title="Common questions">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10">
          <div>
            <p className="text-[#94A3B8] text-base leading-relaxed mb-6">Quick answers about services, timelines and support.</p>
            <ButtonLink to="/faq" variant="secondary" arrow>All FAQs</ButtonLink>
          </div>
          <FaqAccordion items={faqPreview} idPrefix="home-faq" />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
