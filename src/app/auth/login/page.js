'use client';
import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Zap, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (res?.error) {
                toast.error(res.error);
            } else {
                toast.success('Logged in successfully!');
                router.push(callbackUrl);
            }
        } catch (error) {
            toast.error('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setGoogleLoading(true);
        signIn('google', { callbackUrl });
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="w-10 h-10 bg-[#F4BC1C] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-yellow-100">
                    <Zap size={20} className="text-black" />
                </div>
                <h1 className="text-xl font-bold text-[#1a1a1a] tracking-tight uppercase">Welcome Back</h1>
                <p className="text-slate-400 text-[11px] font-medium mt-0.5">Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            required
                            type="email"
                            placeholder="name@example.com"
                            className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-9 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1 ml-1">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                        <Link href="/auth/forgot-password" className="text-[9px] font-bold text-[#F4BC1C] uppercase tracking-widest hover:underline">Forgot?</Link>
                    </div>
                    <div className="relative">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            required
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-9 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || googleLoading}
                    className="w-full bg-black hover:bg-[#F4BC1C] hover:text-black text-white py-3 rounded-xl font-bold text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : 'Sign In'}
                </button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-[9px] uppercase tracking-[0.2em] font-bold">
                    <span className="bg-white px-3 text-slate-400">Or</span>
                </div>
            </div>

            <button
                onClick={handleGoogleLogin}
                disabled={loading || googleLoading}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 py-2.5 rounded-xl font-bold text-[12px] flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-sm disabled:opacity-50"
            >
                {googleLoading ? <Loader2 className="animate-spin" size={16} /> : (
                    <>
                        <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google Login
                    </>
                )}
            </button>

            <div className="mt-6 pt-5 border-t border-slate-50 text-center flex flex-col gap-3">
                <p className="text-slate-400 text-[11px] font-medium">
                    No account?{' '}
                    <Link href="/auth/signup" className="text-[#F4BC1C] font-bold hover:underline">Register</Link>
                </p>
                <Link href="/" className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-[#1a1a1a] transition-colors">
                    ← Back to Website
                </Link>
            </div>
        </div>
    );
}

export default function Login() {
    return (
        <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4 font-inter">
            <Toaster position="top-right" />
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 w-full max-w-[340px] overflow-hidden">
                <Suspense fallback={
                    <div className="p-12 flex flex-col items-center justify-center">
                        <Loader2 className="animate-spin text-[#F4BC1C] mb-4" size={32} />
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Loading Secure Login...</p>
                    </div>
                }>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
