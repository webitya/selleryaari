'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ShieldCheck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
        toast.success('Access Granted. Welcome back!');
        router.push('/admin/dashboard');
    } else {
        toast.error('Invalid credentials. Check your email/password.');
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-inter">
      <Toaster />
      
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-6 hover:opacity-80 transition-opacity">
                <span className="text-3xl font-black text-[#0f1729] tracking-tighter">
                    selleryaari<span className="text-[#0A66C2]">.</span>
                </span>
                <span className="bg-[#0f1729] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Admin
                </span>
            </Link>
            <div className="bg-white px-4 py-2 rounded-full border border-slate-200 inline-flex items-center gap-2 shadow-sm">
                <ShieldCheck className="text-[#0A66C2]" size={14} />
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Secure Access Gateway</span>
            </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <h1 className="text-xl font-black text-[#0f1729] mb-1 tracking-tight">Login</h1>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Management portal entry</p>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            required
                            type="email" 
                            placeholder="admin@selleryaari.com" 
                            className="w-full bg-[#F5F5F5] border-none rounded-xl py-3 pl-11 pr-4 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                
                <div>
                    <div className="flex items-center justify-between mb-1.5 ml-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                        <Link href="#" className="text-[10px] font-black text-[#0A66C2] uppercase hover:underline">Forgot?</Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            required
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full bg-[#F5F5F5] border-none rounded-xl py-3 pl-11 pr-4 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#0f1729] hover:bg-[#1a2641] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-slate-200"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : (
                        <>
                            <span>Enter Dashboard</span>
                        </>
                    )}
                </button>
            </form>
        </div>
        
        <div className="text-center mt-8 space-y-2">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Authorized Personnel Only</p>
            <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400">
                <span>© 2026 SellerYaari</span>
                <span>•</span>
                <Link href="/" className="hover:text-[#0A66C2]">Home</Link>
            </div>
        </div>
      </div>
    </div>
  );
}
