import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Layers, RefreshCw, Tag } from "lucide-react";
import { useDetail, useSiteData } from "../../hooks/useSiteData";
import { Badge, CtaBanner, EmptyState, PageHero, SampleBadge, Section, Spinner } from "../../Components/common/primitives";
import NotFound from "./NotFound";

const TextBlock = ({ title, text }) =>
  text ? (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-[#CBD5E1] text-lg leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  ) : null;

export default function ProjectDetails() {
  const { slug } = useParams();
  const { item, summary, state } = useDetail("portfolio", slug);
  const { portfolio } = useSiteData();
  const project = item || summary;

  if (state === "not-found") return <NotFound />;
  if (!project && state === "error") {
    return (
      <Section className="pt-40">
        <EmptyState icon={RefreshCw} title="We couldn't load this project" text="Please try again in a moment." action={<Link to="/portfolio" className="text-sm font-semibold text-[#F97316]">Back to portfolio</Link>} />
      </Section>
    );
  }
  if (!project) return <div className="pt-40"><Spinner label="Loading project" /></div>;

  const index = portfolio.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? portfolio[index - 1] : null;
  const next = index >= 0 && index < portfolio.length - 1 ? portfolio[index + 1] : null;

  return (
    <>
      <PageHero
        eyebrow="Project Case Study"
        title={project.title}
        intro={project.summary}
        aside={
          project.image ? (
            <div className="relative">
              <div className="absolute -inset-4 bg-[#F97316]/15 blur-3xl rounded-full" aria-hidden="true" />
              <img src={project.image} alt={project.imageAlt || ""} width="1200" height="675" className="relative w-full aspect-video object-cover rounded-2xl border border-[var(--rj-panel-border)] shadow-2xl" />
            </div>
          ) : null
        }
      >
        <ul className="flex flex-wrap gap-2 mt-6">
          <li><Badge tone="orange"><Layers size={12} aria-hidden="true" /> {project.category}</Badge></li>
          {project.isSample && <li><SampleBadge /></li>}
          {(project.technologies || []).slice(0, 4).map((tech) => <li key={tech}><Badge><Tag size={11} aria-hidden="true" /> {tech}</Badge></li>)}
        </ul>
      </PageHero>

      <Section>
        {state === "loading" && !item ? (
          <Spinner label="Loading case study" />
        ) : (
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12">
            <div className="space-y-12">
              <TextBlock title="Project overview" text={project.description} />
              <TextBlock title="The challenge" text={project.challenge} />
              <TextBlock title="Our solution" text={project.solution} />
              <TextBlock title="Results" text={project.results} />
            </div>
            <aside className="space-y-6">
              {project.highlights?.length > 0 && (
                <div className="p-7 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
                  <h2 className="text-lg font-bold text-[var(--rj-cyan)] mb-4">Highlights</h2>
                  <ul className="space-y-3">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[#CBD5E1]"><CheckCircle2 size={18} className="text-[#F97316] shrink-0 mt-0.5" aria-hidden="true" /> {h}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.technologies?.length > 0 && (
                <div className="p-7 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
                  <h2 className="text-lg font-bold text-white mb-4">Technologies used</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-white text-center">{tech}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        )}

        <nav aria-label="More projects" className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4">
          {prev ? (
            <Link to={`/portfolio/${prev.slug}`} className="group inline-flex items-center gap-3 text-[#CBD5E1] hover:text-[#F97316]">
              <ArrowLeft size={18} aria-hidden="true" /> <span><span className="block text-xs text-white/40">Previous</span>{prev.title}</span>
            </Link>
          ) : <span />}
          <Link to="/portfolio" className="text-sm font-semibold text-[#F97316] self-center hover:underline">All projects</Link>
          {next ? (
            <Link to={`/portfolio/${next.slug}`} className="group inline-flex items-center gap-3 text-right text-[#CBD5E1] hover:text-[#F97316]">
              <span><span className="block text-xs text-white/40">Next</span>{next.title}</span> <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ) : <span />}
        </nav>
      </Section>

      <CtaBanner title="Have a similar project?" />
    </>
  );
}
