'use client';
import PublicLayout from '@/components/PublicLayout';
import { useSession, signOut } from 'next-auth/react';
import { User, Mail, Phone, ShieldCheck, LogOut, Package, Clock, Zap } from 'lucide-react';

export default function Profile() {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <PublicLayout>
            <div className="min-h-[70vh] bg-[#F9F9F9] py-10 font-inter">
                <div className="max-w-[800px] mx-auto px-6">
                    {/* Profile Header */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#FFFBE6] rounded-2xl flex items-center justify-center text-[#D4A017] border border-[#FFE58F] text-2xl font-bold">
                                {session.user.name[0]}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#1a1a1a] uppercase tracking-tight">{session.user.name}</h1>
                                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{session.user.role} Account</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => signOut()}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl font-bold text-[11px] uppercase tracking-wider hover:bg-red-100 transition-all"
                        >
                            <LogOut size={14} />
                            Sign Out
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Account Details */}
                        <div className="md:col-span-2 space-y-4">
                            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                <h2 className="text-[12px] font-bold text-[#1a1a1a] uppercase tracking-widest mb-6 pb-2 border-b border-slate-50">Account Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Mail size={16} className="text-slate-400" />
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Email</span>
                                        </div>
                                        <span className="text-[12px] font-bold text-[#1a1a1a]">{session.user.email}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck size={16} className="text-[#F4BC1C]" />
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                                        </div>
                                        <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded uppercase tracking-wider">Verified</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                <h2 className="text-[12px] font-bold text-[#1a1a1a] uppercase tracking-widest mb-6 pb-2 border-b border-slate-50">Recent Activity</h2>
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <Clock size={20} className="text-slate-200" />
                                    </div>
                                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">No recent orders found</p>
                                    <Link href="/demo" className="mt-4 text-[#F4BC1C] text-[10px] font-bold uppercase tracking-widest hover:underline">Start Shopping →</Link>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-4">
                            <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-white font-bold text-[14px] mb-2 uppercase tracking-tight">Become a Seller</h3>
                                    <p className="text-slate-400 text-[10px] font-medium leading-relaxed uppercase tracking-widest mb-6">Start your own dropshipping business today.</p>
                                    <Link href="/#contact" className="inline-block bg-[#F4BC1C] text-black px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                                        Learn More
                                    </Link>
                                </div>
                                <Zap size={100} className="absolute -bottom-6 -right-6 text-white/5 rotate-12" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

// Separate Link component to avoid import issues
function Link({ href, children, ...props }) {
    return <a href={href} {...props}>{children}</a>;
}
