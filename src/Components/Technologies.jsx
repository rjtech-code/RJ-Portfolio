import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Code2, Database, Layout, Server, Settings, Globe, 
  Cpu, Cloud, Zap, Package, GitBranch
} from 'lucide-react';

const techClusters = [
  {
    id: 'frontend',
    title: 'Frontend Ecosystem',
    icon: <Layout className="w-5 h-5" />,
    items: [
      { name: 'React.js', category: 'Framework' },
      { name: 'Next.js', category: 'Framework' },
      { name: 'JavaScript', category: 'Language' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Tailwind CSS', category: 'Styling' }
    ],
    position: 'lg:top-0 lg:left-0'
  },
  {
    id: 'backend',
    title: 'Backend & Logic',
    icon: <Server className="w-5 h-5" />,
    items: [
      { name: 'Node.js', category: 'Runtime' },
      { name: 'Express.js', category: 'Framework' },
      { name: 'REST APIs', category: 'Architecture' }
    ],
    position: 'lg:top-0 lg:right-0'
  },
  {
    id: 'database',
    title: 'Data Architecture',
    icon: <Database className="w-5 h-5" />,
    items: [
      { name: 'MongoDB', category: 'NoSQL' },
      { name: 'MySQL', category: 'SQL' }
    ],
    position: 'lg:bottom-0 lg:left-0'
  },
  {
    id: 'tools',
    title: 'Design & Engineering',
    icon: <Settings className="w-5 h-5" />,
    items: [
      { name: 'Figma', category: 'UI/UX' },
      { name: 'Git & GitHub', category: 'Version Control' },
      { name: 'VS Code', category: 'Environment' }
    ],
    position: 'lg:bottom-0 lg:right-0'
  }
];

const stats = [
  { label: 'Technologies Used', value: '15+', icon: <Cpu size={16} /> },
  { label: 'Projects Delivered', value: '50+', icon: <Package size={16} /> },
  { label: 'Dev Tools', value: '10+', icon: <Settings size={16} /> },
  { label: 'Deployment Platforms', value: '4+', icon: <Cloud size={16} /> }
];

const TechCard = ({ name, category }) => (
  <motion.div 
    whileHover={{ y: -2, scale: 1.02 }}
    className="flex items-center gap-3 p-3 bg-[#0F172A] border border-white/5 rounded-lg group/card hover:border-[#F97316]/30 transition-colors"
  >
    <div className="w-2 h-2 rounded-full bg-[#F97316]/20 group-hover/card:bg-[#F97316] transition-colors" />
    <div>
      <div className="text-white text-sm font-bold tracking-tight">{name}</div>
      <div className="text-[#64748B] text-[10px] uppercase font-bold tracking-widest">{category}</div>
    </div>
  </motion.div>
);

const ConnectionLine = ({ direction }) => {
  const pathVariants = {
    initial: { pathLength: 0 },
    animate: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="none">
      <motion.path
        d={direction}
        stroke="url(#line-gradient)"
        strokeWidth="1"
        fill="none"
        variants={pathVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      />
      <motion.circle r="2" fill="#F97316">
        <motion.animateMotion
          dur="3s"
          repeatCount="indefinite"
          path={direction}
        />
      </motion.circle>
      <defs>
        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0" />
          <stop offset="50%" stopColor="#F97316" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const TechCluster = ({ cluster, idx, x, y }) => {
  const isLeft = cluster.id.includes('left') || idx % 2 === 0;
  const isTop = cluster.id.includes('top') || idx < 2;
  const clusterX = useTransform(x, (v) => v * (isLeft ? -1 : 1));
  const clusterY = useTransform(y, (v) => v * (isTop ? -1 : 1));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.15 }}
      style={{ x: clusterX, y: clusterY }}
      className={`relative lg:absolute ${cluster.position} w-full lg:w-72`}
    >
      <div className="bg-[#0F172A]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-[#F97316]/50 transition-colors">
        <div className="flex items-center gap-3 mb-4 text-[#F97316]">
          <div className="p-2 bg-[#F97316]/10 rounded-lg">
            {cluster.icon}
          </div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider">{cluster.title}</h3>
        </div>

        <div className="space-y-2">
          {cluster.items.map((item) => (
            <TechCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Technologies = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 40);
    mouseY.set((e.clientY - centerY) / 40);
  };

  return (
    <section 
      id="technologies" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 bg-[#020617] overflow-hidden border-b border-white/5"
    >
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 tech-grid opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316] text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            <Zap size={10} />
            Our Tech Stack
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6"
          >
            Powered By Modern Technologies
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#CBD5E1] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We leverage industry-standard technologies and modern development practices 
            to create scalable, secure, and high-performance digital solutions.
          </motion.p>
        </div>

        {/* --- ECOSYSTEM DIAGRAM --- */}
        <div className="relative lg:min-h-[680px] flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 py-10 lg:py-20">
          
          {/* Central Hub */}
          <motion.div 
            style={{ x: useTransform(x, (v) => v * 0.5), y: useTransform(y, (v) => v * 0.5) }}
            className="relative z-20 w-40 h-40 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[#F97316]/20 rounded-full blur-2xl animate-pulse" />
            <div className="w-full h-full bg-[#0F172A] border-2 border-[#F97316] rounded-2xl flex flex-col items-center justify-center p-4 text-center shadow-[0_0_40px_rgba(249,115,22,0.2)]">
              <div className="w-12 h-12 bg-[#F97316] rounded-lg flex items-center justify-center mb-2">
                <Globe className="text-white" size={24} />
              </div>
              <span className="text-[10px] font-black text-[#F97316] uppercase tracking-tighter">Core</span>
              <span className="text-white font-bold text-xs">RJ TechForce Ecosystem</span>
            </div>
          </motion.div>

          {/* Clusters */}
          {/* Below lg the clusters flow in a grid; from lg up they are positioned around the hub */}
          <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:block lg:absolute lg:inset-0 lg:h-full">
            {techClusters.map((cluster, idx) => (
              <TechCluster key={cluster.id} cluster={cluster} idx={idx} x={x} y={y} />
            ))}
          </div>
        </div>

        {/* --- STATISTICS BAR --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`flex flex-col items-center justify-center p-6 text-center ${
                  i !== stats.length - 1 ? 'md:border-r border-white/5' : ''
                }`}
              >
                <div className="text-[#F97316] mb-2 bg-[#F97316]/10 p-2 rounded-lg">
                  {stat.icon}
                </div>
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest leading-none">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- DEPLOYMENT MARQUEE (Optional extra) --- */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-2">
             <Cloud size={20} />
             <span className="text-sm font-bold uppercase tracking-widest">Vercel</span>
           </div>
           <div className="flex items-center gap-2">
             <Globe size={20} />
             <span className="text-sm font-bold uppercase tracking-widest">Netlify</span>
           </div>
           <div className="flex items-center gap-2">
             <GitBranch size={20} />
             <span className="text-sm font-bold uppercase tracking-widest">GitHub</span>
           </div>
           <div className="flex items-center gap-2">
             <Package size={20} />
             <span className="text-sm font-bold uppercase tracking-widest">Docker</span>
           </div>
        </div>
      </div>

      {/* --- DECORATIVE ARCHITECTURE LINES --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <svg className="absolute w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000">
            <motion.path 
              d="M 0 500 L 1000 500 M 500 0 L 500 1000" 
              stroke="white" 
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <circle cx="500" cy="500" r="300" stroke="white" strokeWidth="1" fill="none" />
            <circle cx="500" cy="500" r="150" stroke="white" strokeWidth="1" fill="none" />
         </svg>
      </div>
    </section>
  );
};

export default Technologies;