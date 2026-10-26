import { Compass, Eye, HeartHandshake, Workflow } from "lucide-react";
import Technologies from "../../Components/Technologies";
import { about } from "../../data/content";
import { pageByKey } from "../../config/pages";
import { usePageContent } from "../../hooks/useSiteData";
import { ButtonLink, CtaBanner, PageHero, Section } from "../../Components/common/primitives";
import { Icon } from "../../Components/common/Icon";
import Spot from "../../Components/common/Spot";
import { HeroIllustration } from "../../Components/public/Illustrations";
import { Testimonials } from "../../Components/public/Blocks";

const pillars = [
  { icon: Compass, title: "Our Mission", text: about.mission },
  { icon: Eye, title: "Our Vision", text: about.vision },
  { icon: HeartHandshake, title: "Working Philosophy", text: "Honest estimates, clear communication and code we would be happy to maintain ourselves." },
  { icon: Workflow, title: "Development Approach", text: "Plan first, design with users in mind, build in small iterations and test before every release." },
];

export default function About() {
  const { heading, intro } = usePageContent("about", pageByKey.about);

  return (
    <>
      <PageHero
        eyebrow="About RJ TechForce"
        title="About RJ TechForce"
        accent={heading}
        intro={intro}
        actions={<><ButtonLink to="/contact" arrow>Work with us</ButtonLink><ButtonLink to="/portfolio" variant="secondary">See our work</ButtonLink></>}
        aside={<HeroIllustration variant="monitor" />}
      />

      {/* Mission / vision / philosophy / approach: 2x2 cards as in the reference */}
      <Section>
        <ul className="grid md:grid-cols-2 gap-6">
          {pillars.map(({ icon: PillarIcon, title, text }) => (
            <li key={title} className="p-8 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] hover:border-[#F97316]/40 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-lg bg-[#F97316] text-white flex items-center justify-center"><PillarIcon size={20} aria-hidden="true" /></span>
                <h2 className="text-xl font-bold text-[var(--rj-cyan)]">{title}</h2>
              </div>
              <p className="text-[#CBD5E1] leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Story + timeline */}
      <Section tone="light" eyebrow="Our story" title="How we got here">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-5 text-[#94A3B8] text-base leading-relaxed">
            {about.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <ol className="relative space-y-8 border-l border-white/10 pl-8">
            {about.milestones.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full border-2 border-[#F97316] bg-[var(--rj-navy-900)]" aria-hidden="true" />
                <span className="text-[#F97316] text-sm font-bold">{item.year}</span>
                <h3 className="text-white font-bold text-lg">{item.event}</h3>
                <p className="text-[#94A3B8]">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Values */}
      <Section eyebrow="Values" title="What we care about" align="center">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.values.map((value) => (
            <li key={value.title} className="group p-7 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] hover:border-[#F97316]/40 transition-colors">
              <span className="w-12 h-12 rounded-xl bg-[#F97316]/10 text-[#F97316] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"><Icon name={value.icon} size={22} /></span>
              <h3 className="text-white font-bold text-lg mb-2">{value.title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{value.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Team: roles until real profiles are approved */}
      <Section tone="light" eyebrow="Our team" title="How our team is organised" intro="Specialists who work together on every project.">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.teamAreas.map((area) => (
            <li key={area.title} className="text-center p-7 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
              <div className="mb-5 rounded-xl bg-[var(--rj-navy-950)]/60 border border-white/5"><Spot variant={area.spot} className="w-full h-28" /></div>
              <h3 className="text-white font-bold mb-2">{area.title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{area.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Technical capabilities (existing technology ecosystem section) */}
      <Technologies />

      <Testimonials />

      <CtaBanner title="Let's build something together" />
    </>
  );
}
