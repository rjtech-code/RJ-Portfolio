import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Mail,
  MapPin,
  Users,
  GitBranch,
  Camera,
  X, // Represents Twitter/X
  ArrowUp,
  Monitor,
  Code,
  Layers,
  Palette,
  ShoppingCart,
  ShieldCheck,
  CircleDot,
} from "lucide-react";

const footerNavLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Technologies", href: "#technologies" },
  { name: "Projects", href: "#projects" },
  { name: "About Us", href: "#about-us" },
  { name: "Contact", href: "#contact" },
];

const footerServices = [
  { name: "Website Development", icon: <Monitor size={16} /> },
  { name: "Web Applications", icon: <Code size={16} /> },
  { name: "SaaS Development", icon: <Layers size={16} /> },
  { name: "UI/UX Design", icon: <Palette size={16} /> },
  { name: "E-Commerce Solutions", icon: <ShoppingCart size={16} /> },
  { name: "Maintenance & Support", icon: <ShieldCheck size={16} /> },
];

const contactInfo = [
  {
    value: "+91 96643 73310",
    icon: <MessageSquare size={16} />,
    href: "https://wa.me/919664373310?text=Hello%20RJ%20TechForce,%20I%20would%20like%20to%20discuss%20a%20project.",
  },
  {
    value: "rjtechforce@gmail.com",
    icon: <Mail size={16} />,
    href: "mailto:rjtechforce@gmail.com?subject=Project%20Inquiry",
  },
  { value: "Churu, Rajasthan", icon: <MapPin size={16} />, href: "#" },
];

const socialLinks = [
  { name: "LinkedIn", icon: <Users size={20} />, href: "#" },
  { name: "GitHub", icon: <GitBranch size={20} />, href: "#" },
  { name: "Instagram", icon: <Camera size={20} />, href: "#" },
  { name: "X", icon: <X size={20} />, href: "#" },
];

const techStackBadges = [
  "React.js",
  "Tailwind CSS",
  "JavaScript",
  "Node.js",
  "MongoDB",
  "MySQL",
];

const Footer = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-[#01040D] py-16 overflow-hidden border-t border-white/5">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <path
            d="M 0 0 L 1000 0 L 1000 1000 L 0 1000 Z M 500 0 L 500 1000 M 0 500 L 1000 500"
            stroke="#F97316"
            strokeWidth="0.5"
            fill="none"
          />
          <circle cx="20%" cy="20%" r="3" fill="#F97316" />
          <circle cx="80%" cy="80%" r="3" fill="#F97316" />
        </svg>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: RJ TechForce Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#F97316] flex items-center justify-center rounded-md">
                {/* Placeholder for actual logo image */}
                <span className="text-white font-bold text-lg">RJ</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                TechForce
              </span>
            </div>
            <p className="text-[#CBD5E1] text-sm leading-relaxed mb-4">
              RJ TechForce is a software development team focused on building
              modern websites, web applications, SaaS platforms, and digital
              solutions with performance, scalability, and reliability at the
              core.
            </p>
            <div className="flex items-center gap-2 text-[#F97316] text-xs font-bold uppercase tracking-widest">
              <CircleDot className="animate-pulse" size={12} /> Available For Projects
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
            <ul className="space-y-3">
              {footerNavLinks.map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5, color: "#F97316" }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-[#CBD5E1] hover:text-[#F97316] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-lg mb-5">Our Services</h4>
            <ul className="space-y-3">
              {footerServices.map((service, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2 text-[#CBD5E1] text-sm"
                  whileHover={{ x: 5, color: "#F97316" }}
                  transition={{ duration: 0.2 }}
                >
                  {service.icon}
                  <span>{service.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-lg mb-5">Contact Us</h4>
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
                    className="hover:text-[#F97316] transition-colors"
                  >
                    {item.value}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex gap-4 mt-8">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
          className="flex flex-wrap justify-center gap-x-6 gap-y-3 py-8 border-b border-white/10"
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

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-white/50 text-xs">
          <p>© 2026 RJ TechForce. All Rights Reserved.</p>
          <div className="h-4 w-[1px] bg-[#F97316] mx-4 hidden md:block" />
          <p>Built with React.js & Tailwind CSS</p>
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
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#F97316] text-white flex items-center justify-center shadow-lg hover:bg-[#EA580C] transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;