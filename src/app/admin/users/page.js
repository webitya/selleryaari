'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Search, Filter, Loader2, User, Mail, Shield, Trash2, X } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
        await axios.delete(`/api/admin/users/${id}`);
        toast.success('User removed');
        fetchUsers();
    } catch (err) {
        toast.error('Failed to delete user');
    }
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <Toaster />
      
      {/* Header */}
      <div className="mb-5 flex justify-between items-center">
        <div>
            <h1 className="text-lg font-bold text-[#1a1a1a] tracking-tight uppercase">Merchant Directory</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                {users.length} registered merchants
            </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
            { label: 'Total Users', value: users.length, color: 'text-[#D4A017]', bg: 'bg-[#FFFBE6]' },
            { label: 'Verified', value: users.filter(u => u.isVerified).length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'New This Week', value: users.filter(u => new Date(u.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, color: 'text-blue-500', bg: 'bg-blue-50' },
        ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-3 border border-white/60 shadow-sm`}>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                <p className={`text-xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
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
                    <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
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
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Merchant</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Role</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Joined</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="py-16 text-center">
                                <Loader2 className="animate-spin mx-auto text-[#F4BC1C]" size={20} />
                                <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading merchants...</p>
                            </td>
                        </tr>
                    ) : filtered.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="py-16 text-center">
                                <User className="mx-auto text-slate-200 mb-3" size={32} />
                                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                                    {search ? 'No results found' : 'No users registered yet'}
                                </p>
                            </td>
                        </tr>
                    ) : (
                        filtered.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1a1a1a] font-bold text-[10px] uppercase">
                                            {user.name?.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-[13px] font-bold text-[#1a1a1a] truncate">{user.name}</h4>
                                            <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                                                <Mail size={9} />{user.email}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-[9px] font-bold text-slate-500 uppercase">
                                        <Shield size={9} />
                                        {user.role}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className="text-[11px] font-bold text-[#1a1a1a]">
                                        {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                                        user.isVerified ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                                    }`}>
                                        {user.isVerified ? 'Verified' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button 
                                        onClick={() => handleDelete(user._id)}
                                        className="p-1.5 hover:bg-red-50 rounded-lg text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
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
