import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Camera, Clock, Globe, GitBranch, Mail, MapPin, MessageSquare, Users, X } from "lucide-react";
import { services } from "../data/services";
import { useSiteData } from "../hooks/useSiteData";
import { locationDisplay, mapUrl, whatsappUrl } from "../config/site";
import { Logo } from "./Navbar";

const companyLinks = [
  { to: "/about", label: "About Us" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/process", label: "Our Process" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const socialIcons = { Instagram: Camera, LinkedIn: Users, GitHub: GitBranch, "Twitter / X": X, X };

const FooterHeading = ({ children }) => <h2 className="text-white font-bold text-base mb-5">{children}</h2>;

const Footer = () => {
  const { settings } = useSiteData();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsapp = whatsappUrl(settings, "Hello RJ TechForce, I would like to discuss a project.");

  return (
    <footer className="relative bg-[#040A16] border-t border-[var(--rj-panel-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr] gap-10 pb-12 border-b border-white/5">
          <div>
            <Logo />
            <p className="text-[#94A3B8] text-sm leading-relaxed mt-5 mb-5 max-w-xs">
              A web development team building websites, web applications and digital products for businesses.
            </p>
            {settings.hours && (
              <p className="inline-flex items-center gap-2 text-sm text-[#FDBA74]">
                <Clock size={14} aria-hidden="true" /> {settings.hours}
              </p>
            )}
          </div>

          <nav aria-label="Company">
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.to}><Link to={link.to} className="text-sm text-[#CBD5E1] hover:text-[#F97316] transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <FooterHeading>Services</FooterHeading>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}><Link to={`/services/${service.slug}`} className="text-sm text-[#CBD5E1] hover:text-[#F97316] transition-colors">{service.title}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <FooterHeading>Contact</FooterHeading>
            <address className="not-italic space-y-3 text-sm">
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#CBD5E1] hover:text-[#F97316] transition-colors">
                  <MessageSquare size={16} aria-hidden="true" className="text-[#F97316]" /> WhatsApp {settings.phone}
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-[#CBD5E1] hover:text-[#F97316] transition-colors break-all">
                  <Mail size={16} aria-hidden="true" className="text-[#F97316] shrink-0" /> {settings.email}
                </a>
              )}
              {settings.locality && (
                <a href={mapUrl(settings)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#CBD5E1] hover:text-[#F97316] transition-colors">
                  <MapPin size={16} aria-hidden="true" className="text-[#F97316]" /> {locationDisplay(settings)}
                </a>
              )}
            </address>
            {settings.socialLinks?.length > 0 && (
              <ul className="flex gap-3 mt-6">
                {settings.socialLinks.map((link) => {
                  const SocialIcon = socialIcons[link.name] || Globe;
                  return (
                    <li key={link.url}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`RJ TechForce on ${link.name}`} className="w-10 h-10 rounded-full border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] flex items-center justify-center text-white/70 hover:text-[#F97316] hover:border-[#F97316] transition-colors">
                        <SocialIcon size={18} aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-sm text-[#94A3B8]">
          <p>© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            <li><Link to="/privacy-policy" className="hover:text-[#F97316] transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-[#F97316] transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#F97316] text-white flex items-center justify-center shadow-lg hover:bg-[#EA580C] transition-colors"
          >
            <ArrowUp size={22} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
