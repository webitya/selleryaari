'use client';
import DashboardLayout from '@/components/DashboardLayout';
import React, { useState, useMemo } from 'react';
import { 
    ChevronLeft, 
    ChevronRight,
    ArrowRight,
    Star,
    Zap,
    Heart,
    Filter,
    ArrowUpDown
} from 'lucide-react';

const CategoryItem = ({ label, icon, color, active, onClick }) => (
    <div 
        onClick={onClick}
        className="flex flex-col items-center gap-2 cursor-pointer group shrink-0"
    >
        <div className={`w-16 h-16 rounded-full ${active ? 'bg-[#0f1729] ring-4 ring-[#0f1729]/10' : color} shadow-sm border ${active ? 'border-[#0f1729]' : 'border-slate-100'} flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105`}>
            <span className={`text-xl transition-all ${active ? 'scale-110' : ''}`}>{icon}</span>
        </div>
        <span className={`text-[9px] font-black text-center uppercase tracking-tighter max-w-[60px] leading-tight transition-colors ${active ? 'text-[#0f1729]' : 'text-slate-500'}`}>
            {label}
        </span>
    </div>
);

const ProductCard = ({ name, price, originalPrice, rating, reviews, image, tag, category }) => (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer flex flex-col">
        <div className="relative aspect-square bg-slate-50 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-slate-200 group-hover:scale-110 transition-transform duration-700">
                <Zap size={48} className="opacity-20" />
            </div>
            {tag && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
                    {tag}
                </div>
            )}
            <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all active:scale-90">
                <Heart size={14} />
            </button>
            <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-[#0f1729]/60 backdrop-blur-md text-white text-[8px] font-bold rounded uppercase">
                {category}
            </div>
        </div>
        <div className="p-3 flex-1 flex flex-col">
            <h3 className="text-[12px] font-bold text-[#0f1729] line-clamp-2 mb-1.5 group-hover:text-[#0A66C2] transition-colors leading-snug">
                {name}
            </h3>
            <div className="flex items-center gap-1.5 mb-3">
                <div className="flex items-center text-yellow-400">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-black ml-0.5 text-slate-700">{rating}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">({reviews})</span>
            </div>
            <div className="mt-auto pt-2 flex items-end justify-between border-t border-slate-50">
                <div>
                    <p className="text-[9px] text-slate-400 line-through font-medium">₹{originalPrice}</p>
                    <p className="text-base font-black text-[#0f1729]">₹{price}</p>
                </div>
                <button className="bg-[#0f1729] hover:bg-[#0A66C2] text-white p-1.5 rounded-lg transition-all active:scale-90">
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    </div>
);

export default function MarketplaceHome() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Recommended');

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
    ], []);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'All') return products;
        return products.filter(p => p.category.includes(selectedCategory));
    }, [selectedCategory, products]);

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-700">
                {/* Compact Promo Banner */}
                <div className="relative bg-[#FFFBE6] rounded-2xl p-6 sm:p-10 flex items-center justify-between overflow-hidden border border-[#FFE58F] shadow-sm shadow-yellow-100/30">
                    <div className="relative z-10 flex-1 max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-[#722ED1] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase mb-4 tracking-wider">
                            <Zap size={10} fill="currentColor" />
                            New Sourcing Protocol
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-[#722ED1] mb-2 tracking-tighter leading-none">
                            Discover Winning <span className="text-[#0f1729]">Products</span>
                        </h1>
                        <p className="text-slate-600 text-sm font-semibold mb-6 max-w-lg leading-snug">
                            Data-driven product research for dropshippers. Access high-margin winners before they go viral.
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-3">
                            <button className="bg-[#0f1729] hover:bg-[#1a2641] text-white px-6 py-2.5 rounded-lg font-black text-[13px] flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-slate-900/10">
                                Browse Hot Winners
                                <ArrowRight size={18} />
                            </button>
                            <button className="bg-white/80 hover:bg-white text-[#0f1729] border border-slate-200 px-6 py-2.5 rounded-lg font-black text-[13px] transition-all active:scale-95">
                                How it Works
                            </button>
                        </div>
                    </div>

                    <div className="relative z-10 hidden xl:block animate-float">
                        <div className="w-48 h-48 bg-gradient-to-br from-[#722ED1]/10 to-transparent rounded-full flex items-center justify-center">
                            <div className="w-36 h-36 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-white rotate-6 hover:rotate-0 transition-transform duration-500">
                                <Zap size={60} className="text-[#722ED1]" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Background decoration */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#722ED1]/5 rounded-full blur-3xl" />
                </div>

                {/* Categories & Filters Row */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h2 className="text-[14px] font-black text-[#0f1729] uppercase tracking-widest">Sourcing Categories</h2>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 cursor-pointer hover:border-slate-300 transition-all">
                                <ArrowUpDown size={14} />
                                <span className="text-[11px] font-bold">Sort: {sortBy}</span>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#0f1729] transition-all cursor-pointer">
                                <Filter size={16} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-8 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
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

                {/* Dynamic Product Grid */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-black text-[#0f1729] tracking-tighter">
                                {selectedCategory === 'All' ? 'Latest Global Winners' : `${selectedCategory} Recommendations`}
                            </h2>
                            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mt-0.5">
                                Showing {filteredProducts.length} high-potential items
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0f1729] transition-all">
                                <ChevronLeft size={16} />
                            </button>
                            <button className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0f1729] transition-all">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                        {filteredProducts.map((product, i) => (
                            <ProductCard key={i} {...product} />
                        ))}
                    </div>
                    
                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                            <Zap size={40} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-500 font-bold">No products found in this category.</p>
                            <button onClick={() => setSelectedCategory('All')} className="text-[#0A66C2] text-sm font-bold mt-2 hover:underline">
                                Show all products
                            </button>
                        </div>
                    )}
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
