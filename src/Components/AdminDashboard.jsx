import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  Database, 
  ArrowLeft,
  Calendar,
  User,
  LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearch] = useState("");
  const [filterType, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Authentication & Redirection Check
    const session = localStorage.getItem("rj_admin_session");
    if (!session) {
      navigate("/admin/login");
      return;
    }

    // 2. Fetch Inquiries from MongoDB API
    const fetchInquiries = async () => {
      try {
        const { token } = JSON.parse(session);
        const { getApiBaseUrl } = await import('../utils/api.js');
        const response = await fetch(`${getApiBaseUrl()}/api/contact`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };
    fetchInquiries();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const session = localStorage.getItem("rj_admin_session");
      const { token } = JSON.parse(session);
      const { getApiBaseUrl } = await import('../utils/api.js');
      await fetch(`${getApiBaseUrl()}/api/contact/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      setInquiries(inquiries.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const session = localStorage.getItem("rj_admin_session");
      const { token } = JSON.parse(session);
      const { getApiBaseUrl } = await import('../utils/api.js');
      const response = await fetch(`${getApiBaseUrl()}/api/contact/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const updated = await response.json();
      setInquiries(inquiries.map(item => item._id === id ? updated : item));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rj_admin_session");
    navigate("/admin/login");
  };

  const filtered = inquiries.filter(item => {
    const matchesSearch = item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || item.status === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#020617] p-4 sm:pt-24 pt-24 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-[#F97316] text-[10px] font-black uppercase tracking-widest mb-2 hover:gap-4 transition-all">
              <ArrowLeft size={14} /> Back to Site
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tighter flex items-center gap-3">
              <Database className="text-[#F97316]" size={28} /> Admin Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all mr-2"
            >
              <LogOut size={14} /> Logout
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                type="text" placeholder="Search inquiries..."
                className="bg-[#0F172A] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#F97316]/50 w-full md:w-64"
                value={searchTerm} onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="bg-[#0F172A] border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none"
              value={filterType} onChange={e => setFilter(e.target.value)}
            >
              <option value="All">All Inquiries</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0F172A] p-6 rounded-2xl border border-white/5">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Total Leads</p>
            <p className="text-2xl font-black">{inquiries.length}</p>
          </div>
          <div className="bg-[#0F172A] p-6 rounded-2xl border border-white/5">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Active Filters</p>
            <p className="text-2xl font-black text-[#F97316]">{filtered.length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0F172A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">User Profile</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Requirements</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Details</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-6">
                      <div className="font-bold text-white">{item.fullName}</div>
                      <div className="text-xs text-white/40">{item.email}</div>
                      <div className="text-[10px] font-mono text-[#F97316] mt-1">{item.phone}</div>
                    </td>
                    <td className="p-6">
                      <select 
                        value={item.status} 
                        onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                        className="bg-[#020617] border border-white/5 text-[#F97316] rounded text-[9px] font-black uppercase px-2 py-1 outline-none cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-6">
                      <div className="text-[10px] font-black text-white/40 uppercase mb-1">{item.projectType}</div>
                      <p className="text-xs text-white/60 line-clamp-2 max-w-xs">{item.projectDetails}</p>
                    </td>
                    <td className="p-6 text-xs text-white/40 font-mono">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="p-6">
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-white/20 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="p-20 text-center text-white/20 uppercase font-black tracking-widest">
                No project leads found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;