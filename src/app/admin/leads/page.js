'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Mail, Phone, Calendar, Search, Filter, Loader2, ArrowUpRight } from 'lucide-react';
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
    switch(status) {
        case 'new': return 'bg-blue-50 text-blue-600';
        case 'contacted': return 'bg-orange-50 text-orange-600';
        case 'converted': return 'bg-emerald-50 text-emerald-600';
        default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <AdminLayout>
      <Toaster />
      <div className="flex justify-between items-center mb-10">
        <div>
            <h1 className="text-2xl font-bold text-[#0f1729]">Lead Management</h1>
            <p className="text-slate-500 mt-1">Track and manage business inquiries</p>
        </div>
        <div className="flex gap-4">
            <button className="btn-outline !py-2 !px-4 !text-xs">Export CSV</button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by name, email or phone..." 
                    className="form-input !pl-12 !py-2"
                />
            </div>
            <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50">
                <Filter size={18} />
                Filter
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Prospect</th>
                        <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Business Type</th>
                        <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Date Joined</th>
                        <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="p-20 text-center">
                                <Loader2 className="animate-spin mx-auto text-[#0A66C2]" size={32} />
                            </td>
                        </tr>
                    ) : leads.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="p-20 text-center text-slate-400">No leads found yet.</td>
                        </tr>
                    ) : (
                        leads.map((lead) => (
                            <tr key={lead._id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-6">
                                    <h4 className="font-bold text-[#0f1729]">{lead.name}</h4>
                                    <div className="flex flex-col gap-1 mt-1">
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Mail size={12} />
                                            {lead.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Phone size={12} />
                                            {lead.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="text-xs font-medium text-slate-600">{lead.businessType || 'Not specified'}</span>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Calendar size={14} />
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${getStatusColor(lead.status)}`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <button className="p-2 hover:bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-[#0A66C2] transition-all">
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
