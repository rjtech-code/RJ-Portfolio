import React from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Code,
  Layers,
  Palette,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Globe,
  Smartphone
} from "lucide-react";

const services = [
  {
    title: "Website Development",
    seoTitle: "Professional Business Website Development",
    description: "Build fast, responsive, and modern business websites optimized for performance, SEO, and user experience. We create professional websites that establish a strong online presence for your brand.",
    icon: <Monitor size={24} />,
    technologies: ["React", "Tailwind CSS", "Next.js"],
    keywords: "website development, business website, professional website, responsive website",
    stagger: "lg:translate-y-0"
  },
  {
    title: "Web Application Development",
    seoTitle: "Custom Web Application Development",
    description: "Develop custom web applications tailored to your business workflows. Our full-stack development expertise delivers scalable, secure, and feature-rich digital tools that drive efficiency.",
    icon: <Code size={24} />,
    technologies: ["React", "Node.js", "MongoDB"],
    keywords: "web application development, custom web app, full stack development",
    stagger: "lg:translate-y-12"
  },
  {
    title: "SaaS Platform Development",
    seoTitle: "Scalable SaaS Platform Development",
    description: "Create scalable Software-as-a-Service platforms with secure multi-tenant architecture, subscription management, and modern user interfaces designed for enterprise-level growth.",
    icon: <Layers size={24} />,
    technologies: ["React", "Express", "Cloud Services"],
    keywords: "SaaS development, software as a service, cloud platform",
    stagger: "lg:translate-y-0"
  },
  {
    title: "UI/UX Design",
    seoTitle: "Professional UI/UX Design Services",
    description: "Design intuitive user experiences and modern interfaces that boost engagement and usability. Our UI/UX designers create user-centered designs backed by research and best practices.",
    icon: <Palette size={24} />,
    technologies: ["Figma", "Wireframing", "Prototyping"],
    keywords: "UI UX design, user interface design, user experience, web design",
    stagger: "lg:translate-y-0"
  },
  {
    title: "E-Commerce Solutions",
    seoTitle: "Custom E-Commerce Website Development",
    description: "Develop secure, conversion-focused online stores with seamless checkout, payment gateway integrations, inventory management, and exceptional customer shopping experiences.",
    icon: <ShoppingCart size={24} />,
    technologies: ["React", "Payment Integrations"],
    keywords: "e-commerce development, online store, shopping website",
    stagger: "lg:translate-y-12"
  },
  {
    title: "Maintenance & Support",
    seoTitle: "Website Maintenance & Technical Support",
    description: "Keep your digital products running at peak performance with ongoing updates, security monitoring, speed optimization, bug fixes, and proactive technical support services.",
    icon: <ShieldCheck size={24} />,
    technologies: ["Monitoring", "Deployment"],
    keywords: "website maintenance, technical support, web hosting",
    stagger: "lg:translate-y-0"
  }
];

const capabilities = [
  { label: "Frontend Development", icon: <Monitor size={14} /> },
  { label: "Backend Development", icon: <Code size={14} /> },
  { label: "API Integration", icon: <Zap size={14} /> },
  { label: "Responsive Design", icon: <Smartphone size={14} /> },
  { label: "Database Management", icon: <Layers size={14} /> },
  { label: "Cloud Deployment", icon: <Globe size={14} /> }
];

const ServiceCard = ({ service, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group ${service.stagger}`}
      aria-label={service.seoTitle}
    >
      <div className="h-full bg-[#0F172A] border border-white/10 rounded-2xl p-8 transition-all duration-500 group-hover:border-[#F97316]/50 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-0 h-1 bg-[#F97316] transition-all duration-500 group-hover:w-full" />

        <div className="flex flex-col h-full">
          <div
            className="w-12 h-12 rounded-lg bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#F97316]/20"
            aria-hidden="true"
          >
            {service.icon}
          </div>

          <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
            {service.title}
          </h3>

          <p className="text-[#CBD5E1] text-sm leading-relaxed mb-6 flex-grow">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2" aria-label="Technologies used">
            {service.technologies.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 transition-colors duration-300 group-hover:text-[#F97316] group-hover:border-[#F97316]/30 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.2)]"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -right-2 top-1/2 w-4 h-4 rounded-full border-2 border-[#F97316]/30 bg-[#020617] z-20 hidden lg:block group-hover:border-[#F97316] transition-colors" aria-hidden="true" />
    </motion.article>
  );
};

const Services = () => {
  return (
    <section
      id="services"
      className="relative py-24 bg-[#020617] overflow-hidden"
      aria-label="RJ TechForce Web Development Services"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 200 Q 400 150 800 400 T 1600 300" fill="none" stroke="#F97316" strokeWidth="0.5" />
          <path d="M -200 600 Q 500 800 1200 500" fill="none" stroke="#3B82F6" strokeWidth="0.5" />
          <circle cx="20%" cy="30%" r="2" fill="#F97316" />
          <circle cx="80%" cy="70%" r="2" fill="#F97316" />
        </svg>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F97316]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- HEADER --- */}
        <header className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316] text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" aria-hidden="true" />
            Web Development Services
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6"
          >
            Professional Web Development <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-orange-400">
              Services That Deliver Results
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#CBD5E1] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            RJ TechForce combines modern technologies, clean architecture, and user-focused design
            to build scalable websites, web applications, and digital products for businesses,
            startups, and organizations across India.
          </motion.p>
        </header>

        {/* --- SERVICE CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-0 mb-32 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-0 hidden lg:block" aria-hidden="true" />
          <div className="absolute top-0 left-1/3 w-[1px] h-full bg-white/5 -z-0 hidden lg:block" aria-hidden="true" />
          <div className="absolute top-0 left-2/3 w-[1px] h-full bg-white/5 -z-0 hidden lg:block" aria-hidden="true" />

          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* --- SEO-RICH CONTENT BLOCK --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 p-8 bg-white/[0.02] border border-white/10 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
            Why Choose RJ TechForce for Web Development?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#CBD5E1] text-sm leading-relaxed">
            <div>
              <h4 className="text-white font-semibold mb-2">Expert React & JavaScript Development</h4>
              <p>
                Our team specializes in React.js, JavaScript, Node.js, and modern frontend frameworks.
                We build performant, scalable web applications using the latest industry standards
                and best practices in software engineering.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Business-Focused Website Design</h4>
              <p>
                Every website we develop is designed to convert visitors into customers.
                From responsive layouts optimized for mobile to SEO-friendly architecture —
                we build websites that help businesses grow their online presence.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Full-Stack Development Capability</h4>
              <p>
                From frontend UI/UX design to backend APIs, database architecture, and cloud
                deployment — RJ TechForce provides complete full-stack web development services
                for businesses of all sizes.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Custom Digital Solutions</h4>
              <p>
                We don't use templates. Every project is custom-built to your specific requirements,
                ensuring your website or web application is unique, fast, and perfectly aligned
                with your business goals.
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- CAPABILITIES BAR --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#F97316]/5 blur-3xl rounded-full" aria-hidden="true" />
          <div className="relative bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl px-8 py-6 overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#F97316]/10 to-transparent skew-x-12"
              aria-hidden="true"
            />

            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6" role="list" aria-label="Technical capabilities">
              {capabilities.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="flex items-center gap-3 group cursor-default"
                  role="listitem"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] transition-colors group-hover:bg-[#F97316]" aria-hidden="true">
                    <CheckCircle2 size={14} className="group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-white/70 text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
