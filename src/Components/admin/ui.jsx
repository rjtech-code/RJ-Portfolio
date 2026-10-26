import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ToastContext } from "../../hooks/useToast";
import { AlertTriangle, CheckCircle2, Inbox, Loader2, RefreshCw, Search, X } from "lucide-react";



/* ---------- Toasts ---------- */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((message, tone = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500);
  }, []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed bottom-4 right-4 z-[200] space-y-2 w-[calc(100%-2rem)] max-w-sm" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} role={t.tone === "error" ? "alert" : "status"} className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-2xl text-sm ${t.tone === "error" ? "bg-[#2a0f12] border-red-400/40 text-red-100" : "bg-[#0f2a1f] border-emerald-400/40 text-emerald-100"}`}>
            {t.tone === "error" ? <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> : <CheckCircle2 size={16} className="mt-0.5 shrink-0" aria-hidden="true" />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
/* ---------- Layout pieces ---------- */
export const PageHeader = ({ title, subtitle, actions }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-[#94A3B8] mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export const Panel = ({ title, actions, children, className = "", padded = true }) => (
  <section className={`rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] ${className}`}>
    {title && (
      <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/5">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {actions}
      </header>
    )}
    <div className={padded ? "p-5" : ""}>{children}</div>
  </section>
);

export const Button = ({ variant = "primary", size = "md", loading = false, className = "", children, ...props }) => {
  const variants = {
    primary: "bg-[#F97316] text-white hover:bg-[#EA580C] shadow-lg shadow-[#F97316]/20",
    secondary: "border border-[var(--rj-panel-border)] bg-white/[0.03] text-white hover:bg-white/[0.07]",
    danger: "bg-red-500/90 text-white hover:bg-red-500",
    ghost: "text-[#CBD5E1] hover:bg-white/5 hover:text-white",
  };
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2.5 text-sm", icon: "p-2" };
  return (
    <button
      type="button"
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
};

const PILL_TONES = {
  orange: "bg-[#F97316]/15 text-[#FDBA74] border-[#F97316]/30",
  blue: "bg-sky-400/10 text-sky-300 border-sky-400/30",
  green: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
  amber: "bg-amber-400/10 text-amber-300 border-amber-400/30",
  red: "bg-red-400/10 text-red-300 border-red-400/30",
  slate: "bg-white/5 text-white/60 border-white/10",
  violet: "bg-violet-400/10 text-violet-300 border-violet-400/30",
};
export const Pill = ({ tone = "slate", children }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold whitespace-nowrap ${PILL_TONES[tone]}`}>{children}</span>
);


/* ---------- Toolbar ---------- */
export const SearchInput = ({ value, onChange, placeholder = "Search…", label = "Search" }) => {
  const id = useId();
  return (
    <div className="relative flex-1 min-w-[200px]">
      <label htmlFor={id} className="sr-only">{label}</label>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
      <input id={id} type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--rj-navy-950)] border border-[var(--rj-panel-border)] text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40" />
    </div>
  );
};

export const FilterSelect = ({ label, value, onChange, options }) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="sr-only">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="w-full sm:w-auto px-3 py-2.5 rounded-lg bg-[var(--rj-navy-950)] border border-[var(--rj-panel-border)] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F97316]/40">
        {options.map((o) => {
          const [val, text] = Array.isArray(o) ? o : [o, o];
          return <option key={val} value={val}>{text}</option>;
        })}
      </select>
    </div>
  );
};

export const Toolbar = ({ children }) => <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4">{children}</div>;

/* ---------- Table + states ---------- */
// Wide tables scroll horizontally inside their panel on small screens
export const Table = ({ columns, children, caption }) => (
  <div className="overflow-x-auto rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
    <table className="w-full min-w-[720px] text-sm">
      {caption && <caption className="sr-only">{caption}</caption>}
      <thead>
        <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-[#94A3B8]">
          {columns.map((c) => <th key={c} scope="col" className="px-4 py-3 font-semibold">{c}</th>)}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">{children}</tbody>
    </table>
  </div>
);

export const LoadingState = ({ label = "Loading" }) => (
  <div role="status" className="flex items-center justify-center gap-3 py-16 text-sm text-[#94A3B8]">
    <Loader2 size={18} className="animate-spin text-[#F97316]" aria-hidden="true" /> {label}…
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div role="alert" className="flex flex-col items-center text-center py-14 px-6 rounded-2xl border border-red-400/30 bg-red-500/5">
    <AlertTriangle size={24} className="text-red-300 mb-3" aria-hidden="true" />
    <p className="text-white font-semibold mb-1">Couldn't load data</p>
    <p className="text-sm text-[#94A3B8] mb-5">{message}</p>
    {onRetry && <Button variant="secondary" onClick={onRetry}><RefreshCw size={14} aria-hidden="true" /> Try again</Button>}
  </div>
);

export const EmptyState = ({ title, text, action, icon: EmptyIcon = Inbox }) => (
  <div className="flex flex-col items-center text-center py-14 px-6 rounded-2xl border border-dashed border-white/10">
    <EmptyIcon size={26} className="text-white/30 mb-3" aria-hidden="true" />
    <p className="text-white font-semibold mb-1">{title}</p>
    {text && <p className="text-sm text-[#94A3B8] max-w-sm">{text}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

/* ---------- Dialogs ---------- */
export function Modal({ open, title, onClose, children, footer, wide = false }) {
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Runs only when the dialog opens/closes so typing never moves focus
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("input, textarea, select, button")?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label={title} className={`relative w-full ${wide ? "sm:max-w-4xl" : "sm:max-w-xl"} max-h-[92vh] flex flex-col rounded-t-2xl sm:rounded-2xl border border-[var(--rj-panel-border)] bg-[#0A1730] shadow-2xl`}>
        <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5"><X size={18} aria-hidden="true" /></button>
        </header>
        <div className="overflow-y-auto px-6 py-5 flex-1">{children}</div>
        {footer && <footer className="flex justify-end gap-2 px-6 py-4 border-t border-white/10">{footer}</footer>}
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, title = "Are you sure?", message, confirmLabel = "Delete", onConfirm, onCancel, busy }) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={busy}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm} loading={busy}>{confirmLabel}</Button>
        </>
      }
    >
      <p className="text-[#CBD5E1]">{message}</p>
    </Modal>
  );
}

/* ---------- Form fields ---------- */
const fieldBase = "w-full rounded-lg bg-[var(--rj-navy-950)] border px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40";
const fieldBorder = (error) => (error ? "border-red-400/60" : "border-[var(--rj-panel-border)]");

export const Field = ({ label, error, hint, required, children, id, className = "" }) => (
  <div className={`space-y-1.5 ${className}`}>
    <label htmlFor={id} className="block text-xs font-semibold text-[#CBD5E1]">{label}{required && <span className="text-[#F97316]" aria-hidden="true"> *</span>}</label>
    {children}
    {error ? <p id={`${id}-error`} className="text-xs text-red-300">{error}</p> : hint ? <p className="text-xs text-white/40">{hint}</p> : null}
  </div>
);

export const TextInput = ({ label, error, hint, required, className, ...props }) => {
  const id = useId();
  return (
    <Field label={label} error={error} hint={hint} required={required} id={id} className={className}>
      <input id={id} aria-required={required || undefined} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`${fieldBase} ${fieldBorder(error)}`} {...props} />
    </Field>
  );
};

export const TextArea = ({ label, error, hint, required, className, rows = 4, ...props }) => {
  const id = useId();
  return (
    <Field label={label} error={error} hint={hint} required={required} id={id} className={className}>
      <textarea id={id} rows={rows} aria-required={required || undefined} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`${fieldBase} ${fieldBorder(error)} resize-y`} {...props} />
    </Field>
  );
};

export const SelectInput = ({ label, error, hint, required, options, className, ...props }) => {
  const id = useId();
  return (
    <Field label={label} error={error} hint={hint} required={required} id={id} className={className}>
      <select id={id} className={`${fieldBase} ${fieldBorder(error)}`} {...props}>
        {options.map((o) => {
          const [val, text] = Array.isArray(o) ? o : [o, o];
          return <option key={val} value={val}>{text}</option>;
        })}
      </select>
    </Field>
  );
};

export const Checkbox = ({ label, hint, checked, onChange }) => {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#F97316]" />
      <label htmlFor={id} className="text-sm text-white">
        {label}
        {hint && <span className="block text-xs text-white/40">{hint}</span>}
      </label>
    </div>
  );
};

// Comma-separated list input <-> string[]
export const ListInput = ({ value = [], onChange, ...props }) => (
  <TextInput value={value.join(", ")} onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trimStart()))} hint="Separate items with commas" {...props} />
);

