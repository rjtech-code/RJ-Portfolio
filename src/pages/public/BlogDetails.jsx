import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, RefreshCw, Tag } from "lucide-react";
import { useDetail, useSiteData } from "../../hooks/useSiteData";
import { useRouteMeta } from "../../hooks/useSeo";
import { Badge, Breadcrumbs, Container, CtaBanner, DraftNotice, EmptyState, RichText, SampleBadge, Section, Spinner } from "../../Components/common/primitives";
import { PostCard } from "../../Components/public/Cards";
import { formatDate, readingTime } from "../../utils/siteData";
import NotFound from "./NotFound";

export default function BlogDetails() {
  const { slug } = useParams();
  const { item: post, summary, state } = useDetail("blog", slug);
  const { posts } = useSiteData();
  const meta = useRouteMeta();
  const header = post || summary;

  if (state === "not-found") return <NotFound />;
  if (!header && state === "error") {
    return (
      <Section className="pt-40">
        <EmptyState icon={RefreshCw} title="We couldn't load this article" text="Please try again in a moment." action={<Link to="/blog" className="text-sm font-semibold text-[#F97316]">Back to the blog</Link>} />
      </Section>
    );
  }
  if (!header) return <div className="pt-40"><Spinner label="Loading article" /></div>;

  const related = posts.filter((p) => p.slug !== slug && p.category === header.category).slice(0, 2);
  const more = related.length ? related : posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative pt-32 md:pt-40 pb-10 bg-[var(--rj-navy-950)] overflow-hidden">
          <div className="absolute inset-0 circuit-bg pointer-events-none" aria-hidden="true" />
          <Container className="relative max-w-3xl!">
            {meta.breadcrumbs && <Breadcrumbs items={meta.breadcrumbs} />}
            {header.isSample && <DraftNotice sample />}
            <div className="flex flex-wrap items-center gap-3 mb-5 text-sm text-[#94A3B8]">
              <Badge tone="orange">{header.category}</Badge>
              {header.isSample && <SampleBadge />}
              {header.publishedAt && <time dateTime={header.publishedAt}>{formatDate(header.publishedAt)}</time>}
              {post?.content && <span className="inline-flex items-center gap-1"><Clock size={13} aria-hidden="true" /> {readingTime(post.content)}</span>}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">{header.title}</h1>
            {header.excerpt && <p className="text-lg md:text-xl text-[#CBD5E1] leading-relaxed">{header.excerpt}</p>}
            <p className="mt-6 text-sm text-white/50">By {header.author || "RJ TechForce"}</p>
          </Container>
        </header>

        <Container className="max-w-3xl! pb-16">
          {header.coverImage && <img src={header.coverImage} alt="" width="1200" height="630" className="w-full aspect-[1200/630] object-cover rounded-2xl border border-[var(--rj-panel-border)] mb-10" />}
          {post ? <RichText text={post.content} /> : <Spinner label="Loading article" />}
          {header.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10" aria-label="Tags">
              {header.tags.map((tag) => <li key={tag}><Badge><Tag size={11} aria-hidden="true" /> {tag}</Badge></li>)}
            </ul>
          )}
          <Link to="/blog" className="inline-flex items-center gap-2 mt-10 text-sm font-semibold text-[#F97316] hover:gap-3 transition-all">
            <ArrowLeft size={16} aria-hidden="true" /> All articles
          </Link>
        </Container>
      </article>

      {more.length > 0 && (
        <Section tone="light" title="Keep reading">
          <ul className="grid md:grid-cols-2 gap-6">{more.map((p) => <li key={p.slug}><PostCard post={p} /></li>)}</ul>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
