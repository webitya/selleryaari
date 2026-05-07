import PublicLayout from '@/components/PublicLayout';
import { ShieldCheck, RefreshCcw, Clock, CheckCircle2 } from 'lucide-react';

export default function ReturnsPolicy() {
    const policies = [
        { icon: Clock, title: '7-Day Return', desc: 'Easy returns within 7 days of delivery for eligible products.' },
        { icon: RefreshCcw, title: 'Quick Exchange', desc: 'Fast exchange if you receive a damaged or incorrect item.' },
        { icon: ShieldCheck, title: 'Quality Assurance', desc: 'Every return is checked for original condition and tags.' },
    ];

    return (
        <PublicLayout>
            <div className="min-h-[70vh] bg-[#F9F9F9] py-16 font-inter">
                <div className="max-w-[800px] mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-black text-[#1a1a1a] uppercase tracking-tight italic mb-4">Returns & Refund Policy</h1>
                        <p className="text-slate-500 text-[14px] font-medium leading-relaxed">
                            At SellerYaari, we prioritize customer satisfaction. If you are not happy with your purchase, we are here to help.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                        {policies.map((p, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                                <div className="w-12 h-12 bg-[#FFFBE6] rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#FFE58F]">
                                    <p.icon size={20} className="text-[#D4A017]" />
                                </div>
                                <h3 className="text-[14px] font-bold text-[#1a1a1a] mb-2 uppercase tracking-tight">{p.title}</h3>
                                <p className="text-slate-400 text-[11px] leading-relaxed font-medium">{p.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                        <section>
                            <h2 className="text-lg font-black text-[#1a1a1a] uppercase tracking-tight mb-3 flex items-center gap-2 italic">
                                <CheckCircle2 size={18} className="text-[#F4BC1C]" />
                                Return Conditions
                            </h2>
                            <ul className="list-disc list-inside text-slate-500 text-[13px] space-y-2 font-medium">
                                <li>Items must be unused and in original packaging.</li>
                                <li>All tags and invoices must be intact.</li>
                                <li>Certain products (hygiene-related) are non-returnable.</li>
                                <li>Return request must be raised within 7 days.</li>
                            </ul>
                        </section>
                        
                        <section>
                            <h2 className="text-lg font-black text-[#1a1a1a] uppercase tracking-tight mb-3 flex items-center gap-2 italic">
                                <CheckCircle2 size={18} className="text-[#F4BC1C]" />
                                Refund Process
                            </h2>
                            <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                                Once we receive and inspect your return, we will process your refund within 3-5 business days. The amount will be credited back to your original payment method or SellerYaari wallet.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
