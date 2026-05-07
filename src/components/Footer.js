import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Globe, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-24 pb-12 font-outfit">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 bg-[#F4BC1C] rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-100 group-hover:rotate-6 transition-transform">
                <span className="text-black font-black text-2xl">S</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                selleryaari<span className="text-[#F4BC1C]">.</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
              India's #1 platform for e-commerce growth. We empower sellers with high-converting data, winning products, and seamless logistics.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F4BC1C] hover:text-black transition-all group">
                  <Icon size={18} className="text-slate-400 group-hover:text-inherit" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-8 text-[#F4BC1C]">Company</h4>
            <ul className="space-y-4 text-slate-400 text-[14px] font-medium">
              {['About SellerYaari', 'Our Services', 'Winning Products', 'Case Studies', 'Contact Us'].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-8 text-[#F4BC1C]">Support</h4>
            <ul className="space-y-4 text-slate-400 text-[14px] font-medium">
              {['Help Center', 'Track Your Order', 'Seller Guide', 'FAQ', 'Webinars'].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#F4BC1C]">Join Newsletter</h4>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Get the latest winning products weekly.</p>
            <div className="relative">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-[#F4BC1C] transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#F4BC1C] text-black font-black text-[10px] px-4 py-2 rounded-lg uppercase tracking-widest hover:bg-white transition-colors">
                    Join
                </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-slate-500 text-[11px] font-black uppercase tracking-widest">
            <p>© {new Date().getFullYear()} SellerYaari India. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
                <Globe size={14} className="text-slate-400" />
                <span className="text-[11px] font-black uppercase tracking-widest">India (IN)</span>
             </div>
             <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest">₹ INR</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
