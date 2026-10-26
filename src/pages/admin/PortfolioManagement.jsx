import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ExternalLink, Eye, EyeOff, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useAdminResource } from "../../hooks/useAdminResource";
import { Button, Checkbox, EmptyState, ErrorState, FilterSelect, ListInput, LoadingState, Modal, PageHeader, Pill, SearchInput, SelectInput, Table, TextArea, TextInput, Toolbar } from "../../Components/admin/ui";
import { STATUS_TONES } from "../../utils/adminFormat";
import { useConfirmDelete } from "../../hooks/useConfirmDelete";
import { useToast } from "../../hooks/useToast";

const CATEGORIES = ["Websites", "Web Applications", "SaaS Platforms", "Dashboards", "E-Commerce"];
const EMPTY = {
  title: "", slug: "", category: "Websites", summary: "", description: "", challenge: "", solution: "", results: "",
  technologies: [], highlights: [], image: "", imageAlt: "", status: "draft", isSample: false, featured: false, sortOrder: 0,
};

const validate = (f) => {
  const e = {};
  if (!f.title.trim()) e.title = "Title is required.";
  if (f.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(f.slug)) e.slug = "Use lowercase letters, numbers and hyphens only.";
  if (f.image && !/^(https:\/\/|\/)\S+$/.test(f.image)) e.image = "Use an https:// URL or a path such as /images/project.jpg.";
  if (f.status === "published" && !f.summary.trim()) e.summary = "Add a summary before publishing.";
  return e;
};

function PortfolioForm({ initial, onCancel, onSubmit }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSaving(true);
    const { _id, createdAt, updatedAt, publishedAt, ...body } = form; // eslint-disable-line no-unused-vars
    await onSubmit({
      ...body,
      technologies: form.technologies.map((t) => t.trim()).filter(Boolean),
      highlights: form.highlights.map((t) => t.trim()).filter(Boolean),
      sortOrder: Number(form.sortOrder) || 0,
    }).finally(() => setSaving(false));
  };

  return (
    <form onSubmit={submit} noValidate className="grid md:grid-cols-2 gap-4">
      <TextInput label="Title" required value={form.title} onChange={set("title")} error={errors.title} maxLength={150} />
      <TextInput label="URL slug" value={form.slug} onChange={set("slug")} error={errors.slug} hint="Leave empty to generate from the title" maxLength={80} />
      <SelectInput label="Category" value={form.category} onChange={set("category")} options={CATEGORIES} />
      <TextInput label="Sort order" type="number" value={form.sortOrder} onChange={set("sortOrder")} hint="Lower numbers appear first" />
      <TextArea className="md:col-span-2" rows={2} label="Summary (card text)" value={form.summary} onChange={set("summary")} error={errors.summary} maxLength={300} />
      <TextArea className="md:col-span-2" label="Project overview" value={form.description} onChange={set("description")} maxLength={5000} />
      <TextArea label="Challenge" value={form.challenge} onChange={set("challenge")} maxLength={3000} />
      <TextArea label="Solution" value={form.solution} onChange={set("solution")} maxLength={3000} />
      <TextArea className="md:col-span-2" label="Results" value={form.results} onChange={set("results")} maxLength={3000} hint="Only include results you can verify." />
      <ListInput label="Technologies" value={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} />
      <ListInput label="Highlights" value={form.highlights} onChange={(v) => setForm({ ...form, highlights: v })} />
      <TextInput label="Image URL" value={form.image} onChange={set("image")} error={errors.image} hint="https:// link, or a file you add under /public" maxLength={500} />
      <TextInput label="Image alt text" value={form.imageAlt} onChange={set("imageAlt")} hint="Describe the image; leave empty if decorative" maxLength={200} />
      {form.image && !errors.image && (
        <div className="md:col-span-2">
          <p className="text-xs font-semibold text-[#CBD5E1] mb-1.5">Image preview</p>
          <img src={form.image} alt="" className="w-full max-w-sm aspect-video object-cover rounded-lg border border-white/10 bg-white/5" />
        </div>
      )}
      <div className="md:col-span-2 grid sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
        <SelectInput label="Status" value={form.status} onChange={set("status")} options={[["draft", "Draft (hidden)"], ["published", "Published"]]} />
        <Checkbox label="Featured" hint="Shown on the homepage" checked={form.featured} onChange={(v) => setForm({ ...form, featured: v })} />
        <Checkbox label="Sample content" hint="Labelled 'Sample' and not indexed" checked={form.isSample} onChange={(v) => setForm({ ...form, isSample: v })} />
      </div>
      <div className="md:col-span-2 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={saving}>Save item</Button>
      </div>
    </form>
  );
}

export default function PortfolioManagement() {
  const portfolio = useAdminResource("portfolio");
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  // Quick action from the overview (?new=1) opens the form straight away
  const [editing, setEditing] = useState(() => (params.get("new") ? EMPTY : null));
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    if (params.get("new")) setParams({}, { replace: true });
  }, [params, setParams]);

  const [askDelete, deleteDialog] = useConfirmDelete((p) => portfolio.remove(p._id), (p) => `"${p.title}"`);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return portfolio.items.filter((p) => (statusFilter === "All" || p.status === statusFilter) && (!q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)));
  }, [portfolio.items, query, statusFilter]);

  const save = async (body) => {
    try {
      if (editing._id) await portfolio.update(editing._id, body);
      else await portfolio.create(body);
      toast("Portfolio item saved.");
      setEditing(null);
    } catch (error) {
      toast(`Save failed: ${error.message}`, "error");
    }
  };

  const togglePublish = async (item) => {
    try {
      await portfolio.update(item._id, { status: item.status === "published" ? "draft" : "published" });
      toast(item.status === "published" ? "Unpublished." : "Published. It now appears on the public portfolio.");
    } catch (error) {
      toast(`Update failed: ${error.message}`, "error");
    }
  };

  return (
    <>
      <PageHeader title="Portfolio Management" subtitle="Published items appear on /portfolio and get their own case-study page." actions={<Button onClick={() => setEditing(EMPTY)}><Plus size={16} aria-hidden="true" /> Add item</Button>} />
      <Toolbar>
        <SearchInput value={query} onChange={setQuery} placeholder="Search title or category…" label="Search portfolio" />
        <FilterSelect label="Filter by status" value={statusFilter} onChange={setStatusFilter} options={[["All", "All statuses"], ["published", "Published"], ["draft", "Draft"]]} />
      </Toolbar>

      {portfolio.status === "loading" ? <LoadingState label="Loading portfolio" /> : portfolio.status === "error" ? <ErrorState message={portfolio.error} onRetry={portfolio.reload} /> : portfolio.items.length === 0 ? (
        <EmptyState title="No portfolio items yet" text="Add a project to show it on the public portfolio." action={<Button onClick={() => setEditing(EMPTY)}><Plus size={16} aria-hidden="true" /> Add item</Button>} />
      ) : filtered.length === 0 ? <EmptyState title="No items match these filters" /> : (
        <Table columns={["Project", "Category", "Status", "Flags", "Actions"]} caption="Portfolio items">
          {filtered.map((p) => (
            <tr key={p._id} className="hover:bg-white/[0.03]">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {p.image ? <img src={p.image} alt="" className="w-16 h-10 object-cover rounded-md border border-white/10" loading="lazy" /> : <span className="w-16 h-10 rounded-md bg-white/5" />}
                  <span><span className="block font-semibold text-white">{p.title}</span><span className="text-xs text-[#94A3B8]">/portfolio/{p.slug}</span></span>
                </div>
              </td>
              <td className="px-4 py-3 text-[#CBD5E1]">{p.category}</td>
              <td className="px-4 py-3"><Pill tone={STATUS_TONES[p.status]}>{p.status === "published" ? "Published" : "Draft"}</Pill></td>
              <td className="px-4 py-3">
                <div className="flex gap-1.5">
                  {p.featured && <Pill tone="orange"><Star size={11} className="mr-1" aria-hidden="true" />Featured</Pill>}
                  {p.isSample && <Pill tone="amber">Sample</Pill>}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  <Button size="sm" variant="secondary" onClick={() => setEditing({ ...EMPTY, ...p })}><Pencil size={14} aria-hidden="true" /> Edit</Button>
                  <Button size="sm" variant="secondary" onClick={() => togglePublish(p)}>{p.status === "published" ? <><EyeOff size={14} aria-hidden="true" /> Unpublish</> : <><Eye size={14} aria-hidden="true" /> Publish</>}</Button>
                  {p.status === "published" && <a href={`/portfolio/${p.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2 text-[#94A3B8] hover:text-white" aria-label={`View ${p.title} on the website`}><ExternalLink size={14} aria-hidden="true" /></a>}
                  <Button size="sm" variant="ghost" onClick={() => askDelete(p)} aria-label={`Delete ${p.title}`}><Trash2 size={14} aria-hidden="true" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      <Modal open={Boolean(editing)} title={editing?._id ? "Edit portfolio item" : "Add portfolio item"} onClose={() => setEditing(null)} wide>
        {editing && <PortfolioForm key={editing._id || "new"} initial={editing} onCancel={() => setEditing(null)} onSubmit={save} />}
      </Modal>
      {deleteDialog}
    </>
  );
}
