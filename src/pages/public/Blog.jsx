import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, RefreshCw, Search } from "lucide-react";
import { pageByKey } from "../../config/pages";
import { usePageContent, useSiteData } from "../../hooks/useSiteData";
import { CtaBanner, EmptyState, PageHero, Section, SkeletonGrid } from "../../Components/common/primitives";
import { PostCard } from "../../Components/public/Cards";
import { formatDate } from "../../utils/siteData";

const ALL = "All";

export default function Blog() {
  const { heading, intro } = usePageContent("blog", pageByKey.blog);
  const { posts, status } = useSiteData();
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const counts = posts.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const q = query.trim().toLowerCase();
  const filtered = posts.filter(
    (p) =>
      (category === ALL || p.category === category) &&
      (!q || p.title.toLowerCase().includes(q) || (p.excerpt || "").toLowerCase().includes(q) || (p.tags || []).some((t) => t.toLowerCase().includes(q)))
  );
  const [featured, ...rest] = filtered;
  const recent = posts.slice(0, 4);

  return (
    <>
      <PageHero eyebrow="Blog" title="Latest Insights & Articles" accent={heading} intro={intro} />

      <Section>
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          <div>
            {status === "loading" && posts.length === 0 ? (
              <SkeletonGrid count={4} />
            ) : status === "error" && posts.length === 0 ? (
              <EmptyState icon={RefreshCw} title="We couldn't load the articles" text="Please check your connection and try again." action={<button type="button" onClick={() => window.location.reload()} className="text-sm font-semibold text-[#F97316] hover:underline">Reload page</button>} />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title={posts.length ? "No articles match your search" : "No articles published yet"}
                text={posts.length ? "Try another keyword or category." : "New articles will appear here soon."}
                action={posts.length ? <button type="button" onClick={() => { setQuery(""); setCategory(ALL); }} className="text-sm font-semibold text-[#F97316] hover:underline">Clear filters</button> : null}
              />
            ) : (
              <>
                <PostCard post={featured} featured />
                {rest.length > 0 && (
                  <ul className="grid sm:grid-cols-2 gap-6 mt-6">
                    {rest.map((post) => <li key={post.slug}><PostCard post={post} /></li>)}
                  </ul>
                )}
              </>
            )}
          </div>

          {/* Sidebar: search, categories, recent posts */}
          <aside className="space-y-6 lg:sticky lg:top-28 self-start">
            <div className="p-5 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
              <label htmlFor="blog-search" className="block text-sm font-semibold text-white mb-3">Search articles</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
                <input id="blog-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[var(--rj-navy-950)] border border-[var(--rj-panel-border)] text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40" />
              </div>
            </div>
            {categories.length > 0 && (
              <nav aria-label="Blog categories" className="p-5 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
                <h2 className="text-sm font-semibold text-white mb-3">Categories</h2>
                <ul className="space-y-1">
                  {[[ALL, posts.length], ...categories].map(([name, count]) => (
                    <li key={name}>
                      <button type="button" aria-pressed={category === name} onClick={() => setCategory(name)} className={`w-full flex justify-between px-3 py-2 rounded-lg text-sm transition-colors ${category === name ? "bg-[#F97316]/10 text-[#F97316]" : "text-[#CBD5E1] hover:bg-white/5"}`}>
                        {name} <span className="text-white/40">{count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {recent.length > 0 && (
              <div className="p-5 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
                <h2 className="text-sm font-semibold text-white mb-3">Recent posts</h2>
                <ul className="space-y-3">
                  {recent.map((post) => (
                    <li key={post.slug}>
                      <Link to={`/blog/${post.slug}`} className="block group">
                        <span className="block text-sm text-[#CBD5E1] group-hover:text-[#F97316] leading-snug">{post.title}</span>
                        {post.publishedAt && <span className="text-xs text-white/40">{formatDate(post.publishedAt)}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>

      <CtaBanner title="Have a question about your project?" text="We're happy to help you choose the right approach." />
    </>
  );
}
