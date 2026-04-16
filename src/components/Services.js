'use client';
import { motion } from 'framer-motion';
import { Search, Truck, Layout, FileText, TrendingUp, Users } from 'lucide-react';

const services = [
  {
    title: 'Hero Product Research',
    desc: 'Using data-led search strategies to identify low-competition, high-margin products with massive viral potential.',
    icon: Search,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Product Sourcing',
    desc: 'Direct access to our network of verified Indian & global distributors ensuring best quality at direct wholesale rates.',
    icon: Truck,
    color: 'bg-indigo-50 text-indigo-600'
  },
  {
    title: 'Store Setup & Dev',
    desc: 'Fully optimized, high-converting Shopify or WooCommerce stores built with premium designs and sales triggers.',
    icon: Layout,
    color: 'bg-cyan-50 text-cyan-600'
  },
  {
    title: 'GST & Legal Support',
    desc: 'End-to-end assistance with GST registration, trade licenses, and business documentation for e-commerce.',
    icon: FileText,
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    title: 'Listing Optimization',
    desc: 'Professional copywriting and A+ catalog optimization to boost click-through rates and conversion percentages.',
    icon: TrendingUp,
    color: 'bg-orange-50 text-orange-600'
  },
  {
    title: 'Scaling Guidance',
    desc: 'Custom marketing roadmaps, Facebook/Instagram ad strategies, and inventory management for sustainable growth.',
    icon: Users,
    color: 'bg-purple-50 text-purple-600'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0f1729] mt-4">
          Complete E-commerce <span className="text-[#0A66C2]">Ecosystem</span> Support
        </h2>
        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
          We provide everything you need to launch your business from scratch. No tech skills required.
        </p>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-slate-100 bg-white card-hover"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
              <item.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#0f1729] mb-4">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
