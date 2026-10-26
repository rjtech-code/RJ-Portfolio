import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring as useFramerSpring,
} from "framer-motion";
import {
  Monitor,
  Code,
  ArrowRight,
  Server,
  Palette,
  Cloud,
  CheckCircle,
  Layout,
  BarChart3,
  ShoppingCart,
  Layers,
  Activity,
  Database,
} from "lucide-react";

const scenes = [
  {
    type: "text",
    title: "Building Modern",
    highlight: "Websites",
    sub: "Performance-focused digital experiences",
  },
  { type: "mockup", kind: "website" },
  {
    type: "text",
    title: "Creating Powerful",
    highlight: "Web Applications",
    sub: "Scalable software for complex needs",
  },
  { type: "mockup", kind: "dashboard" },
  {
    type: "text",
    title: "Engineering Digital",
    highlight: "Solutions",
    sub: "Custom SaaS and enterprise architecture",
  },
  { type: "mockup", kind: "ecommerce" },
  { type: "branding", title: "RJ TechForce", sub: "From Idea to Deployment" },
];

const statusItems = [
  "Websites",
  "Web Applications",
  "SaaS Platforms",
  "Dashboards",
  "E-Commerce Solutions",
];

const techCards = [
  {
    name: "JavaScript",
    icon: <Code size={14} />,
    pos: "top-[5%] left-[-15%]",
    factor: 20,
  },
  {
    name: "Python",
    icon: <Server size={14} />,
    pos: "top-[5%] right-[-15%]",
    factor: 25,
  },
  {
    name: "React.js",
    icon: <Palette size={14} />,
    pos: "top-[45%] left-[-22%]",
    factor: 30,
  },
  {
    name: "NumPy",
    icon: <Layers size={14} />,
    pos: "top-[45%] right-[-22%]",
    factor: 15,
  },
  {
    name: "Node.js",
    icon: <Database size={14} />,
    pos: "bottom-[5%] left-[-15%]",
    factor: 35,
  },
  {
    name: "Sql",
    icon: <Cloud size={14} />,
    pos: "bottom-[5%] right-[-15%]",
    factor: 22,
  },
];

// --- Mockup Components ---

const WebsiteMockup = () => (
  <div className="w-full h-full bg-[#0F172A] p-3 flex flex-col gap-2 rounded-lg border border-white/5 shadow-inner">
    <div className="w-full h-4 bg-white/5 rounded flex items-center px-2 gap-1">
      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
      <div className="ml-auto flex gap-2">
        <div className="w-8 h-1 bg-white/10 rounded-full" />
        <div className="w-8 h-1 bg-white/10 rounded-full" />
      </div>
    </div>
    <div className="flex-1 flex flex-col gap-3 pt-2">
      <div className="w-2/3 h-6 bg-gradient-to-r from-[#F97316]/20 to-transparent rounded" />
      <div className="w-full h-24 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center">
        <Layout className="text-white/10" size={32} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 bg-white/5 rounded border border-white/5 flex flex-col p-1 gap-1"
          >
            <div className="w-1/2 h-1.5 bg-[#F97316]/30 rounded" />
            <div className="w-full h-1 bg-white/5 rounded" />
            <div className="w-3/4 h-1 bg-white/5 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DashboardMockup = () => (
  <div className="w-full h-full bg-[var(--rj-navy-950)] p-3 flex gap-3 rounded-lg">
    <div className="w-12 h-full bg-white/5 rounded-md flex flex-col items-center py-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-6 h-6 rounded bg-white/5" />
      ))}
    </div>
    <div className="flex-1 flex flex-col gap-3">
      <div className="h-4 w-full bg-white/5 rounded flex items-center px-3 justify-between">
        <div className="w-20 h-1.5 bg-white/10 rounded-full" />
        <div className="w-6 h-2 bg-[#F97316]/40 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-16 bg-white/5 rounded-lg border border-white/5 p-2 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="w-8 h-1 bg-white/10 rounded" />
              <Activity size={12} className="text-[#F97316]" />
            </div>
            <div className="w-12 h-4 bg-white/10 rounded" />
          </div>
        ))}
      </div>
      <div className="flex-1 bg-white/5 rounded-lg border border-white/5 p-3 relative overflow-hidden">
        <BarChart3
          className="absolute bottom-2 right-2 text-white/5"
          size={48}
        />
        <div className="w-1/3 h-2 bg-white/10 rounded mb-4" />
        <div className="flex items-end gap-1 h-20">
          {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              className="flex-1 bg-[#F97316]/20 border-t border-[#F97316]/40 rounded-t-sm"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const EcommerceMockup = () => (
  <div className="w-full h-full bg-slate-900 p-3 flex flex-col gap-3 rounded-lg overflow-hidden">
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <div className="w-16 h-2 bg-white/10 rounded" />
      <ShoppingCart size={14} className="text-[#F97316]" />
    </div>
    <div className="grid grid-cols-2 gap-3 flex-1">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="aspect-square bg-white/5 rounded-md border border-white/5 flex items-center justify-center">
            <Layers className="text-white/5" size={20} />
          </div>
          <div className="w-3/4 h-1.5 bg-white/10 rounded" />
          <div className="w-1/2 h-1.5 bg-[#F97316]/30 rounded" />
        </div>
      ))}
    </div>
  </div>
);

const FloatingTechCard = ({ card, index, smoothX, smoothY }) => {
  const x = useTransform(smoothX, (v) => v * card.factor);
  const y = useTransform(smoothY, (v) => v * card.factor);

  return (
    <motion.div
      style={{ x, y }}
      className={`absolute z-30 hidden lg:flex items-center gap-3 p-2.5 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl ${card.pos}`}
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
        transition={{
          duration: 4,
          delay: index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 flex items-center justify-center text-[#F97316]">
          {card.icon}
        </div>
        <span className="text-white text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap">
          {card.name}
        </span>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const sectionRef = useRef(null);

  // Cursor Reactive Motion System
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Spring config for premium feel
  const springConfig = { stiffness: 40, damping: 20, restDelta: 0.001 };
  const smoothX = useFramerSpring(mouseX, springConfig);
  const smoothY = useFramerSpring(mouseY, springConfig);

  // Derived transforms for the monitor rotation
  const monitorRotateX = useTransform(smoothY, (v) => v * -10);
  const monitorRotateY = useTransform(smoothX, (v) => v * 10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % scenes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      aria-label="RJ TechForce - Professional Web Development & Digital Solutions"
      className="relative min-h-screen pt-20 flex flex-col justify-center overflow-hidden bg-[var(--rj-navy-950)]"
    >
      {/* Layer 1: Background (Subtle Parallax) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{
            x: useTransform(smoothX, (v) => v * -15),
            y: useTransform(smoothY, (v) => v * -15),
          }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#F97316]/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
        </motion.div>

        {/* Technical Grid */}
        <svg
          className="absolute w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="main-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#main-grid)" />
        </svg>

        {/* Abstract Architectural Lines */}
        <motion.div
          style={{
            x: useTransform(smoothX, (v) => v * -30),
            y: useTransform(smoothY, (v) => v * -30),
          }}
          className="absolute inset-0 flex items-center justify-center opacity-10"
        >
          <div className="w-[120%] h-[120%] border border-[#F97316]/20 rounded-full rotate-12 scale-110" />
          <div className="w-[110%] h-[110%] border border-blue-500/20 rounded-full -rotate-6" />
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE: Content */}
          {/* No initial opacity: the H1 must be readable before/without JavaScript (LCP) */}
          <motion.div
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-widest mb-6 md:mb-10">
              <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" aria-hidden="true" />
              RJ TechForce • Professional Web Development
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-6 md:mb-10">
              Professional Web <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#F97316]">
                Development
              </span>
            </h1>

            <p className="text-[#94A3B8] text-lg max-w-xl leading-relaxed mb-10 md:mb-16">
              RJ TechForce builds modern websites, web applications, and custom digital solutions
              for businesses. From React development and UI/UX design to full-stack web apps —
              we transform ideas into high-performance digital products.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-[#F97316] text-white px-8 py-4 rounded-lg text-sm font-bold shadow-lg shadow-[#F97316]/25 transition-all hover:bg-[#EA580C] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start Your Project <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center border border-[var(--rj-panel-border)] bg-white/[0.02] text-white px-8 py-4 rounded-lg text-sm font-bold transition-all hover:border-[#F97316]/60 hover:text-[#F97316] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Workstation Centerpiece */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Ambient Workstation Glow */}
            <div className="absolute w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />

            {/* Parallax Container */}
            <motion.div
              style={{
                rotateY: monitorRotateY,
                rotateX: monitorRotateX,
                perspective: "1200px",
              }}
              className="relative w-full max-w-[650px] aspect-[16/10] transition-transform duration-200 ease-out"
            >
              {/* Monitor Main Body */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 rounded-2xl p-1 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
                {/* Thin Bezel Internal Frame */}
                <div className="w-full h-full bg-black rounded-[14px] overflow-hidden relative border border-white/5 shadow-2xl">
                  {/* Screen Reflections */}
                  <div className="absolute inset-0 pointer-events-none z-20 opacity-30 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />

                  {/* Scene Content */}
                  <div className="absolute inset-0 z-10 p-6 flex flex-col justify-center items-center">
                    <AnimatePresence mode="wait">
                      {scenes[sceneIndex].type === "text" && (
                        <motion.div
                          key={`text-${sceneIndex}`}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="text-center"
                        >
                          <p className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            {scenes[sceneIndex].title} <br />
                            <span className="text-[#F97316]">
                              {scenes[sceneIndex].highlight}
                            </span>
                          </p>
                          <p className="text-white/40 font-mono text-sm uppercase tracking-[0.2em]">
                            {scenes[sceneIndex].sub}
                          </p>
                        </motion.div>
                      )}

                      {scenes[sceneIndex].type === "mockup" && (
                        <motion.div
                          key={`mock-${sceneIndex}`}
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -20 }}
                          transition={{ duration: 0.7, ease: "circOut" }}
                          className="w-full h-full"
                        >
                          {scenes[sceneIndex].kind === "website" && (
                            <WebsiteMockup />
                          )}
                          {scenes[sceneIndex].kind === "dashboard" && (
                            <DashboardMockup />
                          )}
                          {scenes[sceneIndex].kind === "ecommerce" && (
                            <EcommerceMockup />
                          )}
                        </motion.div>
                      )}

                      {scenes[sceneIndex].type === "branding" && (
                        <motion.div
                          key="branding"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.5, ease: "circOut" }}
                          className="flex flex-col items-center gap-6"
                        >
                          <div className="w-20 h-20 bg-[#F97316] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                            <Monitor size={40} className="text-white" />
                          </div>
                          <div className="text-center">
                            <p className="text-4xl font-black text-white mb-2 tracking-[-0.02em]">
                              {scenes[sceneIndex].title}
                            </p>
                            <p className="text-white/60 text-lg italic">
                              {scenes[sceneIndex].sub}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Screen Background Grid */}
                  <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <svg
                      className="w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <pattern
                        id="screen-p"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="1" cy="1" r="0.5" fill="white" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#screen-p)" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Layer 3: Floating Technology Cards */}
              {techCards.map((card, i) => (
                <FloatingTechCard
                  key={card.name}
                  card={card}
                  index={i}
                  smoothX={smoothX}
                  smoothY={smoothY}
                />
              ))}

              {/* Layer 4: Foreground Accent Elements (Strongest Parallax) */}
              <motion.div
                style={{
                  x: useTransform(smoothX, (v) => v * 80),
                  y: useTransform(smoothY, (v) => v * 80),
                }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-[#F97316]/20 border border-[#F97316]/50 rounded-lg backdrop-blur-md z-30"
              />
              <motion.div
                style={{
                  x: useTransform(smoothX, (v) => v * -60),
                  y: useTransform(smoothY, (v) => v * -60),
                }}
                className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-full backdrop-blur-md z-30"
              />
            </motion.div>

            {/* Bottom Status Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-12 bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex flex-wrap gap-x-8 gap-y-3 justify-center items-center backdrop-blur-md"
            >
              {statusItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle
                    size={14}
                    className={`transition-all duration-500 ${
                      sceneIndex % statusItems.length === i
                        ? "text-[#F97316] scale-125"
                        : "text-white/20"
                    }`}
                  />
                  <span
                    className={`text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${
                      sceneIndex % statusItems.length === i
                        ? "text-white"
                        : "text-white/40"
                    }`}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
