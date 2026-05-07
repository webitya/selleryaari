'use client';
import PublicLayout from '@/components/PublicLayout';
import { useSession, signOut } from 'next-auth/react';
import { 
    User, 
    Mail, 
    ShieldCheck, 
    LogOut, 
    Package, 
    Clock, 
    Zap, 
    CreditCard, 
    Settings, 
    HelpCircle,
    TrendingUp,
    ShoppingBag,
    ChevronRight,
    Wallet
} from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState('overview');

    if (!session) return null;

    const SidebarLink = ({ id, label, icon: Icon }) => (
        <button 
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === id 
                ? 'bg-[#F4BC1C] text-black shadow-md shadow-yellow-100' 
                : 'text-slate-500 hover:bg-white hover:text-[#1a1a1a]'
            }`}
        >
            <div className="flex items-center gap-3">
                <Icon size={18} />
                <span className="text-[12px] font-bold uppercase tracking-wider">{label}</span>
            </div>
            <ChevronRight size={14} className={activeTab === id ? 'opacity-100' : 'opacity-0'} />
        </button>
    );

    return (
        <PublicLayout>
            <div className="min-h-screen bg-[#F8F9FA] py-10 font-inter">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        
                        {/* Left Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* User Profile Card */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                                <div className="w-20 h-20 bg-[#FFFBE6] rounded-3xl flex items-center justify-center text-[#D4A017] border border-[#FFE58F] text-3xl font-black mx-auto mb-4 shadow-inner">
                                    {session.user.name[0]}
                                </div>
                                <h2 className="text-lg font-bold text-[#1a1a1a] uppercase tracking-tight leading-none mb-1">{session.user.name}</h2>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{session.user.role} Partner</p>
                                
                                <div className="mt-6 pt-6 border-t border-slate-50 flex justify-center gap-4">
                                    <div className="text-center">
                                        <p className="text-[14px] font-black text-[#1a1a1a]">0</p>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Orders</p>
                                    </div>
                                    <div className="w-px h-8 bg-slate-100" />
                                    <div className="text-center">
                                        <p className="text-[14px] font-black text-[#1a1a1a]">₹0</p>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Earnings</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-1">
                                <SidebarLink id="overview" label="Dashboard" icon={Zap} />
                                <SidebarLink id="orders" label="My Orders" icon={ShoppingBag} />
                                <SidebarLink id="wallet" label="Wallet" icon={Wallet} />
                                <SidebarLink id="settings" label="Settings" icon={Settings} />
                                <SidebarLink id="support" label="Support" icon={HelpCircle} />
                                
                                <button 
                                    onClick={() => signOut()}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all mt-4"
                                >
                                    <LogOut size={18} />
                                    <span className="text-[12px] font-bold uppercase tracking-wider">Sign Out</span>
                                </button>
                            </nav>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-3 space-y-6">
                            
                            {activeTab === 'overview' && (
                                <>
                                    {/* Stats Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {[
                                            { label: 'Total Sales', value: '₹0.00', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                            { label: 'Pending Payout', value: '₹0.00', icon: Wallet, color: 'text-blue-500', bg: 'bg-blue-50' },
                                            { label: 'Active Listings', value: '0', icon: Package, color: 'text-[#D4A017]', bg: 'bg-[#FFFBE6]' },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm group hover:shadow-md transition-all">
                                                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                                    <stat.icon size={20} className={stat.color} />
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                                <p className="text-2xl font-black text-[#1a1a1a] tracking-tight">{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Activity & Account Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                            <h3 className="text-[12px] font-bold text-[#1a1a1a] uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <Clock size={16} className="text-slate-400" />
                                                Recent Activity
                                            </h3>
                                            <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-slate-50 rounded-xl">
                                                <ShoppingBag size={32} className="text-slate-100 mb-3" />
                                                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">No orders found yet</p>
                                                <a href="/demo" className="mt-4 text-[#F4BC1C] text-[10px] font-bold uppercase tracking-widest hover:underline">Browse Products</a>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                            <h3 className="text-[12px] font-bold text-[#1a1a1a] uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <User size={16} className="text-slate-400" />
                                                Partner Details
                                            </h3>
                                            <div className="space-y-5">
                                                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Email Address</span>
                                                    <span className="text-[12px] font-bold text-[#1a1a1a]">{session.user.email}</span>
                                                </div>
                                                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Account Type</span>
                                                    <span className="text-[10px] font-bold bg-[#FFFBE6] text-[#D4A017] px-2 py-0.5 rounded uppercase">{session.user.role} Partner</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Security Status</span>
                                                    <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] uppercase">
                                                        <ShieldCheck size={14} />
                                                        Verified
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'orders' && (
                                <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center shadow-sm">
                                    <Package size={48} className="mx-auto text-slate-100 mb-4" />
                                    <h3 className="text-lg font-bold text-[#1a1a1a] uppercase tracking-tight">Order History</h3>
                                    <p className="text-slate-400 text-[11px] font-medium uppercase tracking-widest mt-1 mb-6">You haven't placed any orders yet.</p>
                                    <a href="/demo" className="bg-black text-white px-6 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-[#F4BC1C] hover:text-black transition-all">Start Sourcing</a>
                                </div>
                            )}

                            {activeTab === 'wallet' && (
                                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-[12px] font-bold text-[#1a1a1a] uppercase tracking-widest">Seller Wallet</h3>
                                        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Add Funds</button>
                                    </div>
                                    <div className="bg-[#1a1a1a] p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                                        <div className="relative z-10">
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Available Balance</p>
                                            <p className="text-4xl font-black text-white tracking-tight">₹0.00</p>
                                            <div className="mt-10 flex gap-10">
                                                <div>
                                                    <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1">Total Payouts</p>
                                                    <p className="text-white font-bold text-sm">₹0.00</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1">Pending Clearance</p>
                                                    <p className="text-white font-bold text-sm">₹0.00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <CreditCard size={150} className="absolute -bottom-10 -right-10 text-white/5 -rotate-12" />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                    <h3 className="text-[12px] font-bold text-[#1a1a1a] uppercase tracking-widest mb-6">Account Settings</h3>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                                                <input disabled value={session.user.name} className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-[13px] font-medium text-slate-500 opacity-70" />
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                                                <input disabled value={session.user.email} className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-[13px] font-medium text-slate-500 opacity-70" />
                                            </div>
                                        </div>
                                        <button className="bg-black text-white px-6 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest opacity-50 cursor-not-allowed">Save Changes</button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
