import { useMemo, useState } from "react";
import { FolderOpen, RefreshCw } from "lucide-react";
import { pageByKey } from "../../config/pages";
import { usePageContent, useSiteData } from "../../hooks/useSiteData";
import { CtaBanner, EmptyState, PageHero, Section, SkeletonGrid } from "../../Components/common/primitives";
import { ProjectCard } from "../../Components/public/Cards";

const ALL = "All";

export default function Portfolio() {
  const { heading, intro } = usePageContent("portfolio", pageByKey.portfolio);
  const { portfolio, status } = useSiteData();
  const [filter, setFilter] = useState(ALL);

  // Only show categories that have published projects
  const categories = useMemo(() => [ALL, ...new Set(portfolio.map((p) => p.category))], [portfolio]);
  const visible = filter === ALL ? portfolio : portfolio.filter((p) => p.category === filter);

  return (
    <>
      <PageHero eyebrow="Portfolio" title="Our Portfolio" accent={heading} intro={intro} />

      <Section>
        {categories.length > 1 && (
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-3 mb-10">
            {categories.map((category) => {
              const active = filter === category;
              const count = category === ALL ? portfolio.length : portfolio.filter((p) => p.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] ${
                    active ? "bg-[#F97316] border-[#F97316] text-white shadow-lg shadow-[#F97316]/20" : "border-[var(--rj-panel-border)] bg-[var(--rj-panel)] text-[#CBD5E1] hover:text-white hover:border-white/30"
                  }`}
                >
                  {category} <span className={active ? "text-white/80" : "text-white/40"}>({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {status === "loading" && portfolio.length === 0 ? (
          <SkeletonGrid />
        ) : status === "error" && portfolio.length === 0 ? (
          <EmptyState
            icon={RefreshCw}
            title="We couldn't load the portfolio"
            text="Please check your connection and try again."
            action={<button type="button" onClick={() => window.location.reload()} className="text-sm font-semibold text-[#F97316] hover:underline">Reload page</button>}
          />
        ) : visible.length === 0 ? (
          <EmptyState icon={FolderOpen} title="No projects published yet" text="New case studies will appear here soon." />
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((project) => <li key={project.slug}><ProjectCard project={project} /></li>)}
          </ul>
        )}
      </Section>

      <CtaBanner title="Want results like these?" secondary={{ to: "/services", label: "Explore services" }} />
    </>
  );
}
