'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Zap } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: 'Dropshipping',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/leads', formData);
      setSubmitted(true);
      toast.success('Strategy session booked!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[40px] border border-slate-100 text-center shadow-2xl shadow-blue-100/50 max-w-xl mx-auto my-24"
      >
        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle2 size={56} />
        </div>
        <h3 className="text-3xl font-black text-[#0f1729] mb-4 tracking-tighter">Request Transmitted!</h3>
        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
            Our data analysts have received your inquiry. A senior strategist will reach out within the next 24 hours to schedule your audit.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="w-full bg-[#0f1729] hover:bg-[#1a2641] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
        >
          Send New Transmission
        </button>
      </motion.div>
    );
  }

  return (
    <div id="contact" className="py-24 bg-white relative overflow-hidden font-inter">
      <Toaster position="top-right" />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F9F0FF] rounded-full blur-[120px] -ml-48 -mt-48 opacity-40" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFFBE6] rounded-full blur-[120px] -mr-48 -mb-48 opacity-40" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#722ED1] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase mb-6 tracking-widest">
                <Zap size={12} fill="currentColor" />
                Limited Availability
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-[#0f1729] mb-8 leading-[0.95] tracking-tighter">
              Book Your <br />
              <span className="text-[#0A66C2]">Global Growth</span> Audit
            </h2>
            <p className="text-slate-500 text-lg font-medium mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Unlock 30 minutes with a veteran dropshipping consultant. We'll strip down your current strategy and provide a high-precision roadmap for global scale.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {[
                { title: 'Global Sourcing', desc: 'Direct factory access' },
                { title: 'Fast Setup', desc: '72-hour store launch' },
                { title: 'Tax & Compliance', desc: 'Global GST/VAT support' },
                { title: 'Winning Data', desc: 'AI-driven product picks' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0A66C2] shrink-0 border border-slate-100">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="font-black text-[13px] text-[#0f1729] uppercase tracking-tighter">{item.title}</p>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white p-8 sm:p-12 rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/50 relative z-10"
            >
              <div className="mb-10 text-center lg:text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Transmission Portal</p>
                  <h3 className="text-2xl font-black text-[#0f1729] tracking-tighter">Ready for Takeoff?</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Merchant Name" 
                    className="w-full bg-[#F5F5F5] border-none rounded-2xl py-3.5 px-6 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Contact Signal</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+91 Phone" 
                    className="w-full bg-[#F5F5F5] border-none rounded-2xl py-3.5 px-6 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Digital Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="name@business.com" 
                  className="w-full bg-[#F5F5F5] border-none rounded-2xl py-3.5 px-6 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Vertical Focus</label>
                <select 
                  className="w-full bg-[#F5F5F5] border-none rounded-2xl py-3.5 px-6 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all cursor-pointer"
                  value={formData.businessType}
                  onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                >
                  <option>Dropshipping</option>
                  <option>Private Label</option>
                  <option>Reselling</option>
                  <option>Existing Brand</option>
                </select>
              </div>

              <div className="mb-10">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mission Details</label>
                <textarea 
                  rows="3" 
                  placeholder="Briefly outline your scaling goals..." 
                  className="w-full bg-[#F5F5F5] border-none rounded-2xl py-3.5 px-6 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0f1729] hover:bg-[#1a2641] text-white py-4 rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-4 transition-all active:scale-[0.98] shadow-xl shadow-slate-200"
              >
                {loading ? 'Transmitting...' : 'Initialize Audit'}
                {!loading && <Send size={18} />}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
