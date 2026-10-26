import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { useAdminResource } from "../../hooks/useAdminResource";
import { Button, EmptyState, ErrorState, FilterSelect, LoadingState, PageHeader, Pill, SearchInput, Table, Toolbar } from "../../Components/admin/ui";
import { STATUS_TONES, formatDateTime } from "../../utils/adminFormat";
import { useConfirmDelete } from "../../hooks/useConfirmDelete";
import { useToast } from "../../hooks/useToast";

export default function BlogManagement() {
  const posts = useAdminResource("posts");
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [category, setCategory] = useState("All");

  const [askDelete, deleteDialog] = useConfirmDelete((p) => posts.remove(p._id), (p) => `Article "${p.title}"`);
  const categories = useMemo(() => [...new Set(posts.items.map((p) => p.category).filter(Boolean))], [posts.items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.items.filter((p) =>
      (statusFilter === "All" || p.status === statusFilter) && (category === "All" || p.category === category) &&
      (!q || p.title.toLowerCase().includes(q) || (p.tags || []).some((t) => t.toLowerCase().includes(q)))
    );
  }, [posts.items, query, statusFilter, category]);

  const togglePublish = async (post) => {
    try {
      await posts.update(post._id, { status: post.status === "published" ? "draft" : "published" });
      toast(post.status === "published" ? "Moved to drafts." : "Published. It now appears on the blog.");
    } catch (error) {
      toast(`Update failed: ${error.message}`, "error");
    }
  };

  const newButton = <Link to="/admin/blog/new" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F97316] text-white text-sm font-semibold hover:bg-[#EA580C]"><Plus size={16} aria-hidden="true" /> New article</Link>;

  return (
    <>
      <PageHeader title="Blog Management" subtitle="Published articles appear on /blog. Drafts stay private." actions={newButton} />
      <Toolbar>
        <SearchInput value={query} onChange={setQuery} placeholder="Search titles or tags…" label="Search articles" />
        <FilterSelect label="Filter by status" value={statusFilter} onChange={setStatusFilter} options={[["All", "All statuses"], ["published", "Published"], ["draft", "Draft"]]} />
        <FilterSelect label="Filter by category" value={category} onChange={setCategory} options={[["All", "All categories"], ...categories]} />
      </Toolbar>

      {posts.status === "loading" ? <LoadingState label="Loading articles" /> : posts.status === "error" ? <ErrorState message={posts.error} onRetry={posts.reload} /> : posts.items.length === 0 ? (
        <EmptyState title="No articles yet" text="Write your first article to start the blog." action={newButton} />
      ) : filtered.length === 0 ? <EmptyState title="No articles match these filters" /> : (
        <Table columns={["Article", "Category", "Status", "Updated", "Actions"]} caption="Blog articles">
          {filtered.map((p) => (
            <tr key={p._id} className="hover:bg-white/[0.03]">
              <td className="px-4 py-3">
                <Link to={`/admin/blog/${p._id}`} className="block font-semibold text-white hover:text-[#F97316]">{p.title}</Link>
                <span className="text-xs text-[#94A3B8]">/blog/{p.slug}{p.isSample && " · sample"}</span>
              </td>
              <td className="px-4 py-3 text-[#CBD5E1]">{p.category}</td>
              <td className="px-4 py-3"><Pill tone={STATUS_TONES[p.status]}>{p.status === "published" ? "Published" : "Draft"}</Pill></td>
              <td className="px-4 py-3 text-[#CBD5E1] whitespace-nowrap">{formatDateTime(p.updatedAt)}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  <Link to={`/admin/blog/${p._id}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--rj-panel-border)] bg-white/[0.03] text-white hover:bg-white/[0.07]"><Pencil size={14} aria-hidden="true" /> Edit</Link>
                  <Button size="sm" variant="secondary" onClick={() => togglePublish(p)}>{p.status === "published" ? <><EyeOff size={14} aria-hidden="true" /> Unpublish</> : <><Eye size={14} aria-hidden="true" /> Publish</>}</Button>
                  {p.status === "published" && <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2 text-[#94A3B8] hover:text-white" aria-label={`View ${p.title} on the website`}><ExternalLink size={14} aria-hidden="true" /></a>}
                  <Button size="sm" variant="ghost" onClick={() => askDelete(p)} aria-label={`Delete ${p.title}`}><Trash2 size={14} aria-hidden="true" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}
      {deleteDialog}
    </>
  );
}
