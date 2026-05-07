'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { 
    Search, 
    ShoppingBag, 
    Menu, 
    X, 
    User,
    LogOut,
    ChevronDown,
    MapPin,
    Phone,
    LayoutDashboard,
    Zap
} from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import WhatsAppIcon from './WhatsAppIcon';



export default function PublicLayout({ children }) {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        "Home & Kitchen", "Beauty", "Auto", "Fitness", "Electronics", "Toys", "Fashion"
    ];

    return (
        <div className="min-h-screen bg-[#F9F9F9] flex flex-col font-inter">
            {/* Top Bar - Hidden on mobile */}
            <div className="bg-[#1a1a1a] text-white py-1 px-6 hidden md:block">
                <div className="max-w-[1440px] mx-auto flex justify-between items-center text-[9px] font-bold tracking-wider uppercase">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <MapPin size={10} className="text-[#F4BC1C]" />
                            <span>#1 Dropshipping Partner</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Phone size={10} className="text-[#F4BC1C]" />
                            <span>+91 90138 26272</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/track" className="hover:text-[#F4BC1C] transition-colors">Track Order</Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white border-b border-slate-100 sticky top-0 z-[60] shadow-sm">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4">
                    
                    {/* Left: Mobile Menu & Logo */}
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-1.5 text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                        >
                            <Menu size={20} />
                        </button>
                        <Link href="/" className="flex items-center gap-1.5 shrink-0">
                            <div className="w-7 h-7 bg-[#F4BC1C] rounded flex items-center justify-center shadow shadow-yellow-100">
                                <span className="text-black font-bold text-base">S</span>
                            </div>
                            <span className="text-lg font-bold text-[#1a1a1a] tracking-tighter hidden sm:block">
                                selleryaari<span className="text-[#F4BC1C]">.</span>
                            </span>
                        </Link>
                    </div>

                    {/* Center: Search Bar */}
                    <div className={`flex-1 max-w-xl relative h-9 transition-all duration-300 ${isSearchOpen ? 'fixed inset-x-0 top-0 h-14 bg-white z-[70] px-4 flex items-center shadow-lg sm:relative sm:inset-auto sm:h-9 sm:bg-transparent sm:shadow-none sm:px-0' : 'hidden sm:flex items-center'}`}>
                        <div className="relative flex-1 h-full flex">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search winning products..."
                                    className="w-full h-full bg-[#f3f4f6] border border-transparent rounded-l-lg py-1.5 px-9 text-[12px] font-medium focus:bg-white focus:ring-1 focus:ring-[#F4BC1C]/30 transition-all outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                {isSearchOpen && (
                                    <button 
                                        onClick={() => setIsSearchOpen(false)} 
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 sm:hidden hover:text-black transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                            <button className="bg-[#F4BC1C] hover:bg-[#D4A017] text-black px-4 rounded-r-lg text-[11px] font-bold transition-all flex items-center gap-1.5 shrink-0">
                                <span className="hidden sm:inline">Search</span>
                                <Search size={14} className="sm:hidden" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1 sm:gap-3">
                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            className="sm:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                        >
                            <Search size={18} />
                        </button>

                        {session ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-1.5 p-1 hover:bg-slate-50 rounded-lg transition-all"
                                >
                                    <div className="w-7 h-7 rounded bg-[#FFFBE6] flex items-center justify-center text-[#D4A017] border border-[#FFE58F]">
                                        <User size={14} />
                                    </div>
                                    <div className="hidden lg:block text-left">
                                        <p className="text-[10px] font-bold text-[#1a1a1a] leading-none uppercase">{session.user.name.split(' ')[0]}</p>
                                    </div>
                                    <ChevronDown size={12} className={`text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl border border-slate-100 shadow-xl py-1.5 z-[70] animate-in fade-in zoom-in-95">
                                        {session.user.role === 'admin' && (
                                            <Link href="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-[#1a1a1a] hover:bg-slate-50">
                                                <LayoutDashboard size={14} className="text-[#F4BC1C]" />
                                                DASHBOARD
                                            </Link>
                                        )}
                                        <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-[#1a1a1a] hover:bg-slate-50">
                                            <User size={14} className="text-slate-400" />
                                            PROFILE
                                        </Link>
                                        <hr className="my-1 border-slate-50" />
                                        <button 
                                            onClick={() => signOut()}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50"
                                        >
                                            <LogOut size={14} />
                                            SIGN OUT
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/auth/login" className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all flex items-center gap-1.5">
                                <User size={16} />
                                <span className="text-[11px] font-bold uppercase">Login</span>
                            </Link>
                        )}
                        
                        <a 
                            href="https://wa.me/917300067345?text=Hi%20SellerYaari,%20I'm%20interested%20in%20your%20services!" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg transition-all flex items-center gap-1.5 group hover:bg-emerald-500 hover:text-white shadow-sm shadow-emerald-100"
                        >
                            <WhatsAppIcon size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Enquiry Now</span>
                        </a>


                    </div>
                </div>

                {/* Categories Bar - Hidden on mobile/tablet */}
                <div className="border-t border-slate-50 hidden lg:block bg-white h-9">
                    <div className="max-w-[1440px] mx-auto px-6 h-full">
                        <div className="flex items-center gap-6 h-full py-1">
                            <Link href="/demo" className="flex items-center gap-1.5 text-[#1a1a1a] font-bold text-[11px] uppercase tracking-wider shrink-0 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                <Menu size={12} />
                                Browse
                            </Link>
                            <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                {categories.map((cat, i) => (
                                    <Link key={i} href="/demo" className="hover:text-[#F4BC1C] transition-colors whitespace-nowrap">{cat}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white py-10">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-2 md:col-span-1">
                            <Link href="/" className="flex items-center gap-1.5 mb-4">
                                <div className="w-6 h-6 bg-[#F4BC1C] rounded flex items-center justify-center">
                                    <span className="text-black font-bold text-sm">S</span>
                                </div>
                                <span className="text-base font-bold tracking-tighter uppercase">selleryaari</span>
                            </Link>
                            <p className="text-slate-500 text-[10px] font-bold leading-relaxed max-w-xs uppercase tracking-wider">
                                India's trusted dropshipping partner. scale your store with data.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-white uppercase text-[9px] tracking-widest">Support</h4>
                            <ul className="space-y-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                <li><Link href="/track" className="hover:text-white transition-colors">Track Order</Link></li>
                                <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                                <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                                <li><a href="tel:+919013826272" className="text-[#F4BC1C]">+91 90138 26272</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-white uppercase text-[9px] tracking-widest">Company</h4>
                            <ul className="space-y-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/#services" className="hover:text-white transition-colors">Services</Link></li>
                                <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin Portal</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-white uppercase text-[9px] tracking-widest">Connect</h4>
                            <div className="flex gap-3">
                                <a href="https://wa.me/919013826272" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#25D366] transition-all group border border-white/5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 group-hover:text-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-6 text-center">
                        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-widest">© 2026 SellerYaari. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-[100] animate-in slide-in-from-left duration-300">
                    <div className="flex justify-between items-center h-14 px-6 border-b border-slate-100">
                        <Link href="/" className="flex items-center gap-1.5 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="w-7 h-7 bg-[#F4BC1C] rounded flex items-center justify-center">
                                <span className="text-black font-bold text-base">S</span>
                            </div>
                            <span className="text-lg font-bold text-[#1a1a1a] tracking-tighter">selleryaari</span>
                        </Link>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-black transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto max-h-[calc(100vh-56px)]">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Categories</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {categories.map((cat, i) => (
                                        <Link key={i} href="/demo" className="text-[14px] font-bold text-[#1a1a1a] uppercase tracking-tight flex justify-between items-center" onClick={() => setIsMobileMenuOpen(false)}>
                                            {cat}
                                            <ChevronDown size={14} className="-rotate-90 text-slate-300" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <hr className="border-slate-50" />
                            <div>
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Account</h3>
                                <div className="space-y-4">
                                    {!session ? (
                                        <Link href="/auth/login" className="block text-[14px] font-bold text-[#1a1a1a] uppercase tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>Login / Register</Link>
                                    ) : (
                                        <>
                                            <Link href="/profile" className="block text-[14px] font-bold text-[#1a1a1a] uppercase tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
                                            <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="block text-[14px] font-bold text-red-500 uppercase tracking-tight text-left">Sign Out</button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <Link href="/#contact" className="block w-full bg-black text-[#F4BC1C] text-center py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-xl">
                                CONTACT US NOW
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <WhatsAppButton />
        </div>
    );
}

