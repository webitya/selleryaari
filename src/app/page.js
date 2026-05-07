'use client';
import PublicLayout from '@/components/PublicLayout';
import React, { useState } from 'react';
import { 
    ChevronRight,
    ArrowRight,
    Star,
    Zap,
    Heart,
    ShoppingBag,
    ShieldCheck,
    Truck,
    Headphones,
    Users,
    CheckCircle2,
    PlayCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// --- Sub-components ---

const ProductCard = ({ name, price, originalPrice, rating, tag, category }) => (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group cursor-pointer flex flex-col h-full">
        <div className="relative aspect-square bg-slate-50 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-slate-200 group-hover:scale-110 transition-transform duration-700">
                <Zap size={40} className="opacity-10" />
            </div>
            {tag && (
                <div className="absolute top-2 left-2 bg-[#F4BC1C] text-black text-[9px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tight z-10">
                    {tag}
                </div>
            )}
            <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all active:scale-90 z-10">
                <Heart size={14} />
            </button>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-md text-[#1a1a1a] text-[9px] font-bold rounded-full border border-slate-100 uppercase z-10">
                {category}
            </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-[13px] font-bold text-[#1a1a1a] line-clamp-2 mb-2 group-hover:text-[#F4BC1C] transition-colors leading-snug">
                {name}
            </h3>
            <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center text-[#F4BC1C]">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[11px] font-black ml-1 text-slate-400">{rating}</span>
                </div>
            </div>
            <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-50">
                <div>
                    <p className="text-[10px] text-slate-400 line-through font-bold">₹{originalPrice || Math.round(parseInt(price.replace(/,/g, '')) * 1.5)}</p>
                    <p className="text-lg font-black text-[#1a1a1a]">₹{price}</p>
                </div>
                <button className="bg-[#1a1a1a] hover:bg-[#F4BC1C] hover:text-black text-white w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-md">
                    <ShoppingBag size={18} />
                </button>
            </div>
        </div>
    </div>
);

const SectionHeader = ({ title, badge }) => (
    <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#1a1a1a] tracking-tight uppercase">{title}</h2>
            {badge && (
                <span className="bg-[#FFFBE6] text-[#D4A017] text-[10px] font-black px-3 py-1 rounded-full border border-[#FFE58F] uppercase tracking-wider">
                    {badge}
                </span>
            )}
        </div>
        <button className="text-[12px] font-black text-slate-400 hover:text-[#F4BC1C] uppercase tracking-widest transition-colors flex items-center gap-1 group">
            View All
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
    </div>
);

const AdvantageCard = ({ icon: Icon, title, desc }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all group">
        <div className="w-10 h-10 bg-[#FFFBE6] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#F4BC1C] transition-colors border border-[#FFE58F]">
            <Icon size={20} className="text-[#F4BC1C] group-hover:text-black transition-colors" />
        </div>
        <div>
            <h4 className="text-[13px] font-bold text-[#1a1a1a] uppercase leading-none mb-1 tracking-tight">{title}</h4>
            <p className="text-slate-500 text-[11px] leading-snug font-medium">{desc}</p>
        </div>
    </div>
);

const CommitmentItem = ({ icon: Icon, label, desc }) => (
    <div className="flex items-center gap-3 p-2 group">
        <div className="w-9 h-9 bg-[#FFFBE6] rounded-lg flex items-center justify-center text-[#F4BC1C] shrink-0 border border-[#FFE58F] group-hover:bg-[#F4BC1C] group-hover:text-black transition-all">
            <Icon size={16} />
        </div>
        <div className="text-left">
            <p className="text-[11px] font-bold text-[#1a1a1a] uppercase leading-none mb-1 tracking-tight">{label}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{desc}</p>
        </div>
    </div>
);

const TestimonialCard = ({ name, role, content, rating, image }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-100 hover:shadow-md transition-all relative group flex flex-col">
        <div className="flex items-center gap-0.5 mb-3 text-[#F4BC1C]">
            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < rating ? 'currentColor' : 'none'} />)}
        </div>
        <p className="text-slate-600 text-[12px] leading-relaxed mb-6 italic font-medium">"{content}"</p>
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-50">
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-400">
                {name[0]}
            </div>
            <div className="text-left">
                <h5 className="text-[12px] font-bold text-[#1a1a1a] uppercase tracking-tight">{name}</h5>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{role}</p>
            </div>
        </div>
    </div>
);

export default function MarketplaceHome() {
    const trendingProducts = [
        { name: 'Portable Mini Blender for Smoothies and Shakes', price: '899', rating: '4.8', tag: 'Hot', category: 'Kitchen' },
        { name: 'RGB Wireless Bluetooth Mouse with Silent Clicks', price: '449', rating: '4.6', tag: 'Trending', category: 'Tech' },
        { name: 'Premium Leather Wallet with RFID Protection', price: '1,299', rating: '4.9', tag: 'Winning', category: 'Fashion' },
        { name: 'Fast Charging 20W PD Wall Adapter', price: '599', rating: '4.7', tag: 'Pick', category: 'Tech' },
    ];

    return (
        <PublicLayout>
            <div className="animate-in fade-in duration-700 bg-[#F9F9F9] font-inter">
                {/* --- HERO SECTION (Compact Grid) --- */}
                <section className="max-w-[1440px] mx-auto p-4 lg:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {/* Categories Sidebar (Compact) */}
                        <aside className="hidden lg:block bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                            <h3 className="text-[12px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-4 pb-3 border-b border-slate-50 flex items-center justify-between">
                                Categories
                                <ChevronRight size={12} className="text-[#F4BC1C]" />
                            </h3>
                            <ul className="space-y-2.5">
                                {["Home & Kitchen", "Beauty & Makeup", "Car Accessories", "Fitness & Gym", "Electronics", "Toys & Games", "Fashion", "Pet Supplies"].map((cat, i) => (
                                    <li key={i} className="flex items-center justify-between text-[12px] font-medium text-slate-600 hover:text-[#F4BC1C] cursor-pointer transition-colors group">
                                        {cat}
                                        <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all" />
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full mt-8 bg-slate-50 text-slate-400 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                                VIEW ALL
                            </button>
                        </aside>

                        {/* Main Banner (Compact) */}
                        <div className="lg:col-span-2 relative h-[350px] sm:h-[400px] rounded-2xl overflow-hidden group shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBE6] via-[#FDF9F3] to-[#FFFFFF]" />
                            <div className="absolute inset-0 flex items-center p-8 sm:p-12">
                                <div className="max-w-md relative z-10">
                                    <span className="inline-block bg-black text-[#F4BC1C] text-[9px] font-bold px-3 py-1 rounded-full uppercase mb-6 tracking-widest">
                                        TRENDING
                                    </span>
                                    <h1 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-4 tracking-tighter leading-[1.1]">
                                        START YOUR <br />
                                        <span className="text-[#F4BC1C]">ECOMMERCE</span> <br />
                                        JOURNEY TODAY
                                    </h1>
                                    <p className="text-slate-500 text-[12px] font-bold mb-8 leading-relaxed uppercase tracking-wider">
                                        Join 5,000+ merchants scaling today.
                                    </p>
                                    <button className="bg-black hover:bg-[#F4BC1C] hover:text-black text-white px-8 py-3.5 rounded-xl font-bold text-[11px] flex items-center gap-3 transition-all active:scale-95 shadow-xl">
                                        EXPLORE NOW
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-1/2 h-full flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity">
                                <Zap size={300} className="text-[#F4BC1C] rotate-12" />
                            </div>
                        </div>

                        {/* Side Promos (Compact) */}
                        <div className="space-y-4">
                            <div className="bg-[#1a1a1a] rounded-2xl p-6 h-[192px] flex flex-col justify-between relative overflow-hidden group border border-white/5 shadow-sm">
                                <div className="relative z-10">
                                    <h3 className="text-lg font-black text-[#F4BC1C] leading-none mb-2 tracking-tighter italic uppercase">BEST SELLERS</h3>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Winners List</p>
                                </div>
                                <div className="relative z-10 mt-auto flex justify-between items-end">
                                    <span className="text-white text-2xl font-black opacity-10 group-hover:opacity-100 transition-opacity">01.</span>
                                    <button className="bg-[#F4BC1C] hover:bg-white text-black w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-yellow-500/10">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 h-[192px] flex flex-col justify-between border border-slate-100 relative overflow-hidden group shadow-sm">
                                <div className="relative z-10">
                                    <h3 className="text-lg font-black text-[#1a1a1a] leading-none mb-2 tracking-tighter uppercase">NEW ARRIVALS</h3>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Updated 24h</p>
                                </div>
                                <div className="relative z-10 mt-auto flex justify-between items-end">
                                    <span className="text-slate-100 text-2xl font-black group-hover:text-[#F4BC1C] group-hover:opacity-10 transition-all">02.</span>
                                    <button className="bg-black hover:bg-[#F4BC1C] hover:text-black text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-md">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- PRODUCTS SECTIONS (Compact Grid) --- */}
                <section className="max-w-[1440px] mx-auto p-4 lg:p-6 space-y-12 mt-4">
                    <div>
                        <SectionHeader title="Popular Products" badge="Trending" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                            {trendingProducts.concat(trendingProducts.slice(0, 1)).map((p, i) => (
                                <ProductCard key={i} {...p} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <SectionHeader title="Best Sellers" badge="Verified" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                            {trendingProducts.concat(trendingProducts.slice(0, 1)).map((p, i) => (
                                <ProductCard key={i} {...p} tag="WINNER" category="Tech" />
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- COMPACT BANNER --- */}
                <section className="mt-12">
                    <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
                        <div className="relative bg-[#1a1a1a] rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between overflow-hidden shadow-xl">
                            <div className="relative z-10 lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                                <span className="inline-block text-[#F4BC1C] text-[10px] font-bold uppercase tracking-widest mb-4">Webinar Opportunity</span>
                                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 tracking-tighter leading-none">
                                    LAUNCH YOUR STORE <br />
                                    WITH <span className="text-[#F4BC1C]">Selleryaari</span>
                                </h2>
                                <p className="text-slate-400 text-xs font-medium mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed uppercase tracking-wider">
                                    Join our next free webinar. pure data, no fluff.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                    <button className="bg-[#F4BC1C] hover:bg-white text-black px-8 py-3.5 rounded-xl font-bold text-[11px] transition-all active:scale-95 shadow-xl uppercase tracking-widest">
                                        JOIN FOR FREE
                                    </button>
                                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                        <Users size={16} className="text-[#F4BC1C]" />
                                        12k+ Joined
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 lg:w-1/3">
                                <div className="aspect-video bg-white/5 rounded-2xl border-4 border-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center group cursor-pointer hover:border-[#F4BC1C]/10 transition-all duration-500">
                                    <div className="w-16 h-16 bg-[#F4BC1C] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <PlayCircle size={32} className="text-black ml-0.5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- ADVANTAGE SECTION (Ultra Compact) --- */}
                <section className="max-w-[1440px] mx-auto p-4 lg:p-6 mt-8">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-lg font-black text-[#1a1a1a] tracking-tight uppercase italic whitespace-nowrap">Selleryaari Advantage</h2>
                        <div className="h-[1px] bg-slate-100 flex-1" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <AdvantageCard 
                            icon={CheckCircle2} 
                            title="End to End" 
                            desc="We handle everything from sourcing to marketing."
                        />
                        <AdvantageCard 
                            icon={Headphones} 
                            title="24/7 Support" 
                            desc="Experts available round the clock to guide you."
                        />
                        <AdvantageCard 
                            icon={Users} 
                            title="Global Network" 
                            desc="Access premium suppliers and fast logistics."
                        />
                    </div>
                </section>

                {/* --- COMMITMENT SECTION (Ultra Compact) --- */}
                <section className="bg-white border-y border-slate-100 py-6 mt-12">
                    <div className="max-w-[1440px] mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
                            <div className="hidden lg:block">
                                <h2 className="text-[12px] font-black text-[#1a1a1a] tracking-tight italic uppercase">Our Commitment</h2>
                            </div>
                            <CommitmentItem icon={ShieldCheck} label="Secure" desc="100% Protected" />
                            <CommitmentItem icon={Truck} label="Fast" desc="PAN India" />
                            <CommitmentItem icon={Headphones} label="Support" desc="Anytime" />
                            <CommitmentItem icon={Zap} label="Winning" desc="AI Powered" />
                        </div>
                    </div>
                </section>

                {/* --- TESTIMONIALS (Compact) --- */}
                <section className="max-w-[1440px] mx-auto p-4 lg:p-6 mt-12">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-lg font-black text-[#1a1a1a] tracking-tight uppercase whitespace-nowrap">Success Stories</h2>
                        <div className="h-[1px] bg-slate-100 flex-1" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TestimonialCard name="Rahul Sharma" role="Seller" content="Winning lists are pure gold! Transformed my business." rating={5} />
                        <TestimonialCard name="Priya Patel" role="Store Owner" content="Automated fulfillment is a lifesaver. Scaled effortlessly." rating={5} />
                        <TestimonialCard name="Amit Gupta" role="Entrepreneur" content="The only dropshipping partner you need in India." rating={5} />
                    </div>
                </section>

                {/* --- SEO CONTENT BLOCK (Compact) --- */}
                <section className="bg-slate-50 border-t border-slate-100 py-10 mt-16">
                    <div className="max-w-[1440px] mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <h2 className="text-[13px] font-bold text-[#1a1a1a] tracking-tight uppercase mb-4">About SellerYaari</h2>
                                <p className="text-slate-500 text-[11px] leading-relaxed">
                                    India's #1 platform for e-commerce growth. We empower merchants with winning products, verified data, and seamless logistics to build 7-figure stores.
                                </p>
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <h3 className="text-[11px] font-bold text-[#1a1a1a] uppercase">Sourcing</h3>
                                    <p className="text-slate-500 text-[10px]">AI-driven trending product lists.</p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-[11px] font-bold text-[#1a1a1a] uppercase">Support</h3>
                                    <p className="text-slate-500 text-[10px]">24/7 dedicated expert guidance.</p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-[11px] font-bold text-[#1a1a1a] uppercase">Scale</h3>
                                    <p className="text-slate-500 text-[10px]">Proven high-ROI ad templates.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </PublicLayout>
    );
}
