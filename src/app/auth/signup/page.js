'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Phone, Lock, ShieldCheck, ArrowRight, Zap, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Info, 2: OTP
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        otp: ''
    });

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        setLoading(true);
        try {
            await axios.post('/api/auth/send-otp', { email: formData.email });
            setStep(2);
            toast.success('Code sent to email');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/auth/signup', formData);
            toast.success('Registration successful!');
            router.push('/auth/login');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Registration failed');
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
                            <Zap size={20} className="text-black" />
                        </div>
                        <h1 className="text-xl font-bold text-[#1a1a1a] tracking-tight uppercase">Join Us</h1>
                        <p className="text-slate-400 text-[11px] font-medium mt-0.5">Start your journey today</p>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleSendOTP} className="space-y-3">
                            <div>
                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Full Name</label>
                                <div className="relative">
                                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-9 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                            </div>

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
                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+91 XXXXX XXXXX"
                                        className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-9 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Password</label>
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••"
                                        className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-4 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Confirm</label>
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••"
                                        className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-4 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black hover:bg-[#F4BC1C] hover:text-black text-white py-3 rounded-xl font-bold text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg disabled:opacity-50 mt-2"
                            >
                                {loading ? <Loader2 className="animate-spin" size={16} /> : (
                                    <>
                                        Get Code
                                        <ArrowRight size={14} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-5">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-[#FFFBE6] border border-[#FFE58F] rounded-full flex items-center justify-center mx-auto mb-3">
                                    <ShieldCheck size={24} className="text-[#D4A017]" />
                                </div>
                                <p className="text-slate-500 text-[11px] mb-5">Enter code sent to <br /><span className="font-bold text-[#1a1a1a]">{formData.email}</span></p>
                                
                                <input
                                    required
                                    type="text"
                                    maxLength="6"
                                    placeholder="000000"
                                    className="w-full bg-[#F5F5F5] border-none rounded-xl py-3.5 text-center text-xl font-bold tracking-[0.4em] focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                                    value={formData.otp}
                                    onChange={(e) => setFormData({...formData, otp: e.target.value})}
                                />
                            </div>

                            <div className="space-y-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#F4BC1C] hover:bg-[#D4A017] text-black py-3 rounded-xl font-bold text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-yellow-100 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={16} /> : 'Verify & Register'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full text-slate-400 hover:text-[#1a1a1a] py-1 text-[10px] font-bold uppercase tracking-widest transition-colors"
                                >
                                    Edit Details
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-6 pt-5 border-t border-slate-50 text-center flex flex-col gap-3">
                        <p className="text-slate-400 text-[11px] font-medium">
                            Have an account?{' '}
                            <Link href="/auth/login" className="text-[#F4BC1C] font-bold hover:underline">Sign In</Link>
                        </p>
                        <Link href="/" className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-[#1a1a1a] transition-colors">
                            ← Back to Website
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
