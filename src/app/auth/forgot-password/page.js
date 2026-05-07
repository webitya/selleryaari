'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, ShieldCheck, ArrowRight, Zap, Loader2, Lock } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function ForgotPassword() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Email, 2: Reset
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSendCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/auth/forgot-password', { email: formData.email });
            setStep(2);
            toast.success('Reset code sent to email');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to send code');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        setLoading(true);
        try {
            await axios.post('/api/auth/reset-password', formData);
            toast.success('Password updated! Please login.');
            router.push('/auth/login');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Reset failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4 font-inter">
            <Toaster position="top-right" />
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 w-full max-w-[340px] overflow-hidden">
                <div className="p-6">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-10 h-10 bg-[#F4BC1C] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-yellow-100">
                            <Lock size={20} className="text-black" />
                        </div>
                        <h1 className="text-xl font-bold text-[#1a1a1a] tracking-tight uppercase">Reset Password</h1>
                        <p className="text-slate-400 text-[11px] font-medium mt-0.5">Secure your SellerYaari account</p>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleSendCode} className="space-y-3.5">
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black hover:bg-[#F4BC1C] hover:text-black text-white py-3 rounded-xl font-bold text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" size={16} /> : (
                                    <>
                                        Send Reset Code
                                        <ArrowRight size={14} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleReset} className="space-y-3.5">
                            <div className="text-center bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100">
                                <p className="text-slate-500 text-[10px] font-medium leading-relaxed">
                                    Reset code sent to <br /><span className="font-bold text-[#1a1a1a]">{formData.email}</span>
                                </p>
                            </div>

                            <div>
                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Enter Code</label>
                                <input
                                    required
                                    type="text"
                                    maxLength="6"
                                    placeholder="000000"
                                    className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 text-center text-lg font-bold tracking-[0.3em] focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                                    value={formData.otp}
                                    onChange={(e) => setFormData({...formData, otp: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">New Password</label>
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-4 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Confirm New Password</label>
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-4 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#F4BC1C] hover:bg-black hover:text-white text-black py-3 rounded-xl font-bold text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-yellow-100 disabled:opacity-50 mt-2"
                            >
                                {loading ? <Loader2 className="animate-spin" size={16} /> : 'Reset Password'}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 pt-5 border-t border-slate-50 text-center flex flex-col gap-3">
                        <Link href="/auth/login" className="text-slate-400 text-[11px] font-bold uppercase tracking-widest hover:text-[#1a1a1a] transition-colors">
                            Back to Login
                        </Link>
                        <Link href="/" className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-[#1a1a1a] transition-colors">
                            ← Back to Website
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
