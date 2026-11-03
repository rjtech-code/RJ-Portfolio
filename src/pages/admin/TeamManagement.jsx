import { useState } from "react";
import { Pencil, Plus, Trash2, UsersRound } from "lucide-react";
import { useAdminResource } from "../../hooks/useAdminResource";
import { useToast } from "../../hooks/useToast";
import { Button, Checkbox, EmptyState, ErrorState, LoadingState, Modal, PageHeader, Pill, TextArea, TextInput } from "../../Components/admin/ui";

const EMPTY = { name: "", role: "", bio: "", imageUrl: "", linkedin: "", sortOrder: 0, status: "draft" };

function TeamForm({ initial, onCancel, onSubmit }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.role.trim() || !/^https?:\/\//i.test(form.imageUrl.trim())) return;
    setSaving(true);
    try { await onSubmit({ ...form, sortOrder: Number(form.sortOrder) || 0 }); }
    finally { setSaving(false); }
  };
  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
      <TextInput label="Full name" required value={form.name} onChange={set("name")} maxLength={120} />
      <TextInput label="Designation" required value={form.role} onChange={set("role")} maxLength={120} />
      <TextInput label="Image URL" required type="url" placeholder="https://..." value={form.imageUrl} onChange={set("imageUrl")} hint="Paste a direct public image URL." />
      <TextInput label="LinkedIn URL" type="url" value={form.linkedin} onChange={set("linkedin")} />
      <TextInput label="Display order" type="number" value={form.sortOrder} onChange={set("sortOrder")} />
      <label className="block text-xs font-semibold text-[#CBD5E1]">Visibility
        <select value={form.status} onChange={set("status")} className="mt-1.5 w-full rounded-lg bg-[var(--rj-navy-950)] border border-[var(--rj-panel-border)] px-3 py-2.5 text-sm text-white">
          <option value="draft">Draft (hidden)</option><option value="published">Published</option>
        </select>
      </label>
      <TextArea className="sm:col-span-2" label="Short bio" value={form.bio} onChange={set("bio")} maxLength={1000} />
      {form.imageUrl && <div className="sm:col-span-2 flex items-center gap-3"><img src={form.imageUrl} alt="Team member preview" className="w-16 h-16 rounded-xl object-cover" /><span className="text-xs text-[#94A3B8]">Image preview</span></div>}
      <div className="sm:col-span-2 flex justify-end gap-2"><Button variant="secondary" onClick={onCancel}>Cancel</Button><Button type="submit" loading={saving}>Save member</Button></div>
    </form>
  );
}

export default function TeamManagement() {
  const team = useAdminResource("team");
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const save = async (body) => {
    try {
      if (editing?._id) await team.update(editing._id, body);
      else await team.create(body);
      setEditing(null); toast("Team member saved.");
    } catch (error) { toast(error.message || "Could not save team member.", "error"); }
  };
  const remove = async () => {
    try { await team.remove(deleting._id); setDeleting(null); toast("Team member deleted."); }
    catch (error) { toast(error.message || "Could not delete team member.", "error"); }
  };
  return <>
    <PageHeader title="Team Management" subtitle="Add and manage the people shown on Home, About and Portfolio pages." actions={<Button onClick={() => setEditing({ ...EMPTY })}><Plus size={16}/> Add team member</Button>} />
    {team.status === "loading" ? <LoadingState label="Loading team"/> : team.status === "error" ? <ErrorState message={team.error} onRetry={team.reload}/> : team.items.length === 0 ? <EmptyState icon={UsersRound} title="No team members yet" text="Add a team member and publish them to show on the website."/> :
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{team.items.map((member) => <article key={member._id} className="rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] overflow-hidden">
        <div className="flex gap-4 p-4"><img src={member.imageUrl} alt="" className="w-20 h-20 rounded-xl object-cover bg-[#0A1730]"/><div className="min-w-0 flex-1"><h2 className="font-bold text-white truncate">{member.name}</h2><p className="text-sm text-[#F97316]">{member.role}</p><div className="mt-2"><Pill tone={member.status === "published" ? "green" : "slate"}>{member.status}</Pill></div></div></div>
        {member.bio && <p className="px-4 pb-3 text-xs text-[#94A3B8] line-clamp-3">{member.bio}</p>}
        <div className="flex gap-2 px-4 py-3 border-t border-white/5"><Button size="sm" variant="secondary" onClick={() => setEditing(member)}><Pencil size={13}/> Edit</Button><Button size="sm" variant="danger" onClick={() => setDeleting(member)}><Trash2 size={13}/> Delete</Button></div>
      </article>)}</div>}
    <Modal open={Boolean(editing)} title={editing?._id ? "Edit team member" : "Add team member"} onClose={() => setEditing(null)} wide>
      {editing && <TeamForm key={editing._id || "new"} initial={editing} onCancel={() => setEditing(null)} onSubmit={save}/>}
    </Modal>
    <Modal open={Boolean(deleting)} title="Delete team member?" onClose={() => setDeleting(null)}>
      <p className="text-sm text-[#CBD5E1]">This will permanently remove {deleting?.name} from the team list.</p>
      <div className="flex justify-end gap-2 mt-5"><Button variant="secondary" onClick={() => setDeleting(null)}>Cancel</Button><Button variant="danger" onClick={remove}>Delete</Button></div>
    </Modal>
  </>;
}
