import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { 
  Zap, 
  Award, 
  Users, 
  Rocket, 
  Cpu, 
  Database, 
  Palette, 
  Layout, 
  Server, 
  CheckCircle2, 
  Workflow, 
  Target, 
  ShieldCheck, 
  Lightbulb 
} from "lucide-react";

const milestones = [
  { year: "2021", event: "Team Formation", desc: "Core engineering group established." },
  { year: "2022", event: "First SaaS Deployment", desc: "Scalable enterprise platform launch." },
  { year: "2023", event: "Technical Expansion", desc: "Integrated AI & Cloud infrastructure." },
  { year: "Current", event: "Engineering Growth", desc: "Building global digital products." },
];

const coreValues = [
  {
    title: "Innovation",
    desc: "Building modern and future-ready digital solutions.",
    icon: <Lightbulb size={24} />,
  },
  {
    title: "Quality",
    desc: "Maintaining clean code, scalable architecture, and professional standards.",
    icon: <ShieldCheck size={24} />,
  },
  {
    title: "Reliability",
    desc: "Delivering projects with consistency, transparency, and accountability.",
    icon: <Target size={24} />,
  },
  {
    title: "Collaboration",
    desc: "Working closely with clients to transform ideas into successful products.",
    icon: <Users size={24} />,
  },
];

const workflow = [
  { stage: "Discovery", desc: "Requirements & Logic" },
  { stage: "Planning", desc: "System Architecture" },
  { stage: "Design", desc: "UI/UX Engineering" },
  { stage: "Development", desc: "Precision Coding" },
  { stage: "Testing", desc: "QA & Optimization" },
  { stage: "Deployment", desc: "Cloud Infrastructure" },
];

const stats = [
  { label: "Projects Delivered", value: 24, suffix: "+", icon: <Rocket size={18} /> },
  { label: "Technologies Used", value: 15, suffix: "+", icon: <Cpu size={18} /> },
  { label: "Development Hours", value: 4500, suffix: "+", icon: <Workflow size={18} /> },
  { label: "Client Satisfaction", value: 100, suffix: "%", icon: <Award size={18} /> },
];

const Counter = ({ value, suffix }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  useEffect(() => {
    return rounded.onChange((v) => setDisplay(v));
  }, [rounded]);

  return <span>{display}{suffix}</span>;
};

const AboutUs = () => {
  return (
    <section id="about-us" className="relative py-24 bg-[#020617] overflow-hidden">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] tech-grid" 
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
        />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#F97316]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316] text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            <Zap size={10} className="animate-pulse" />
            About RJ TechForce
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6"
          >
            Engineers Behind The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#F97316]">
              Digital Solutions
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#64748B] text-lg max-w-3xl mx-auto leading-relaxed"
          >
            RJ TechForce is a team of developers, designers, and technology enthusiasts focused on 
            building modern websites, web applications, and digital products that solve real-world problems.
          </motion.p>
        </div>

        {/* --- MAIN TWO-COLUMN CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          {/* LEFT SIDE: Intro & Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#F97316]" /> Our Mission
            </h3>
            <p className="text-[#CBD5E1] text-lg mb-10 leading-relaxed italic border-l-2 border-[#F97316] pl-6">
              "To engineer high-performance digital ecosystems through technical precision, 
              user-centric design, and scalable architecture."
            </p>

            {/* Visual Timeline */}
            <div className="space-y-8 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-white/5" />
              {milestones.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 group"
                >
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#020617] border-2 border-white/10 group-hover:border-[#F97316] transition-colors z-10" />
                  <div className="flex flex-col">
                    <span className="text-[#F97316] text-[10px] font-black uppercase tracking-widest mb-1">{item.year}</span>
                    <h4 className="text-white font-bold text-base mb-1">{item.event}</h4>
                    <p className="text-[#64748B] text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: Ecosystem Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[450px] flex items-center justify-center"
          >
            {/* Central Node */}
            <div className="relative z-20 w-32 h-32 bg-[#0F172A] border-2 border-[#F97316] rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(249,115,22,0.15)] group">
              <div className="absolute inset-0 bg-[#F97316]/10 rounded-2xl animate-pulse" />
              <Zap className="text-[#F97316] mb-2" size={24} />
              <span className="text-[10px] font-black text-white uppercase tracking-tighter">RJ TechForce</span>
            </div>

            {/* Orbiter Nodes & Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#F97316" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#F97316" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="15%" y2="60%" stroke="#F97316" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="85%" y2="60%" stroke="#F97316" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="#F97316" strokeWidth="1" />
            </svg>

            {/* Frontend */}
            <div className="absolute top-[10%] left-[15%] flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F97316] backdrop-blur-md">
                <Layout size={20} />
              </div>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Frontend</span>
            </div>

            {/* Backend */}
            <div className="absolute top-[10%] right-[15%] flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F97316] backdrop-blur-md">
                <Server size={20} />
              </div>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Backend</span>
            </div>

            {/* UI/UX */}
            <div className="absolute top-[55%] left-[5%] flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F97316] backdrop-blur-md">
                <Palette size={20} />
              </div>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">UI/UX Design</span>
            </div>

            {/* Database */}
            <div className="absolute top-[55%] right-[5%] flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F97316] backdrop-blur-md">
                <Database size={20} />
              </div>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Database</span>
            </div>

            {/* Deployment */}
            <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F97316] backdrop-blur-md">
                <Cpu size={20} />
              </div>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Deployment</span>
            </div>
          </motion.div>
        </div>

        {/* --- CORE VALUES --- */}
        <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-[#0F172A] border border-white/5 rounded-2xl group hover:border-[#F97316]/50 transition-all duration-500 shadow-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h4 className="text-white font-bold text-lg mb-3">{value.title}</h4>
                <p className="text-[#64748B] text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- WORKFLOW SHOWCASE --- */}
        <div className="mb-32">
          <h3 className="text-xl font-bold text-white mb-12 text-center flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-white/10" /> 
            Development Workflow 
            <span className="w-12 h-[1px] bg-white/10" />
          </h3>
          
          <div className="relative">
            {/* Horizontal Line (Desktop) */}
            <div className="absolute top-[26px] left-0 right-0 h-[1px] bg-white/5 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
              {workflow.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-14 h-14 rounded-full bg-[#0F172A] border border-white/10 flex items-center justify-center text-white font-black text-xs mx-auto mb-6 group-hover:border-[#F97316] group-hover:text-[#F97316] transition-all duration-300 shadow-lg">
                    0{i + 1}
                  </div>
                  <h5 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">{step.stage}</h5>
                  <p className="text-[#64748B] text-[11px] leading-tight">{step.desc}</p>
                  
                  {/* Arrow (Mobile/Tablet) */}
                  {i < workflow.length - 1 && (
                    <div className="lg:hidden mt-4 text-white/10">↓</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* --- TEAM STATS --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-1 p-1 bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md"
        >
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`p-10 flex flex-col items-center text-center group transition-colors hover:bg-white/[0.02] ${
                i !== stats.length - 1 ? "lg:border-r border-white/5" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-4 group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-1 tracking-tight">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[#64748B] text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;