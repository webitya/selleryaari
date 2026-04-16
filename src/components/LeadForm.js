'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
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
      toast.success('Consultation booked successfully!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-3xl border border-slate-100 text-center shadow-2xl shadow-blue-100/50"
      >
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-2xl font-bold text-[#0f1729] mb-4">Request Received!</h3>
        <p className="text-slate-500 mb-8">
          One of our experts will contact you within the next 24 hours to schedule your free consultation.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="btn-outline !py-2.5 !px-8"
        >
          Send Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <div id="contact" className="py-24 bg-slate-50">
      <Toaster position="top-right" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f1729] mt-4 mb-6 leading-tight">
              Ready to build your <br />
              <span className="text-[#0A66C2]">E-commerce Empire?</span>
            </h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              Fill out the form to book a free 30-minute consultation with our experts. We'll audit your business idea and provide a roadmap for execution.
            </p>
            
            <div className="space-y-4">
              {['Access to 500+ Distributors', '7-Day Fast Track Setup', 'End-to-end Legal Support'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[#0A66C2]">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl">
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-100 shadow-2xl shadow-blue-100/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe" 
                    className="form-input" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    className="form-input" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com" 
                  className="form-input" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Business Type</label>
                <select 
                  className="form-input cursor-pointer"
                  value={formData.businessType}
                  onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                >
                  <option>Dropshipping</option>
                  <option>Private Label</option>
                  <option>Reselling</option>
                  <option>Existing Brand</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Message (Optional)</label>
                <textarea 
                  rows="3" 
                  placeholder="Tell us about your business goals..." 
                  className="form-input resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full justify-center py-4"
              >
                {loading ? 'Sending...' : 'Book My Consultation'}
                {!loading && <Send size={18} />}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
