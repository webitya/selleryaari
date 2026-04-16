import Link from 'next/link';
import { Globe, Share2, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f1729] text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0A66C2] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">SY</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Seller<span className="text-[#0A66C2]">Yaari</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Helping entrepreneurs launch and scale profitable e-commerce businesses with end-to-end support and data-driven strategies.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              {['Services', 'Winner Products', 'Our Process', 'Success Stories', 'FAQ'].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#0A66C2] shrink-0" />
                <span>selleryaari@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#0A66C2] shrink-0" />
                <span>+91 90138 26272</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#0A66C2] shrink-0" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Get weekly e-commerce insights and winning product alerts.</p>
            <div className="flex bg-slate-800 rounded-full p-1.5 border border-slate-700">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent border-none outline-none px-4 text-sm w-full text-white"
              />
              <button className="bg-[#0A66C2] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#0855a5] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} SellerYaari. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
