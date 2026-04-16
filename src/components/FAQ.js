'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Do I need technical skills to start?",
    answer: "Not at all. We handle everything from website development to technical configurations. You just need to focus on managing your business and sales."
  },
  {
    question: "How long does it take to launch a store?",
    answer: "On average, we launch a fully optimized store including product research and sourcing setup within 7 to 10 working days."
  },
  {
    question: "Do you provide actual products or just research?",
    answer: "We do both. We identify 'winning products' for you and then connect you with our network of verified wholesalers and distributors who can fulfill those orders."
  },
  {
    question: "Is GST registration mandatory?",
    answer: "For e-commerce in India, GST is generally required to sell on platforms and via payment gateways. We provide full assistance in obtaining your GST registration."
  },
  {
    question: "Which platform do you use for website creation?",
    answer: "We primarily use Shopify due to its scalability and ease of use for beginners, but we also offer WooCommerce and custom-coded solutions based on your specific requirements."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f1729] mt-4">
            Common <span className="text-[#0A66C2]">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === index ? 'border-[#0A66C2] bg-blue-50/30' : 'border-slate-100'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className={`font-bold transition-colors ${
                  openIndex === index ? 'text-[#0A66C2]' : 'text-[#0f1729]'
                }`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus size={20} className="text-[#0A66C2]" />
                ) : (
                  <Plus size={20} className="text-slate-400" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
