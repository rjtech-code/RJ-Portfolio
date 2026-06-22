import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Mail,
  MapPin,
  Users,
  GitBranch,
  Camera,
  X,
  ArrowUp,
  Monitor,
  Code,
  Layers,
  Palette,
  ShoppingCart,
  ShieldCheck,
  CircleDot,
  Globe,
} from "lucide-react";

const footerNavLinks = [
  { name: "Home", href: "#home", label: "RJ TechForce Homepage" },
  { name: "Services", href: "#services", label: "Web Development Services" },
  { name: "Technologies", href: "#technologies", label: "Technologies We Use" },
  { name: "Portfolio", href: "#projects", label: "Web Development Portfolio" },
  { name: "About Us", href: "#about-us", label: "About RJ TechForce" },
  { name: "Blog", href: "#blog", label: "Web Development Blog & Resources" },
  { name: "Contact", href: "#contact", label: "Contact RJ TechForce" },
];

const footerServices = [
  { name: "Website Development", href: "#services", icon: <Monitor size={16} aria-hidden="true" /> },
  { name: "Web Applications", href: "#services", icon: <Code size={16} aria-hidden="true" /> },
  { name: "SaaS Development", href: "#services", icon: <Layers size={16} aria-hidden="true" /> },
  { name: "UI/UX Design", href: "#services", icon: <Palette size={16} aria-hidden="true" /> },
  { name: "E-Commerce Solutions", href: "#services", icon: <ShoppingCart size={16} aria-hidden="true" /> },
  { name: "Maintenance & Support", href: "#services", icon: <ShieldCheck size={16} aria-hidden="true" /> },
];

const contactInfo = [
  {
    value: "+91 96643 73310",
    label: "WhatsApp RJ TechForce",
    icon: <MessageSquare size={16} aria-hidden="true" />,
    href: "https://wa.me/919664373310?text=Hello%20RJ%20TechForce,%20I%20would%20like%20to%20discuss%20a%20project.",
    itemprop: "telephone",
  },
  {
    value: "rjtechforce@gmail.com",
    label: "Email RJ TechForce",
    icon: <Mail size={16} aria-hidden="true" />,
    href: "mailto:rjtechforce@gmail.com?subject=Project%20Inquiry",
    itemprop: "email",
  },
  {
    value: "Churu, Rajasthan, India",
    label: "RJ TechForce Location",
    icon: <MapPin size={16} aria-hidden="true" />,
    href: "https://maps.google.com/?q=Churu,Rajasthan,India",
    itemprop: "address",
  },
];

const socialLinks = [
  { name: "LinkedIn", icon: <Users size={20} aria-hidden="true" />, href: "https://www.linkedin.com/company/rjtechforce" },
  { name: "GitHub", icon: <GitBranch size={20} aria-hidden="true" />, href: "https://github.com/rjtechforce" },
  { name: "Instagram", icon: <Camera size={20} aria-hidden="true" />, href: "https://www.instagram.com/rjtechforce" },
  { name: "Twitter / X", icon: <X size={20} aria-hidden="true" />, href: "https://twitter.com/rjtechforce" },
  { name: "Website", icon: <Globe size={20} aria-hidden="true" />, href: "https://rjtechforce.com" },
];

const techStackBadges = [
  "React.js", "Tailwind CSS", "JavaScript", "Node.js", "MongoDB", "MySQL", "Next.js", "TypeScript"
];

const Footer = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative bg-[#01040D] py-16 overflow-hidden border-t border-white/5"
      itemScope
      itemType="https://schema.org/WPFooter"
      aria-label="RJ TechForce site footer"
    >
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <path d="M 0 0 L 1000 0 L 1000 1000 L 0 1000 Z M 500 0 L 500 1000 M 0 500 L 1000 500" stroke="#F97316" strokeWidth="0.5" fill="none" />
          <circle cx="20%" cy="20%" r="3" fill="#F97316" />
          <circle cx="80%" cy="80%" r="3" fill="#F97316" />
        </svg>
        <div className="absolute top-0 left-0 w-100 h-100 bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <meta itemProp="name" content="RJ TechForce" />
        <meta itemProp="url" content="https://rjtechforce.com" />
        <meta itemProp="email" content="rjtechforce@gmail.com" />
        <meta itemProp="telephone" content="+91-96643-73310" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: RJ TechForce Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <a href="#home" aria-label="RJ TechForce - Go to homepage">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#F97316] flex items-center justify-center rounded-md">
                  <span className="text-white font-bold text-lg" aria-hidden="true">RJ</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white" itemProp="name">
                  TechForce
                </span>
              </div>
            </a>
            <p className="text-[#CBD5E1] text-sm leading-relaxed mb-4" itemProp="description">
              RJ TechForce is a professional web development team based in Rajasthan, India,
              specializing in modern websites, web applications, React development, UI/UX design,
              and custom digital solutions that help businesses grow online.
            </p>
            <div className="flex items-center gap-2 text-[#F97316] text-xs font-bold uppercase tracking-widest">
              <CircleDot className="animate-pulse" size={12} aria-hidden="true" />
              Available For Projects
            </div>
          </motion.div>

          {/* Column 2: Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-lg mb-5">Quick Navigation</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {footerNavLinks.map((link, i) => (
                  <motion.li key={i} whileHover={{ x: 5, color: "#F97316" }} transition={{ duration: 0.2 }}>
                    <a
                      href={link.href}
                      aria-label={link.label}
                      className="text-[#CBD5E1] hover:text-[#F97316] transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-lg mb-5">Our Services</h4>
            <nav aria-label="Services navigation">
              <ul className="space-y-3">
                {footerServices.map((service, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 text-[#CBD5E1] text-sm"
                    whileHover={{ x: 5, color: "#F97316" }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.icon}
                    <a
                      href={service.href}
                      className="hover:text-[#F97316] transition-colors"
                      aria-label={`RJ TechForce ${service.name}`}
                    >
                      {service.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-lg mb-5">Contact RJ TechForce</h4>
            <address className="not-italic">
              <ul className="space-y-3">
                {contactInfo.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 text-[#CBD5E1] text-sm"
                    whileHover={{ x: 5, color: "#F97316" }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="hover:text-[#F97316] transition-colors"
                      itemProp={item.itemprop}
                    >
                      {item.value}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </address>

            <div className="flex gap-3 mt-8 flex-wrap">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`RJ TechForce on ${social.name}`}
                  className="w-10 h-10 rounded-full bg-[#0F172A] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#F97316] hover:border-[#F97316] transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-x-4 gap-y-3 py-8 border-b border-white/10"
          aria-label="Technologies used by RJ TechForce"
        >
          {techStackBadges.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold uppercase rounded-md tracking-wider"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* SEO Internal Links */}
        <div className="py-6 border-b border-white/5">
          <nav aria-label="SEO site links" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { label: "Web Development Services", href: "#services" },
              { label: "React Development", href: "#services" },
              { label: "UI/UX Design", href: "#services" },
              { label: "Portfolio", href: "#projects" },
              { label: "Web Development Blog", href: "#blog" },
              { label: "About RJ TechForce", href: "#about-us" },
              { label: "Contact Us", href: "#contact" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-[#64748B] hover:text-[#F97316] text-[11px] transition-colors"
                aria-label={link.label}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-white/50 text-xs gap-4">
          <p>© 2026 <span itemProp="name">RJ TechForce</span>. All Rights Reserved.</p>
          <p className="text-center">
            Professional Web Development &amp; Digital Solutions |{" "}
            <a href="#contact" className="hover:text-[#F97316] transition-colors">Get a Free Quote</a>
          </p>
          <p>Built with React.js &amp; Tailwind CSS</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#F97316] text-white flex items-center justify-center shadow-lg hover:bg-[#EA580C] transition-colors"
          >
            <ArrowUp size={24} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
