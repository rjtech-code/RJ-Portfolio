import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";
import { publicApi } from "../../services/api";

const PROJECT_TYPES = ["Business Website", "Web Application", "SaaS Platform", "E-Commerce", "UI/UX Design", "Other"];

const EMPTY = { name: "", email: "", phone: "", projectType: "Business Website", details: "" };

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length > 100) errors.name = "Name must be 100 characters or fewer.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!/^\+?[0-9\s\-().]{7,20}$/.test(values.phone.trim())) errors.phone = "Please enter a valid phone number (7–20 digits).";
  if (!PROJECT_TYPES.includes(values.projectType)) errors.projectType = "Please choose a project type.";
  if (values.details.trim().length < 10) errors.details = "Please describe your project in a few words (at least 10 characters).";
  else if (values.details.length > 5000) errors.details = "Please keep the details under 5000 characters.";
  return errors;
};

const inputClass = (hasError) =>
  `w-full bg-[var(--rj-navy-950)] border rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F97316]/40 ${
    hasError ? "border-red-400/60" : "border-[var(--rj-panel-border)] focus:border-[#F97316]/60"
  }`;

const Field = ({ id, label, error, children, hint }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-[11px] font-bold text-white/60 uppercase tracking-widest">{label}</label>
    {children}
    {hint && !error && <p className="text-xs text-white/40">{hint}</p>}
    {error && <p id={`${id}-error`} className="text-xs text-red-300">{error}</p>}
  </div>
);

// Project enquiry form posting to the existing /api/contact endpoint
export default function ContactForm({ defaultProjectType = "Business Website", detailsLabel = "Project details", detailsPlaceholder = "What would you like to build? Mention goals, pages or features, and any deadline." }) {
  const [values, setValues] = useState({ ...EMPTY, projectType: defaultProjectType });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`enquiry-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus("submitting");
    setServerMessage("");
    try {
      await publicApi.submitEnquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        projectType: values.projectType,
        details: values.details.trim(),
      });
      setStatus("success");
      setValues({ ...EMPTY, projectType: defaultProjectType });
    } catch (error) {
      setStatus("error");
      setServerMessage(error.status === 429 ? "Too many submissions from your connection. Please try again later or contact us on WhatsApp." : error.message);
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center text-center py-12 px-4">
        <CheckCircle2 size={56} className="text-[#F97316] mb-5" aria-hidden="true" />
        <h3 className="text-2xl font-bold text-white mb-2">Enquiry sent</h3>
        <p className="text-[#CBD5E1] max-w-sm mb-8">Thank you. We've received your project details and will get back to you soon.</p>
        <button type="button" onClick={() => setStatus("idle")} className="text-sm font-semibold text-[#F97316] hover:underline">
          Send another enquiry
        </button>
      </div>
    );
  }

  const describedBy = (field) => (errors[field] ? `enquiry-${field}-error` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="enquiry-name" label="Full name" error={errors.name}>
          <input id="enquiry-name" name="name" autoComplete="name" maxLength={100} value={values.name} onChange={update("name")} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} className={inputClass(errors.name)} placeholder="Your name" />
        </Field>
        <Field id="enquiry-email" label="Email address" error={errors.email}>
          <input id="enquiry-email" name="email" type="email" autoComplete="email" maxLength={254} value={values.email} onChange={update("email")} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} className={inputClass(errors.email)} placeholder="you@example.com" />
        </Field>
        <Field id="enquiry-phone" label="Phone / WhatsApp" error={errors.phone}>
          <input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" maxLength={20} value={values.phone} onChange={update("phone")} aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone")} className={inputClass(errors.phone)} placeholder="+91 …" />
        </Field>
        <Field id="enquiry-projectType" label="Project type" error={errors.projectType}>
          <select id="enquiry-projectType" name="projectType" value={values.projectType} onChange={update("projectType")} className={`${inputClass(errors.projectType)} appearance-none`}>
            {PROJECT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </Field>
      </div>
      <Field id="enquiry-details" label={detailsLabel} error={errors.details} hint={`${values.details.length}/5000`}>
        <textarea id="enquiry-details" name="details" rows={5} maxLength={5000} value={values.details} onChange={update("details")} aria-invalid={Boolean(errors.details)} aria-describedby={describedBy("details")} className={`${inputClass(errors.details)} resize-y min-h-32`} placeholder={detailsPlaceholder} />
      </Field>

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 text-sm text-red-200 bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          Your enquiry was not sent. {serverMessage}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="w-full inline-flex items-center justify-center gap-3 py-4 bg-[#F97316] text-white font-bold uppercase text-xs tracking-[0.2em] rounded-xl shadow-lg shadow-[#F97316]/20 transition-all hover:bg-[#EA580C] disabled:opacity-60 disabled:cursor-wait focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        {status === "submitting" ? <><Loader2 className="animate-spin" size={18} aria-hidden="true" /> Sending…</> : <>Send enquiry <Send size={16} aria-hidden="true" /></>}
      </button>
      <p className="text-xs text-white/40 text-center">We use your details only to respond to your enquiry. See our privacy policy.</p>
    </form>
  );
}
