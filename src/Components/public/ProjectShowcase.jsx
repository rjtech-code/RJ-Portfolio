import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Globe2 } from "lucide-react";
import { Section } from "../common/primitives";
import { services } from "../../data/services";

const groups = [
  { key: "Completed", title: "Completed Projects", description: "Delivered projects, live and ready to explore." },
  { key: "In Progress", title: "In-Progress Projects", description: "Products and experiences currently being built." },
  { key: "On Hold", title: "On-Hold Projects", description: "Projects temporarily paused." },
];

const groupStatus = (status) => status === "Completed" ? "Completed" : status === "On Hold" ? "On Hold" : "In Progress";
const orderedProjects = (projects) => [...projects].sort((a, b) => {
  const rank = { Completed: 0, "In Progress": 1, "On Hold": 2 };
  return rank[groupStatus(a.status)] - rank[groupStatus(b.status)];
});

function Preview({ project }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#07101f]">
      <div className="flex h-8 items-center gap-2 border-b border-white/10 bg-[#111c2e] px-3">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <div className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-black/30 px-2 py-1 text-[10px] text-slate-400">
          <Globe2 size={10} className="shrink-0" />
          <span className="truncate">{project.liveUrl}</span>
        </div>
      </div>
      {project.liveUrl && !failed ? (
        <iframe
          title={`${project.name} live website preview`}
          src={project.liveUrl}
          loading="lazy"
          onError={() => setFailed(true)}
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-52 w-full bg-white sm:h-60"
        />
      ) : (
        <div className="flex h-52 flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#10264A] to-[#081329] px-6 text-center sm:h-60">
          <Globe2 size={30} className="text-[#F97316]" />
          <p className="text-sm text-slate-300">Live preview is unavailable for this website.</p>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#F97316]">Open website <ExternalLink size={13} className="inline" /></a>}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  const status = groupStatus(project.status);
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] transition-colors hover:border-[#F97316]/50">
      <div className="grid flex-1 gap-4 p-4 sm:grid-cols-[1.05fr_0.95fr] sm:p-5">
        <div className="flex min-w-0 flex-col">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#F97316]/30 bg-[#F97316]/10 px-2.5 py-1 text-[11px] font-bold text-[#FDBA74]">{service?.title || project.serviceTypeLabel || project.serviceType || "Project"}</span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${status === "Completed" ? "bg-emerald-400/10 text-emerald-300" : status === "On Hold" ? "bg-amber-400/10 text-amber-200" : "bg-sky-400/10 text-sky-200"}`}>{status}</span>
          </div>
          <h3 className="text-xl font-extrabold leading-tight text-white">{project.name}</h3>
          {project.clientName && <p className="mt-1 text-xs text-slate-400">For {project.clientName}</p>}
          {project.description && <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-slate-300">{project.description}</p>}
          {project.budget != null && <p className="mt-4 text-sm font-semibold text-white">Project value: ₹{Number(project.budget).toLocaleString("en-IN")}</p>}
          <div className="mt-auto flex flex-wrap gap-3 pt-5">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#F97316] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500">Go Live <ExternalLink size={14} /></a>}
          </div>
        </div>
        <Preview project={project} />
      </div>
    </article>
  );
}

export default function ProjectShowcase({ projects = [], mode = "slider", serviceType = null }) {
  const filtered = useMemo(() => orderedProjects(projects.filter((p) => !serviceType || p.serviceType === serviceType)), [projects, serviceType]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => { setActive(0); }, [serviceType, filtered.length]);
  useEffect(() => {
    if (mode !== "slider" || paused || filtered.length < 2) return undefined;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % filtered.length), 4200);
    return () => window.clearInterval(timer);
  }, [mode, paused, filtered.length]);

  useEffect(() => {
    if (mode !== "slider" || !trackRef.current) return;
    const node = trackRef.current.querySelector(`[data-project-index="${active}"]`);
    node?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, [active, mode]);

  if (!filtered.length) return null;

  if (mode === "sections") {
    return <>{groups.map((group) => {
      const items = filtered.filter((p) => groupStatus(p.status) === group.key);
      if (!items.length) return null;
      return (
        <Section key={group.key} eyebrow="Selected work" title={group.title} intro={group.description}>
          <div className="grid gap-6">{items.map((project) => <ProjectCard key={project._id || project.name} project={project} />)}</div>
        </Section>
      );
    })}</>;
  }

  return (
    <Section eyebrow="Our work" title="Projects in action" intro="Explore completed work and projects currently in progress.">
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>
        <div className="mb-4 flex justify-end gap-2">
          <button type="button" aria-label="Previous project" onClick={() => setActive((n) => (n - 1 + filtered.length) % filtered.length)} className="rounded-full border border-white/15 p-2.5 text-white hover:border-[#F97316] hover:text-[#F97316]"><ArrowLeft size={18} /></button>
          <button type="button" aria-label="Next project" onClick={() => setActive((n) => (n + 1) % filtered.length)} className="rounded-full border border-white/15 p-2.5 text-white hover:border-[#F97316] hover:text-[#F97316]"><ArrowRight size={18} /></button>
        </div>
        <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:thin]" aria-label="Project slider">
          {filtered.map((project, index) => <div key={project._id || project.name} data-project-index={index} className="w-full min-w-full snap-start">{<ProjectCard project={project} />}</div>)}
        </div>
      </div>
    </Section>
  );
}
