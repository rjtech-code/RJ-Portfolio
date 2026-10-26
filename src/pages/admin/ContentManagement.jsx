import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Pencil, RefreshCw } from "lucide-react";
import { adminApi } from "../../services/adminApi";
import { staticPages } from "../../config/pages";
import { Button, Checkbox, ErrorState, LoadingState, Modal, PageHeader, Pill, SearchInput, Table, TextArea, TextInput, Toolbar } from "../../Components/admin/ui";
import { useToast } from "../../hooks/useToast";

const lengthTone = (len, ideal) => (len === 0 ? "slate" : len <= ideal ? "green" : "amber");

function PageForm({ page, override, onCancel, onSaved }) {
  const toast = useToast();
  const [form, setForm] = useState({
    metaTitle: override?.metaTitle || "",
    metaDescription: override?.metaDescription || "",
    heading: override?.heading || "",
    intro: override?.intro || "",
    reviewed: page.draft ? Boolean(override?.reviewed) : true,
  });
  const [saving, setSaving] = useState(false);
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const effectiveTitle = form.metaTitle || page.title;
  const effectiveDesc = form.metaDescription || page.description;

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const saved = await adminApi.savePage(page.key, form);
      onSaved(saved);
      toast("Page content saved.");
    } catch (error) {
      toast(`Save failed: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <p className="text-sm text-[#94A3B8]">Leave a field empty to use the default shown as placeholder.</p>
      <TextInput label="Meta title" value={form.metaTitle} onChange={set("metaTitle")} placeholder={page.title} maxLength={70} hint={`${effectiveTitle.length}/60 recommended`} />
      <TextArea label="Meta description" rows={3} value={form.metaDescription} onChange={set("metaDescription")} placeholder={page.description} maxLength={170} hint={`${effectiveDesc.length}/160 recommended`} />
      {page.key !== "home" && (
        <>
          <TextInput label="Page heading" value={form.heading} onChange={set("heading")} placeholder={page.heading || ""} maxLength={120} />
          <TextArea label="Intro text" rows={3} value={form.intro} onChange={set("intro")} placeholder={page.intro || ""} maxLength={600} />
        </>
      )}
      <div className="p-3 rounded-lg bg-white">
        <p className="text-[13px] text-[#1a0dab] truncate">{effectiveTitle}</p>
        <p className="text-[11px] text-[#006621]">…{page.path}</p>
        <p className="text-[12px] text-[#545454] line-clamp-2">{effectiveDesc}</p>
      </div>
      {page.draft && (
        <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20">
          <Checkbox
            label="Content reviewed and approved"
            hint="Removes the draft notice and lets search engines index this page. Only tick after checking all text on the page."
            checked={form.reviewed}
            onChange={(v) => setForm({ ...form, reviewed: v })}
          />
        </div>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={saving}>Save</Button>
      </div>
    </form>
  );
}

export default function ContentManagement() {
  const toast = useToast();
  const [overrides, setOverrides] = useState({});
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [rebuilding, setRebuilding] = useState(false);

  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    adminApi
      .pages()
      .then((pages) => {
        setOverrides(Object.fromEntries(pages.map((p) => [p.key, p])));
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, [reloadKey]);
  const load = () => {
    setStatus("loading");
    setReloadKey((k) => k + 1);
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return staticPages.filter((p) => !q || p.label.toLowerCase().includes(q) || p.path.includes(q));
  }, [query]);

  const rebuild = async () => {
    setRebuilding(true);
    try {
      const res = await adminApi.rebuild();
      toast(res.message);
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setRebuilding(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Website Content & SEO"
        subtitle="Edit page titles, descriptions, headings and intros. Changes show for visitors immediately; search engines see them after the next site rebuild."
        actions={<Button variant="secondary" onClick={rebuild} loading={rebuilding}><RefreshCw size={16} aria-hidden="true" /> Rebuild site</Button>}
      />
      <Toolbar><SearchInput value={query} onChange={setQuery} placeholder="Search pages…" label="Search pages" /></Toolbar>

      {status === "loading" ? <LoadingState label="Loading pages" /> : status === "error" ? <ErrorState message={error} onRetry={load} /> : (
        <Table columns={["Page", "Meta title", "Description", "Status", "Actions"]} caption="Website pages">
          {rows.map((page) => {
            const o = overrides[page.key] || {};
            const title = o.metaTitle || page.title;
            const desc = o.metaDescription || page.description;
            const draft = page.draft && !o.reviewed;
            return (
              <tr key={page.key} className="hover:bg-white/[0.03]">
                <td className="px-4 py-3"><span className="block font-semibold text-white">{page.label}</span><span className="text-xs text-[#94A3B8]">{page.path}</span></td>
                <td className="px-4 py-3"><span className="block text-[#CBD5E1] max-w-[260px] truncate">{title}</span><Pill tone={lengthTone(title.length, 60)}>{title.length} chars</Pill></td>
                <td className="px-4 py-3"><Pill tone={lengthTone(desc.length, 160)}>{desc.length} chars</Pill></td>
                <td className="px-4 py-3">{draft ? <Pill tone="amber">Draft · noindex</Pill> : <Pill tone="green">Live · indexable</Pill>}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button size="sm" variant="secondary" onClick={() => setEditing(page)}><Pencil size={14} aria-hidden="true" /> Edit</Button>
                    <a href={page.path} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2 text-[#94A3B8] hover:text-white" aria-label={`Open ${page.label}`}><ExternalLink size={14} aria-hidden="true" /></a>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      )}

      <Modal open={Boolean(editing)} title={editing ? `Edit: ${editing.label}` : ""} onClose={() => setEditing(null)}>
        {editing && (
          <PageForm
            key={editing.key}
            page={editing}
            override={overrides[editing.key]}
            onCancel={() => setEditing(null)}
            onSaved={(saved) => {
              setOverrides((prev) => ({ ...prev, [saved.key]: saved }));
              setEditing(null);
            }}
          />
        )}
      </Modal>
    </>
  );
}
