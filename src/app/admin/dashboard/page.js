import AdminLayout from '@/components/AdminLayout';
import { 
    Users, 
    Package, 
    ArrowUpRight, 
    TrendingUp, 
    Clock,
    CheckCircle
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { name: 'Total Leads', value: '1,248', icon: Users, change: '+12%', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Active Products', value: '86', icon: Package, change: '+4', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Conversion Rate', value: '18.4%', icon: TrendingUp, change: '+2.1%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Pending Tasks', value: '12', icon: Clock, change: '-3', color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#0f1729]">Good morning, Admin</h1>
        <p className="text-slate-500 mt-1">Here is what is happening with SellerYaari today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                    <stat.icon size={24} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                    {stat.change}
                </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
            <p className="text-2xl font-bold text-[#0f1729] mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-[#0f1729]">Recent Leads</h3>
                <button className="text-[#0A66C2] text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                                {String.fromCharCode(64 + i)}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#0f1729]">Potential Client {i}</h4>
                                <p className="text-xs text-slate-500">Dropshipping • 2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 rounded-full">New</span>
                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200">
                                <ArrowUpRight size={16} className="text-slate-400" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-[#0f1729] rounded-[32px] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Agency Growth Tip</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Don't forget to follow up with leads from the last 24 hours. Conversion rates drop by 45% after Tuesday.
                </p>
                <div className="flex items-center gap-3 text-emerald-400 text-sm font-bold">
                    <CheckCircle size={18} />
                    <span>Focus on high-margin products</span>
                </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#0A66C2] rounded-full blur-[80px] opacity-30" />
        </div>
      </div>
    </AdminLayout>
  );
}
