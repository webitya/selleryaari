'use client';
import PublicLayout from '@/components/PublicLayout';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Package, Star, Zap, TrendingUp } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';



const categories = [
    { label: 'Home Essentials', icon: '🏠' },
    { label: 'Beauty & Care', icon: '💄' },
    { label: 'Car & Bike', icon: '🚗' },
    { label: 'Gym & Wellness', icon: '💪' },
    { label: 'Footwear', icon: '👟' },
    { label: 'Accessories', icon: '⌚' },
    { label: 'Jewellery', icon: '💍' },
    { label: 'Kids', icon: '🧸' },
    { label: 'Electronics', icon: '📱' },
];

const mockProducts = [
    { name: 'Smart Posture Corrector', price: '999', originalPrice: '1,499', rating: 4.8, tag: 'HOT', category: 'Health' },
    { name: 'LED Strip Light 5M', price: '449', originalPrice: '899', rating: 4.7, tag: 'SALE', category: 'Home' },
    { name: 'Magnetic Cable Set', price: '299', originalPrice: '599', rating: 4.9, tag: 'NEW', category: 'Tech' },
    { name: 'Kitchen Organiser Pro', price: '699', originalPrice: '1,199', rating: 4.6, tag: 'WINNER', category: 'Home' },
    { name: 'Car Phone Mount 360°', price: '349', originalPrice: '699', rating: 4.8, tag: 'TOP', category: 'Auto' },
];

const ProductCard = ({ name, price, originalPrice, rating, tag, category }) => (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300 group cursor-pointer flex flex-col">
        <div className="relative aspect-square bg-[#F9F9F9] overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
                <Package size={40} className="text-slate-200 group-hover:scale-110 transition-transform duration-500" />
            </div>
            {tag && (
                <div className="absolute top-2 left-2 bg-[#F4BC1C] text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tight z-10">
                    {tag}
                </div>
            )}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/90 text-[#1a1a1a] text-[9px] font-bold rounded-full border border-slate-100 uppercase z-10">
                {category}
            </div>
        </div>
        <div className="p-3 flex-1 flex flex-col">
            <h3 className="text-[12px] font-bold text-[#1a1a1a] line-clamp-2 mb-1.5 group-hover:text-[#D4A017] transition-colors leading-snug">{name}</h3>
            <div className="flex items-center gap-1 mb-2">
                <Star size={10} fill="#F4BC1C" className="text-[#F4BC1C]" />
                <span className="text-[10px] font-bold text-slate-400">{rating}</span>
            </div>
            <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-50">
                <div>
                    <p className="text-[9px] text-slate-400 line-through font-medium">₹{originalPrice}</p>
                    <p className="text-base font-black text-[#1a1a1a]">₹{price}</p>
                </div>
                <a 
                    href={`https://wa.me/917300067345?text=Hi%20SellerYaari,%20I'm%20interested%20in%20this%20test%20product:%20${encodeURIComponent(name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                >
                    <WhatsAppIcon size={12} className="text-white" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Enquiry Now</span>
                </a>


            </div>
        </div>
    </div>
);

export default function DemoPage() {
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <PublicLayout>
            <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-6 space-y-8 font-inter">

                {/* Promo Banner */}
                <div className="relative bg-gradient-to-br from-[#FFFBE6] to-[#FFF8DC] rounded-2xl p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between overflow-hidden border border-[#FFE58F]">
                    <div className="relative z-10 lg:w-3/5">
                        <span className="inline-block bg-black text-[#F4BC1C] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                            Beta Testing Program
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-3 tracking-tight leading-tight">
                            Discover Your Next <br />
                            <span className="text-[#D4A017]">Hero Product</span>
                        </h1>
                        <p className="text-slate-600 text-[13px] font-medium mb-6 leading-relaxed">
                            Test exclusive products before they go live. Get early access and exciting seller benefits.
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="bg-[#1a1a1a] hover:bg-[#F4BC1C] hover:text-black text-white px-6 py-2.5 rounded-xl font-bold text-[12px] flex items-center gap-2 transition-all active:scale-95 shadow-md">
                                Start Testing Now
                                <ArrowRight size={14} />
                            </button>
                            <span className="text-[10px] text-slate-400 font-medium">*T&C Apply</span>
                        </div>
                    </div>
                    <div className="relative z-10 lg:w-2/5 flex justify-end mt-6 lg:mt-0">
                        <div className="w-40 h-40 lg:w-52 lg:h-52 bg-[#F4BC1C]/20 rounded-3xl border-4 border-[#F4BC1C]/30 flex items-center justify-center">
                            <div className="text-center">
                                <Zap size={40} className="text-[#D4A017] mx-auto mb-2" />
                                <p className="text-[10px] font-black text-[#D4A017] uppercase tracking-widest">Live Testing</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-3 right-4 flex items-center gap-1.5">
                        {[0, 1].map(i => (
                            <button key={i} onClick={() => setActiveSlide(i)} className={`w-5 h-1.5 rounded-full transition-all ${i === activeSlide ? 'bg-[#F4BC1C]' : 'bg-[#FFE58F]'}`} />
                        ))}
                    </div>
                </div>

                {/* Category Scroller */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-[13px] font-black text-[#1a1a1a] uppercase tracking-wider">Shop by Category</h2>
                        <div className="h-px bg-slate-100 flex-1" />
                    </div>
                    <div className="relative">
                        <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
                            {categories.map((cat, idx) => (
                                <button key={idx} className="flex flex-col items-center gap-2 cursor-pointer group shrink-0">
                                    <div className="w-14 h-14 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-2xl transition-all group-hover:bg-[#FFFBE6] group-hover:border-[#FFE58F] group-hover:shadow-md">
                                        {cat.icon}
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-600 text-center uppercase tracking-wide max-w-[60px] leading-tight group-hover:text-[#D4A017] transition-colors">
                                        {cat.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Strip */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { icon: TrendingUp, label: 'Trending Now', value: '120+ Products', color: 'text-[#D4A017]', bg: 'bg-[#FFFBE6]' },
                        { icon: Package, label: 'New Arrivals', value: '24h Updated', color: 'text-blue-500', bg: 'bg-blue-50' },
                        { icon: Star, label: 'Top Rated', value: '4.8+ Avg', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    ].map(s => (
                        <div key={s.label} className={`${s.bg} rounded-xl p-3 border border-white flex items-center gap-3`}>
                            <s.icon size={18} className={s.color} />
                            <div>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">{s.label}</p>
                                <p className={`text-[13px] font-black mt-0.5 ${s.color}`}>{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Product Grid */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-[13px] font-black text-[#1a1a1a] uppercase tracking-wider">Test Products</h2>
                            <span className="bg-[#FFFBE6] text-[#D4A017] text-[9px] font-black px-2 py-0.5 rounded-full border border-[#FFE58F] uppercase">
                                Beta
                            </span>
                        </div>
                        <button className="text-[11px] font-bold text-slate-400 hover:text-[#D4A017] uppercase tracking-widest transition-colors flex items-center gap-1">
                            View All <ChevronRight size={13} />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                        {mockProducts.map((p, i) => (
                            <ProductCard key={i} {...p} />
                        ))}
                    </div>
                </div>

                {/* CTA Block */}
                <div className="bg-[#1a1a1a] rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="text-[#F4BC1C] text-[10px] font-bold uppercase tracking-widest mb-2">Exclusive Access</p>
                        <h2 className="text-xl font-black text-white tracking-tight mb-1">Ready to sell winning products?</h2>
                        <p className="text-slate-400 text-[12px] font-medium">Join 5,000+ merchants already scaling with SellerYaari.</p>
                    </div>
                    <button className="bg-[#F4BC1C] hover:bg-white text-black px-8 py-3 rounded-xl font-black text-[12px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-yellow-500/10 shrink-0">
                        Get Started Free
                    </button>
                </div>

            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </PublicLayout>
    );
}
