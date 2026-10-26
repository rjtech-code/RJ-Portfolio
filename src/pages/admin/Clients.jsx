import { useMemo, useState } from "react";
import { Mail, Pencil, Phone, Plus, Trash2 } from "lucide-react";
import { useAdminResource } from "../../hooks/useAdminResource";
import { Button, Checkbox, EmptyState, ErrorState, LoadingState, Modal, PageHeader, Pill, SearchInput, SelectInput, Table, TextArea, TextInput, Toolbar } from "../../Components/admin/ui";
import { STATUS_TONES } from "../../utils/adminFormat";
import { useConfirmDelete } from "../../hooks/useConfirmDelete";
import { useToast } from "../../hooks/useToast";

const EMPTY_CLIENT = { name: "", company: "", email: "", phone: "", notes: "" };
const EMPTY_TESTIMONIAL = { authorName: "", authorRole: "", quote: "", clientId: "", consent: false, status: "draft", isSample: false };

function ClientForm({ initial, onCancel, onSubmit }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (event) => {
    event.preventDefault();
    const found = {};
    if (!form.name.trim()) found.name = "Name is required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) found.email = "Enter a valid email.";
    setErrors(found);
    if (Object.keys(found).length) return;
    setSaving(true);
    await onSubmit({ name: form.name, company: form.company, email: form.email, phone: form.phone, notes: form.notes }).finally(() => setSaving(false));
  };

  return (
    <form onSubmit={submit} noValidate className="grid sm:grid-cols-2 gap-4">
      <TextInput label="Contact name" required value={form.name} onChange={set("name")} error={errors.name} maxLength={150} />
      <TextInput label="Company" value={form.company} onChange={set("company")} maxLength={150} />
      <TextInput label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} maxLength={254} />
      <TextInput label="Phone" type="tel" value={form.phone} onChange={set("phone")} maxLength={30} />
      <TextArea className="sm:col-span-2" label="Notes" value={form.notes} onChange={set("notes")} maxLength={5000} />
      <div className="sm:col-span-2 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={saving}>Save client</Button>
      </div>
    </form>
  );
}

function TestimonialForm({ initial, clients, onCancel, onSubmit }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (event) => {
    event.preventDefault();
    const found = {};
    if (!form.authorName.trim()) found.authorName = "Name is required.";
    if (!form.quote.trim()) found.quote = "Quote is required.";
    if (form.status === "published" && !form.consent) found.status = "Confirm consent before publishing.";
    if (form.status === "published" && form.isSample) found.status = "Sample testimonials can't be published.";
    setErrors(found);
    if (Object.keys(found).length) return;
    setSaving(true);
    await onSubmit({
      authorName: form.authorName, authorRole: form.authorRole, quote: form.quote, clientId: form.clientId || null,
      consent: form.consent, status: form.status, isSample: form.isSample,
    }).finally(() => setSaving(false));
  };

  return (
    <form onSubmit={submit} noValidate className="grid sm:grid-cols-2 gap-4">
      <TextInput label="Name" required value={form.authorName} onChange={set("authorName")} error={errors.authorName} maxLength={100} />
      <TextInput label="Role / company" value={form.authorRole} onChange={set("authorRole")} maxLength={150} />
      <TextArea className="sm:col-span-2" label="Quote" required value={form.quote} onChange={set("quote")} error={errors.quote} maxLength={1000} />
      <SelectInput label="Linked client" value={form.clientId || ""} onChange={set("clientId")} options={[["", "— None —"], ...clients.map((c) => [c._id, c.company ? `${c.name} (${c.company})` : c.name])]} />
      <SelectInput label="Status" value={form.status} onChange={set("status")} error={errors.status} options={[["draft", "Draft (hidden)"], ["published", "Approved & published"]]} />
      <div className="sm:col-span-2 space-y-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
        <Checkbox label="The client agreed to have this testimonial published" hint="Required before publishing" checked={form.consent} onChange={(v) => setForm({ ...form, consent: v })} />
        <Checkbox label="Sample content" hint="Sample testimonials can never be published" checked={form.isSample} onChange={(v) => setForm({ ...form, isSample: v })} />
      </div>
      <div className="sm:col-span-2 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={saving}>Save testimonial</Button>
      </div>
    </form>
  );
}

export default function Clients() {
  const clients = useAdminResource("clients");
  const testimonials = useAdminResource("testimonials");
  const toast = useToast();
  const [tab, setTab] = useState("clients");
  const [query, setQuery] = useState("");
  const [editingClient, setEditingClient] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const [askDeleteClient, clientDialog] = useConfirmDelete((c) => clients.remove(c._id), (c) => `Client "${c.name}"`);
  const [askDeleteTestimonial, testimonialDialog] = useConfirmDelete((t) => testimonials.remove(t._id), (t) => `The testimonial from ${t.authorName}`);

  const q = query.trim().toLowerCase();
  const filteredClients = useMemo(() => clients.items.filter((c) => !q || [c.name, c.company, c.email].some((v) => v?.toLowerCase().includes(q))), [clients.items, q]);
  const filteredTestimonials = useMemo(() => testimonials.items.filter((t) => !q || [t.authorName, t.authorRole, t.quote].some((v) => v?.toLowerCase().includes(q))), [testimonials.items, q]);

  const saveWith = (resource, editing, close, label) => async (body) => {
    try {
      if (editing._id) await resource.update(editing._id, body);
      else await resource.create(body);
      toast(`${label} saved.`);
      close();
    } catch (error) {
      toast(`Save failed: ${error.message}`, "error");
    }
  };

  const active = tab === "clients" ? clients : testimonials;

  return (
    <>
      <PageHeader
        title="Clients & Testimonials"
        subtitle="Only approved testimonials with recorded consent appear on the website."
        actions={tab === "clients"
          ? <Button onClick={() => setEditingClient(EMPTY_CLIENT)}><Plus size={16} aria-hidden="true" /> Add client</Button>
          : <Button onClick={() => setEditingTestimonial(EMPTY_TESTIMONIAL)}><Plus size={16} aria-hidden="true" /> Add testimonial</Button>}
      />
      <div role="tablist" aria-label="Section" className="flex gap-1 mb-4 p-1 rounded-xl bg-white/[0.03] border border-white/5 w-fit">
        {[["clients", `Clients (${clients.items.length})`], ["testimonials", `Testimonials (${testimonials.items.length})`]].map(([key, label]) => (
          <button key={key} role="tab" type="button" aria-selected={tab === key} onClick={() => setTab(key)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${tab === key ? "bg-[#F97316] text-white" : "text-[#94A3B8] hover:text-white"}`}>{label}</button>
        ))}
      </div>
      <Toolbar><SearchInput value={query} onChange={setQuery} placeholder={tab === "clients" ? "Search clients…" : "Search testimonials…"} label="Search" /></Toolbar>

      {active.status === "loading" ? <LoadingState /> : active.status === "error" ? <ErrorState message={active.error} onRetry={active.reload} /> : tab === "clients" ? (
        clients.items.length === 0 ? <EmptyState title="No clients yet" text="Add clients to link them to projects and testimonials." /> : filteredClients.length === 0 ? <EmptyState title="No clients match your search" /> : (
          <Table columns={["Client", "Contact", "Notes", "Actions"]} caption="Clients">
            {filteredClients.map((c) => (
              <tr key={c._id} className="hover:bg-white/[0.03]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-sky-400/10 text-sky-300 font-bold flex items-center justify-center">{c.name.charAt(0).toUpperCase()}</span>
                    <span><span className="block font-semibold text-white">{c.name}</span><span className="text-xs text-[#94A3B8]">{c.company || "—"}</span></span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#CBD5E1]">
                  {c.email && <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 hover:text-[#F97316]"><Mail size={13} aria-hidden="true" />{c.email}</a>}
                  {c.phone && <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 hover:text-[#F97316]"><Phone size={13} aria-hidden="true" />{c.phone}</a>}
                </td>
                <td className="px-4 py-3 text-[#94A3B8] max-w-xs truncate">{c.notes || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button size="sm" variant="secondary" onClick={() => setEditingClient(c)}><Pencil size={14} aria-hidden="true" /> Edit</Button>
                    <Button size="sm" variant="ghost" onClick={() => askDeleteClient(c)} aria-label={`Delete ${c.name}`}><Trash2 size={14} aria-hidden="true" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )
      ) : testimonials.items.length === 0 ? <EmptyState title="No testimonials yet" text="Add testimonials you have permission to publish." /> : filteredTestimonials.length === 0 ? <EmptyState title="No testimonials match your search" /> : (
        <Table columns={["Author", "Quote", "Consent", "Status", "Actions"]} caption="Testimonials">
          {filteredTestimonials.map((t) => (
            <tr key={t._id} className="hover:bg-white/[0.03]">
              <td className="px-4 py-3"><span className="block font-semibold text-white">{t.authorName}</span><span className="text-xs text-[#94A3B8]">{t.authorRole}</span></td>
              <td className="px-4 py-3 text-[#CBD5E1] max-w-md"><span className="line-clamp-2">“{t.quote}”</span></td>
              <td className="px-4 py-3">{t.consent ? <Pill tone="green">Recorded</Pill> : <Pill tone="red">Missing</Pill>}</td>
              <td className="px-4 py-3"><div className="flex gap-1.5"><Pill tone={STATUS_TONES[t.status]}>{t.status === "published" ? "Published" : "Draft"}</Pill>{t.isSample && <Pill tone="amber">Sample</Pill>}</div></td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <Button size="sm" variant="secondary" onClick={() => setEditingTestimonial({ ...EMPTY_TESTIMONIAL, ...t, clientId: t.clientId || "" })}><Pencil size={14} aria-hidden="true" /> Edit</Button>
                  <Button size="sm" variant="ghost" onClick={() => askDeleteTestimonial(t)} aria-label={`Delete testimonial from ${t.authorName}`}><Trash2 size={14} aria-hidden="true" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      <Modal open={Boolean(editingClient)} title={editingClient?._id ? "Edit client" : "Add client"} onClose={() => setEditingClient(null)}>
        {editingClient && <ClientForm key={editingClient._id || "new"} initial={{ ...EMPTY_CLIENT, ...editingClient }} onCancel={() => setEditingClient(null)} onSubmit={saveWith(clients, editingClient, () => setEditingClient(null), "Client")} />}
      </Modal>
      <Modal open={Boolean(editingTestimonial)} title={editingTestimonial?._id ? "Edit testimonial" : "Add testimonial"} onClose={() => setEditingTestimonial(null)}>
        {editingTestimonial && <TestimonialForm key={editingTestimonial._id || "new"} initial={editingTestimonial} clients={clients.items} onCancel={() => setEditingTestimonial(null)} onSubmit={saveWith(testimonials, editingTestimonial, () => setEditingTestimonial(null), "Testimonial")} />}
      </Modal>
      {clientDialog}
      {testimonialDialog}
    </>
  );
}
