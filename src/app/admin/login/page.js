'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (res?.ok) {
            toast.success('Access Granted!');
            router.push('/admin/dashboard');
        } else {
            toast.error('Invalid credentials. Please try again.');
        }
    } catch (error) {
        toast.error('An unexpected error occurred.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6 font-inter">
      <Toaster />
      
      <div className="w-full max-w-[360px]">


        {/* Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50">
            <h1 className="text-lg font-bold text-[#1a1a1a] mb-0.5 tracking-tight">Sign In</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Admin access only</p>

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={15} />
                        <input 
                            required
                            type="email" 
                            placeholder="admin@selleryaari.com" 
                            className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 pl-10 pr-4 text-[13px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                
                <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={15} />
                        <input 
                            required
                            type={showPass ? 'text' : 'password'}
                            placeholder="••••••••" 
                            className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 pl-10 pr-10 text-[13px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                        >
                            {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#F4BC1C] hover:bg-[#D4A017] disabled:opacity-50 text-black py-3 rounded-xl font-bold text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-yellow-100 mt-2"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={16} />
                    ) : (
                        'Enter Dashboard'
                    )}
                </button>
            </form>
        </div>
        
        <div className="text-center mt-6">
            <div className="flex items-center justify-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                <span>© 2026 SellerYaari</span>
                <span>•</span>
                <Link href="/" className="hover:text-[#D4A017] transition-colors">← Back to Site</Link>
            </div>
        </div>
      </div>
    </div>
  );
}
