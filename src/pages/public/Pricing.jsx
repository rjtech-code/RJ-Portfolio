import { useState } from "react";
import { Check, CheckCircle2, Minus } from "lucide-react";
import { pricingComparison, pricingFactors, pricingPackages } from "../../data/content";
import { pageByKey } from "../../config/pages";
import { usePageContent } from "../../hooks/useSiteData";
import { PageHero, Section } from "../../Components/common/primitives";
import ContactForm from "../../Components/public/ContactForm";

const Cell = ({ value }) =>
  value === true ? (
    <Check size={18} className="mx-auto text-emerald-300" aria-label="Included" />
  ) : value === false ? (
    <Minus size={18} className="mx-auto text-white/25" aria-label="Not included" />
  ) : (
    <span className="text-xs font-semibold text-[#FDBA74]">{value}</span>
  );

export default function Pricing() {
  const { heading, intro } = usePageContent("pricing", pageByKey.pricing);
  const [projectType, setProjectType] = useState("Business Website");
  const [formKey, setFormKey] = useState(0);

  const requestQuote = (type) => {
    setProjectType(type);
    setFormKey((k) => k + 1); // remount the form with the chosen project type
    document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHero eyebrow="Pricing" title="Pricing & Project Estimates" accent={heading} intro={intro} />

      <Section>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPackages.map((pkg) => (
            <li key={pkg.name} className={`relative flex flex-col p-7 rounded-2xl border bg-[var(--rj-panel)] transition-colors ${pkg.highlighted ? "border-[#F97316]/60 shadow-[0_0_40px_-15px_rgba(249,115,22,0.5)]" : "border-[var(--rj-panel-border)] hover:border-white/25"}`}>
              {pkg.highlighted && <span className="absolute -top-3 left-7 px-3 py-0.5 rounded-full bg-[#F97316] text-white text-xs font-bold">Most requested</span>}
              <h2 className="text-xl font-bold text-white mb-2">{pkg.name}</h2>
              <p className="text-[#F97316] font-bold mb-3">{pkg.range}</p>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">{pkg.desc}</p>
              <ul className="space-y-2.5 mb-8 flex-grow">
                {pkg.features.map((f) => <li key={f} className="flex gap-2 text-sm text-[#CBD5E1]"><CheckCircle2 size={16} className="text-[#F97316] shrink-0 mt-0.5" aria-hidden="true" />{f}</li>)}
              </ul>
              <button
                type="button"
                onClick={() => requestQuote(pkg.projectType)}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] ${pkg.highlighted ? "bg-[#F97316] text-white hover:bg-[#EA580C]" : "border border-[#F97316]/50 text-[#FDBA74] hover:bg-[#F97316] hover:text-white"}`}
              >
                {pkg.cta}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[#94A3B8]">Prices depend on scope. We share a written estimate after understanding your requirements.</p>
      </Section>

      <Section tone="light">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-6">Compare packages</h2>
            <div className="overflow-x-auto rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
              <table className="w-full min-w-[560px] text-sm">
                <caption className="sr-only">Features included in each package</caption>
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th scope="col" className="px-5 py-4 font-semibold text-[#94A3B8]">Feature</th>
                    {pricingComparison.columns.map((c) => <th key={c} scope="col" className="px-3 py-4 font-semibold text-white text-center">{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {pricingComparison.rows.map((row) => (
                    <tr key={row.label} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                      <th scope="row" className="px-5 py-3.5 font-medium text-[#CBD5E1] text-left">{row.label}</th>
                      {row.values.map((v, i) => <td key={i} className="px-3 py-3.5 text-center"><Cell value={v} /></td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--rj-cyan)] tracking-tight mb-6">Factors affecting cost</h2>
            <ul className="space-y-4">
              {pricingFactors.map((factor) => (
                <li key={factor.title} className="p-5 rounded-xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
                  <h3 className="text-white font-semibold mb-1">{factor.title}</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">{factor.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="estimate" className="scroll-mt-20" eyebrow="Request an estimate" title="Get a quote for your project" intro="Tell us what you need. The more detail you share, the more accurate our estimate.">
        <div className="max-w-3xl p-6 md:p-10 rounded-3xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
          <ContactForm key={formKey} defaultProjectType={projectType} detailsLabel="Project requirements" detailsPlaceholder="Pages or features you need, integrations, deadline, budget range if you have one…" />
        </div>
      </Section>
    </>
  );
}
