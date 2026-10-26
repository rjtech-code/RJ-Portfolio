import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { adminApi } from "../../services/adminApi";
import { RichText } from "../../Components/common/primitives";
import { Button, Checkbox, ErrorState, ListInput, LoadingState, Panel, Pill, SelectInput, TextArea, TextInput } from "../../Components/admin/ui";
import { STATUS_TONES } from "../../utils/adminFormat";
import { useToast } from "../../hooks/useToast";

const EMPTY = {
  title: "", slug: "", excerpt: "", content: "", category: "Web Development", tags: [], coverImage: "", author: "RJ TechForce",
  metaTitle: "", metaDescription: "", status: "draft", isSample: false,
};
const CATEGORIES = ["Web Development", "React Development", "Web Design", "Business", "Performance", "Mobile Design", "SEO"];
const FIELDS = Object.keys(EMPTY);

const validate = (f, publishing) => {
  const e = {};
  if (!f.title.trim()) e.title = "Title is required.";
  if (f.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(f.slug)) e.slug = "Use lowercase letters, numbers and hyphens only.";
  if (f.coverImage && !/^(https:\/\/|\/)\S+$/.test(f.coverImage)) e.coverImage = "Use an https:// URL or a /path.";
  if (publishing && !f.content.trim()) e.content = "Add content before publishing.";
  if (publishing && !f.excerpt.trim()) e.excerpt = "Add an excerpt before publishing.";
  return e;
};

// Create / edit an article with a live preview and SEO fields
export default function BlogEditor() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState(EMPTY);
  const [loadState, setLoadState] = useState(isNew ? "ready" : "loading");
  const [loadError, setLoadError] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("write");

  useEffect(() => {
    if (isNew) return;
    let cancelled = false;
    adminApi
      .get("posts", id)
      .then((post) => {
        if (cancelled) return;
        setForm(Object.fromEntries(FIELDS.map((k) => [k, post[k] ?? EMPTY[k]])));
        setLoadState("ready");
      })
      .catch((error) => {
        if (cancelled) return;
        setLoadError(error.status === 404 || error.status === 400 ? "Article not found." : error.message);
        setLoadState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [id, isNew]);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const save = async (status) => {
    const body = { ...form, status, tags: form.tags.map((t) => t.trim()).filter(Boolean) };
    const found = validate(body, status === "published");
    setErrors(found);
    if (Object.keys(found).length) {
      toast("Please fix the highlighted fields.", "error");
      return;
    }
    setSaving(true);
    try {
      const saved = isNew ? await adminApi.create("posts", body) : await adminApi.update("posts", id, body);
      setForm(Object.fromEntries(FIELDS.map((k) => [k, saved[k] ?? EMPTY[k]])));
      toast(status === "published" ? "Article published." : "Draft saved.");
      if (isNew) navigate(`/admin/blog/${saved._id}`, { replace: true });
    } catch (error) {
      toast(`Save failed: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loadState === "loading") return <LoadingState label="Loading article" />;
  if (loadState === "error") return <ErrorState message={loadError} />;

  const titleLength = (form.metaTitle || form.title).length;
  const descLength = (form.metaDescription || form.excerpt).length;

  return (
    <>
      <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white mb-4"><ArrowLeft size={16} aria-hidden="true" /> All articles</Link>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{isNew ? "New article" : "Edit article"}</h1>
          <Pill tone={STATUS_TONES[form.status]}>{form.status === "published" ? "Published" : "Draft"}</Pill>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => save("draft")} loading={saving}>{form.status === "published" ? "Unpublish & save draft" : "Save draft"}</Button>
          <Button onClick={() => save("published")} loading={saving}>{form.status === "published" ? "Update" : "Publish"}</Button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1fr_340px] gap-6">
        <Panel padded={false}>
          <div role="tablist" aria-label="Editor mode" className="flex gap-1 p-2 border-b border-white/5">
            {[["write", "Write"], ["preview", "Preview"]].map(([key, label]) => (
              <button key={key} role="tab" type="button" aria-selected={tab === key} onClick={() => setTab(key)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${tab === key ? "bg-[#F97316]/15 text-[#FDBA74]" : "text-[#94A3B8] hover:text-white"}`}>{label}</button>
            ))}
          </div>
          <div className="p-5 space-y-4" role="tabpanel">
            {tab === "write" ? (
              <>
                <TextInput label="Title" required value={form.title} onChange={set("title")} error={errors.title} maxLength={160} />
                <TextArea label="Excerpt" rows={2} value={form.excerpt} onChange={set("excerpt")} error={errors.excerpt} maxLength={400} hint="Shown on blog cards" />
                <TextArea
                  label="Content"
                  rows={18}
                  value={form.content}
                  onChange={set("content")}
                  error={errors.content}
                  maxLength={50000}
                  hint='Separate paragraphs with a blank line. Start a line with "## " for a heading or "- " for a list item.'
                />
              </>
            ) : (
              <article className="max-w-none">
                <h2 className="text-3xl font-extrabold text-white mb-3">{form.title || "Untitled"}</h2>
                {form.excerpt && <p className="text-lg text-[#94A3B8] mb-6">{form.excerpt}</p>}
                {form.coverImage && <img src={form.coverImage} alt="" className="w-full rounded-xl mb-6 border border-white/10" />}
                {form.content ? <RichText text={form.content} /> : <p className="text-[#94A3B8]">Nothing to preview yet.</p>}
              </article>
            )}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="Details">
            <div className="space-y-4">
              <TextInput label="URL slug" value={form.slug} onChange={set("slug")} error={errors.slug} hint="Leave empty to generate from the title" maxLength={80} />
              <SelectInput label="Category" value={form.category} onChange={set("category")} options={[...new Set([...CATEGORIES, form.category])]} />
              <ListInput label="Tags" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
              <TextInput label="Cover image URL" value={form.coverImage} onChange={set("coverImage")} error={errors.coverImage} maxLength={500} />
              <TextInput label="Author" value={form.author} onChange={set("author")} maxLength={100} />
              <Checkbox label="Sample content" hint="Labelled 'Sample' and not indexed" checked={form.isSample} onChange={(v) => setForm({ ...form, isSample: v })} />
            </div>
          </Panel>
          <Panel title="SEO">
            <div className="space-y-4">
              <TextInput label="Meta title" value={form.metaTitle} onChange={set("metaTitle")} maxLength={70} hint={`${titleLength}/60 recommended · defaults to "Title | RJ TechForce"`} />
              <TextArea label="Meta description" rows={3} value={form.metaDescription} onChange={set("metaDescription")} maxLength={170} hint={`${descLength}/160 recommended · defaults to the excerpt`} />
              <div className="p-3 rounded-lg bg-white text-left">
                <p className="text-[13px] text-[#1a0dab] leading-snug truncate">{form.metaTitle || `${form.title || "Article title"} | RJ TechForce`}</p>
                <p className="text-[11px] text-[#006621]">…/blog/{form.slug || "article-slug"}</p>
                <p className="text-[12px] text-[#545454] line-clamp-2">{form.metaDescription || form.excerpt || "Article description"}</p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
