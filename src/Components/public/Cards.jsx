import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Spot from "../common/Spot";
import { spotForCategory } from "../../utils/spot";
import { Badge, SampleBadge } from "../common/primitives";
import { formatDate, readingTime } from "../../utils/siteData";

export const ServiceCard = ({ service, compact = false }) => (
  <Link
    to={`/services/${service.slug}`}
    className="group relative flex flex-col h-full bg-[var(--rj-panel)] border border-[var(--rj-panel-border)] rounded-2xl p-7 transition-all duration-300 hover:border-[#F97316]/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(249,115,22,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
  >
    <span className="absolute top-0 left-0 h-0.5 w-0 bg-[#F97316] transition-all duration-500 group-hover:w-full" aria-hidden="true" />
    <div className="-mx-2 -mt-2 mb-5 rounded-xl bg-[var(--rj-navy-950)]/60 border border-white/5 overflow-hidden">
      <Spot variant={service.spot} className="w-full h-28 transition-transform duration-500 group-hover:scale-105" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
    <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 flex-grow">{service.summary}</p>
    {!compact && (
      <div className="flex flex-wrap gap-1.5 mb-6">
        {service.technologies.slice(0, 4).map((tech) => <Badge key={tech}>{tech}</Badge>)}
      </div>
    )}
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] transition-all group-hover:gap-3">
      Learn more <ArrowRight size={16} aria-hidden="true" />
    </span>
  </Link>
);

export const ProjectCard = ({ project }) => (
  <Link
    to={`/portfolio/${project.slug}`}
    className="group flex flex-col h-full bg-[var(--rj-panel)] border border-[var(--rj-panel-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#F97316]/50 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
  >
    <div className="relative aspect-video overflow-hidden bg-white/5">
      {project.image ? (
        <img src={project.image} alt={project.imageAlt || ""} loading="lazy" width="800" height="450" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#10264A] to-[#081329] flex items-center justify-center">
          <Spot variant={spotForCategory(project.category)} className="w-4/5 h-4/5 transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" aria-hidden="true" />
      <div className="absolute top-4 left-4 flex gap-2">
        <Badge tone="orange" className="bg-[var(--rj-navy-950)]/80 backdrop-blur">{project.category}</Badge>
        {project.isSample && <SampleBadge />}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-white font-bold text-xl mb-2 leading-tight group-hover:text-[#F97316] transition-colors">{project.title}</h3>
      <p className="text-[#CBD5E1] text-sm leading-relaxed mb-5 flex-grow line-clamp-3">{project.summary}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {(project.technologies || []).slice(0, 4).map((tech) => <Badge key={tech}>{tech}</Badge>)}
      </div>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] transition-all group-hover:gap-3">
        View case study <ArrowRight size={16} aria-hidden="true" />
      </span>
    </div>
  </Link>
);

export const PostCard = ({ post, featured = false }) => (
  <Link
    to={`/blog/${post.slug}`}
    className={`group flex flex-col h-full bg-[var(--rj-panel)] border border-[var(--rj-panel-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#F97316]/50 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] ${featured ? "md:flex-row" : ""}`}
  >
    {post.coverImage ? (
      <div className={`overflow-hidden bg-white/5 ${featured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video"}`}>
        <img src={post.coverImage} alt="" loading="lazy" width="800" height="450" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
    ) : (
      <div className={`relative bg-gradient-to-br from-[#10264A] to-[#081329] flex items-center justify-center ${featured ? "md:w-1/2 min-h-48" : "h-40"}`} aria-hidden="true">
        <Spot variant={/react/i.test(post.category) ? "react" : /design/i.test(post.category) ? "uiux" : /performance|seo/i.test(post.category) ? "chart" : /business/i.test(post.category) ? "rocket" : "code"} className="w-3/4 h-3/4" />
      </div>
    )}
    <div className={`p-6 flex flex-col flex-grow ${featured ? "md:p-10 md:justify-center" : ""}`}>
      <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] text-[#94A3B8]">
        <Badge tone="orange">{post.category}</Badge>
        {post.isSample && <SampleBadge />}
        {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
        {post.content && <span className="inline-flex items-center gap-1"><Clock size={11} aria-hidden="true" /> {readingTime(post.content)}</span>}
      </div>
      <h3 className={`font-bold text-white leading-snug mb-3 group-hover:text-[#F97316] transition-colors ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>{post.title}</h3>
      <p className="text-[#CBD5E1] text-sm leading-relaxed mb-5 flex-grow line-clamp-3">{post.excerpt}</p>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] transition-all group-hover:gap-3">
        Read article <ArrowRight size={16} aria-hidden="true" />
      </span>
    </div>
  </Link>
);
