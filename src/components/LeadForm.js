'use client';
import { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle2, Loader2, Phone, Mail, User, Building, Zap } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import WhatsAppIcon from './WhatsAppIcon';


export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: 'dropshipping'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/leads', formData);
      setSubmitted(true);
      toast.success("Request sent! We'll reach out within 24h.");
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-12 bg-[#F9F9F9] font-inter">
        <div className="max-w-[400px] mx-auto text-center px-6">
          <div className="w-16 h-16 bg-[#FFFBE6] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#FFE58F] shadow-lg shadow-yellow-100">
            <CheckCircle2 size={32} className="text-[#D4A017]" />
          </div>
          <h2 className="text-xl font-bold text-[#1a1a1a] uppercase tracking-tight mb-2">Request Received</h2>
          <p className="text-slate-500 text-[12px] font-medium leading-relaxed uppercase tracking-wider">
            Our experts will contact you shortly to build your roadmap.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-12 bg-[#F9F9F9] font-inter">
      <Toaster position="top-right" />
      <div className="max-w-[800px] mx-auto px-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row">
          {/* Left Info */}
          <div className="bg-[#1a1a1a] p-8 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[#F4BC1C] text-[9px] font-bold uppercase tracking-[0.2em] mb-4 block">Get Started</span>
              <h2 className="text-2xl font-bold text-white mb-4 tracking-tighter uppercase leading-none">Book a Free <br /> Consultation</h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Unlock your ecommerce potential with data-driven strategies.
              </p>
            </div>
            
            <div className="relative z-10 space-y-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-[#F4BC1C]">
                  <Phone size={14} />
                </div>
                <p className="text-white text-[11px] font-bold">+91 90138 26272</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-[#F4BC1C]">
                  <Mail size={14} />
                </div>
                <p className="text-white text-[11px] font-bold">hello@selleryaari.in</p>
              </div>
            </div>

            <Zap size={150} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
          </div>

          {/* Form */}
          <div className="p-8 md:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      required
                      type="text"
                      className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-9 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      required
                      type="tel"
                      className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-9 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    required
                    type="email"
                    className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-9 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Company (Optional)</label>
                <div className="relative">
                  <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-9 text-[12px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                    placeholder="Your Business Name"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F4BC1C] hover:bg-black hover:text-white text-black py-3 rounded-xl font-bold text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-yellow-500/10 disabled:opacity-50 mt-4"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : (
                  <>
                    Send Enquiry
                    <Send size={14} />
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="h-px bg-slate-100 flex-1" />
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">OR</span>
                <div className="h-px bg-slate-100 flex-1" />
              </div>

              <a 
                href="https://wa.me/917300067345?text=Hi%20SellerYaari,%20I'd%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-50 text-emerald-600 border border-emerald-100 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-emerald-500 hover:text-white active:scale-[0.98]"
              >
                <WhatsAppIcon size={16} />
                Quick Enquiry via WhatsApp
              </a>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
