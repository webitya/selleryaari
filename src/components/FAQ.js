'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { question: "Do I need technical skills to start?", answer: "Not at all. We handle everything from website development to technical configurations. You focus on sales." },
  { question: "How long does it take to launch a store?", answer: "On average, we launch a fully optimized store within 7–10 working days." },
  { question: "Do you provide actual products?", answer: "Yes. We identify winning products and connect you with verified wholesalers for direct fulfillment." },
  { question: "Is GST registration mandatory?", answer: "For e-commerce in India, GST is generally required. We provide assistance in obtaining it." },
  { question: "Which platform do you use?", answer: "We primarily use Shopify for its scalability, but also offer WooCommerce and custom solutions." },
  { question: "What is the cost to get started?", answer: "Packages vary based on goals. Book a free consultation and we'll build a custom plan for you." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-10 bg-white font-inter border-y border-slate-50">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[14px] font-bold text-[#1a1a1a] uppercase tracking-tight whitespace-nowrap">Help Center</h2>
          <div className="h-px bg-slate-100 flex-1" />
          <span className="text-[8px] font-bold text-[#D4A017] uppercase tracking-widest bg-[#FFFBE6] px-2 py-0.5 rounded border border-[#FFE58F] whitespace-nowrap">{faqs.length} FAQ</span>
        </div>

        {/* Two-column grid on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg border transition-all duration-200 ${
                openIndex === i ? 'border-[#F4BC1C] shadow-sm shadow-yellow-100/50' : 'border-slate-50'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-4 py-3 flex items-center justify-between text-left gap-3"
              >
                <span className={`text-[12px] font-bold transition-colors leading-snug uppercase ${
                  openIndex === i ? 'text-[#1a1a1a]' : 'text-slate-500'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${
                  openIndex === i ? 'bg-[#F4BC1C] text-black' : 'bg-slate-50 text-slate-300'
                }`}>
                  {openIndex === i ? <Minus size={10} /> : <Plus size={10} />}
                </div>
              </button>

              {openIndex === i && (
                <div className="px-4 pb-3">
                  <p className="text-slate-500 text-[10px] leading-relaxed font-medium border-t border-slate-50 pt-2 uppercase tracking-wide">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
