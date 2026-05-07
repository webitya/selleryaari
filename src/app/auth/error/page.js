import PublicLayout from '@/components/PublicLayout';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function AuthError() {
    return (
        <PublicLayout>
            <div className="min-h-[60vh] flex items-center justify-center p-6 bg-[#F9F9F9] font-inter">
                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-xl max-w-sm w-full text-center">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <AlertCircle size={24} />
                    </div>
                    <h1 className="text-lg font-bold text-[#1a1a1a] uppercase tracking-tight mb-2">Authentication Error</h1>
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-8">
                        Something went wrong during sign in. Please check your credentials or try another method.
                    </p>
                    <Link
                        href="/auth/login"
                        className="w-full bg-[#1a1a1a] text-white py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#F4BC1C] hover:text-black transition-all"
                    >
                        <ArrowLeft size={14} />
                        Back to Login
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
