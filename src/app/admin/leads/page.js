'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Mail, Phone, Search, Filter, Loader2, ArrowUpRight, Users, Download, X } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  useEffect(() => { fetchLeads(); }, []);

  const getStatusStyle = (status) => {
    switch(status?.toLowerCase()) {
        case 'new': return 'bg-[#FFFBE6] text-[#D4A017] border-[#FFE58F]';
        case 'contacted': return 'bg-orange-50 text-orange-600 border-orange-100';
        case 'converted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const filtered = leads.filter(l =>
    l.name?.toLowerCase().includes(search.toLowerCase()) ||
    l.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <Toaster />
      {/* Header */}
      <div className="mb-5 flex justify-between items-center">
        <div>
            <h1 className="text-lg font-black text-[#1a1a1a] tracking-tight">Lead Intelligence</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                {leads.length} total leads in database
            </p>
        </div>
        <button className="bg-white border border-slate-100 hover:border-slate-200 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 shadow-sm text-slate-600">
            <Download size={14} />
            Export CSV
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
            { label: 'Total Leads', value: leads.length, color: 'text-[#D4A017]', bg: 'bg-[#FFFBE6]' },
            { label: 'New', value: leads.filter(l => !l.status || l.status === 'new').length, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Converted', value: leads.filter(l => l.status === 'converted').length, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-3 border border-white/60`}>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                <p className={`text-xl font-black mt-0.5 ${s.color}`}>{s.value}</p>
            </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-slate-50 flex items-center gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-[#F5F5F5] border-none rounded-lg py-2 pl-8 pr-4 text-[12px] font-medium focus:bg-white focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                />
                {search && (
                    <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        <X size={12} />
                    </button>
                )}
            </div>
            <button className="h-8 px-3 bg-[#F5F5F5] rounded-lg text-slate-500 hover:text-[#1a1a1a] transition-all flex items-center gap-1.5 text-[11px] font-bold">
                <Filter size={13} />
                Filter
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b border-slate-50">
                    <tr className="bg-[#F9F9F9]">
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Lead</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Type</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Date</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="py-16 text-center">
                                <Loader2 className="animate-spin mx-auto text-[#F4BC1C]" size={20} />
                                <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading leads...</p>
                            </td>
                        </tr>
                    ) : filtered.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="py-16 text-center">
                                <Users className="mx-auto text-slate-200 mb-3" size={32} />
                                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                                    {search ? 'No results found' : 'No leads yet'}
                                </p>
                            </td>
                        </tr>
                    ) : (
                        filtered.map((lead) => (
                            <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-[#FFFBE6] flex items-center justify-center text-[#D4A017] font-black text-xs border border-[#FFE58F] shrink-0">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-[13px] font-bold text-[#1a1a1a] truncate">{lead.name}</h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium truncate max-w-[150px]">
                                                    <Mail size={9} />{lead.email}
                                                </span>
                                                {lead.phone && (
                                                    <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium hidden sm:flex">
                                                        <Phone size={9} />{lead.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className="text-[10px] font-bold text-slate-600 uppercase">{lead.businessType || 'D2C'}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className="text-[11px] font-bold text-[#1a1a1a]">
                                        {new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${getStatusStyle(lead.status)}`}>
                                        {lead.status || 'NEW'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button className="p-1.5 hover:bg-[#FFFBE6] rounded-lg text-slate-300 hover:text-[#D4A017] transition-colors">
                                        <ArrowUpRight size={14} />
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
