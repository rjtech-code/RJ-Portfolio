import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { getSession, login } from "../../services/adminApi";
import { useNoIndexTitle } from "../../hooks/useSeo";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const [error, setError] = useState(location.state?.expired ? "Your session has expired. Please sign in again." : "");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useNoIndexTitle("Admin Login | RJ TechForce");

  useEffect(() => {
    if (getSession()) navigate("/admin", { replace: true });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password);
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (err) {
      setError(err.status === 429 ? "Too many attempts. Please wait a few minutes and try again." : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--rj-navy-950)] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Engineering Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] tech-grid pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F97316]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[var(--rj-panel)] border border-[var(--rj-panel-border)] p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          {/* Animated Tech Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F97316] to-transparent" />
          
          <div className="text-center mb-10">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className="w-16 h-16 bg-[#F97316]/10 rounded-2xl flex items-center justify-center text-[#F97316] mx-auto mb-6 border border-[#F97316]/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
            >
              <ShieldCheck size={32} />
            </motion.div>
            <h1 className="text-3xl font-extrabold text-white tracking-tighter">Admin Login</h1>
            <p className="text-[#64748B] text-xs font-black uppercase tracking-[0.2em] mt-3">RJ TechForce Engineering Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="admin-email" className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Administrator Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#F97316] transition-colors" size={18} aria-hidden="true" />
                <input
                  id="admin-email"
                  autoComplete="username"
                  required
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full bg-[#020617] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder:text-white/5 focus:outline-none focus:border-[#F97316]/50 transition-all shadow-inner"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#F97316] transition-colors" size={18} aria-hidden="true" />
                <input
                  id="admin-password"
                  autoComplete="current-password"
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#020617] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder:text-white/5 focus:outline-none focus:border-[#F97316]/50 transition-all shadow-inner"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  role="alert"
                  className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs flex items-center gap-3 font-bold"
                >
                  <AlertCircle size={16} className="shrink-0" aria-hidden="true" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#F97316] text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-[#F97316]/20 flex items-center justify-center gap-3 transition-all hover:bg-[#EA580C] hover:gap-5 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]"
            >
              {isLoading ? "Authenticating..." : (
                <>Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
          <Link to="/" className="mt-8 flex items-center justify-center gap-2 text-xs text-[#94A3B8] hover:text-[#F97316]">
            <ArrowLeft size={14} aria-hidden="true" /> Back to website
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;