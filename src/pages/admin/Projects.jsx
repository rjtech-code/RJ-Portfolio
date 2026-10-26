import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useAdminResource } from "../../hooks/useAdminResource";
import { Button, EmptyState, ErrorState, FilterSelect, LoadingState, Modal, PageHeader, Pill, SearchInput, SelectInput, Table, TextArea, TextInput, Toolbar } from "../../Components/admin/ui";
import { STATUS_TONES, formatDateTime, formatINR, toDateInput } from "../../utils/adminFormat";
import { useConfirmDelete } from "../../hooks/useConfirmDelete";
import { useToast } from "../../hooks/useToast";

const STATUSES = ["Planning", "In Progress", "Review", "Completed", "On Hold"];
const EMPTY = { name: "", clientId: "", clientName: "", status: "Planning", progress: 0, startDate: "", deadline: "", budget: "", notes: "" };

const validate = (f) => {
  const e = {};
  if (!f.name.trim()) e.name = "Project name is required.";
  const progress = Number(f.progress);
  if (!Number.isFinite(progress) || progress < 0 || progress > 100) e.progress = "Progress must be between 0 and 100.";
  if (f.budget !== "" && (!Number.isFinite(Number(f.budget)) || Number(f.budget) < 0)) e.budget = "Budget must be a positive number.";
  if (f.startDate && f.deadline && f.deadline < f.startDate) e.deadline = "Deadline cannot be before the start date.";
  return e;
};

function ProjectForm({ initial, clients, onCancel, onSubmit }) {
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
    const client = clients.find((c) => c._id === form.clientId);
    await onSubmit({
      name: form.name,
      clientId: form.clientId || null,
      clientName: client ? client.company || client.name : form.clientName,
      status: form.status,
      progress: form.status === "Completed" ? 100 : Number(form.progress),
      startDate: form.startDate || null,
      deadline: form.deadline || null,
      budget: form.budget === "" ? null : Number(form.budget),
      notes: form.notes,
    }).finally(() => setSaving(false));
  };

  return (
    <form id="project-form" onSubmit={submit} noValidate className="grid sm:grid-cols-2 gap-4">
      <TextInput className="sm:col-span-2" label="Project name" required value={form.name} onChange={set("name")} error={errors.name} maxLength={150} />
      <SelectInput label="Client (from Clients)" value={form.clientId} onChange={set("clientId")} options={[["", "— None / type below —"], ...clients.map((c) => [c._id, c.company ? `${c.name} (${c.company})` : c.name])]} />
      <TextInput label="Client name" value={form.clientName} onChange={set("clientName")} disabled={Boolean(form.clientId)} hint={form.clientId ? "Taken from the selected client" : "If the client isn't in Clients yet"} maxLength={150} />
      <SelectInput label="Status" value={form.status} onChange={set("status")} options={STATUSES} />
      <TextInput label="Progress (%)" type="number" min="0" max="100" value={form.progress} onChange={set("progress")} error={errors.progress} />
      <TextInput label="Start date" type="date" value={form.startDate} onChange={set("startDate")} />
      <TextInput label="Deadline" type="date" value={form.deadline} onChange={set("deadline")} error={errors.deadline} />
      <TextInput className="sm:col-span-2" label="Budget (INR)" type="number" min="0" value={form.budget} onChange={set("budget")} error={errors.budget} hint="Optional. Used only for the dashboard totals." />
      <TextArea className="sm:col-span-2" label="Notes / project details" value={form.notes} onChange={set("notes")} maxLength={5000} />
      <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={saving}>Save project</Button>
      </div>
    </form>
  );
}

export default function Projects() {
  const projects = useAdminResource("projects");
  const clients = useAdminResource("clients");
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  // Quick action from the overview (?new=1) opens the form straight away
  const [editing, setEditing] = useState(() => (params.get("new") ? EMPTY : null));
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Quick action from the overview: /admin/projects?new=1
  useEffect(() => {
    if (params.get("new")) setParams({}, { replace: true });
  }, [params, setParams]);

  const [askDelete, deleteDialog] = useConfirmDelete((p) => projects.remove(p._id), (p) => `Project "${p.name}"`);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.items.filter((p) => (statusFilter === "All" || p.status === statusFilter) && (!q || p.name.toLowerCase().includes(q) || p.clientName?.toLowerCase().includes(q)));
  }, [projects.items, query, statusFilter]);

  const save = async (body) => {
    try {
      if (editing._id) await projects.update(editing._id, body);
      else await projects.create(body);
      toast(editing._id ? "Project updated." : "Project created.");
      setEditing(null);
    } catch (error) {
      toast(`Save failed: ${error.message}`, "error");
    }
  };

  return (
    <>
      <PageHeader title="Project Management" subtitle="Track client work: status, progress and deadlines." actions={<Button onClick={() => setEditing(EMPTY)}><Plus size={16} aria-hidden="true" /> New project</Button>} />
      <Toolbar>
        <SearchInput value={query} onChange={setQuery} placeholder="Search projects or clients…" label="Search projects" />
        <FilterSelect label="Filter by status" value={statusFilter} onChange={setStatusFilter} options={[["All", "All statuses"], ...STATUSES]} />
      </Toolbar>

      {projects.status === "loading" ? <LoadingState label="Loading projects" /> : projects.status === "error" ? <ErrorState message={projects.error} onRetry={projects.reload} /> : projects.items.length === 0 ? (
        <EmptyState title="No projects yet" text="Add your first client project to start tracking progress." action={<Button onClick={() => setEditing(EMPTY)}><Plus size={16} aria-hidden="true" /> New project</Button>} />
      ) : filtered.length === 0 ? <EmptyState title="No projects match these filters" /> : (
        <Table columns={["Project", "Client", "Status", "Progress", "Deadline", "Budget", "Actions"]} caption="Projects">
          {filtered.map((p) => {
            const overdue = p.deadline && p.status !== "Completed" && new Date(p.deadline) < new Date();
            return (
              <tr key={p._id} className="hover:bg-white/[0.03]">
                <td className="px-4 py-3 font-semibold text-white">{p.name}</td>
                <td className="px-4 py-3 text-[#CBD5E1]">{p.clientName || "—"}</td>
                <td className="px-4 py-3"><Pill tone={STATUS_TONES[p.status]}>{p.status}</Pill></td>
                <td className="px-4 py-3 w-40">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/10" role="progressbar" aria-valuenow={p.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${p.name} progress`}>
                      <div className="h-full rounded-full bg-gradient-to-r from-[#F97316] to-amber-300" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-xs text-[#CBD5E1] w-9 text-right">{p.progress}%</span>
                  </div>
                </td>
                <td className={`px-4 py-3 whitespace-nowrap ${overdue ? "text-red-300 font-semibold" : "text-[#CBD5E1]"}`}>{formatDateTime(p.deadline)}{overdue && " · overdue"}</td>
                <td className="px-4 py-3 text-[#CBD5E1] whitespace-nowrap">{formatINR(p.budget)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button size="sm" variant="secondary" onClick={() => setEditing({ ...EMPTY, ...p, clientId: p.clientId || "", budget: p.budget ?? "", startDate: toDateInput(p.startDate), deadline: toDateInput(p.deadline) })}><Pencil size={14} aria-hidden="true" /> Edit</Button>
                    <Button size="sm" variant="ghost" onClick={() => askDelete(p)} aria-label={`Delete ${p.name}`}><Trash2 size={14} aria-hidden="true" /></Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      )}

      <Modal open={Boolean(editing)} title={editing?._id ? "Edit project" : "New project"} onClose={() => setEditing(null)}>
        {editing && <ProjectForm key={editing._id || "new"} initial={editing} clients={clients.items} onCancel={() => setEditing(null)} onSubmit={save} />}
      </Modal>
      {deleteDialog}
    </>
  );
}
