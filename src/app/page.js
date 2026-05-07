'use client';
import PublicLayout from '@/components/PublicLayout';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
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
    PlayCircle,
    Image as ImageIcon
} from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';


import Image from 'next/image';
import Services from '@/components/Services';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';


// --- Sub-components ---

const ProductCard = ({ name, price, originalPrice, rating, tag, category, images, isWinner }) => {
    // Robust image selection: find first non-empty string in array, or check if images itself is a string
    const displayImage = Array.isArray(images) ? images.find(img => img && img.length > 0) : (typeof images === 'string' ? images : null);

    return (
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-300 group cursor-pointer flex flex-col h-full">
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
                {displayImage ? (
                    <img src={displayImage} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50/50 group-hover:scale-105 transition-transform duration-500 border-b border-slate-100/50">
                        <ImageIcon size={32} className="opacity-20 mb-2" />
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-30">No Media</span>
                    </div>
                )}
                {isWinner && (
                    <div className="absolute top-2 left-2 bg-black text-[#F4BC1C] text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase tracking-widest z-10 border border-[#F4BC1C]/20">
                        WINNER
                    </div>
                )}
                {!isWinner && tag && (
                    <div className="absolute top-2 left-2 bg-[#F4BC1C] text-black text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm uppercase tracking-tight z-10">
                        {tag}
                    </div>
                )}
                <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all active:scale-90 z-10">
                    <Heart size={12} />
                </button>
                <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-white/90 backdrop-blur-md text-[#1a1a1a] text-[8px] font-bold rounded-full border border-slate-100 uppercase z-10">
                    {category}
                </div>
            </div>
            <div className="p-2 sm:p-3 flex-1 flex flex-col">
                <h3 className="text-[11px] sm:text-[12px] font-bold text-[#1a1a1a] line-clamp-2 mb-1 group-hover:text-[#F4BC1C] transition-colors leading-snug">
                    {name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center text-[#F4BC1C]">
                        <Star size={8} fill="currentColor" />
                        <span className="text-[9px] sm:text-[10px] font-bold ml-1 text-slate-400">{rating || '4.8'}</span>
                    </div>
                </div>
                <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-50">
                    <div>
                        {originalPrice && (
                            <div className="flex items-center gap-1.5">
                                <p className="text-[8px] sm:text-[9px] text-slate-400 line-through font-bold">₹{Number(originalPrice).toLocaleString()}</p>
                                <span className="text-[8px] font-black text-emerald-500 uppercase tracking-tighter">
                                    {Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)}% OFF
                                </span>
                            </div>
                        )}
                        <p className="text-[14px] sm:text-base font-bold text-[#1a1a1a]">₹{Number(price).toLocaleString()}</p>
                    </div>

                    <a 
                        href={`https://wa.me/917300067345?text=Hi%20SellerYaari,%20I'm%20interested%20in%20this%20product:%20${encodeURIComponent(name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm shadow-emerald-100"
                    >
                        <WhatsAppIcon size={12} className="text-white" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Enquiry Now</span>
                    </a>
                </div>
            </div>
        </div>
    );
};


const SectionHeader = ({ title, badge }) => (
    <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-[#1a1a1a] tracking-tight uppercase">{title}</h2>
            {badge && (
                <span className="bg-[#FFFBE6] text-[#D4A017] text-[8px] font-bold px-2 py-0.5 rounded-full border border-[#FFE58F] uppercase tracking-wider">
                    {badge}
                </span>
            )}
        </div>
        <Link href="/demo" className="text-[11px] font-bold text-slate-400 hover:text-[#F4BC1C] uppercase tracking-widest transition-colors flex items-center gap-1 group">
            View All
            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
    </div>
);

const AdvantageCard = ({ icon: Icon, title, desc }) => (
    <div className="bg-white p-3.5 rounded-xl border border-slate-100 flex items-center gap-3 hover:shadow-md transition-all group">
        <div className="w-8 h-8 bg-[#FFFBE6] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#F4BC1C] transition-colors border border-[#FFE58F]">
            <Icon size={16} className="text-[#F4BC1C] group-hover:text-black transition-colors" />
        </div>
        <div>
            <h4 className="text-[12px] font-bold text-[#1a1a1a] uppercase leading-none mb-1 tracking-tight">{title}</h4>
            <p className="text-slate-500 text-[10px] leading-snug font-medium">{desc}</p>
        </div>
    </div>
);

const CommitmentItem = ({ icon: Icon, label, desc }) => (
    <div className="flex items-center gap-2.5 p-1.5 group">
        <div className="w-8 h-8 bg-[#FFFBE6] rounded-lg flex items-center justify-center text-[#F4BC1C] shrink-0 border border-[#FFE58F] group-hover:bg-[#F4BC1C] group-hover:text-black transition-all">
            <Icon size={14} />
        </div>
        <div className="text-left">
            <p className="text-[10px] font-bold text-[#1a1a1a] uppercase leading-none mb-0.5 tracking-tight">{label}</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{desc}</p>
        </div>
    </div>
);

const TestimonialCard = ({ name, role, content, rating, image }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all relative group flex flex-col">
        <div className="flex items-center gap-0.5 mb-2 text-[#F4BC1C]">
            {[...Array(5)].map((_, i) => <Star key={i} size={8} fill={i < rating ? 'currentColor' : 'none'} />)}
        </div>
        <p className="text-slate-600 text-[11px] leading-relaxed mb-4 font-medium">"{content}"</p>
        <div className="mt-auto flex items-center gap-2.5 pt-3 border-t border-slate-50">
            <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-400">
                {name[0]}
            </div>
            <div className="text-left">
                <h5 className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-tight">{name}</h5>
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{role}</p>
            </div>
        </div>
    </div>
);



export default function MarketplaceHome() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["Home & Kitchen", "Beauty & Makeup", "Electronics", "Fitness"]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/products');
                setProducts(res.data);
                
                // Dynamic categories from products + static ones
                const dynamicCats = [...new Set(res.data.map(p => p.category))].filter(Boolean);
                setCategories(prev => [...new Set([...prev, ...dynamicCats])]);
            } catch (err) {
                console.error('Failed to fetch homepage data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const trendingProducts = products.length > 0 ? products.slice(0, 5) : [
        { name: 'Portable Mini Blender for Smoothies and Shakes', price: '899', rating: '4.8', tag: 'Hot', category: 'Kitchen' },
        { name: 'RGB Wireless Bluetooth Mouse with Silent Clicks', price: '449', rating: '4.6', tag: 'Trending', category: 'Tech' },
    ];

    const bestSellers = products.length > 5 ? products.slice(5, 10) : products;

    return (
        <PublicLayout>
            <div className="animate-in fade-in duration-700 bg-[#F9F9F9] font-inter">
                {/* --- HERO SECTION --- */}
                <section className="max-w-[1440px] mx-auto p-4 lg:px-6 lg:py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                        {/* Categories Sidebar */}
                        <aside className="hidden lg:block bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                            <h3 className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-3 pb-2 border-b border-slate-50 flex items-center justify-between">
                                Browse
                                <ChevronRight size={10} className="text-[#F4BC1C]" />
                            </h3>
                            <ul className="space-y-2">
                                {categories.map((cat, i) => (
                                    <li key={i}>
                                        <Link href="/demo" className="flex items-center justify-between text-[11px] font-medium text-slate-600 hover:text-[#F4BC1C] transition-colors group">
                                            {cat}
                                            <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/demo" className="block w-full mt-6 bg-slate-50 text-slate-400 py-1.5 rounded-lg text-center text-[8px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                                VIEW ALL
                            </Link>
                        </aside>

                        {/* Main Banner */}
                        <div className="lg:col-span-2 relative h-[300px] sm:h-[350px] rounded-2xl overflow-hidden group shadow-md border border-slate-100">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBE6] via-[#FDF9F3] to-[#FFFFFF]" />
                            <div className="absolute inset-0 flex items-center p-8 sm:p-10">
                                <div className="max-w-xs relative z-10">
                                    <span className="inline-block bg-black text-[#F4BC1C] text-[8px] font-bold px-2 py-0.5 rounded-full uppercase mb-4 tracking-widest">
                                        TRENDING
                                    </span>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-3 tracking-tighter leading-[1.1] uppercase">
                                        Launch Your <br />
                                        <span className="text-[#F4BC1C]">Ecommerce</span> <br />
                                        Store Today
                                    </h1>
                                    <p className="text-slate-500 text-[10px] font-bold mb-6 uppercase tracking-wider leading-relaxed">
                                        Join 5,000+ scaling merchants.
                                    </p>
                                    <Link href="/#contact" className="bg-black hover:bg-[#F4BC1C] hover:text-black text-white px-6 py-2.5 rounded-xl font-bold text-[10px] inline-flex items-center gap-2 transition-all active:scale-95 shadow-lg">
                                        EXPLORE NOW
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-1/2 h-full flex items-center justify-center opacity-5">
                                <Zap size={250} className="text-[#F4BC1C] rotate-12" />
                            </div>
                        </div>

                        {/* Side Promos */}
                        <div className="space-y-3">
                            <div className="bg-[#1a1a1a] rounded-2xl p-5 h-[168px] flex flex-col justify-between relative overflow-hidden group border border-white/5 shadow-sm">
                                <div className="relative z-10">
                                    <h3 className="text-base font-bold text-[#F4BC1C] leading-none mb-1.5 tracking-tight uppercase">BEST SELLERS</h3>
                                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Verified Winners</p>
                                </div>
                                <div className="relative z-10 mt-auto flex justify-between items-end">
                                    <span className="text-white text-xl font-bold opacity-5">01.</span>
                                    <Link href="/demo" className="bg-[#F4BC1C] hover:bg-white text-black w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90 shadow-md">
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 h-[168px] flex flex-col justify-between border border-slate-100 relative overflow-hidden group shadow-sm">
                                <div className="relative z-10">
                                    <h3 className="text-base font-bold text-[#1a1a1a] leading-none mb-1.5 tracking-tight uppercase">NEW ARRIVALS</h3>
                                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Added Today</p>
                                </div>
                                <div className="relative z-10 mt-auto flex justify-between items-end">
                                    <span className="text-slate-100 text-xl font-bold">02.</span>
                                    <Link href="/demo" className="bg-black hover:bg-[#F4BC1C] hover:text-black text-white w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90 shadow-sm">
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="products" className="max-w-[1440px] mx-auto p-4 lg:px-6 space-y-10">
                    <div>
                        <SectionHeader title="Popular Products" badge="Trending" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                            {trendingProducts.map((p, i) => (
                                <ProductCard key={i} {...p} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <SectionHeader title="Best Sellers" badge="Verified" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                            {bestSellers.map((p, i) => (
                                <ProductCard key={i} {...p} tag="WINNER" />
                            ))}
                        </div>
                    </div>
                </section>


                <Services />
                <Process />
                <FAQ />
                <LeadForm />

                {/* --- COMPACT CALL-TO-ACTION --- */}
                <section className="mt-8 mb-12">
                    <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
                        <div className="relative bg-[#1a1a1a] rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between overflow-hidden shadow-lg">
                            <div className="relative z-10 lg:w-1/2 text-center lg:text-left mb-6 lg:mb-0">
                                <span className="inline-block text-[#F4BC1C] text-[9px] font-bold uppercase tracking-widest mb-3">Limited Opportunity</span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tighter leading-none uppercase">
                                    Scale with <span className="text-[#F4BC1C]">Selleryaari</span>
                                </h2>
                                <p className="text-slate-400 text-[10px] font-bold mb-6 max-w-sm mx-auto lg:mx-0 leading-relaxed uppercase tracking-wider">
                                    Join our next live scaling masterclass.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                                    <Link href="/#contact" className="bg-[#F4BC1C] hover:bg-white text-black px-6 py-2.5 rounded-xl font-bold text-[10px] transition-all active:scale-95 shadow-md uppercase tracking-widest">
                                        REGISTER FREE
                                    </Link>
                                    <div className="flex items-center gap-2 text-slate-500 font-bold text-[9px] uppercase tracking-widest">
                                        <Users size={14} className="text-[#F4BC1C]" />
                                        12k+ Registered
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 lg:w-1/3">
                                <div className="aspect-video bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center group cursor-pointer hover:border-[#F4BC1C]/10 transition-all">
                                    <div className="w-12 h-12 bg-[#F4BC1C] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <PlayCircle size={24} className="text-black ml-0.5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- ADVANTAGE SECTION --- */}
                <section id="about" className="max-w-[1440px] mx-auto p-4 lg:px-6">
                    <div className="flex items-center gap-4 mb-5">
                        <h2 className="text-[14px] font-bold text-[#1a1a1a] tracking-tight uppercase whitespace-nowrap">Why Selleryaari</h2>
                        <div className="h-[1px] bg-slate-100 flex-1" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <AdvantageCard 
                            icon={CheckCircle2} 
                            title="End to End" 
                            desc="From product research to last-mile delivery."
                        />
                        <AdvantageCard 
                            icon={Headphones} 
                            title="Expert Help" 
                            desc="Real human support from verified sellers."
                        />
                        <AdvantageCard 
                            icon={Users} 
                            title="Vetted Data" 
                            desc="Winning lists based on actual sales data."
                        />
                    </div>
                </section>

                {/* --- TESTIMONIALS --- */}
                <section id="testimonials" className="max-w-[1440px] mx-auto p-4 lg:px-6 mt-8">
                    <div className="flex items-center gap-4 mb-5">
                        <h2 className="text-[14px] font-bold text-[#1a1a1a] tracking-tight uppercase whitespace-nowrap">Success Stories</h2>
                        <div className="h-[1px] bg-slate-100 flex-1" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <TestimonialCard name="Rahul S." role="Seller" content="Winning lists are pure gold! Transformed my ad ROI." rating={5} />
                        <TestimonialCard name="Priya P." role="Owner" content="Automated fulfillment is amazing. Scaled with ease." rating={5} />
                        <TestimonialCard name="Amit G." role="Entrepreneur" content="The best dropshipping partner in India. Period." rating={5} />
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
