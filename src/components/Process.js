import { motion } from 'framer-motion';
import { Rocket, Search, Globe, Layout, TrendingUp } from 'lucide-react';

const steps = [
  {
    title: 'Consultation',
    desc: 'Initial strategy call to understand your goals and niche interests.',
    icon: Globe,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Product Research',
    desc: 'Our data team finds 3-5 high-potential hero products for your store.',
    icon: Search,
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    title: 'Sourcing & Supply',
    desc: 'Connecting you with verified distributors for seamless order fulfillment.',
    icon: Rocket,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Store Setup',
    desc: 'Building your optimized e-commerce headquarters from ground up.',
    icon: Layout,
    color: 'bg-cyan-100 text-cyan-600'
  },
  {
    title: 'Launch & Scale',
    desc: 'Go live and implement our proven scaling roadmaps for 6-figure months.',
    icon: TrendingUp,
    color: 'bg-emerald-100 text-emerald-600'
  }
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f1729] mt-4">
            Our 5-Step <span className="text-[#0A66C2]">Success Roadmap</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-12 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-slate-200 border-4 border-white ${step.color}`}>
                  <step.icon size={24} />
                </div>
                <div className="relative">
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl font-black text-slate-100 -z-10">0{index + 1}</span>
                  <h3 className="text-lg font-bold text-[#0f1729] mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed px-4">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
