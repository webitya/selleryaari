'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingBag, User, Heart } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Winning Products', href: '#products' },
    { name: 'Services', href: '#services' },
    { name: 'Our Process', href: '#process' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-lg' : 'bg-white py-5 border-b border-slate-50'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 bg-[#F4BC1C] rounded-xl flex items-center justify-center shadow-lg shadow-yellow-100 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-xl">S</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-[#1a1a1a]">
            selleryaari<span className="text-[#F4BC1C]">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-bold text-slate-600 hover:text-[#F4BC1C] transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="hidden sm:flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
              <Search size={20} />
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
              <User size={20} />
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-all relative group">
                <ShoppingBag size={20} className="group-hover:text-[#F4BC1C]" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F4BC1C] text-black text-[9px] font-black rounded-full border-2 border-white flex items-center justify-center">0</span>
            </button>
          </div>
          
          <Link href="#contact" className="bg-black hover:bg-[#F4BC1C] hover:text-black text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-black/10 active:scale-95">
            Get Started
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-[#1a1a1a] p-2 hover:bg-slate-50 rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-8 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-black text-[#1a1a1a] uppercase tracking-tight"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-50" />
            <div className="flex items-center gap-6">
                <Link href="#" className="text-sm font-bold text-slate-600 uppercase tracking-widest">Login</Link>
                <Link href="#" className="text-sm font-bold text-slate-600 uppercase tracking-widest">Track Order</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
