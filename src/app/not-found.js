import PublicLayout from '@/components/PublicLayout';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFound() {
    return (
        <PublicLayout>
            <div className="min-h-[65vh] flex items-center justify-center p-8 bg-[#F9F9F9] font-inter">
                <div className="text-center max-w-md">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-[#FFFBE6] border border-[#FFE58F] rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle size={28} className="text-[#D4A017]" />
                    </div>

                    {/* Code */}
                    <p className="text-[80px] font-black text-[#1a1a1a] leading-none tracking-tighter mb-2">404</p>

                    {/* Divider */}
                    <div className="w-12 h-1 bg-[#F4BC1C] rounded-full mx-auto mb-5" />

                    {/* Text */}
                    <h1 className="text-lg font-bold text-[#1a1a1a] mb-2 uppercase tracking-tight">Page Not Found</h1>
                    <p className="text-slate-400 text-[13px] font-medium mb-8 leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-[#F4BC1C] hover:bg-[#D4A017] text-black px-6 py-2.5 rounded-xl font-bold text-[12px] uppercase tracking-wider transition-all active:scale-95 shadow-sm"
                        >
                            <ArrowLeft size={14} />
                            Back to Home
                        </Link>
                        <Link
                            href="/demo"
                            className="inline-flex items-center gap-2 border border-slate-200 hover:border-[#F4BC1C] bg-white text-[#1a1a1a] hover:text-[#D4A017] px-6 py-2.5 rounded-xl font-bold text-[12px] uppercase tracking-wider transition-all active:scale-95"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
