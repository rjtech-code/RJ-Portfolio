import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Send, 
  Loader2, 
  CheckCircle,
  Phone,
  Calendar
} from "lucide-react";

const contactMethods = [
  {
    title: "WhatsApp Us",
    value: "+91 96643 73310",
    icon: <MessageSquare size={20} />,
    href: "https://wa.me/919664373310",
    desc: "Instant chat for quick inquiries"
  },
  {
    title: "Email Support",
    value: "contact@rjtechforce.com",
    icon: <Mail size={20} />,
    href: "mailto:contact@rjtechforce.com?subject=Project Inquiry",
    desc: "Detailed project requirements"
  },
  {
    title: "Our Location",
    value: "Surat, Gujarat",
    icon: <MapPin size={20} />,
    href: "#",
    desc: "Technical HQ"
  },
  {
    title: "Business Hours",
    value: "Mon - Sat: 9AM - 7PM",
    icon: <Clock size={20} />,
    href: null,
    desc: "Global Availability"
  }
];

const projectTypes = [
  "Business Website",
  "Web Application",
  "SaaS Platform",
  "E-Commerce",
  "UI/UX Design",
  "Other"
];

const Contact = () => {
  const [formState, setFormState] = useState("idle"); // idle, loading, success, error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Business Website",
    details: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState("loading");

    // Backend Integration
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed");

      setFormState("success");
      setFormData({ name: "", email: "", phone: "", projectType: "Business Website", details: "" });
      setTimeout(() => setFormState("idle"), 3000);
    } catch (err) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#020617] overflow-hidden border-t border-white/5">
      {/* --- TECHNICAL BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] tech-grid" 
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
        />
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
            d="M 0 100 Q 250 50 500 100 T 1000 100" 
            fill="none" stroke="#F97316" strokeWidth="0.5" 
          />
        </svg>
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
            Get In Touch
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6"
          >
            Let's Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-orange-400">
              Great Together
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#64748B] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Have a website, web application, SaaS platform, or custom software idea? 
            Let's discuss your requirements and transform your vision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE: Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactMethods.map((method, i) => (
              <motion.a
                key={i}
                href={method.href}
                target={method.href?.startsWith('http') ? "_blank" : "_self"}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 bg-[#0F172A] border border-white/5 rounded-2xl group transition-all hover:border-[#F97316]/50 ${method.href ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-4 transition-transform group-hover:scale-110">
                  {method.icon}
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{method.title}</h4>
                <p className="text-[#F97316] font-black text-xs mb-2 tracking-tight">{method.value}</p>
                <p className="text-[#64748B] text-[10px] uppercase font-bold tracking-widest">{method.desc}</p>
              </motion.a>
            ))}
            
            {/* Quick CTA Bar */}
            <div className="col-span-1 sm:col-span-2 mt-4 flex flex-wrap gap-4">
              <button className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#F97316] hover:border-[#F97316] transition-all">
                <Calendar size={14} /> Schedule Meeting
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-[#0F172A] border border-white/10 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl"
          >
            {/* Form Success Overlay */}
            <AnimatePresence>
              {formState === "success" && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-[#0F172A] flex flex-col items-center justify-center text-center p-6"
                >
                  <CheckCircle size={60} className="text-[#F97316] mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-2">Inquiry Sent Successfully!</h3>
                  <p className="text-[#64748B]">Our engineering team will review your request and get back to you shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    required type="text" placeholder="John Doe"
                    className="w-full bg-[#020617] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#F97316]/50 transition-colors"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    required type="email" placeholder="john@example.com"
                    className="w-full bg-[#020617] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#F97316]/50 transition-colors"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    required type="tel" placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#020617] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#F97316]/50 transition-colors"
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Project Type</label>
                  <select 
                    className="w-full bg-[#020617] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#F97316]/50 transition-colors appearance-none"
                    value={formData.projectType} onChange={e => setFormData({...formData, projectType: e.target.value})}
                  >
                    {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Project Details</label>
                <textarea 
                  required rows={4} placeholder="Describe your technical requirements..."
                  className="w-full bg-[#020617] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#F97316]/50 transition-colors resize-none"
                  value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})}
                />
              </div>

              <button 
                disabled={formState === "loading"}
                className="w-full py-4 bg-[#F97316] text-white font-black uppercase text-xs tracking-[0.2em] rounded-xl shadow-lg shadow-[#F97316]/20 flex items-center justify-center gap-3 transition-all hover:bg-[#EA580C] hover:gap-5 disabled:opacity-50"
              >
                {formState === "loading" ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>Send Inquiry <Send size={16} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Quick Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 flex flex-wrap justify-center gap-8 text-white/20"
        >
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Global Support Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Average Response: 4 Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encryption</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

/**
 * QUICK CTA BAR
 */
export const ContactCTABar = () => {
  return (
    <div className="bg-white/5 border-t border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-4 sm:gap-12">
        <a href="https://wa.me/919664373310" className="flex items-center gap-3 text-white/50 hover:text-[#F97316] transition-colors text-[10px] font-black uppercase tracking-widest">
          <MessageSquare size={16} /> WhatsApp Us
        </a>
        <a href="mailto:contact@rjtechforce.com" className="flex items-center gap-3 text-white/50 hover:text-[#F97316] transition-colors text-[10px] font-black uppercase tracking-widest">
          <Mail size={16} /> Email Us
        </a>
        <button className="flex items-center gap-3 text-white/50 hover:text-[#F97316] transition-colors text-[10px] font-black uppercase tracking-widest">
          <Calendar size={16} /> Schedule Call
        </button>
      </div>
    </div>
  );
}