'use client';
import { Rocket, ShieldCheck, Zap, ArrowRight, TrendingUp, IndianRupee, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const stats = [
    { value: '5,000+', label: 'Active Sellers' },
    { value: '₹4.2Cr', label: 'GMV Processed' },
    { value: '7 Days', label: 'Avg. Launch Time' },
];

const badges = [
    { icon: ShieldCheck, label: 'Verified Suppliers' },
    { icon: Zap, label: '7-Day Setup' },
    { icon: CheckCircle2, label: 'GST Compliant' },
];

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden font-inter border-b border-slate-100">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 -z-10" />
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#FFFBE6]/60 to-transparent -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left — Copy */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FFFBE6] text-[#D4A017] text-[10px] font-bold px-3 py-1 rounded-full border border-[#FFE58F] uppercase tracking-widest mb-5">
              <Zap size={10} fill="#D4A017" />
              India's #1 Dropshipping Partner
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] leading-[1.1] mb-5 tracking-tight">
              Launch & Scale Your<br />
              <span className="text-[#F4BC1C]">E-commerce Business</span>
            </h1>

            <p className="text-slate-500 text-[14px] font-medium mb-7 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              From high-margin product research to full store setup and GST registration — we handle the complexity so you can focus on selling.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8">
              <Link href="#contact" className="bg-[#F4BC1C] hover:bg-[#D4A017] text-black px-6 py-3 rounded-xl font-bold text-[13px] flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-yellow-100 uppercase tracking-wider">
                Book Free Consultation
                <Rocket size={15} />
              </Link>
              <Link href="#products" className="border border-slate-200 hover:border-[#F4BC1C] bg-white text-[#1a1a1a] px-6 py-3 rounded-xl font-bold text-[13px] flex items-center gap-2 transition-all active:scale-95 uppercase tracking-wider hover:text-[#D4A017]">
                View Products
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
              {badges.map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <b.icon size={13} className="text-[#F4BC1C]" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual Dashboard */}
          <div className="flex-1 w-full max-w-lg relative">
            {/* Main card */}
            <div className="bg-[#1a1a1a] rounded-2xl p-1.5 shadow-2xl shadow-slate-300/40">
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="h-7 bg-[#F9F9F9] flex items-center gap-1.5 px-3 border-b border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="ml-2 text-[9px] text-slate-400 font-medium">selleryaari.in/dashboard</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                  alt="SellerYaari Dashboard"
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>
            </div>

            {/* Floating stat — top right */}
            <div className="absolute -top-4 -right-4 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-lg shadow-slate-200/50 hidden md:flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <TrendingUp size={15} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Daily Revenue</p>
                <p className="text-[15px] font-black text-[#1a1a1a] leading-none mt-0.5">₹24,800</p>
              </div>
            </div>

            {/* Floating stat — bottom left */}
            <div className="absolute -bottom-4 -left-4 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-lg shadow-slate-200/50 hidden md:flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FFFBE6] flex items-center justify-center">
                <IndianRupee size={15} className="text-[#D4A017]" />
              </div>
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Hero Product Found!</p>
                <p className="text-[13px] font-black text-[#1a1a1a] leading-none mt-0.5">+347% ROI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
          {stats.map((s, i) => (
            <div key={i} className="text-center lg:text-left">
              <p className="text-xl font-black text-[#1a1a1a] tracking-tight">{s.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
