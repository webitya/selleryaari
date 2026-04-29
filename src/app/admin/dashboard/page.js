'use client';
import AdminLayout from '@/components/AdminLayout';
import { 
    Users, 
    Package, 
    ArrowUpRight, 
    TrendingUp, 
    Clock,
    CheckCircle,
    Zap,
    TrendingDown,
    MoreHorizontal
} from 'lucide-react';

const StatCard = ({ name, value, icon: Icon, change, color, bg }) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                <Icon size={20} />
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full ${
                change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}>
                {change.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {change}
            </div>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{name}</p>
        <p className="text-xl font-black text-[#0f1729] mt-2 tracking-tighter">{value}</p>
    </div>
);

export default function Dashboard() {
  const stats = [
    { name: 'Total Leads', value: '1,248', icon: Users, change: '+12.5%', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Active Products', value: '86', icon: Package, change: '+4.2%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Conversion', value: '18.4%', icon: TrendingUp, change: '+2.1%', color: 'text-[#722ED1]', bg: 'bg-[#F9F0FF]' },
    { name: 'Pending Tasks', value: '12', icon: Clock, change: '-3.5%', color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-end">
        <div>
            <h1 className="text-2xl font-black text-[#0f1729] tracking-tight">System Overview</h1>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Here is what is happening with SellerYaari today.</p>
        </div>
        <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-500 flex items-center gap-2 shadow-sm">
            <Clock size={14} />
            Last update: 2 mins ago
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.name} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                    <h3 className="font-black text-[13px] text-[#0f1729] uppercase tracking-widest">Recent Lead Activity</h3>
                </div>
                <button className="text-[#0A66C2] text-[11px] font-black hover:underline uppercase tracking-tighter">View Detailed Report</button>
            </div>
            <div className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-black border border-slate-200 group-hover:bg-white transition-colors">
                                {String.fromCharCode(64 + i)}
                            </div>
                            <div>
                                <h4 className="text-[13px] font-black text-[#0f1729]">Potential Merchant {i}</h4>
                                <p className="text-[10px] text-slate-500 font-medium">Dropshipping Inquiry • {i * 2} hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <span className="text-[9px] font-black px-2 py-0.5 bg-blue-50 text-[#0A66C2] rounded-full border border-blue-100 uppercase">New</span>
                            <button className="p-1.5 hover:bg-white rounded-lg text-slate-300 hover:text-slate-600 transition-all border border-transparent hover:border-slate-200">
                                <ArrowUpRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-[#0f1729] rounded-2xl p-6 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 text-[#722ED1]">
                        <Zap size={18} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Pro Strategy</span>
                    </div>
                    <h3 className="text-base font-black mb-2 tracking-tight">Scale Your Sourcing</h3>
                    <p className="text-white/60 text-[11px] leading-relaxed mb-6 font-medium">
                        Based on your current leads, focusing on high-margin Home Essentials could increase ROI by up to 32% this month.
                    </p>
                    <div className="flex items-center gap-2.5 text-emerald-400 text-[11px] font-black uppercase tracking-wider bg-emerald-500/10 w-fit px-3 py-1.5 rounded-lg border border-emerald-500/20">
                        <CheckCircle size={14} />
                        <span>Actionable: High-Margin Focus</span>
                    </div>
                </div>
                {/* Decorative background element */}
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-[#0A66C2] rounded-full blur-[80px] opacity-20" />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all text-center group border border-slate-100 hover:border-slate-200">
                        <Package size={18} className="mx-auto mb-2 text-slate-400 group-hover:text-[#0A66C2]" />
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">Add Product</span>
                    </button>
                    <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all text-center group border border-slate-100 hover:border-slate-200">
                        <Users size={18} className="mx-auto mb-2 text-slate-400 group-hover:text-[#0A66C2]" />
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">New Lead</span>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}
