import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Globe2, X } from "lucide-react";
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

function Preview({ project, compact = false }) {
  const [failed, setFailed] = useState(false);
  const [mobileViewport, setMobileViewport] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const viewportRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setMobileViewport(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return undefined;
    const observer = new ResizeObserver((entries) => setContainerWidth(entries[0]?.contentRect.width || node.clientWidth));
    observer.observe(node);
    setContainerWidth(node.clientWidth);
    return () => observer.disconnect();
  }, []);

  useEffect(() => setFailed(false), [project.liveUrl]);

  const frameWidth = mobileViewport ? 390 : 1200;
  const frameHeight = mobileViewport ? 520 : 760;
  const scale = Math.min(1, containerWidth > 0 ? containerWidth / frameWidth : 1);

  return (
    <div className={`relative min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#07101f] ${compact ? "shadow-lg shadow-black/20" : ""}`}>
      <div className="flex h-8 items-center gap-2 border-b border-white/10 bg-[#111c2e] px-3">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <div className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-black/30 px-2 py-1 text-[10px] text-slate-400">
          <Globe2 size={10} className="shrink-0" />
          <span className="truncate">{project.liveUrl || "Website preview"}</span>
          <span className="ml-auto shrink-0 text-[9px] uppercase tracking-wider text-slate-500">{mobileViewport ? "Mobile" : "Desktop"}</span>
        </div>
      </div>
      {project.liveUrl && !failed ? (
        <div ref={viewportRef} className="relative w-full overflow-hidden bg-white" style={{ height: frameHeight * scale }}>
          <iframe
            title={`${project.name} live website preview`}
            src={project.liveUrl}
            loading="lazy"
            onError={() => setFailed(true)}
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute top-0 max-w-none border-0 bg-white"
            style={{
              width: frameWidth,
              height: frameHeight,
              left: "50%",
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: "top center",
            }}
          />
        </div>
      ) : project.previewImage ? (
        <img src={project.previewImage} alt={`${project.name} project preview`} loading="lazy" className={`w-full bg-[#0b1424] object-contain ${compact ? "max-h-[650px]" : "h-52 sm:h-60"}`} />
      ) : (
        <div className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#10264A] to-[#081329] px-6 text-center ${compact ? "min-h-64" : "h-52 sm:h-60"}`}>
          <Globe2 size={30} className="text-[#F97316]" />
          <p className="text-sm text-slate-300">Add a live URL or preview image in the admin panel.</p>
        </div>
      )}
    </div>
  );
}

function ProjectDetails({ project, onClose }) {
  const service = services.find((item) => item.slug === project.serviceType);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="project-detail-title" className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1424] p-5 shadow-2xl sm:p-7">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F97316]">Project details</p>
            <h2 id="project-detail-title" className="mt-2 text-2xl font-extrabold text-white">{project.name}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close project details" className="rounded-full border border-white/10 p-2 text-slate-300 hover:text-white"><X size={18} /></button>
        </div>
        <div className="mb-5"><Preview project={project} /></div>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <p className="rounded-xl bg-white/[0.04] p-3 text-slate-300"><span className="block text-xs text-slate-500">Service</span><span className="mt-1 block font-semibold text-white">{service?.title || project.serviceTypeLabel || project.serviceType || "Project"}</span></p>
          <p className="rounded-xl bg-white/[0.04] p-3 text-slate-300"><span className="block text-xs text-slate-500">Status</span><span className="mt-1 block font-semibold text-white">{groupStatus(project.status)}</span></p>
          {project.clientName && <p className="rounded-xl bg-white/[0.04] p-3 text-slate-300"><span className="block text-xs text-slate-500">Client</span><span className="mt-1 block font-semibold text-white">{project.clientName}</span></p>}
          {project.budget != null && <p className="rounded-xl bg-white/[0.04] p-3 text-slate-300"><span className="block text-xs text-slate-500">Project value</span><span className="mt-1 block font-semibold text-white">₹{Number(project.budget).toLocaleString("en-IN")}</span></p>}
        </div>
        {project.description && <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-300">{project.description}</p>}
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#F97316] px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-500">Go Live <ExternalLink size={15} /></a>}
      </section>
    </div>
  );
}

function ProjectCard({ project, compact = false }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const status = groupStatus(project.status);
  const service = services.find((item) => item.slug === project.serviceType);

  if (compact) {
    return (
      <>
        <article className="min-w-0 overflow-hidden rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] transition-colors hover:border-[#F97316]/50">
          <div className="p-2 sm:p-4">
            <Preview project={project} compact />
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 pb-3 pt-1 sm:flex sm:justify-between sm:gap-3 sm:px-5 sm:pb-5">
            <div className="min-w-0">
              <h3 className="truncate text-base font-extrabold text-white sm:text-2xl">{project.name}</h3>
              {project.budget != null && <p className="mt-1 text-sm font-semibold text-[#FDBA74]">₹{Number(project.budget).toLocaleString("en-IN")}</p>}
            </div>
            <div className="flex shrink-0 flex-nowrap gap-1.5 sm:gap-2">
              <button type="button" onClick={() => setDetailsOpen(true)} className="inline-flex items-center justify-center rounded-lg border border-white/15 px-2.5 py-2 text-xs font-bold text-white transition hover:border-[#F97316] hover:text-[#FDBA74] sm:px-4 sm:py-2.5 sm:text-sm">Details</button>
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#F97316] px-2.5 py-2 text-xs font-bold text-white transition hover:bg-orange-500 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm">Go Live <ExternalLink size={14} /></a>}
            </div>
          </div>
        </article>
        {detailsOpen && <ProjectDetails project={project} onClose={() => setDetailsOpen(false)} />}
      </>
    );
  }

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
  const loopProjects = useMemo(() => [...filtered, ...filtered, ...filtered], [filtered]);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const trackRef = useRef(null);
  const speedRef = useRef(0.025);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (mode !== "slider" || filtered.length < 2 || !trackRef.current) return undefined;
    const track = trackRef.current;
    let frameId;
    let lastTime = 0;
    let groupWidth = 0;

    const measure = () => {
      const first = track.querySelector('[data-project-index="0"]');
      const nextGroup = track.querySelector(`[data-project-index="${filtered.length}"]`);
      if (!first || !nextGroup) return;
      groupWidth = nextGroup.offsetLeft - first.offsetLeft;
      if (groupWidth > 0 && track.dataset.loopReady !== "true") {
        track.scrollLeft = groupWidth + first.offsetLeft - (track.clientWidth - first.offsetWidth) / 2;
        track.dataset.loopReady = "true";
      }
    };

    const animate = (time) => {
      if (!track.isConnected) return;
      if (!lastTime) lastTime = time;
      const delta = Math.min(time - lastTime, 40);
      lastTime = time;

      if (!pausedRef.current && groupWidth > 0) {
        track.scrollLeft += speedRef.current * delta;
        if (track.scrollLeft >= groupWidth * 2) {
          track.scrollLeft -= groupWidth;
        }
      }

      const center = track.scrollLeft + track.clientWidth / 2;
      track.querySelectorAll("[data-project-index]").forEach((node) => {
        const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
        const normalized = (nodeCenter - center) / Math.max(node.offsetWidth, 1);
        const clamped = Math.max(-1.6, Math.min(1.6, normalized));
        const rotation = -clamped * 28;
        const depth = -Math.min(Math.abs(clamped) * 75, 120);
        const scale = 1 - Math.min(Math.abs(clamped) * 0.12, 0.18);
        node.style.transform = `rotateY(${rotation}deg) translateZ(${depth}px) scale(${scale})`;
        node.style.transformOrigin = normalized < 0 ? "right center" : "left center";
      });
      frameId = window.requestAnimationFrame(animate);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    frameId = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      delete track.dataset.loopReady;
    };
  }, [mode, filtered.length]);
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
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div
          ref={trackRef}
          className="flex items-stretch gap-3 overflow-x-auto px-[16.666vw] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 sm:px-0 sm:pb-3"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflowY: "hidden",
          }}
          aria-label="Continuously rolling project carousel"
        >
          {loopProjects.map((project, index) => (
            <div
              key={`${project._id || project.name}-loop-${index}`}
              data-project-index={index}
              data-real-index={index % filtered.length}
              className="w-[66.666vw] min-w-[66.666vw] max-w-[500px] flex-none sm:w-[500px] sm:min-w-[500px]"
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
            >
              <ProjectCard project={project} compact />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
