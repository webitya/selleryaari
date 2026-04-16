'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

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
        toast.success('Welcome back, Admin!');
        router.push('/admin/dashboard');
    } else {
        toast.error('Invalid credentials. Access Denied.');
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f6ff] flex items-center justify-center p-6">
      <Toaster />
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#0A66C2] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-200">
                <Lock className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-[#0f1729]">Admin Control Panel</h1>
            <p className="text-slate-500 mt-2">Sign in to manage your e-commerce agency</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-2xl shadow-blue-100/50">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Admin Email</label>
            <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    required
                    type="email" 
                    placeholder="admin@selleryaari.com" 
                    className="form-input !pl-12" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Password</label>
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    required
                    type="password" 
                    placeholder="••••••••" 
                    className="form-input !pl-12" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full justify-center py-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Login to Dashboard'}
          </button>
        </form>
        
        <p className="text-center mt-8 text-xs text-slate-400">
            Authorized Personnel Only. IP logged.
        </p>
      </div>
    </div>
  );
}
