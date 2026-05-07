import PublicLayout from '@/components/PublicLayout';
import Link from 'next/link';
import { Package, Search, ArrowRight } from 'lucide-react';

export default function TrackOrder() {
    return (
        <PublicLayout>
            <div className="min-h-[70vh] bg-[#F9F9F9] flex items-center justify-center p-6 font-inter">
                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-xl max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-[#FFFBE6] border border-[#FFE58F] rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Package size={28} className="text-[#D4A017]" />
                    </div>
                    <h1 className="text-xl font-black text-[#1a1a1a] uppercase tracking-tight mb-2 italic">Track Your Order</h1>
                    <p className="text-slate-400 text-[13px] font-medium mb-8 leading-relaxed">
                        Enter your tracking number or order ID to get real-time delivery updates.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Order ID (e.g. SY-12345)"
                                className="w-full bg-[#F5F5F5] border-none rounded-xl py-3 px-4 text-[13px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                            />
                        </div>
                        <button className="w-full bg-[#1a1a1a] hover:bg-[#F4BC1C] hover:text-black text-white py-3 rounded-xl font-bold text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md">
                            Track Status
                            <Search size={14} />
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-50">
                        <Link href="/#faq" className="text-[11px] font-bold text-[#D4A017] hover:underline flex items-center justify-center gap-1 uppercase tracking-wider">
                            Need Help? Check FAQs
                            <ArrowRight size={10} />
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
