'use client';
import DashboardLayout from '@/components/DashboardLayout';
import React, { useState, useMemo, useRef } from 'react';
import { 
    ChevronLeft, 
    ChevronRight,
    ArrowRight,
    Star,
    Zap,
    Heart,
    Filter,
    ArrowUpDown,
    ShoppingBag,
    TrendingUp
} from 'lucide-react';

const CategoryItem = ({ label, icon, color, active, onClick }) => (
    <button 
        onClick={onClick}
        className="flex flex-col items-center gap-2 cursor-pointer group shrink-0 outline-none"
    >
        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${active ? 'bg-[#0f1729] ring-4 ring-[#0f1729]/10 shadow-lg' : color} border ${active ? 'border-[#0f1729]' : 'border-slate-100'} flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 active:scale-95`}>
            <span className={`text-xl sm:text-2xl transition-all ${active ? 'scale-110' : ''}`}>{icon}</span>
        </div>
        <span className={`text-[9px] font-black text-center uppercase tracking-tighter max-w-[60px] leading-tight transition-colors ${active ? 'text-[#0f1729]' : 'text-slate-400 group-hover:text-slate-600'}`}>
            {label}
        </span>
    </button>
);

const ProductCard = ({ name, price, originalPrice, rating, reviews, image, tag, category }) => (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group cursor-pointer flex flex-col h-full active:scale-[0.98]">
        <div className="relative aspect-square bg-slate-50 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-slate-200 group-hover:scale-110 transition-transform duration-700">
                <Zap size={40} className="opacity-10" />
            </div>
            {tag && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase tracking-tighter z-10">
                    {tag}
                </div>
            )}
            <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all active:scale-90 z-10">
                <Heart size={14} />
            </button>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-md text-[#0f1729] text-[8px] font-black rounded-full border border-slate-100 uppercase z-10">
                {category}
            </div>
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-[#0f1729]/0 group-hover:bg-[#0f1729]/5 transition-colors duration-500" />
        </div>
        <div className="p-3.5 flex-1 flex flex-col">
            <h3 className="text-[12px] font-bold text-[#0f1729] line-clamp-2 mb-2 group-hover:text-[#0A66C2] transition-colors leading-snug">
                {name}
            </h3>
            <div className="flex items-center gap-1.5 mb-4">
                <div className="flex items-center text-yellow-400 bg-yellow-50 px-1.5 py-0.5 rounded-md">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-black ml-1 text-yellow-700">4.8</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified</span>
            </div>
            <div className="mt-auto pt-3 flex items-end justify-between border-t border-slate-50">
                <div>
                    <p className="text-[9px] text-slate-400 line-through font-bold">₹{Math.round(price * 1.5)}</p>
                    <div className="flex items-center gap-1.5">
                        <p className="text-base font-black text-[#0f1729]">₹{price}</p>
                        <span className="text-[9px] text-emerald-500 font-black uppercase tracking-tighter">33% OFF</span>
                    </div>
                </div>
                <button className="bg-[#0f1729] hover:bg-[#0A66C2] text-white w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-slate-100 active:scale-90">
                    <ShoppingBag size={18} />
                </button>
            </div>
        </div>
    </div>
);

export default function MarketplaceHome() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Recommended');
    const categoryRef = useRef(null);

    const categories = [
        { label: 'All', icon: '✨', color: 'bg-slate-50' },
        { label: 'Home', icon: '🏠', color: 'bg-orange-50' },
        { label: 'Beauty', icon: '💄', color: 'bg-pink-50' },
        { label: 'Car', icon: '🚗', color: 'bg-blue-50' },
        { label: 'Gym', icon: '🏋️', color: 'bg-green-50' },
        { label: 'Footwear', icon: '👟', color: 'bg-yellow-50' },
        { label: 'Jewellery', icon: '💎', color: 'bg-cyan-50' },
        { label: 'Kids', icon: '🧸', color: 'bg-indigo-50' },
        { label: 'Electronics', icon: '🎧', color: 'bg-slate-50' },
    ];

    const products = useMemo(() => [
        { name: 'Portable Mini Blender for Smoothies and Shakes', price: '899', originalPrice: '1,499', rating: '4.8', reviews: '1.2k', tag: 'Hot Seller', category: 'Electronics' },
        { name: 'RGB Wireless Bluetooth Mouse with Silent Clicks', price: '449', originalPrice: '999', rating: '4.6', reviews: '850', tag: 'Trending', category: 'Electronics' },
        { name: 'Premium Leather Wallet with RFID Protection', price: '1,299', originalPrice: '2,499', rating: '4.9', reviews: '2.1k', tag: 'Winning', category: 'Beauty' },
        { name: 'Fast Charging 20W PD Wall Adapter', price: '599', originalPrice: '1,199', rating: '4.7', reviews: '3.4k', tag: 'Top Pick', category: 'Electronics' },
        { name: 'Insulated Water Bottle - 24 Hours Cold', price: '799', originalPrice: '1,299', rating: '4.5', reviews: '1.5k', category: 'Home' },
        { name: 'Ergonomic Vertical Mouse for Laptop', price: '1,149', originalPrice: '1,999', rating: '4.4', reviews: '420', category: 'Electronics' },
        { name: 'Smart Yoga Mat with Alignment Lines', price: '1,599', originalPrice: '2,999', rating: '4.9', reviews: '120', tag: 'New', category: 'Gym' },
        { name: 'Portable Car Vacuum Cleaner', price: '1,899', originalPrice: '3,499', rating: '4.7', reviews: '2.5k', tag: 'Top Rated', category: 'Car' },
        { name: 'Wireless Noise Cancelling Earbuds', price: '2,499', originalPrice: '4,999', rating: '4.8', reviews: '5k', tag: 'Best Value', category: 'Electronics' },
        { name: 'Manual Food Chopper for Kitchen', price: '299', originalPrice: '799', rating: '4.5', reviews: '8k', category: 'Home' },
    ], []);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'All') return products;
        return products.filter(p => p.category.includes(selectedCategory));
    }, [selectedCategory, products]);

    const scrollCategories = (dir) => {
        if (categoryRef.current) {
            const scrollAmt = dir === 'left' ? -200 : 200;
            categoryRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
        }
    };

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6 lg:p-8 space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Hero Section - Fully Responsive */}
                <div className="relative bg-[#FFFBE6] rounded-3xl p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between overflow-hidden border border-[#FFE58F] shadow-sm">
                    <div className="relative z-10 flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-[#722ED1] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase mb-6 tracking-widest animate-pulse">
                            <TrendingUp size={12} />
                            2026 Winner List
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#722ED1] mb-4 tracking-tighter leading-tight">
                            Scale Your <span className="text-[#0f1729]">Dropshipping</span> Business
                        </h1>
                        <p className="text-slate-600 text-sm sm:text-lg font-bold mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Access real-time data on 10,000+ winning products. We find the winners, you keep the profits.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button className="w-full sm:w-auto bg-[#0f1729] hover:bg-[#1a2641] text-white px-10 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10">
                                Start Product Hunting
                                <ArrowRight size={20} />
                            </button>
                            <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0f1729] border border-slate-200 px-10 py-4 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95">
                                Case Studies
                            </button>
                        </div>
                    </div>

                    <div className="relative z-10 mt-12 lg:mt-0 lg:w-1/3 flex justify-center animate-float">
                        <div className="relative">
                            <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-[#722ED1]/10 to-transparent rounded-full flex items-center justify-center">
                                <div className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 bg-white rounded-[40px] shadow-2xl flex items-center justify-center border border-white rotate-6 hover:rotate-0 transition-transform duration-700">
                                    <Zap size={100} className="text-[#722ED1]" />
                                </div>
                            </div>
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FAAD14] rounded-full opacity-30 blur-xl" />
                            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#722ED1] rounded-full opacity-20 blur-2xl" />
                        </div>
                    </div>
                    
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#722ED1]/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FAAD14]/5 rounded-full blur-[100px]" />
                </div>

                {/* Categories - Enhanced Scroll & Mobile Layout */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <h2 className="text-[14px] font-black text-[#0f1729] uppercase tracking-widest flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                            Product Categories
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={() => scrollCategories('left')} className="w-9 h-9 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0f1729] transition-all active:scale-90">
                                <ChevronLeft size={18} />
                            </button>
                            <button onClick={() => scrollCategories('right')} className="w-9 h-9 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0f1729] transition-all active:scale-90">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                    
                    <div 
                        ref={categoryRef}
                        className="flex items-start gap-6 sm:gap-10 overflow-x-auto pb-4 no-scrollbar scroll-smooth px-2"
                    >
                        {categories.map((cat, idx) => (
                            <CategoryItem 
                                key={idx} 
                                {...cat} 
                                active={selectedCategory === cat.label}
                                onClick={() => setSelectedCategory(cat.label)}
                            />
                        ))}
                    </div>
                </div>

                {/* Filters & Product Grid */}
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-black text-[#0f1729] tracking-tighter">
                                {selectedCategory === 'All' ? 'Latest Global Winners' : `${selectedCategory} Recommendations`}
                            </h2>
                            <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest mt-1">
                                {filteredProducts.length} items discovered by Selleryaari AI
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-500 cursor-pointer hover:border-slate-300 transition-all shadow-sm">
                                <ArrowUpDown size={14} />
                                <span className="text-[12px] font-bold">Sort</span>
                            </div>
                            <div className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#0f1729] transition-all cursor-pointer shadow-sm">
                                <Filter size={18} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8">
                        {filteredProducts.map((product, i) => (
                            <ProductCard key={i} {...product} />
                        ))}
                    </div>
                    
                    {filteredProducts.length === 0 && (
                        <div className="py-24 text-center bg-white rounded-[32px] border border-dashed border-slate-200">
                            <Zap size={48} className="mx-auto text-slate-200 mb-4 opacity-50" />
                            <p className="text-slate-500 font-black text-sm">No products found in {selectedCategory}.</p>
                            <button onClick={() => setSelectedCategory('All')} className="text-[#0A66C2] text-xs font-black mt-3 hover:underline tracking-widest uppercase">
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Newsletter / CTA - Best UI/UX */}
                <div className="bg-[#0f1729] rounded-[40px] p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl shadow-slate-200">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tighter">Ready to Scale?</h2>
                        <p className="text-slate-400 text-sm sm:text-lg mb-10 font-medium">Join 5,000+ merchants receiving daily winner alerts.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/50 transition-all"
                            />
                            <button className="bg-[#0A66C2] hover:bg-[#0855a5] text-white px-10 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-xl shadow-blue-900/20">
                                Join Now
                            </button>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#0A66C2] rounded-full blur-[150px] opacity-20 -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#722ED1] rounded-full blur-[150px] opacity-20 -ml-48 -mb-48" />
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </DashboardLayout>
    );
}
