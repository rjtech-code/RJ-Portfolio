import { CheckCircle2, FileCheck2, UserRound } from "lucide-react";
import { communication, processSteps } from "../../data/content";
import { pageByKey } from "../../config/pages";
import { usePageContent } from "../../hooks/useSiteData";
import { CtaBanner, PageHero, Section } from "../../Components/common/primitives";
import { Icon } from "../../Components/common/Icon";

export default function Process() {
  const { heading, intro } = usePageContent("process", pageByKey.process);

  return (
    <>
      <PageHero eyebrow="Process" title="Our Development Process" accent={heading} intro={intro} />

      {/* Horizontal numbered timeline (reference layout); stacks on small screens */}
      <Section>
        <ol className="relative grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-4">
          <span className="absolute hidden lg:block top-7 left-[7%] right-[7%] h-0.5 bg-gradient-to-r from-[#F97316] via-[#F97316]/40 to-[#F97316]" aria-hidden="true" />
          {processSteps.map((step, index) => (
            <li key={step.title} className="relative text-center">
              <a href={`#step-${index + 1}`} className="group flex flex-col items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316] rounded-xl">
                <span className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold transition-transform group-hover:scale-110 ${index % 2 === 0 ? "bg-[#F97316] text-white shadow-[0_0_25px_rgba(249,115,22,0.45)]" : "bg-[var(--rj-navy-950)] border-2 border-[#F97316] text-[#F97316]"}`}>
                  {index + 1}
                </span>
                <span className="text-white font-semibold">{step.title}</span>
                <span className="text-xs text-[#94A3B8] leading-relaxed px-1">{step.summary}</span>
              </a>
            </li>
          ))}
        </ol>
      </Section>

      {/* Step details */}
      <Section tone="light" eyebrow="Step by step" title="What happens at each stage">
        <ol className="space-y-6">
          {processSteps.map((step, index) => (
            <li key={step.title} id={`step-${index + 1}`} className="scroll-mt-28 grid md:grid-cols-[220px_1fr] gap-6 p-7 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
              <div className="flex md:flex-col items-center md:items-start gap-4">
                <span className="w-12 h-12 rounded-xl bg-[#F97316]/10 text-[#F97316] flex items-center justify-center"><Icon name={step.icon} size={22} /></span>
                <div>
                  <span className="text-xs font-bold text-[#F97316]">Step {String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--rj-cyan)] mb-3">What happens</h4>
                  <ul className="space-y-2">{step.activities.map((a) => <li key={a} className="flex gap-2 text-sm text-[#CBD5E1]"><CheckCircle2 size={16} className="text-[#F97316] shrink-0 mt-0.5" aria-hidden="true" />{a}</li>)}</ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--rj-cyan)] mb-3">Deliverables</h4>
                  <ul className="space-y-2">{step.deliverables.map((d) => <li key={d} className="flex gap-2 text-sm text-[#CBD5E1]"><FileCheck2 size={16} className="text-[#F97316] shrink-0 mt-0.5" aria-hidden="true" />{d}</li>)}</ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--rj-cyan)] mb-3">Your involvement</h4>
                  <p className="flex gap-2 text-sm text-[#CBD5E1]"><UserRound size={16} className="text-[#F97316] shrink-0 mt-0.5" aria-hidden="true" />{step.you}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Communication" title="Communication & deliverables">
        <ul className="grid md:grid-cols-3 gap-6">
          {communication.map((item) => (
            <li key={item.title} className="text-center p-8 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
              <span className="mx-auto w-16 h-16 rounded-full border border-[#F97316]/40 bg-[#F97316]/10 text-[#F97316] flex items-center justify-center mb-5"><Icon name={item.icon} size={26} /></span>
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner title="Ready for step one?" text="Book a discovery call and tell us about your goals." primary={{ to: "/contact", label: "Start with discovery" }} secondary={{ to: "/pricing", label: "See pricing" }} />
    </>
  );
}
