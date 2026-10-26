import { useEffect, useMemo, useState } from "react";
import { Download, Mail, MessageSquare, Phone, Trash2, X } from "lucide-react";
import { adminApi } from "../../services/adminApi";
import { Button, EmptyState, ErrorState, FilterSelect, LoadingState, PageHeader, Pill, SearchInput, SelectInput, Table, TextArea, TextInput, Toolbar } from "../../Components/admin/ui";
import { STATUS_TONES, formatDateTime, toDateInput } from "../../utils/adminFormat";
import { useConfirmDelete } from "../../hooks/useConfirmDelete";
import { useToast } from "../../hooks/useToast";

const STATUSES = ["New", "Contacted", "In Progress", "Closed"];
const TYPES = ["Business Website", "Web Application", "SaaS Platform", "E-Commerce", "UI/UX Design", "Other"];

const toCsv = (rows) => {
  const cols = ["createdAt", "fullName", "email", "phone", "projectType", "status", "followUpDate", "projectDetails", "notes"];
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
};

// Side panel with contact info, requirements and CRM fields
function EnquiryDetails({ enquiry, onClose, onSaved, onDelete }) {
  const toast = useToast();
  const [form, setForm] = useState({ status: enquiry.status, notes: enquiry.notes || "", followUpDate: toDateInput(enquiry.followUpDate) });
  const [saving, setSaving] = useState(false);
  const dirty = form.status !== enquiry.status || form.notes !== (enquiry.notes || "") || form.followUpDate !== toDateInput(enquiry.followUpDate);
  const phone = enquiry.phone.replace(/[^\d+]/g, "");

  const save = async () => {
    setSaving(true);
    try {
      const updated = await adminApi.updateEnquiry(enquiry._id, { status: form.status, notes: form.notes, followUpDate: form.followUpDate || null });
      onSaved(updated);
      toast("Enquiry updated.");
    } catch (error) {
      toast(`Save failed: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <aside aria-label="Enquiry details" className="rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] xl:sticky xl:top-24 self-start">
      <header className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <h2 className="text-sm font-semibold text-white">Enquiry details</h2>
        <button type="button" onClick={onClose} aria-label="Close details" className="p-1 rounded text-white/50 hover:text-white"><X size={16} aria-hidden="true" /></button>
      </header>
      <div className="p-5 space-y-5">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-full bg-[#F97316]/15 text-[#FDBA74] font-bold flex items-center justify-center">{enquiry.fullName.charAt(0).toUpperCase()}</span>
          <div>
            <p className="font-semibold text-white">{enquiry.fullName}</p>
            <p className="text-xs text-[#94A3B8]">Received {formatDateTime(enquiry.createdAt)}</p>
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          <li><a href={`mailto:${enquiry.email}`} className="flex items-center gap-2 text-[#CBD5E1] hover:text-[#F97316] break-all"><Mail size={14} aria-hidden="true" />{enquiry.email}</a></li>
          <li><a href={`tel:${phone}`} className="flex items-center gap-2 text-[#CBD5E1] hover:text-[#F97316]"><Phone size={14} aria-hidden="true" />{enquiry.phone}</a></li>
          <li><a href={`https://wa.me/${phone.replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#CBD5E1] hover:text-[#F97316]"><MessageSquare size={14} aria-hidden="true" />Open WhatsApp</a></li>
        </ul>
        <div>
          <p className="text-xs font-semibold text-[#94A3B8] mb-1">{enquiry.projectType}</p>
          <p className="text-sm text-white whitespace-pre-line bg-[var(--rj-navy-950)] rounded-lg p-3 border border-white/5 max-h-48 overflow-y-auto">{enquiry.projectDetails}</p>
        </div>
        <SelectInput label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} options={STATUSES} />
        <TextInput label="Follow-up date" type="date" value={form.followUpDate} onChange={(e) => setForm({ ...form, followUpDate: e.target.value })} />
        <TextArea label="Notes" rows={4} maxLength={5000} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Call summary, next steps…" />
        <div className="flex gap-2">
          <Button onClick={save} loading={saving} disabled={!dirty} className="flex-1">Save changes</Button>
          <Button variant="secondary" onClick={() => onDelete(enquiry)} aria-label="Delete enquiry"><Trash2 size={16} aria-hidden="true" /></Button>
        </div>
      </div>
    </aside>
  );
}

export default function Enquiries() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(null);

  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    adminApi
      .enquiries()
      .then((data) => {
        setItems(data);
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

  const [askDelete, deleteDialog] = useConfirmDelete(
    async (enquiry) => {
      await adminApi.deleteEnquiry(enquiry._id);
      setItems((prev) => prev.filter((i) => i._id !== enquiry._id));
      setSelectedId(null);
    },
    (enquiry) => `The enquiry from ${enquiry.fullName}`
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) =>
      (statusFilter === "All" || i.status === statusFilter) &&
      (typeFilter === "All" || i.projectType === typeFilter) &&
      (!q || [i.fullName, i.email, i.phone, i.projectDetails].some((v) => v?.toLowerCase().includes(q)))
    );
  }, [items, query, statusFilter, typeFilter]);

  const selected = items.find((i) => i._id === selectedId);

  const exportCsv = () => {
    const url = URL.createObjectURL(new Blob([toCsv(filtered)], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `enquiries-${new Date().toISOString().slice(0, 10)}.csv` });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader title="Enquiries & CRM" subtitle="Leads submitted through the website contact forms." actions={<Button variant="secondary" onClick={exportCsv} disabled={!filtered.length}><Download size={16} aria-hidden="true" /> Export CSV</Button>} />
      <Toolbar>
        <SearchInput value={query} onChange={setQuery} placeholder="Search name, email, phone or details…" label="Search enquiries" />
        <FilterSelect label="Filter by status" value={statusFilter} onChange={setStatusFilter} options={[["All", "All statuses"], ...STATUSES]} />
        <FilterSelect label="Filter by project type" value={typeFilter} onChange={setTypeFilter} options={[["All", "All project types"], ...TYPES]} />
      </Toolbar>

      {status === "loading" ? <LoadingState label="Loading enquiries" /> : status === "error" ? <ErrorState message={error} onRetry={load} /> : items.length === 0 ? (
        <EmptyState title="No enquiries yet" text="Submissions from the contact and pricing forms will appear here." />
      ) : (
        <div className={`grid gap-6 ${selected ? "xl:grid-cols-[1fr_360px]" : ""}`}>
          {filtered.length === 0 ? <EmptyState title="No enquiries match these filters" /> : (
            <Table columns={["Name", "Project type", "Received", "Follow-up", "Status"]} caption="Enquiries">
              {filtered.map((e) => {
                const due = e.followUpDate && new Date(e.followUpDate) <= new Date() && e.status !== "Closed";
                return (
                  <tr key={e._id} className={`cursor-pointer transition-colors ${selectedId === e._id ? "bg-[#F97316]/10" : "hover:bg-white/[0.03]"}`} onClick={() => setSelectedId(e._id)}>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => setSelectedId(e._id)} className="text-left focus-visible:outline-2 focus-visible:outline-[#F97316] rounded">
                        <span className="block font-semibold text-white">{e.fullName}</span>
                        <span className="text-xs text-[#94A3B8]">{e.email}</span>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-[#CBD5E1]">{e.projectType}</td>
                    <td className="px-4 py-3 text-[#CBD5E1] whitespace-nowrap">{formatDateTime(e.createdAt)}</td>
                    <td className={`px-4 py-3 whitespace-nowrap ${due ? "text-red-300 font-semibold" : "text-[#94A3B8]"}`}>{e.followUpDate ? formatDateTime(e.followUpDate) : "—"}</td>
                    <td className="px-4 py-3"><Pill tone={STATUS_TONES[e.status]}>{e.status}</Pill></td>
                  </tr>
                );
              })}
            </Table>
          )}
          {selected && (
            <EnquiryDetails
              key={selected._id}
              enquiry={selected}
              onClose={() => setSelectedId(null)}
              onSaved={(updated) => setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)))}
              onDelete={askDelete}
            />
          )}
        </div>
      )}
      {deleteDialog}
    </>
  );
}
