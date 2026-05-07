'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/AdminLayout';
import { 
    Users, 
    Package, 
    ArrowUpRight, 
    TrendingUp, 
    Clock,
    TrendingDown,
    ShoppingBag,
    Zap,
    User as UserIcon
} from 'lucide-react';

const StatCard = ({ name, value, icon: Icon, change, color, bg }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
        <div className="flex justify-between items-start mb-3">
            <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>
                <Icon size={16} className={color} />
            </div>
            <div className={`flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
            }`}>
                {change.startsWith('+') ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                {change}
            </div>
        </div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{name}</p>
        <p className="text-xl font-black text-[#1a1a1a] mt-1 tracking-tight">{value}</p>
    </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState([
    { name: 'Total Leads', value: '0', icon: Users, change: '+0%', color: 'text-blue-500', bg: 'bg-blue-50', key: 'leads' },
    { name: 'Active Products', value: '0', icon: Package, change: '+0%', color: 'text-emerald-500', bg: 'bg-emerald-50', key: 'products' },
    { name: 'Total Merchants', value: '0', icon: UserIcon, change: '+0%', color: 'text-[#D4A017]', bg: 'bg-[#FFFBE6]', key: 'users' },
    { name: 'Conversion Rate', value: '12.5%', icon: TrendingUp, change: '+2.1%', color: 'text-orange-500', bg: 'bg-orange-50', key: 'rate' },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const [leads, products, users] = await Promise.all([
                axios.get('/api/leads'),
                axios.get('/api/products'),
                axios.get('/api/admin/users')
            ]);
            
            setStats(prev => prev.map(s => {
                if (s.key === 'leads') return { ...s, value: leads.data.length.toLocaleString() };
                if (s.key === 'products') return { ...s, value: products.data.length.toLocaleString() };
                if (s.key === 'users') return { ...s, value: users.data.length.toLocaleString() };
                return s;
            }));
        } catch (err) {
            console.error('Failed to fetch stats');
        }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
            <h1 className="text-lg font-black text-[#1a1a1a] tracking-tight">System Overview</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Here's what's happening with SellerYaari today.</p>
        </div>
        <div className="bg-white border border-slate-100 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-500 flex items-center gap-1.5 shadow-sm">
            <Clock size={12} />
            Last updated: 2 mins ago
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.name} {...stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#F4BC1C]" />
                    <h3 className="font-bold text-[13px] text-[#1a1a1a] uppercase tracking-wider">Recent Lead Activity</h3>
                </div>
                <button className="text-[#F4BC1C] text-[10px] font-bold hover:underline uppercase tracking-wider">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#FFFBE6] flex items-center justify-center text-[#D4A017] text-xs font-black border border-[#FFE58F]">
                                {String.fromCharCode(64 + i)}
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-[#1a1a1a]">Merchant {i}</h4>
                                <p className="text-[10px] text-slate-400 font-medium">Dropshipping • {i * 2}h ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-bold px-2 py-0.5 bg-[#FFFBE6] text-[#D4A017] rounded-full border border-[#FFE58F] uppercase">New</span>
                            <button className="p-1 hover:bg-white rounded-lg text-slate-300 hover:text-[#F4BC1C] transition-all border border-transparent hover:border-slate-100">
                                <ArrowUpRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
            {/* Strategy Card */}
            <div className="bg-[#1a1a1a] rounded-xl p-5 text-white relative overflow-hidden shadow-lg">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Zap size={14} className="text-[#F4BC1C]" fill="#F4BC1C" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">AI Insight</span>
                    </div>
                    <h3 className="text-[14px] font-black mb-2 tracking-tight">Scale Your Sourcing</h3>
                    <p className="text-white/60 text-[11px] leading-relaxed mb-4 font-medium">
                        Home Essentials could increase your ROI by 32% this month.
                    </p>
                    <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold bg-emerald-500/10 w-fit px-3 py-1.5 rounded-lg border border-emerald-500/20">
                        <span>✓ High-Margin Focus</span>
                    </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#F4BC1C] rounded-full blur-[60px] opacity-10" />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                    <button className="p-3 bg-slate-50 rounded-lg hover:bg-[#FFFBE6] transition-all text-center group border border-slate-100 hover:border-[#FFE58F]">
                        <Package size={16} className="mx-auto mb-1.5 text-slate-400 group-hover:text-[#D4A017]" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Add Product</span>
                    </button>
                    <button className="p-3 bg-slate-50 rounded-lg hover:bg-[#FFFBE6] transition-all text-center group border border-slate-100 hover:border-[#FFE58F]">
                        <Users size={16} className="mx-auto mb-1.5 text-slate-400 group-hover:text-[#D4A017]" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">View Leads</span>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}
