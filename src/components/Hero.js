'use client';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Zap, ArrowRight, TrendingUp, Search, IndianRupee } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#f0f6ff] to-white">
      {/* Decorative circles */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#e8f1fb] rounded-full blur-3xl opacity-60 -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[50%] bg-[#d0e6f8] rounded-full blur-3xl opacity-40 -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#0f1729] leading-[1.1] mb-6">
              Launch & Scale Your <br />
              <span className="gradient-text">E-commerce Business</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              From high-margin product research to full Shopify store setup and legal GST registration — we handle the complexity so you can focus on selling.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="#contact" className="btn-primary">
                Book Free Consultation
                <Rocket size={18} />
              </Link>
              <Link href="#products" className="btn-outline">
                View Winning Products
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#0A66C2]" />
                <span>Verified Suppliers</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-[#0A66C2]" />
                <span>Fast 7-Day Setup</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative z-10 p-2 animate-float">
              {/* MacBook style frame */}
              <div className="bg-[#0f1729] rounded-2xl p-1.5 shadow-2xl border border-slate-700/50">
                <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
                  <div className="h-6 bg-slate-50 flex items-center gap-1.5 px-3 border-b border-slate-100">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                    alt="SellerYaari E-commerce Dashboard"
                    className="w-full h-auto object-cover aspect-video"
                  />
                </div>
              </div>
              
              {/* Floating element 1 */}
              <div className="absolute -top-6 -right-6 glass-card p-4 animate-pulse hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Daily Revenue</div>
                    <div className="text-sm font-bold text-[#0f1729]">₹24,800</div>
                  </div>
                </div>
              </div>

              {/* Floating element 2 */}
              <div className="absolute -bottom-10 -left-6 glass-card p-4 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#0A66C2]">
                    <IndianRupee size={16} />
                  </div>
                  <div className="text-xs font-bold text-slate-700">Hero Product Found!</div>
                </div>
              </div>
            </div>
            
            {/* Soft decorative Glow behind the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-500/10 blur-[120px] -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
