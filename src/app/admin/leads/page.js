'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Mail, Phone, Calendar, Search, Filter, Loader2, ArrowUpRight, Users, Download } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await axios.get('/api/leads');
      setLeads(res.data);
    } catch (err) {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
        case 'new': return 'bg-blue-50 text-[#0A66C2] border-blue-100';
        case 'contacted': return 'bg-orange-50 text-orange-600 border-orange-100';
        case 'converted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <AdminLayout>
      <Toaster />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
            <h1 className="text-xl font-black text-[#0f1729] tracking-tight">Lead Intelligence</h1>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Global business inquiries database</p>
        </div>
        <button className="bg-white border border-slate-200 hover:border-slate-300 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-sm text-slate-600 hover:text-[#0f1729]">
            <Download size={16} />
            Export Database
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/30">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                    type="text" 
                    placeholder="Search by prospect name, email or digital footprint..." 
                    className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 focus:border-[#0A66C2]/20 transition-all"
                />
            </div>
            <button className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-[#0f1729] transition-all flex items-center gap-2 text-[11px] font-bold">
                <Filter size={14} />
                Advanced Filter
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-white border-b border-slate-100">
                    <tr>
                        <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Prospect Entity</th>
                        <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Vertical</th>
                        <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Acquisition Date</th>
                        <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Pipeline Status</th>
                        <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="p-16 text-center">
                                <Loader2 className="animate-spin mx-auto text-[#0A66C2]" size={24} />
                                <p className="mt-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hydrating leads...</p>
                            </td>
                        </tr>
                    ) : leads.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="p-16 text-center">
                                <Users className="mx-auto text-slate-100 mb-4" size={40} />
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">The pipeline is currently dry.<br/>Launch a campaign to attract prospects.</p>
                            </td>
                        </tr>
                    ) : (
                        leads.map((lead) => (
                            <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] font-black text-xs border border-[#0A66C2]/5">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="text-[13px] font-black text-[#0f1729] leading-tight">{lead.name}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                                                    <Mail size={10} />
                                                    {lead.email}
                                                </span>
                                                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                                                    <Phone size={10} />
                                                    {lead.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{lead.businessType || 'D2C Brand'}</span>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[12px] font-black text-[#0f1729] tracking-tighter">
                                            {new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </span>
                                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Registered</span>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-full border ${getStatusColor(lead.status)} shadow-sm shadow-slate-100`}>
                                        {lead.status || 'NEW'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="p-2 hover:bg-white rounded-lg text-slate-300 hover:text-[#0A66C2] transition-colors border border-transparent hover:border-slate-200">
                                        <ArrowUpRight size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </AdminLayout>
  );
}
