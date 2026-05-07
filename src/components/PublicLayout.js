'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Search, 
    ShoppingBag, 
    Menu, 
    X, 
    User,
    Heart,
    ChevronDown,
    MapPin,
    Phone
} from 'lucide-react';

export default function PublicLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        "Home & Kitchen", "Beauty & Personal Care", "Car Accessories", 
        "Fitness & Gym", "Electronics", "Toys & Games", "Fashion"
    ];

    return (
        <div className="min-h-screen bg-[#F9F9F9] flex flex-col font-inter">
            {/* Top Bar - Contact info etc */}
            <div className="bg-[#1a1a1a] text-white py-1.5 px-6 hidden sm:block">
                <div className="max-w-[1440px] mx-auto flex justify-between items-center text-[10px] font-bold tracking-wider uppercase">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <MapPin size={10} className="text-[#F4BC1C]" />
                            <span>India's #1 Dropshipping Partner</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={10} className="text-[#F4BC1C]" />
                            <span>Support: +91 98765 43210</span>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-[#F4BC1C] transition-colors">Track Order</Link>
                        <Link href="#" className="hover:text-[#F4BC1C] transition-colors">Seller Login</Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white border-b border-slate-100 sticky top-0 z-[60] shadow-sm">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 bg-[#F4BC1C] rounded-lg flex items-center justify-center shadow shadow-yellow-100">
                            <span className="text-black font-black text-lg">S</span>
                        </div>
                        <span className="text-xl font-black text-[#1a1a1a] tracking-tighter hidden sm:block">
                            selleryaari<span className="text-[#F4BC1C]">.</span>
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl relative flex">
                        <div className="relative flex-1 group">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full bg-[#f3f4f6] border-none rounded-l-lg py-2 px-10 text-[13px] font-medium focus:bg-white focus:ring-2 focus:ring-[#F4BC1C]/20 transition-all outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#F4BC1C] transition-colors" />
                        </div>
                        <button className="bg-[#F4BC1C] hover:bg-[#D4A017] text-black px-5 sm:px-8 rounded-r-lg text-[13px] font-bold transition-all flex items-center gap-2">
                            <span className="hidden sm:inline">Search</span>
                            <Search size={14} className="sm:hidden" />
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 sm:gap-4">
                        <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all hidden md:flex items-center gap-2">
                            <User size={18} />
                            <span className="text-[12px] font-bold">Login</span>
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all relative group">
                            <ShoppingBag size={18} className="group-hover:text-[#F4BC1C]" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F4BC1C] text-black text-[9px] font-bold rounded-full border-2 border-white flex items-center justify-center">0</span>
                        </button>
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="border-t border-slate-50 hidden lg:block bg-white">
                    <div className="max-w-[1440px] mx-auto px-6">
                        <div className="flex items-center gap-8 py-2">
                            <button className="flex items-center gap-2 text-[#1a1a1a] font-bold text-[12px] uppercase tracking-wider shrink-0 bg-[#FFFBE6] px-3 py-1 rounded-md border border-[#FFE58F]">
                                <Menu size={14} />
                                Categories
                            </button>
                            <div className="flex items-center gap-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                                {categories.map((cat, i) => (
                                    <Link key={i} href="#" className="hover:text-[#F4BC1C] transition-colors whitespace-nowrap">{cat}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-[100] p-6 animate-in slide-in-from-right duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-lg font-bold">Menu</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                            <X size={22} />
                        </button>
                    </div>
                    <div className="space-y-5">
                        {categories.map((cat, i) => (
                            <Link key={i} href="#" className="block text-base font-bold text-[#1a1a1a]" onClick={() => setIsMobileMenuOpen(false)}>{cat}</Link>
                        ))}
                        <hr className="border-slate-50" />
                        <Link href="#" className="block text-base font-bold text-[#1a1a1a]">My Account</Link>
                        <button className="w-full bg-[#F4BC1C] text-black py-3 rounded-lg font-bold mt-6">START SELLING</button>
                    </div>
                </div>
            )}

            {/* Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white pt-12 pb-6">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                        <div className="lg:col-span-2">
                            <Link href="/" className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-[#F4BC1C] rounded-lg flex items-center justify-center">
                                    <span className="text-black font-black text-lg">S</span>
                                </div>
                                <span className="text-xl font-black tracking-tighter">selleryaari<span className="text-[#F4BC1C]">.</span></span>
                            </Link>
                            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-6">
                                India's most trusted partner for e-commerce growth. We help you find winning products and scale your business with ease.
                            </p>
                            <div className="flex gap-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#F4BC1C] hover:text-black transition-all cursor-pointer">
                                        <div className="w-4 h-4 bg-current" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-white uppercase text-[10px] tracking-widest">Company</h4>
                            <ul className="space-y-2 text-xs text-slate-400">
                                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Services</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Process</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-white uppercase text-[10px] tracking-widest">Support</h4>
                            <ul className="space-y-2 text-xs text-slate-400">
                                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">FAQs</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-white uppercase text-[10px] tracking-widest">Newsletter</h4>
                            <div className="relative">
                                <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-[#F4BC1C]" />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#F4BC1C] font-bold text-[10px]">JOIN</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">© 2026 SellerYaari India. All rights reserved.</p>
                        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
