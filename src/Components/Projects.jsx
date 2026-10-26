import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Globe, 
  Database, 
  ShoppingCart, 
  Layout as LayoutIcon, 
  UserCheck,
  Cpu,
  Clock,
  X
} from "lucide-react";

const categories = ["All Projects", "Websites", "Web Applications", "SaaS Platforms", "Dashboards", "E-Commerce"];

const projects = [
  {
    id: 1,
    title: "Face Recognition Attendance System",
    slug: "face-recognition-attendance-system",
    category: "Web Applications",
    description: "Automated attendance management using facial recognition technology and real-time reporting.",
    longDescription: "An enterprise-grade attendance tracking system leveraging advanced facial recognition algorithms to automate workforce management. It processes video streams in real-time to identify employees and log their entries with high precision.",
    technologies: ["React.js", "Node.js", "MySQL", "OpenCV APIs"],
    highlights: ["Real-time attendance tracking", "Secure JWT authentication", "Admin management dashboard", "Automated CSV reporting"],
    challenges: "Handling real-time image processing in the browser and ensuring low-latency communication with the backend for instant feedback.",
    devType: "Full Stack",
    status: "Production Ready",
    label: "Featured",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800",
    imageAlt: "RJ TechForce - Face Recognition Attendance System Web Application built with React.js and Node.js",
  },
  {
    id: 2,
    title: "Smart Inventory Dashboard",
    slug: "smart-inventory-dashboard",
    category: "Dashboards",
    description: "Real-time inventory tracking with predictive analytics for retail supply chains.",
    longDescription: "A comprehensive dashboard for retail businesses to monitor stock levels, predict demand using historical data, and manage supplier relationships automatically.",
    technologies: ["React", "Redux", "Chart.js", "MongoDB"],
    highlights: ["Demand forecasting", "Supplier automated alerts", "Multi-warehouse support"],
    challenges: "Visualizing high-density data sets without compromising on dashboard performance or user experience.",
    devType: "Frontend Heavy",
    status: "Completed",
    label: "Latest",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    imageAlt: "RJ TechForce - Smart Inventory Dashboard with real-time analytics built with React and Chart.js",
  },
  {
    id: 3,
    title: "Global Link Corporate",
    slug: "global-link-corporate-website",
    category: "Websites",
    description: "Multi-language high-performance website for an international logistics firm.",
    longDescription: "A high-performance corporate website focusing on scalability, accessibility, and international SEO. Built to handle millions of monthly visitors with lightning-fast load times.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    highlights: ["i18n Support", "98+ Lighthouse Score", "Lead Generation Pipeline"],
    challenges: "Implementing a robust multi-language system while maintaining complex SEO requirements across regions.",
    devType: "Performance Web",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    imageAlt: "RJ TechForce - Global Link Corporate Website - high-performance business website with Next.js",
  },
  {
    id: 4,
    title: "Vortex E-Commerce",
    slug: "vortex-ecommerce-platform",
    category: "E-Commerce",
    description: "Premium clothing store with integrated payment gateways and custom product builder.",
    longDescription: "A feature-rich online store with integrated payment gateways, real-time inventory sync, and a custom 3D product visualizer for personalized customer experiences.",
    technologies: ["React", "Node.js", "Stripe API", "Three.js"],
    highlights: ["3D Product Configurator", "One-click Checkout", "Automated Invoicing"],
    challenges: "Integrating Three.js with the React state management for a seamless 3D product customization experience.",
    devType: "Full Stack",
    status: "Completed",
    label: "Popular",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
    imageAlt: "RJ TechForce - Vortex E-Commerce website with Stripe payment integration and 3D product configurator",
  },
  {
    id: 5,
    title: "CloudFlow SaaS",
    slug: "cloudflow-saas-platform",
    category: "SaaS Platforms",
    description: "Project management tool for distributed engineering teams.",
    longDescription: "A scalable Software-as-a-Service platform built for complex business workflows, focusing on task automation and real-time collaboration between remote teams.",
    technologies: ["Node.js", "Express", "MongoDB", "Socket.io"],
    highlights: ["Real-time collaboration", "Workflow Automation", "Enterprise Security"],
    challenges: "Scaling real-time socket connections for thousands of concurrent users while ensuring data consistency.",
    devType: "SaaS Dev",
    status: "Beta Testing",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
    imageAlt: "RJ TechForce - CloudFlow SaaS project management platform with real-time collaboration features",
  },
  {
    id: 6,
    title: "HealthTrack App",
    slug: "healthtrack-medical-app",
    category: "Web Applications",
    description: "Patient management system for private clinics with secure video consultations.",
    longDescription: "A secure medical platform allowing clinics to manage patient records, schedule appointments, and conduct encrypted video consultations directly in the browser.",
    technologies: ["React", "Firebase", "WebRTC", "Tailwind"],
    highlights: ["HIPAA Compliant Data", "Video Consultation", "Prescription Generator"],
    challenges: "Implementing end-to-end encrypted video streaming using WebRTC for medical privacy compliance.",
    devType: "Full Stack",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1504868584819-f8e90526354c?auto=format&fit=crop&q=80&w=800",
    imageAlt: "RJ TechForce - HealthTrack medical web application with patient management and video consultation",
  },
  {
    id: 7,
    title: "CryptoPulse Analytics",
    slug: "cryptopulse-analytics-dashboard",
    category: "Dashboards",
    description: "Real-time cryptocurrency market tracker with custom alert systems.",
    longDescription: "Advanced analytics platform for crypto traders, providing live pricing, social sentiment analysis, and customizable trading signal alerts.",
    technologies: ["React", "REST API", "WebSocket", "Tailwind"],
    highlights: ["Live Price Feeds", "Sentiment Analysis", "User Alert Hub"],
    challenges: "Handling massive streams of real-time market data without affecting browser performance.",
    devType: "Frontend",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800",
    imageAlt: "RJ TechForce - CryptoPulse analytics dashboard with real-time market data and WebSocket integration",
  },
  {
    id: 8,
    title: "Eco-Home Automation",
    slug: "eco-home-automation-web-app",
    category: "Web Applications",
    description: "Centralized control hub for smart home devices with energy monitoring.",
    longDescription: "An intuitive web application that allows homeowners to monitor and control IoT devices while providing detailed reports on energy consumption patterns.",
    technologies: ["React", "Node.js", "MQTT", "PostgreSQL"],
    highlights: ["IoT Integration", "Energy Consumption Charts", "Custom Scene Builder"],
    challenges: "Bridging the gap between MQTT device protocols and a standard web interface for real-time control.",
    devType: "Full Stack / IoT",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    imageAlt: "RJ TechForce - Eco-Home Automation web application with IoT device control and energy monitoring",
  },
];

const ProjectCard = ({ project, index, onOpenDetail }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="relative group bg-[#0F172A] border border-white/5 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-[#F97316]/50 flex flex-col h-full"
      aria-label={`${project.title} - Web Development Project by RJ TechForce`}
    >
      {/* Top Area: Image */}
      <div className="aspect-video overflow-hidden relative">
        {/* Illustrative stock photo, not a screenshot of the project: decorative */}
        <img
          src={project.image}
          alt=""
          loading="lazy"
          width="800"
          height="450"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-60" />
        
        {project.label && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[#F97316] text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-lg">
              {project.label}
            </span>
          </div>)}
      </div>
      
      {/* Middle Area: Content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="text-[#F97316] text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          <Terminal size={12} /> {project.category}
        </div>
        <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#F97316] transition-colors leading-tight">{project.title}</h3>
        <p className="text-[#CBD5E1] text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">{project.description}</p>
        
        {/* Technology Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 text-[9px] font-bold uppercase rounded transition-colors group-hover:border-[#F97316]/30 group-hover:text-[#F97316]">
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom Area: Metadata & Actions */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">Status</span>
            <span className="text-white/80 text-[11px] font-bold">{project.status}</span>
          </div>
          <div className="flex gap-2">
             <button
               onClick={() => onOpenDetail(project)}
               className="p-2 bg-white/5 hover:bg-[#F97316]/10 text-white/40 hover:text-[#F97316] rounded-lg transition-colors"
               title="View Project"
               aria-label={`View ${project.title} details`}
             >
               <ExternalLink size={16} aria-hidden="true" />
             </button>
             <button 
              onClick={() => onOpenDetail(project)}
              className="px-4 py-2 bg-[#F97316] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#EA580C] transition-all flex items-center gap-2 shadow-lg shadow-[#F97316]/20"
            >
               Details <ArrowRight size={14} />
             </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 py-10"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl max-h-full bg-[#0F172A] border border-white/10 rounded-3xl overflow-y-auto shadow-2xl scrollbar-hide"
      >
        <button onClick={onClose} aria-label="Close project details" className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-[#F97316] text-white rounded-full transition-colors">
          <X size={20} />
        </button>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
             <img
               src={project.image}
               alt=""
               loading="lazy"
               className="w-full h-full object-cover min-h-[300px]"
             />
          </div>
          <div className="lg:w-1/2 p-8 sm:p-12">
            <div className="flex items-center gap-2 text-[#F97316] text-xs font-black uppercase tracking-[0.2em] mb-4">
              <Terminal size={14} /> Case Study • {project.category}
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tighter">{project.title}</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-bold text-xs uppercase mb-3 flex items-center gap-2 tracking-normal!">
                  <LayoutIcon size={12} className="text-[#F97316]" /> Project Overview
                </h3>
                <p className="text-[#CBD5E1] text-sm leading-relaxed">{project.longDescription}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                   <h3 className="text-white font-bold text-xs uppercase mb-3 flex items-center gap-2 tracking-normal!">
                    <CheckCircle2 size={12} className="text-[#F97316]" /> Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights?.map((h, i) => (
                      <li key={i} className="text-[#CBD5E1] text-[11px] flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#F97316] mt-1.5 flex-shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xs uppercase mb-3 flex items-center gap-2 tracking-normal!">
                    <Cpu size={12} className="text-[#F97316]" /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/70 text-[9px] font-bold uppercase rounded">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {project.challenges && (
                <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                  <h3 className="text-white font-bold text-[10px] uppercase mb-2 text-[#F97316] tracking-normal!">The Challenge</h3>
                  <p className="text-[#CBD5E1] text-xs italic">"{project.challenges}"</p>
                </div>
              )}
            </div>

            <div className="mt-10 flex gap-4">
              <button className="flex-1 px-6 py-4 bg-[#F97316] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#EA580C] transition-all shadow-lg shadow-[#F97316]/20">
                Launch Project
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const stats = [
  { label: "Projects Delivered", value: "24+", icon: <CheckCircle2 size={16} /> },
  { label: "Technologies Utilized", value: "18+", icon: <Cpu size={16} /> },
  { label: "Client Requirements Met", value: "100%", icon: <UserCheck size={16} /> },
  { label: "Dev Hours Invested", value: "4500+", icon: <Clock size={16} /> }
];

const Projects = () => {
  const [filter, setFilter] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(p => 
    filter === "All Projects" || p.category === filter
  );

  return (
    <section id="projects" className="relative py-24 bg-[#020617] overflow-hidden" aria-label="RJ TechForce Web Development Portfolio">
      {/* --- BACKGROUND DECORATIONS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] tech-grid" 
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
        />
        {/* Architecture Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 100 L 1000 100 M 500 0 L 500 1000" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="500" cy="100" r="4" fill="#F97316" />
          <circle cx="500" cy="500" r="150" stroke="#F97316" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316] text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
            Our Work
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6"
          >
            Web Development Portfolio — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#F97316]">
              Real Projects, Real Results
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#64748B] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Explore our portfolio of websites, web applications, SaaS platforms, and dashboards —
            each built with modern technologies, clean architecture, and exceptional user experiences.
          </motion.p>
        </div>

        {/* --- FILTER SYSTEM --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 border ${
                filter === cat 
                  ? "bg-[#F97316] border-[#F97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]" 
                  : "bg-[#0F172A] border-white/5 text-white/50 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- PROJECTS SHOWCASE --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onOpenDetail={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* --- STATISTICS BAR --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 relative"
        >
          <div className="absolute inset-0 bg-[#F97316]/5 blur-3xl rounded-full" />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-0 bg-[#0F172A] border border-white/10 rounded-3xl overflow-hidden">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`p-8 flex flex-col items-center text-center group border-white/5 ${
                  i < 3 ? "lg:border-r" : ""
                } ${i % 2 === 0 ? "border-r md:border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""}`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-4 transition-transform group-hover:scale-110">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
                <div className="text-[#64748B] text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- FINAL CTA --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center"
        >
          <p className="text-white/40 text-sm font-mono mb-6 uppercase tracking-widest">Ready to build your next big idea?</p>
          <button className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-xl font-black uppercase text-xs tracking-tighter transition-all hover:pr-12">
            Start a Conversation
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      {/* --- DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;