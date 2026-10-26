import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BellRing, CalendarClock, FolderKanban, Image, Inbox, Newspaper, Plus, Sparkles } from "lucide-react";
import { adminApi, getSession } from "../../services/adminApi";
import { ErrorState, LoadingState, Panel } from "../../Components/admin/ui";
import { formatDateTime, formatINR } from "../../utils/adminFormat";

const StatCard = ({ label, value, icon: StatIcon, tone, to }) => (
  <Link to={to} className="group block p-5 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] hover:border-[#F97316]/40 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <span className="text-sm text-[#CBD5E1]">{label}</span>
      <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${tone}`}><StatIcon size={18} aria-hidden="true" /></span>
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
  </Link>
);

// Area chart of enquiries per month (last 6 months)
const AreaChart = ({ data }) => {
  const max = Math.max(1, ...data.map((d) => d.count));
  const w = 600, h = 200, pad = 24;
  const points = data.map((d, i) => [pad + (i * (w - pad * 2)) / Math.max(1, data.length - 1), h - pad - (d.count / max) * (h - pad * 2)]);
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
  const area = `${line} L${points.at(-1)[0]},${h - pad} L${points[0][0]},${h - pad} Z`;
  return (
    <figure>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48" role="img" aria-label={`Enquiries per month: ${data.map((d) => `${d.label} ${d.count}`).join(", ")}`}>
        <defs>
          <linearGradient id="enq-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => <line key={f} x1={pad} x2={w - pad} y1={pad + f * (h - pad * 2)} y2={pad + f * (h - pad * 2)} stroke="rgba(255,255,255,0.06)" />)}
        <path d={area} fill="url(#enq-fill)" />
        <path d={line} fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinejoin="round" />
        {points.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#F97316" />)}
      </svg>
      <figcaption className="grid text-xs text-[#94A3B8]" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
        {data.map((d) => <span key={d.label} className="text-center">{d.label}<span className="block text-white font-semibold">{d.count}</span></span>)}
      </figcaption>
    </figure>
  );
};

const STATUS_COLORS = { New: "#F97316", Contacted: "#38BDF8", "In Progress": "#FBBF24", Closed: "#64748B" };

const Donut = ({ byStatus }) => {
  const entries = Object.entries(STATUS_COLORS).map(([status, color]) => ({ status, color, count: byStatus[status] || 0 }));
  const total = entries.reduce((s, e) => s + e.count, 0);
  let offset = 0;
  const r = 52, c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-6">
      <svg viewBox="0 0 140 140" className="w-36 h-36 shrink-0" role="img" aria-label={`Enquiries by status: ${entries.map((e) => `${e.status} ${e.count}`).join(", ")}`}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" />
        {total > 0 && entries.map((e) => {
          const len = (e.count / total) * c;
          const el = <circle key={e.status} cx="70" cy="70" r={r} fill="none" stroke={e.color} strokeWidth="16" strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} transform="rotate(-90 70 70)" />;
          offset += len;
          return el;
        })}
        <text x="70" y="66" textAnchor="middle" className="fill-white text-2xl font-bold">{total}</text>
        <text x="70" y="86" textAnchor="middle" className="fill-[#94A3B8] text-[10px]">enquiries</text>
      </svg>
      <ul className="space-y-2 text-sm w-full">
        {entries.map((e) => (
          <li key={e.status} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[#CBD5E1]"><span className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />{e.status}</span>
            <span className="text-white font-semibold">{e.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const fetchStats = useCallback(() => adminApi.stats().then(setStats).catch((err) => setError(err.message)), []);
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);
  const load = () => {
    setError("");
    fetchStats();
  };

  const name = getSession()?.email?.split("@")[0];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Welcome back{name ? `, ${name}` : ""}!</h1>
        <p className="text-sm text-[#94A3B8] mt-1">Live figures from your enquiries, projects and content.</p>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : !stats ? (
        <LoadingState label="Loading dashboard" />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard label="Total enquiries" value={stats.enquiries.total} icon={Inbox} tone="bg-sky-400/10 text-sky-300" to="/admin/enquiries" />
            <StatCard label="New enquiries" value={stats.enquiries.new} icon={BellRing} tone="bg-[#F97316]/15 text-[#FDBA74]" to="/admin/enquiries" />
            <StatCard label="Active projects" value={stats.projects.active} icon={FolderKanban} tone="bg-emerald-400/10 text-emerald-300" to="/admin/projects" />
            <StatCard label="Portfolio items" value={stats.content.portfolioPublished} icon={Image} tone="bg-violet-400/10 text-violet-300" to="/admin/portfolio" />
            <StatCard label="Blog articles" value={stats.content.postsPublished} icon={Newspaper} tone="bg-pink-400/10 text-pink-300" to="/admin/blog" />
          </div>

          <div className="grid lg:grid-cols-[1.6fr_1fr_0.9fr] gap-6">
            <Panel title="Enquiries (last 6 months)"><AreaChart data={stats.monthlyEnquiries} /></Panel>
            <Panel title="Enquiries by status"><Donut byStatus={stats.enquiries.byStatus} /></Panel>
            <Panel title="Quick actions">
              <div className="space-y-3">
                <Link to="/admin/projects?new=1" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F97316] text-white font-semibold hover:bg-[#EA580C]"><Plus size={18} aria-hidden="true" /> New project</Link>
                <Link to="/admin/blog/new" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F97316] text-white font-semibold hover:bg-[#EA580C]"><Newspaper size={18} aria-hidden="true" /> Write article</Link>
                <Link to="/admin/portfolio?new=1" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F97316] text-white font-semibold hover:bg-[#EA580C]"><Image size={18} aria-hidden="true" /> Add portfolio item</Link>
              </div>
            </Panel>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Panel title="Project value (from project records)">
              <dl className="space-y-4">
                <div><dt className="text-sm text-[#94A3B8]">Active pipeline</dt><dd className="text-2xl font-bold text-white">{formatINR(stats.projects.pipelineValue)}</dd></div>
                <div><dt className="text-sm text-[#94A3B8]">Completed projects ({stats.projects.completed})</dt><dd className="text-2xl font-bold text-white">{formatINR(stats.projects.completedValue)}</dd></div>
              </dl>
              <p className="text-xs text-white/40 mt-4">Sums of the budgets you enter on projects. Not accounting data.</p>
            </Panel>
            <Panel title="Upcoming deadlines">
              {stats.upcomingDeadlines.length === 0 ? <p className="text-sm text-[#94A3B8]">No deadlines on active projects.</p> : (
                <ul className="space-y-3">
                  {stats.upcomingDeadlines.map((p) => {
                    const overdue = new Date(p.deadline) < new Date();
                    return (
                      <li key={p._id} className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-white truncate">{p.name}</span>
                        <span className={`flex items-center gap-1 shrink-0 ${overdue ? "text-red-300" : "text-[#94A3B8]"}`}><CalendarClock size={14} aria-hidden="true" />{formatDateTime(p.deadline)}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
              {stats.enquiries.followUpsDue > 0 && (
                <Link to="/admin/enquiries" className="mt-4 inline-flex text-sm font-semibold text-[#FDBA74] hover:underline">{stats.enquiries.followUpsDue} enquiry follow-up(s) due</Link>
              )}
            </Panel>
            <Panel title="Recent activity">
              {stats.activity.length === 0 ? <p className="text-sm text-[#94A3B8]">No activity yet.</p> : (
                <ul className="space-y-3">
                  {stats.activity.map((a, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <Sparkles size={14} className="text-[#F97316] shrink-0 mt-1" aria-hidden="true" />
                      <span><span className="block text-white">{a.title}</span><span className="text-xs text-[#94A3B8]">{a.detail} · {formatDateTime(a.at)}</span></span>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </div>
      )}
    </>
  );
}
