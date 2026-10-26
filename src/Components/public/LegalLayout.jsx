import { usePageContent, useSiteData } from "../../hooks/useSiteData";
import { pageByKey } from "../../config/pages";
import { legal } from "../../data/content";
import { Container, PageHero } from "../common/primitives";
import { formatDate } from "../../utils/siteData";

const anchor = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Shared layout for the legal pages: table of contents + numbered sections
export default function LegalLayout({ pageKey, title }) {
  const doc = legal[pageKey];
  const { settings } = useSiteData();
  const { heading } = usePageContent(pageKey, pageByKey[pageKey]);

  return (
    <>
      <PageHero eyebrow="Legal" title={heading || title} intro={`Last updated ${formatDate(doc.updated)}. This document is a draft and must be reviewed before it is relied on.`} />
      <Container className="py-16 grid lg:grid-cols-[240px_1fr] gap-12">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-28 space-y-1 text-sm">
            {doc.sections.map((section, i) => (
              <li key={section.title}><a href={`#${anchor(section.title)}`} className="block px-3 py-2 rounded-lg text-[#CBD5E1] hover:bg-white/5 hover:text-white">{i + 1}. {section.title}</a></li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl space-y-10">
          {doc.sections.map((section, i) => (
            <section key={section.title} id={anchor(section.title)} className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-4">{i + 1}. {section.title}</h2>
              {section.body.map((p) => <p key={p} className="text-[#CBD5E1] leading-relaxed mb-3">{p}</p>)}
            </section>
          ))}
          <section className="p-6 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
            <h2 className="text-lg font-bold text-white mb-2">Contact</h2>
            <p className="text-[#CBD5E1]">{settings.companyName}, {settings.locality}, {settings.region}, {settings.country}. Email: <a href={`mailto:${settings.email}`} className="text-[#F97316] hover:underline">{settings.email}</a></p>
          </section>
        </div>
      </Container>
    </>
  );
}
