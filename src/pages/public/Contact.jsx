import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, MessageSquare } from "lucide-react";
import { pageByKey } from "../../config/pages";
import { usePageContent, useSiteData } from "../../hooks/useSiteData";
import { locationDisplay, mapUrl, whatsappUrl } from "../../config/site";
import { Container, Eyebrow } from "../../Components/common/primitives";
import ContactForm from "../../Components/public/ContactForm";

export default function Contact() {
  const { heading, intro } = usePageContent("contact", pageByKey.contact);
  const { settings } = useSiteData();

  const methods = [
    whatsappUrl(settings) && { icon: MessageSquare, title: "WhatsApp", value: settings.phone, href: whatsappUrl(settings, "Hello RJ TechForce, I would like to discuss a project."), external: true },
    settings.email && { icon: Mail, title: "Email", value: settings.email, href: `mailto:${settings.email}?subject=Project%20Inquiry` },
    settings.locality && { icon: MapPin, title: "Location", value: locationDisplay(settings), href: mapUrl(settings), external: true },
    settings.hours && { icon: Clock, title: "Availability", value: settings.hours },
  ].filter(Boolean);

  return (
    <section className="relative pt-32 md:pt-40 pb-24 bg-[var(--rj-navy-950)] overflow-hidden">
      <div className="absolute inset-0 circuit-bg pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#F97316]/[0.06] rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      <Container className="relative">
        <div className="max-w-2xl mb-12 animate-fade-up">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mt-5 mb-5">{heading}</h1>
          <p className="text-[#94A3B8] text-base leading-relaxed">{intro}</p>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          <div className="p-6 md:p-10 rounded-3xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Project enquiry</h2>
            <p className="text-sm text-[#94A3B8] mb-8">All fields are required.</p>
            <ContactForm />
          </div>

          <aside className="space-y-4">
            {methods.map(({ icon: MethodIcon, title, value, href, external }) => {
              const body = (
                <>
                  <span className="w-11 h-11 shrink-0 rounded-xl bg-[#F97316]/10 text-[#F97316] flex items-center justify-center"><MethodIcon size={20} aria-hidden="true" /></span>
                  <span>
                    <span className="block text-sm text-[#94A3B8]">{title}</span>
                    <span className="block text-white font-semibold break-all">{value}</span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-4 p-5 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]";
              return href ? (
                <a key={title} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${cls} hover:border-[#F97316]/50 transition-colors`}>{body}</a>
              ) : (
                <div key={title} className={cls}>{body}</div>
              );
            })}
            <div className="p-6 rounded-2xl border border-[#F97316]/30 bg-[#F97316]/5">
              <h2 className="text-white font-bold mb-2">What happens next?</h2>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-[#CBD5E1]">
                <li>We review your enquiry.</li>
                <li>We contact you to discuss the details.</li>
                <li>You receive a proposal and estimate.</li>
              </ol>
              <p className="text-sm text-[#94A3B8] mt-4">Have a quick question? <Link to="/faq" className="text-[#F97316] hover:underline">Read the FAQ</Link>.</p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
