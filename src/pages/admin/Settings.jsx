import { useCallback, useEffect, useState } from "react";
import { Building2, Globe, Image, Phone, Plus, Trash2 } from "lucide-react";
import { adminApi } from "../../services/adminApi";
import { Button, ErrorState, LoadingState, PageHeader, Panel, TextInput } from "../../Components/admin/ui";
import { useToast } from "../../hooks/useToast";

const SECTIONS = [
  { key: "company", label: "Company information", icon: Building2 },
  { key: "contact", label: "Contact details", icon: Phone },
  { key: "social", label: "Social links", icon: Globe },
  { key: "branding", label: "Branding", icon: Image },
];

const validate = (f) => {
  const e = {};
  if (!f.companyName.trim()) e.companyName = "Company name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email.";
  if (f.phone && !/^\+?[0-9\s\-().]{7,20}$/.test(f.phone)) e.phone = "Enter a valid phone number.";
  if (f.whatsapp && !/^[0-9]{8,15}$/.test(f.whatsapp)) e.whatsapp = "Digits only, with country code (e.g. 919876543210).";
  f.socialLinks.forEach((link, i) => {
    if (!link.name.trim()) e[`social-${i}-name`] = "Name required.";
    if (!/^https:\/\/\S+$/.test(link.url)) e[`social-${i}-url`] = "Must start with https://";
  });
  return e;
};

export default function Settings() {
  const toast = useToast();
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState("company");

  const fetchSettings = useCallback(() => {
    adminApi.settings().then((s) => {
      const clean = { ...s, socialLinks: s.socialLinks || [] };
      delete clean.updatedAt;
      setForm(clean);
      setSaved(clean);
    }).catch((err) => setError(err.message));
  }, []);
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);
  const load = () => {
    setError("");
    fetchSettings();
  };

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!form) return <LoadingState label="Loading settings" />;

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const dirty = JSON.stringify(form) !== JSON.stringify(saved);

  const save = async () => {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      toast("Please fix the highlighted fields.", "error");
      return;
    }
    setSaving(true);
    try {
      const result = await adminApi.saveSettings(form);
      delete result.updatedAt;
      setForm(result);
      setSaved(result);
      toast("Settings saved. The website uses them immediately.");
    } catch (err) {
      toast(`Save failed: ${err.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  const updateLink = (index, field, value) => setForm({ ...form, socialLinks: form.socialLinks.map((l, i) => (i === index ? { ...l, [field]: value } : l)) });

  return (
    <>
      <PageHeader title="Settings" subtitle="Company details shown on the website (footer, contact page, structured data)." actions={<Button onClick={save} loading={saving} disabled={!dirty}>Save settings</Button>} />
      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <nav aria-label="Settings sections">
          <ul className="flex lg:flex-col gap-1 overflow-x-auto p-1 rounded-xl bg-white/[0.03] border border-white/5">
            {SECTIONS.map(({ key, label, icon: SectionIcon }) => (
              <li key={key}>
                <button type="button" aria-current={section === key ? "true" : undefined} onClick={() => setSection(key)} className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm whitespace-nowrap ${section === key ? "bg-[#F97316] text-white font-semibold" : "text-[#CBD5E1] hover:bg-white/5"}`}>
                  <SectionIcon size={16} aria-hidden="true" /> {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {section === "company" && (
          <Panel title="Company information">
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput label="Company name" required value={form.companyName} onChange={set("companyName")} error={errors.companyName} maxLength={100} />
              <TextInput label="Tagline" value={form.tagline} onChange={set("tagline")} maxLength={150} />
              <TextInput label="City" value={form.locality} onChange={set("locality")} maxLength={100} />
              <TextInput label="State / region" value={form.region} onChange={set("region")} maxLength={100} />
              <TextInput label="Country" value={form.country} onChange={set("country")} maxLength={100} />
              <TextInput label="Business hours / availability" value={form.hours} onChange={set("hours")} maxLength={100} />
            </div>
          </Panel>
        )}

        {section === "contact" && (
          <Panel title="Contact details">
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput label="Public email" required type="email" value={form.email} onChange={set("email")} error={errors.email} maxLength={254} />
              <TextInput label="Phone (display)" value={form.phone} onChange={set("phone")} error={errors.phone} maxLength={30} />
              <TextInput label="WhatsApp number" value={form.whatsapp} onChange={set("whatsapp")} error={errors.whatsapp} hint="Digits with country code, no + or spaces" maxLength={20} />
            </div>
          </Panel>
        )}

        {section === "social" && (
          <Panel title="Social links" actions={<Button size="sm" variant="secondary" onClick={() => setForm({ ...form, socialLinks: [...form.socialLinks, { name: "", url: "" }] })} disabled={form.socialLinks.length >= 10}><Plus size={14} aria-hidden="true" /> Add link</Button>}>
            <p className="text-sm text-[#94A3B8] mb-4">Only add profiles you own: they are published in the footer and in structured data.</p>
            {form.socialLinks.length === 0 ? <p className="text-sm text-white/50">No social links.</p> : (
              <ul className="space-y-3">
                {form.socialLinks.map((link, i) => (
                  <li key={i} className="grid sm:grid-cols-[180px_1fr_auto] gap-3 items-start">
                    <TextInput label="Name" value={link.name} onChange={(e) => updateLink(i, "name", e.target.value)} error={errors[`social-${i}-name`]} maxLength={40} />
                    <TextInput label="URL" value={link.url} onChange={(e) => updateLink(i, "url", e.target.value)} error={errors[`social-${i}-url`]} maxLength={300} />
                    <Button variant="ghost" className="sm:mt-6" onClick={() => setForm({ ...form, socialLinks: form.socialLinks.filter((_, j) => j !== i) })} aria-label={`Remove ${link.name || "link"}`}><Trash2 size={16} aria-hidden="true" /></Button>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        )}

        {section === "branding" && (
          <Panel title="Branding">
            <div className="flex items-center gap-4 mb-5">
              <img src="/brand/rj-techforce-logo-80.png" alt="Current logo" width="64" height="64" className="w-16 h-16 rounded-xl" />
              <div>
                <p className="font-semibold text-white">{form.companyName}</p>
                <p className="text-sm text-[#94A3B8]">{form.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-[#94A3B8]">
              The logo, favicon and social sharing image are static files in <code className="text-[#FDBA74]">public/brand</code> and <code className="text-[#FDBA74]">public/og-image.png</code>.
              Uploading new images from the dashboard needs file storage, which isn't set up for this project yet; replace those files and redeploy to change them.
            </p>
          </Panel>
        )}
      </div>
    </>
  );
}
